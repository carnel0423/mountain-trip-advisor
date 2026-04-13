(() => {
  const FAVORITES_KEY = "mountain-trip-favorites";
  const TRANSIT_REQUIRED = new Set(["\u7acb\u5c71", "\u5263\u5cb3"]);
  const LEVEL_OVERRIDES = {
    "\u7acb\u5c71": 1,
    "\u6728\u66fd\u99d2\u30f6\u5cb3": 1,
    "\u4e57\u97af\u5cb3": 1,
    "\u7b51\u6ce2\u5c71": 1,
    "\u5927\u83e9\u85a9\u5dba": 1,
    "\u516b\u5e61\u5e73": 1,
    "\u7f8e\u30f6\u539f": 1,
    "\u9727\u30f6\u5cf0": 1,
    "\u8c37\u5ddd\u5cb3": 2,
    "\u713c\u5cb3": 2,
    "\u767d\u5c71": 2,
    "\u85ac\u5e2b\u5cb3": 2,
    "\u5263\u5cb3": 3,
    "\u69cd\u30f6\u5cb3": 3,
    "\u7a42\u9ad8\u5cb3": 3,
    "\u516b\u30f6\u5cb3": 3,
    "\u9e7f\u5cf6\u69cd\u30f6\u5cb3": 3
  };
  const TECHNICAL_ADVANCED = new Set([
    "\u5263\u5cb3",
    "\u69cd\u30f6\u5cb3",
    "\u7a42\u9ad8\u5cb3",
    "\u516b\u30f6\u5cb3",
    "\u9e7f\u5cf6\u69cd\u30f6\u5cb3"
  ]);
  const TECHNICAL_NOTES = {
    "\u5263\u5cb3": "\u5ca9\u7a1c\u5e2f\u3068\u9396\u5834\u3001\u30cf\u30b7\u30b4\u3092\u542b\u3080\u4ee3\u8868\u7684\u306a\u96e3\u6240\u304c\u3042\u308a\u307e\u3059",
    "\u69cd\u30f6\u5cb3": "\u5c71\u9802\u76f4\u4e0b\u306b\u9396\u30fb\u30cf\u30b7\u30b4\u304c\u3042\u308b\u5ca9\u7a1c\u30bb\u30af\u30b7\u30e7\u30f3\u304c\u3042\u308a\u307e\u3059",
    "\u7a42\u9ad8\u5cb3": "\u5ca9\u5834\u3068\u9396\u5834\u3092\u542b\u3080\u75e9\u305b\u5c3e\u6839\u30fb\u7a1c\u7dda\u6b69\u304d\u304c\u3042\u308a\u307e\u3059",
    "\u516b\u30f6\u5cb3": "\u8d64\u5cb3\u4e3b\u4f53\u306e\u6a19\u6e96\u30b3\u30fc\u30b9\u3067\u306f\u9396\u5834\u3084\u30cf\u30b7\u30b4\u306e\u5ca9\u5834\u533a\u9593\u304c\u3042\u308a\u307e\u3059",
    "\u9e7f\u5cf6\u69cd\u30f6\u5cb3": "\u30ad\u30ec\u30c3\u30c8\u4ed8\u8fd1\u306f\u967a\u3057\u3044\u7a1c\u7dda\u30fb\u5ca9\u5834\u533a\u9593\u3068\u306a\u308a\u307e\u3059",
    "\u8c37\u5ddd\u5cb3": "\u4e00\u30ce\u5009\u5074\u306e\u5371\u967a\u5730\u5e2f\u3068\u5207\u308c\u843d\u3061\u305f\u7a1c\u7dda\u306b\u6ce8\u610f\u304c\u5fc5\u8981\u3067\u3059",
    "御在所岳": "中登山道や裏登山道には鎖場、キレット、濡れると滑りやすい花崗岩帯があります",
    "大峰山": "行者還トンネル西口からの主ルートでも急登と木道・泥濘区間があり、積雪期は別難易度になります",
    "武奈ヶ岳": "坊村からの御殿山ルートは急登が長く、積雪期や雨天後はぬかるみと滑りやすい斜面に注意が必要です",
    "氷ノ山": "東尾根や氷ノ越周辺は強風を受けやすく、積雪・凍結期は別難易度になります",
    "大山": "夏山登山道は階段と木道が長く続き、下山専用区間や混雑時のすれ違いに注意が必要です",
    "石鎚山": "鎖場を含む天狗岳周辺は高度感のある岩稜帯で、悪天候時は無理をしない判断が重要です",
    "由布岳": "西峰直下は鎖場とザレた急斜面があり、東西峰周回は滑落リスクに注意が必要です",
    "大崩山": "湧塚尾根・坊主尾根ともに梯子、鎖場、痩せ尾根が連続し、ルートファインディングも必要です",
    "雲仙岳": "国見岳周辺には鎖場があり、火山規制によって立入可能範囲が変わるため最新情報確認が必要です",
    "祖母山": "北谷や神原からの主ルートは長い急登と岩場があり、濡れた木段や岩場で滑りやすくなります",
    "阿蘇山": "火口規制の影響を受けやすく、火山ガスや立入規制によって登山可能ルートが変わります",
    "九重山": "強風とガスが出やすく、久住分かれ周辺は火山性ガスや視界不良に注意が必要です",
    "宮之浦岳": "淀川・荒川どちらからも行程が長く、屋久島特有の多雨で木道や岩が非常に滑りやすくなります"
    ,"幌尻岳": "渡渉が多く、水量次第で難易度が大きく変わるため、増水時は入山判断が重要です"
    ,"トムラウシ山": "天候急変時に避難先が限られ、ガス・低温・長距離行動が重なると難易度が一気に上がります"
    ,"芦別岳": "旧道コースには急傾斜の岩場や鎖場があり、濡れた岩で滑りやすくなります"
    ,"ニペソツ山": "前天狗以降は痩せ尾根や岩場があり、長距離行動による疲労蓄積にも注意が必要です"
    ,"早池峰山": "蛇紋岩の岩場と浮石が多く、強風時は稜線でバランスを崩しやすいため注意が必要です"
    ,"鳥海山【新山・荒神ヶ岳】": "雪渓や火口周辺の岩場が長く残ることがあり、残雪期はルート確認が重要です"
    ,"安達太良山": "沼ノ平火口周辺は火山ガスや立入規制の影響を受けるため、最新情報確認が必要です"
    ,"那須岳": "朝日岳周辺は強風を受けやすい岩稜帯で、火山規制の変化にも注意が必要です"
    ,"会津朝日岳": "急登と痩せ尾根を含む区間があり、雨後は滑りやすい土斜面と岩場に注意が必要です"
    ,"神室山": "急登と痩せ尾根が連続し、雨天時は泥斜面で滑りやすくなります"
    ,"皇海山": "庚申山荘方面からでも長距離で、岩場・鎖場・痩せ尾根を含むため体力配分とルート確認が重要です"
    ,"両神山": "日向大谷コースでも鎖場と岩場があり、落石や混雑時のすれ違いに注意が必要です"
    ,"丹沢": "大倉尾根は階段と急登が長く、夏季は暑さ、冬季は凍結に注意が必要です"
    ,"草津白根山": "火山規制の影響を受けやすく、立入可能範囲が変わるため最新情報の確認が必須です"
    ,"至仏山": "蛇紋岩の登山道は濡れると非常に滑りやすく、入山規制期の一方通行ルール確認が必要です"
    ,"武尊山": "剣ヶ峰山周辺には鎖場や痩せ尾根があり、悪天候時は慎重な判断が必要です"
  };
  const POSSIBLY_DORMANT_OR_VOLCANIC = new Set([
    "\u5229\u5c3b\u5cb3",
    "\u7f85\u81fc\u5cb3",
    "\u963f\u5bd2\u5cb3",
    "\u5f8c\u65b9\u7f8a\u8e44\u5c71",
    "\u5ca9\u6728\u5c71",
    "\u516b\u7532\u7530\u5c71",
    "\u516b\u5e61\u5e73",
    "\u5ca9\u624b\u5c71",
    "\u9ce5\u6d77\u5c71",
    "\u6708\u5c71",
    "\u8535\u738b\u5c71",
    "\u543e\u59bb\u5c71",
    "\u5b89\u9054\u592a\u826f\u5c71",
    "\u78d0\u68af\u5c71",
    "\u90a3\u9808\u5cb3",
    "\u71e7\u30f6\u5cb3",
    "\u7537\u4f53\u5c71",
    "\u65e5\u5149\u767d\u6839\u5c71",
    "\u8d64\u57ce\u5c71",
    "\u8349\u6d25\u767d\u6839\u5c71",
    "\u6d45\u9593\u5c71",
    "\u5bcc\u58eb\u5c71",
    "\u713c\u5cb3",
    "\u4e57\u97af\u5cb3",
    "\u5fa1\u5dbd\u5c71",
    "\u767d\u5c71",
    "\u963f\u8607\u5c71",
    "\u4e5d\u91cd\u5c71",
    "\u958b\u805e\u5cb3",
    "\u9727\u5cf6\u5c71",
    "\u6a3d\u524d\u5c71",
    "\u5317\u6d77\u9053\u99d2\u30f6\u5cb3",
    "\u79cb\u7530\u99d2\u30f6\u5cb3",
    "\u6817\u99d2\u5c71",
    "\u699b\u540d\u5c71",
    "\u611b\u9df9\u5c71",
    "\u4e09\u74f6\u5c71",
    "\u98ef\u7e04\u5c71",
    "\u9ed2\u59eb\u5c71"
  ]);
  const CROSSING_NOTES = {
    "\u5e4c\u5c3b\u5cb3": "\u30b3\u30fc\u30b9\u4e0a\u3067\u6e21\u6e09\u70b9\u304c\u3042\u308a\u3001\u6c34\u91cf\u5897\u52a0\u6642\u306f\u5224\u65ad\u304c\u91cd\u8981\u3067\u3059",
    "\u30c8\u30e0\u30e9\u30a6\u30b7\u5c71": "\u30eb\u30fc\u30c8\u306b\u6cb3\u5ddd\u6a2a\u65ad\u3092\u4f34\u3046\u533a\u9593\u304c\u3042\u308a\u3001\u964d\u96e8\u5f8c\u306f\u6ce8\u610f\u304c\u5fc5\u8981\u3067\u3059",
    "東赤石山": "筏津ルートでは沢沿い区間や渡渉状況によって通行感覚が変わるため、増水時は慎重な判断が必要です",
    "大崩山": "祝子川本谷周辺は増水時に徒渉や渡渉判断が難しくなり、悪天候後は特に注意が必要です"
  };
  const BEAR_REPORT_RADIUS_KM = 20;
  const BEAR_REPORT_RECENT_DAYS = 90;
  const KUMAP_SUPABASE_URL = "https://xgzsccaaaxadvzzsztde.supabase.co";
  const KUMAP_PUBLISHABLE_KEY = "sb_publishable_w8C8t8pIk_ITKYRkj1nozg_dDzztHIN";
  const ROUTE_RESTRICTION_PATTERN = /通行止|通行規制|冬期閉鎖|閉鎖|立入禁止|入山規制|車両規制|マイカー規制|時間制限|一般車進入不可|規制情報|道路状況確認|林道状況確認|開山期間|入山期間/i;
  const ROUTE_HAZARD_NOTES = {
    "\u5263\u5cb3": {
      "\u5ba4\u5802\u30b3\u30fc\u30b9\uff08\u5263\u6ca2\u5c0f\u5c4b\u7d4c\u7531\uff09":
        "\u524d\u5263\u4ee5\u964d\u306f\u9396\u5834\u30fb\u30cf\u30b7\u30b4\u304c\u9023\u7d9a\u3059\u308b\u5ca9\u7a1c\u5e2f\u3067\u3001\u843d\u77f3\u3068\u3059\u308c\u9055\u3044\u306b\u6ce8\u610f\u304c\u5fc5\u8981\u3067\u3059",
      "\u5ba4\u5802\u30b3\u30fc\u30b9\uff08\u5263\u5fa1\u524d\u7d4c\u7531\uff09":
        "\u5263\u5fa1\u524d\u304b\u3089\u524d\u5263\u3078\u306e\u7a1c\u7dda\u3001\u524d\u5263\u4ee5\u964d\u306e\u9396\u5834\u30fb\u30cf\u30b7\u30b4\u306b\u6ce8\u610f\u304c\u5fc5\u8981\u3067\u3059",
      "\u99ac\u5834\u5cf6\u30b3\u30fc\u30b9":
        "\u65e9\u6708\u5c3e\u6839\u306e\u9577\u3044\u6025\u767b\u3068\u5ca9\u5834\u3001\u5c71\u9802\u76f4\u4e0b\u306e\u9396\u5834\u30fb\u30cf\u30b7\u30b4\u304c\u5927\u304d\u306a\u8ca0\u8377\u306b\u306a\u308a\u307e\u3059",
      "\u6b05\u5e73\u30b3\u30fc\u30b9":
        "\u4ed9\u4eba\u8c37\u5468\u8fba\u306e\u5439\u304d\u4ed8\u3051\u9053\u3001\u540a\u6a4b\u3001\u9577\u5927\u30eb\u30fc\u30c8\u306e\u75b2\u52b4\u84c4\u7a4d\u306b\u6ce8\u610f\u304c\u5fc5\u8981\u3067\u3059",
      "\u9ed2\u90e8\u5ddd\u30b3\u30fc\u30b9\uff08\u771f\u7802\u6ca2\u30ed\u30c3\u30b8\u7d4c\u7531\uff09":
        "\u30cf\u30b7\u30b4\u8c37\u4e57\u8d8a\u306e\u6025\u5cfb\u3001\u96ea\u6e13\u6b8b\u5b58\u6642\u3001\u524d\u5263\u4ee5\u964d\u306e\u9396\u5834\u306b\u6ce8\u610f\u304c\u5fc5\u8981\u3067\u3059",
      "\u9ed2\u90e8\u5ddd\u30b3\u30fc\u30b9\uff08\u5185\u8535\u52a9\u5c71\u8358\u7d4c\u7531\uff09":
        "\u5185\u8535\u52a9\u5e73\u304b\u3089\u5225\u5c71\u3078\u306e\u9577\u3044\u767b\u308a\u8fd4\u3057\u3068\u3001\u524d\u5263\u4ee5\u964d\u306e\u9396\u5834\u30fb\u30cf\u30b7\u30b4\u304c\u96e3\u6240\u3067\u3059"
    },
    "御在所岳": {
      "中登山口コース":
        "地蔵岩やキレット周辺は鎖場・岩場が続き、濡れた花崗岩は非常に滑りやすくなります"
    },
    "大峰山": {
      "行者還トンネル西口コース":
        "急登と木道が長く続き、弥山周辺はぬかるみや残雪期の滑りに注意が必要です"
    },
    "大山": {
      "大山寺コース":
        "夏山登山道は長い階段と木道主体で、悪天候時や混雑時は転倒とすれ違いに注意が必要です"
    },
    "石鎚山": {
      "下谷コース":
        "鎖場を経て天狗岳へ向かう場合は高度感のある岩稜帯となり、強風時は慎重な判断が必要です"
    },
    "由布岳": {
      "正面登山口コース":
        "マタエ以降はザレた急斜面と鎖場があり、西峰周回は浮石と滑落に注意が必要です"
    },
    "大崩山": {
      "上祝子登山口周回コース":
        "坊主尾根・湧塚尾根ともに梯子、鎖場、痩せ尾根が連続し、増水時は渡渉判断も難しくなります"
    },
    "雲仙岳": {
      "仁田峠循環コース":
        "国見岳周辺は鎖場と岩場があり、火山規制により周回可否が変わるため最新情報確認が必要です"
    },
    "東赤石山": {
      "筏津往復コース":
        "赤石越周辺は岩場とザレが多く、沢沿いの増水や鎖場での滑落に注意が必要です"
    },
    "高千穂峰": {
      "高千穂河原コース":
        "御鉢周辺は火山礫の急斜面と強風を受けやすく、火山規制時は立入範囲が変わります"
    }
  };
  const JMA_AREA_CONFIG = {
    "\u5317\u6d77\u9053:\u4e0a\u5ddd\u5730\u65b9": { officeCode: "012000", areaCode: "012010" },
    "\u5317\u6d77\u9053:\u7559\u840c\u5730\u65b9": { officeCode: "012000", areaCode: "012020" },
    "\u5317\u6d77\u9053:\u7db2\u8d70\u5730\u65b9": { officeCode: "013000", areaCode: "013010" },
    "\u5317\u6d77\u9053:\u5317\u898b\u5730\u65b9": { officeCode: "013000", areaCode: "013020" },
    "\u5317\u6d77\u9053:\u7d0b\u5225\u5730\u65b9": { officeCode: "013000", areaCode: "013030" },
    "\u5317\u6d77\u9053:\u6839\u5ba4\u5730\u65b9": { officeCode: "014100", areaCode: "014010" },
    "\u5317\u6d77\u9053:\u91e7\u8def\u5730\u65b9": { officeCode: "014100", areaCode: "014020" },
    "\u5317\u6d77\u9053:\u7a7a\u77e5\u5730\u65b9": { officeCode: "016000", areaCode: "016020" },
    "\u5317\u6d77\u9053:\u80c6\u632f\u5730\u65b9": { officeCode: "015000", areaCode: "015010" },
    "\u5317\u6d77\u9053:\u65e5\u9ad8\u5730\u65b9": { officeCode: "015000", areaCode: "015020" },
    "\u5317\u6d77\u9053:\u6e21\u5cf6\u5730\u65b9": { officeCode: "017000", areaCode: "017010" },
    "\u5317\u6d77\u9053:\u6a9c\u5c71\u5730\u65b9": { officeCode: "017000", areaCode: "017020" },
    "\u5317\u6d77\u9053:\u5341\u52dd\u5730\u65b9": { officeCode: "014030", areaCode: "014030" },
    "\u5317\u6d77\u9053:\u77f3\u72e9\u5730\u65b9": { officeCode: "016000", areaCode: "016010" },
    "\u5317\u6d77\u9053:\u5f8c\u5fd7\u5730\u65b9": { officeCode: "016000", areaCode: "016030" },
    "\u9752\u68ee\u770c:\u6d25\u8efd": { officeCode: "020000", areaCode: "020010" },
    "\u9752\u68ee\u770c:\u4e0b\u5317": { officeCode: "020000", areaCode: "020020" },
    "\u9752\u68ee\u770c:\u4e09\u516b\u4e0a\u5317": { officeCode: "020000", areaCode: "020030" },
    "\u5ca9\u624b\u770c:\u5185\u9678": { officeCode: "030000", areaCode: "030010" },
    "\u5ca9\u624b\u770c:\u6cbf\u5cb8\u5317\u90e8": { officeCode: "030000", areaCode: "030020" },
    "\u5ca9\u624b\u770c:\u6cbf\u5cb8\u5357\u90e8": { officeCode: "030000", areaCode: "030030" },
    "\u5bae\u57ce\u770c:\u6771\u90e8": { officeCode: "040000", areaCode: "040010" },
    "\u5bae\u57ce\u770c:\u897f\u90e8": { officeCode: "040000", areaCode: "040020" },
    "\u79cb\u7530\u770c:\u6cbf\u5cb8": { officeCode: "050000", areaCode: "050010" },
    "\u79cb\u7530\u770c:\u5185\u9678": { officeCode: "050000", areaCode: "050020" },
    "\u5c71\u5f62\u770c:\u6751\u5c71": { officeCode: "060000", areaCode: "060010" },
    "\u5c71\u5f62\u770c:\u7f6e\u8cdc": { officeCode: "060000", areaCode: "060020" },
    "\u5c71\u5f62\u770c:\u5e84\u5185": { officeCode: "060000", areaCode: "060030" },
    "\u5c71\u5f62\u770c:\u6700\u4e0a": { officeCode: "060000", areaCode: "060040" },
    "\u798f\u5cf6\u770c:\u4e2d\u901a\u308a": { officeCode: "070000", areaCode: "070010" },
    "\u798f\u5cf6\u770c:\u6d5c\u901a\u308a": { officeCode: "070000", areaCode: "070020" },
    "\u798f\u5cf6\u770c:\u4f1a\u6d25": { officeCode: "070000", areaCode: "070030" },
    "\u8328\u57ce\u770c:\u5317\u90e8": { officeCode: "080000", areaCode: "080010" },
    "\u8328\u57ce\u770c:\u5357\u90e8": { officeCode: "080000", areaCode: "080020" },
    "\u6803\u6728\u770c:\u5357\u90e8": { officeCode: "090000", areaCode: "090010" },
    "\u6803\u6728\u770c:\u5317\u90e8": { officeCode: "090000", areaCode: "090020" },
    "\u7fa4\u99ac\u770c:\u5357\u90e8": { officeCode: "100000", areaCode: "100010" },
    "\u7fa4\u99ac\u770c:\u5317\u90e8": { officeCode: "100000", areaCode: "100020" },
    "\u57fc\u7389\u770c:\u5357\u90e8": { officeCode: "110000", areaCode: "110010" },
    "\u57fc\u7389\u770c:\u5317\u90e8": { officeCode: "110000", areaCode: "110020" },
    "\u57fc\u7389\u770c:\u79e9\u7236\u5730\u65b9": { officeCode: "110000", areaCode: "110030" },
    "\u6771\u4eac\u90fd:\u6771\u4eac\u5730\u65b9": { officeCode: "130000", areaCode: "130010" },
    "\u795e\u5948\u5ddd\u770c:\u6771\u90e8": { officeCode: "140000", areaCode: "140010" },
    "\u795e\u5948\u5ddd\u770c:\u897f\u90e8": { officeCode: "140000", areaCode: "140020" },
    "\u65b0\u6f5f\u770c:\u4e0b\u8d8a": { officeCode: "150000", areaCode: "150010" },
    "\u65b0\u6f5f\u770c:\u4e2d\u8d8a": { officeCode: "150000", areaCode: "150020" },
    "\u65b0\u6f5f\u770c:\u4e0a\u8d8a": { officeCode: "150000", areaCode: "150030" },
    "\u5bcc\u5c71\u770c:\u6771\u90e8": { officeCode: "160000", areaCode: "160010" },
    "\u5bcc\u5c71\u770c:\u897f\u90e8": { officeCode: "160000", areaCode: "160020" },
    "\u77f3\u5ddd\u770c:\u52a0\u8cc0": { officeCode: "170000", areaCode: "170010" },
    "\u77f3\u5ddd\u770c:\u80fd\u767b": { officeCode: "170000", areaCode: "170020" },
    "\u798f\u4e95\u770c:\u5dba\u5317": { officeCode: "180000", areaCode: "180010" },
    "\u798f\u4e95\u770c:\u5dba\u5357": { officeCode: "180000", areaCode: "180020" },
    "\u5c71\u68a8\u770c:\u4e2d\u30fb\u897f\u90e8": { officeCode: "190000", areaCode: "190010" },
    "\u5c71\u68a8\u770c:\u6771\u90e8\u30fb\u5bcc\u58eb\u4e94\u6e56": { officeCode: "190000", areaCode: "190020" },
    "\u9577\u91ce\u770c:\u5317\u90e8": { officeCode: "200000", areaCode: "200010" },
    "\u9577\u91ce\u770c:\u4e2d\u90e8": { officeCode: "200000", areaCode: "200020" },
    "\u9577\u91ce\u770c:\u5357\u90e8": { officeCode: "200000", areaCode: "200030" },
    "\u5c90\u961c\u770c:\u7f8e\u6fc3\u5730\u65b9": { officeCode: "210000", areaCode: "210010" },
    "\u5c90\u961c\u770c:\u98db\u9a28\u5730\u65b9": { officeCode: "210000", areaCode: "210020" },
    "\u9759\u5ca1\u770c:\u4e2d\u90e8": { officeCode: "220000", areaCode: "220010" },
    "\u9759\u5ca1\u770c:\u4f0a\u8c46": { officeCode: "220000", areaCode: "220020" },
    "\u9759\u5ca1\u770c:\u6771\u90e8": { officeCode: "220000", areaCode: "220030" },
    "\u9759\u5ca1\u770c:\u897f\u90e8": { officeCode: "220000", areaCode: "220040" },
    "\u611b\u77e5\u770c:\u897f\u90e8": { officeCode: "230000", areaCode: "230010" },
    "\u611b\u77e5\u770c:\u6771\u90e8": { officeCode: "230000", areaCode: "230020" },
    "\u4e09\u91cd\u770c:\u5317\u4e2d\u90e8": { officeCode: "240000", areaCode: "240010" },
    "\u4e09\u91cd\u770c:\u5357\u90e8": { officeCode: "240000", areaCode: "240020" },
    "\u6ecb\u8cc0\u770c:\u5357\u90e8": { officeCode: "250000", areaCode: "250010" },
    "\u6ecb\u8cc0\u770c:\u5317\u90e8": { officeCode: "250000", areaCode: "250020" },
    "\u4eac\u90fd\u5e9c:\u5357\u90e8": { officeCode: "260000", areaCode: "260010" },
    "\u4eac\u90fd\u5e9c:\u5317\u90e8": { officeCode: "260000", areaCode: "260020" },
    "\u5927\u962a\u5e9c:\u5927\u962a\u5e9c": { officeCode: "270000", areaCode: "270000" },
    "\u5175\u5eab\u770c:\u5357\u90e8": { officeCode: "280000", areaCode: "280010" },
    "\u5175\u5eab\u770c:\u5317\u90e8": { officeCode: "280000", areaCode: "280020" },
    "\u5948\u826f\u770c:\u5317\u90e8": { officeCode: "290000", areaCode: "290010" },
    "\u5948\u826f\u770c:\u5357\u90e8": { officeCode: "290000", areaCode: "290020" },
    "\u548c\u6b4c\u5c71\u770c:\u5317\u90e8": { officeCode: "300000", areaCode: "300010" },
    "\u548c\u6b4c\u5c71\u770c:\u5357\u90e8": { officeCode: "300000", areaCode: "300020" },
    "\u9ce5\u53d6\u770c:\u6771\u90e8": { officeCode: "310000", areaCode: "310010" },
    "\u9ce5\u53d6\u770c:\u4e2d\u30fb\u897f\u90e8": { officeCode: "310000", areaCode: "310020" },
    "\u5cf6\u6839\u770c:\u6771\u90e8": { officeCode: "320000", areaCode: "320010" },
    "\u5cf6\u6839\u770c:\u897f\u90e8": { officeCode: "320000", areaCode: "320020" },
    "\u5cf6\u6839\u770c:\u96a0\u5c90": { officeCode: "320000", areaCode: "320030" },
    "\u5ca1\u5c71\u770c:\u5357\u90e8": { officeCode: "330000", areaCode: "330010" },
    "\u5ca1\u5c71\u770c:\u5317\u90e8": { officeCode: "330000", areaCode: "330020" },
    "\u5e83\u5cf6\u770c:\u5357\u90e8": { officeCode: "340000", areaCode: "340010" },
    "\u5e83\u5cf6\u770c:\u5317\u90e8": { officeCode: "340000", areaCode: "340020" },
    "\u5c71\u53e3\u770c:\u897f\u90e8": { officeCode: "350000", areaCode: "350010" },
    "\u5c71\u53e3\u770c:\u4e2d\u90e8": { officeCode: "350000", areaCode: "350020" },
    "\u5c71\u53e3\u770c:\u6771\u90e8": { officeCode: "350000", areaCode: "350030" },
    "\u5c71\u53e3\u770c:\u5317\u90e8": { officeCode: "350000", areaCode: "350040" },
    "\u5fb3\u5cf6\u770c:\u5317\u90e8": { officeCode: "360000", areaCode: "360010" },
    "\u5fb3\u5cf6\u770c:\u5357\u90e8": { officeCode: "360000", areaCode: "360020" },
    "\u9999\u5ddd\u770c:\u9999\u5ddd\u770c": { officeCode: "370000", areaCode: "370000" },
    "\u611b\u5a9b\u770c:\u4e2d\u4e88": { officeCode: "380000", areaCode: "380010" },
    "\u611b\u5a9b\u770c:\u6771\u4e88": { officeCode: "380000", areaCode: "380020" },
    "\u611b\u5a9b\u770c:\u5357\u4e88": { officeCode: "380000", areaCode: "380030" },
    "\u9ad8\u77e5\u770c:\u6771\u90e8": { officeCode: "390000", areaCode: "390010" },
    "\u9ad8\u77e5\u770c:\u4e2d\u90e8": { officeCode: "390000", areaCode: "390020" },
    "\u9ad8\u77e5\u770c:\u897f\u90e8": { officeCode: "390000", areaCode: "390030" },
    "\u798f\u5ca1\u770c:\u5317\u4e5d\u5dde\u5730\u65b9": { officeCode: "400000", areaCode: "400010" },
    "\u798f\u5ca1\u770c:\u798f\u5ca1\u5730\u65b9": { officeCode: "400000", areaCode: "400020" },
    "\u798f\u5ca1\u770c:\u7b51\u8c4a\u5730\u65b9": { officeCode: "400000", areaCode: "400030" },
    "\u798f\u5ca1\u770c:\u7b51\u5f8c\u5730\u65b9": { officeCode: "400000", areaCode: "400040" },
    "\u4f50\u8cc0\u770c:\u5357\u90e8": { officeCode: "410000", areaCode: "410010" },
    "\u4f50\u8cc0\u770c:\u5317\u90e8": { officeCode: "410000", areaCode: "410020" },
    "\u9577\u5d0e\u770c:\u5357\u90e8": { officeCode: "420000", areaCode: "420010" },
    "\u9577\u5d0e\u770c:\u5317\u90e8": { officeCode: "420000", areaCode: "420020" },
    "\u9577\u5d0e\u770c:\u58f1\u5c90\u30fb\u5bfe\u99ac": { officeCode: "420000", areaCode: "420030" },
    "\u9577\u5d0e\u770c:\u4e94\u5cf6": { officeCode: "420000", areaCode: "420040" },
    "\u718a\u672c\u770c:\u718a\u672c\u5730\u65b9": { officeCode: "430000", areaCode: "430010" },
    "\u718a\u672c\u770c:\u963f\u8607\u5730\u65b9": { officeCode: "430000", areaCode: "430020" },
    "\u718a\u672c\u770c:\u5929\u8349\u30fb\u82a6\u5317": { officeCode: "430000", areaCode: "430030" },
    "\u718a\u672c\u770c:\u7403\u78e8\u5730\u65b9": { officeCode: "430000", areaCode: "430040" },
    "\u5927\u5206\u770c:\u5317\u90e8": { officeCode: "440000", areaCode: "440020" },
    "\u5927\u5206\u770c:\u4e2d\u90e8": { officeCode: "440000", areaCode: "440010" },
    "\u5927\u5206\u770c:\u897f\u90e8": { officeCode: "440000", areaCode: "440030" },
    "\u5927\u5206\u770c:\u5357\u90e8": { officeCode: "440000", areaCode: "440040" },
    "\u5bae\u5d0e\u770c:\u5357\u90e8\u5e73\u91ce\u90e8": { officeCode: "450000", areaCode: "450010" },
    "\u5bae\u5d0e\u770c:\u5317\u90e8\u5e73\u91ce\u90e8": { officeCode: "450000", areaCode: "450020" },
    "\u5bae\u5d0e\u770c:\u5357\u90e8\u5c71\u6cbf\u3044": { officeCode: "450000", areaCode: "450030" },
    "\u5bae\u5d0e\u770c:\u5317\u90e8\u5c71\u6cbf\u3044": { officeCode: "450000", areaCode: "450040" },
    "\u9e7f\u5150\u5cf6\u770c:\u85a9\u6469\u5730\u65b9": { officeCode: "460100", areaCode: "460010" },
    "\u9e7f\u5150\u5cf6\u770c:\u5927\u9685\u5730\u65b9": { officeCode: "460100", areaCode: "460020" },
    "\u9e7f\u5150\u5cf6\u770c:\u7a2e\u5b50\u5cf6\u30fb\u5c4b\u4e45\u5cf6\u5730\u65b9": { officeCode: "460100", areaCode: "460030" }
  };
  const PREFECTURE_DEFAULT_WEATHER_AREA = {
    "\u5317\u6d77\u9053": "\u4e0a\u5ddd\u5730\u65b9",
    "\u9752\u68ee\u770c": "\u6d25\u8efd",
    "\u5ca9\u624b\u770c": "\u5185\u9678",
    "\u5bae\u57ce\u770c": "\u897f\u90e8",
    "\u79cb\u7530\u770c": "\u5185\u9678",
    "\u5c71\u5f62\u770c": "\u6751\u5c71",
    "\u798f\u5cf6\u770c": "\u4e2d\u901a\u308a",
    "\u8328\u57ce\u770c": "\u5317\u90e8",
    "\u6803\u6728\u770c": "\u5317\u90e8",
    "\u7fa4\u99ac\u770c": "\u5317\u90e8",
    "\u57fc\u7389\u770c": "\u79e9\u7236\u5730\u65b9",
    "\u6771\u4eac\u90fd": "\u6771\u4eac\u5730\u65b9",
    "\u795e\u5948\u5ddd\u770c": "\u897f\u90e8",
    "\u65b0\u6f5f\u770c": "\u4e2d\u8d8a",
    "\u5bcc\u5c71\u770c": "\u6771\u90e8",
    "\u77f3\u5ddd\u770c": "\u52a0\u8cc0",
    "\u798f\u4e95\u770c": "\u5dba\u5317",
    "\u5c71\u68a8\u770c": "\u4e2d\u30fb\u897f\u90e8",
    "\u9577\u91ce\u770c": "\u4e2d\u90e8",
    "\u5c90\u961c\u770c": "\u98db\u9a28\u5730\u65b9",
    "\u9759\u5ca1\u770c": "\u6771\u90e8",
    "\u611b\u77e5\u770c": "\u6771\u90e8",
    "\u4e09\u91cd\u770c": "\u5357\u90e8",
    "\u6ecb\u8cc0\u770c": "\u5317\u90e8",
    "\u4eac\u90fd\u5e9c": "\u5317\u90e8",
    "\u5927\u962a\u5e9c": "\u5927\u962a\u5e9c",
    "\u5175\u5eab\u770c": "\u5317\u90e8",
    "\u5948\u826f\u770c": "\u5357\u90e8",
    "\u548c\u6b4c\u5c71\u770c": "\u5357\u90e8",
    "\u9ce5\u53d6\u770c": "\u4e2d\u30fb\u897f\u90e8",
    "\u5cf6\u6839\u770c": "\u6771\u90e8",
    "\u5ca1\u5c71\u770c": "\u5317\u90e8",
    "\u5e83\u5cf6\u770c": "\u5317\u90e8",
    "\u5c71\u53e3\u770c": "\u6771\u90e8",
    "\u5fb3\u5cf6\u770c": "\u5317\u90e8",
    "\u9999\u5ddd\u770c": "\u9999\u5ddd\u770c",
    "\u611b\u5a9b\u770c": "\u4e2d\u4e88",
    "\u9ad8\u77e5\u770c": "\u4e2d\u90e8",
    "\u798f\u5ca1\u770c": "\u7b51\u8c4a\u5730\u65b9",
    "\u4f50\u8cc0\u770c": "\u5317\u90e8",
    "\u9577\u5d0e\u770c": "\u5357\u90e8",
    "\u718a\u672c\u770c": "\u963f\u8607\u5730\u65b9",
    "\u5927\u5206\u770c": "\u4e2d\u90e8",
    "\u5bae\u5d0e\u770c": "\u5317\u90e8\u5c71\u6cbf\u3044",
    "\u9e7f\u5150\u5cf6\u770c": "\u85a9\u6469\u5730\u65b9"
  };
  const WEATHER_AREA_KEYWORD_RULES = {
    "\u5317\u6d77\u9053": [
      { area: "\u5f8c\u5fd7\u5730\u65b9", keywords: ["\u5036\u77e5\u5b89", "\u5171\u548c", "\u9ed2\u677e\u5185", "\u4eac\u6975", "\u7f8a\u8e44"] },
      { area: "\u65e5\u9ad8\u5730\u65b9", keywords: ["\u5e73\u53d6", "\u65e5\u9ad8", "\u69d8\u4f3c", "\u65b0\u51a0", "\u65e5\u9ad8\u5c71\u8108"] },
      { area: "\u80c6\u632f\u5730\u65b9", keywords: ["\u82eb\u5c0f\u7267", "\u767b\u5225", "\u58ee\u77a5", "\u6d1e\u723a", "\u5b89\u5e73", "\u6a3d\u524d"] },
      { area: "\u5341\u52dd\u5730\u65b9", keywords: ["\u4e0a\u58eb\u5e4c", "\u65b0\u5f97", "\u9e7f\u8ffd", "\u5e4c\u6cc9", "\u65e5\u9ad8\u753a", "\u5341\u52dd"] },
      { area: "\u7a7a\u77e5\u5730\u65b9", keywords: ["\u5357\u5bcc\u826f\u91ce", "\u5bcc\u826f\u91ce", "\u5915\u5f35", "\u82a6\u5225", "\u4e09\u7b20", "\u7f8e\u745b"] },
      { area: "\u7db2\u8d70\u5730\u65b9", keywords: ["\u77e5\u5e8a", "\u7f85\u81fc", "\u6e05\u91cc", "\u6d25\u5225", "\u6d25\u5225\u5ce0"] },
      { area: "\u5317\u898b\u5730\u65b9", keywords: ["\u5927\u96ea\u5c71\u7cfb", "\u5c64\u96f2\u5ce1", "\u7f8e\u5e4c", "\u9060\u8efd", "\u7f6e\u6238"] },
      { area: "\u7d0b\u5225\u5730\u65b9", keywords: ["\u6edd\u4e0a", "\u897f\u8208\u90e8", "\u8208\u90e8", "\u7d0b\u5225"] },
      { area: "\u6e21\u5cf6\u5730\u65b9", keywords: ["\u68ee\u753a", "\u4e03\u98ef", "\u9e7f\u90e8", "\u5927\u6cbc"] },
      { area: "\u6a9c\u5c71\u5730\u65b9", keywords: ["\u5965\u5c3b", "\u4eca\u91d1", "\u5317\u6a9c\u5c71"] },
      { area: "\u7559\u840c\u5730\u65b9", keywords: ["\u6691\u5bd2\u5225", "\u7559\u840c"] },
      { area: "\u4e0a\u5ddd\u5730\u65b9", keywords: ["\u5c64\u96f2\u5ce1", "\u4e0a\u5ddd", "\u6771\u5ddd", "\u4e0b\u5ddd", "\u5929\u5869", "\u5927\u96ea"] }
    ],
    "\u9752\u68ee\u770c": [
      { area: "\u6d25\u8efd", keywords: ["\u6d25\u8efd", "\u897f\u76ee\u5c4b", "\u5cb3\u6e29\u6cc9", "\u767d\u795e", "\u5f18\u524d"] },
      { area: "\u4e09\u516b\u4e0a\u5317", keywords: ["\u516b\u7532\u7530", "\u5341\u548c\u7530", "\u516b\u6238"] },
      { area: "\u4e0b\u5317", keywords: ["\u4e0b\u5317", "\u6050\u5c71"] }
    ],
    "\u5ca9\u624b\u770c": [
      { area: "\u6cbf\u5cb8\u5317\u90e8", keywords: ["\u5bae\u53e4", "\u5ca9\u6cc9", "\u7530\u91ce\u7551"] },
      { area: "\u6cbf\u5cb8\u5357\u90e8", keywords: ["\u91dc\u77f3", "\u5927\u8239\u6e21", "\u9678\u524d\u9ad8\u7530"] },
      { area: "\u5185\u9678", keywords: ["\u65e9\u6c60\u5cf0", "\u5ca9\u624b\u5c71", "\u516b\u5e61\u5e73", "\u7d2b\u6ce2", "\u6ec5\u77f3"] }
    ],
    "\u5bae\u57ce\u770c": [
      { area: "\u897f\u90e8", keywords: ["\u6817\u99d2", "\u8239\u5f62", "\u8535\u738b", "\u99b4\u8c37", "\u9cf4\u5b50"] },
      { area: "\u6771\u90e8", keywords: ["\u77f3\u5dfb", "\u677e\u5cf6", "\u4ed9\u53f0"] }
    ],
    "\u79cb\u7530\u770c": [
      { area: "\u5185\u9678", keywords: ["\u99d2\u9928", "\u4ed9\u5317", "\u548c\u8cc0", "\u68ee\u5409", "\u6cb3\u8fba", "\u7530\u6ca2\u6e56"] },
      { area: "\u6cbf\u5cb8", keywords: ["\u7531\u5229", "\u7537\u9e7f", "\u80fd\u4ee3"] }
    ],
    "\u5c71\u5f62\u770c": [
      { area: "\u5e84\u5185", keywords: ["\u9ce5\u6d77", "\u6708\u5c71", "\u9db4\u5ca1", "\u5e84\u5185"] },
      { area: "\u6700\u4e0a", keywords: ["\u795e\u5ba4", "\u6700\u4e0a", "\u91d1\u5c71", "\u771f\u5ba4\u5ddd"] },
      { area: "\u7f6e\u8cdc", keywords: ["\u543e\u59bb", "\u98ef\u8c4a", "\u7c73\u6ca2", "\u5c0f\u56fd"] },
      { area: "\u6751\u5c71", keywords: ["\u8535\u738b", "\u5c71\u5f62", "\u6771\u6839"] }
    ],
    "\u798f\u5cf6\u770c": [
      { area: "\u4f1a\u6d25", keywords: ["\u4f1a\u6d25", "\u6a9c\u679d\u5c90", "\u53ea\u898b", "\u6a19\u8449", "\u87ba\u826f", "\u732a\u82d7\u4ee3\u6e56\u897f", "\u88cf\u78d0\u68af"] },
      { area: "\u6d5c\u901a\u308a", keywords: ["\u76f8\u99ac", "\u3044\u308f\u304d", "\u53cc\u8449"] },
      { area: "\u4e2d\u901a\u308a", keywords: ["\u5b89\u9054\u592a\u826f", "\u543e\u59bb", "\u90e1\u5c71", "\u798f\u5cf6", "\u767d\u6cb3"] }
    ],
    "\u8328\u57ce\u770c": [
      { area: "\u5317\u90e8", keywords: ["\u888b\u7530", "\u5927\u5b50", "\u65e5\u7acb", "\u5965\u4e45\u6148"] },
      { area: "\u5357\u90e8", keywords: ["\u3064\u304f\u3070", "\u58eb\u6d66"] }
    ],
    "\u6803\u6728\u770c": [
      { area: "\u5317\u90e8", keywords: ["\u90a3\u9808", "\u65e5\u5149", "\u5869\u539f", "\u5973\u5cf0", "\u7537\u4f53", "\u90a3\u9808\u76d0\u539f"] },
      { area: "\u5357\u90e8", keywords: ["\u8db3\u5229", "\u4f50\u91ce"] }
    ],
    "\u7fa4\u99ac\u770c": [
      { area: "\u5317\u90e8", keywords: ["\u307f\u306a\u304b\u307f", "\u7247\u54c1", "\u5ddd\u5834", "\u8c37\u5ddd", "\u6b66\u5c0a", "\u767d\u6839"] },
      { area: "\u5357\u90e8", keywords: ["\u59d9\u7fa9", "\u8352\u8239", "\u4e0b\u4ec1\u7530", "\u5b89\u4e2d", "\u69db\u540d", "\u6d45\u9593\u96a0"] }
    ],
    "\u57fc\u7389\u770c": [
      { area: "\u79e9\u7236\u5730\u65b9", keywords: ["\u79e9\u7236", "\u6b66\u7532", "\u4e21\u795e", "\u548c\u540d\u5009", "\u9577\u701e"] },
      { area: "\u5317\u90e8", keywords: ["\u6df1\u8c37", "\u718a\u8c37"] },
      { area: "\u5357\u90e8", keywords: ["\u3055\u3044\u305f\u307e", "\u5ddd\u53e3"] }
    ],
    "\u795e\u5948\u5ddd\u770c": [
      { area: "\u897f\u90e8", keywords: ["\u4e39\u6ca2", "\u86ed\u30f6\u5cb3", "\u5854\u30ce\u5cb3", "\u5927\u5c71", "\u7bb1\u6839", "\u677e\u7530", "\u5c71\u5317"] },
      { area: "\u6771\u90e8", keywords: ["\u6a2a\u6d5c", "\u5ddd\u5d0e"] }
    ],
    "\u65b0\u6f5f\u770c": [
      { area: "\u4e0b\u8d8a", keywords: ["\u4e8c\u738b\u5b50", "\u6733\u5dee", "\u98ef\u8c4a", "\u6751\u4e0a", "\u80ce\u5185", "\u65b0\u767a\u7530"] },
      { area: "\u4e2d\u8d8a", keywords: ["\u8352\u6ca2", "\u5ddd\u53e3", "\u516b\u6d77", "\u5de6\u6b66\u6d41", "\u9ce5\u7532", "\u6d25\u5357", "\u9b5a\u6cbc"] },
      { area: "\u4e0a\u8d8a", keywords: ["\u5999\u9ad8", "\u706b\u6253", "\u96ea\u5009", "\u7cdf\u5e73", "\u7cf8\u9b5a\u5ddd", "\u5999\u9ad8\u9ad8\u539f"] }
    ],
    "\u5bcc\u5c71\u770c": [
      { area: "\u6771\u90e8", keywords: ["\u7acb\u5c71", "\u5263", "\u9ed2\u90e8", "\u6bdb\u52dd", "\u5b87\u5948\u6708", "\u4e0a\u5e02"] },
      { area: "\u897f\u90e8", keywords: ["\u4e94\u7b87\u5c71", "\u91d1\u525b\u5802", "\u5357\u7814", "\u5bcc\u5c71\u5e02\u897f\u90e8"] }
    ],
    "\u77f3\u5ddd\u770c": [
      { area: "\u80fd\u767b", keywords: ["\u80fd\u767b", "\u767d\u6728\u5cf0"] },
      { area: "\u52a0\u8cc0", keywords: ["\u767d\u5c71", "\u52a0\u8cc0", "\u5c0f\u677e", "\u767d\u5cf0"] }
    ],
    "\u798f\u4e95\u770c": [
      { area: "\u5dba\u5357", keywords: ["\u82e5\u72ed", "\u4e09\u65b9", "\u6566\u8cc0"] },
      { area: "\u5dba\u5317", keywords: ["\u8352\u5cf6", "\u80dc\u5c71", "\u5927\u91ce", "\u80fd\u90f7"] }
    ],
    "\u5c71\u68a8\u770c": [
      { area: "\u6771\u90e8\u30fb\u5bcc\u58eb\u4e94\u6e56", keywords: ["\u4e09\u3064\u5ce0", "\u5927\u6708", "\u9053\u5fd7", "\u5fcd\u91ce", "\u5bcc\u58eb\u5409\u7530", "\u5c71\u4e2d\u6e56"] },
      { area: "\u4e2d\u30fb\u897f\u90e8", keywords: ["\u8325\u30f6\u5cb3", "\u4e7e\u5fb3", "\u9cf3\u51f0", "\u5317\u5cb3", "\u4ed9\u4e08", "\u97ee\u5d0e", "\u7532\u5dde"] }
    ],
    "\u9577\u91ce\u770c": [
      { area: "\u5317\u90e8", keywords: ["\u9ed2\u59eb", "\u98ef\u7db1", "\u6238\u96a0", "\u96e8\u98fe", "\u9ad8\u59bb", "\u5c0f\u8c37", "\u767d\u99ac", "\u5fd7\u8cc0"] },
      { area: "\u4e2d\u90e8", keywords: ["\u71d5", "\u5927\u5929\u4e95", "\u9707\u6ca2", "\u84fc\u79d1", "\u7f8e\u30f6\u539f", "\u9727\u30f6\u5cf0", "\u6d45\u9593", "\u5fa1\u5c04\u9e7f\u6c60"] },
      { area: "\u5357\u90e8", keywords: ["\u6728\u66fd", "\u7a7a\u6728", "\u5357\u99d2", "\u92f8", "\u8fb2\u9ce5", "\u7b39\u30f6\u5cb3", "\u4e0a\u6cb3\u5185", "\u6c60\u53e3", "\u6613\u8001\u6e21"] }
    ],
    "\u5c90\u961c\u770c": [
      { area: "\u98db\u9a28\u5730\u65b9", keywords: ["\u69cd", "\u7a42\u9ad8", "\u7b20", "\u98db\u9a28", "\u65b0\u7a42\u9ad8", "\u5e73\u6e6f", "\u4e0a\u9ad8\u5730"] },
      { area: "\u7f8e\u6fc3\u5730\u65b9", keywords: ["\u5fa1\u5728\u6240", "\u5927\u65e5", "\u80fd\u90f7", "\u767d\u5c71", "\u90e1\u4e0a"] }
    ],
    "\u9759\u5ca1\u770c": [
      { area: "\u4f0a\u8c46", keywords: ["\u5929\u57ce", "\u4f0a\u8c46"] },
      { area: "\u6771\u90e8", keywords: ["\u611b\u9df9", "\u5bcc\u58eb", "\u5fa1\u6bbf\u5834", "\u88fe\u91ce", "\u4e09\u5cf6"] },
      { area: "\u4e2d\u90e8", keywords: ["\u8d64\u77f3", "\u60aa\u6ca2", "\u8056", "\u5149", "\u4e95\u5ddd", "\u7573\u85b7"] },
      { area: "\u897f\u90e8", keywords: ["\u6d5c\u677e", "\u5929\u7adc"] }
    ],
    "\u611b\u77e5\u770c": [
      { area: "\u6771\u90e8", keywords: ["\u9cf3\u6765\u5bfa", "\u8a2d\u697d", "\u6bb5\u6238", "\u8336\u81fc"] },
      { area: "\u897f\u90e8", keywords: ["\u540d\u53e4\u5c4b"] }
    ],
    "\u4e09\u91cd\u770c": [
      { area: "\u5357\u90e8", keywords: ["\u5927\u53f0\u30f6\u539f", "\u7d00\u5317", "\u718a\u91ce", "\u5c3e\u9df2"] },
      { area: "\u5317\u4e2d\u90e8", keywords: ["\u5fa1\u5728\u6240", "\u9234\u9e7f", "\u56db\u65e5\u5e02", "\u83c5\u91ce"] }
    ],
    "\u6ecb\u8cc0\u770c": [
      { area: "\u5317\u90e8", keywords: ["\u6b66\u5948\u30f6\u5cb3", "\u6bd4\u826f", "\u9ad8\u5cf6", "\u4f0a\u9999", "\u971c\u539f"] },
      { area: "\u5357\u90e8", keywords: ["\u6bd4\u53e1", "\u5927\u6d25", "\u8349\u6d25"] }
    ],
    "\u4eac\u90fd\u5e9c": [
      { area: "\u5317\u90e8", keywords: ["\u7f8e\u5c71", "\u5bab\u6d25", "\u4e39\u5f8c"] },
      { area: "\u5357\u90e8", keywords: ["\u5927\u6c5f", "\u4eac\u90fd\u5e02", "\u6728\u6d25\u5ddd"] }
    ],
    "\u5175\u5eab\u770c": [
      { area: "\u5317\u90e8", keywords: ["\u6c37\u30ce\u5c71", "\u990a\u7236", "\u9999\u7f8e", "\u5175\u5eab\u5317\u90e8"] },
      { area: "\u5357\u90e8", keywords: ["\u516d\u7532", "\u6469\u8036", "\u9808\u78e8", "\u59eb\u8def"] }
    ],
    "\u5948\u826f\u770c": [
      { area: "\u5357\u90e8", keywords: ["\u5927\u5cf0", "\u91c8\u8fe6", "\u4f2f\u6bcd\u5b50", "\u5341\u6d25\u5ddd", "\u4e0a\u5317\u5c71", "\u5929\u5ddd"] },
      { area: "\u5317\u90e8", keywords: ["\u91d1\u525b", "\u845b\u57ce", "\u5948\u826f\u5e02"] }
    ],
    "\u548c\u6b4c\u5c71\u770c": [
      { area: "\u5357\u90e8", keywords: ["\u4f2f\u6bcd\u5b50", "\u9f8d\u795e", "\u7530\u8fba", "\u65b0\u5bae", "\u679c\u7121"] },
      { area: "\u5317\u90e8", keywords: ["\u9ad8\u91ce", "\u6a4b\u672c", "\u548c\u6b4c\u5c71\u5e02"] }
    ],
    "\u9ce5\u53d6\u770c": [
      { area: "\u4e2d\u30fb\u897f\u90e8", keywords: ["\u5927\u5c71", "\u4e09\u5e73\u5c71", "\u5009\u5409", "\u6c5f\u5e9c", "\u4fef\u77b0"] },
      { area: "\u6771\u90e8", keywords: ["\u6c37\u30ce\u5c71", "\u82e5\u685c", "\u9ce5\u53d6"] }
    ],
    "\u5cf6\u6839\u770c": [
      { area: "\u6771\u90e8", keywords: ["\u4e09\u74f6", "\u543e\u59bb", "\u5b89\u6765", "\u677e\u6c5f", "\u96f2\u5357"] },
      { area: "\u897f\u90e8", keywords: ["\u77f3\u898b", "\u6d5c\u7530", "\u76ca\u7530"] }
    ],
    "\u5ca1\u5c71\u770c": [
      { area: "\u5317\u90e8", keywords: ["\u84dc\u5c71", "\u5f8c\u5c71", "\u771f\u5ead", "\u65b0\u898b"] },
      { area: "\u5357\u90e8", keywords: ["\u5ca1\u5c71", "\u5009\u6577"] }
    ],
    "\u5e83\u5cf6\u770c": [
      { area: "\u5317\u90e8", keywords: ["\u6bd4\u5a46", "\u6050\u7f85\u6f22", "\u4e09\u6b21", "\u5e84\u539f"] },
      { area: "\u5357\u90e8", keywords: ["\u5e83\u5cf6", "\u5bae\u5cf6", "\u5ec3\u96e8"] }
    ],
    "\u5c71\u53e3\u770c": [
      { area: "\u6771\u90e8", keywords: ["\u5bc2\u5730", "\u5ca9\u56fd", "\u5468\u5357"] },
      { area: "\u4e2d\u90e8", keywords: ["\u5c71\u53e3", "\u7f8e\u79b0"] },
      { area: "\u5317\u90e8", keywords: ["\u843d\u5408", "\u9577\u9580"] },
      { area: "\u897f\u90e8", keywords: ["\u4e0b\u95a2"] }
    ],
    "\u5fb3\u5cf6\u770c": [
      { area: "\u5357\u90e8", keywords: ["\u4e09\u5dba", "\u6771\u8d64\u77f3", "\u525b\u5c71", "\u90a3\u8cc0", "\u6728\u6ca2"] },
      { area: "\u5317\u90e8", keywords: ["\u5251\u5c71", "\u7956\u8c37", "\u5fb3\u5cf6\u5e02"] }
    ],
    "\u611b\u5a9b\u770c": [
      { area: "\u6771\u4e88", keywords: ["\u7b39\u30f6\u5cf0", "\u6771\u8d64\u77f3", "\u77f3\u939a", "\u897f\u6761", "\u65b0\u5c45\u6d5c"] },
      { area: "\u4e2d\u4e88", keywords: ["\u77f3\u939a", "\u4e45\u4e07", "\u677e\u5c71", "\u9762\u6cb3"] },
      { area: "\u5357\u4e88", keywords: ["\u5b87\u548c\u5cf6", "\u7be0\u5c71"] }
    ],
    "\u9ad8\u77e5\u770c": [
      { area: "\u6771\u90e8", keywords: ["\u4e09\u5dba", "\u7be0\u5c71", "\u672c\u5c71", "\u9999\u5317"] },
      { area: "\u4e2d\u90e8", keywords: ["\u77f3\u939a", "\u6885\u30ce\u6728", "\u4ec1\u6dc0"] },
      { area: "\u897f\u90e8", keywords: ["\u4e09\u5dba", "\u6a9c\u539f", "\u8db3\u647a"] }
    ],
    "\u798f\u5ca1\u770c": [
      { area: "\u7b51\u8c4a\u5730\u65b9", keywords: ["\u82f1\u5f66\u5c71", "\u7530\u5ddd", "\u6dfb\u7530"] },
      { area: "\u7b51\u5f8c\u5730\u65b9", keywords: ["\u4e45\u7559\u7c73", "\u77e2\u90e8", "\u8033\u7d0d"] },
      { area: "\u5317\u4e5d\u5dde\u5730\u65b9", keywords: ["\u5317\u4e5d\u5dde", "\u82c5\u5c0f\u7530"] },
      { area: "\u798f\u5ca1\u5730\u65b9", keywords: ["\u798f\u5ca1", "\u592a\u5bb0\u5e9c"] }
    ],
    "\u4f50\u8cc0\u770c": [
      { area: "\u5317\u90e8", keywords: ["\u591a\u826f", "\u810a\u632f", "\u4f10\u7531"] },
      { area: "\u5357\u90e8", keywords: ["\u4f50\u8cc0", "\u6709\u660e"] }
    ],
    "\u9577\u5d0e\u770c": [
      { area: "\u5357\u90e8", keywords: ["\u96f2\u4ed9", "\u5cf6\u539f", "\u8afa\u65e9", "\u9ad8\u6765"] },
      { area: "\u5317\u90e8", keywords: ["\u4f50\u4e16\u4fdd", "\u5e73\u6238"] }
    ],
    "\u718a\u672c\u770c": [
      { area: "\u963f\u8607\u5730\u65b9", keywords: ["\u963f\u8607", "\u4e5d\u91cd", "\u9ad8\u68ee", "\u5357\u963f\u8607", "\u7523\u5c71"] },
      { area: "\u7403\u78e8\u5730\u65b9", keywords: ["\u5e02\u623f", "\u4eba\u5409", "\u6c34\u4e0a", "\u7403\u78e8"] },
      { area: "\u5929\u8349\u30fb\u82a6\u5317", keywords: ["\u82a6\u5317", "\u6c34\u4fe3", "\u5929\u8349"] },
      { area: "\u718a\u672c\u5730\u65b9", keywords: ["\u718a\u672c", "\u76ca\u57ce"] }
    ],
    "\u5927\u5206\u770c": [
      { area: "\u4e2d\u90e8", keywords: ["\u7531\u5e03", "\u304f\u3058\u3085\u3046", "\u5225\u5e9c", "\u7acb\u4e2d"] },
      { area: "\u897f\u90e8", keywords: ["\u4e5d\u91cd", "\u4e5d\u91cd\u753a", "\u4e45\u4f4f", "\u98ef\u7530"] },
      { area: "\u5357\u90e8", keywords: ["\u7956\u6bcd", "\u4f50\u4f2f", "\u8c4a\u5f8c\u5927\u91ce"] },
      { area: "\u5317\u90e8", keywords: ["\u82f1\u5f66", "\u56fd\u6771", "\u8036\u99ac"] }
    ],
    "\u5bae\u5d0e\u770c": [
      { area: "\u5317\u90e8\u5c71\u6cbf\u3044", keywords: ["\u7956\u6bcd", "\u5927\u5d29", "\u690e\u8449", "\u65e5\u4e4b\u5f71", "\u9ad8\u5343\u7a42", "\u4e94\u30f6\u702c"] },
      { area: "\u5357\u90e8\u5c71\u6cbf\u3044", keywords: ["\u9ad8\u5343\u7a42", "\u9727\u5cf6", "\u3048\u3073\u306e", "\u5c0f\u6797", "\u9ad8\u539f"] },
      { area: "\u5317\u90e8\u5e73\u91ce\u90e8", keywords: ["\u5ef6\u5ca1", "\u65e5\u5411"] },
      { area: "\u5357\u90e8\u5e73\u91ce\u90e8", keywords: ["\u5bae\u5d0e\u5e02", "\u90fd\u57ce", "\u65e5\u5357"] }
    ],
    "\u9e7f\u5150\u5cf6\u770c": [
      { area: "\u7a2e\u5b50\u5cf6\u30fb\u5c4b\u4e45\u5cf6\u5730\u65b9", keywords: ["\u5bae\u4e4b\u6d66", "\u5c4b\u4e45\u5cf6", "\u6dc0\u5ddd", "\u767d\u8c37"] },
      { area: "\u5927\u9685\u5730\u65b9", keywords: ["\u685c\u5cf6", "\u9ad8\u5343\u7a42", "\u958b\u805e", "\u96fe\u5cf6", "\u6307\u5bbf", "\u9e7f\u5c4b"] },
      { area: "\u85a9\u6469\u5730\u65b9", keywords: ["\u9e7f\u5150\u5cf6", "\u85a9\u6469", "\u8a31\u6590"] }
    ]
  };
  const MOUNTAIN_METADATA_OVERRIDES = {
    "\u5929\u5869\u5cb3": { prefecture: "\u5317\u6d77\u9053", broadRegion: "\u5317\u6d77\u9053", weatherArea: "\u4e0a\u5ddd\u5730\u65b9" },
    "\u77f3\u72e9\u5cb3": { prefecture: "\u5317\u6d77\u9053", broadRegion: "\u5317\u6d77\u9053", weatherArea: "\u5341\u52dd\u5730\u65b9" },
    "\u30cb\u30da\u30bd\u30c4\u5c71": { prefecture: "\u5317\u6d77\u9053", broadRegion: "\u5317\u6d77\u9053", weatherArea: "\u5341\u52dd\u5730\u65b9" },
    "\u30ab\u30e0\u30a4\u30a8\u30af\u30a6\u30c1\u30ab\u30a6\u30b7\u5c71": { prefecture: "\u5317\u6d77\u9053", broadRegion: "\u5317\u6d77\u9053", weatherArea: "\u5341\u52dd\u5730\u65b9" },
    "\u30da\u30c6\u30ac\u30ea\u5cb3": { prefecture: "\u5317\u6d77\u9053", broadRegion: "\u5317\u6d77\u9053", weatherArea: "\u65e5\u9ad8\u5730\u65b9" },
    "\u82a6\u5225\u5cb3": { prefecture: "\u5317\u6d77\u9053", broadRegion: "\u5317\u6d77\u9053", weatherArea: "\u4e0a\u5ddd\u5730\u65b9" },
    "\u5915\u5f35\u5cb3": { prefecture: "\u5317\u6d77\u9053", broadRegion: "\u5317\u6d77\u9053", weatherArea: "\u7a7a\u77e5\u5730\u65b9" },
    "\u6691\u5bd2\u5225\u5cb3": { prefecture: "\u5317\u6d77\u9053", broadRegion: "\u5317\u6d77\u9053", weatherArea: "\u7559\u840c\u5730\u65b9" },
    "\u6a3d\u524d\u5c71": { prefecture: "\u5317\u6d77\u9053", broadRegion: "\u5317\u6d77\u9053", weatherArea: "\u80c6\u632f\u5730\u65b9" },
    "\u5317\u6d77\u9053\u99d2\u30f6\u5cb3": { prefecture: "\u5317\u6d77\u9053", broadRegion: "\u5317\u6d77\u9053", weatherArea: "\u6e21\u5cf6\u5730\u65b9" },
    "\u767d\u795e\u5cb3": { prefecture: "\u9752\u68ee\u770c", broadRegion: "\u6771\u5317", weatherArea: "\u6d25\u8efd" },
    "\u59eb\u795e\u5c71": { prefecture: "\u5ca9\u624b\u770c", broadRegion: "\u6771\u5317", weatherArea: "\u5185\u9678" },
    "\u79cb\u7530\u99d2\u30f6\u5cb3": { prefecture: "\u79cb\u7530\u770c", broadRegion: "\u6771\u5317", weatherArea: "\u5185\u9678" },
    "\u548c\u8cc0\u5cb3": { prefecture: "\u79cb\u7530\u770c", broadRegion: "\u6771\u5317", weatherArea: "\u5185\u9678" },
    "\u68ee\u5409\u5c71": { prefecture: "\u79cb\u7530\u770c", broadRegion: "\u6771\u5317", weatherArea: "\u5185\u9678" },
    "\u713c\u77f3\u5cb3": { prefecture: "\u5ca9\u624b\u770c", broadRegion: "\u6771\u5317", weatherArea: "\u5185\u9678" },
    "\u6817\u99d2\u5c71": { prefecture: "\u5bae\u57ce\u770c", broadRegion: "\u6771\u5317", weatherArea: "\u897f\u90e8" },
    "\u795e\u5ba4\u5c71": { prefecture: "\u5c71\u5f62\u770c", broadRegion: "\u6771\u5317", weatherArea: "\u6700\u4e0a" },
    "\u8239\u5f62\u5c71": { prefecture: "\u5bae\u57ce\u770c", broadRegion: "\u6771\u5317", weatherArea: "\u897f\u90e8" },
    "\u4ee5\u6771\u5cb3": { prefecture: "\u5c71\u5f62\u770c", broadRegion: "\u6771\u5317", weatherArea: "\u5e84\u5185" },
    "\u6733\u5dee\u5cb3": { prefecture: "\u65b0\u6f5f\u770c", broadRegion: "\u4e2d\u90e8", weatherArea: "\u4e0b\u8d8a" },
    "\u4e8c\u738b\u5b50\u5cb3": { prefecture: "\u65b0\u6f5f\u770c", broadRegion: "\u4e2d\u90e8", weatherArea: "\u4e0b\u8d8a" }
  };
  const SUPPLEMENTAL_MOUNTAIN_DATA = {
    "\u9ed2\u59eb\u5c71": {
      bestSeasonText: "6\u6708\u301c10\u6708",
      modelCourse: "\u5927\u6a4b\u767b\u5c71\u53e3\u30b3\u30fc\u30b9",
      courseName: "\u5927\u6a4b\u767b\u5c71\u53e3\u30b3\u30fc\u30b9",
      coursePoints: "\u5927\u6a4b\u767b\u5c71\u53e3 \u2192 \u3057\u306a\u306e\u6728 \u2192 \u9ed2\u59eb\u5c71",
      courseTime: "7\u6642\u9593",
      courseDistance: "13.8km",
      cumulativeElevation: "+1010m / -1010m"
    },
    "\u5ca9\u83c5\u5c71": {
      bestSeasonText: "6\u6708\u301c10\u6708",
      modelCourse: "\u5ca9\u83c5\u5c71\u767b\u5c71\u53e3\u30b3\u30fc\u30b9",
      courseName: "\u5ca9\u83c5\u5c71\u767b\u5c71\u53e3\u30b3\u30fc\u30b9",
      coursePoints: "\u5ca9\u83c5\u5c71\u767b\u5c71\u9053\u5165\u53e3 \u2192 \u30ce\u30c3\u30ad\u30ea \u2192 \u5ca9\u83c5\u5c71",
      courseTime: "5\u664235\u5206",
      courseDistance: "9.63km",
      cumulativeElevation: "+1236m / -1236m"
    },
    "\u5fa1\u5ea7\u5c71": {
      bestSeasonText: "6\u6708\u301c10\u6708",
      modelCourse: "\u9577\u8005\u306e\u68ee\u30b3\u30fc\u30b9",
      courseName: "\u9577\u8005\u306e\u68ee\u30b3\u30fc\u30b9",
      coursePoints: "\u9577\u8005\u306e\u68ee\u767b\u5c71\u53e3 \u2192 \u898b\u6674\u53f0 \u2192 \u5fa1\u5ea7\u5c71",
      courseTime: "5\u664240\u5206",
      courseDistance: "10.99km",
      cumulativeElevation: "+1751m / -1751m"
    },
    "\u6bdb\u7121\u5c71": {
      bestSeasonText: "4\u6708\u301c11\u6708",
      modelCourse: "\u9e93\u767b\u5c71\u53e3\u30b3\u30fc\u30b9",
      courseName: "\u9e93\u767b\u5c71\u53e3\u30b3\u30fc\u30b9",
      coursePoints: "\u9e93\u767b\u5c71\u53e3\u99d0\u8eca\u5834 \u2192 \u5730\u8535\u5ce0\u5206\u5c90 \u2192 \u6bdb\u7121\u5c71",
      courseTime: "5\u664220\u5206"
    },
    "\u6adb\u5f62\u5c71": {
      bestSeasonText: "5\u6708\u301c10\u6708",
      modelCourse: "\u6c60\u306e\u8336\u5c4b\u767b\u5c71\u9053\u30eb\u30fc\u30c8",
      courseName: "\u6c60\u306e\u8336\u5c4b\u767b\u5c71\u9053\u30eb\u30fc\u30c8",
      coursePoints: "\u6c60\u306e\u8336\u5c4b\u767b\u5c71\u53e3 \u2192 \u6adb\u5f62\u5c71",
      courseTime: "1\u664220\u5206",
      courseDistance: "2.25km",
      cumulativeElevation: "+280m / -280m"
    },
    "\u71d5\u5cb3": {
      bestSeasonText: "6\u6708\u301c10\u6708",
      modelCourse: "\u4e2d\u623f\u6e29\u6cc9\u30fb\u5408\u6226\u5c3e\u6839\u30b3\u30fc\u30b9",
      courseName: "\u4e2d\u623f\u6e29\u6cc9\u30fb\u5408\u6226\u5c3e\u6839\u30b3\u30fc\u30b9",
      coursePoints: "\u4e2d\u623f\u6e29\u6cc9\u767b\u5c71\u53e3 \u2192 \u5408\u6226\u5c0f\u5c4b \u2192 \u71d5\u5c71\u8358 \u2192 \u71d5\u5cb3",
      courseTime: "8\u66425\u5206",
      courseDistance: "10.2km",
      cumulativeElevation: "+1673m / -1673m"
    },
    "\u5927\u5929\u4e95\u5cb3": {
      bestSeasonText: "7\u6708\u301c10\u6708",
      modelCourse: "\u4e2d\u623f\u6e29\u6cc9\u30fb\u8868\u9280\u5ea7\u30b3\u30fc\u30b9",
      courseName: "\u4e2d\u623f\u6e29\u6cc9\u30fb\u8868\u9280\u5ea7\u30b3\u30fc\u30b9",
      coursePoints: "\u4e2d\u623f\u6e29\u6cc9\u767b\u5c71\u53e3 \u2192 \u71d5\u5cb3 \u2192 \u5927\u5929\u4e95\u5cb3",
      courseTime: "13\u664220\u5206"
    },
    "\u611b\u9df9\u5c71": {
      bestSeasonText: "4\u6708\u301c11\u6708",
      modelCourse: "\u5341\u91cc\u6728\u9ad8\u539f\u30fb\u8d8a\u524d\u5cb3\u30b3\u30fc\u30b9",
      courseName: "\u5341\u91cc\u6728\u9ad8\u539f\u30fb\u8d8a\u524d\u5cb3\u30b3\u30fc\u30b9",
      coursePoints: "\u5341\u91cc\u6728\u9ad8\u539f\u99d0\u8eca\u5834 \u2192 \u99ac\u306e\u80cc \u2192 \u8d8a\u524d\u5cb3",
      courseTime: "3\u664240\u5206",
      courseDistance: "5.5km",
      cumulativeElevation: "+620m / -620m"
    },
    "\u5927\u65e5\u30f6\u5cb3": {
      bestSeasonText: "5\u6708\u301c11\u6708",
      modelCourse: "\u3072\u308b\u304c\u306e\u9ad8\u539f\u30b3\u30fc\u30b9",
      courseName: "\u3072\u308b\u304c\u306e\u9ad8\u539f\u30b3\u30fc\u30b9",
      coursePoints: "\u3072\u308b\u304c\u306e\u9ad8\u539f\u767b\u5c71\u53e3 \u2192 \u5927\u65e5\u30f6\u5cb3",
      courseTime: "4\u664230\u5206"
    },
    "\u80fd\u90f7\u767d\u5c71": {
      bestSeasonText: "5\u6708\u301c11\u6708",
      modelCourse: "\u6e29\u898b\u5ce0\u30b3\u30fc\u30b9",
      courseName: "\u6e29\u898b\u5ce0\u30b3\u30fc\u30b9",
      coursePoints: "\u6e29\u898b\u5ce0 \u2192 \u80fd\u90f7\u767d\u5c71",
      courseTime: "3\u664220\u5206",
      courseDistance: "5.76km",
      cumulativeElevation: "+987m / -987m"
    },
    "\u8352\u6ca2\u5cb3": {
      bestSeasonText: "6\u6708\u301c10\u6708",
      modelCourse: "\u8352\u6ca2\u5cb3\u767b\u5c71\u53e3\u30b3\u30fc\u30b9",
      courseName: "\u8352\u6ca2\u5cb3\u767b\u5c71\u53e3\u30b3\u30fc\u30b9",
      coursePoints: "\u8352\u6ca2\u5cb3\u767b\u5c71\u53e3 \u2192 \u8352\u6ca2\u5cb3",
      courseTime: "\u4e0a\u308a\uff1a4\u664230\u5206 / \u4e0b\u308a\uff1a4\u6642\u9593"
    },
    "\u4e2d\u30ce\u5cb3": {
      bestSeasonText: "6\u6708\u301c10\u6708",
      modelCourse: "\u5341\u5b57\u5ce1\u767b\u5c71\u30bb\u30f3\u30bf\u30fc\u30b3\u30fc\u30b9",
      courseName: "\u5341\u5b57\u5ce1\u767b\u5c71\u30bb\u30f3\u30bf\u30fc\u30b3\u30fc\u30b9",
      coursePoints: "\u5341\u5b57\u5ce1\u767b\u5c71\u30bb\u30f3\u30bf\u30fc \u2192 \u65e5\u5411\u5c71 \u2192 \u4e2d\u30ce\u5cb3",
      courseTime: "13\u664255\u5206"
    },
    "\u767d\u7802\u5c71": {
      bestSeasonText: "6\u6708\u301c10\u6708",
      modelCourse: "\u91ce\u53cd\u6e56\u5468\u56de\u30b3\u30fc\u30b9",
      courseName: "\u91ce\u53cd\u6e56\u5468\u56de\u30b3\u30fc\u30b9",
      coursePoints: "\u91ce\u53cd\u6e56 \u2192 \u5730\u8535\u5ce0 \u2192 \u5802\u5ca9\u5c71 \u2192 \u767d\u7802\u5c71 \u2192 \u516b\u9593\u5c71 \u2192 \u91ce\u53cd\u6e56",
      courseTime: "8\u6642\u9593",
      courseDistance: "14.62km",
      cumulativeElevation: "+1506m / -1506m"
    },
    "\u9ce5\u7532\u5c71": {
      bestSeasonText: "6\u6708\u301c10\u6708",
      modelCourse: "\u30e0\u30b8\u30ca\u5e73\u301c\u5c4b\u6577\u5468\u56de\u30b3\u30fc\u30b9",
      courseName: "\u30e0\u30b8\u30ca\u5e73\u301c\u5c4b\u6577\u5468\u56de\u30b3\u30fc\u30b9",
      coursePoints: "\u30e0\u30b8\u30ca\u5e73\u767b\u5c71\u53e3 \u2192 \u9ce5\u7532\u5c71 \u2192 \u5c4b\u6577\u767b\u5c71\u53e3 \u2192 \u30e0\u30b8\u30ca\u5e73",
      courseTime: "8\u664235\u5206",
      courseDistance: "14.36km",
      cumulativeElevation: "+2358m / -2358m"
    },
    "\u91dd\u30ce\u6728\u5cb3": {
      bestSeasonText: "6\u6708\u301c10\u6708",
      modelCourse: "\u6247\u6ca2\u30fb\u91dd\u30ce\u6728\u5927\u96ea\u6e13\u30b3\u30fc\u30b9",
      courseName: "\u6247\u6ca2\u30fb\u91dd\u30ce\u6728\u5927\u96ea\u6e13\u30b3\u30fc\u30b9",
      coursePoints: "\u6247\u6ca2 \u2192 \u5927\u6ca2\u5c0f\u5c4b \u2192 \u91dd\u30ce\u6728\u5ce0 \u2192 \u91dd\u30ce\u6728\u5cb3",
      courseTime: "9\u664240\u5206",
      courseDistance: "13.1km",
      cumulativeElevation: "+2631m / -2631m"
    },
    "\u6709\u660e\u5c71": {
      bestSeasonText: "6\u6708\u301c10\u6708",
      modelCourse: "\u6709\u660e\u8358\u30fb\u88cf\u53c2\u9053\u30b3\u30fc\u30b9",
      courseName: "\u6709\u660e\u8358\u30fb\u88cf\u53c2\u9053\u30b3\u30fc\u30b9",
      coursePoints: "\u6709\u660e\u8358 \u2192 \u6709\u660e\u5c71\u5317\u5cb3 \u2192 \u6709\u660e\u5c71\u5357\u5cb3",
      courseTime: "7\u664240\u5206",
      courseDistance: "5.3km",
      cumulativeElevation: "+980m / -980m"
    },
    "\u5357\u99d2\u30f6\u5cb3": {
      bestSeasonText: "7\u6708\u301c10\u6708",
      modelCourse: "\u4f0a\u5948\u5ddd\u30c0\u30e0\u4e0a\u30fb\u8d8a\u767e\u5c71\u7d4c\u7531\u30b3\u30fc\u30b9",
      courseName: "\u4f0a\u5948\u5ddd\u30c0\u30e0\u4e0a\u30fb\u8d8a\u767e\u5c71\u7d4c\u7531\u30b3\u30fc\u30b9",
      coursePoints: "\u4f0a\u5948\u5ddd\u30c0\u30e0\u4e0a\u99d0\u8eca\u5834 \u2192 \u8d8a\u767e\u5c71 \u2192 \u5357\u99d2\u30f6\u5cb3",
      courseTime: "15\u664220\u5206",
      courseDistance: "19.55km",
      cumulativeElevation: "+3088m / -3032m"
    },
    "\u91d1\u525b\u5802\u5c71": {
      bestSeasonText: "5\u6708\u301c11\u6708",
      modelCourse: "\u6803\u8c37\u30eb\u30fc\u30c8",
      courseName: "\u6803\u8c37\u30eb\u30fc\u30c8",
      coursePoints: "\u6803\u8c37\u767b\u5c71\u53e3 \u2192 \u524d\u91d1\u525b \u2192 \u4e2d\u91d1\u525b",
      courseTime: "4\u6642\u9593",
      courseDistance: "9.58km",
      cumulativeElevation: "+1468m / -1468m"
    },
    "\u4f4d\u5c71": {
      bestSeasonText: "5\u6708\u301c11\u6708",
      modelCourse: "\u30e2\u30f3\u30c7\u30a6\u30b9\u98db\u9a28\u4f4d\u5c71\u30b3\u30fc\u30b9",
      courseName: "\u30e2\u30f3\u30c7\u30a6\u30b9\u98db\u9a28\u4f4d\u5c71\u30b3\u30fc\u30b9",
      coursePoints: "\u30e2\u30f3\u30c7\u30a6\u30b9\u98db\u9a28\u4f4d\u5c71 \u2192 \u4f4d\u5c71",
      courseTime: "3\u664230\u5206"
    },
    "\u5c0f\u79c0\u5c71": {
      bestSeasonText: "5\u6708\u301c10\u6708",
      modelCourse: "\u4e59\u5973\u6e13\u30b3\u30fc\u30b9",
      courseName: "\u4e59\u5973\u6e13\u30b3\u30fc\u30b9",
      coursePoints: "\u4e59\u5973\u6e13\u767b\u5c71\u53e3 \u2192 \u5c0f\u79c0\u5c71",
      courseTime: "8\u664230\u5206"
    },
    "\u4f50\u6b66\u6d41\u5c71": {
      bestSeasonText: "6\u6708\u301c10\u6708",
      modelCourse: "\u30c9\u30ed\u30ce\u6728\u5e73\u30b3\u30fc\u30b9",
      courseName: "\u30c9\u30ed\u30ce\u6728\u5e73\u30b3\u30fc\u30b9",
      coursePoints: "\u30c9\u30ed\u30ce\u6728\u5e73\u767b\u5c71\u53e3 \u2192 \u4f50\u6b66\u6d41\u5c71",
      courseTime: "11\u664237\u5206",
      courseDistance: "19.27km",
      cumulativeElevation: "+1613m / -1613m"
    },
    "\u5b89\u5e73\u8def\u5c71": {
      bestSeasonText: "6\u6708\u301c10\u6708",
      modelCourse: "\u6442\u53e4\u6728\u81ea\u7136\u5712\u5165\u53e3\u30b3\u30fc\u30b9",
      courseName: "\u6442\u53e4\u6728\u81ea\u7136\u5712\u5165\u53e3\u30b3\u30fc\u30b9",
      coursePoints: "\u5927\u5e73\u5bbf \u2192 \u6442\u53e4\u6728\u5c71 \u2192 \u5b89\u5e73\u8def\u5c71",
      courseTime: "8\u66426\u5206",
      courseDistance: "29.3km",
      cumulativeElevation: "+1710m / -1712m"
    },
    "\u92f8\u5cb3": {
      bestSeasonText: "6\u6708\u301c10\u6708",
      modelCourse: "\u6238\u53f0\u6cb3\u539f\u30b3\u30fc\u30b9",
      courseName: "\u6238\u53f0\u6cb3\u539f\u30b3\u30fc\u30b9",
      coursePoints: "\u6238\u53f0\u6cb3\u539f \u2192 \u89d2\u5175\u885b\u6ca2 \u2192 \u92f8\u5cb3",
      courseTime: "12\u664250\u5206"
    },
    "\u6c60\u53e3\u5cb3": {
      bestSeasonText: "6\u6708\u301c10\u6708",
      modelCourse: "\u6c60\u53e3\u6797\u9053\u53e3\u30b3\u30fc\u30b9",
      courseName: "\u6c60\u53e3\u6797\u9053\u53e3\u30b3\u30fc\u30b9",
      coursePoints: "\u6c60\u53e3\u6797\u9053\u53e3 \u2192 \u9762\u5207\u5e73 \u2192 \u6c60\u53e3\u5cb3",
      courseTime: "11\u664210\u5206",
      courseDistance: "16.87km",
      cumulativeElevation: "+2146m / -2146m"
    },
    "\u5927\u7121\u9593\u5c71": {
      bestSeasonText: "6\u6708\u301c10\u6708",
      modelCourse: "\u7530\u4ee3\u767b\u5c71\u53e3\u30b3\u30fc\u30b9",
      courseName: "\u7530\u4ee3\u767b\u5c71\u53e3\u30b3\u30fc\u30b9",
      coursePoints: "\u7530\u4ee3\u767b\u5c71\u53e3 \u2192 \u5c0f\u7121\u9593\u5c71 \u2192 \u5927\u7121\u9593\u5c71",
      courseTime: "13\u664256\u5206",
      courseDistance: "16.8km",
      cumulativeElevation: "+2294m / -2294m"
    },
    "\u7b08\u30f6\u5cb3": {
      bestSeasonText: "6\u6708\u301c10\u6708",
      modelCourse: "\u51ac\u74dc\u5c71\u30fb\u30b7\u30ea\u30bf\u30ab\u5c71\u7d4c\u7531\u30b3\u30fc\u30b9",
      courseName: "\u51ac\u74dc\u5c71\u30fb\u30b7\u30ea\u30bf\u30ab\u5c71\u7d4c\u7531\u30b3\u30fc\u30b9",
      coursePoints: "\u51ac\u74dc\u5c71\u767b\u5c71\u53e3 \u2192 \u30b7\u30ea\u30bf\u30ab\u5c71 \u2192 \u7b08\u30f6\u5cb3",
      courseTime: "\u4e0a\u308a\uff1a6\u664230\u5206 / \u4e0b\u308a\uff1a5\u664250\u5206"
    },
    "\u8d64\u725b\u5cb3": {
      bestSeasonText: "7\u6708\u301c10\u6708",
      modelCourse: "\u8aad\u58f2\u65b0\u9053\u30b3\u30fc\u30b9",
      courseName: "\u8aad\u58f2\u65b0\u9053\u30b3\u30fc\u30b9",
      coursePoints: "\u9ed2\u90e8\u6e56 \u2192 \u5965\u9ed2\u90e8\u30d2\u30e5\u30c3\u30c6 \u2192 \u8d64\u725b\u5cb3",
      courseTime: "34\u664250\u5206",
      courseDistance: "48.6km"
    },
    "\u70cf\u5e3d\u5b50\u5cb3": {
      bestSeasonText: "7\u6708\u301c10\u6708",
      modelCourse: "\u9ad8\u702c\u30c0\u30e0\u30fb\u30d6\u30ca\u7acb\u5c3e\u6839\u30b3\u30fc\u30b9",
      courseName: "\u9ad8\u702c\u30c0\u30e0\u30fb\u30d6\u30ca\u7acb\u5c3e\u6839\u30b3\u30fc\u30b9",
      coursePoints: "\u9ad8\u702c\u30c0\u30e0 \u2192 \u30d6\u30ca\u7acb\u5c3e\u6839\u767b\u5c71\u53e3 \u2192 \u70cf\u5e3d\u5b50\u5c0f\u5c4b \u2192 \u70cf\u5e3d\u5b50\u5cb3",
      courseTime: "11\u664250\u5206",
      courseDistance: "11.013km",
      cumulativeElevation: "+1921m / -1921m"
    },
    "\u5fa1\u795e\u697d\u5cb3": {
      bestSeasonText: "6\u6708\u301c10\u6708",
      modelCourse: "\u5ba4\u8c37\u30b3\u30fc\u30b9",
      courseName: "\u5ba4\u8c37\u30b3\u30fc\u30b9",
      coursePoints: "\u5ba4\u8c37\u767b\u5c71\u53e3 \u2192 \u5fa1\u795e\u697d\u5cb3",
      courseTime: "8\u664230\u5206"
    },
    "\u5b88\u9580\u5cb3": {
      bestSeasonText: "5\u6708\u301c11\u6708",
      modelCourse: "\u4fdd\u4e45\u793c\u30b3\u30fc\u30b9",
      courseName: "\u4fdd\u4e45\u793c\u30b3\u30fc\u30b9",
      coursePoints: "\u4fdd\u4e45\u793c\u99d0\u8eca\u5834 \u2192 \u5b88\u9580\u5927\u5cb3 \u2192 \u5b88\u9580\u5cb3",
      courseTime: "6\u664225\u5206"
    },
    "\u516b\u6d77\u5c71": {
      bestSeasonText: "6\u6708\u301c10\u6708",
      modelCourse: "\u30ed\u30fc\u30d7\u30a6\u30a7\u30a4\u5c71\u9802\u99c5\u30b3\u30fc\u30b9",
      courseName: "\u30ed\u30fc\u30d7\u30a6\u30a7\u30a4\u5c71\u9802\u99c5\u30b3\u30fc\u30b9",
      coursePoints: "\u516b\u6d77\u5c71\u30ed\u30fc\u30d7\u30a6\u30a7\u30fc\u5c71\u9802\u99c5 \u2192 \u85ac\u5e2b\u5cb3 \u2192 \u5343\u672c\u6a9c\u5c0f\u5c4b \u2192 \u516b\u6d77\u5c71",
      courseTime: "6\u664245\u5206"
    },
    "\u98ef\u7e04\u5c71": {
      bestSeasonText: "5\u6708\u301c11\u6708",
      modelCourse: "\u4e00\u306e\u9ce5\u5c45\u30b3\u30fc\u30b9",
      courseName: "\u4e00\u306e\u9ce5\u5c45\u30b3\u30fc\u30b9",
      coursePoints: "\u4e00\u306e\u9ce5\u5c45\u82d1\u5730 \u2192 \u98ef\u7e04\u5c71",
      courseTime: "4\u664255\u5206"
    },
    "\u6238\u96a0\u5c71": {
      bestSeasonText: "6\u6708\u301c10\u6708",
      modelCourse: "\u6238\u96a0\u795e\u793e\u5965\u793e\u5165\u53e3\u30b3\u30fc\u30b9",
      courseName: "\u6238\u96a0\u795e\u793e\u5965\u793e\u5165\u53e3\u30b3\u30fc\u30b9",
      coursePoints: "\u6238\u96a0\u795e\u793e\u5965\u793e\u5165\u53e3 \u2192 \u516b\u65b9\u775b \u2192 \u6238\u96a0\u5c71",
      courseTime: "5\u664245\u5206"
    },
    "\u5929\u72d7\u5cb3": {
      bestSeasonText: "6\u6708\u301c10\u6708",
      modelCourse: "\u6e0b\u306e\u6e6f\u30b3\u30fc\u30b9",
      courseName: "\u6e0b\u306e\u6e6f\u30b3\u30fc\u30b9",
      coursePoints: "\u6e0b\u5fa1\u6bbf\u6e6f \u2192 \u9ed2\u767e\u5408\u30d2\u30e5\u30c3\u30c6 \u2192 \u897f\u5929\u72d7\u5cb3",
      courseTime: "7\u664225\u5206"
    },
    "\u5fa1\u6b63\u4f53\u5c71": {
      bestSeasonText: "5\u6708\u301c11\u6708",
      modelCourse: "\u5c71\u4f0f\u5ce0\u30b3\u30fc\u30b9",
      courseName: "\u5c71\u4f0f\u5ce0\u30b3\u30fc\u30b9",
      coursePoints: "\u5c71\u4f0f\u5ce0\u5165\u53e3 \u2192 \u5fa1\u6b63\u4f53\u5c71",
      courseTime: "5\u664215\u5206"
    },
    "\u4e03\u9762\u5c71": {
      bestSeasonText: "4\u6708\u301c11\u6708",
      modelCourse: "\u8868\u53c2\u9053\u30b3\u30fc\u30b9",
      courseName: "\u8868\u53c2\u9053\u30b3\u30fc\u30b9",
      coursePoints: "\u7fbd\u8863\u99d0\u8eca\u5834 \u2192 \u656c\u614e\u9662 \u2192 \u4e03\u9762\u5c71",
      courseTime: "7\u664240\u5206"
    },
    "\u7d4c\u30f6\u5cb3": {
      bestSeasonText: "5\u6708\u301c10\u6708",
      modelCourse: "\u5927\u6cc9\u6240\u30c0\u30e0\u30b3\u30fc\u30b9",
      courseName: "\u5927\u6cc9\u6240\u30c0\u30e0\u30b3\u30fc\u30b9",
      coursePoints: "\u5927\u6cc9\u6240\u30c0\u30e0 \u2192 \u7d4c\u30f6\u5cb3",
      courseTime: "6\u664230\u5206"
    },
    "\u5fa1\u5728\u6240\u5cb3": {
      bestSeasonText: "4\u6708\u301c11\u6708",
      modelCourse: "\u4e2d\u9053\u30b3\u30fc\u30b9",
      courseName: "\u4e2d\u9053\u30b3\u30fc\u30b9",
      coursePoints: "\u5272\u8c37\u99d0\u8eca\u5834 \u2192 \u4e2d\u9053\u767b\u5c71\u53e3 \u2192 \u5fa1\u5728\u6240\u5cb3",
      courseTime: "5\u6642\u9593"
    },
    "\u91d1\u525b\u5c71": {
      bestSeasonText: "\u901a\u5e74",
      modelCourse: "\u4f0f\u898b\u6797\u9053\u30b3\u30fc\u30b9",
      courseName: "\u4f0f\u898b\u6797\u9053\u30b3\u30fc\u30b9",
      coursePoints: "\u5927\u962a\u5e9c\u7acb\u91d1\u525b\u767b\u5c71\u9053\u99d0\u8eca\u5834 \u2192 \u4f0f\u898b\u6797\u9053\u767b\u5c71\u53e3 \u2192 \u91d1\u525b\u5c71",
      courseTime: "4\u664230\u5206"
    },
    "\u6b66\u5948\u30f6\u5cb3": {
      bestSeasonText: "5\u6708\u301c11\u6708",
      modelCourse: "\u30a4\u30f3\u8c37\u53e3\u30b3\u30fc\u30b9",
      courseName: "\u30a4\u30f3\u8c37\u53e3\u30b3\u30fc\u30b9",
      coursePoints: "\u30a4\u30f3\u8c37\u53e3\u99d0\u8eca\u5834 \u2192 \u9752\u30ac\u30ec \u2192 \u6b66\u5948\u30f6\u5cb3",
      courseTime: "6\u664230\u5206"
    },
    "\u6c37\u30ce\u5c71": {
      bestSeasonText: "5\u6708\u301c11\u6708",
      modelCourse: "\u6c37\u30ce\u8d8a\u30b3\u30fc\u30b9",
      courseName: "\u6c37\u30ce\u8d8a\u30b3\u30fc\u30b9",
      coursePoints: "\u308f\u304b\u3055\u6c37\u30ce\u5c71\u30ad\u30e3\u30f3\u30d7\u5834 \u2192 \u6c37\u30ce\u8d8a\u907f\u96e3\u5c0f\u5c4b \u2192 \u6c37\u30ce\u5c71",
      courseTime: "5\u664230\u5206"
    },
    "\u4e09\u74f6\u5c71": {
      bestSeasonText: "4\u6708\u301c11\u6708"
    },
    "\u5929\u5869\u5cb3": {
      bestSeasonText: "6\u6708\u301c9\u6708"
    },
    "\u77f3\u72e9\u5cb3": {
      bestSeasonText: "6\u6708\u301c9\u6708"
    },
    "\u30cb\u30da\u30bd\u30c4\u5c71": {
      bestSeasonText: "6\u6708\u301c10\u6708"
    },
    "\u82a6\u5225\u5cb3": {
      bestSeasonText: "6\u6708\u301c10\u6708"
    },
    "\u5915\u5f35\u5cb3": {
      bestSeasonText: "6\u6708\u301c9\u6708"
    },
    "\u6691\u5bd2\u5225\u5cb3": {
      bestSeasonText: "6\u6708\u301c10\u6708"
    },
    "\u6a3d\u524d\u5c71": {
      bestSeasonText: "5\u6708\u301c10\u6708"
    },
    "\u5317\u6d77\u9053\u99d2\u30f6\u5cb3": {
      bestSeasonText: "6\u6708\u301c10\u6708"
    },
    "\u4e8c\u738b\u5b50\u5cb3": {
      bestSeasonText: "5\u6708\u301c10\u6708",
      modelCourse: "\u4e8c\u738b\u5b50\u5cb3\u30b3\u30fc\u30b9",
      courseName: "\u4e8c\u738b\u5b50\u5cb3\u30b3\u30fc\u30b9",
      coursePoints: "\u4e8c\u738b\u5b50\u795e\u793e \u2192 \u4e00\u738b\u5b50\u5c0f\u5c4b \u2192 \u4e8c\u738b\u5b50\u5cb3\u30fb\u4e8c\u738b\u5b50\u5c0f\u5c4b\uff08\u5f80\u5fa9\uff09",
      courseTime: "6\u664240\u5206",
      courseDistance: "11.1km",
      cumulativeElevation: "+1235m / -1235m",
      referenceStamina: 29
    },
    "\u5e1d\u91c8\u5c71": {
      bestSeasonText: "6\u6708\u301c10\u6708",
      modelCourse: "\u99ac\u5742\u5ce0\u30b3\u30fc\u30b9",
      courseName: "\u99ac\u5742\u5ce0\u30b3\u30fc\u30b9",
      coursePoints: "\u99ac\u5742\u5ce0 \u2192 \u5e1d\u91c8\u5c71",
      courseTime: "1\u664220\u5206"
    },
    "\u4f1a\u6d25\u671d\u65e5\u5cb3": {
      bestSeasonText: "6\u6708\u301c10\u6708\u4e2d\u65ec",
      modelCourse: "\u8d64\u5009\u6ca2\u30b3\u30fc\u30b9",
      courseName: "\u8d64\u5009\u6ca2\u30b3\u30fc\u30b9",
      coursePoints: "\u8d64\u5009\u6ca2\u767b\u5c71\u53e3 \u2192 \u4f1a\u6d25\u671d\u65e5\u5cb3",
      courseTime: "6\u664245\u5206",
      referenceStamina: 33
    },
    "\u5973\u5cf0\u5c71": {
      bestSeasonText: "6\u6708\u301c10\u6708",
      modelCourse: "\u9727\u964d\u9ad8\u539f\u30b3\u30fc\u30b9",
      courseName: "\u9727\u964d\u9ad8\u539f\u30b3\u30fc\u30b9",
      coursePoints: "\u9727\u964d\u9ad8\u539f\u99d0\u8eca\u5834 \u2192 \u8d64\u8599\u5c71 \u2192 \u5973\u5cf0\u5c71",
      courseTime: "9\u664242\u5206",
      courseDistance: "12.8km",
      cumulativeElevation: "+1445m / -1445m"
    },
    "\u4ed9\u30ce\u5009\u5c71": {
      bestSeasonText: "6\u6708\u301c10\u6708",
      modelCourse: "\u5e73\u6a19\u5c71\u30b3\u30fc\u30b9\uff08\u677e\u624b\u5c71\u30b3\u30fc\u30b9\u7d4c\u7531\uff09",
      courseName: "\u5e73\u6a19\u5c71\u30b3\u30fc\u30b9\uff08\u677e\u624b\u5c71\u30b3\u30fc\u30b9\u7d4c\u7531\uff09",
      coursePoints: "\u5e73\u6a19\u767b\u5c71\u53e3 \u2192 \u677e\u624b\u5c71 \u2192 \u5e73\u6a19\u5c71 \u2192 \u4ed9\u30ce\u5009\u5c71",
      courseTime: "6\u664242\u5206",
      courseDistance: "14.76km",
      cumulativeElevation: "+1420m / -1412m"
    },
    "\u699b\u540d\u5c71": {
      bestSeasonText: "\u901a\u5e74"
    },
    "\u6d45\u9593\u96a0\u5c71": {
      bestSeasonText: "4\u6708\u301c11\u6708",
      modelCourse: "\u6d45\u9593\u96a0\u5c71\u767b\u5c71\u53e3\u30b3\u30fc\u30b9",
      courseName: "\u6d45\u9593\u96a0\u5c71\u767b\u5c71\u53e3\u30b3\u30fc\u30b9",
      coursePoints: "\u6d45\u9593\u96a0\u5c71\u767b\u5c71\u53e3\u99d0\u8eca\u5834 \u2192 \u5317\u8efd\u4e95\u6ca2\u5206\u5c90 \u2192 \u6d45\u9593\u96a0\u5c71",
      courseTime: "3\u664215\u5206",
      courseDistance: "7.54km",
      cumulativeElevation: "+439m / -442m"
    },
    "\u8352\u8239\u5c71": {
      bestSeasonText: "4\u6708\u301c11\u6708",
      modelCourse: "\u5185\u5c71\u5ce0\u30b3\u30fc\u30b9",
      courseName: "\u5185\u5c71\u5ce0\u30b3\u30fc\u30b9",
      coursePoints: "\u5185\u5c71\u5ce0 \u2192 \u826b\u5ca9 \u2192 \u7d4c\u585a\u5c71",
      courseTime: "4\u664230\u5206"
    },
    "\u767d\u77f3\u5c71\uff08\u548c\u540d\u5009\u5c71\uff09": {
      bestSeasonText: "6\u6708\u301c10\u6708"
    },
    "\u5927\u5cb3\u5c71": {
      bestSeasonText: "\u901a\u5e74",
      modelCourse: "\u5fa1\u5cb3\u5c71\u5468\u56de\u30b3\u30fc\u30b9",
      courseName: "\u5fa1\u5cb3\u5c71\u5468\u56de\u30b3\u30fc\u30b9",
      coursePoints: "\u307f\u305f\u3051\u3055\u3093\u99c5 \u2192 \u5fa1\u5cb3\u5c71 \u2192 \u5965\u306e\u9662 \u2192 \u5927\u5cb3\u5c71 \u2192 \u30ed\u30c3\u30af\u30ac\u30fc\u30c7\u30f3 \u2192 \u307f\u305f\u3051\u3055\u3093\u99c5",
      courseTime: "5\u664218\u5206",
      courseDistance: "10.23km",
      cumulativeElevation: "+952m / -952m"
    },
    "\u4e09\u30c4\u5ce0\u5c71": {
      modelCourse: "\u4e09\u3064\u5ce0\u99c5\u30b3\u30fc\u30b9",
      courseName: "\u4e09\u3064\u5ce0\u99c5\u30b3\u30fc\u30b9",
      coursePoints: "\u4e09\u3064\u5ce0\u99c5 \u2192 \u5c71\u7957\u795e\u793e \u2192 \u9054\u78e8\u77f3 \u2192 \u56db\u5b63\u697d\u5712 \u2192 \u4e09\u30c4\u5ce0\u5c71",
      courseTime: "6\u664240\u5206",
      courseDistance: "13.05km",
      cumulativeElevation: "+1259m / -1321m"
    },
    "\u6b66\u7532\u5c71": {
      modelCourse: "\u8868\u53c2\u9053\u30b3\u30fc\u30b9",
      courseName: "\u8868\u53c2\u9053\u30b3\u30fc\u30b9",
      coursePoints: "\u751f\u5ddd\u99d0\u8eca\u5834 \u2192 \u4e00\u306e\u9ce5\u5c45 \u2192 \u5927\u6749\u306e\u5e83\u5834 \u2192 \u6b66\u7532\u5c71",
      courseTime: "5\u6642\u9593",
      courseDistance: "4.99km",
      cumulativeElevation: "+714m / -714m"
    },
    "\u4e7e\u5fb3\u5c71": {
      modelCourse: "\u30aa\u30bd\u30d0\u6ca2\u30eb\u30fc\u30c8",
      courseName: "\u30aa\u30bd\u30d0\u6ca2\u30eb\u30fc\u30c8",
      coursePoints: "\u4e7e\u5fb3\u5c71\u767b\u5c71\u53e3 \u2192 \u56fd\u5e2b\u30f6\u539f \u2192 \u4e7e\u5fb3\u5c71",
      courseDistance: "12.02km",
      cumulativeElevation: "+1328m / -1317m"
    },
    "\u8305\u30f6\u5cb3": {
      modelCourse: "\u6df1\u7530\u8a18\u5ff5\u516c\u5712\u30b3\u30fc\u30b9",
      courseName: "\u6df1\u7530\u8a18\u5ff5\u516c\u5712\u30b3\u30fc\u30b9",
      coursePoints: "\u6df1\u7530\u8a18\u5ff5\u516c\u5712 \u2192 \u5973\u5ca9 \u2192 \u8305\u30f6\u5cb3",
      courseTime: "5\u664247\u5206",
      courseDistance: "7.8km",
      cumulativeElevation: "+990m / -932m"
    },
    "\u5999\u7fa9\u5c71": {
      modelCourse: "\u4e2d\u9593\u9053\u7e26\u8d70\u3068\u77f3\u9580\u5de1\u308a",
      courseName: "\u4e2d\u9593\u9053\u7e26\u8d70\u3068\u77f3\u9580\u5de1\u308a",
      coursePoints: "\u767b\u5c71\u8005\u5c02\u7528\u99d0\u8eca\u5834 \u2192 \u5999\u7fa9\u767b\u5c71\u9053\u5165\u53e3 \u2192 \u7b2c\u4e00\u77f3\u9580 \u2192 \u4e2d\u9593\u9053",
      courseTime: "10\u6642\u9593",
      courseDistance: "10.1km",
      cumulativeElevation: "+2546m / -2525m"
    },
    "御神楽岳": {
      bestSeasonText: "6月〜10月",
      modelCourse: "室谷コース",
      courseName: "室谷コース",
      coursePoints: "室谷登山口 → 御神楽岳",
      courseTime: "8時間30分",
      courseDistance: "13.34km",
      cumulativeElevation: "+1941m / -1941m"
    },
    "守門岳": {
      bestSeasonText: "5月〜11月",
      modelCourse: "保久礼コース",
      courseName: "保久礼コース",
      coursePoints: "保久礼駐車場 → 守門大岳 → 守門岳",
      courseTime: "6時間25分",
      courseDistance: "10.24km",
      cumulativeElevation: "+1563m / -1563m"
    },
    "八海山": {
      bestSeasonText: "6月〜10月",
      modelCourse: "ロープウェイ山頂駅コース",
      courseName: "ロープウェイ山頂駅コース",
      coursePoints: "八海山ロープウェー山頂駅 → 薬師岳 → 千本檜小屋 → 八海山",
      courseTime: "6時間45分",
      courseDistance: "8.5km",
      cumulativeElevation: "+935m / -935m"
    },
    "飯縄山": {
      bestSeasonText: "5月〜11月",
      modelCourse: "一の鳥居コース",
      courseName: "一の鳥居コース",
      coursePoints: "一の鳥居苑地 → 飯縄山",
      courseTime: "4時間55分",
      courseDistance: "7.2km",
      cumulativeElevation: "+738m / -738m"
    },
    "戸隠山": {
      bestSeasonText: "6月〜10月",
      modelCourse: "戸隠神社奥社入口コース",
      courseName: "戸隠神社奥社入口コース",
      coursePoints: "戸隠神社奥社入口 → 八方睨 → 戸隠山",
      courseTime: "5時間45分",
      courseDistance: "11.65km",
      cumulativeElevation: "+1089m / -1085m"
    },
    "天狗岳": {
      bestSeasonText: "6月〜10月",
      modelCourse: "渋の湯コース",
      courseName: "渋の湯コース",
      coursePoints: "渋御殿湯 → 黒百合ヒュッテ → 西天狗岳",
      courseTime: "7時間25分",
      courseDistance: "9.4km",
      cumulativeElevation: "+832m / -832m"
    },
    "御正体山": {
      bestSeasonText: "5月〜11月",
      modelCourse: "山伏峠コース",
      courseName: "山伏峠コース",
      coursePoints: "山伏峠入口 → 御正体山",
      courseTime: "5時間15分",
      courseDistance: "12.6km",
      cumulativeElevation: "+1130m / -1130m"
    },
    "七面山": {
      bestSeasonText: "4月〜11月",
      modelCourse: "表参道コース",
      courseName: "表参道コース",
      coursePoints: "羽衣駐車場 → 敬慎院 → 七面山",
      courseTime: "7時間40分",
      courseDistance: "12.11km",
      cumulativeElevation: "+2590m / -2590m"
    },
    "経ヶ岳": {
      bestSeasonText: "5月〜10月",
      modelCourse: "大泉所ダムコース",
      courseName: "大泉所ダムコース",
      coursePoints: "大泉所ダム → 経ヶ岳",
      courseTime: "6時間30分",
      courseDistance: "13.2km",
      cumulativeElevation: "+1542m / -1542m"
    },
    "愛鷹山": {
      bestSeasonText: "4月〜11月",
      modelCourse: "十里木高原・越前岳コース",
      courseName: "十里木高原・越前岳コース",
      coursePoints: "十里木高原駐車場 → 馬の背 → 越前岳",
      courseTime: "3時間40分",
      courseDistance: "5.5km",
      cumulativeElevation: "+620m / -620m"
    },
    "金剛堂山": {
      bestSeasonText: "5月〜11月",
      modelCourse: "栃谷ルート",
      courseName: "栃谷ルート",
      coursePoints: "栃谷登山口 → 前金剛 → 中金剛",
      courseTime: "4時間",
      courseDistance: "9.58km",
      cumulativeElevation: "+1468m / -1468m"
    },
    "位山": {
      bestSeasonText: "5月〜11月",
      modelCourse: "モンデウス飛騨位山コース",
      courseName: "モンデウス飛騨位山コース",
      coursePoints: "モンデウス飛騨位山 → 位山",
      courseTime: "3時間30分",
      courseDistance: "9.3km",
      cumulativeElevation: "+657m / -657m"
    },
    "大日ヶ岳": {
      bestSeasonText: "5月〜11月",
      modelCourse: "ひるがの高原コース",
      courseName: "ひるがの高原コース",
      coursePoints: "ひるがの高原登山口 → 大日ヶ岳",
      courseTime: "4時間30分",
      courseDistance: "11.0km",
      cumulativeElevation: "+856m / -856m"
    },
    "能郷白山": {
      bestSeasonText: "5月〜11月",
      modelCourse: "温見峠コース",
      courseName: "温見峠コース",
      coursePoints: "温見峠 → 能郷白山",
      courseTime: "3時間20分",
      courseDistance: "5.76km",
      cumulativeElevation: "+987m / -987m"
    },
    "釈迦ヶ岳": {
      bestSeasonText: "5月〜11月",
      modelCourse: "釈迦ヶ岳登山口コース",
      courseName: "釈迦ヶ岳登山口コース",
      coursePoints: "釈迦ヶ岳登山口 → 深仙ノ宿 → 釈迦ヶ岳",
      courseTime: "5時間",
      courseDistance: "9.8km",
      cumulativeElevation: "+1120m / -1120m"
    },
    "伯母子岳": {
      bestSeasonText: "5月〜11月",
      modelCourse: "伯母子道入口コース",
      courseName: "伯母子道入口コース",
      coursePoints: "伯母子道入口 → 口千丈山 → 伯母子岳",
      courseTime: "4時間30分",
      courseDistance: "11.08km",
      cumulativeElevation: "+804m / -804m"
    },
    "朳差岳": {
      bestSeasonText: "7月〜10月",
      modelCourse: "大石ダム彫刻公園コース",
      courseName: "大石ダム彫刻公園コース",
      coursePoints: "大石ダム彫刻公園 → 千本峰 → 前朳差岳 → 朳差岳",
      courseTime: "12時間58分",
      courseDistance: "22.1km",
      cumulativeElevation: "+2045m / -2045m"
    },
    "中ノ岳": {
      bestSeasonText: "7月〜10月",
      modelCourse: "十字峡登山センターコース",
      courseName: "十字峡登山センターコース",
      coursePoints: "十字峡登山センター → 日向山 → 中ノ岳",
      courseTime: "10時間10分",
      courseDistance: "11.5km",
      cumulativeElevation: "+1826m / -1826m"
    },
    "佐武流山": {
      bestSeasonText: "6月〜10月",
      modelCourse: "ドロノ木平コース",
      courseName: "ドロノ木平コース",
      coursePoints: "ドロノ木平 → ワルサ峰 → 佐武流山",
      courseTime: "10時間40分",
      courseDistance: "19.0km",
      cumulativeElevation: "+1848m / -1848m"
    },
    "雪倉岳": {
      bestSeasonText: "7月〜10月",
      modelCourse: "蓮華温泉コース",
      courseName: "蓮華温泉コース",
      coursePoints: "蓮華温泉 → 朝日岳分岐 → 雪倉岳避難小屋 → 雪倉岳",
      courseTime: "10時間40分",
      courseDistance: "21.1km",
      cumulativeElevation: "+1822m / -1822m"
    },
    "上河内岳": {
      bestSeasonText: "7月〜10月",
      modelCourse: "茶臼岳登山口コース",
      courseName: "茶臼岳登山口コース",
      coursePoints: "茶臼岳登山口 → ヤレヤレ峠 → 茶臼小屋 → 上河内岳",
      courseTime: "16時間53分",
      courseDistance: "24.2km",
      cumulativeElevation: "+2812m / -2812m"
    },
    "池口岳": {
      bestSeasonText: "6月〜10月",
      modelCourse: "池口林道口コース",
      courseName: "池口林道口コース",
      coursePoints: "池口林道口 → 黒薙 → 利検沢ノ頭 → 池口岳",
      courseTime: "10時間25分",
      courseDistance: "15.8km",
      cumulativeElevation: "+1803m / -1803m"
    },
    "大無間山": {
      bestSeasonText: "6月〜10月",
      modelCourse: "田代コース",
      courseName: "田代コース",
      coursePoints: "田代 → 小無間山 → 中無間山 → 大無間山",
      courseTime: "13時間56分",
      courseDistance: "16.8km",
      cumulativeElevation: "+2294m / -2294m"
    },
    "烏帽子岳": {
      bestSeasonText: "7月〜10月",
      modelCourse: "高瀬ダム・ブナ立尾根コース",
      courseName: "高瀬ダム・ブナ立尾根コース",
      coursePoints: "高瀬ダム → ブナ立尾根取付き → 烏帽子小屋 → 烏帽子岳",
      courseTime: "8時間15分",
      courseDistance: "7.8km",
      cumulativeElevation: "+1474m / -1474m"
    },
    "毛勝山": {
      bestSeasonText: "6月〜10月",
      modelCourse: "モモアセ山コース",
      courseName: "モモアセ山コース",
      coursePoints: "馬場島 → モモアセ山 → 毛勝山",
      courseTime: "10時間52分",
      courseDistance: "11.5km",
      cumulativeElevation: "+1892m / -1892m"
    },
    "笈ヶ岳": {
      bestSeasonText: "4月〜5月",
      modelCourse: "山毛欅尾山コース",
      courseName: "山毛欅尾山コース",
      coursePoints: "山毛欅尾山登り口 → 山毛欅尾山 → 小笈ヶ岳 → 笈ヶ岳",
      courseTime: "14時間29分",
      courseDistance: "19.6km",
      cumulativeElevation: "+2312m / -2312m"
    },
    "乾徳山": {
      bestSeasonText: "5月〜11月",
      modelCourse: "徳和コース",
      courseName: "徳和コース",
      coursePoints: "徳和 → 銀晶水 → 国師ヶ原 → 乾徳山",
      courseTime: "7時間35分",
      courseDistance: "10.9km",
      cumulativeElevation: "+1427m / -1427m"
    },
    "茅ヶ岳": {
      bestSeasonText: "4月〜11月",
      modelCourse: "深田記念公園コース",
      courseName: "深田記念公園コース",
      coursePoints: "深田記念公園 → 女岩 → 茅ヶ岳",
      courseTime: "5時間20分",
      courseDistance: "8.2km",
      cumulativeElevation: "+1050m / -1050m"
    },
    "三ツ峠山": {
      bestSeasonText: "4月〜11月",
      modelCourse: "いこいの森公園コース",
      courseName: "いこいの森公園コース",
      coursePoints: "いこいの森公園駐車場 → 達磨石 → 馬返し → 三ツ峠山",
      courseTime: "5時間59分",
      courseDistance: "6.8km",
      cumulativeElevation: "+1061m / -1061m"
    },
    "櫛形山": {
      bestSeasonText: "6月〜10月",
      modelCourse: "池の茶屋口コース",
      courseName: "池の茶屋口コース",
      coursePoints: "池の茶屋口 → 裸山 → 櫛形山",
      courseTime: "5時間33分",
      courseDistance: "9.3km",
      cumulativeElevation: "+876m / -875m"
    },
    "二王子岳": {
      bestSeasonText: "5月〜11月",
      modelCourse: "二王子岳コース",
      courseName: "二王子岳コース",
      coursePoints: "二王子神社 → 一王子小屋 → 二王子岳",
      courseTime: "6時間40分",
      courseDistance: "11.1km",
      cumulativeElevation: "+1235m / -1235m"
    },
    "笊ヶ岳": {
      bestSeasonText: "7月〜10月",
      modelCourse: "見神の滝・老平コース",
      courseName: "見神の滝・老平コース",
      coursePoints: "見神の滝駐車場 → 老平 → 広河原 → 笊ヶ岳",
      courseTime: "17時間26分",
      courseDistance: "34.3km",
      cumulativeElevation: "+4812m / -4824m"
    },
    "針ノ木岳": {
      bestSeasonText: "7月〜10月",
      modelCourse: "扇沢・針ノ木雪渓コース",
      courseName: "扇沢・針ノ木雪渓コース",
      coursePoints: "扇沢 → 大沢小屋 → 針ノ木峠 → 針ノ木岳",
      courseTime: "8時間59分",
      courseDistance: "11.1km",
      cumulativeElevation: "+1532m / -1532m"
    },
    "奥大日岳": {
      bestSeasonText: "7月〜10月",
      modelCourse: "室堂コース",
      courseName: "室堂コース",
      coursePoints: "室堂 → 雷鳥平 → 新室堂乗越 → 奥大日岳",
      courseTime: "6時間35分",
      courseDistance: "11.84km",
      cumulativeElevation: "+1691m / -1691m"
    },
    "毛無山": {
      bestSeasonText: "4月〜11月",
      modelCourse: "麓登山口コース",
      courseName: "麓登山口コース",
      coursePoints: "麓登山口 → 不動の滝見晴台 → 五合目 → 毛無山",
      courseTime: "6時間10分",
      courseDistance: "5.2km",
      cumulativeElevation: "+1081m / -1081m"
    },
    "荒沢岳": {
      bestSeasonText: "6月〜10月",
      modelCourse: "銀山平登山口コース",
      courseName: "銀山平登山口コース",
      coursePoints: "銀山平登山口 → 前山 → 前嵓 → 荒沢岳",
      courseTime: "8時間20分",
      courseDistance: "9.0km",
      cumulativeElevation: "+1423m / -1423m"
    },
    "黒姫山": {
      bestSeasonText: "5月〜10月",
      modelCourse: "大橋登山口周回コース",
      courseName: "大橋登山口周回コース",
      coursePoints: "大橋登山口 → 古池 → しなの木 → 黒姫山",
      courseTime: "6時間56分",
      courseDistance: "12.9km",
      cumulativeElevation: "+1007m / -1007m"
    },
    "燕岳": {
      bestSeasonText: "6月〜10月",
      modelCourse: "中房温泉・合戦尾根コース",
      courseName: "中房温泉・合戦尾根コース",
      coursePoints: "中房温泉 → 合戦小屋 → 燕山荘 → 燕岳",
      courseTime: "8時間30分",
      courseDistance: "10.8km",
      cumulativeElevation: "+1460m / -1460m"
    },
    "大天井岳": {
      bestSeasonText: "7月〜10月",
      modelCourse: "中房温泉・表銀座コース",
      courseName: "中房温泉・表銀座コース",
      coursePoints: "中房温泉 → 合戦小屋 → 燕山荘 → 大天井岳",
      courseTime: "13時間20分",
      courseDistance: "18.6km",
      cumulativeElevation: "+2210m / -2210m"
    },
    "餓鬼岳": {
      bestSeasonText: "6月〜10月",
      modelCourse: "白沢登山口コース",
      courseName: "白沢登山口コース",
      coursePoints: "白沢登山口 → 大凪山 → 餓鬼岳",
      courseTime: "12時間2分",
      courseDistance: "14.2km",
      cumulativeElevation: "+1895m / -1895m"
    },
    "岩菅山": {
      bestSeasonText: "6月〜10月",
      modelCourse: "岩菅山登山道入口コース",
      courseName: "岩菅山登山道入口コース",
      coursePoints: "岩菅山登山道入口 → ノッキリ → 岩菅山",
      courseTime: "6時間5分",
      courseDistance: "8.6km",
      cumulativeElevation: "+824m / -824m"
    },
    "御座山": {
      bestSeasonText: "6月〜10月",
      modelCourse: "長者の森コース",
      courseName: "長者の森コース",
      coursePoints: "長者の森登山口 → 合流点 → 見晴台 → 御座山",
      courseTime: "5時間40分",
      courseDistance: "10.99km",
      cumulativeElevation: "+1751m / -1751m"
    },
    "小秀山": {
      bestSeasonText: "5月〜10月",
      modelCourse: "乙女渓谷コース",
      courseName: "乙女渓谷コース",
      coursePoints: "乙女渓谷キャンプ場 → 営林小屋 → 第一高原 → 小秀山",
      courseTime: "7時間30分",
      courseDistance: "14.3km",
      cumulativeElevation: "+1716m / -1716m"
    },
    "鳥甲山": {
      bestSeasonText: "6月〜10月",
      modelCourse: "ムジナ平コース",
      courseName: "ムジナ平コース",
      coursePoints: "ムジナ平登山口 → 白嵓ノ頭 → 鳥甲山",
      courseTime: "7時間45分",
      courseDistance: "9.1km",
      cumulativeElevation: "+1620m / -1620m"
    },
    "鋸岳": {
      bestSeasonText: "6月〜10月",
      modelCourse: "横岳峠コース",
      courseName: "横岳峠コース",
      coursePoints: "釜無川駐車スペース → 横岳峠 → 角兵衛沢ノ頭 → 鋸岳",
      courseTime: "14時間54分",
      courseDistance: "25.4km",
      cumulativeElevation: "+2153m / -2153m"
    },
    "農鳥岳": {
      bestSeasonText: "7月〜10月",
      modelCourse: "奈良田コース",
      courseName: "奈良田コース",
      coursePoints: "奈良田 → 大門沢下降点 → 農鳥小屋 → 農鳥岳",
      courseTime: "15時間5分",
      courseDistance: "23.3km",
      cumulativeElevation: "+2607m / -2607m"
    },
    "霞沢岳": {
      bestSeasonText: "7月〜10月",
      modelCourse: "上高地・徳本峠コース",
      courseName: "上高地・徳本峠コース",
      coursePoints: "上高地バスターミナル → 明神分岐 → 徳本峠 → 霞沢岳",
      courseTime: "13時間35分",
      courseDistance: "12.06km",
      cumulativeElevation: "+2109m / -2109m"
    },
    "安平路山": {
      bestSeasonText: "6月〜10月",
      modelCourse: "大平・摺古木山コース",
      courseName: "大平・摺古木山コース",
      coursePoints: "大平 → 摺古木自然園休憩舎 → 摺古木山 → 白ビソ山 → 安平路山",
      courseTime: "13時間50分",
      courseDistance: "32.18km",
      cumulativeElevation: "+4361m / -4361m"
    },
    "南駒ヶ岳": {
      bestSeasonText: "7月〜10月",
      modelCourse: "今朝沢橋コース",
      courseName: "今朝沢橋コース",
      coursePoints: "今朝沢橋 → 南駒ヶ岳",
      courseTime: "15時間48分",
      courseDistance: "19.1km",
      cumulativeElevation: "+1870m / -1870m"
    },
    "有明山": {
      bestSeasonText: "5月〜10月",
      modelCourse: "有明荘・裏参道コース",
      courseName: "有明荘・裏参道コース",
      coursePoints: "有明荘 → 有明山北岳 → 有明山南岳",
      courseTime: "7時間40分",
      courseDistance: "6.9km",
      cumulativeElevation: "+1134m / -1134m"
    },
    "赤牛岳": {
      bestSeasonText: "7月〜10月",
      modelCourse: "高瀬ダム・水晶小屋コース",
      courseName: "高瀬ダム・水晶小屋コース",
      coursePoints: "七倉 → 高瀬ダム → 烏帽子小屋 → 野口五郎岳 → 水晶小屋 → 赤牛岳",
      courseTime: "20時間15分",
      courseDistance: "30.8km",
      cumulativeElevation: "+2920m / -2920m"
    },
    "御在所岳": {
      bestSeasonText: "4月〜11月",
      modelCourse: "中登山口コース",
      courseName: "中登山口コース",
      coursePoints: "中登山口 → 地蔵岩 → キレット → 御在所岳",
      courseTime: "4時間30分",
      courseDistance: "5.3km",
      cumulativeElevation: "+765m / -765m"
    },
    "釈迦ヶ岳": {
      bestSeasonText: "5月〜11月",
      modelCourse: "太尾登山口コース",
      courseName: "太尾登山口コース",
      coursePoints: "太尾登山口 → 古田ノ森 → 千丈平 → 釈迦ヶ岳",
      courseTime: "4時間54分",
      courseDistance: "8.9km",
      cumulativeElevation: "+764m / -764m"
    },
    "伯母子岳": {
      bestSeasonText: "5月〜11月",
      modelCourse: "大股コース",
      courseName: "大股コース",
      coursePoints: "大股登山口 → 伯母子峠 → 伯母子岳",
      courseTime: "6時間27分",
      courseDistance: "10.7km",
      cumulativeElevation: "+985m / -985m"
    },
    "金剛山": {
      bestSeasonText: "通年",
      modelCourse: "千早本道コース",
      courseName: "千早本道コース",
      coursePoints: "千早本道登山口 → 千早城跡 → 金剛山",
      courseTime: "4時間40分",
      courseDistance: "7.3km",
      cumulativeElevation: "+852m / -852m"
    },
    "武奈ヶ岳": {
      bestSeasonText: "4月〜11月",
      modelCourse: "坊村コース",
      courseName: "坊村コース",
      coursePoints: "坊村登山口 → 御殿山 → ワサビ峠 → 武奈ヶ岳",
      courseTime: "6時間53分",
      courseDistance: "11.5km",
      cumulativeElevation: "+1064m / -1279m"
    },
    "氷ノ山": {
      bestSeasonText: "5月〜11月",
      modelCourse: "福定親水公園周回コース",
      courseName: "福定親水公園周回コース",
      coursePoints: "福定親水公園 → 氷ノ山越 → 氷ノ山 → 東尾根 → 福定親水公園",
      courseTime: "5時間46分",
      courseDistance: "10.1km",
      cumulativeElevation: "+944m / -942m"
    },
    "上蒜山": {
      bestSeasonText: "4月〜11月",
      modelCourse: "上蒜山登山口縦走コース",
      courseName: "上蒜山登山口縦走コース",
      coursePoints: "上蒜山登山口 → 槍ヶ峰 → 上蒜山 → 中蒜山 → 下蒜山 → 犬挟峠",
      courseTime: "6時間50分",
      courseDistance: "10.5km",
      cumulativeElevation: "+1150m / -1183m"
    },
    "三瓶山": {
      bestSeasonText: "4月〜11月",
      modelCourse: "東の原周回コース",
      courseName: "東の原周回コース",
      coursePoints: "東の原 → 男三瓶山 → 扇沢 → 子三瓶山 → 風越 → 東の原",
      courseTime: "4時間8分",
      courseDistance: "5.4km",
      cumulativeElevation: "+668m / -667m"
    },
    "三嶺": {
      bestSeasonText: "5月〜11月",
      modelCourse: "名頃コース",
      courseName: "名頃コース",
      coursePoints: "名頃登山口 → ダケモミの丘 → 三嶺",
      courseTime: "6時間20分",
      courseDistance: "9.3km",
      cumulativeElevation: "+1087m / -1087m"
    },
    "東赤石山": {
      bestSeasonText: "5月〜11月",
      modelCourse: "筏津往復コース",
      courseName: "筏津往復コース",
      coursePoints: "筏津登山口 → 赤石越 → 東赤石山",
      courseTime: "5時間45分",
      courseDistance: "10.45km",
      cumulativeElevation: "+2215m / -2215m"
    },
    "笹ヶ峰": {
      bestSeasonText: "5月〜11月",
      modelCourse: "寒風山登山口コース",
      courseName: "寒風山登山口コース",
      coursePoints: "寒風山登山口 → 笹ヶ峰 → 三傍示山",
      courseTime: "3時間12分",
      courseDistance: "5.6km",
      cumulativeElevation: "+501m / -501m"
    },
    "英彦山": {
      bestSeasonText: "4月〜11月",
      modelCourse: "奉幣殿コース",
      courseName: "奉幣殿コース",
      coursePoints: "英彦山神宮奉幣殿駐車場 → 中宮 → 南岳 → 中岳",
      courseTime: "4時間20分",
      courseDistance: "6.8km",
      cumulativeElevation: "+820m / -820m"
    },
    "由布岳": {
      bestSeasonText: "4月〜11月",
      modelCourse: "正面登山口コース",
      courseName: "正面登山口コース",
      coursePoints: "由布岳正面登山口 → 合野越 → 由布岳東峰",
      courseTime: "4時間50分",
      courseDistance: "8.1km",
      cumulativeElevation: "+840m / -840m"
    },
    "大崩山": {
      bestSeasonText: "5月〜11月",
      modelCourse: "上祝子登山口周回コース",
      courseName: "上祝子登山口周回コース",
      coursePoints: "上祝子登山口 → 坊主尾根 → 大崩山 → 湧塚尾根 → 上祝子登山口",
      courseTime: "8時間40分",
      courseDistance: "10.6km",
      cumulativeElevation: "+1430m / -1430m"
    },
    "雲仙岳": {
      bestSeasonText: "4月〜11月",
      modelCourse: "仁田峠循環コース",
      courseName: "仁田峠循環コース",
      coursePoints: "仁田峠 → 妙見岳 → 国見岳 → 普賢岳 → 仁田峠",
      courseTime: "4時間20分",
      courseDistance: "6.8km",
      cumulativeElevation: "+690m / -690m"
    },
    "市房山": {
      bestSeasonText: "4月〜11月",
      modelCourse: "市房神社コース",
      courseName: "市房神社コース",
      coursePoints: "市房神社駐車場 → 五合目 → 七合目 → 市房山",
      courseTime: "6時間10分",
      courseDistance: "10.4km",
      cumulativeElevation: "+1210m / -1210m"
    },
    "尾鈴山": {
      bestSeasonText: "4月〜11月",
      modelCourse: "白滝コース",
      courseName: "白滝コース",
      coursePoints: "尾鈴キャンプ場 → 白滝 → 尾鈴山",
      courseTime: "6時間30分",
      courseDistance: "10.8km",
      cumulativeElevation: "+1180m / -1180m"
    },
    "高千穂峰": {
      bestSeasonText: "4月〜11月",
      modelCourse: "高千穂河原コース",
      courseName: "高千穂河原コース",
      coursePoints: "高千穂河原 → 御鉢 → 高千穂峰",
      courseTime: "3時間20分",
      courseDistance: "6.2km",
      cumulativeElevation: "+660m / -660m"
    },
    "桜島": {
      bestSeasonText: "通年",
      modelCourse: "湯之平展望所散策コース",
      courseName: "湯之平展望所散策コース",
      coursePoints: "湯之平展望所 → 展望歩道",
      courseTime: "40分",
      courseDistance: "1.2km",
      cumulativeElevation: "+70m / -70m"
    },
    "ｶﾑｲｴｸｳﾁｶｳｼ山": {
      bestSeasonText: "6月〜9月",
      modelCourse: "八ノ沢カール往復コース",
      courseName: "八ノ沢カール往復コース",
      coursePoints: "札内川ヒュッテ → 七ノ沢出合 → 八ノ沢カール → カムイエクウチカウシ山",
      courseTime: "17時間25分",
      courseDistance: "29.0km",
      cumulativeElevation: "+1873m / -1873m"
    },
    "ペテガリ岳": {
      bestSeasonText: "6月〜9月",
      modelCourse: "新冠コース",
      courseName: "新冠コース",
      coursePoints: "イドンナップ山荘 → ペテガリ山荘 → ペテガリ岳",
      courseTime: "17時間30分",
      courseDistance: "29.8km",
      cumulativeElevation: "+2140m / -2140m"
    },
    "北海道駒ヶ岳": {
      bestSeasonText: "6月〜10月",
      modelCourse: "赤井川・馬ノ背コース",
      courseName: "赤井川・馬ノ背コース",
      coursePoints: "六合目駐車場 → 馬ノ背",
      courseTime: "3時間",
      courseDistance: "4.3km",
      cumulativeElevation: "+301m / -301m"
    },
    "天塩岳": {
      bestSeasonText: "6月〜10月",
      modelCourse: "前天塩岳コース",
      courseName: "前天塩岳コース",
      coursePoints: "天塩岳ヒュッテ・天塩岳登山口キャンプ場 → 旧道分岐 → 前天塩岳 → 天塩岳",
      courseTime: "7時間10分",
      courseDistance: "6.4km",
      cumulativeElevation: "+1019m / -1019m"
    },
    "石狩岳": {
      bestSeasonText: "6月〜10月",
      modelCourse: "シュナイダーコース",
      courseName: "シュナイダーコース",
      coursePoints: "石狩岳登山口 → シュナイダー分岐 → 音更山分岐 → 石狩岳",
      courseTime: "9時間50分",
      courseDistance: "4.8km",
      cumulativeElevation: "+1177m / -1177m"
    },
    "ニペソツ山": {
      bestSeasonText: "6月〜10月",
      modelCourse: "幌加温泉コース",
      courseName: "幌加温泉コース",
      coursePoints: "幌加温泉登山口 → 天狗平 → 前天狗 → ニペソツ山",
      courseTime: "10時間40分",
      courseDistance: "7.1km",
      cumulativeElevation: "+1259m / -1259m"
    },
    "芦別岳": {
      bestSeasonText: "6月〜10月",
      modelCourse: "旧道コース",
      courseName: "旧道コース",
      coursePoints: "山部自然公園太陽の里 → 旧道分岐 → 半面山 → 芦別岳",
      courseTime: "16時間10分",
      courseDistance: "9.4km",
      cumulativeElevation: "+1658m / -1658m"
    },
    "夕張岳": {
      bestSeasonText: "6月〜9月",
      modelCourse: "冷水コース",
      courseName: "冷水コース",
      coursePoints: "夕張岳冷水登山口 → 馬の背 → 夕張岳",
      courseTime: "8時間20分",
      courseDistance: "6.7km",
      cumulativeElevation: "+1164m / -1164m"
    },
    "暑寒別岳": {
      bestSeasonText: "6月〜9月",
      modelCourse: "暑寒荘コース",
      courseName: "暑寒荘コース",
      coursePoints: "暑寒荘 → 五合目 → 暑寒別岳",
      courseTime: "7時間",
      courseDistance: "13.2km",
      cumulativeElevation: "+1310m"
    },
    "樽前山": {
      bestSeasonText: "5月〜11月",
      modelCourse: "七合目ヒュッテコース",
      courseName: "七合目ヒュッテコース",
      coursePoints: "七合目駐車場 → 樽前山東山 → 樽前山西山",
      courseTime: "5時間50分",
      courseDistance: "6.0km",
      cumulativeElevation: "+625m / -625m"
    },
    "白神岳": {
      bestSeasonText: "6月〜10月",
      modelCourse: "蟶山コース",
      courseName: "蟶山コース",
      coursePoints: "白神岳登山口 → 蟶山分岐 → マテ山 → 白神岳",
      courseTime: "9時間45分",
      courseDistance: "8.9km",
      cumulativeElevation: "+1318m / -1318m"
    },
    "姫神山": {
      bestSeasonText: "4月〜11月",
      modelCourse: "一本杉コース",
      courseName: "一本杉コース",
      coursePoints: "一本杉登山口 → 五合目 → 姫神山",
      courseTime: "3時間",
      courseDistance: "2.2km",
      cumulativeElevation: "+604m / -604m"
    },
    "秋田駒ヶ岳": {
      bestSeasonText: "6月〜10月",
      modelCourse: "八合目コース",
      courseName: "八合目コース",
      coursePoints: "八合目登山口 → 阿弥陀池 → 男女岳",
      courseTime: "2時間45分",
      courseDistance: "2.9km",
      cumulativeElevation: "+373m / -373m"
    },
    "和賀岳": {
      bestSeasonText: "6月〜10月",
      modelCourse: "高下コース",
      courseName: "高下コース",
      coursePoints: "高下登山口 → 薬師平 → 和賀岳",
      courseTime: "7時間45分",
      courseDistance: "7.9km",
      cumulativeElevation: "+1227m / -1227m"
    },
    "森吉山": {
      bestSeasonText: "6月〜10月",
      modelCourse: "阿仁ゴンドラコース",
      courseName: "阿仁ゴンドラコース",
      coursePoints: "阿仁ゴンドラ山頂駅 → 石森 → 森吉山",
      courseTime: "6時間55分",
      courseDistance: "5.4km",
      cumulativeElevation: "+744m / -744m"
    },
    "焼石岳": {
      bestSeasonText: "6月〜10月",
      modelCourse: "中沼コース",
      courseName: "中沼コース",
      coursePoints: "中沼登山口 → 上沼 → 銀明水 → 焼石岳",
      courseTime: "5時間45分",
      courseDistance: "6.1km",
      cumulativeElevation: "+853m / -853m"
    },
    "栗駒山": {
      bestSeasonText: "5月〜10月",
      modelCourse: "須川温泉コース",
      courseName: "須川温泉コース",
      coursePoints: "須川温泉 → 名残ヶ原 → 栗駒山",
      courseTime: "3時間30分",
      courseDistance: "3.7km",
      cumulativeElevation: "+529m / -529m"
    },
    "神室山": {
      bestSeasonText: "6月〜10月",
      modelCourse: "火打新道コース",
      courseName: "火打新道コース",
      coursePoints: "火打新道登山口 → 火打岳分岐 → 神室山",
      courseTime: "7時間10分",
      courseDistance: "6.1km",
      cumulativeElevation: "+1073m / -1073m"
    },
    "船形山": {
      bestSeasonText: "6月〜10月",
      modelCourse: "旗坂平コース",
      courseName: "旗坂平コース",
      coursePoints: "旗坂平駐車場 → 升沢小屋 → 船形山",
      courseTime: "5時間5分",
      courseDistance: "4.3km",
      cumulativeElevation: "+555m / -555m"
    },
    "以東岳": {
      bestSeasonText: "7月〜10月",
      modelCourse: "大鳥池コース",
      courseName: "大鳥池コース",
      coursePoints: "泡滝ダム → 大鳥池 → 以東岳",
      courseTime: "11時間40分",
      courseDistance: "11.6km",
      cumulativeElevation: "+1605m / -1605m"
    },
    "帝釈山": {
      bestSeasonText: "6月〜10月",
      modelCourse: "猿倉登山口コース",
      courseName: "猿倉登山口コース",
      coursePoints: "猿倉登山口 → 田代山湿原 → 帝釈山",
      courseTime: "7時間",
      courseDistance: "12.0km",
      cumulativeElevation: "+820m / -820m"
    },
    "会津朝日岳": {
      bestSeasonText: "6月〜10月",
      modelCourse: "赤倉沢コース",
      courseName: "赤倉沢コース",
      coursePoints: "赤倉沢登山口 → 叶ノ高手 → 会津朝日岳",
      courseTime: "6時間45分",
      courseDistance: "10.2km",
      cumulativeElevation: "+1320m / -1320m"
    },
    "女峰山": {
      bestSeasonText: "6月〜10月",
      modelCourse: "霧降高原周回コース",
      courseName: "霧降高原周回コース",
      coursePoints: "霧降高原駐車場 → 赤薙山 → 一里ヶ曽根 → 女峰山",
      courseTime: "9時間20分",
      courseDistance: "15.0km",
      cumulativeElevation: "+1570m / -1570m"
    },
    "仙ノ倉山": {
      bestSeasonText: "6月〜10月",
      modelCourse: "平標登山口周回コース",
      courseName: "平標登山口周回コース",
      coursePoints: "平標登山口 → 松手山 → 平標山 → 仙ノ倉山",
      courseTime: "8時間20分",
      courseDistance: "15.8km",
      cumulativeElevation: "+1450m / -1450m"
    },
    "榛名山": {
      bestSeasonText: "4月〜11月",
      modelCourse: "榛名富士・掃部ヶ岳周回コース",
      courseName: "榛名富士・掃部ヶ岳周回コース",
      coursePoints: "県立榛名公園駐車場 → 掃部ヶ岳 → 榛名富士",
      courseTime: "4時間10分",
      courseDistance: "8.4km",
      cumulativeElevation: "+620m / -620m"
    },
    "浅間隠山": {
      bestSeasonText: "4月〜11月",
      modelCourse: "二度上峠コース",
      courseName: "二度上峠コース",
      coursePoints: "二度上峠駐車場 → 浅間隠山",
      courseTime: "3時間20分",
      courseDistance: "5.6km",
      cumulativeElevation: "+560m / -560m"
    },
    "妙義山": {
      bestSeasonText: "4月〜11月",
      modelCourse: "石門巡りコース",
      courseName: "石門巡りコース",
      coursePoints: "中之嶽神社駐車場 → 石門群 → 中間道",
      courseTime: "3時間30分",
      courseDistance: "4.3km",
      cumulativeElevation: "+520m / -520m"
    },
    "荒船山": {
      bestSeasonText: "4月〜11月",
      modelCourse: "内山峠コース",
      courseName: "内山峠コース",
      coursePoints: "内山峠駐車場 → 艫岩 → 荒船山",
      courseTime: "3時間50分",
      courseDistance: "7.1km",
      cumulativeElevation: "+620m / -620m"
    },
    "武甲山": {
      bestSeasonText: "4月〜11月",
      modelCourse: "一の鳥居コース",
      courseName: "一の鳥居コース",
      coursePoints: "一の鳥居駐車場 → 不動滝の分岐 → 武甲山",
      courseTime: "5時間10分",
      courseDistance: "8.5km",
      cumulativeElevation: "+1015m / -1015m"
    },
    "白石山": {
      bestSeasonText: "5月〜11月",
      modelCourse: "将監峠コース",
      courseName: "将監峠コース",
      coursePoints: "将監小屋前駐車場 → 将監峠 → 白石山（和名倉山）",
      courseTime: "8時間40分",
      courseDistance: "17.0km",
      cumulativeElevation: "+1390m / -1390m"
    },
    "大岳山": {
      bestSeasonText: "4月〜11月",
      modelCourse: "御岳山・ロックガーデン周回コース",
      courseName: "御岳山・ロックガーデン周回コース",
      coursePoints: "御岳登山鉄道滝本駅駐車場 → 御岳山 → 大岳山",
      courseTime: "5時間20分",
      courseDistance: "9.6km",
      cumulativeElevation: "+930m / -930m"
    },
    "白砂山": {
      bestSeasonText: "6月〜10月",
      modelCourse: "野反湖コース",
      courseName: "野反湖コース",
      coursePoints: "野反湖登山口 → 堂岩山 → 白砂山",
      courseTime: "6時間20分",
      courseDistance: "12.4km",
      cumulativeElevation: "+1010m / -1010m"
    }
  };
  const SUPPLEMENTAL_ACCESS_DATA = {
    "\u9ed2\u59eb\u5c71": [
      {
        trailhead: "\u5927\u6a4b\u6797\u9053\u53e3\u99d0\u8eca\u5834",
        course: "\u5927\u6a4b\u767b\u5c71\u53e3\u30b3\u30fc\u30b9",
        parking: "\u3042\u308a",
        notes: ["10\u53f0\uff08\u8def\u80a9\uff09", "\u7121\u6599", "\u30c8\u30a4\u30ec\u306a\u3057"]
      }
    ],
    "\u5ca9\u83c5\u5c71": [
      {
        trailhead: "\u5ca9\u83c5\u5c71\u767b\u5c71\u53e3\u99d0\u8eca\u5834",
        course: "\u5ca9\u83c5\u5c71\u767b\u5c71\u53e3\u30b3\u30fc\u30b9",
        parking: "\u3042\u308a",
        notes: ["\u7121\u6599", "\u30c8\u30a4\u30ec\u3042\u308a"]
      }
    ],
    "\u5fa1\u5ea7\u5c71": [
      {
        trailhead: "\u9577\u8005\u306e\u68ee\u99d0\u8eca\u5834",
        course: "\u9577\u8005\u306e\u68ee\u30b3\u30fc\u30b9",
        parking: "\u3042\u308a",
        notes: ["20\u53f0", "\u7121\u6599", "\u7c21\u6613\u30c8\u30a4\u30ec\u3042\u308a"]
      }
    ],
    "\u6bdb\u7121\u5c71": [
      {
        trailhead: "\u9e93\u767b\u5c71\u53e3\u99d0\u8eca\u5834",
        course: "\u9e93\u767b\u5c71\u53e3\u30b3\u30fc\u30b9",
        parking: "\u3042\u308a",
        notes: ["500\u5186", "\u30c8\u30a4\u30ec\u306a\u3057", "\u767b\u5c71\u53e3\u306b\u5f92\u6b69\u3059\u3050"]
      }
    ],
    "\u6adb\u5f62\u5c71": [
      {
        trailhead: "\u6c60\u306e\u8336\u5c4b\u99d0\u8eca\u5834",
        course: "\u6c60\u306e\u8336\u5c4b\u767b\u5c71\u9053\u30eb\u30fc\u30c8",
        parking: "\u3042\u308a",
        notes: ["\u7121\u6599", "\u30c8\u30a4\u30ec\u3042\u308a"]
      }
    ],
    "\u71d5\u5cb3": [
      {
        trailhead: "\u4e2d\u623f\u6e29\u6cc9\u767b\u5c71\u8005\u5c02\u7528\u99d0\u8eca\u5834",
        course: "\u4e2d\u623f\u6e29\u6cc9\u30fb\u5408\u6226\u5c3e\u6839\u30b3\u30fc\u30b9",
        parking: "\u3042\u308a",
        notes: ["\u7b2c1\u301c\u7b2c3\u99d0\u8eca\u5834", "\u767b\u5c71\u30dd\u30b9\u30c8\u3042\u308a", "\u30c8\u30a4\u30ec\u3042\u308a", "\u767b\u5c71\u53e3\u307e\u3067\u5f92\u6b690.3km\u524d\u5f8c"]
      }
    ],
    "\u5927\u5929\u4e95\u5cb3": [
      {
        trailhead: "\u4e2d\u623f\u6e29\u6cc9\u767b\u5c71\u8005\u5c02\u7528\u99d0\u8eca\u5834",
        course: "\u4e2d\u623f\u6e29\u6cc9\u30fb\u8868\u9280\u5ea7\u30b3\u30fc\u30b9",
        parking: "\u3042\u308a",
        notes: ["\u7b2c1\u301c\u7b2c3\u99d0\u8eca\u5834", "\u767b\u5c71\u30dd\u30b9\u30c8\u3042\u308a", "\u30c8\u30a4\u30ec\u3042\u308a"]
      }
    ],
    "\u611b\u9df9\u5c71": [
      {
        trailhead: "\u5341\u91cc\u6728\u9ad8\u539f\u99d0\u8eca\u5834",
        course: "\u5341\u91cc\u6728\u9ad8\u539f\u30fb\u8d8a\u524d\u5cb3\u30b3\u30fc\u30b9",
        parking: "\u3042\u308a",
        notes: ["\u7121\u6599", "\u30c8\u30a4\u30ec\u3042\u308a"]
      }
    ],
    "\u5927\u65e5\u30f6\u5cb3": [
      {
        trailhead: "\u3072\u308b\u304c\u306e\u9ad8\u539f\u767b\u5c71\u53e3\u99d0\u8eca\u5834",
        course: "\u3072\u308b\u304c\u306e\u9ad8\u539f\u30b3\u30fc\u30b9",
        parking: "\u3042\u308a",
        notes: ["\u7121\u6599", "\u30c8\u30a4\u30ec\u3042\u308a"]
      }
    ],
    "\u80fd\u90f7\u767d\u5c71": [
      {
        trailhead: "\u6e29\u898b\u5ce0\u99d0\u8eca\u30b9\u30da\u30fc\u30b9",
        course: "\u6e29\u898b\u5ce0\u30b3\u30fc\u30b9",
        parking: "\u3042\u308a",
        notes: ["\u8def\u80a9\u5229\u7528", "\u7121\u6599", "\u30c8\u30a4\u30ec\u306a\u3057"]
      }
    ],
      "\u96ea\u5009\u5cb3": [
        {
          trailhead: "\u84ee\u83ef\u6e29\u6cc9\u99d0\u8eca\u5834",
          course: "\u84ee\u83ef\u6e29\u6cc9\u30b3\u30fc\u30b9",
          parking: "\u3042\u308a",
          notes: ["\u7121\u6599", "\u30c8\u30a4\u30ec\u3042\u308a", "\u6797\u9053\u72b6\u6cc1\u306f\u4e8b\u524d\u78ba\u8a8d\u63a8\u5968"]
        }
      ],
      "\u6bdb\u52dd\u5c71": [
        {
          trailhead: "\u7247\u8c9d\u5c71\u8358\u767b\u5c71\u53e3\u99d0\u8eca\u30b9\u30da\u30fc\u30b9",
          course: "\u7247\u8c9d\u5c71\u8358\u30b3\u30fc\u30b9",
          parking: "\u3042\u308a",
          notes: ["\u7121\u6599", "\u30c8\u30a4\u30ec\u306a\u3057", "\u6b8b\u96ea\u671f\u306f\u88c5\u5099\u5fc5\u9808"]
        }
      ],
      "\u5965\u5927\u65e5\u5cb3": [
        {
          trailhead: "\u5ba4\u5802\u30bf\u30fc\u30df\u30ca\u30eb",
          course: "\u5ba4\u5802\u30b3\u30fc\u30b9",
          parking: "\u3042\u308a",
          notes: ["\u7acb\u5c71\u99c5\u30fb\u6247\u6ca2\u5074\u306e\u99d0\u8eca\u5834\u5229\u7528", "\u5ba4\u5802\u307e\u3067\u306f\u7acb\u5c71\u9ed2\u90e8\u30a2\u30eb\u30da\u30f3\u30eb\u30fc\u30c8\u5229\u7528", "\u30c8\u30a4\u30ec\u3042\u308a"]
        }
      ],
      "\u9913\u9b3c\u5cb3": [
        {
          trailhead: "\u767d\u6ca2\u767b\u5c71\u53e3\u99d0\u8eca\u5834",
          course: "\u767d\u6ca2\u767b\u5c71\u53e3\u30b3\u30fc\u30b9",
          parking: "\u3042\u308a",
          notes: ["20\u53f0\uff08\u8def\u80a9\uff09", "\u7121\u6599", "\u7c21\u6613\u30c8\u30a4\u30ec\u3042\u308a"]
        }
      ],
      "\u971e\u6ca2\u5cb3": [
        {
          trailhead: "\u4e0a\u9ad8\u5730",
          course: "\u4e0a\u9ad8\u5730\u30b3\u30fc\u30b9",
          parking: "\u3042\u308a",
          notes: ["\u4e00\u822c\u8eca\u306f\u4e0a\u9ad8\u5730\u99d0\u8eca\u4e0d\u53ef", "\u6ca2\u6e21\u30fb\u5e73\u6e6f\u306e\u99d0\u8eca\u5834\u304b\u3089\u30d0\u30b9\u307e\u305f\u306f\u30bf\u30af\u30b7\u30fc\u5229\u7528", "\u30c8\u30a4\u30ec\u3042\u308a"]
        }
      ],
      "\u8fb2\u9ce5\u5cb3": [
        {
          trailhead: "\u5948\u826f\u7530\u99d0\u8eca\u5834",
          course: "\u5948\u826f\u7530\u30fb\u5927\u9580\u6ca2\u30b3\u30fc\u30b9",
          parking: "\u3042\u308a",
          notes: ["\u7121\u6599", "\u30c8\u30a4\u30ec\u3042\u308a", "\u5927\u9580\u6ca2\u5c0f\u5c4b\u5229\u7528\u3092\u542b\u3080\u9577\u6642\u9593\u884c\u7a0b"]
        }
      ],
      "\u4e0a\u6cb3\u5185\u5cb3": [
        {
          trailhead: "\u8336\u81fc\u5cb3\u767b\u5c71\u53e3\u99d0\u8eca\u5834",
          course: "\u8336\u81fc\u5cb3\u767b\u5c71\u53e3\u30b3\u30fc\u30b9",
          parking: "\u3042\u308a",
          notes: ["\u7551\u8599\u7b2c\u4e00\u30c0\u30e0\u99d0\u8eca\u5834\u5229\u7528", "\u7551\u8599\u81e8\u6642\u9001\u8fce\u30d0\u30b9\u533a\u9593\u3042\u308a", "\u30c8\u30a4\u30ec\u3042\u308a"]
        }
      ],
    "\u7b8a\u30f6\u5cb3": [
      {
        trailhead: "\u8001\u5e73\u767b\u5c71\u53e3\u99d0\u8eca\u30b9\u30da\u30fc\u30b9",
        course: "\u8001\u5e73\u30b3\u30fc\u30b9",
        parking: "\u3042\u308a",
        notes: ["\u7121\u6599", "\u30c8\u30a4\u30ec\u306a\u3057", "\u9577\u6642\u9593\u884c\u7a0b"]
      }
    ],
    "\u4f50\u6b66\u6d41\u5c71": [
      {
        trailhead: "\u30c9\u30ed\u30ce\u6728\u5e73\u767b\u5c71\u53e3\u99d0\u8eca\u30b9\u30da\u30fc\u30b9",
        course: "\u30c9\u30ed\u30ce\u6728\u5e73\u30b3\u30fc\u30b9",
        parking: "\u3042\u308a",
        notes: ["\u7121\u6599", "\u30c8\u30a4\u30ec\u306a\u3057", "\u6797\u9053\u72b6\u6cc1\u306f\u4e8b\u524d\u78ba\u8a8d\u63a8\u5968"]
      }
    ],
    "\u5b89\u5e73\u8def\u5c71": [
      {
        trailhead: "\u5927\u5e73\u5bbf\u99d0\u8eca\u30b9\u30da\u30fc\u30b9",
        course: "\u6442\u53e4\u6728\u81ea\u7136\u5712\u5165\u53e3\u30b3\u30fc\u30b9",
        parking: "\u3042\u308a",
        notes: ["\u7121\u6599", "\u30c8\u30a4\u30ec\u306a\u3057", "\u6797\u9053\u6b69\u304d\u3042\u308a"]
      }
    ],
    "\u92f8\u5cb3": [
      {
        trailhead: "\u6238\u53f0\u6cb3\u539f\u99d0\u8eca\u5834",
        course: "\u6238\u53f0\u6cb3\u539f\u30b3\u30fc\u30b9",
        parking: "\u3042\u308a",
        notes: ["\u7121\u6599", "\u30d0\u30b9\u30fb\u30bf\u30af\u30b7\u30fc\u5229\u7528\u53ef", "\u30c8\u30a4\u30ec\u3042\u308a"]
      }
    ],
    "\u6c60\u53e3\u5cb3": [
      {
        trailhead: "\u6c60\u53e3\u6797\u9053\u53e3\u99d0\u8eca\u30b9\u30da\u30fc\u30b9",
        course: "\u6c60\u53e3\u6797\u9053\u53e3\u30b3\u30fc\u30b9",
        parking: "\u3042\u308a",
        notes: ["\u7121\u6599", "\u30c8\u30a4\u30ec\u306a\u3057", "\u9577\u6642\u9593\u884c\u7a0b"]
      }
    ],
    "\u5927\u7121\u9593\u5c71": [
      {
        trailhead: "\u7530\u4ee3\u767b\u5c71\u53e3\u99d0\u8eca\u30b9\u30da\u30fc\u30b9",
        course: "\u7530\u4ee3\u767b\u5c71\u53e3\u30b3\u30fc\u30b9",
        parking: "\u3042\u308a",
        notes: ["\u7121\u6599", "\u901a\u884c\u96e3\u5ea6\u306e\u9ad8\u3044\u7834\u7dda\u30eb\u30fc\u30c8\u542b\u3080", "\u30c8\u30a4\u30ec\u306a\u3057"]
      }
    ],
    "\u7b08\u30f6\u5cb3": [
      {
        trailhead: "\u51ac\u74dc\u5c71\u767b\u5c71\u53e3\u99d0\u8eca\u30b9\u30da\u30fc\u30b9",
        course: "\u51ac\u74dc\u5c71\u30fb\u30b7\u30ea\u30bf\u30ab\u5c71\u7d4c\u7531\u30b3\u30fc\u30b9",
        parking: "\u3042\u308a",
        notes: ["\u7121\u6599", "\u6b8b\u96ea\u671f\u306f\u96e3\u5ea6\u4e0a\u6607", "\u30c8\u30a4\u30ec\u306a\u3057"]
      }
    ],
    "\u8d64\u725b\u5cb3": [
      {
        trailhead: "\u4e03\u5009\u5c71\u8358\u99d0\u8eca\u5834",
        course: "\u8aad\u58f2\u65b0\u9053\u30b3\u30fc\u30b9",
        parking: "\u3042\u308a",
        notes: ["\u4e03\u5009\u307e\u3067\u30de\u30a4\u30ab\u30fc\u53ef", "\u9ad8\u702c\u30c0\u30e0\u307e\u3067\u306f\u30bf\u30af\u30b7\u30fc\u307e\u305f\u306f\u5f92\u6b69", "\u9577\u5927\u884c\u7a0b"]
      }
    ],
    "\u70cf\u5e3d\u5b50\u5cb3": [
      {
        trailhead: "\u4e03\u5009\u5c71\u8358\u99d0\u8eca\u5834",
        course: "\u9ad8\u702c\u30c0\u30e0\u30fb\u30d6\u30ca\u7acb\u5c3e\u6839\u30b3\u30fc\u30b9",
        parking: "\u3042\u308a",
        notes: ["\u4e03\u5009\u307e\u3067\u30de\u30a4\u30ab\u30fc\u53ef", "\u9ad8\u702c\u30c0\u30e0\u307e\u3067\u306f\u30bf\u30af\u30b7\u30fc\u307e\u305f\u306f\u5f92\u6b69", "\u30c8\u30a4\u30ec\u3042\u308a"]
      }
    ],
    "\u767d\u7802\u5c71": [
      {
        trailhead: "\u91ce\u53cd\u6e56\u99d0\u8eca\u5834",
        course: "\u91ce\u53cd\u6e56\u5468\u56de\u30b3\u30fc\u30b9",
        parking: "\u3042\u308a",
        notes: ["\u7121\u6599", "\u30c8\u30a4\u30ec\u3042\u308a", "\u5730\u8535\u5ce0\u65b9\u9762\u3078\u5165\u5c71"]
      }
    ],
    "\u9ed2\u59eb\u5c71": [
      {
        trailhead: "\u5927\u6a4b\u6797\u9053\u53e3\u99d0\u8eca\u5834",
        course: "\u5927\u6a4b\u767b\u5c71\u53e3\u30b3\u30fc\u30b9",
        parking: "\u3042\u308a",
        notes: ["10\u53f0\uff08\u8def\u80a9\uff09", "\u7121\u6599", "\u30c8\u30a4\u30ec\u306a\u3057"]
      }
    ],
    "\u6709\u660e\u5c71": [
      {
        trailhead: "\u4e2d\u623f\u6e29\u6cc9\u767b\u5c71\u53e3\u99d0\u8eca\u5834",
        course: "\u6709\u660e\u8358\u30fb\u88cf\u53c2\u9053\u30b3\u30fc\u30b9",
        parking: "\u3042\u308a",
        notes: ["\u7b2c1\u301c\u7b2c3\u99d0\u8eca\u5834", "\u767b\u5c71\u30dd\u30b9\u30c8\u3042\u308a", "\u30c8\u30a4\u30ec\u3042\u308a"]
      }
    ],
    "\u5357\u99d2\u30f6\u5cb3": [
      {
        trailhead: "\u4f0a\u5948\u5ddd\u30c0\u30e0\u4e0a\u99d0\u8eca\u5834",
        course: "\u4f0a\u5948\u5ddd\u30c0\u30e0\u4e0a\u30fb\u8d8a\u767e\u5c71\u7d4c\u7531\u30b3\u30fc\u30b9",
        parking: "\u3042\u308a",
        notes: ["50\u53f0", "\u7121\u6599", "\u30c8\u30a4\u30ec\u306a\u3057"]
      }
    ],
    "\u91d1\u525b\u5802\u5c71": [
      {
        trailhead: "\u6803\u8c37\u767b\u5c71\u53e3\u99d0\u8eca\u30b9\u30da\u30fc\u30b9",
        course: "\u6803\u8c37\u30eb\u30fc\u30c8",
        parking: "\u3042\u308a",
        notes: ["\u7121\u6599", "\u30c8\u30a4\u30ec\u306a\u3057"]
      }
    ],
    "\u4f4d\u5c71": [
      {
        trailhead: "\u30e2\u30f3\u30c7\u30a6\u30b9\u98db\u9a28\u4f4d\u5c71\u99d0\u8eca\u5834",
        course: "\u30e2\u30f3\u30c7\u30a6\u30b9\u98db\u9a28\u4f4d\u5c71\u30b3\u30fc\u30b9",
        parking: "\u3042\u308a",
        notes: ["\u7121\u6599", "\u30c8\u30a4\u30ec\u3042\u308a"]
      }
    ],
    "\u5c0f\u79c0\u5c71": [
      {
        trailhead: "\u4e59\u5973\u6e13\u99d0\u8eca\u5834",
        course: "\u4e59\u5973\u6e13\u30b3\u30fc\u30b9",
        parking: "\u3042\u308a",
        notes: ["\u7121\u6599", "\u30c8\u30a4\u30ec\u3042\u308a"]
      }
    ],
    "\u91dd\u30ce\u6728\u5cb3": [
      {
        trailhead: "\u6247\u6ca2\u99d0\u8eca\u5834",
        course: "\u6247\u6ca2\u30fb\u91dd\u30ce\u6728\u5927\u96ea\u6e13\u30b3\u30fc\u30b9",
        parking: "\u3042\u308a",
        notes: ["\u7121\u6599", "\u30c8\u30a4\u30ec\u3042\u308a", "\u767b\u5c71\u30dd\u30b9\u30c8\u3042\u308a"]
      }
    ],
    "\u5b88\u9580\u5cb3": [
      {
        trailhead: "\u4fdd\u4e45\u793c\u99d0\u8eca\u5834",
        course: "\u4fdd\u4e45\u793c\u30b3\u30fc\u30b9",
        parking: "\u3042\u308a",
        notes: ["\u7d0420\u53f0", "\u7121\u6599", "\u30c8\u30a4\u30ec\u3042\u308a"]
      }
    ],
    "\u516b\u6d77\u5c71": [
      {
        trailhead: "\u516d\u65e5\u753a\u516b\u6d77\u5c71\u30b9\u30ad\u30fc\u5834\u99d0\u8eca\u5834",
        course: "\u30ed\u30fc\u30d7\u30a6\u30a7\u30a4\u5c71\u9802\u99c5\u30b3\u30fc\u30b9",
        parking: "\u3042\u308a",
        notes: ["\u7d041000\u53f0", "\u7121\u6599", "\u30c8\u30a4\u30ec\u3042\u308a", "\u30b9\u30ad\u30fc\u30b7\u30fc\u30ba\u30f3\u571f\u65e5\u30fb\u5e74\u672b\u5e74\u59cb\u306f\u6709\u6599\u65e5\u3042\u308a"]
      }
    ],
    "\u98ef\u7e04\u5c71": [
      {
        trailhead: "\u4e00\u306e\u9ce5\u5c45\u82d1\u5730\u99d0\u8eca\u5834",
        course: "\u4e00\u306e\u9ce5\u5c45\u30b3\u30fc\u30b9",
        parking: "\u3042\u308a",
        notes: ["\u7d0460\u53f0", "\u7121\u6599", "\u30c8\u30a4\u30ec\u3042\u308a"]
      }
    ],
    "\u6238\u96a0\u5c71": [
      {
        trailhead: "\u6238\u96a0\u795e\u793e\u5965\u793e\u5165\u53e3\u7b2c1\u30fb\u7b2c2\u99d0\u8eca\u5834",
        course: "\u6238\u96a0\u795e\u793e\u5965\u793e\u5165\u53e3\u30b3\u30fc\u30b9",
        parking: "\u3042\u308a",
        notes: ["117\u53f0\u002b50\u53f0", "800\u5186\u301c1200\u5186/\u65e5", "\u30c8\u30a4\u30ec\u3042\u308a"]
      }
    ],
    "\u5929\u72d7\u5cb3": [
      {
        trailhead: "\u6e0b\u5fa1\u6bbf\u6e6f\u99d0\u8eca\u5834",
        course: "\u6e0b\u306e\u6e6f\u30b3\u30fc\u30b9",
        parking: "\u3042\u308a",
        notes: ["\u7d0445\u53f0", "1000\u5186/\u65e5", "\u30c8\u30a4\u30ec\u3042\u308a"]
      }
    ],
    "\u5fa1\u6b63\u4f53\u5c71": [
      {
        trailhead: "\u5c71\u4f0f\u5ce0\u5165\u53e3\u99d0\u8eca\u5834",
        course: "\u5c71\u4f0f\u5ce0\u30b3\u30fc\u30b9",
        parking: "\u3042\u308a",
        notes: ["3\u53f0\uff08\u8def\u80a9\uff09", "\u7121\u6599", "\u30c8\u30a4\u30ec\u306a\u3057"]
      }
    ],
    "\u4e03\u9762\u5c71": [
      {
        trailhead: "\u7fbd\u8863\u99d0\u8eca\u5834",
        course: "\u8868\u53c2\u9053\u30b3\u30fc\u30b9",
        parking: "\u3042\u308a",
        notes: ["15\u53f0\u002b25\u53f0\u002b\u8def\u80a9", "\u7121\u6599", "\u30c8\u30a4\u30ec\u3042\u308a"]
      }
    ],
    "\u7d4c\u30f6\u5cb3": [
      {
        trailhead: "\u5927\u6cc9\u6240\u30c0\u30e0\u99d0\u8eca\u5834",
        course: "\u5927\u6cc9\u6240\u30c0\u30e0\u30b3\u30fc\u30b9",
        parking: "\u3042\u308a",
        notes: ["5\u53f0\uff08\u8def\u80a9\uff09", "\u7121\u6599", "\u30c8\u30a4\u30ec\u3042\u308a"]
      }
    ],
    "\u5fa1\u5728\u6240\u5cb3": [
      {
        trailhead: "\u5272\u8c37\u99d0\u8eca\u5834",
        course: "\u4e2d\u9053\u30b3\u30fc\u30b9",
        parking: "\u3042\u308a",
        notes: ["\u7121\u6599", "\u4e2d\u767b\u5c71\u9053\u5165\u53e3\u307e\u3067\u5f92\u6b69\u7d045\u5206"]
      }
    ],
    "\u91d1\u525b\u5c71": [
      {
        trailhead: "\u5927\u962a\u5e9c\u7acb\u91d1\u525b\u767b\u5c71\u9053\u99d0\u8eca\u5834",
        course: "\u4f0f\u898b\u6797\u9053\u30b3\u30fc\u30b9",
        parking: "\u3042\u308a",
        notes: ["6:00\u301c21:00", "\u666e\u901a\u8eca1\u65e5600\u5186", "\u30c8\u30a4\u30ec\u3042\u308a"]
      }
    ],
    "\u6b66\u5948\u30f6\u5cb3": [
      {
        trailhead: "\u30a4\u30f3\u8c37\u53e3\u99d0\u8eca\u5834",
        course: "\u30a4\u30f3\u8c37\u53e3\u30b3\u30fc\u30b9",
        parking: "\u3042\u308a",
        notes: ["\u7d0430\u53f0", "\u7121\u6599", "\u30c8\u30a4\u30ec\u3042\u308a", "\u767b\u5c71\u30dd\u30b9\u30c8\u3042\u308a"]
      }
    ],
    "\u6c37\u30ce\u5c71": [
      {
        trailhead: "\u308f\u304b\u3055\u6c37\u30ce\u5c71\u30ad\u30e3\u30f3\u30d7\u5834\u99d0\u8eca\u5834",
        course: "\u6c37\u30ce\u8d8a\u30b3\u30fc\u30b9",
        parking: "\u3042\u308a",
        notes: ["\u7d0430\u53f0", "\u7121\u6599", "\u30c8\u30a4\u30ec\u3042\u308a"]
      }
    ],
    "\u4e8c\u738b\u5b50\u5cb3": [
      {
        trailhead: "\u4e8c\u738b\u5b50\u795e\u793e\u767b\u5c71\u8005\u99d0\u8eca\u5834",
        course: "\u4e8c\u738b\u5b50\u5cb3\u30b3\u30fc\u30b9",
        parking: "\u3042\u308a",
        notes: ["\u7d0470\u53f0", "\u7121\u6599", "\u4e8c\u738b\u5b50\u795e\u793e\u304b\u3089\u5165\u5c71"]
      }
    ],
    "\u5e1d\u91c8\u5c71": [
      {
        trailhead: "\u99ac\u5742\u5ce0\u99d0\u8eca\u5834",
        course: "\u99ac\u5742\u5ce0\u30b3\u30fc\u30b9",
        parking: "\u3042\u308a",
        notes: ["\u7d0430\u53f0", "\u7121\u6599", "\u30c8\u30a4\u30ec\u3042\u308a", "11\u6708\u4e2d\u65ec\u301c6\u6708\u521d\u65ec\u306f\u6797\u9053\u51ac\u671f\u9589\u9396\u306e\u76ee\u5b89"]
      }
    ],
    "\u4f1a\u6d25\u671d\u65e5\u5cb3": [
      {
        trailhead: "\u8d64\u5009\u6ca2\u99d0\u8eca\u5834",
        course: "\u8d64\u5009\u6ca2\u30b3\u30fc\u30b9",
        parking: "\u3042\u308a",
        notes: ["15\u301c20\u53f0", "\u7121\u6599", "\u7c21\u6613\u30c8\u30a4\u30ec\u3042\u308a", "\u672a\u8217\u88c5\u8def\u3042\u308a"]
      }
    ],
    "\u5973\u5cf0\u5c71": [
      {
        trailhead: "\u88cf\u898b\u30ce\u6edd\u99d0\u8eca\u5834",
        course: "\u88cf\u898b\u30ce\u6edd\u30b3\u30fc\u30b9",
        parking: "\u3042\u308a",
        notes: ["\u7d0415\u53f0", "\u7121\u6599", "\u30c8\u30a4\u30ec\u3042\u308a", "\u51ac\u671f\u306f\u30c8\u30a4\u30ec\u9589\u9396"]
      }
    ],
    "\u6d45\u9593\u96a0\u5c71": [
      {
        trailhead: "\u6d45\u9593\u96a0\u5c71\u767b\u5c71\u53e3\u99d0\u8eca\u5834",
        course: "\u6d45\u9593\u96a0\u5c71\u767b\u5c71\u53e3\u30b3\u30fc\u30b9",
        parking: "\u3042\u308a",
        notes: ["15\u53f0\u002b\u8def\u80a9", "\u7121\u6599", "\u7c21\u6613\u30c8\u30a4\u30ec\u3042\u308a"]
      }
    ],
    "\u8352\u8239\u5c71": [
      {
        trailhead: "\u5185\u5c71\u5ce0\u99d0\u8eca\u5834",
        course: "\u5185\u5c71\u5ce0\u30b3\u30fc\u30b9",
        parking: "\u3042\u308a",
        notes: ["\u7d0420\u53f0", "\u7121\u6599", "\u7c21\u6613\u30c8\u30a4\u30ec\u3042\u308a", "\u4eee\u8a2d\u30c8\u30a4\u30ec\u306f10\u6708\u672b\u307e\u3067\u306e\u76ee\u5b89"]
      }
    ],
    "\u767d\u77f3\u5c71\uff08\u548c\u540d\u5009\u5c71\uff09": [
      {
        trailhead: "\u79e9\u7236\u6e56\u4e8c\u702c\u30c0\u30e0\u99d0\u8eca\u5834",
        course: "\u79e9\u7236\u6e56\u4e8c\u702c\u30c0\u30e0\u30b3\u30fc\u30b9",
        parking: "\u3042\u308a",
        notes: ["\u7d0440\u53f0", "\u7121\u6599", "\u30c8\u30a4\u30ec\u3042\u308a", "\u767b\u5c71\u53e3\u306f\u99d0\u8eca\u5834\u5148\u306e\u904a\u6b69\u9053"]
      }
    ],
    "\u5927\u5cb3\u5c71": [
      {
        trailhead: "\u5927\u6edd\u5165\u53e3\u99d0\u8eca\u5834",
        course: "\u5927\u6edd\u5165\u53e3\u30b3\u30fc\u30b9",
        parking: "\u3042\u308a",
        notes: ["5\u53f0\u002b\u8def\u80a9", "\u7121\u6599", "\u30c8\u30a4\u30ec\u306a\u3057", "\u4e00\u90e8\u672a\u8217\u88c5\u6797\u9053\u3042\u308a"]
      }
    ],
    "\u4e09\u30c4\u5ce0\u5c71": [
      {
        trailhead: "\u61a9\u3044\u306e\u68ee\u516c\u5712\u99d0\u8eca\u5834",
        course: "\u4e09\u3064\u5ce0\u99c5\u30b3\u30fc\u30b9",
        parking: "\u3042\u308a",
        notes: ["\u7d0430\u53f0", "\u7121\u6599", "\u30c8\u30a4\u30ec\u3042\u308a"]
      }
    ],
    "\u6b66\u7532\u5c71": [
      {
        trailhead: "\u751f\u5ddd\u99d0\u8eca\u5834",
        course: "\u8868\u53c2\u9053\u30b3\u30fc\u30b9",
        parking: "\u3042\u308a",
        notes: ["\u7121\u6599", "\u7d0420\u53f0", "\u672a\u8217\u88c5\u8def\u306a\u3057"]
      }
    ],
    "\u4e7e\u5fb3\u5c71": [
      {
        trailhead: "\u5927\u5e73\u99d0\u8eca\u5834",
        course: "\u30aa\u30bd\u30d0\u6ca2\u30eb\u30fc\u30c8",
        parking: "\u3042\u308a",
        notes: ["\u7d0430\u53f0", "\u6709\u6599", "\u5e02\u9053\u306f\u72ed\u3044\u30ab\u30fc\u30d6\u304c\u7d9a\u304f\u305f\u3081\u904b\u8ee2\u6ce8\u610f"]
      }
    ],
    "\u8305\u30f6\u5cb3": [
      {
        trailhead: "\u6df1\u7530\u8a18\u5ff5\u516c\u5712\u99d0\u8eca\u5834",
        course: "\u6df1\u7530\u8a18\u5ff5\u516c\u5712\u30b3\u30fc\u30b9",
        parking: "\u3042\u308a",
        notes: ["\u7d0430\u53f0", "\u30c8\u30a4\u30ec\u3042\u308a", "\u767b\u5c71\u53e3\u307e\u3067\u7d040km"]
      }
    ],
    "\u5999\u7fa9\u5c71": [
      {
        trailhead: "\u767b\u5c71\u8005\u5c02\u7528\u99d0\u8eca\u5834",
        course: "\u4e2d\u9593\u9053\u7e26\u8d70\u3068\u77f3\u9580\u5de1\u308a",
        parking: "\u3042\u308a",
        notes: []
      }
    ],
    "御神楽岳": [
      {
        trailhead: "室谷登山口駐車場",
        course: "室谷コース",
        parking: "あり",
        notes: ["無料", "トイレあり"]
      }
    ],
    "守門岳": [
      {
        trailhead: "保久礼駐車場",
        course: "保久礼コース",
        parking: "あり",
        notes: ["約20台", "無料", "トイレあり"]
      }
    ],
    "八海山": [
      {
        trailhead: "六日町八海山スキー場駐車場",
        course: "ロープウェイ山頂駅コース",
        parking: "あり",
        notes: ["約1000台", "無料", "トイレあり"]
      }
    ],
    "飯縄山": [
      {
        trailhead: "一の鳥居苑地駐車場",
        course: "一の鳥居コース",
        parking: "あり",
        notes: ["約60台", "無料", "トイレあり"]
      }
    ],
    "戸隠山": [
      {
        trailhead: "戸隠神社奥社入口第1・第2駐車場",
        course: "戸隠神社奥社入口コース",
        parking: "あり",
        notes: ["117台+50台", "800円〜1200円/日", "トイレあり"]
      }
    ],
    "天狗岳": [
      {
        trailhead: "渋御殿湯駐車場",
        course: "渋の湯コース",
        parking: "あり",
        notes: ["約45台", "1000円/日", "トイレあり"]
      }
    ],
    "御正体山": [
      {
        trailhead: "山伏峠入口駐車場",
        course: "山伏峠コース",
        parking: "あり",
        notes: ["3台（路肩）", "無料", "トイレなし"]
      }
    ],
    "七面山": [
      {
        trailhead: "羽衣駐車場",
        course: "表参道コース",
        parking: "あり",
        notes: ["15台+25台+路肩", "無料", "トイレあり"]
      }
    ],
    "経ヶ岳": [
      {
        trailhead: "大泉所ダム駐車場",
        course: "大泉所ダムコース",
        parking: "あり",
        notes: ["5台（路肩）", "無料", "トイレあり"]
      }
    ],
    "愛鷹山": [
      {
        trailhead: "十里木高原駐車場",
        course: "十里木高原・越前岳コース",
        parking: "あり",
        notes: ["無料", "トイレあり"]
      }
    ],
    "金剛堂山": [
      {
        trailhead: "栃谷登山口駐車スペース",
        course: "栃谷ルート",
        parking: "あり",
        notes: ["無料", "トイレなし"]
      }
    ],
    "位山": [
      {
        trailhead: "モンデウス飛騨位山駐車場",
        course: "モンデウス飛騨位山コース",
        parking: "あり",
        notes: ["無料", "トイレあり"]
      }
    ],
    "大日ヶ岳": [
      {
        trailhead: "ひるがの高原登山口駐車場",
        course: "ひるがの高原コース",
        parking: "あり",
        notes: ["無料", "トイレあり"]
      }
    ],
    "能郷白山": [
      {
        trailhead: "温見峠駐車スペース",
        course: "温見峠コース",
        parking: "あり",
        notes: ["路肩利用", "無料", "トイレなし"]
      }
    ],
    "朳差岳": [
      {
        trailhead: "大石ダム駐車場",
        course: "大石ダム彫刻公園コース",
        parking: "あり",
        notes: ["10台程度", "無料", "トイレあり"]
      },
      {
        trailhead: "東俣彫刻公園ゲート前駐車場",
        course: "東俣コース",
        parking: "あり",
        notes: ["15台程度", "無料", "通行規制は要確認"]
      }
    ],
    "中ノ岳": [
      {
        trailhead: "十字峡登山センター駐車場",
        course: "十字峡登山センターコース",
        parking: "あり",
        notes: ["30台程度", "無料", "トイレあり", "三国川ダムより先は冬期通行止あり"]
      }
    ],
    "佐武流山": [
      {
        trailhead: "ドロノ木平駐車場",
        course: "ドロノ木平コース",
        parking: "あり",
        notes: ["5台（路肩）", "無料", "トイレなし", "栃川温泉より先は冬期閉鎖あり"]
      }
    ],
    "雪倉岳": [
      {
        trailhead: "蓮華温泉駐車場",
        course: "蓮華温泉コース",
        parking: "あり",
        notes: ["72台", "無料", "トイレあり", "蓮華温泉方面は冬期閉鎖あり"]
      }
    ],
    "上河内岳": [
      {
        trailhead: "沼平ゲート駐車場",
        course: "茶臼岳登山口コース",
        parking: "あり",
        notes: ["40台（路肩）", "無料", "トイレなし", "畑薙湖東岸の林道ゲート前"]
      }
    ],
    "池口岳": [
      {
        trailhead: "池口林道口駐車場",
        course: "池口林道口コース",
        parking: "あり",
        notes: ["3台＋路肩", "無料", "簡易トイレあり", "未舗装林道あり"]
      }
    ],
    "大無間山": [
      {
        trailhead: "田代駐車場",
        course: "田代コース",
        parking: "あり",
        notes: ["15台", "無料", "トイレなし", "田代生涯学習交流館跡地付近"]
      }
    ],
    "烏帽子岳": [
      {
        trailhead: "七倉駐車場",
        course: "高瀬ダム・ブナ立尾根コース",
        parking: "あり",
        notes: ["80台", "無料", "トイレあり", "高瀬ダムへは一般車進入不可のためタクシー利用が基本"]
      }
    ],
    "毛勝山": [
      {
        trailhead: "馬場島駐車場",
        course: "モモアセ山コース",
        parking: "あり",
        notes: ["30台程度", "無料", "トイレあり", "残雪期は毛勝谷の状況確認推奨"]
      }
    ],
    "乾徳山": [
      {
        trailhead: "徳和駐車場",
        course: "徳和コース",
        parking: "あり",
        notes: ["無料", "トイレあり", "集落内に複数の駐車スペースあり"]
      }
    ],
    "茅ヶ岳": [
      {
        trailhead: "深田記念公園駐車場",
        course: "深田記念公園コース",
        parking: "あり",
        notes: ["20〜30台", "無料", "トイレあり", "登山口まで約0km"]
      }
    ],
    "三ツ峠山": [
      {
        trailhead: "いこいの森公園駐車場",
        course: "いこいの森公園コース",
        parking: "あり",
        notes: ["無料", "トイレあり", "達磨石経由で開運山へ"]
      }
    ],
    "櫛形山": [
      {
        trailhead: "池の茶屋口駐車場",
        course: "池の茶屋口コース",
        parking: "あり",
        notes: ["10〜16台", "無料", "簡易トイレあり", "池の茶屋林道は冬期閉鎖あり"]
      }
    ],
    "二王子岳": [
      {
        trailhead: "二王子神社駐車場",
        course: "二王子岳コース",
        parking: "あり",
        notes: ["無料", "トイレあり", "混雑時は手前駐車場も利用可"]
      }
    ],
    "笊ヶ岳": [
      {
        trailhead: "見神の滝駐車場",
        course: "見神の滝・老平コース",
        parking: "あり",
        notes: ["無料", "トイレあり", "老平駐車場満車時の代替として利用可", "広河原の渡河状況は要確認"]
      }
    ],
    "針ノ木岳": [
      {
        trailhead: "扇沢駅駐車場",
        course: "扇沢・針ノ木雪渓コース",
        parking: "あり",
        notes: ["市営無料駐車場あり", "トイレあり", "雪渓通過期は残雪状況の確認推奨"]
      }
    ],
    "奥大日岳": [
      {
        trailhead: "扇沢駅駐車場",
        course: "室堂コース",
        parking: "あり",
        notes: ["扇沢から立山黒部アルペンルートで室堂へ移動", "有料", "トイレあり", "交通機関の始発時刻確認推奨"]
      }
    ],
    "毛無山": [
      {
        trailhead: "毛無山駐車場",
        course: "麓登山口コース",
        parking: "あり",
        notes: ["約25台", "500円", "駐車場手前にトイレあり", "急登が続く最短ルート"]
      }
    ],
    "荒沢岳": [
      {
        trailhead: "銀山平登山口駐車場",
        course: "銀山平登山口コース",
        parking: "あり",
        notes: ["無料", "トイレあり", "鎖場・ハシゴが連続する上級向け", "鎖設置・撤去時期は要確認"]
      }
    ],
    "黒姫山": [
      {
        trailhead: "大橋林道口駐車場",
        course: "大橋登山口周回コース",
        parking: "あり",
        notes: ["10台（路肩）", "無料", "トイレなし", "古池側の駐車余地も数台あり"]
      }
    ],
    "燕岳": [
      {
        trailhead: "中房登山口市営駐車場",
        course: "中房温泉・合戦尾根コース",
        parking: "あり",
        notes: ["60台＋40台", "無料（一部予約有料あり）", "簡易トイレあり", "登山口まで徒歩数分"]
      }
    ],
    "大天井岳": [
      {
        trailhead: "中房登山口市営駐車場",
        course: "中房温泉・表銀座コース",
        parking: "あり",
        notes: ["60台＋40台", "無料（一部予約有料あり）", "簡易トイレあり", "表銀座縦走の起点"]
      }
    ],
    "餓鬼岳": [
      {
        trailhead: "白沢登山口駐車場",
        course: "白沢登山口コース",
        parking: "あり",
        notes: ["20台（路肩）", "無料", "簡易トイレあり", "シーズン中は仮設トイレ設置"]
      }
    ],
    "岩菅山": [
      {
        trailhead: "岩菅山登山道入口駐車場",
        course: "岩菅山登山道入口コース",
        parking: "あり",
        notes: ["10台＋10台（路肩）", "無料", "トイレなし", "志賀高原一の瀬から旧道へ入る"]
      }
    ],
    "御座山": [
      {
        trailhead: "長者の森駐車場",
        course: "長者の森コース",
        parking: "あり",
        notes: ["約30台", "無料", "トイレあり", "ロッジ営業期間のみ利用可"]
      }
    ],
    "小秀山": [
      {
        trailhead: "乙女渓谷駐車場",
        course: "乙女渓谷コース",
        parking: "あり",
        notes: ["30台＋70台", "500円", "トイレあり", "二ノ谷ルートは通行規制情報の確認推奨"]
      }
    ],
    "鳥甲山": [
      {
        trailhead: "ムジナ平駐車場",
        course: "ムジナ平コース",
        parking: "あり",
        notes: ["20台", "無料", "トイレなし", "カミソリ岩や鎖場を含む上級向け"]
      }
    ],
    "鋸岳": [
      {
        trailhead: "釜無川駐車スペース",
        course: "横岳峠コース",
        parking: "あり",
        notes: ["路肩駐車", "無料", "トイレなし", "破線ルートを含むため経験者向け"]
      }
    ],
    "農鳥岳": [
      {
        trailhead: "奈良田駐車場",
        course: "奈良田コース",
        parking: "あり",
        notes: ["無料", "トイレあり", "奈良田バス待合所付近", "第二駐車場は運用状況要確認"]
      }
    ],
    "霞沢岳": [
      {
        trailhead: "沢渡駐車場",
        course: "上高地・徳本峠コース",
        parking: "あり",
        notes: ["有料", "トイレあり", "上高地へはシャトルバスまたはタクシー利用", "徳本峠経由の長時間行動"]
      }
    ],
    "安平路山": [
      {
        trailhead: "大平駐車場",
        course: "大平・摺古木山コース",
        parking: "あり",
        notes: ["無料", "トイレあり", "摺古木自然園方面の長距離コース", "林道状況は要確認"]
      }
    ],
    "南駒ヶ岳": [
      {
        trailhead: "桂小場駐車場",
        course: "今朝沢橋コース",
        parking: "あり",
        notes: ["25台（路肩）", "無料", "簡易トイレあり", "長時間の破線ルートを含むため経験者向け"]
      }
    ],
    "有明山": [
      {
        trailhead: "有明荘第3駐車場",
        course: "有明荘・裏参道コース",
        parking: "あり",
        notes: ["複数駐車場あり", "有料あり", "トイレあり", "燕岳方面と共用のため早朝混雑に注意"]
      }
    ],
    "赤牛岳": [
      {
        trailhead: "七倉駐車場",
        course: "高瀬ダム・水晶小屋コース",
        parking: "あり",
        notes: ["50台以上", "無料", "トイレあり", "高瀬ダムまでは一般車進入不可のためタクシー利用が基本", "裏銀座深部の超長距離ルート"]
      }
    ],
    "伊吹山": [
      {
        trailhead: "伊吹山無人駐車場",
        course: "上野口コース",
        parking: "あり",
        notes: ["約30台", "300円", "トイレあり", "上野口登山道の最新規制確認を推奨"]
      }
    ],
    "大台ヶ原山": [
      {
        trailhead: "大台ヶ原駐車場",
        course: "東大台コース",
        parking: "あり",
        notes: ["約200台", "無料", "トイレあり", "ビジターセンター併設"]
      }
    ],
    "大峰山": [
      {
        trailhead: "行者還トンネル西口駐車場",
        course: "行者還トンネル西口コース",
        parking: "あり",
        notes: ["約25台〜100台規模", "1000円", "トイレあり", "週末は早朝満車になりやすい"]
      }
    ],
    "御在所岳": [
      {
        trailhead: "町営割谷駐車場",
        course: "中登山口コース",
        parking: "あり",
        notes: ["50台", "無料", "トイレなし", "中登山口まで車道を約150m"]
      }
    ],
    "釈迦ヶ岳": [
      {
        trailhead: "釈迦ヶ岳太尾登山口駐車場",
        course: "太尾登山口コース",
        parking: "あり",
        notes: ["約10台", "無料", "トイレあり", "県道168号は落石に注意"]
      }
    ],
    "伯母子岳": [
      {
        trailhead: "大股登山口駐車場",
        course: "大股コース",
        parking: "あり",
        notes: ["4台", "無料", "トイレあり", "満車時は周辺代替駐車場の確認推奨"]
      }
    ],
    "金剛山": [
      {
        trailhead: "千早本道登山口駐車場",
        course: "千早本道コース",
        parking: "あり",
        notes: ["20台〜50台", "600円〜800円", "トイレあり", "千早本道は階段主体の定番ルート"]
      }
    ],
    "武奈ヶ岳": [
      {
        trailhead: "坊村登山口駐車場",
        course: "坊村コース",
        parking: "あり",
        notes: ["複数駐車場あり", "有料あり", "トイレあり", "坊村から御殿山経由が定番"]
      }
    ],
    "氷ノ山": [
      {
        trailhead: "福定親水公園駐車場",
        course: "福定親水公園周回コース",
        parking: "あり",
        notes: ["20台程度", "無料", "トイレあり", "親水公園から氷ノ山越経由で周回可能"]
      }
    ],
    "大山": [
      {
        trailhead: "南光河原駐車場",
        course: "大山寺コース",
        parking: "あり",
        notes: ["約40台", "1000円", "トイレあり", "夏山登山道の定番起点"]
      }
    ],
    "剣山": [
      {
        trailhead: "見ノ越駐車場",
        course: "見ノ越コース",
        parking: "あり",
        notes: ["約200台", "無料", "トイレあり", "リフト利用可", "週末繁忙期は早朝満車に注意"]
      }
    ],
    "石鎚山": [
      {
        trailhead: "石鎚ロープウェイ駐車場",
        course: "下谷コース",
        parking: "あり",
        notes: ["約600台", "有料", "トイレあり", "ロープウェイ・リフト利用で成就社へ"]
      }
    ],
    "上蒜山": [
      {
        trailhead: "上蒜山登山口駐車場",
        course: "上蒜山登山口縦走コース",
        parking: "あり",
        notes: ["20台程度", "無料", "トイレあり", "蒜山三座縦走の起点のひとつ"]
      }
    ],
    "三瓶山": [
      {
        trailhead: "東の原駐車場",
        course: "東の原周回コース",
        parking: "あり",
        notes: ["多数", "無料", "トイレあり", "リフト営業状況は要確認"]
      }
    ],
    "三嶺": [
      {
        trailhead: "名頃駐車場",
        course: "名頃コース",
        parking: "あり",
        notes: ["約30台", "無料", "トイレあり", "四国らしい笹原の定番ルート"]
      }
    ],
    "東赤石山": [
      {
        trailhead: "筏津登山口駐車場",
        course: "筏津往復コース",
        parking: "あり",
        notes: ["20台程度", "無料", "トイレあり", "渡渉点・鎖場あり", "筏津山荘跡地付近"]
      }
    ],
    "笹ヶ峰": [
      {
        trailhead: "寒風山登山口駐車場",
        course: "寒風山登山口コース",
        parking: "あり",
        notes: ["約50台", "無料", "トイレあり", "旧寒風山トンネル付近", "林道・笹原の緩やかな定番ルート"]
      }
    ],
    "九重山": [
      {
        trailhead: "牧ノ戸峠駐車場",
        course: "牧ノ戸峠コース",
        parking: "あり",
        notes: ["約150台", "無料", "トイレあり", "九重連山の定番起点", "週末は早朝満車に注意"]
      }
    ],
    "祖母山": [
      {
        trailhead: "北谷登山口駐車場",
        course: "北谷登山口コース",
        parking: "あり",
        notes: ["約30台", "無料", "トイレあり", "吊橋・沢沿い区間あり", "宮原方面の分岐確認推奨"]
      }
    ],
    "阿蘇山": [
      {
        trailhead: "阿蘇山上ターミナル駐車場",
        course: "阿蘇山上コース",
        parking: "あり",
        notes: ["多数", "有料あり", "トイレあり", "火口規制・ガス規制の最新確認が必須"]
      }
    ],
    "霧島山": [
      {
        trailhead: "えびの高原駐車場",
        course: "韓国岳コース",
        parking: "あり",
        notes: ["多数", "有料", "トイレあり", "火山規制・硫黄山周辺の立入情報確認が必須"]
      }
    ],
    "開聞岳": [
      {
        trailhead: "かいもん山麓ふれあい公園駐車場",
        course: "二合目登山口コース",
        parking: "あり",
        notes: ["多数", "無料", "トイレあり", "らせん状の一筆登山道が定番"]
      }
    ],
    "宮之浦岳": [
      {
        trailhead: "淀川登山口駐車場",
        course: "淀川登山口コース",
        parking: "あり",
        notes: ["約40台", "無料", "トイレあり", "屋久島は雨天・増水時の道路状況確認を推奨"]
      }
    ],
    "英彦山": [
      {
        trailhead: "英彦山神宮奉幣殿駐車場",
        course: "奉幣殿コース",
        parking: "あり",
        notes: ["有料", "トイレあり", "石段と参道が長く続く定番コース"]
      }
    ],
    "由布岳": [
      {
        trailhead: "由布岳正面登山口駐車場",
        course: "正面登山口コース",
        parking: "あり",
        notes: ["約40台", "無料", "トイレあり", "西峰周回は鎖場・ザレ場に注意"]
      }
    ],
    "大崩山": [
      {
        trailhead: "上祝子登山口駐車場",
        course: "上祝子登山口周回コース",
        parking: "あり",
        notes: ["約30台", "無料", "トイレあり", "梯子・鎖場多数", "増水時は渡渉判断に注意"]
      }
    ],
    "雲仙岳": [
      {
        trailhead: "仁田峠駐車場",
        course: "仁田峠循環コース",
        parking: "あり",
        notes: ["約200台", "1000円", "トイレあり", "妙見岳ロープウェイ利用可", "火山規制情報の確認が必須"]
      }
    ],
    "市房山": [
      {
        trailhead: "市房神社駐車場",
        course: "市房神社コース",
        parking: "あり",
        notes: ["約30台", "無料", "トイレあり", "長い樹林帯登りが続く定番ルート"]
      }
    ],
    "尾鈴山": [
      {
        trailhead: "尾鈴キャンプ場駐車場",
        course: "白滝コース",
        parking: "あり",
        notes: ["約50台", "無料", "トイレあり", "滝見と組み合わせやすいが渡渉・ぬかるみに注意"]
      }
    ],
    "高千穂峰": [
      {
        trailhead: "高千穂河原駐車場",
        course: "高千穂河原コース",
        parking: "あり",
        notes: ["約100台", "500円", "トイレあり", "御鉢周辺は火山規制・強風に注意"]
      }
    ],
    "桜島": [
      {
        trailhead: "湯之平展望所駐車場",
        course: "湯之平展望所散策コース",
        parking: "あり",
        notes: ["多数", "無料", "トイレあり", "登山規制が続くため立入可能範囲の確認が必須"]
      }
    ],
    "利尻岳": [
      {
        trailhead: "利尻北麓野営場駐車場",
        course: "鴛泊コース",
        parking: "あり",
        notes: ["約30台", "無料", "トイレあり", "鴛泊港から車で約10分"]
      }
    ],
    "羅臼岳": [
      {
        trailhead: "岩尾別温泉駐車場",
        course: "岩尾別温泉コース",
        parking: "あり",
        notes: ["約20台", "無料", "トイレあり", "木下小屋・岩尾別温泉周辺"]
      }
    ],
    "斜里岳": [
      {
        trailhead: "清岳荘駐車場",
        course: "旧道コース → 新道コース",
        parking: "あり",
        notes: ["約40台", "無料", "トイレあり", "沢沿い旧道は増水時注意"]
      }
    ],
    "阿寒岳": [
      {
        trailhead: "雌阿寒温泉登山口駐車場",
        course: "雌阿寒岳コース",
        parking: "あり",
        notes: ["約50台", "無料", "トイレあり", "火山規制情報の確認推奨"]
      }
    ],
    "大雪山": [
      {
        trailhead: "旭岳温泉公共駐車場",
        course: "旭岳温泉コース",
        parking: "あり",
        notes: ["多数", "無料", "トイレあり", "ロープウェイ利用可", "縦走時は下山地の交通計画が必要"]
      }
    ],
    "トムラウシ山": [
      {
        trailhead: "トムラウシ温泉登山口駐車場",
        course: "トムラウシ温泉コース",
        parking: "あり",
        notes: ["約50台", "無料", "トイレあり", "長距離ルート", "増水時の渡渉に注意"]
      }
    ],
    "十勝岳": [
      {
        trailhead: "望岳台駐車場",
        course: "望岳台コース",
        parking: "あり",
        notes: ["約100台", "無料", "トイレあり", "火山規制とガス情報の確認推奨"]
      }
    ],
    "幌尻岳": [
      {
        trailhead: "とよぬか山荘駐車場",
        course: "幌尻岳コース",
        parking: "あり",
        notes: ["約30台", "無料", "トイレあり", "渡渉多数", "事前予約制シャトル運行の確認推奨"]
      }
    ],
    "後方羊蹄山": [
      {
        trailhead: "羊蹄山自然公園駐車場",
        course: "真狩コース",
        parking: "あり",
        notes: ["約80台", "無料", "トイレあり", "真狩コース定番起点"]
      }
    ],
    "天塩岳": [
      {
        trailhead: "天塩岳ヒュッテ・天塩岳登山口キャンプ場駐車場",
        course: "前天塩岳コース",
        parking: "あり",
        notes: ["無料", "トイレあり", "ヒュッテ・キャンプ場併設"]
      }
    ],
    "石狩岳": [
      {
        trailhead: "石狩岳シュナイダーコース登山口駐車場",
        course: "シュナイダーコース",
        parking: "あり",
        notes: ["約10台", "無料", "トイレなし", "北海道有数の急登ルート"]
      }
    ],
    "ニペソツ山": [
      {
        trailhead: "幌加温泉登山口駐車場",
        course: "十六の沢コース",
        parking: "あり",
        notes: ["約20台", "無料", "トイレあり", "長距離かつ渡渉・ぬかるみ注意"]
      }
    ],
    "ｶﾑｲｴｸｳﾁｶｳｼ山": [
      {
        trailhead: "札内川ヒュッテ駐車場",
        course: "八ノ沢カール往復コース",
        parking: "あり",
        notes: ["約20台", "無料", "トイレあり", "渡渉多数", "林道・沢状況確認が必須"]
      }
    ],
    "ペテガリ岳": [
      {
        trailhead: "イドンナップ山荘駐車場",
        course: "新冠コース",
        parking: "あり",
        notes: ["約15台", "無料", "トイレあり", "長距離ルート", "徒渉や林道状況の確認が必須"]
      }
    ],
    "芦別岳": [
      {
        trailhead: "山部自然公園太陽の里駐車場",
        course: "旧道コース（北尾根経由）",
        parking: "あり",
        notes: ["約50台", "無料", "トイレあり", "旧道は急登と鎖場あり"]
      }
    ],
    "夕張岳": [
      {
        trailhead: "夕張岳登山口駐車場",
        course: "冷水コース",
        parking: "あり",
        notes: ["約30台", "無料", "トイレあり", "高山植物期は混雑しやすい"]
      }
    ],
    "暑寒別岳": [
      {
        trailhead: "暑寒荘前駐車場",
        course: "ペンケペタンコース",
        parking: "あり",
        notes: ["約30台", "無料", "トイレあり", "暑寒荘開設期間の確認推奨"]
      }
    ],
    "樽前山": [
      {
        trailhead: "樽前山七合目駐車場",
        course: "外輪山コース",
        parking: "あり",
        notes: ["多数", "無料", "トイレあり", "内輪山は立入禁止", "冬期道路閉鎖あり"]
      }
    ],
    "北海道駒ヶ岳": [
      {
        trailhead: "赤井川コース六合目駐車場",
        course: "赤井川・馬ノ背コース",
        parking: "あり",
        notes: ["あり", "無料", "トイレあり", "入山期間・時間制限の確認が必要"]
      }
    ],
    "岩木山": [
      {
        trailhead: "百沢登山口駐車場",
        course: "百沢コース",
        parking: "あり",
        notes: ["約50台", "無料", "トイレあり", "津軽岩木スカイライン八合目駐車場利用時は有料"]
      }
    ],
    "八甲田山": [
      {
        trailhead: "酸ヶ湯公共駐車場",
        course: "酸ヶ湯温泉コース",
        parking: "あり",
        notes: ["多数", "無料", "トイレあり", "毛無岱周回の定番起点"]
      }
    ],
    "八幡平": [
      {
        trailhead: "八幡平山頂レストハウス駐車場",
        course: "八幡平山頂散策コース",
        parking: "あり",
        notes: ["多数", "有料時期あり", "トイレあり", "木道主体で散策しやすい"]
      }
    ],
    "岩手山": [
      {
        trailhead: "馬返し登山口駐車場",
        course: "柳沢コース",
        parking: "あり",
        notes: ["約100台", "無料", "トイレあり", "焼走り・御神坂方面との縦走計画に注意"]
      }
    ],
    "早池峰山": [
      {
        trailhead: "小田越駐車場",
        course: "小田越コース",
        parking: "あり",
        notes: ["約30台", "無料", "トイレあり", "マイカー規制期はシャトルバス利用"]
      }
    ],
    "鳥海山": [
      {
        trailhead: "滝の小屋駐車場",
        course: "湯ノ台口コース",
        parking: "あり",
        notes: ["約100台", "無料", "トイレあり", "残雪期は雪渓通過に注意"]
      }
    ],
    "月山": [
      {
        trailhead: "月山八合目駐車場",
        course: "八合目コース",
        parking: "あり",
        notes: ["多数", "無料", "トイレあり", "高山植物期は混雑しやすい"]
      }
    ],
    "蔵王山": [
      {
        trailhead: "刈田岳駐車場",
        course: "刈田岳コース",
        parking: "あり",
        notes: ["多数", "有料時期あり", "トイレあり", "御釜周辺は強風に注意"]
      }
    ],
    "吾妻山": [
      {
        trailhead: "天元台ロープウェイ駐車場",
        course: "天元台コース",
        parking: "あり",
        notes: ["多数", "有料", "トイレあり", "ロープウェイ・リフト利用可"]
      }
    ],
    "安達太良山": [
      {
        trailhead: "あだたら高原スキー場駐車場",
        course: "奥岳温泉コース",
        parking: "あり",
        notes: ["多数", "無料", "トイレあり", "ロープウェイ利用可", "火山規制情報の確認推奨"]
      }
    ],
    "磐梯山": [
      {
        trailhead: "八方台駐車場",
        course: "八方台コース",
        parking: "あり",
        notes: ["約120台", "無料", "トイレあり", "表裏どちらにも下山可能な定番起点"]
      }
    ],
    "会津駒ヶ岳": [
      {
        trailhead: "滝沢登山口駐車場",
        course: "滝沢登山口コース",
        parking: "あり",
        notes: ["約30台", "無料", "トイレあり", "駒の小屋経由の定番ルート"]
      }
    ],
    "那須岳": [
      {
        trailhead: "峠の茶屋駐車場",
        course: "峠の茶屋コース",
        parking: "あり",
        notes: ["約150台", "無料", "トイレあり", "強風と火山規制情報の確認推奨"]
      }
    ],
    "燧ヶ岳": [
      {
        trailhead: "御池駐車場",
        course: "御池コース",
        parking: "あり",
        notes: ["多数", "有料", "トイレあり", "湿原木道は濡れると滑りやすい"]
      }
    ],
    "白神岳": [
      {
        trailhead: "蟶山登山口駐車場",
        course: "蟶山コース",
        parking: "あり",
        notes: ["約20台", "無料", "トイレあり", "白神岳避難小屋経由の定番コース"]
      }
    ],
    "姫神山": [
      {
        trailhead: "一本杉登山口駐車場",
        course: "一本杉コース",
        parking: "あり",
        notes: ["約50台", "無料", "トイレあり", "短時間で登れる人気コース"]
      }
    ],
    "秋田駒ヶ岳": [
      {
        trailhead: "八合目駐車場",
        course: "片倉岳コース",
        parking: "あり",
        notes: ["約100台", "無料", "トイレあり", "マイカー規制期はバス利用"]
      }
    ],
    "和賀岳": [
      {
        trailhead: "薬師岳山荘前駐車場",
        course: "薬師岳コース",
        parking: "あり",
        notes: ["約20台", "無料", "トイレあり", "長距離ルート", "登山口まで林道状況確認推奨"]
      }
    ],
    "森吉山": [
      {
        trailhead: "阿仁スキー場駐車場",
        course: "こめつがコース",
        parking: "あり",
        notes: ["多数", "無料", "トイレあり", "ゴンドラ利用可"]
      }
    ],
    "焼石岳": [
      {
        trailhead: "中沼登山口駐車場",
        course: "中沼コース",
        parking: "あり",
        notes: ["約50台", "無料", "トイレあり", "湿原と花の時期が人気"]
      }
    ],
    "栗駒山": [
      {
        trailhead: "いわかがみ平駐車場",
        course: "中央コース",
        parking: "あり",
        notes: ["多数", "無料", "トイレあり", "シャトルバス運行時期あり", "火山規制情報の確認推奨"]
      }
    ],
    "神室山": [
      {
        trailhead: "西ノ又登山口駐車場",
        course: "西ノ又コース",
        parking: "あり",
        notes: ["約15台", "無料", "トイレなし", "急登と痩せ尾根が続く"]
      }
    ],
    "船形山": [
      {
        trailhead: "升沢登山口駐車場",
        course: "升沢コース",
        parking: "あり",
        notes: ["約30台", "無料", "トイレあり", "升沢小屋経由の定番ルート"]
      }
    ],
    "以東岳": [
      {
        trailhead: "大鳥登山口駐車場",
        course: "オツボ峰コース",
        parking: "あり",
        notes: ["約20台", "無料", "トイレあり", "長距離で朝日連峰縦走の色が強い"]
      }
    ],
    "帝釈山": [
      {
        trailhead: "猿倉登山口駐車場",
        course: "猿倉登山口コース",
        parking: "あり",
        notes: ["約20台", "無料", "トイレあり", "田代山湿原と組み合わせやすい"]
      }
    ],
    "会津朝日岳": [
      {
        trailhead: "赤倉沢登山口駐車場",
        course: "赤倉沢コース",
        parking: "あり",
        notes: ["約15台", "無料", "トイレなし", "急登主体の長距離コース"]
      }
    ],
    "筑波山": [
      {
        trailhead: "筑波山神社入口駐車場",
        course: "御幸ヶ原コース",
        parking: "あり",
        notes: ["複数駐車場あり", "有料", "トイレあり", "週末は混雑しやすい"]
      }
    ],
    "至仏山": [
      {
        trailhead: "鳩待峠駐車場",
        course: "鳩待峠コース",
        parking: "あり",
        notes: ["有料", "トイレあり", "マイカー規制時は戸倉からバス利用", "至仏山は入山規制期あり"]
      }
    ],
    "武尊山": [
      {
        trailhead: "川場谷野営場駐車場",
        course: "川場谷コース",
        parking: "あり",
        notes: ["約50台", "無料", "トイレあり", "剣ヶ峰山方面は鎖場に注意"]
      }
    ],
    "赤城山": [
      {
        trailhead: "おのこ駐車場",
        course: "黒檜山コース",
        parking: "あり",
        notes: ["約100台", "無料", "トイレあり", "大沼周辺周回と組み合わせやすい"]
      }
    ],
    "男体山": [
      {
        trailhead: "二荒山神社中宮祠駐車場",
        course: "二荒山神社コース",
        parking: "あり",
        notes: ["約100台", "有料", "トイレあり", "開山期間の確認が必要"]
      }
    ],
    "日光白根山": [
      {
        trailhead: "丸沼高原駐車場",
        course: "丸沼高原コース",
        parking: "あり",
        notes: ["多数", "無料", "トイレあり", "ロープウェイ利用可"]
      }
    ],
    "皇海山": [
      {
        trailhead: "銀山平・庚申山荘入口駐車場",
        course: "庚申山荘コース",
        parking: "あり",
        notes: ["約30台", "無料", "トイレあり", "長距離かつ岩場あり", "林道状況確認推奨"]
      }
    ],
    "草津白根山": [
      {
        trailhead: "白根レストハウス駐車場",
        course: "本白根山コース",
        parking: "あり",
        notes: ["多数", "有料時期あり", "トイレあり", "火山規制情報の確認が必須"]
      }
    ],
    "四阿山": [
      {
        trailhead: "菅平牧場駐車場",
        course: "菅平高原コース",
        parking: "あり",
        notes: ["約100台", "有料", "トイレあり", "根子岳との周回も可能"]
      }
    ],
    "両神山": [
      {
        trailhead: "日向大谷第二・第三駐車場",
        course: "日向大谷コース",
        parking: "あり",
        notes: ["15台＋15台", "無料", "トイレなし", "有料駐車場も別途あり", "鎖場区間に注意"]
      }
    ],
    "雲取山": [
      {
        trailhead: "鴨沢駐車場",
        course: "鴨沢コース",
        parking: "あり",
        notes: ["約30台", "無料", "トイレあり", "長距離のため早出推奨"]
      }
    ],
    "丹沢": [
      {
        trailhead: "大倉駐車場",
        course: "大倉尾根コース",
        parking: "あり",
        notes: ["多数", "有料", "トイレあり", "階段主体の長い登り", "塔ノ岳経由の定番起点"]
      }
    ],
    "女峰山": [
      {
        trailhead: "霧降高原駐車場",
        course: "霧降高原周回コース",
        parking: "あり",
        notes: ["約200台", "無料", "トイレあり", "階段区間が長い"]
      }
    ],
    "仙ノ倉山": [
      {
        trailhead: "平標登山口駐車場",
        course: "平標登山口周回コース",
        parking: "あり",
        notes: ["約80台", "600円", "トイレあり", "高山植物期は混雑しやすい"]
      }
    ],
    "榛名山": [
      {
        trailhead: "県立榛名公園ビジターセンター駐車場",
        course: "榛名富士・掃部ヶ岳周回コース",
        parking: "あり",
        notes: ["多数", "無料", "トイレあり", "榛名湖周辺散策と組み合わせやすい"]
      }
    ],
    "浅間隠山": [
      {
        trailhead: "二度上峠駐車場",
        course: "二度上峠コース",
        parking: "あり",
        notes: ["約20台", "無料", "トイレなし", "短時間で展望が得られる"]
      }
    ],
    "妙義山": [
      {
        trailhead: "中之嶽神社駐車場",
        course: "石門巡りコース",
        parking: "あり",
        notes: ["多数", "無料", "トイレあり", "一般向けでも鎖場・岩場あり"]
      }
    ],
    "荒船山": [
      {
        trailhead: "内山峠駐車場",
        course: "内山峠コース",
        parking: "あり",
        notes: ["約30台", "無料", "トイレあり", "艫岩までは比較的歩きやすい"]
      }
    ],
    "武甲山": [
      {
        trailhead: "一の鳥居駐車場",
        course: "一の鳥居コース",
        parking: "あり",
        notes: ["有料", "トイレあり", "セメント工場付近を通るため案内確認推奨"]
      }
    ],
    "白石山": [
      {
        trailhead: "将監小屋前駐車場",
        course: "将監峠コース",
        parking: "あり",
        notes: ["約20台", "無料", "トイレあり", "長距離で静かな奥秩父ルート"]
      }
    ],
    "大岳山": [
      {
        trailhead: "御岳登山鉄道滝本駅駐車場",
        course: "御岳山・ロックガーデン周回コース",
        parking: "あり",
        notes: ["有料", "トイレあり", "ケーブルカー利用可"]
      }
    ],
    "白砂山": [
      {
        trailhead: "野反湖登山口駐車場",
        course: "野反湖コース",
        parking: "あり",
        notes: ["多数", "無料", "トイレあり", "高山植物期に人気"]
      }
    ]
  };
  const MOUNTAIN_HIGHLIGHTS = {
    "\u9ed2\u59eb\u5c71": "\u898b\u3069\u3053\u308d: \u30d6\u30ca\u6797\u304b\u3089\u7a81\u7136\u958b\u3051\u308b\u5916\u8f2a\u5c71\u7a1c\u7dda\u3068\u3001\u6238\u96a0\u30fb\u5999\u9ad8\u65b9\u9762\u306e\u5c55\u671b\u304c\u9b45\u529b\u3067\u3059",
    "\u5ca9\u83c5\u5c71": "\u898b\u3069\u3053\u308d: \u5fd7\u8cc0\u9ad8\u539f\u306e\u6e7f\u539f\u3068\u5bfe\u79f0\u7684\u306a\u5c71\u5bb9\u304c\u7f8e\u3057\u304f\u3001\u5c71\u9802\u304b\u3089\u306f\u5317\u30a2\u3084\u5999\u9ad8\u30fb\u706b\u6253\u65b9\u9762\u307e\u3067\u671b\u3081\u307e\u3059",
    "\u5fa1\u5ea7\u5c71": "\u898b\u3069\u3053\u308d: \u91dd\u8449\u6a39\u6797\u3092\u629c\u3051\u3066\u73fe\u308c\u308b\u5ca9\u5cf0\u7684\u306a\u5c71\u9802\u3068\u3001\u516b\u30f6\u5cb3\u30fb\u79e9\u7236\u65b9\u9762\u306e\u5c55\u671b\u304c\u9b45\u529b\u3067\u3059",
    "\u6bdb\u7121\u5c71": "\u898b\u3069\u3053\u308d: \u6025\u767b\u306e\u5148\u306b\u5bcc\u58eb\u5c71\u306e\u6b63\u9762\u773a\u671b\u304c\u958b\u3051\u3001\u5ca9\u5834\u3084\u91d1\u5c71\u8de1\u306a\u3069\u5909\u5316\u306b\u5bcc\u3093\u3060\u30eb\u30fc\u30c8\u304c\u697d\u3057\u3081\u307e\u3059",
    "\u6adb\u5f62\u5c71": "\u898b\u3069\u3053\u308d: \u30a2\u30e4\u30e1\u3084\u30c4\u30c4\u30b8\u3067\u77e5\u3089\u308c\u308b\u82b1\u306e\u5c71\u3067\u3001\u7de9\u3084\u304b\u306a\u68ee\u6b69\u304d\u3092\u697d\u3057\u307f\u3084\u3059\u3044\u5c71\u3067\u3059",
    "\u71d5\u5cb3": "\u898b\u3069\u3053\u308d: \u30a4\u30eb\u30ab\u5ca9\u306a\u3069\u306e\u82b1\u5d17\u5ca9\u306e\u9020\u5f62\u3068\u3001\u5317\u30a2\u8868\u9280\u5ea7\u306e\u5c55\u671b\u304c\u5727\u5dfb\u3067\u3059",
    "\u5927\u5929\u4e95\u5cb3": "\u898b\u3069\u3053\u308d: \u8868\u9280\u5ea7\u7e26\u8d70\u306e\u4e2d\u5fc3\u7684\u306a\u30d4\u30fc\u30af\u3067\u3001\u69cd\u30f6\u5cb3\u3084\u5e38\u5ff5\u5cb3\u65b9\u9762\u3078\u306e\u5927\u7a1c\u7dda\u304c\u9b45\u529b\u3067\u3059",
    "\u611b\u9df9\u5c71": "\u898b\u3069\u3053\u308d: \u8d8a\u524d\u5cb3\u3092\u4e2d\u5fc3\u306b\u5bcc\u58eb\u5c71\u3068\u99ff\u6cb3\u6e7e\u65b9\u9762\u306e\u5c55\u671b\u304c\u7d20\u6674\u3089\u3057\u304f\u3001\u767b\u308a\u3084\u3059\u3055\u3082\u9b45\u529b\u3067\u3059",
    "\u5927\u65e5\u30f6\u5cb3": "\u898b\u3069\u3053\u308d: \u30d6\u30ca\u6797\u304b\u3089\u958b\u3051\u308b\u7a4f\u3084\u304b\u306a\u5c71\u9802\u90e8\u3068\u3001\u767d\u5c71\u30fb\u5225\u5c71\u65b9\u9762\u306e\u5c55\u671b\u304c\u697d\u3057\u3081\u307e\u3059",
    "\u80fd\u90f7\u767d\u5c71": "\u898b\u3069\u3053\u308d: \u6025\u767b\u306e\u5148\u306b\u5e83\u304c\u308b\u7a1c\u7dda\u3068\u3001\u767d\u5c71\u5468\u8fba\u306e\u5c71\u4e26\u307f\u3092\u898b\u6e21\u305b\u308b\u958b\u653e\u611f\u304c\u9b45\u529b\u3067\u3059",
    "\u96ea\u5009\u5cb3": "\u898b\u3069\u3053\u308d: \u5927\u96ea\u6e13\u3084\u9ad8\u5c71\u690d\u7269\u3068\u3001\u671d\u65e5\u30fb\u767d\u99ac\u65b9\u9762\u306e\u5927\u5c55\u671b\u304c\u9b45\u529b\u3067\u3059",
    "\u6bdb\u52dd\u5c71": "\u898b\u3069\u3053\u308d: \u6b8b\u96ea\u3068\u5927\u96ea\u6e13\u3067\u77e5\u3089\u308c\u308b\u967a\u5cfb\u3067\u3001\u5271\u5ca9\u3068\u96ea\u306e\u9020\u5f62\u7f8e\u304c\u5370\u8c61\u7684\u3067\u3059",
    "\u5965\u5927\u65e5\u5cb3": "\u898b\u3069\u3053\u308d: \u7acb\u5c71\u9023\u5cf0\u3068\u5263\u5cb3\u3092\u6b63\u9762\u306b\u671b\u3080\u5927\u5c55\u671b\u3068\u3001\u9ad8\u5c71\u690d\u7269\u306e\u7a1c\u7dda\u304c\u9b45\u529b\u3067\u3059",
    "\u9913\u9b3c\u5cb3": "\u898b\u3069\u3053\u308d: \u9577\u3044\u6a39\u6797\u5e2f\u306e\u5148\u306b\u958b\u3051\u308b\u5317\u30a2\u5c71\u7a1c\u3068\u3001\u5510\u6ca2\u5cb3\u3078\u7d9a\u304f\u7a1c\u7dda\u666f\u89b3\u304c\u9b45\u529b\u3067\u3059",
    "\u971e\u6ca2\u5cb3": "\u898b\u3069\u3053\u308d: \u5fb3\u672c\u5ce0\u304b\u3089\u306e\u6b74\u53f2\u3042\u308b\u30eb\u30fc\u30c8\u3068\u3001\u7a42\u9ad8\u30fb\u4e0a\u9ad8\u5730\u65b9\u9762\u306e\u5927\u5c55\u671b\u304c\u9b45\u529b\u3067\u3059",
    "\u8fb2\u9ce5\u5cb3": "\u898b\u3069\u3053\u308d: \u767d\u5cf0\u4e09\u5c71\u5357\u7aef\u306e\u5927\u304d\u306a\u5c71\u5bb9\u3068\u3001\u9593\u30ce\u5cb3\u30fb\u5317\u5cb3\u3078\u7d9a\u304f\u9ad8\u6240\u7e26\u8d70\u304c\u9b45\u529b\u3067\u3059",
    "\u4e0a\u6cb3\u5185\u5cb3": "\u898b\u3069\u3053\u308d: \u5357\u30a2\u30eb\u30d7\u30b9\u5357\u90e8\u306e\u5ee3\u3044\u7a1c\u7dda\u3068\u3001\u8336\u81fc\u5cb3\u30fb\u8056\u5cb3\u65b9\u9762\u306e\u9577\u5927\u306a\u5c55\u671b\u304c\u9b45\u529b\u3067\u3059",
    "\u7b8a\u30f6\u5cb3": "\u898b\u3069\u3053\u308d: \u68ee\u6797\u9650\u754c\u3092\u629c\u3051\u305f\u5148\u306e\u9ad8\u5c71\u7684\u666f\u89b3\u3068\u3001\u5357\u30a2\u30eb\u30d7\u30b9\u6df1\u5357\u90e8\u3089\u3057\u3044\u9759\u3051\u3055\u304c\u9b45\u529b\u3067\u3059",
    "\u4f50\u6b66\u6d41\u5c71": "\u898b\u3069\u3053\u308d: \u82d7\u5834\u5c71\u5468\u8fba\u306e\u6df1\u3044\u68ee\u3068\u9759\u3051\u3055\u304c\u9b45\u529b\u3067\u3001\u4eba\u306e\u5c11\u306a\u3044\u7a1c\u7dda\u3092\u697d\u3057\u3081\u307e\u3059",
    "\u5b89\u5e73\u8def\u5c71": "\u898b\u3069\u3053\u308d: \u6442\u53e4\u6728\u5c71\u304b\u3089\u7d9a\u304f\u9577\u5927\u306a\u5c71\u7a1c\u3068\u3001\u4e2d\u592e\u30a2\u30eb\u30d7\u30b9\u5357\u7aef\u3089\u3057\u3044\u9759\u3051\u3055\u304c\u9b45\u529b\u3067\u3059",
    "\u92f8\u5cb3": "\u898b\u3069\u3053\u308d: \u7532\u6590\u99d2\u30f6\u5cb3\u3068\u3082\u547c\u3070\u308c\u308b\u5ca9\u58c1\u7684\u306a\u5c71\u5bb9\u3068\u3001\u9ed2\u6238\u5c3e\u6839\u65b9\u9762\u306e\u8373\u53b3\u306a\u666f\u89b3\u304c\u9b45\u529b\u3067\u3059",
    "\u6c60\u53e3\u5cb3": "\u898b\u3069\u3053\u308d: \u6df1\u5357\u90e8\u3089\u3057\u3044\u539f\u751f\u7684\u306a\u68ee\u6797\u5e2f\u3068\u3001\u5357\u30a2\u4e3b\u7a1c\u7dda\u3092\u898b\u6e21\u3059\u5c71\u9802\u304c\u9b45\u529b\u3067\u3059",
    "\u5927\u7121\u9593\u5c71": "\u898b\u3069\u3053\u308d: \u7834\u7dda\u30eb\u30fc\u30c8\u3092\u542b\u3080\u8363\u3057\u3044\u30b3\u30fc\u30b9\u306e\u5148\u306b\u3001\u5357\u30a2\u30eb\u30d7\u30b9\u6df1\u5357\u90e8\u306e\u9ed9\u3057\u305f\u308b\u7a1c\u7dda\u304c\u5e83\u304c\u308a\u307e\u3059",
    "\u7b08\u30f6\u5cb3": "\u898b\u3069\u3053\u308d: \u767d\u5c71\u5c71\u7cfb\u6700\u96e3\u95a2\u3068\u3082\u8a00\u308f\u308c\u308b\u6df1\u3044\u5c71\u57df\u3067\u3001\u5230\u9054\u611f\u3068\u5b64\u9ad8\u306e\u96f0\u56f2\u6c17\u304c\u9b45\u529b\u3067\u3059",
    "\u8d64\u725b\u5cb3": "\u898b\u3069\u3053\u308d: \u88cf\u9280\u5ea7\u5965\u90e8\u306e\u5b64\u9ad8\u306a\u30d4\u30fc\u30af\u3067\u3001\u9ed2\u90e8\u6e90\u6d41\u65b9\u9762\u3078\u306e\u58ee\u5927\u306a\u5c55\u671b\u304c\u5f97\u3089\u308c\u307e\u3059",
    "\u70cf\u5e3d\u5b50\u5cb3": "\u898b\u3069\u3053\u308d: \u30d6\u30ca\u7acb\u5c3e\u6839\u306e\u5148\u306b\u73fe\u308c\u308b\u5c16\u3063\u305f\u5c71\u5bb9\u3068\u3001\u88cf\u9280\u5ea7\u306e\u7a1c\u7dda\u6b69\u304d\u306e\u5c0e\u5165\u90e8\u5206\u304c\u5370\u8c61\u7684\u3067\u3059",
    "\u8352\u6ca2\u5cb3": "\u898b\u3069\u3053\u308d: \u8d8a\u5f8c\u4e09\u5c71\u5965\u90e8\u3089\u3057\u3044\u5ca9\u7a1c\u7684\u306a\u5c71\u5bb9\u3068\u3001\u9759\u304b\u3067\u967a\u3057\u3044\u96f0\u56f2\u6c17\u304c\u9b45\u529b\u3067\u3059",
    "\u4e2d\u30ce\u5cb3": "\u898b\u3069\u3053\u308d: \u8d8a\u5f8c\u4e09\u5c71\u306e\u4e00\u89d2\u3092\u306a\u3059\u5927\u304d\u306a\u5c71\u5bb9\u3068\u3001\u9577\u3044\u7a1c\u7dda\u7e26\u8d70\u306e\u9054\u6210\u611f\u304c\u9b45\u529b\u3067\u3059",
    "\u767d\u7802\u5c71": "\u898b\u3069\u3053\u308d: \u91ce\u53cd\u6e56\u304b\u3089\u7d9a\u304f\u306e\u3073\u3084\u304b\u306a\u7a1c\u7dda\u6f2b\u6b69\u3068\u3001\u767d\u7802\u5c71\u5c71\u9802\u5468\u8fba\u306e\u958b\u653e\u611f\u304c\u9b45\u529b\u3067\u3059",
    "\u9ce5\u7532\u5c71": "\u898b\u3069\u3053\u308d: \u92ed\u3044\u5ca9\u5cf0\u5e2f\u3068\u9577\u3044\u7e26\u8d70\u8def\u304c\u5370\u8c61\u7684\u3067\u3001\u4fe1\u8d8a\u56fd\u5883\u306e\u5c71\u6df1\u3055\u3092\u5473\u308f\u3048\u307e\u3059",
    "\u91dd\u30ce\u6728\u5cb3": "\u898b\u3069\u3053\u308d: \u96ea\u6e13\u3068\u91dd\u30ce\u6728\u5ce0\u304b\u3089\u306e\u7a1c\u7dda\u306e\u5c55\u671b\u304c\u7d20\u6674\u3089\u3057\u304f\u3001\u9ed2\u90e8\u65b9\u9762\u3078\u306e\u773a\u3081\u3082\u9b45\u529b\u3067\u3059",
    "\u6709\u660e\u5c71": "\u898b\u3069\u3053\u308d: \u4fe1\u4ef0\u306e\u5c71\u3089\u3057\u3044\u6025\u767b\u306e\u5148\u306b\u3001\u5317\u30a2\u5e38\u5ff5\u5c71\u8108\u3092\u898b\u6e21\u3059\u5c55\u671b\u304c\u5f85\u3063\u3066\u3044\u307e\u3059",
    "\u5357\u99d2\u30f6\u5cb3": "\u898b\u3069\u3053\u308d: \u4e2d\u592e\u30a2\u30eb\u30d7\u30b9\u5357\u90e8\u306e\u9577\u5927\u306a\u7a1c\u7dda\u3068\u3001\u7a7a\u6728\u30fb\u8d8a\u767e\u65b9\u9762\u3078\u306e\u5927\u5c55\u671b\u304c\u9b45\u529b\u3067\u3059",
    "\u91d1\u525b\u5802\u5c71": "\u898b\u3069\u3053\u308d: \u30d6\u30ca\u6797\u3068\u5e83\u3044\u5c71\u9802\u90e8\u304c\u5fc3\u5730\u3088\u304f\u3001\u767d\u5c71\u65b9\u9762\u306e\u5c55\u671b\u3082\u697d\u3057\u3081\u307e\u3059",
    "\u4f4d\u5c71": "\u898b\u3069\u3053\u308d: \u98db\u9a28\u306e\u4fe1\u4ef0\u3068\u6b74\u53f2\u304c\u6fc3\u304f\u6b8b\u308b\u7a4f\u3084\u304b\u306a\u5c71\u3067\u3001\u68ee\u6b69\u304d\u3092\u697d\u3057\u307f\u3084\u3059\u3044\u306e\u304c\u9b45\u529b\u3067\u3059",
    "\u5c0f\u79c0\u5c71": "\u898b\u3069\u3053\u308d: \u6edd\u3001\u6c34\u5834\u3001\u5ca9\u5cf0\u3068\u5909\u5316\u304c\u8c4a\u304b\u3067\u3001\u5fa1\u5dbd\u5c71\u3084\u6075\u90a3\u5c71\u65b9\u9762\u306e\u5c55\u671b\u304c\u697d\u3057\u3081\u307e\u3059",
    "\u5b88\u9580\u5cb3": "\u898b\u3069\u3053\u308d: \u30d6\u30ca\u6797\u3068\u96ea\u5e87\u3067\u77e5\u3089\u308c\u3001\u6b8b\u96ea\u671f\u304b\u3089\u65b0\u7dd1\u3001\u7d05\u8449\u307e\u3067\u5b63\u7bc0\u3054\u3068\u306e\u8868\u60c5\u304c\u8c4a\u304b\u306a\u5c71\u3067\u3059",
    "\u516b\u6d77\u5c71": "\u898b\u3069\u3053\u308d: \u516b\u30c4\u5cf0\u306e\u92ed\u3044\u5ca9\u7a1c\u3068\u8d8a\u5f8c\u4e09\u5c71\u3092\u671b\u3080\u5c55\u671b\u304c\u9b45\u529b\u3067\u3059",
    "\u98ef\u7e04\u5c71": "\u898b\u3069\u3053\u308d: \u77f3\u4ecf\u3092\u305f\u3069\u308b\u4fe1\u4ef0\u306e\u9053\u3068\u3001\u5317\u4fe1\u4e94\u5cb3\u3092\u671b\u3080\u5e83\u3044\u5c55\u671b\u304c\u697d\u3057\u3081\u307e\u3059",
    "\u6238\u96a0\u5c71": "\u898b\u3069\u3053\u308d: \u6238\u96a0\u9023\u5cf0\u3089\u3057\u3044\u7dca\u5f35\u611f\u306e\u3042\u308b\u5ca9\u7a1c\u6b69\u304d\u3068\u3001\u6238\u96a0\u795e\u793e\u306e\u4fe1\u4ef0\u6587\u5316\u304c\u5370\u8c61\u7684\u3067\u3059",
    "\u5929\u72d7\u5cb3": "\u898b\u3069\u3053\u308d: \u9ed2\u767e\u5408\u5e73\u304b\u3089\u7d9a\u304f\u7a1c\u7dda\u6b69\u304d\u3068\u3001\u516b\u30f6\u5cb3\u3089\u3057\u3044\u6c60\u3084\u5ca9\u5cf0\u306e\u666f\u89b3\u304c\u9b45\u529b\u3067\u3059",
    "\u5fa1\u6b63\u4f53\u5c71": "\u898b\u3069\u3053\u308d: \u9053\u5fd7\u5c71\u584a\u306e\u9759\u304b\u306a\u68ee\u6b69\u304d\u3068\u3001\u5c71\u9802\u5468\u8fba\u306e\u843d\u3061\u7740\u3044\u305f\u96f0\u56f2\u6c17\u304c\u9b45\u529b\u3067\u3059",
    "\u4e03\u9762\u5c71": "\u898b\u3069\u3053\u308d: \u656c\u614e\u9662\u3092\u7d4c\u3066\u767b\u308b\u4fe1\u4ef0\u306e\u5c71\u3067\u3001\u5357\u30a2\u30eb\u30d7\u30b9\u3084\u5bcc\u58eb\u5c71\u306e\u5c55\u671b\u304c\u697d\u3057\u3081\u307e\u3059",
    "\u7d4c\u30f6\u5cb3": "\u898b\u3069\u3053\u308d: \u4e2d\u592e\u30a2\u30eb\u30d7\u30b9\u524d\u885b\u306e\u9577\u3044\u5c3e\u6839\u3092\u6b69\u304d\u3001\u4f0a\u90a3\u8c37\u3084\u5357\u30a2\u30eb\u30d7\u30b9\u306e\u5c55\u671b\u304c\u5e83\u304c\u308a\u307e\u3059",
    "\u5fa1\u5728\u6240\u5cb3": "\u898b\u3069\u3053\u308d: \u5947\u5ca9\u306e\u591a\u3044\u9234\u9e7f\u3089\u3057\u3044\u666f\u89b3\u3068\u3001\u5c71\u9802\u304b\u3089\u306e\u5927\u5c55\u671b\u304c\u697d\u3057\u3081\u307e\u3059",
    "\u91d1\u525b\u5c71": "\u898b\u3069\u3053\u308d: \u56db\u5b63\u306e\u81ea\u7136\u89b3\u5bdf\u304c\u3057\u3084\u3059\u304f\u3001\u95a2\u897f\u3067\u89aa\u3057\u307e\u308c\u3066\u3044\u308b\u5b9a\u756a\u306e\u767b\u5c71\u5148\u3067\u3059",
    "\u6b66\u5948\u30f6\u5cb3": "\u898b\u3069\u3053\u308d: \u6bd4\u826f\u5c71\u5730\u6700\u9ad8\u5cf0\u3089\u3057\u3044\u958b\u653e\u7684\u306a\u5c71\u9802\u3068\u3001\u5e83\u3044\u8349\u5730\u72b6\u306e\u659c\u9762\u304c\u9b45\u529b\u3067\u3059",
    "\u6c37\u30ce\u5c71": "\u898b\u3069\u3053\u308d: \u30d6\u30ca\u6797\u3068\u5e83\u3044\u5c3e\u6839\u6b69\u304d\u304c\u5fc3\u5730\u3088\u304f\u3001\u95a2\u897f\u3092\u4ee3\u8868\u3059\u308b\u9ad8\u539f\u7684\u306a\u5c71\u5bb9\u3092\u5473\u308f\u3048\u307e\u3059",
    "\u4e09\u74f6\u5c71": "\u898b\u3069\u3053\u308d: \u706b\u53e3\u539f\u3092\u56f2\u3080\u5916\u8f2a\u5c71\u6b69\u304d\u3068\u8349\u539f\u666f\u89b3\u304c\u697d\u3057\u3081\u307e\u3059",
    "\u4e8c\u738b\u5b50\u5cb3": "\u898b\u3069\u3053\u308d: \u5c71\u9802\u304b\u3089\u98ef\u8c4a\u9023\u5cf0\u3084\u671d\u65e5\u9023\u5cf0\u3092\u671b\u307f\u3001\u4fe1\u4ef0\u306e\u5c71\u3089\u3057\u3044\u793e\u3084\u82b1\u306e\u591a\u3044\u767b\u5c71\u9053\u3082\u9b45\u529b\u3067\u3059",
    "\u5e1d\u91c8\u5c71": "\u898b\u3069\u3053\u308d: \u7530\u4ee3\u5c71\u3068\u7d44\u307f\u5408\u308f\u305b\u3084\u3059\u304f\u3001\u9ad8\u5c64\u6e7f\u539f\u3068\u7a4f\u3084\u304b\u306a\u7a1c\u7dda\u6b69\u304d\u3092\u4e00\u65e5\u3067\u697d\u3057\u3081\u307e\u3059",
    "\u4f1a\u6d25\u671d\u65e5\u5cb3": "\u898b\u3069\u3053\u308d: \u30d6\u30ca\u6797\u304b\u3089\u5ca9\u7a1c\u3078\u3068\u666f\u89b3\u304c\u5909\u308f\u308a\u3001\u5c71\u9802\u3067\u306f\u4f1a\u6d25\u306e\u5c71\u4e26\u307f\u3092\u5927\u304d\u304f\u898b\u6e21\u305b\u307e\u3059",
    "\u5973\u5cf0\u5c71": "\u898b\u3069\u3053\u308d: \u65e5\u5149\u9023\u5c71\u3089\u3057\u3044\u92ed\u3044\u5c71\u5bb9\u3068\u3001\u5c71\u9802\u304b\u3089\u7537\u4f53\u5c71\u3084\u5965\u65e5\u5149\u3092\u671b\u3080\u5927\u5c55\u671b\u304c\u9b45\u529b\u3067\u3059",
    "\u4ed9\u30ce\u5009\u5c71": "\u898b\u3069\u3053\u308d: \u5e73\u6a19\u5c71\u304b\u3089\u7d9a\u304f\u5e83\u3044\u7a1c\u7dda\u3068\u9ad8\u5c71\u690d\u7269\u304c\u7f8e\u3057\u304f\u3001\u8c37\u5ddd\u9023\u5cf0\u306e\u958b\u653e\u611f\u3092\u5473\u308f\u3048\u307e\u3059",
    "\u699b\u540d\u5c71": "\u898b\u3069\u3053\u308d: \u699b\u540d\u6e56\u3092\u56f2\u3080\u5916\u8f2a\u5c71\u306e\u666f\u8272\u304c\u826f\u304f\u3001\u77ed\u6642\u9593\u3067\u3082\u5c55\u671b\u3092\u697d\u3057\u307f\u3084\u3059\u3044\u5c71\u57df\u3067\u3059",
    "\u6d45\u9593\u96a0\u5c71": "\u898b\u3069\u3053\u308d: \u5c71\u9802\u304b\u3089\u6d45\u9593\u5c71\u306e\u5927\u5c55\u671b\u3092\u6b63\u9762\u306b\u671b\u3081\u308b\u3001\u773a\u671b\u306e\u826f\u3044\u4e8c\u767e\u540d\u5c71\u3067\u3059",
    "\u8352\u8239\u5c71": "\u898b\u3069\u3053\u308d: \u826b\u5ca9\u306e\u65ad\u5d16\u7d76\u58c1\u3068\u8239\u306e\u3088\u3046\u306a\u72ec\u7279\u306e\u53f0\u5730\u5730\u5f62\u304c\u5370\u8c61\u7684\u3067\u3059",
    "\u767d\u77f3\u5c71\uff08\u548c\u540d\u5009\u5c71\uff09": "\u898b\u3069\u3053\u308d: \u5965\u79e9\u7236\u3089\u3057\u3044\u6df1\u3044\u68ee\u3068\u9759\u3051\u3055\u304c\u9b45\u529b\u3067\u3001\u9577\u3044\u30a2\u30d7\u30ed\u30fc\u30c1\u306e\u5148\u306b\u6df1\u5c71\u611f\u3092\u5473\u308f\u3048\u307e\u3059",
    "\u5927\u5cb3\u5c71": "\u898b\u3069\u3053\u308d: \u5bcc\u58eb\u5c71\u5c55\u671b\u306b\u52a0\u3048\u3066\u30ed\u30c3\u30af\u30ac\u30fc\u30c7\u30f3\u3084\u6edd\u3082\u697d\u3057\u3081\u308b\u3001\u5965\u591a\u6469\u3089\u3057\u3044\u5909\u5316\u306e\u591a\u3044\u5c71\u3067\u3059",
    "\u4e09\u30c4\u5ce0\u5c71": "\u898b\u3069\u3053\u308d: \u958b\u904b\u5c71\u304b\u3089\u306e\u5bcc\u58eb\u5c71\u5c55\u671b\u3068\u3001\u6728\u7121\u5c71\u5468\u8fba\u306e\u8349\u539f\u30fb\u9ad8\u5c71\u690d\u7269\u304c\u9b45\u529b\u3067\u3059",
    "朳差岳": "見どころ: 飯豊連峰北端らしい長大な稜線歩きと、山頂直下に広がるお花畑、朝日連峰まで抜ける大展望が魅力です",
    "中ノ岳": "見どころ: 越後三山の最奥らしい重厚な山容と、日向山から一気に詰め上げる急登の先に広がる大きな稜線景観が魅力です",
    "佐武流山": "見どころ: 苗場山周辺の深い森を抜けてたどり着く静かな長距離稜線と、人の少ない二百名山らしい奥深さが魅力です",
    "雪倉岳": "見どころ: 白馬岳から続く高山植物の楽園と、黒部側へ切れ落ちる大斜面、白馬・朝日方面の展望が魅力です",
    "上河内岳": "見どころ: 茶臼岳から続く南アルプス南部の大稜線と、深南部らしい遠さを感じる広い眺望が魅力です",
    "池口岳": "見どころ: 南アルプス深南部の原生的な森と、黒薙から先で一気に開ける荒々しい尾根景観が魅力です",
    "大無間山": "見どころ: 深南部らしい静かな長大尾根と、難路を越えた先にだけ現れる重厚な山並みの達成感が魅力です",
    "烏帽子岳": "見どころ: 花崗岩の岩塔が突き立つ独特の山容と、裏銀座の起点らしい明るい稜線歩きが魅力です",
    "毛勝山": "見どころ: 剱岳を正面に望む荒々しい雪渓と残雪景観、モモアセ平周辺の開放感が魅力です",
    "笈ヶ岳": "見どころ: 残雪期にしか近づきにくい希少な名峰で、白山北部の盟主らしい孤高の雰囲気と大展望が魅力です",
    "櫛形山": "見どころ: 南アルプス前衛らしい穏やかな森歩きと、初夏のアヤメ群落、北岳方面の眺望が魅力です",
    "二王子岳": "見どころ: 飯豊連峰を正面に望む大展望と、信仰の山らしい一本調子の急登を登り切る達成感が魅力です",
    "笊ヶ岳": "見どころ: 南アルプス深南部らしい圧倒的な距離感と、布引山から続く高所の静かな稜線景観が魅力です",
    "針ノ木岳": "見どころ: 針ノ木雪渓を詰めて立つ大きな山容と、針ノ木峠から眺める立山・剱方面の展望が魅力です",
    "奥大日岳": "見どころ: 剱岳を真正面に望む稜線景観と、室堂から比較的短く高山帯を満喫できる点が魅力です",
    "毛無山": "見どころ: 急登の先にいきなり富士山の大展望が開ける迫力と、不動の滝を含む変化のある登路が魅力です",
    "荒沢岳": "見どころ: 越後駒や中ノ岳を圧するような豪快な岩稜の山容と、鎖場を越えて立つ山頂の緊張感が魅力です",
    "黒姫山": "見どころ: ブナ林と古池を経て外輪山的な稜線へ抜け、戸隠・妙高を望む北信らしい展望が魅力です",
    "燕岳": "見どころ: イルカ岩をはじめとした花崗岩の奇岩群と、北アルプス表銀座の明るい稜線景観が魅力です",
    "大天井岳": "見どころ: 表銀座の中核ピークらしい広い山頂と、槍ヶ岳から常念岳方面まで続く大稜線の眺めが魅力です",
    "餓鬼岳": "見どころ: 静かな樹林帯を抜けた先で突然開ける北アルプスの稜線と、唐沢岳方面への展望が魅力です",
    "岩菅山": "見どころ: 志賀高原の湿原と稜線歩きが楽しめ、山頂からは裏岩菅山や北アルプス方面の展望が広がります",
    "御座山": "見どころ: 岩峰的な山頂と八ヶ岳・秩父方面への展望が魅力で、長者の森からの歩きごたえも楽しめます",
    "小秀山": "見どころ: 乙女渓谷の滝めぐりと岩場を越える変化の多い登路、御嶽山や中央アルプスの展望が魅力です",
    "鳥甲山": "見どころ: カミソリ岩を含む鋭い岩稜と、秋山郷の奥深さを感じる上級向けの稜線歩きが魅力です",
    "鋸岳": "見どころ: 甲斐駒ヶ岳の南に連なる荒々しい岩稜と、破線ルートならではの緊張感ある稜線歩きが魅力です",
    "農鳥岳": "見どころ: 白峰三山の南端らしい大きな山容と、間ノ岳・北岳へ連なる高所縦走の開放感が魅力です",
    "霞沢岳": "見どころ: 徳本峠を越えて現れる穂高連峰の大展望と、静かな樹林帯から高山帯へ移る変化が魅力です",
    "安平路山": "見どころ: 摺古木山から先に続く長大で静かな稜線と、中央アルプス南端らしい奥深さが魅力です",
    "南駒ヶ岳": "見どころ: 越百山方面へ広がる中央アルプスの重厚な稜線と、今朝沢の原生的な谷の雰囲気が魅力です",
    "有明山": "見どころ: 信仰の山らしい急登と岩場の変化に富んだ登路、安曇野を見下ろす独立峰の展望が魅力です",
    "赤牛岳": "見どころ: 裏銀座最深部らしい圧倒的な静けさと、黒部源流を見下ろす大きな山容、薬師岳や立山方面の大展望が魅力です",
    "伊吹山": "見どころ: 高山植物が豊富な草原状の山頂部と、琵琶湖や鈴鹿方面を見渡す大展望が魅力です",
    "大台ヶ原山": "見どころ: 日出ヶ岳の大展望や大蛇嵓の断崖、原生林と立ち枯れが混在する独特の景観が魅力です",
    "大峰山": "見どころ: 八経ヶ岳を中心に大峰主稜線の奥深さを感じられ、行者道の雰囲気も色濃く残るのが魅力です",
    "御在所岳": "見どころ: 奇岩の多い鈴鹿らしい景観と、ロープウェイ山頂公園周辺からの展望が魅力です",
    "釈迦ヶ岳": "見どころ: 深仙ノ宿を越えて開ける大峰主稜線の眺めと、修験道の山域らしい静けさが魅力です",
    "伯母子岳": "見どころ: 小辺路に接する穏やかな稜線歩きと、熊野古道の歴史を感じる山旅らしさが魅力です",
    "金剛山": "見どころ: 関西を代表する親しまれた山で、四季の自然と気軽に楽しめる豊富な登山道が魅力です",
    "武奈ヶ岳": "見どころ: 比良山地最高峰らしい開放的な山頂と、御殿山から続く草原状の尾根景観が魅力です",
    "氷ノ山": "見どころ: ブナ林と広い尾根歩きが心地よく、関西を代表する高原的な山容を味わえるのが魅力です",
    "大山": "見どころ: 伯耆富士と呼ばれる端正な山容と、六合目から弥山へ続く木道・階段の展望が魅力です",
    "剣山": "見どころ: 山頂台地の穏やかな笹原と、次郎笈へ続く四国らしい開放的な稜線が魅力です",
    "石鎚山": "見どころ: 西日本最高峰らしい迫力と、鎖場を越えて立つ天狗岳の鋭い岩峰景観が魅力です",
    "上蒜山": "見どころ: 蒜山三座をつなぐ明るい笹原の稜線と、大山まで望む爽快な展望が魅力です",
    "三瓶山": "見どころ: 火口原を囲む外輪山歩きと、草原状の山腹や男三瓶山からの広がる景観が魅力です",
    "三嶺": "見どころ: 山頂直下に広がる池と笹原、剣山系へ続く四国山地の大展望が魅力です",
    "東赤石山": "見どころ: かんらん岩の荒々しい岩場と、高山植物、赤石山系らしい鋭い山容が魅力です",
    "笹ヶ峰": "見どころ: 穏やかな笹原の山頂部と、寒風山や石鎚山系を見渡すゆったりした展望が魅力です",
    "九重山": "見どころ: 久住分かれを中心に広がる火山群の景観と、草原・噴気地帯・池塘が混ざる変化の豊かさが魅力です",
    "祖母山": "見どころ: 深い森を抜けて立つ祖母傾山系の主峰らしい落ち着いた山頂と、九州山地の大展望が魅力です",
    "阿蘇山": "見どころ: 世界有数のカルデラ地形と、火口周辺の荒々しい火山景観が魅力です",
    "霧島山": "見どころ: 火口湖や噴気地帯が点在する火山群の景観と、韓国岳からのダイナミックな展望が魅力です",
    "開聞岳": "見どころ: 薩摩富士と呼ばれる美しい円錐形の山容と、海を見下ろす一筆書きの登山道が魅力です",
    "宮之浦岳": "見どころ: 屋久島の巨岩と苔、洋上アルプスらしい稜線景観と原生自然の深さが魅力です",
    "英彦山": "見どころ: 修験道の霊山らしい社寺と石段、ブナ林を抜けて山頂へ向かう歴史ある登路が魅力です",
    "由布岳": "見どころ: 双耳峰の美しい山容と、正面登山口から由布院の町並みを見下ろす展望が魅力です",
    "大崩山": "見どころ: 九州屈指の岩峰群と谷の深さ、梯子や鎖場を越えて進む変化の大きさが魅力です",
    "雲仙岳": "見どころ: 平成新山を望む火山景観と、普賢岳・国見岳をつなぐ岩峰的な周回が魅力です",
    "市房山": "見どころ: 市房杉の巨木林と、九州脊梁を見渡す落ち着いた山頂展望が魅力です",
    "尾鈴山": "見どころ: 白滝などの名瀑と原生林、静かな尾根歩きを組み合わせて楽しめるのが魅力です",
    "高千穂峰": "見どころ: 天孫降臨神話の舞台らしい霊峰の雰囲気と、御鉢越しの火山景観が魅力です",
    "桜島": "見どころ: 鹿児島湾に突き出す巨大火山の迫力と、展望所から間近に見る溶岩地形が魅力です",
    "利尻岳": "見どころ: 海に浮かぶ独立峰らしい端正な円錐形と、山頂からの360度の海景色が魅力です",
    "羅臼岳": "見どころ: 知床連山の主峰らしい荒々しい火山景観と、オホーツク海を望む展望が魅力です",
    "斜里岳": "見どころ: 沢沿いの滝をたどる旧道と、頂上からの知床・大雪方面の大展望が魅力です",
    "阿寒岳": "見どころ: 火口や噴気を間近に感じる火山景観と、阿寒湖を望む展望が魅力です",
    "大雪山": "見どころ: 北海道の屋根らしい広大な高山帯と、お鉢平を中心としたスケールの大きな景観が魅力です",
    "トムラウシ山": "見どころ: 原始性の強い湿原と巨岩、高山植物が連続する北海道らしい雄大な山旅が魅力です",
    "十勝岳": "見どころ: 荒々しい火山地形と、望岳台から続く開放的な稜線、十勝連峰の大展望が魅力です",
    "幌尻岳": "見どころ: 日高山脈の最高峰らしい深い山域と、渡渉を越えて到達する山頂の達成感が魅力です",
    "後方羊蹄山": "見どころ: 蝦夷富士と呼ばれる美しい独立峰の山容と、山頂火口を巡る大展望が魅力です",
    "天塩岳": "見どころ: 前天塩から本峰へ続く開放的な尾根歩きと、道北らしい広がりのある展望が魅力です",
    "石狩岳": "見どころ: シュナイダーコースの急登を越えて現れる東大雪の大展望と、奥深い山域感が魅力です",
    "ニペソツ山": "見どころ: 東大雪を代表する鋭い山容と、山頂からの石狩連峰・大雪山系の大展望が魅力です",
    "ｶﾑｲｴｸｳﾁｶｳｼ山": "見どころ: 日高山脈らしい険しい岩稜と八ノ沢カールの荒々しい景観、秘境感が魅力です",
    "ペテガリ岳": "見どころ: 日高山脈南部の奥深さを象徴する長大ルートと、人を寄せ付けない静かな山域が魅力です",
    "芦別岳": "見どころ: 切り立った岩峰の山容と、旧道から望む富良野盆地や夕張山地の展望が魅力です",
    "夕張岳": "見どころ: 高山植物の宝庫として知られ、広い稜線上で花を楽しめるのが魅力です",
    "暑寒別岳": "見どころ: 日本海側の展望と豊かな高山植物、暑寒別連峰の主峰らしいおだやかな稜線が魅力です",
    "樽前山": "見どころ: 溶岩ドームを抱く三重式火山の独特な地形と、支笏湖を見下ろす展望が魅力です",
    "北海道駒ヶ岳": "見どころ: 大火口を囲む外輪山と馬ノ背から眺める噴火地形、内浦湾の展望が魅力です",
    "岩木山": "見どころ: 津軽富士と呼ばれる端正な山容と、山頂から望む津軽平野や日本海の展望が魅力です",
    "八甲田山": "見どころ: 毛無岱の湿原景観と大岳火口壁、四季を通じて表情が変わる山域の広がりが魅力です",
    "八幡平": "見どころ: 池塘と湿原が点在するなだらかな高原台地と、散策しやすい木道景観が魅力です",
    "岩手山": "見どころ: 南部片富士と呼ばれる美しい裾野と、火口を抱く山頂部のスケール感が魅力です",
    "早池峰山": "見どころ: 蛇紋岩帯特有の高山植物と、岩稜と草原が交じる独特の山上景観が魅力です",
    "鳥海山": "見どころ: 海に迫る独立峰らしい大きな山容と、雪渓・外輪山・火口地形の変化が魅力です",
    "月山": "見どころ: 信仰の山らしい穏やかな山頂部と、高層湿原や高山植物の豊かさが魅力です",
    "蔵王山": "見どころ: 御釜を中心とした火口湖景観と、気軽に高山帯へ入れる開放感が魅力です",
    "吾妻山": "見どころ: 湿原と池塘が点在する高層火山群の山上景観と、静かな森歩きが魅力です",
    "安達太良山": "見どころ: 乳首山の愛称で親しまれる山頂の岩峰と、沼ノ平火口の荒々しい景観が魅力です",
    "磐梯山": "見どころ: 会津の名峰らしい堂々とした山容と、猪苗代湖や裏磐梯を見渡す展望が魅力です",
    "会津駒ヶ岳": "見どころ: 山頂部の池塘と木道が続くおだやかな高層湿原景観が魅力です",
    "那須岳": "見どころ: 茶臼岳火口周辺の荒々しい火山景観と、朝日岳へ続く稜線の展望が魅力です",
    "燧ヶ岳": "見どころ: 尾瀬を見下ろす双耳峰の山容と、湿原から一気に高山へ抜ける変化が魅力です",
    "白神岳": "見どころ: 世界自然遺産白神山地の深いブナ林と、日本海を見下ろす山頂展望が魅力です",
    "姫神山": "見どころ: 独立峰らしい端正な山容と、短時間で得られる岩手山方面の展望が魅力です",
    "秋田駒ヶ岳": "見どころ: ムーミン谷周辺の高山植物と、火口湖やカルデラ地形の美しさが魅力です",
    "和賀岳": "見どころ: ブナ林から大展望の稜線へ抜ける変化と、東北らしい奥深い山域感が魅力です",
    "森吉山": "見どころ: 花の百名山らしい高山植物と、おだやかな山頂部の湿原景観が魅力です",
    "焼石岳": "見どころ: 花の時期に広がる湿原と池塘、東北らしいやわらかな稜線景観が魅力です",
    "栗駒山": "見どころ: 神の絨毯と呼ばれる紅葉と、中央火口丘を抱く火山景観が魅力です",
    "神室山": "見どころ: 東北のマッターホルンとも呼ばれる鋭い山容と、痩せ尾根の緊張感が魅力です",
    "船形山": "見どころ: ブナ林とおだやかな稜線歩き、山頂からの蔵王・朝日方面の展望が魅力です",
    "以東岳": "見どころ: 朝日連峰南端の大きな山容と、広い稜線から眺める奥深い連峰景観が魅力です",
    "帝釈山": "見どころ: 田代山湿原と組み合わせて楽しめる穏やかな稜線歩きが魅力です",
    "会津朝日岳": "見どころ: 会津の深い山並みを見渡す岩稜の山頂と、急登を越えた先の達成感が魅力です",
    "筑波山": "見どころ: 奇岩怪石と信仰の山らしい社寺、関東平野を一望する展望が魅力です",
    "至仏山": "見どころ: 尾瀬ヶ原を見下ろす蛇紋岩の稜線と、高山植物の宝庫としての景観が魅力です",
    "武尊山": "見どころ: 剣ヶ峰山や家ノ串山へ広がる稜線と、上州武尊らしい力強い山容が魅力です",
    "赤城山": "見どころ: 大沼を囲む外輪山景観と、黒檜山・駒ヶ岳からの関東平野の展望が魅力です",
    "男体山": "見どころ: 中禅寺湖を見下ろす独立峰らしい迫力と、信仰の山としての雰囲気が魅力です",
    "日光白根山": "見どころ: 火口湖や高山植物、山頂からの奥日光・尾瀬方面の大展望が魅力です",
    "皇海山": "見どころ: 庚申山を絡めた長大な山旅と、深い山域に立つ百名山らしい達成感が魅力です",
    "草津白根山": "見どころ: 火山地形と草津温泉周辺の高原景観、本白根山側の明るい稜線が魅力です",
    "四阿山": "見どころ: 菅平から広がる牧歌的な山麓景観と、山頂からの北アルプス・浅間山方面の展望が魅力です",
    "両神山": "見どころ: 岩稜と鎖場が織りなす秩父らしい変化と、山頂からの奥秩父の展望が魅力です",
    "雲取山": "見どころ: 東京都最高峰らしい長い尾根歩きと、石尾根から続く奥多摩の深い山並みが魅力です",
    "丹沢": "見どころ: 塔ノ岳周辺の広い展望と、富士山を正面に望む丹沢主稜のスケール感が魅力です",
    "女峰山": "見どころ: 日光連山らしい鋭い山容と、赤薙山から続く長い稜線歩きが魅力です",
    "仙ノ倉山": "見どころ: 平標山から続く花の稜線と、谷川連峰の開放的な高山景観が魅力です",
    "榛名山": "見どころ: 榛名湖を囲む外輪山歩きと、榛名富士や掃部ヶ岳からの穏やかな展望が魅力です",
    "浅間隠山": "見どころ: 浅間山を正面に望むわかりやすい展望と、短時間で登れる親しみやすさが魅力です",
    "妙義山": "見どころ: 奇岩・石門・鎖場が連続する独特の岩峰景観と、群馬を代表する岩山の迫力が魅力です",
    "荒船山": "見どころ: 艫岩の大絶壁と卓状台地の独特な地形美が魅力です",
    "武甲山": "見どころ: 秩父を象徴する山容と、山頂からの秩父盆地や奥秩父方面の展望が魅力です",
    "白石山": "見どころ: 奥秩父らしい深い森と静けさ、長いアプローチの先に味わえる深山感が魅力です",
    "大岳山": "見どころ: 奥多摩らしい岩場と滝、御岳山周辺の信仰文化をあわせて楽しめるのが魅力です",
    "白砂山": "見どころ: 野反湖から続く静かな稜線歩きと、高山植物が彩る上信国境の景観が魅力です",
    "朝日連峰": "見どころ: 広大な稜線に広がる高山植物と、東北の主峰らしいゆったりした山容が魅力です",
    "飯豊連峰": "見どころ: 花の百名山として知られる大きな稜線と、どこまでも続く縦走景観が魅力です",
    "越後駒ヶ岳": "見どころ: 越後三山らしい雄大な山容と、枝折峠から続く開放的な尾根歩きが魅力です",
    "平ヶ岳": "見どころ: 池塘が点在する山頂台地と、たまご石をはじめとする独特の地形が魅力です",
    "巻機山": "見どころ: 草原状の山頂部と池塘が美しく、越後の山々を見渡す爽快な稜線が魅力です",
    "谷川岳": "見どころ: 切れ落ちた岩壁と肩の小屋周辺の稜線景観が印象的で、上越国境の迫力ある展望が魅力です",
    "苗場山": "見どころ: 山頂一帯に広がる高層湿原と池塘群が美しく、独特の台地状地形が魅力です",
    "雨飾山": "見どころ: 荒々しい岩峰と笹原が織りなす山容、山頂からの火打・焼山方面の展望が魅力です",
    "妙高山": "見どころ: 火山らしい大きな山体と外輪山の景観、北信五岳を一望する山頂展望が魅力です",
    "火打山": "見どころ: 天狗の庭や高谷池周辺の湿原景観と、なだらかな山頂稜線が魅力です",
    "高妻山": "見どころ: 戸隠連峰最奥の鋭いピークを目指すアップダウンの多い縦走感が魅力です",
    "浅間山": "見どころ: 活火山らしいダイナミックな山容と、外輪山から眺める火口地形の迫力が魅力です",
    "甲武信岳": "見どころ: 千曲川・笛吹川・荒川の源流域を感じる深い森と、奥秩父らしい静かな山頂が魅力です",
    "金峰山": "見どころ: 五丈岩をシンボルにした花崗岩の山頂景観と、八ヶ岳や富士山の展望が魅力です",
    "瑞牆山": "見どころ: 巨岩奇岩が林立する独特の岩峰景観と、岩場を縫う変化のある登路が魅力です",
    "大菩薩嶺": "見どころ: 雷岩から大菩薩峠にかけての開放的な稜線と、富士山を望む展望が魅力です",
    "富士山": "見どころ: 日本最高峰ならではのスケール感と、山頂火口を巡るお鉢巡りの迫力が魅力です",
    "天城山": "見どころ: ブナやシャクナゲの森に包まれた周回路と、伊豆半島らしい穏やかな山歩きが魅力です",
    "白馬岳": "見どころ: 大雪渓と高山植物の宝庫として知られ、後立山連峰の大展望が魅力です",
    "五竜岳": "見どころ: 鹿島槍を望む鋭い岩峰と、遠見尾根から続くダイナミックな稜線景観が魅力です",
    "鹿島槍ヶ岳": "見どころ: 双耳峰の美しい山容と、後立山主稜線を代表する雄大な展望が魅力です",
    "剱岳": "見どころ: 岩と雪の殿堂と呼ばれる鋭い山容と、立山連峰随一の迫力が魅力です",
    "立山": "見どころ: 室堂から手軽に高山帯へ入れ、雄山・大汝山からの立山連峰大展望が魅力です",
    "薬師岳": "見どころ: ゆったりした山容の奥に広がる北アルプス深部の眺めと、薬師平の開放感が魅力です",
    "黒部五郎岳": "見どころ: カールの曲線美と広い山頂部が印象的で、雲ノ平や槍穂方面の展望が魅力です",
    "水晶岳": "見どころ: 黒部源流のど真ん中に立つ孤高のピークで、360度の大展望が魅力です",
    "鷲羽岳": "見どころ: 黒部源流を見下ろす端正な山容と、ワリモ岳方面へ続く高所稜線が魅力です",
    "槍ヶ岳": "見どころ: 天を突く穂先の存在感と、北アルプスの中心に立つ象徴的な展望が魅力です",
    "穂高岳": "見どころ: 岩稜帯の連なりと涸沢カールを見下ろす高度感ある景観が魅力です",
    "常念岳": "見どころ: 槍・穂高を正面に望む稜線景観と、蝶ヶ岳方面への広がりある展望が魅力です",
    "笠ヶ岳": "見どころ: 笠新道の急登を越えた先に現れる独立峰らしい大きな山容と展望が魅力です",
    "焼岳": "見どころ: 北アルプス唯一の活火山らしい噴気地形と、上高地を見下ろす景観が魅力です",
    "乗鞍岳": "見どころ: 高所までバスで入れる親しみやすさと、火山地形が広がるおだやかな山頂部が魅力です",
    "美ヶ原": "見どころ: 広大な高原台地と牧歌的な景観、北アルプスから八ヶ岳までの大展望が魅力です",
    "霧ヶ峰": "見どころ: なだらかな草原と湿原、ニッコウキスゲの季節の景観が魅力です",
    "蓼科山": "見どころ: 円錐形の美しい山容と、岩が広がる山頂からの八ヶ岳・北アルプス展望が魅力です",
    "八ヶ岳": "見どころ: 赤岳を中心とした岩峰群と、森から岩稜へ移る変化に富んだ登山が魅力です",
    "御嶽山": "見どころ: 独立峰らしい大きな火山体と、外輪山や火口湖を含む壮大な景観が魅力です",
    "木曽駒ヶ岳": "見どころ: 千畳敷カールの氷河地形と、中央アルプス主稜線の明るい展望が魅力です",
    "空木岳": "見どころ: 駒石が立つ山頂景観と、中央アルプス南部へ続く重厚な稜線が魅力です",
    "恵那山": "見どころ: 深い森に包まれた山頂部と、中央アルプス最南端らしい落ち着いた山旅感が魅力です",
    "甲斐駒ヶ岳": "見どころ: 白い花崗岩に覆われた鋭い山容と、黒戸尾根を代表とする力強い登路が魅力です",
    "仙丈ヶ岳": "見どころ: 南アルプスの女王と呼ばれる優美な稜線と、カール地形の美しさが魅力です",
    "鳳凰山": "見どころ: オベリスクをシンボルにした稜線景観と、白砂が広がる独特の山上風景が魅力です",
    "北岳": "見どころ: 日本第2の高峰らしい迫力と、間ノ岳や富士山まで見渡す大展望が魅力です",
    "間ノ岳": "見どころ: 白峰三山の中央に立つ大きな山容と、南アルプス主稜線の奥深い展望が魅力です",
    "塩見岳": "見どころ: 南北に長い双耳峰の堂々とした山容と、南アルプス中心部の展望が魅力です",
    "悪沢岳": "見どころ: 荒川三山の盟主らしい巨大な山体と、赤石山脈深部のスケール感が魅力です",
    "赤石岳": "見どころ: 赤石山脈の名を冠する重厚な山容と、南アルプス南部の大きな起伏が魅力です",
    "聖岳": "見どころ: 前聖・奥聖へ連なる広い高山帯と、深南部まで見渡す静かな大展望が魅力です",
    "光岳": "見どころ: 光石の独特な巨岩と、南アルプス最南部らしい深く静かな山旅感が魅力です",
    "白山": "見どころ: 御前峰周辺のお池めぐりと高山植物、霊峰らしい広々とした山上景観が魅力です",
    "荒島岳": "見どころ: ブナ林を抜けて伸びる勝原尾根と、山頂からの白山・越前方面の展望が魅力です",
    "愛鷹山": "見どころ: 越前岳を中心に富士山と駿河湾方面を望む展望と、歩きやすい高原状の登路が魅力です",
    "位山": "見どころ: 飛騨の信仰と歴史が残る穏やかな森歩きと、山頂周辺のやわらかな展望が魅力です",
    "茅ヶ岳": "見どころ: 深田久弥ゆかりの山として知られ、富士山や南アルプスを望む展望が魅力です",
    "乾徳山": "見どころ: 森・草原・岩場と変化に富んだ登路と、山頂の360度展望が魅力です",
    "金剛堂山": "見どころ: ブナ林に包まれた静かな山歩きと、白山方面まで見渡す広い展望が魅力です",
    "経ヶ岳": "見どころ: 長い尾根歩きの先に開ける中央アルプス前衛の展望と、伊那谷を見下ろす景観が魅力です",
    "戸隠山": "見どころ: 戸隠連峰らしい緊張感ある岩稜歩きと、信仰の山ならではの雰囲気が魅力です",
    "御神楽岳": "見どころ: 会越国境らしい岩峰景観と、静かな山域に広がるブナ林の深さが魅力です",
    "御正体山": "見どころ: 道志山塊の静かな森歩きと、落ち着いた雰囲気の山頂が魅力です",
    "三ツ峠山": "見どころ: 富士山正面の展望と、屏風岩周辺の岩場や花の多い稜線景観が魅力です",
    "七面山": "見どころ: 敬慎院を経て登る信仰の道と、南アルプスや富士山を望む展望が魅力です",
    "守門岳": "見どころ: ブナ林と雪庇で知られ、残雪期から新緑、紅葉まで表情豊かな山域が魅力です",
    "大日ヶ岳": "見どころ: ブナ林を抜けて広がる穏やかな山頂部と、白山方面の展望が魅力です",
    "天狗岳": "見どころ: 八ヶ岳らしい岩稜と池の景観が近く、黒百合平から続く稜線歩きが魅力です",
    "能郷白山": "見どころ: 急登の先に広がる開放的な稜線と、白山周辺の山並みを見渡す景観が魅力です",
    "八海山": "見どころ: 八ツ峰の鋭い岩稜と、越後三山を望む迫力ある展望が魅力です",
    "飯縄山": "見どころ: 北信五岳を見渡す広い展望と、信仰の道らしい石仏をたどる登路が魅力です",
    "\u6b66\u7532\u5c71": "\u898b\u3069\u3053\u308d: \u79e9\u7236\u3092\u8c61\u5fb4\u3059\u308b\u5c71\u5bb9\u3068\u3001\u5c71\u9802\u304b\u3089\u306e\u79e9\u7236\u76c6\u5730\u306e\u5927\u5c55\u671b\u304c\u697d\u3057\u3081\u307e\u3059",
    "\u4e7e\u5fb3\u5c71": "\u898b\u3069\u3053\u308d: \u68ee\u6797\u3001\u8349\u539f\u3001\u5ca9\u5834\u3068\u5909\u5316\u306b\u5bcc\u3093\u3060\u30eb\u30fc\u30c8\u3068\u3001\u5c71\u9802\u306e360\u5ea6\u5c55\u671b\u304c\u9b45\u529b\u3067\u3059",
    "\u8305\u30f6\u5cb3": "\u898b\u3069\u3053\u308d: \u6df1\u7530\u4e45\u5f25\u7d42\u7109\u306e\u5730\u3068\u3057\u3066\u77e5\u3089\u308c\u3001\u5bcc\u58eb\u5c71\u3084\u5357\u30fb\u5317\u30a2\u30eb\u30d7\u30b9\u306e\u5c55\u671b\u304c\u5e83\u304c\u308a\u307e\u3059",
    "\u5999\u7fa9\u5c71": "\u898b\u3069\u3053\u308d: \u77f3\u9580\u7fa4\u3084\u5947\u5ca9\u5947\u77f3\u306e\u9020\u5f62\u7f8e\u304c\u969b\u7acb\u3061\u3001\u65b0\u7dd1\u3068\u7d05\u8449\u306e\u6642\u671f\u306f\u7279\u306b\u5370\u8c61\u7684\u3067\u3059"
  };
  const PREFECTURE_TO_REGION = {
    "\u5317\u6d77\u9053": "\u5317\u6d77\u9053",
    "\u9752\u68ee\u770c": "\u6771\u5317",
    "\u5ca9\u624b\u770c": "\u6771\u5317",
    "\u5bae\u57ce\u770c": "\u6771\u5317",
    "\u79cb\u7530\u770c": "\u6771\u5317",
    "\u5c71\u5f62\u770c": "\u6771\u5317",
    "\u798f\u5cf6\u770c": "\u6771\u5317",
    "\u8328\u57ce\u770c": "\u95a2\u6771",
    "\u6803\u6728\u770c": "\u95a2\u6771",
    "\u7fa4\u99ac\u770c": "\u95a2\u6771",
    "\u57fc\u7389\u770c": "\u95a2\u6771",
    "\u5343\u8449\u770c": "\u95a2\u6771",
    "\u6771\u4eac\u90fd": "\u95a2\u6771",
    "\u795e\u5948\u5ddd\u770c": "\u95a2\u6771",
    "\u65b0\u6f5f\u770c": "\u4e2d\u90e8",
    "\u5bcc\u5c71\u770c": "\u4e2d\u90e8",
    "\u77f3\u5ddd\u770c": "\u4e2d\u90e8",
    "\u798f\u4e95\u770c": "\u4e2d\u90e8",
    "\u5c71\u68a8\u770c": "\u4e2d\u90e8",
    "\u9577\u91ce\u770c": "\u4e2d\u90e8",
    "\u5c90\u961c\u770c": "\u4e2d\u90e8",
    "\u9759\u5ca1\u770c": "\u4e2d\u90e8",
    "\u611b\u77e5\u770c": "\u4e2d\u90e8",
    "\u4e09\u91cd\u770c": "\u8fd1\u757f",
    "\u6ecb\u8cc0\u770c": "\u8fd1\u757f",
    "\u4eac\u90fd\u5e9c": "\u8fd1\u757f",
    "\u5927\u962a\u5e9c": "\u8fd1\u757f",
    "\u5175\u5eab\u770c": "\u8fd1\u757f",
    "\u5948\u826f\u770c": "\u8fd1\u757f",
    "\u548c\u6b4c\u5c71\u770c": "\u8fd1\u757f",
    "\u9ce5\u53d6\u770c": "\u4e2d\u56fd",
    "\u5cf6\u6839\u770c": "\u4e2d\u56fd",
    "\u5ca1\u5c71\u770c": "\u4e2d\u56fd",
    "\u5e83\u5cf6\u770c": "\u4e2d\u56fd",
    "\u5c71\u53e3\u770c": "\u4e2d\u56fd",
    "\u5fb3\u5cf6\u770c": "\u56db\u56fd",
    "\u9999\u5ddd\u770c": "\u56db\u56fd",
    "\u611b\u5a9b\u770c": "\u56db\u56fd",
    "\u9ad8\u77e5\u770c": "\u56db\u56fd",
    "\u798f\u5ca1\u770c": "\u4e5d\u5dde",
    "\u4f50\u8cc0\u770c": "\u4e5d\u5dde",
    "\u9577\u5d0e\u770c": "\u4e5d\u5dde",
    "\u718a\u672c\u770c": "\u4e5d\u5dde",
    "\u5927\u5206\u770c": "\u4e5d\u5dde",
    "\u5bae\u5d0e\u770c": "\u4e5d\u5dde",
    "\u9e7f\u5150\u5cf6\u770c": "\u4e5d\u5dde",
    "\u6c96\u7e04\u770c": "\u4e5d\u5dde"
  };
  const PREFECTURE_ROOTS = Object.keys(PREFECTURE_TO_REGION).map((prefecture) => stripPrefectureSuffix(prefecture));

  const MOUNTAINS = [...(window.MOUNTAINS_DATA || []), ...(window.MOUNTAINS_200_DATA || [])].map(normalizeMountain);
  const MAX_REFERENCE_STAMINA = MOUNTAINS.reduce((max, mountain) => {
    return Number.isFinite(mountain.staminaScore) ? Math.max(max, mountain.staminaScore) : max;
  }, 0);
  const state = {
    location: null,
    favorites: loadFavorites(),
    activeTabs: new Map(),
    weatherCache: new Map(),
    selectedCourses: new Map(),
    jmaForecasts: new Map(),
    jmaAreaTimeseries: new Map(),
    jmaWarnings: new Map(),
    jmaVolcanoLevels: new Map(),
    jmaVolcanoLoaded: false,
    bearReports: [],
    bearReportsLoaded: false
  };
  const els = {};

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  function init() {
    bindElements();
    bindEvents();
    hydrateUi();
    registerServiceWorker();
    renderRecommendations();
    prefetchJmaForecasts().then(() => {
      renderRecommendations();
    });
  }

  function bindElements() {
    els.tripDateTime = document.getElementById("tripDateTime");
    els.experienceLevel = document.getElementById("experienceLevel");
    els.radiusKm = document.getElementById("radiusKm");
    els.regionFilter = document.getElementById("regionFilter");
    els.keywordInput = document.getElementById("keywordInput");
    els.manualLat = document.getElementById("manualLat");
    els.manualLon = document.getElementById("manualLon");
    els.locateButton = document.getElementById("locateButton");
    els.manualLocationButton = document.getElementById("manualLocationButton");
    els.resetButton = document.getElementById("resetButton");
    els.locationStatus = document.getElementById("locationStatus");
    els.resultsTitle = document.getElementById("resultsTitle");
    els.resultsMeta = document.getElementById("resultsMeta");
    els.resultsGrid = document.getElementById("resultsGrid");
    els.cardTemplate = document.getElementById("mountainCardTemplate");
    els.dataUpdatedAt = document.getElementById("dataUpdatedAt");
  }

  function bindEvents() {
    document.querySelectorAll("[data-quick-date]").forEach((button) => {
      button.addEventListener("click", () => {
        applyQuickDate(button.dataset.quickDate);
        renderRecommendations();
      });
    });

    [els.tripDateTime, els.experienceLevel, els.radiusKm, els.regionFilter].forEach((element) => {
      element.addEventListener("change", renderRecommendations);
    });

    els.keywordInput.addEventListener("input", debounce(renderRecommendations, 150));
    els.manualLat.addEventListener("change", applyManualLocationSilently);
    els.manualLon.addEventListener("change", applyManualLocationSilently);
    els.locateButton.addEventListener("click", acquireLocation);
    els.manualLocationButton.addEventListener("click", applyManualLocation);
    els.resetButton.addEventListener("click", resetFilters);
  }

  function hydrateUi() {
    if (!els.tripDateTime.value) {
      applyQuickDate("today");
    }
    if (window.MOUNTAINS_DATA_UPDATED_AT || window.MOUNTAINS_200_DATA_UPDATED_AT) {
      const labels = [window.MOUNTAINS_DATA_UPDATED_AT, window.MOUNTAINS_200_DATA_UPDATED_AT].filter(Boolean);
      els.dataUpdatedAt.textContent =
        "\u30c7\u30fc\u30bf\u53d6\u5f97\u65e5\u6642: " + labels.join(" / ");
    }
    updateLocationStatus();
  }

  function applyQuickDate(mode) {
    const now = new Date();
    const target = new Date(now);

    if (mode === "today") {
      target.setHours(Math.max(now.getHours() + 1, 6), 0, 0, 0);
    } else if (mode === "tomorrow") {
      target.setDate(target.getDate() + 1);
      target.setHours(6, 0, 0, 0);
    } else if (mode === "weekend") {
      const untilSaturday = target.getDay() === 6 ? 0 : (6 - target.getDay() + 7) % 7;
      target.setDate(target.getDate() + untilSaturday);
      target.setHours(6, 0, 0, 0);
    }

    els.tripDateTime.value = toLocalInputValue(target);
  }

  function resetFilters() {
    applyQuickDate("today");
    els.experienceLevel.value = "intermediate";
    els.radiusKm.value = "100";
    els.regionFilter.value = "all";
    els.keywordInput.value = "";
    els.manualLat.value = "";
    els.manualLon.value = "";
    state.location = null;
    updateLocationStatus();
    renderRecommendations();
  }

  function acquireLocation() {
    if (!navigator.geolocation) {
      els.locationStatus.textContent =
        "\u3053\u306e\u7aef\u672b\u3067\u306f\u4f4d\u7f6e\u60c5\u5831\u304c\u4f7f\u3048\u307e\u305b\u3093\u3002";
      return;
    }

    els.locationStatus.textContent =
      "\u73fe\u5728\u5730\u3092\u53d6\u5f97\u3057\u3066\u3044\u307e\u3059\u2026";

    navigator.geolocation.getCurrentPosition(
      (position) => {
        state.location = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          source: "gps"
        };
        els.manualLat.value = position.coords.latitude.toFixed(4);
        els.manualLon.value = position.coords.longitude.toFixed(4);
        updateLocationStatus();
        renderRecommendations();
      },
      () => {
        els.locationStatus.textContent =
          "\u4f4d\u7f6e\u60c5\u5831\u306e\u53d6\u5f97\u304c\u3067\u304d\u307e\u305b\u3093\u3067\u3057\u305f\u3002";
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 300000 }
    );
  }

  function applyManualLocationSilently() {
    const lat = Number(els.manualLat.value);
    const lon = Number(els.manualLon.value);
    if (Number.isFinite(lat) && Number.isFinite(lon)) {
      state.location = { lat, lon, source: "manual" };
      updateLocationStatus();
      renderRecommendations();
    }
  }

  function applyManualLocation() {
    const lat = Number(els.manualLat.value);
    const lon = Number(els.manualLon.value);
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
      els.locationStatus.textContent =
        "\u7def\u5ea6\u3068\u7d4c\u5ea6\u3092\u6b63\u3057\u304f\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044\u3002";
      return;
    }
    state.location = { lat, lon, source: "manual" };
    updateLocationStatus();
    renderRecommendations();
  }

  function updateLocationStatus() {
    if (!state.location) {
      els.locationStatus.textContent =
        "\u4f4d\u7f6e\u60c5\u5831\u306f\u307e\u3060\u53d6\u5f97\u3057\u3066\u3044\u307e\u305b\u3093\u3002";
      return;
    }
    const label = state.location.source === "gps" ? "\u73fe\u5728\u5730" : "\u624b\u52d5\u5165\u529b";
    els.locationStatus.textContent =
      label + ": " + state.location.lat.toFixed(4) + ", " + state.location.lon.toFixed(4);
  }

  function renderRecommendations() {
    const filters = getFilters();
    const allMatches = MOUNTAINS.filter((mountain) => {
      return matchesKeyword(mountain, filters.keyword) &&
        matchesLevel(mountain, filters.levelRank) &&
        matchesRegion(mountain, filters.region);
    }).map((mountain) => decorateMountain(mountain, filters));

    let visible = allMatches;
    let usedRadius = false;
    if (filters.hasLocation) {
      const withinRadius = allMatches.filter((item) => item.distanceKm !== null && item.distanceKm <= filters.radiusKm);
      if (withinRadius.length) {
        visible = withinRadius;
        usedRadius = true;
      }
    }

    visible.sort((a, b) => compareResults(a, b, filters.hasLocation));
    updateResultsHeader(filters, visible, allMatches.length, usedRadius);
    renderCards(visible, filters);
  }

  function getFilters() {
    const selectedDate = getSelectedDate();
    return {
      selectedDate,
      selectedMonth: selectedDate.getMonth() + 1,
      selectedDateLabel: formatDateTime(selectedDate),
      level: els.experienceLevel.value,
      levelRank: getLevelRank(els.experienceLevel.value),
      region: els.regionFilter.value,
      radiusKm: Number(els.radiusKm.value || 100),
      keyword: (els.keywordInput.value || "").trim(),
      hasLocation: Boolean(state.location),
      location: state.location
    };
  }

  function getSelectedDate() {
    const parsed = els.tripDateTime.value ? new Date(els.tripDateTime.value) : new Date();
    return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
  }

  function decorateMountain(mountain, filters) {
    const distanceKm = filters.hasLocation
      ? haversineKm(filters.location.lat, filters.location.lon, mountain.lat, mountain.lon)
      : null;
    const seasonFit = isSeasonFit(mountain, filters.selectedMonth);
    const snowRisk = hasSnowRisk(mountain, filters.selectedMonth);
    const areaForecast = getAreaForecastSummary(mountain, filters.selectedDate);
    const weatherPenalty = getWeatherRiskPenalty(areaForecast && areaForecast.target);
    const volcanoAdjustment = getVolcanoScoreAdjustment(mountain);
    const distanceScore = distanceKm === null ? 0 : Math.max(0, 24 - Math.min(distanceKm, 240) / 10);
    const seasonScore = seasonFit ? 28 : -8;
    const levelScore = 24;
    const riskPenalty = snowRisk ? 8 : 0;
    const rawScore = 50 + distanceScore + seasonScore + levelScore - riskPenalty - weatherPenalty - volcanoAdjustment.penalty;
    const score = volcanoAdjustment.forceZero ? 0 : Math.max(0, Math.round(rawScore));

    return { mountain, distanceKm, seasonFit, snowRisk, score };
  }

  function compareResults(a, b, hasLocation) {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    if (hasLocation && a.distanceKm !== null && b.distanceKm !== null) {
      const diff = a.distanceKm - b.distanceKm;
      if (Math.abs(diff) > 0.05) {
        return diff;
      }
    }
    return a.mountain.order - b.mountain.order;
  }

  function updateResultsHeader(filters, visible, totalMatches, usedRadius) {
    els.resultsTitle.textContent =
      filters.selectedMonth + "\u6708" + "\u306e\u304a\u3059\u3059\u3081\u306e\u5c71";

    if (!visible.length) {
      els.resultsMeta.textContent =
        filters.selectedDateLabel + " / " +
        getLevelSummaryText(filters.level, true) +
        "\u3067\u8a72\u5f53\u3059\u308b\u5c71\u304c\u3042\u308a\u307e\u305b\u3093\u3002";
      return;
    }

    if (filters.hasLocation && usedRadius) {
      els.resultsMeta.textContent =
        filters.selectedDateLabel + " / " +
        filters.radiusKm + "km\u4ee5\u5185 / " +
        visible.length + "\u5ea7\u3092\u8fd1\u3044\u9806\u3067\u8868\u793a\u3057\u3066\u3044\u307e\u3059\u3002";
      return;
    }

    if (filters.hasLocation) {
      els.resultsMeta.textContent =
        filters.selectedDateLabel + " / " +
        filters.radiusKm + "km\u4ee5\u5185\u306b\u8a72\u5f53\u304c\u306a\u3044\u305f\u3081\u3001" +
        totalMatches + "\u5ea7\u3092\u8ddd\u96e2\u512a\u5148\u3067\u8868\u793a\u3057\u3066\u3044\u307e\u3059\u3002";
      return;
    }

    els.resultsMeta.textContent =
      filters.selectedDateLabel + " / " +
      getLevelSummaryText(filters.level, false) +
      visible.length + "\u5ea7\u3092\u81ea\u52d5\u3067\u8868\u793a\u3057\u3066\u3044\u307e\u3059\u3002";
  }

  function renderCards(results, filters) {
    els.resultsGrid.innerHTML = "";
    results.forEach((result, index) => {
      const card = els.cardTemplate.content.firstElementChild.cloneNode(true);
      const mountain = getDisplayMountain(result.mountain);
      const activeTab = state.activeTabs.get(mountain.id) || "weather";

      card.querySelector(".mountain-region").textContent = [mountain.prefecture, mountain.region].filter(Boolean).join(" / ");
      card.querySelector(".mountain-name").textContent = mountain.name;
      card.querySelector(".mountain-catch").textContent = buildCatchCopy(mountain, result, filters);
      card.querySelector(".score-pill").textContent = "\u63a8\u5968\u30b9\u30b3\u30a2 " + result.score;
      card.querySelector(".season-pill").textContent = getSeasonPillText(mountain, result.seasonFit);
      card.querySelector(".distance-pill").textContent = result.distanceKm === null
        ? "\u8ddd\u96e2\u672a\u8a08\u7b97"
        : "\u73fe\u5728\u5730\u304b\u3089 " + formatDistance(result.distanceKm);

      const statsGrid = card.querySelector(".stats-grid");
      const routeOptions = getRouteOptions(mountain);
      if (routeOptions.length > 1) {
        const switcher = document.createElement("div");
        switcher.className = "course-switcher";
        switcher.innerHTML =
          '<label><span>\u30b3\u30fc\u30b9\u9078\u629e</span><select class="course-select"></select></label>';
        const select = switcher.querySelector(".course-select");
        const selectedCourseName = state.selectedCourses.get(result.mountain.id) || "__default__";
        const hasDefaultInRoutes = routeOptions.some((route) => route.courseName === result.mountain.modelCourse);
        if (!hasDefaultInRoutes) {
          const defaultOption = document.createElement("option");
          defaultOption.value = "__default__";
          defaultOption.textContent = result.mountain.modelCourse + "\uff08\u6a19\u6e96\uff09";
          defaultOption.selected = selectedCourseName === "__default__";
          select.appendChild(defaultOption);
        }
        routeOptions.forEach((route) => {
          const option = document.createElement("option");
          option.value = route.courseName;
          option.textContent = getRouteLabel(route, routeOptions);
          option.selected = route.courseName === selectedCourseName;
          select.appendChild(option);
        });
        select.addEventListener("change", () => {
          if (select.value === "__default__") {
            state.selectedCourses.delete(result.mountain.id);
          } else {
            state.selectedCourses.set(result.mountain.id, select.value);
          }
          renderRecommendations();
        });
        statsGrid.before(switcher);
      }
      const hasCourseTime = hasReliableCourseTime(mountain);
      const hasCourseDistance = hasReliableCourseDistance(mountain);
      const stats = [
        renderStatChip("\u767b\u5c71\u30ec\u30d9\u30eb", mountain.levelLabel),
        renderStatChip("\u6a19\u9ad8", mountain.elevationM + "m"),
        renderStatChip(
          hasCourseTime ? "\u30b3\u30fc\u30b9\u30bf\u30a4\u30e0" : "\u53c2\u8003\u65e5\u7a0b",
          mountain.courseTime || mountain.referenceItinerary || "\u672a\u53d6\u5f97"
        ),
        renderStatChip("\u7d2f\u7a4d\u6a19\u9ad8", formatCumulativeElevationLabel(mountain.cumulativeElevation)),
        renderStatChip(
          hasCourseDistance ? "\u30b3\u30fc\u30b9\u8ddd\u96e2" : (Number.isFinite(mountain.staminaScore) ? "\u4f53\u529b\u5ea6" : "\u30b3\u30fc\u30b9\u8ddd\u96e2"),
          hasCourseDistance ? mountain.courseDistance : (Number.isFinite(mountain.staminaScore) ? formatStaminaScore(mountain.staminaScore) : "\u4e0d\u660e")
        ),
        renderStatChip(
          "\u6a19\u6e96\u30b3\u30fc\u30b9",
          mountain.modelCourse || mountain.location || "\u672a\u53d6\u5f97"
        )
      ];
      statsGrid.innerHTML = stats.join("");

      const favoriteButton = card.querySelector(".favorite-btn");
      syncFavoriteButton(favoriteButton, mountain.id);
      favoriteButton.title = "\u767b\u3063\u305f\u5c71\u3084\u4fdd\u5b58\u3057\u305f\u3044\u5c71\u3092\u30c1\u30a7\u30c3\u30af";
      favoriteButton.setAttribute("aria-label", "\u767b\u3063\u305f\u5c71\u3084\u4fdd\u5b58\u3057\u305f\u3044\u5c71\u3092\u30c1\u30a7\u30c3\u30af");
      favoriteButton.addEventListener("click", () => {
        toggleFavorite(mountain.id);
        syncFavoriteButton(favoriteButton, mountain.id);
      });

      const switcher = card.querySelector(".info-switcher");
      const panel = card.querySelector(".info-panel");
      ["weather", "danger", "access"].forEach((tab) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "ghost-btn info-tab" + (tab === activeTab ? " active-tab" : "");
        button.textContent = getTabLabel(tab);
        button.addEventListener("click", () => {
          state.activeTabs.set(mountain.id, tab);
          renderRecommendations();
        });
        switcher.appendChild(button);
      });

      panel.innerHTML = renderInfoPanel(mountain, activeTab, filters.selectedDate);
      if (activeTab === "weather") {
        hydrateWeatherPanel(mountain, panel, filters.selectedDate);
      }
      els.resultsGrid.appendChild(card);
    });
  }

  function renderInfoPanel(mountain, tab, selectedDate) {
    if (tab === "danger") {
      const items = buildDangerBullets(mountain, selectedDate);
      return items.length
        ? "<strong>\u5371\u967a\u60c5\u5831</strong><ul class=\"check-list\">" +
            items.map((item) => "<li>" + escapeHtml(item) + "</li>").join("") +
            "</ul>"
        : "<strong>\u5371\u967a\u60c5\u5831</strong><br>\u73fe\u6642\u70b9\u3067\u5927\u304d\u306a\u8b66\u6212\u60c5\u5831\u306f\u5165\u3063\u3066\u3044\u307e\u305b\u3093\u3002";
    }
    if (tab === "access") {
      return renderAccessPanel(mountain);
    }
    const jma = mountain.weather || {};
    const areaForecast = getAreaForecastSummary(mountain, selectedDate);
    return (
      "<strong>\u5c71\u306e\u5929\u5019</strong><br>" +
      "\u5c71\u9802\u4ed8\u8fd1\u306e\u4e88\u6e2c\u3092\u8aad\u307f\u8fbc\u307f\u4e2d\u2026<br><br>" +
      renderAreaForecastHtml(areaForecast, jma, selectedDate, null)
    );
  }

  async function hydrateWeatherPanel(mountain, panel, selectedDate) {
    const weather = await fetchSummitWeather(mountain, selectedDate);
    if (!panel.isConnected) {
      return;
    }
    const jma = mountain.weather || {};
    const areaForecast = getAreaForecastSummary(mountain, selectedDate);
    if (!weather.available) {
      panel.innerHTML =
        "<strong>\u5c71\u306e\u5929\u5019</strong><br>" +
        "\u5c71\u9802\u4ed8\u8fd1\u306e\u5ea7\u6a19\u4e88\u6e2c\u304c\u53d6\u308c\u306a\u3044\u305f\u3081\u3001\u5e83\u57df\u306e\u6c17\u8c61\u5e81\u4e88\u5831\u3092\u8868\u793a\u3057\u3066\u3044\u307e\u3059\u3002<br><br>" +
        renderAreaForecastHtml(areaForecast, jma, selectedDate, weather);
      return;
    }

      panel.innerHTML =
        "<strong>\u5c71\u9802\u4ed8\u8fd1\u306e\u5ea7\u6a19\u4e88\u6e2c</strong><br>" +
        "\u5bfe\u8c61\u6642\u523b: " + escapeHtml(formatDateTime(new Date(weather.time))) +
      "<br>\u5929\u6c17: " + escapeHtml(describeWeatherCode(weather.weatherCode)) +
      "<br>\u6c17\u6e29: " + formatMaybeNumber(weather.temperature, "\u00b0C") +
      "<br>\u4e88\u60f3\u6700\u9ad8\u6c17\u6e29: " + formatDailyExtreme(weather.dayMaxTemperature, weather.dayMaxTime, "\u00b0C") +
      "<br>\u4e88\u60f3\u6700\u4f4e\u6c17\u6e29: " + formatDailyExtreme(weather.dayMinTemperature, weather.dayMinTime, "\u00b0C") +
      "<br>\u964d\u6c34\u78ba\u7387: " + formatMaybeNumber(weather.precipitationProbability, "%") +
        "<br>\u98a8\u901f: " + formatMaybeNumber(weather.windSpeed, "m/s") +
      "<br>\u98a8\u5411: " + escapeHtml(formatWindDirection(weather.windDirection)) +
      "<br><br>" + renderAreaForecastHtml(areaForecast, jma, selectedDate, weather);
  }

  async function fetchSummitWeather(mountain, selectedDate) {
    const cacheKey = mountain.id + ":" + selectedDate.toISOString().slice(0, 13);
    if (state.weatherCache.has(cacheKey)) {
      return state.weatherCache.get(cacheKey);
    }

    const url =
      "https://api.open-meteo.com/v1/forecast?latitude=" +
      encodeURIComponent(mountain.lat) +
      "&longitude=" +
      encodeURIComponent(mountain.lon) +
      "&hourly=temperature_2m,precipitation,precipitation_probability,weather_code,wind_speed_10m,wind_direction_10m&timezone=Asia%2FTokyo&forecast_days=7";

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("weather fetch failed");
      }
      const json = await response.json();
      const hourly = json.hourly || {};
      const times = hourly.time || [];
      if (!times.length) {
        throw new Error("no forecast");
      }
      let bestIndex = 0;
      let bestDelta = Number.POSITIVE_INFINITY;
      const targetTime = selectedDate.getTime();
      times.forEach((time, index) => {
        const delta = Math.abs(new Date(time).getTime() - targetTime);
        if (delta < bestDelta) {
          bestDelta = delta;
          bestIndex = index;
        }
      });
      const result = {
        available: bestDelta <= 36 * 60 * 60 * 1000,
        time: times[bestIndex],
        temperature: readHourlyValue(hourly.temperature_2m, bestIndex),
        precipitationProbability: readHourlyValue(hourly.precipitation_probability, bestIndex),
        windSpeed: readHourlyValue(hourly.wind_speed_10m, bestIndex),
        windDirection: readHourlyValue(hourly.wind_direction_10m, bestIndex),
        weatherCode: readHourlyValue(hourly.weather_code, bestIndex),
        dailyWindSummaries: {},
        dailyWeatherSummaries: {},
        dailyPrecipitationSummaries: {},
        dailyWindDirectionSummaries: {},
        dailyRainTotals: {},
        dayMaxTemperature: null,
        dayMaxTime: null,
        dayMinTemperature: null,
        dayMinTime: null
      };
      const indicesByDay = {};
      times.forEach((time, index) => {
        const key = String(time).slice(0, 10);
        if (!indicesByDay[key]) {
          indicesByDay[key] = [];
        }
        indicesByDay[key].push(index);
      });
      Object.keys(indicesByDay).forEach((dayKey) => {
        const dayIndices = indicesByDay[dayKey];
        let minWind = Number.POSITIVE_INFINITY;
        let maxWind = Number.NEGATIVE_INFINITY;
        let maxPop = Number.NEGATIVE_INFINITY;
        let rainTotal = 0;
        const directionCounts = {};
        let representativeWeather = null;
        let representativeWeatherIndex = null;
        dayIndices.forEach((index) => {
          const wind = readHourlyValue(hourly.wind_speed_10m, index);
          if (typeof wind === "number") {
            minWind = Math.min(minWind, wind);
            maxWind = Math.max(maxWind, wind);
          }
          const pop = readHourlyValue(hourly.precipitation_probability, index);
          if (typeof pop === "number") {
            maxPop = Math.max(maxPop, pop);
          }
          const precipitation = readHourlyValue(hourly.precipitation, index);
          if (typeof precipitation === "number") {
            rainTotal += precipitation;
          }
          const direction = readHourlyValue(hourly.wind_direction_10m, index);
          if (typeof direction === "number") {
            const label = formatWindDirectionShort(direction);
            directionCounts[label] = (directionCounts[label] || 0) + 1;
          }
          const weatherCode = readHourlyValue(hourly.weather_code, index);
          const hourText = String(times[index] || "").slice(11, 13);
          if (representativeWeather === null || hourText === "12") {
            representativeWeather = weatherCode;
            representativeWeatherIndex = index;
          } else if (representativeWeatherIndex === null) {
            representativeWeather = weatherCode;
            representativeWeatherIndex = index;
          }
        });
        if (Number.isFinite(minWind) && Number.isFinite(maxWind)) {
          result.dailyWindSummaries[dayKey] = minWind === maxWind
            ? minWind.toFixed(1).replace(/\.0$/, "") + "m/s\u524d\u5f8c"
            : minWind.toFixed(1).replace(/\.0$/, "") + "\u301c" + maxWind.toFixed(1).replace(/\.0$/, "") + "m/s";
        }
        if (Number.isFinite(maxPop)) {
          result.dailyPrecipitationSummaries[dayKey] = Math.round(maxPop) + "%";
        }
        if (rainTotal > 0) {
          result.dailyRainTotals[dayKey] = rainTotal;
        }
        const directionLabel = Object.keys(directionCounts).sort((a, b) => directionCounts[b] - directionCounts[a])[0];
        if (directionLabel) {
          result.dailyWindDirectionSummaries[dayKey] = directionLabel;
        }
        if (representativeWeather !== null && representativeWeather !== undefined) {
          result.dailyWeatherSummaries[dayKey] = describeWeatherCode(representativeWeather);
        }
      });
      const targetDayKey = times[bestIndex] ? String(times[bestIndex]).slice(0, 10) : "";
      if (targetDayKey) {
        const dayIndices = times
          .map((time, index) => ({ time, index }))
          .filter((entry) => String(entry.time).slice(0, 10) === targetDayKey)
          .map((entry) => entry.index);
        if (dayIndices.length) {
          let maxTemp = Number.NEGATIVE_INFINITY;
          let minTemp = Number.POSITIVE_INFINITY;
          let maxIndex = null;
          let minIndex = null;
          dayIndices.forEach((index) => {
            const value = readHourlyValue(hourly.temperature_2m, index);
            if (typeof value !== "number") {
              return;
            }
            if (value > maxTemp) {
              maxTemp = value;
              maxIndex = index;
            }
            if (value < minTemp) {
              minTemp = value;
              minIndex = index;
            }
          });
          if (maxIndex !== null) {
            result.dayMaxTemperature = maxTemp;
            result.dayMaxTime = times[maxIndex];
          }
          if (minIndex !== null) {
            result.dayMinTemperature = minTemp;
            result.dayMinTime = times[minIndex];
          }
        }
      }
      state.weatherCache.set(cacheKey, result);
      return result;
    } catch (error) {
      const fallback = { available: false };
      state.weatherCache.set(cacheKey, fallback);
      return fallback;
    }
  }

  function buildDangerBullets(mountain, selectedDate) {
    const month = selectedDate.getMonth() + 1;
    const items = [];
    const jmaWarning = getJmaWarningSummary(mountain);
    if (jmaWarning) {
      items.push("\u6c17\u8c61\u5e81\u306e\u8b66\u5831\u30fb\u6ce8\u610f\u5831: " + jmaWarning);
    }
    if (isMonthMentioned(mountain.snowSeasonText, month)) {
      items.push("\u7a4d\u96ea\u671f\u306e\u53ef\u80fd\u6027: " + mountain.snowSeasonText);
    } else if (isMonthMentioned(mountain.remainingSnowText, month)) {
      items.push("\u6b8b\u96ea\u306e\u53ef\u80fd\u6027: " + mountain.remainingSnowText);
    }
    const previousDayRain = getPreviousDayRainNote(mountain, selectedDate);
    if (previousDayRain) {
      items.push("\u524d\u65e5\u964d\u96e8\u306b\u6ce8\u610f: " + previousDayRain);
    }
    const routeRestriction = getRouteRestrictionSummary(mountain);
    if (routeRestriction) {
      items.push("\u901a\u884c\u898f\u5236\u30fb\u767b\u5c71\u9053\u9589\u9396: " + routeRestriction);
    }
    if (hasReliableCourseTime(mountain) && mountain.courseHours >= 10) {
      items.push("\u884c\u52d5\u6642\u9593\u304c\u9577\u3044: " + mountain.courseTime + " / \u65e5\u5e30\u308a\u306f\u96e3\u3057\u3044\u53ef\u80fd\u6027\u304c\u3042\u308a\u3001\u5c0f\u5c4b\u6cca\u307e\u305f\u306f\u6975\u3081\u3066\u65e9\u3044\u51fa\u767a\u304c\u524d\u63d0");
    } else if (hasReliableCourseTime(mountain) && mountain.courseHours >= 8) {
      items.push("\u884c\u52d5\u6642\u9593\u304c\u9577\u3044: " + mountain.courseTime + " / \u65e9\u51fa\u65e9\u7740\u3068\u4f59\u88d5\u3042\u308b\u5de5\u7a0b\u7ba1\u7406\u304c\u5fc5\u8981");
    }
    if (hasReliableCumulativeAscent(mountain) && mountain.cumulativeAscentM >= 1800) {
      items.push("\u7d2f\u7a4d\u6a19\u9ad8\u304c\u5927\u304d\u3044: " + formatCumulativeElevationLabel(mountain.cumulativeElevation) + " / \u4f53\u529b\u6d88\u8017\u304c\u5927\u304d\u3044\u30eb\u30fc\u30c8\u3067\u3059");
    } else if (hasReliableCumulativeAscent(mountain) && mountain.cumulativeAscentM >= 1400) {
      items.push("\u7d2f\u7a4d\u6a19\u9ad8\u304c\u5927\u304d\u3044: " + formatCumulativeElevationLabel(mountain.cumulativeElevation) + " / \u767b\u308a\u8fd4\u3057\u306e\u8ca0\u8377\u306b\u6ce8\u610f");
    }
    if (mountain.elevationM >= 2800) {
      items.push("\u9ad8\u6a19\u9ad8\u306e\u305f\u3081\u6c17\u6e29\u4f4e\u4e0b\u3068\u98a8\u5bd2\u304c\u5f37\u304f\u306a\u308a\u3084\u3059\u3044");
    } else if (mountain.elevationM >= 2500) {
      items.push("\u9ad8\u6a19\u9ad8\u306e\u305f\u3081\u6c17\u6e29\u4f4e\u4e0b\u306b\u6ce8\u610f");
    }
    const technicalNote = TECHNICAL_NOTES[stripMountainAlias(mountain.name)];
    if (technicalNote) {
      items.push("\u96e3\u6240\u60c5\u5831: " + technicalNote);
    }
    const routeHazard = getRouteHazardNote(mountain);
    if (routeHazard) {
      items.push("\u9078\u629e\u30b3\u30fc\u30b9\u306e\u96e3\u6240: " + routeHazard);
    }
    const crossingNote = CROSSING_NOTES[stripMountainAlias(mountain.name)];
    if (crossingNote) {
      items.push("\u6e21\u6e09\u6ce8\u610f: " + crossingNote);
    }
    const nearbyBearReport = getNearbyBearReportSummary(mountain);
    if (nearbyBearReport) {
      items.push("\u8fd1\u96a3\u306e\u30af\u30de\u60c5\u5831: " + nearbyBearReport);
    }
    if (shouldDisplayVolcanoInfo(mountain)) {
      items.push("\u706b\u5c71\u60c5\u5831: " + formatVolcanoDangerStatus(mountain));
    }
    const transit = buildTransitNote(mountain, selectedDate);
    if (transit) {
      items.push(transit);
    }
    return items;
  }

  function getPreviousDayRainNote(mountain, selectedDate) {
    const weather = getCachedSummitWeather(mountain, selectedDate);
    if (!weather || !weather.dailyRainTotals) {
      return "";
    }
    const previousDayKey = toDateKey(addDays(selectedDate, -1));
    const rainTotal = weather.dailyRainTotals[previousDayKey];
    if (!Number.isFinite(rainTotal) || rainTotal < 10) {
      return "";
    }
    const rainLabel = rainTotal >= 20
      ? "\u524d\u65e5\u96e8\u91cf" + formatRainTotal(rainTotal) + "\u3002\u6ca2\u6cbf\u3044\u3001\u9396\u5834\u3001\u6728\u9053\u3001\u30b6\u30ec\u5834\u306e\u6ed1\u308a\u3084\u3059\u3055\u3068\u5897\u6c34\u306b\u6ce8\u610f"
      : "\u524d\u65e5\u96e8\u91cf" + formatRainTotal(rainTotal) + "\u3002\u6ca2\u6cbf\u3044\u3001\u9396\u5834\u3001\u6728\u9053\u306f\u6ed1\u308a\u3084\u3059\u3044\u53ef\u80fd\u6027";
    return rainLabel;
  }

  function getCachedSummitWeather(mountain, selectedDate) {
    const cacheKey = mountain.id + ":" + selectedDate.toISOString().slice(0, 13);
    return state.weatherCache.get(cacheKey) || null;
  }

  function formatRainTotal(value) {
    const rounded = Math.round(value * 10) / 10;
    return (Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1).replace(/\.0$/, "")) + "mm";
  }

  function getRouteRestrictionSummary(mountain) {
    const accessData = findAccessEntries(mountain);
    const notes = [];
    accessData.forEach((entry) => {
      const entryNotes = Array.isArray(entry && entry.notes) ? entry.notes : [];
      entryNotes.forEach((note) => {
        const clean = sanitizeAccessText(note);
        if (clean && ROUTE_RESTRICTION_PATTERN.test(clean)) {
          notes.push(clean);
        }
      });
    });
    const unique = Array.from(new Set(notes));
    if (!unique.length) {
      return "";
    }
    return unique
      .slice(0, 2)
      .map((note) => note.replace(/確認推奨/g, "事前確認推奨"))
      .join(" / ");
  }

  function buildTransitNote(mountain, selectedDate) {
    const name = stripMountainAlias(mountain.name);
    if (!TRANSIT_REQUIRED.has(name) || !Array.isArray(mountain.specialTransit) || !mountain.specialTransit.length) {
      return "";
    }
    const nextTrip = getStaticTransitDeparture(selectedDate);
    const base = mountain.specialTransit.map((item) => item.route + " / " + item.type).join(" / ");
    return "\u30a2\u30af\u30bb\u30b9\u8f38\u9001\u78ba\u8a8d: " + nextTrip + " / " + base;
  }

  function getNearbyBearReportSummary(mountain) {
    if (!state.bearReportsLoaded || !Array.isArray(state.bearReports) || !state.bearReports.length) {
      return "";
    }
    const nearby = state.bearReports
      .map((report) => ({
        report,
        distanceKm: haversineKm(mountain.lat, mountain.lon, report.lat, report.lon)
      }))
      .filter((entry) => Number.isFinite(entry.distanceKm) && entry.distanceKm <= BEAR_REPORT_RADIUS_KM)
      .sort((a, b) => a.distanceKm - b.distanceKm || b.report.eventTimeMs - a.report.eventTimeMs);
    if (!nearby.length) {
      return "";
    }
    const nearest = nearby[0];
    const dateLabel = formatDateOnly(new Date(nearest.report.eventTimeMs));
    const distanceLabel = nearest.distanceKm < 1
      ? Math.round(nearest.distanceKm * 1000) + "m"
      : nearest.distanceKm.toFixed(1).replace(/\.0$/, "") + "km";
    const note = nearest.report.content ? " / " + nearest.report.content : "";
    const countLabel = nearby.length > 1 ? " / 近隣" + nearby.length + "件" : "";
    return dateLabel + "に" + distanceLabel + "圏内で報告" + note + countLabel;
  }

  function getStaticTransitDeparture(selectedDate) {
    const minutes = selectedDate.getHours() * 60 + selectedDate.getMinutes();
    const departures = buildTimeSeries(420, 16, 20);
    const next = departures.find((value) => value >= minutes);
    return next === undefined ? "\u5f53\u65e5\u6700\u7d42\u4ee5\u964d" : formatClock(next);
  }

  function buildTimeSeries(startMinute, count, stepMinute) {
    const values = [];
    for (let index = 0; index < count; index += 1) {
      values.push(startMinute + index * stepMinute);
    }
    return values;
  }

  function normalizeMountain(mountain) {
    const name = stripMountainAlias(mountain.name);
    const metadata = MOUNTAIN_METADATA_OVERRIDES[name] || null;
    const supplement = SUPPLEMENTAL_MOUNTAIN_DATA[name] || null;
    const mergedMountain = supplement ? { ...mountain, ...supplement } : { ...mountain };
    const routeFallback = getPrimaryRouteFallback(mergedMountain);
    if (routeFallback) {
      if (!mergedMountain.modelCourse) {
        mergedMountain.modelCourse = routeFallback.courseName;
      }
      if (!mergedMountain.courseName) {
        mergedMountain.courseName = routeFallback.courseName;
      }
      if (!mergedMountain.coursePoints) {
        mergedMountain.coursePoints = routeFallback.coursePoints;
      }
      if (!mergedMountain.courseTime) {
        mergedMountain.courseTime = routeFallback.courseTime;
      }
      if (!mergedMountain.courseDistance) {
        mergedMountain.courseDistance = routeFallback.courseDistance;
      }
      if (!mergedMountain.cumulativeElevation) {
        mergedMountain.cumulativeElevation = routeFallback.cumulativeElevation;
      }
    }
    const bestSeasonText = mergedMountain.bestSeasonText || "";
      const staminaRaw = mergedMountain.referenceStamina;
    const staminaScore =
      staminaRaw === null || staminaRaw === undefined || staminaRaw === ""
        ? null
        : (Number.isFinite(Number(staminaRaw)) ? Number(staminaRaw) : null);
    const weather = {
      ...(mergedMountain.weather || {}),
      ...(metadata && metadata.weatherArea ? { area: metadata.weatherArea } : {})
    };
    const prefecture = (metadata && metadata.prefecture) || mergedMountain.prefecture || "";
    const location = sanitizeLocation(mergedMountain.location, prefecture);
    const broadRegion = (metadata && metadata.broadRegion) || getBroadRegion(prefecture) || "";
    const displayRegion =
      mergedMountain.region && mergedMountain.region !== "\u4e8c\u767e\u540d\u5c71"
        ? mergedMountain.region
        : (broadRegion || mergedMountain.region || "");
    const courseHours = parseJapaneseDuration(mergedMountain.courseTime);
    const cumulativeAscentM = parseCumulativeAscent(mergedMountain.cumulativeElevation);
    const courseDistanceKm = parseDistanceKm(mergedMountain.courseDistance);
    const override = LEVEL_OVERRIDES[name];
    const levelRank = override || inferLevelRank(name, courseHours, cumulativeAscentM, courseDistanceKm, mergedMountain.difficultyStars, staminaScore);
    return {
      ...mergedMountain,
      prefecture,
      location,
      region: displayRegion,
      broadRegion,
      weather,
      bestSeasonText,
      staminaScore,
      courseHours,
      cumulativeAscentM,
      courseDistanceKm,
      levelRank,
      levelLabel: getLevelLabelByRank(levelRank),
      isActiveVolcano: isActiveVolcano(mergedMountain.volcanoStatus)
    };
  }

  function getDisplayMountain(mountain) {
    const routeOptions = getRouteOptions(mountain);
    if (!routeOptions.length) {
      return mountain;
    }
    const selectedCourseName = state.selectedCourses.get(mountain.id);
    if (!selectedCourseName) {
      return mountain;
    }
    const selectedRoute = routeOptions.find((route) => route.courseName === selectedCourseName);
    if (!selectedRoute) {
      return mountain;
    }
    return normalizeMountain({
      ...mountain,
      modelCourse: selectedRoute.courseName,
      courseName: selectedRoute.courseName,
      coursePoints: selectedRoute.coursePoints,
      courseTime: selectedRoute.courseTime,
      courseDistance: selectedRoute.courseDistance,
      cumulativeElevation: selectedRoute.cumulativeElevation
    });
  }

  function getRouteOptions(mountain) {
    const data = window.ROUTE_OPTIONS_DATA || {};
    return data[mountain.name] || data[stripMountainAlias(mountain.name)] || [];
  }

  function getPrimaryRouteFallback(mountain) {
    const routeOptions = getRouteOptions(mountain);
    if (!Array.isArray(routeOptions) || !routeOptions.length) {
      return null;
    }
    const explicitDefault = routeOptions.find((route) => route && route.isDefault);
    return explicitDefault || getShortestRoute(routeOptions);
  }

  function getRouteHazardNote(mountain) {
    const name = stripMountainAlias(mountain.name);
    const routeNotes = ROUTE_HAZARD_NOTES[name];
    if (!routeNotes) {
      return "";
    }
    return routeNotes[mountain.modelCourse] || routeNotes[mountain.courseName] || "";
  }

    function renderAccessPanel(mountain) {
      const accessData = findAccessEntries(mountain);
      if (!accessData.length) {
        return renderFallbackAccessPanel(mountain);
      }

    return (
        "<strong>\u30a2\u30af\u30bb\u30b9\u60c5\u5831</strong>" +
        accessData.map((entry) => {
          const filteredNotes = Array.isArray(entry.notes)
            ? entry.notes
                .filter((note) => !/^\s*(\u7d4c\u7def\u5ea6|\u30de\u30c3\u30d7\u30b3\u30fc\u30c9)\s*:/.test(String(note || "")))
                .map(sanitizeAccessText)
                .filter(Boolean)
            : [];
          const notes = filteredNotes.length
            ? "<br>\u5099\u8003: " + filteredNotes.map(escapeHtml).join(" / ")
            : "";
          return (
            "<br><br><strong>" + escapeHtml(sanitizeAccessText(entry.trailhead) || "\u672a\u53d6\u5f97") + "</strong>" +
            "<br>\u5bfe\u5fdc\u30b3\u30fc\u30b9: " + escapeHtml(sanitizeAccessText(entry.course) || "\u672a\u53d6\u5f97") +
            "<br>\u99d0\u8eca\u30b9\u30da\u30fc\u30b9: " + escapeHtml(sanitizeAccessText(entry.parking) || "\u672a\u53d6\u5f97") +
            notes
          );
        }).join("")
      );
    }

  function findAccessEntries(mountain) {
    const data = window.CAR_ACCESS_DATA || {};
    const supplement = SUPPLEMENTAL_ACCESS_DATA[stripMountainAlias(mountain.name)] || [];
    const direct = data[mountain.name] || data[stripMountainAlias(mountain.name)] || [];
    if (direct.length || supplement.length) {
      return [...direct, ...supplement];
    }
    const normalizedTarget = normalizeLookupKey(mountain.name);
    const matchedKey = Object.keys(data).find((key) => normalizeLookupKey(key) === normalizedTarget);
    return matchedKey ? [...(data[matchedKey] || []), ...supplement] : supplement;
  }

  function renderFallbackAccessPanel(mountain) {
    const trailhead = getTrailheadFromCoursePoints(mountain.coursePoints) || mountain.location || "\u672a\u53d6\u5f97";
    const notes = [
      "\u99d0\u8eca\u30b9\u30da\u30fc\u30b9: \u8981\u78ba\u8a8d",
      mountain.modelCourse ? "\u5bfe\u5fdc\u30b3\u30fc\u30b9: " + mountain.modelCourse : ""
    ].filter(Boolean);
    return (
      "<strong>\u30a2\u30af\u30bb\u30b9\u60c5\u5831</strong>" +
      "<br><br><strong>" + escapeHtml(trailhead) + "</strong>" +
      "<br>" + notes.map(escapeHtml).join("<br>")
    );
  }

  function buildRestrictionCheckLinks(mountain, notes) {
    const links = [];
    const noteText = Array.isArray(notes) ? notes.join(" ") : "";
    if (shouldDisplayVolcanoInfo(mountain)) {
      links.push({
        label: "\u6c17\u8c61\u5e81\u706b\u5c71\u60c5\u5831",
        url: "https://www.data.jma.go.jp/vois/data/tokyo/STOCK/activity_info/volinfo.php"
      });
    }
    if (ROUTE_RESTRICTION_PATTERN.test(noteText) || shouldDisplayVolcanoInfo(mountain)) {
      links.push({
        label: "\u30b3\u30f3\u30d1\u30b9",
        url: "https://www.mt-compass.com/"
      });
    }
    const sourceLinks = Array.isArray(mountain.sources)
      ? mountain.sources
          .filter((source) => source && source.url)
          .map((source) => ({
            label: String(source.site || source.title || "\u5c71\u60c5\u5831").trim(),
            url: source.url
          }))
      : [];
    sourceLinks.forEach((source) => {
      if (links.length >= 3) {
        return;
      }
      if (!links.some((link) => link.url === source.url)) {
        links.push(source);
      }
    });
    return links.slice(0, 3);
  }

    function getTrailheadFromCoursePoints(coursePoints) {
      if (!coursePoints) {
        return "";
      }
      return String(coursePoints).split("\u2192")[0].trim();
    }

    function sanitizeAccessText(value) {
      return String(value || "")
        .replace(/<[^>]*>/g, "")
        .replace(/&amp;/g, "&")
        .replace(/&nbsp;/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    }

  async function prefetchJmaForecasts() {
    const configs = MOUNTAINS
      .map((mountain) => getJmaConfig(mountain))
      .filter(Boolean);
    const officeCodes = Array.from(new Set(configs.map((config) => config.officeCode)));
    const areaCodes = Array.from(new Set(configs.map((config) => config.areaCode)));

    await Promise.all([
      ...officeCodes.map((officeCode) => fetchJmaOfficeForecast(officeCode)),
      ...officeCodes.map((officeCode) => fetchJmaWarning(officeCode)),
      ...areaCodes.map((areaCode) => fetchJmaAreaTimeseries(areaCode)),
      fetchJmaVolcanoLevels(),
      fetchBearReports()
    ]);
  }

  async function fetchBearReports() {
    if (state.bearReportsLoaded) {
      return state.bearReports;
    }
    try {
      const response = await fetch(
        KUMAP_SUPABASE_URL +
        "/rest/v1/points?select=id,event_time,content,location&order=event_time.desc&limit=400",
        {
          headers: {
            apikey: KUMAP_PUBLISHABLE_KEY,
            Authorization: "Bearer " + KUMAP_PUBLISHABLE_KEY
          }
        }
      );
      if (!response.ok) {
        throw new Error("bear reports fetch failed");
      }
      const json = await response.json();
      const now = Date.now();
      const minTime = now - BEAR_REPORT_RECENT_DAYS * 24 * 60 * 60 * 1000;
      const maxFuture = now + 2 * 24 * 60 * 60 * 1000;
      state.bearReports = (Array.isArray(json) ? json : [])
        .map((item) => normalizeBearReport(item))
        .filter((item) => item && item.eventTimeMs >= minTime && item.eventTimeMs <= maxFuture)
        .sort((a, b) => b.eventTimeMs - a.eventTimeMs);
    } catch (error) {
      state.bearReports = [];
    } finally {
      state.bearReportsLoaded = true;
    }
    return state.bearReports;
  }

  function normalizeBearReport(item) {
    const point = parseWkbPoint((item || {}).location);
    const eventTimeMs = Date.parse((item || {}).event_time || "");
    if (!point || !Number.isFinite(eventTimeMs)) {
      return null;
    }
    return {
      id: item.id || "",
      eventTimeMs,
      content: String(item.content || "").trim(),
      lat: point.lat,
      lon: point.lon
    };
  }

  function parseWkbPoint(hex) {
    const text = String(hex || "").trim();
    if (!text || text.length < 42) {
      return null;
    }
    try {
      const bytes = [];
      for (let index = 0; index < text.length; index += 2) {
        bytes.push(parseInt(text.slice(index, index + 2), 16));
      }
      const view = new DataView(new Uint8Array(bytes).buffer);
      const littleEndian = view.getUint8(0) === 1;
      const geomType = view.getUint32(1, littleEndian);
      const baseType = geomType & 255;
      const hasSrid = (geomType & 0x20000000) !== 0;
      if (baseType !== 1) {
        return null;
      }
      let offset = 5;
      if (hasSrid) {
        offset += 4;
      }
      const lon = view.getFloat64(offset, littleEndian);
      const lat = view.getFloat64(offset + 8, littleEndian);
      if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
        return null;
      }
      return { lat, lon };
    } catch (error) {
      return null;
    }
  }

  const VOLCANO_NAME_ALIAS_MAP = {
    "霧島山新燃岳": "霧島山",
    "霧島山御鉢": "霧島山",
    "霧島山えびの高原硫黄山": "霧島山",
    "霧島山大幡池": "霧島山",
    "草津白根山白根山湯釜付近": "草津白根山",
    "阿蘇山中岳第一火口": "阿蘇山",
    "口永良部島": "口永良部岳"
  };

  function normalizeVolcanoLookupName(value) {
    let text = String(value || "").normalize("NFKC").trim();
    let previous = "";
    while (text !== previous) {
      previous = text;
      text = text.replace(/[（(][^（）()]*[）)]/g, "");
    }
    return text
      .replace(/[【】]/g, "")
      .replace(/\s+/g, "")
      .trim();
  }

  function resolveVolcanoLookupName(value) {
    const normalized = normalizeVolcanoLookupName(value);
    if (!normalized) {
      return "";
    }
    if (VOLCANO_NAME_ALIAS_MAP[normalized]) {
      return VOLCANO_NAME_ALIAS_MAP[normalized];
    }
    const aliasEntry = Object.entries(VOLCANO_NAME_ALIAS_MAP).find(([key]) => normalized.includes(key));
    return aliasEntry ? aliasEntry[1] : normalized;
  }

  function parseVolcanoLevelFromStatusText(statusText) {
    const text = String(statusText || "").trim();
    if (!text) {
      return null;
    }
    const fullLevelMatch = text.match(/噴火警戒レベル\s*([0-5])(?:\s*（([^）]+)）)?/);
    if (fullLevelMatch) {
      return {
        level: Number(fullLevelMatch[1]),
        label: fullLevelMatch[2]
          ? "噴火警戒レベル" + fullLevelMatch[1] + "（" + fullLevelMatch[2] + "）"
          : "噴火警戒レベル" + fullLevelMatch[1]
      };
    }
    const levels = Array.from(text.matchAll(/レベル\s*([0-5])/g))
      .map((match) => Number(match[1]))
      .filter((level) => Number.isFinite(level));
    if (!levels.length) {
      return null;
    }
    const maxLevel = Math.max(...levels);
    return {
      level: maxLevel,
      label: "レベル" + maxLevel
    };
  }

  function normalizeWeatherAreaSearchText(value) {
    return String(value || "")
      .normalize("NFKC")
      .replace(/\s+/g, "");
  }

  function textIncludesAnyKeyword(text, keywords) {
    if (!text || !Array.isArray(keywords)) {
      return false;
    }
    return keywords.some((keyword) => text.includes(normalizeWeatherAreaSearchText(keyword)));
  }

  function getWeatherAreaSearchText(mountain) {
    return normalizeWeatherAreaSearchText([
      mountain.name,
      mountain.location,
      sanitizeLocation(mountain.location, mountain.prefecture),
      mountain.modelCourse,
      mountain.coursePoints
    ].filter(Boolean).join(" "));
  }

  function inferDetailedWeatherArea(mountain) {
    const prefecture = String(mountain.prefecture || "").trim();
    if (!prefecture) {
      return "";
    }
    const rules = WEATHER_AREA_KEYWORD_RULES[prefecture] || [];
    const searchText = getWeatherAreaSearchText(mountain);
    const matchedRule = rules.find((rule) => textIncludesAnyKeyword(searchText, rule.keywords));
    if (matchedRule && matchedRule.area) {
      return matchedRule.area;
    }
    return PREFECTURE_DEFAULT_WEATHER_AREA[prefecture] || "";
  }

  function getDetailedWeatherArea(mountain) {
    const prefecture = String(mountain.prefecture || "").trim();
    if (!prefecture) {
      return "";
    }
    const configuredArea = String(((mountain.weather || {}).area) || "").trim();
    if (configuredArea && JMA_AREA_CONFIG[prefecture + ":" + configuredArea]) {
      return configuredArea;
    }
    const inferredArea = inferDetailedWeatherArea(mountain);
    if (inferredArea && JMA_AREA_CONFIG[prefecture + ":" + inferredArea]) {
      return inferredArea;
    }
    return configuredArea || "";
  }

  function getJmaConfig(mountain) {
    const area = getDetailedWeatherArea(mountain);
    return JMA_AREA_CONFIG[mountain.prefecture + ":" + area] || null;
  }

  async function fetchJmaVolcanoLevels() {
    if (state.jmaVolcanoLoaded) {
      return state.jmaVolcanoLevels;
    }
    try {
      const response = await fetch("https://www.data.jma.go.jp/developer/xml/feed/eqvol_l.xml");
      if (!response.ok) {
        throw new Error("eqvol feed fetch failed");
      }
      const xmlText = await response.text();
      const parser = new DOMParser();
      const xml = parser.parseFromString(xmlText, "application/xml");
      const contents = Array.from(xml.getElementsByTagName("content"));
      const levels = new Map();
      contents.forEach((node) => {
        const text = String(node.textContent || "").trim();
        const currentMatch = text.match(/現在、(.+?)は噴火警戒レベル([0-5])（([^）]+)）/);
        const volcanoMatch = currentMatch || text.match(/火山名[　 ]*([^　]+?)[　 ]/);
        const levelMatch = text.match(/噴火警戒レベル([0-5])（([^）]+)）/);
        if (!volcanoMatch || !levelMatch) {
          return;
        }
        const volcanoName = resolveVolcanoLookupName(volcanoMatch[1]);
        if (!volcanoName) {
          return;
        }
        const nextEntry = {
          level: Number(levelMatch[1]),
          label: "噴火警戒レベル" + levelMatch[1] + "（" + levelMatch[2] + "）"
        };
        const currentEntry = levels.get(volcanoName);
        if (!currentEntry || nextEntry.level > currentEntry.level) {
          levels.set(volcanoName, nextEntry);
        }
      });
      state.jmaVolcanoLevels = levels;
      state.jmaVolcanoLoaded = true;
      return levels;
    } catch (error) {
      state.jmaVolcanoLoaded = true;
      return state.jmaVolcanoLevels;
    }
  }

  async function fetchJmaOfficeForecast(officeCode) {
    if (!officeCode || state.jmaForecasts.has(officeCode)) {
      return state.jmaForecasts.get(officeCode) || null;
    }
    try {
      const response = await fetch("https://www.jma.go.jp/bosai/forecast/data/forecast/" + officeCode + ".json");
      if (!response.ok) {
        throw new Error("forecast fetch failed");
      }
      const json = await response.json();
      state.jmaForecasts.set(officeCode, json);
      return json;
    } catch (error) {
      state.jmaForecasts.set(officeCode, null);
      return null;
    }
  }

  async function fetchJmaAreaTimeseries(areaCode) {
    if (!areaCode || state.jmaAreaTimeseries.has(areaCode)) {
      return state.jmaAreaTimeseries.get(areaCode) || null;
    }
    try {
      const response = await fetch("https://www.jma.go.jp/bosai/jmatile/data/wdist/VPFD/" + areaCode + ".json");
      if (!response.ok) {
        throw new Error("vpfd fetch failed");
      }
      const json = await response.json();
      state.jmaAreaTimeseries.set(areaCode, json);
      return json;
    } catch (error) {
      state.jmaAreaTimeseries.set(areaCode, null);
      return null;
    }
  }

  async function fetchJmaWarning(officeCode) {
    if (!officeCode || state.jmaWarnings.has(officeCode)) {
      return state.jmaWarnings.get(officeCode) || null;
    }
    try {
      const response = await fetch("https://www.jma.go.jp/bosai/warning/data/warning/" + officeCode + ".json");
      if (!response.ok) {
        throw new Error("warning fetch failed");
      }
      const json = await response.json();
      state.jmaWarnings.set(officeCode, json);
      return json;
    } catch (error) {
      state.jmaWarnings.set(officeCode, null);
      return null;
    }
  }

  function getJmaWarningSummary(mountain) {
    const config = getJmaConfig(mountain);
    if (!config) {
      return "";
    }
    const json = state.jmaWarnings.get(config.officeCode);
    if (!json || !Array.isArray(json.areaTypes) || !json.areaTypes.length) {
      return "";
    }
    const class10Areas = json.areaTypes[0] && Array.isArray(json.areaTypes[0].areas) ? json.areaTypes[0].areas : [];
    const matchedArea = class10Areas.find((area) => area.code === config.areaCode);
    if (!matchedArea || !Array.isArray(matchedArea.warnings)) {
      return "";
    }
    const activeWarnings = matchedArea.warnings.filter((warning) => {
      const status = String((warning && warning.status) || "");
      return status && status !== "\u89e3\u9664" && status !== "\u767a\u8868\u8b66\u5831\u30fb\u6ce8\u610f\u5831\u306f\u306a\u3057";
    });
    if (!activeWarnings.length) {
      return "";
    }
    const areaLabel = getForecastAreaLabel(mountain);
    const headline = String(json.headlineText || "").trim();
    return headline
      ? areaLabel + "\u3067\u767a\u8868\u4e2d\u3002" + headline
      : areaLabel + "\u3067\u8b66\u5831\u30fb\u6ce8\u610f\u5831\u304c\u767a\u8868\u4e2d\u3067\u3059";
  }

  function getAreaForecastSummary(mountain, selectedDate) {
    const config = getJmaConfig(mountain);
    const empty = {
      areaLabel: getForecastAreaLabel(mountain),
      target: null,
      next: null
    };
    if (!config) {
      return empty;
    }
    const officeJson = state.jmaForecasts.get(config.officeCode);
    const areaJson = state.jmaAreaTimeseries.get(config.areaCode);
    return {
      areaLabel: getForecastAreaLabel(mountain),
      target: buildAreaForecastDay(selectedDate, mountain, officeJson, areaJson, config.areaCode),
      next: buildAreaForecastDay(addDays(selectedDate, 1), mountain, officeJson, areaJson, config.areaCode, true)
    };
  }

  function buildAreaForecastDay(date, mountain, officeJson, areaJson, areaCode, isNextDay) {
    const dateKey = toDateKey(date);
    const officeDay = getOfficeForecastForDate(officeJson, areaCode, dateKey);
    const areaDay = getAreaTimeseriesForDate(areaJson, dateKey);
    const weatherText = officeDay && officeDay.weather
      ? officeDay.weather
      : getFallbackWeatherText(mountain, isNextDay);
    const pop = officeDay ? officeDay.pop : null;
    const windText = officeDay ? officeDay.wind : null;
    const windSpeed = areaDay ? formatAreaWindSummary(areaDay) : "\u672a\u53d6\u5f97";
    if (!weatherText && !pop && !windText && !areaDay) {
      return null;
    }
    return {
      label: isNextDay ? "\u7fcc\u65e5" : "\u672c\u65e5",
      dateKey,
      dateText: formatDateOnly(date),
      weatherText: weatherText || "\u672a\u53d6\u5f97",
      popText: pop || "\u672a\u53d6\u5f97",
      windText: windText || "\u672a\u53d6\u5f97",
      windSpeedText: windSpeed
    };
  }

  function getOfficeForecastForDate(officeJson, areaCode, dateKey) {
    if (!Array.isArray(officeJson) || !officeJson.length) {
      return null;
    }
    const detailed = officeJson[0] && Array.isArray(officeJson[0].timeSeries) ? officeJson[0].timeSeries : [];
    const weatherSeries = detailed[0];
    const popSeries = detailed[1];
    const areaForecast = weatherSeries && Array.isArray(weatherSeries.areas)
      ? weatherSeries.areas.find((area) => area.area && area.area.code === areaCode)
      : null;
    const popForecast = popSeries && Array.isArray(popSeries.areas)
      ? popSeries.areas.find((area) => area.area && area.area.code === areaCode)
      : null;
    const weatherIndex = weatherSeries && Array.isArray(weatherSeries.timeDefines)
      ? weatherSeries.timeDefines.findIndex((value) => String(value).slice(0, 10) === dateKey)
      : -1;
    const popIndex = popSeries && Array.isArray(popSeries.timeDefines)
      ? popSeries.timeDefines.findIndex((value) => String(value).slice(0, 10) === dateKey)
      : -1;
    let weather = areaForecast && weatherIndex >= 0 ? areaForecast.weathers[weatherIndex] : null;
    let wind = areaForecast && weatherIndex >= 0 ? areaForecast.winds[weatherIndex] : null;
    let pop = popForecast && popIndex >= 0 ? summarizePops(popSeries.timeDefines, popForecast.pops, dateKey) : null;

    if ((!weather || !pop) && officeJson[1] && Array.isArray(officeJson[1].timeSeries)) {
      const weeklySeries = officeJson[1].timeSeries[0];
      const weeklyArea = weeklySeries && Array.isArray(weeklySeries.areas) ? weeklySeries.areas[0] : null;
      const weeklyIndex = weeklySeries && Array.isArray(weeklySeries.timeDefines)
        ? weeklySeries.timeDefines.findIndex((value) => String(value).slice(0, 10) === dateKey)
        : -1;
      if (weeklyArea && weeklyIndex >= 0) {
        if (!weather && Array.isArray(weeklyArea.weatherCodes)) {
          weather = describeJmaWeatherCode(weeklyArea.weatherCodes[weeklyIndex]);
        }
        if (!pop && Array.isArray(weeklyArea.pops) && weeklyArea.pops[weeklyIndex] !== "") {
          pop = weeklyArea.pops[weeklyIndex] + "%";
        }
      }
    }

    return { weather, wind, pop };
  }

  function getAreaTimeseriesForDate(areaJson, dateKey) {
    const series = areaJson && areaJson.areaTimeSeries;
    if (!series || !Array.isArray(series.timeDefines) || !Array.isArray(series.wind)) {
      return null;
    }
    const entries = series.timeDefines
      .map((item, index) => ({ time: item.dateTime, wind: series.wind[index], weather: series.weather[index] }))
      .filter((entry) => String(entry.time).slice(0, 10) === dateKey && entry.wind);
    return entries.length ? entries : null;
  }

  function summarizePops(timeDefines, pops, dateKey) {
    if (!Array.isArray(timeDefines) || !Array.isArray(pops)) {
      return null;
    }
    const values = timeDefines
      .map((time, index) => ({ time, value: pops[index] }))
      .filter((entry) => String(entry.time).slice(0, 10) === dateKey && entry.value !== "");
    if (!values.length) {
      return null;
    }
    return values.map((entry) => entry.value + "%").join(" / ");
  }

  function formatAreaWindSummary(entries) {
    if (!Array.isArray(entries) || !entries.length) {
      return "\u672a\u53d6\u5f97";
    }
    const directions = {};
    let minSpeed = Number.POSITIVE_INFINITY;
    let maxSpeed = Number.NEGATIVE_INFINITY;
    entries.forEach((entry) => {
      const wind = entry.wind || {};
      const direction = wind.direction || "\u4e0d\u660e";
      directions[direction] = (directions[direction] || 0) + 1;
      const range = parseWindRange(wind.range);
      if (range) {
        minSpeed = Math.min(minSpeed, range.min);
        maxSpeed = Math.max(maxSpeed, range.max);
      } else if (typeof wind.speed === "number") {
        minSpeed = Math.min(minSpeed, wind.speed);
        maxSpeed = Math.max(maxSpeed, wind.speed);
      }
    });
    const mainDirection = Object.keys(directions).sort((a, b) => directions[b] - directions[a])[0] || "\u4e0d\u660e";
    if (!Number.isFinite(minSpeed) || !Number.isFinite(maxSpeed)) {
      return mainDirection;
    }
    if (Math.abs(maxSpeed - minSpeed) < 0.1) {
      return mainDirection + " " + minSpeed + "m/s\u524d\u5f8c";
    }
    return mainDirection + " " + minSpeed + "\u301c" + maxSpeed + "m/s";
  }

  function parseWindRange(value) {
    const match = String(value || "").match(/(\d+)\s+(\d+)/);
    if (!match) {
      return null;
    }
    return { min: Number(match[1]), max: Number(match[2]) };
  }

  function renderAreaForecastHtml(areaForecast, jma, selectedDate, weather) {
    const fallbackArea = formatForecastAreaLabel((jma && jma.prefecture) || "", (jma && jma.area) || "");
    const target = areaForecast && areaForecast.target;
    const next = areaForecast && areaForecast.next;
    const lines = [
      "<strong>\u6c17\u8c61\u5e81\u30a8\u30ea\u30a2\u4e88\u5831</strong><br>" + escapeHtml((areaForecast && areaForecast.areaLabel) || fallbackArea)
    ];
    if (target) {
      lines.push(formatAreaForecastLine(target, weather));
    } else {
      lines.push(formatAreaForecastFallbackLine("\u672c\u65e5", selectedDate, getFallbackWeatherText({ weather: jma }, false), weather));
    }
    if (next) {
      lines.push(formatAreaForecastLine(next, weather));
    } else {
      lines.push(formatAreaForecastFallbackLine("\u7fcc\u65e5", addDays(selectedDate, 1), getFallbackWeatherText({ weather: jma }, true), weather));
    }
    return lines.join("<br>");
  }

  function formatAreaForecastLine(day, weather) {
    const fallback = getWeatherAreaFallback(weather, day.dateKey);
    const windSpeedText = day.windSpeedText === "\u672a\u53d6\u5f97"
      ? fallback.windSpeedText
      : day.windSpeedText;
    return (
      escapeHtml(day.label) +
      ": " + escapeHtml(day.weatherText === "\u672a\u53d6\u5f97" ? fallback.weatherText : day.weatherText) +
      "<br>\u964d\u6c34\u78ba\u7387: " + escapeHtml(day.popText === "\u672a\u53d6\u5f97" ? fallback.popText : day.popText) +
      "<br>\u98a8: " + escapeHtml(day.windText === "\u672a\u53d6\u5f97" ? fallback.windText : day.windText) +
      "<br>\u98a8\u901f: " + escapeHtml(windSpeedText)
    );
  }

  function formatAreaForecastFallbackLine(label, date, weatherText, weather) {
    const fallback = getWeatherAreaFallback(weather, toDateKey(date));
    return (
      escapeHtml(label) +
      ": " + escapeHtml(weatherText || fallback.weatherText) +
      "<br>\u964d\u6c34\u78ba\u7387: " + escapeHtml(fallback.popText) +
      "<br>\u98a8: " + escapeHtml(fallback.windText) +
      "<br>\u98a8\u901f: " + escapeHtml(fallback.windSpeedText)
    );
  }

  function getFallbackWeatherText(mountain, isNextDay) {
    const weather = mountain.weather || {};
    return isNextDay ? weather.tomorrow || "" : weather.today || "";
  }

  function getWeatherWindFallback(weather, dateKey) {
    if (!weather || !weather.dailyWindSummaries) {
      return "\u672a\u53d6\u5f97";
    }
    return weather.dailyWindSummaries[dateKey] || "\u672a\u53d6\u5f97";
  }

  function getWeatherAreaFallback(weather, dateKey) {
    if (!weather) {
      return {
        weatherText: "\u672a\u53d6\u5f97",
        popText: "\u672a\u53d6\u5f97",
        windText: "\u672a\u53d6\u5f97",
        windSpeedText: "\u672a\u53d6\u5f97"
      };
    }
    return {
      weatherText: weather.dailyWeatherSummaries && weather.dailyWeatherSummaries[dateKey]
        ? weather.dailyWeatherSummaries[dateKey]
        : "\u672a\u53d6\u5f97",
      popText: weather.dailyPrecipitationSummaries && weather.dailyPrecipitationSummaries[dateKey]
        ? weather.dailyPrecipitationSummaries[dateKey]
        : "\u672a\u53d6\u5f97",
      windText: weather.dailyWindDirectionSummaries && weather.dailyWindDirectionSummaries[dateKey]
        ? weather.dailyWindDirectionSummaries[dateKey]
        : "\u672a\u53d6\u5f97",
      windSpeedText: getWeatherWindFallback(weather, dateKey)
    };
  }

  function parseMaxProbability(popText) {
    const values = String(popText || "").match(/\d+/g);
    if (!values || !values.length) {
      return null;
    }
    return Math.max.apply(null, values.map((value) => Number(value)));
  }

  function parseMaxWindSpeedText(text) {
    const values = String(text || "").match(/\d+(?:\.\d+)?/g);
    if (!values || !values.length) {
      return null;
    }
    return Math.max.apply(null, values.map((value) => Number(value)));
  }

  function hasRainLikeWeather(weatherText) {
    return /雨|雷/.test(String(weatherText || ""));
  }

  function getWindPenaltyFromText(windText) {
    const text = String(windText || "");
    if (!text) {
      return 0;
    }
    if (/猛烈/.test(text)) {
      return 40;
    }
    if (/暴風|非常に強く/.test(text)) {
      return 32;
    }
    if (/やや強く/.test(text)) {
      return 12;
    }
    if (/強く/.test(text)) {
      return 22;
    }
    return 0;
  }

  function getWeatherRiskPenalty(day) {
    if (!day) {
      return 0;
    }
    const weatherText = String(day.weatherText || "");
    const pop = parseMaxProbability(day.popText);
    const windSpeed = parseMaxWindSpeedText(day.windSpeedText);
    let penalty = 0;
    let windPenalty = 0;

    if (/雷/.test(weatherText)) {
      penalty += 24;
    } else if (hasRainLikeWeather(weatherText)) {
      if (pop !== null && pop >= 80) {
        penalty += 18;
      } else if (pop !== null && pop >= 60) {
        penalty += 12;
      } else {
        penalty += 8;
      }
    } else if (pop !== null && pop >= 80) {
      penalty += 8;
    } else if (pop !== null && pop >= 60) {
      penalty += 4;
    }

    if (windSpeed !== null) {
      if (windSpeed >= 20) {
        windPenalty = 32;
      } else if (windSpeed >= 15) {
        windPenalty = 22;
      } else if (windSpeed >= 10) {
        windPenalty = 12;
      } else if (windSpeed >= 8) {
        windPenalty = 6;
      }
    }
    penalty += Math.max(windPenalty, getWindPenaltyFromText(day.windText));

    return penalty;
  }

  function getCurrentVolcanoEntry(mountain) {
    const key = resolveVolcanoLookupName(stripMountainAlias(mountain.name));
    if (key && state.jmaVolcanoLevels.has(key)) {
      return state.jmaVolcanoLevels.get(key) || null;
    }
    return parseVolcanoLevelFromStatusText(mountain.volcanoStatus);
  }

  function getCurrentVolcanoStatus(mountain) {
    const entry = getCurrentVolcanoEntry(mountain);
    return entry && entry.label ? entry.label : (mountain.volcanoStatus || "");
  }

  function formatVolcanoDangerStatus(mountain) {
    const entry = getCurrentVolcanoEntry(mountain);
    const status = getCurrentVolcanoStatus(mountain);
    if (!entry || !status) {
      return status;
    }
    if (entry.level >= 3) {
      return status + " / 登山不可";
    }
    if (entry.level === 2) {
      return status + " / 噴火注意";
    }
    return status;
  }

  function getVolcanoScoreAdjustment(mountain) {
    const entry = getCurrentVolcanoEntry(mountain);
    if (!entry) {
      return { penalty: 0, forceZero: false };
    }
    if (entry.level >= 3) {
      return { penalty: 0, forceZero: true };
    }
    if (entry.level === 2) {
      return { penalty: 45, forceZero: false };
    }
    return { penalty: 0, forceZero: false };
  }

  function inferLevelRank(name, courseHours, cumulativeAscentM, courseDistanceKm, difficultyStars, staminaScore) {
    if (TECHNICAL_ADVANCED.has(name)) {
      return 3;
    }
    const hasDetailedCourse =
      Number.isFinite(courseHours) &&
      courseHours < 99 &&
      Number.isFinite(cumulativeAscentM) &&
      cumulativeAscentM < 9999 &&
      Number.isFinite(courseDistanceKm) &&
      courseDistanceKm < 99;
    if (!hasDetailedCourse) {
      if ((difficultyStars || 0) <= 1 && (staminaScore === null || staminaScore <= 20)) {
        return 1;
      }
      if ((difficultyStars || 0) <= 2 && (staminaScore === null || staminaScore <= 35)) {
        return 2;
      }
      if ((difficultyStars || 0) <= 3 && (staminaScore === null || staminaScore <= 45)) {
        return 2;
      }
      return 3;
    }
    if (courseHours <= 5.5 && cumulativeAscentM <= 950 && courseDistanceKm <= 12) {
      return 1;
    }
    if (courseHours <= 8 && cumulativeAscentM <= 1500 && courseDistanceKm <= 18.5) {
      return 2;
    }
    return 3;
  }

  function buildCatchCopy(mountain, result, filters) {
    const parts = [getSeasonCatchText(mountain, result.seasonFit)];
    const highlight = getMountainHighlight(mountain);
    if (highlight) {
      parts.push(highlight);
    } else {
      parts.push(buildFallbackHighlight(mountain));
    }
    return parts.join(" / ");
  }

  function buildFallbackHighlight(mountain) {
    if (mountain.modelCourse) {
      return "見どころ: " + mountain.modelCourse + "を軸に山行計画を立てやすい山です";
    }
    if (mountain.prefecture || mountain.region) {
      return "見どころ: " + [mountain.prefecture, mountain.region].filter(Boolean).join(" / ") + "エリアで検討しやすい山です";
    }
    return "見どころ: ルートと危険情報を確認しながら計画したい山です";
  }

  function matchesKeyword(mountain, keyword) {
    if (!keyword) {
      return true;
    }
    const text = [mountain.name, mountain.prefecture, mountain.region, mountain.location].join(" ").toLowerCase();
    return text.includes(keyword.toLowerCase());
  }

  function matchesRegion(mountain, region) {
    if (!region || region === "all") {
      return true;
    }
    return mountain.broadRegion === region;
  }

  function matchesLevel(mountain, levelRank) {
    if (!levelRank) {
      return true;
    }
    return mountain.levelRank === levelRank;
  }

  function getLevelRank(level) {
    if (level === "all") {
      return null;
    }
    return level === "beginner" ? 1 : level === "intermediate" ? 2 : 3;
  }

  function getLevelLabel(level) {
    if (level === "all") {
      return "\u5168\u3066";
    }
    return level === "beginner" ? "\u521d\u7d1a" : level === "intermediate" ? "\u4e2d\u7d1a" : "\u4e0a\u7d1a";
  }

  function getLevelSummaryText(level, shortText) {
    if (level === "all") {
      return shortText ? "\u5168\u3066\u306e\u30ec\u30d9\u30eb" : "\u5168\u3066\u306e\u30ec\u30d9\u30eb\u3067";
    }
    return getLevelLabel(level) + "\u5411\u3051\u306e";
  }

  function getLevelLabelByRank(rank) {
    return rank === 1 ? "\u521d\u7d1a" : rank === 2 ? "\u4e2d\u7d1a" : "\u4e0a\u7d1a";
  }

  function getMountainHighlight(mountain) {
    return MOUNTAIN_HIGHLIGHTS[stripMountainAlias(mountain.name)] || "";
  }

  function stripPrefectureSuffix(prefecture) {
    return String(prefecture || "").replace(/[都道府県]$/, "");
  }

  function sanitizeLocation(location, prefecture) {
    const text = String(location || "").trim();
    if (!text) {
      return prefecture || "";
    }
    const prefectureRoot = stripPrefectureSuffix(prefecture);
    if (!prefectureRoot) {
      return text;
    }
    if (text.includes(prefectureRoot) || text === prefecture) {
      return text;
    }
    const mentionedRoots = PREFECTURE_ROOTS.filter((root) => text.includes(root));
    return mentionedRoots.length ? prefecture : text;
  }

  function normalizeLookupKey(value) {
    return stripMountainAlias(String(value || ""))
      .normalize("NFKC")
      .replace(/[【】（）()・･\s]/g, "")
      .toLowerCase();
  }

  function formatForecastAreaLabel(prefecture, area) {
    const prefectureText = String(prefecture || "").trim();
    const areaText = String(area || "").trim();
    if (!areaText) {
      return prefectureText || "\u4e0d\u660e";
    }
    if (!prefectureText || areaText.includes(prefectureText)) {
      return areaText;
    }
    return prefectureText + " " + areaText;
  }

  function getForecastAreaLabel(mountain) {
    const weatherArea = getDetailedWeatherArea(mountain);
    if (weatherArea) {
      return formatForecastAreaLabel(mountain.prefecture, weatherArea);
    }
    const location = sanitizeLocation(mountain.location, mountain.prefecture);
    return mountain.prefecture || location || mountain.region || "\u4e0d\u660e";
  }

  function getBroadRegion(prefecture) {
    return PREFECTURE_TO_REGION[prefecture] || "";
  }

  function isAllSeasonMountain(mountain) {
    return String(mountain.bestSeasonText || "").includes("\u901a\u5e74");
  }

  function isSeasonFit(mountain, month) {
    return isAllSeasonMountain(mountain) || mountain.bestMonths.includes(month);
  }

  function getSeasonPillText(mountain, seasonFit) {
    const seasonText = String(mountain.bestSeasonText || "").trim();
    if (!seasonText) {
      return "\u9069\u671f\u60c5\u5831\u3092\u78ba\u8a8d\u4e2d";
    }
    if (isAllSeasonMountain(mountain)) {
      return "\u901a\u5e74\u5411\u304d: \u5b63\u7bc0\u3092\u554f\u308f\u305a\u8a08\u753b\u3057\u3084\u3059\u3044";
    }
    return seasonFit
      ? "\u9069\u671f\u306b\u5408\u3063\u3066\u3044\u307e\u3059"
      : "\u9069\u671f\u5916\u306e\u53ef\u80fd\u6027";
  }

  function getSeasonCatchText(mountain, seasonFit) {
    const seasonText = String(mountain.bestSeasonText || "").trim();
    if (!seasonText) {
      return "\u767b\u5c71\u9069\u671f: \u60c5\u5831\u78ba\u8a8d\u4e2d";
    }
    if (isAllSeasonMountain(mountain)) {
      return "\u767b\u5c71\u9069\u671f: \u901a\u5e74";
    }
    return "\u767b\u5c71\u9069\u671f: " + (seasonFit ? seasonText : seasonText + "\u3092\u63a8\u5968");
  }

  function getRouteLabel(route, routeOptions) {
    const shortest = getShortestRoute(routeOptions);
    return route.courseName + (shortest && shortest.courseName === route.courseName ? "\uff08\u6700\u77ed\uff09" : "");
  }

  function formatCumulativeElevationLabel(value) {
    if (!value) {
      return "\u672a\u53d6\u5f97";
    }
    const text = String(value).trim();
    const ascentDescent = text.match(/\+(\d+)m\s*\/\s*-\d+m(.*)$/);
    if (ascentDescent) {
      const suffix = /(往路|片道)/.test(ascentDescent[2]) ? ascentDescent[2].trim() : "";
      return ascentDescent[1] + "m" + suffix;
    }
    const oneWay = text.match(/(\d+)m(.*(往路|片道).*)$/);
    if (oneWay) {
      return oneWay[1] + "m" + oneWay[2];
    }
    return text;
  }

  function formatStaminaScore(value) {
    if (!Number.isFinite(value)) {
      return "\u672a\u53d6\u5f97";
    }
    return MAX_REFERENCE_STAMINA > 0 ? value + " / " + MAX_REFERENCE_STAMINA : String(value);
  }

  function hasReliableCourseTime(mountain) {
    return Number.isFinite(mountain.courseHours) && mountain.courseHours > 0 && mountain.courseHours < 99;
  }

  function hasReliableCourseDistance(mountain) {
    return Number.isFinite(mountain.courseDistanceKm) && mountain.courseDistanceKm > 0 && mountain.courseDistanceKm < 99;
  }

  function hasReliableCumulativeAscent(mountain) {
    return Number.isFinite(mountain.cumulativeAscentM) && mountain.cumulativeAscentM > 0 && mountain.cumulativeAscentM < 9999;
  }

  function getShortestRoute(routeOptions) {
    if (!Array.isArray(routeOptions) || !routeOptions.length) {
      return null;
    }
    return routeOptions.reduce((best, route) => {
      if (!best) return route;
      return parseJapaneseDuration(route.courseTime) < parseJapaneseDuration(best.courseTime) ? route : best;
    }, null);
  }

  function getTabLabel(tab) {
    if (tab === "weather") return "\u5929\u5019\u30fb\u98a8";
    if (tab === "danger") return "\u5371\u967a\u60c5\u5831";
    return "\u30a2\u30af\u30bb\u30b9";
  }

  function loadFavorites() {
    try {
      const raw = localStorage.getItem(FAVORITES_KEY);
      return new Set(raw ? JSON.parse(raw) : []);
    } catch (error) {
      return new Set();
    }
  }

  function toggleFavorite(mountainId) {
    if (state.favorites.has(mountainId)) {
      state.favorites.delete(mountainId);
    } else {
      state.favorites.add(mountainId);
    }
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(state.favorites)));
  }

  function syncFavoriteButton(button, mountainId) {
    const favorite = state.favorites.has(mountainId);
    button.classList.toggle("is-favorite", favorite);
    button.innerHTML = favorite ? "&#9733;" : "&#9734;";
  }

  function renderStatChip(label, value) {
    return '<div class="stat-chip"><strong>' + escapeHtml(label) + "</strong>: " + escapeHtml(value || "\u672a\u53d6\u5f97") + "</div>";
  }

    function parseJapaneseDuration(value) {
      if (!value) return 99;
      const text = String(value);
      let totalMinutes = 0;
      const pattern = /(\d+)\s*\u6642\u9593(?:\s*(\d+)\s*\u5206)?|(\d+)\s*\u5206/g;
      for (const match of text.matchAll(pattern)) {
        if (match[1]) {
          totalMinutes += Number(match[1]) * 60 + Number(match[2] || 0);
        } else if (match[3]) {
          totalMinutes += Number(match[3]);
        }
      }
      return totalMinutes > 0 ? totalMinutes / 60 : 99;
    }

  function parseCumulativeAscent(value) {
    const match = value ? value.match(/\+(\d+)/) : null;
    return match ? Number(match[1]) : 9999;
  }

  function parseDistanceKm(value) {
    const match = value ? value.match(/([\d.]+)/) : null;
    return match ? Number(match[1]) : 99;
  }

  function hasSnowRisk(mountain, month) {
    return isMonthMentioned(mountain.snowSeasonText, month) || isMonthMentioned(mountain.remainingSnowText, month);
  }

  function isMonthMentioned(text, month) {
    return typeof text === "string" && text.includes(month + "\u6708");
  }

    function isActiveVolcano(status) {
      return Boolean(status) &&
        !status.includes("\u3067\u306f\u3042\u308a\u307e\u305b\u3093") &&
        !status.includes("\u6d3b\u706b\u5c71\u3067\u306f\u3042\u308a\u307e\u305b\u3093");
    }

    function shouldDisplayVolcanoInfo(mountain) {
      const status = getCurrentVolcanoStatus(mountain);
      if (!status || status === "\u8981\u78ba\u8a8d") {
        return false;
      }
      if (isActiveVolcano(status)) {
        return true;
      }
      return POSSIBLY_DORMANT_OR_VOLCANIC.has(stripMountainAlias(mountain.name));
    }

  function stripMountainAlias(name) {
    return String(name || "").replace(/\uff08.*?\uff09/g, "").replace(/\u3010.*?\u3011/g, "").trim();
  }

  function haversineKm(lat1, lon1, lat2, lon2) {
    const toRad = (deg) => (deg * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  function toLocalInputValue(date) {
    const pad = (value) => String(value).padStart(2, "0");
    return date.getFullYear() + "-" + pad(date.getMonth() + 1) + "-" + pad(date.getDate()) + "T" + pad(date.getHours()) + ":" + pad(date.getMinutes());
  }

  function formatDistance(value) {
    return value < 10 ? value.toFixed(1) + "km" : Math.round(value) + "km";
  }

  function formatDateTime(date) {
    return date.getMonth() + 1 + "\u6708" + date.getDate() + "\u65e5 " + String(date.getHours()).padStart(2, "0") + ":" + String(date.getMinutes()).padStart(2, "0");
  }

  function formatDateOnly(date) {
    return date.getMonth() + 1 + "\u6708" + date.getDate() + "\u65e5";
  }

  function addDays(date, days) {
    const next = new Date(date);
    next.setDate(next.getDate() + days);
    return next;
  }

  function toDateKey(date) {
    return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0");
  }

  function formatClockOnly(date) {
    return String(date.getHours()).padStart(2, "0") + ":" + String(date.getMinutes()).padStart(2, "0");
  }

  function formatMaybeNumber(value, suffix) {
    return typeof value === "number" && !Number.isNaN(value) ? value.toFixed(1).replace(/\.0$/, "") + suffix : "\u672a\u53d6\u5f97";
  }

  function formatDailyExtreme(value, time, suffix) {
    if (typeof value !== "number" || Number.isNaN(value) || !time) {
      return "\u672a\u53d6\u5f97";
    }
    return value.toFixed(1).replace(/\.0$/, "") + suffix + " (" + formatClockOnly(new Date(time)) + ")";
  }

  function readHourlyValue(values, index) {
    return Array.isArray(values) && typeof values[index] === "number" ? values[index] : null;
  }

  function describeWeatherCode(code) {
    const table = {0:"\u5feb\u6674",1:"\u3060\u3044\u305f\u3044\u6674",2:"\u6674\u308c\u3068\u304d\u3069\u304d\u66c7\u308a",3:"\u66c7\u308a",45:"\u9727",61:"\u5f31\u3044\u96e8",63:"\u96e8",65:"\u5f37\u3044\u96e8",71:"\u5f31\u3044\u96ea",73:"\u96ea",80:"\u306b\u308f\u304b\u96e8",95:"\u96f7\u96e8"};
    return table[code] || "\u4e0d\u660e";
  }

  function describeJmaWeatherCode(code) {
    const text = String(code || "");
    if (text.startsWith("1")) return "\u6674\u308c\u57fa\u8abf";
    if (text.startsWith("2")) return "\u66c7\u308a\u57fa\u8abf";
    if (text.startsWith("3")) return "\u96e8\u306e\u53ef\u80fd\u6027";
    if (text.startsWith("4")) return "\u96ea\u306e\u53ef\u80fd\u6027";
    return "\u4e0d\u660e";
  }

  function formatWindDirection(deg) {
    if (typeof deg !== "number") return "\u672a\u53d6\u5f97";
    const dirs = ["\u5317","\u5317\u6771","\u6771","\u5357\u6771","\u5357","\u5357\u897f","\u897f","\u5317\u897f"];
    return dirs[Math.round(deg / 45) % 8] + " (" + Math.round(deg) + "\u00b0)";
  }

  function formatWindDirectionShort(deg) {
    if (typeof deg !== "number") return "\u672a\u53d6\u5f97";
    const dirs = ["\u5317","\u5317\u6771","\u6771","\u5357\u6771","\u5357","\u5357\u897f","\u897f","\u5317\u897f"];
    return dirs[Math.round(deg / 45) % 8];
  }

  function formatClock(totalMinutes) {
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    return String(h).padStart(2, "0") + ":" + String(m).padStart(2, "0");
  }

  function debounce(fn, waitMs) {
    let timerId = null;
    return () => {
      clearTimeout(timerId);
      timerId = window.setTimeout(fn, waitMs);
    };
  }

  function registerServiceWorker() {
    if (!("serviceWorker" in navigator) || window.location.protocol !== "https:") {
      return;
    }
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./service-worker.js").catch(() => {});
    });
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }
})();

