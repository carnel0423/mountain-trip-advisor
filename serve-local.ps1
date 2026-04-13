param(
  [int]$Port = 8080
)

$ErrorActionPreference = "Stop"

function Get-ContentType {
  param([string]$Path)

  switch ([IO.Path]::GetExtension($Path).ToLowerInvariant()) {
    ".html" { "text/html; charset=utf-8" }
    ".js" { "application/javascript; charset=utf-8" }
    ".css" { "text/css; charset=utf-8" }
    ".json" { "application/json; charset=utf-8" }
    ".svg" { "image/svg+xml" }
    ".png" { "image/png" }
    ".jpg" { "image/jpeg" }
    ".jpeg" { "image/jpeg" }
    ".webp" { "image/webp" }
    ".ico" { "image/x-icon" }
    ".txt" { "text/plain; charset=utf-8" }
    default { "application/octet-stream" }
  }
}

function Write-Response {
  param(
    [Parameter(Mandatory = $true)]$Stream,
    [int]$StatusCode,
    [string]$StatusText,
    [byte[]]$Body,
    [string]$ContentType = "text/plain; charset=utf-8"
  )

  $headerText = @(
    "HTTP/1.1 $StatusCode $StatusText"
    "Content-Type: $ContentType"
    "Content-Length: $($Body.Length)"
    "Connection: close"
    ""
    ""
  ) -join "`r`n"

  $headerBytes = [Text.Encoding]::ASCII.GetBytes($headerText)
  $Stream.Write($headerBytes, 0, $headerBytes.Length)
  if ($Body.Length -gt 0) {
    $Stream.Write($Body, 0, $Body.Length)
  }
  $Stream.Flush()
}

function Get-SafeFilePath {
  param(
    [string]$Root,
    [string]$RequestPath
  )

  $cleanPath = $RequestPath
  if ([string]::IsNullOrWhiteSpace($cleanPath) -or $cleanPath -eq "/") {
    $cleanPath = "/index.html"
  }

  $cleanPath = $cleanPath.Split("?")[0]
  $cleanPath = $cleanPath.TrimStart("/").Replace("/", [IO.Path]::DirectorySeparatorChar)
  $fullPath = [IO.Path]::GetFullPath((Join-Path $Root $cleanPath))

  if (-not $fullPath.StartsWith($Root, [System.StringComparison]::OrdinalIgnoreCase)) {
    return $null
  }

  return $fullPath
}

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Any, $Port)
$listener.Start()

$serverHosts = @("127.0.0.1", "localhost")
$serverHosts += [System.Net.Dns]::GetHostAddresses([System.Net.Dns]::GetHostName()) |
  Where-Object {
    $_.AddressFamily -eq [System.Net.Sockets.AddressFamily]::InterNetwork -and
    $_.IPAddressToString -notlike "127.*"
  } |
Select-Object -ExpandProperty IPAddressToString
$serverHosts = $serverHosts | Select-Object -Unique

Write-Host ""
Write-Host "Local server started." -ForegroundColor Green
Write-Host "Open one of these URLs from your smartphone on the same Wi-Fi:" -ForegroundColor Green
foreach ($serverHost in $serverHosts) {
  Write-Host "  http://${serverHost}:${Port}/"
}
Write-Host ""
Write-Host "Press Ctrl+C to stop the server."
Write-Host ""

try {
  while ($true) {
    $client = $listener.AcceptTcpClient()
    try {
      $stream = $client.GetStream()
      $reader = [IO.StreamReader]::new($stream, [Text.Encoding]::ASCII, $false, 1024, $true)

      $requestLine = $reader.ReadLine()
      if ([string]::IsNullOrWhiteSpace($requestLine)) {
        continue
      }

      while ($true) {
        $headerLine = $reader.ReadLine()
        if ([string]::IsNullOrEmpty($headerLine)) {
          break
        }
      }

      $parts = $requestLine.Split(" ")
      if ($parts.Length -lt 2) {
        $body = [Text.Encoding]::UTF8.GetBytes("Bad Request")
        Write-Response -Stream $stream -StatusCode 400 -StatusText "Bad Request" -Body $body
        continue
      }

      $method = $parts[0].ToUpperInvariant()
      $requestPath = $parts[1]

      if ($method -ne "GET" -and $method -ne "HEAD") {
        $body = [Text.Encoding]::UTF8.GetBytes("Method Not Allowed")
        Write-Response -Stream $stream -StatusCode 405 -StatusText "Method Not Allowed" -Body $body
        continue
      }

      $filePath = Get-SafeFilePath -Root $root -RequestPath $requestPath
      if ($null -eq $filePath) {
        $body = [Text.Encoding]::UTF8.GetBytes("Forbidden")
        Write-Response -Stream $stream -StatusCode 403 -StatusText "Forbidden" -Body $body
        continue
      }

      if (-not (Test-Path -LiteralPath $filePath -PathType Leaf)) {
        $body = [Text.Encoding]::UTF8.GetBytes("Not Found")
        Write-Response -Stream $stream -StatusCode 404 -StatusText "Not Found" -Body $body
        continue
      }

      $body = if ($method -eq "HEAD") { [byte[]]::new(0) } else { [IO.File]::ReadAllBytes($filePath) }
      Write-Response -Stream $stream -StatusCode 200 -StatusText "OK" -Body $body -ContentType (Get-ContentType -Path $filePath)
    } finally {
      if ($null -ne $reader) {
        $reader.Dispose()
      }
      if ($null -ne $stream) {
        $stream.Dispose()
      }
      $client.Close()
    }
  }
} finally {
  $listener.Stop()
}
