/* 台灣傳統音樂．樂器線稿
   全部為手繪的內嵌 SVG，不是照片。理由：
   1. 外連圖片會失效，也無法內嵌進單檔版本（dist/index.html）
   2. 線稿用 currentColor 描邊，深色模式自動跟著變
   3. 辨識樂器真正要看的是「輪廓與姿勢」——南琶要看橫抱、洞簫要看直吹、
      月琴要看正圓的音箱。照片反而會被材質、光線、角度干擾
   每張圖把該樂器的辨識關鍵用 .hl（highlight）填色標出來。 */
(function () {
  var T = (window.COURSES = window.COURSES || {}).taiwan;

  var S = function (title, body) {
    return '<svg viewBox="0 0 100 100" role="img" aria-label="' + title + '">' +
      "<title>" + title + "</title>" + body + "</svg>";
  };

  /* 琵琶的畫法只寫一次，南琶＝同一張圖旋轉 90 度。
     這不是偷懶——它們本來就是同一件樂器，差別就在抱法，
     用同一個形狀旋轉反而把「差別只有姿勢」這件事畫了出來。 */
  var PIPA =
    '<path d="M44 30 V14 H56 V30"/>' +
    '<path d="M44 14 L33 5 L47 1 L56 8 V14 Z"/>' +
    '<path d="M44 20 H56 M44 25 H56"/>' +
    '<path d="M44 30 C32 36 25 50 25 64 C25 80 36 92 50 92 C64 92 75 80 75 64 C75 50 68 36 56 30 Z" class="hl"/>' +
    '<path d="M45 5 V86 M48 5 V86 M52 5 V86 M55 5 V86" stroke-width="1"/>';

  var SVG = {
    /* 嗩吶：辨識關鍵＝下方外張的銅喇叭口 */
    suona: S("嗩吶線稿",
      '<path d="M48 3 H52 L51 10 H49 Z" class="hl"/>' +
      '<circle cx="50" cy="13" r="3"/>' +
      '<path d="M50 16 V21"/>' +
      '<path d="M44 21 H56 L60 63 H40 Z"/>' +
      '<circle cx="50" cy="29" r="1.7"/><circle cx="50" cy="36" r="1.7"/>' +
      '<circle cx="50" cy="43" r="1.7"/><circle cx="50" cy="50" r="1.7"/>' +
      '<circle cx="50" cy="57" r="1.7"/>' +
      '<path d="M40 63 C34 78 29 85 25 91 C40 98 60 98 75 91 C71 85 66 78 60 63 Z" class="hl"/>'),

    /* 月琴：辨識關鍵＝正圓的音箱（與琵琶的梨形對照） */
    yueqin: S("月琴線稿",
      '<rect x="42" y="4" width="16" height="14" rx="3"/>' +
      '<path d="M42 8 H35 M42 14 H35"/>' +
      '<rect x="45" y="18" width="10" height="28"/>' +
      '<circle cx="50" cy="70" r="25" class="hl"/>' +
      '<path d="M47 7 V79 M53 7 V79" stroke-width="1"/>' +
      '<path d="M41 79 H59"/>'),

    /* 洞簫：辨識關鍵＝直立、頂端有吹口缺角 */
    dongxiao: S("洞簫線稿",
      '<rect x="44" y="7" width="12" height="87" rx="5"/>' +
      '<path d="M45 8 L50 16 L55 8" class="hl"/>' +
      '<path d="M44 33 H56 M44 58 H56 M44 80 H56"/>' +
      '<circle cx="50" cy="41" r="1.8"/><circle cx="50" cy="48" r="1.8"/>' +
      '<circle cx="50" cy="66" r="1.8"/><circle cx="50" cy="73" r="1.8"/>'),

    /* 南琶：與琵琶同形，旋轉 90 度＝橫抱。這就是辨識關鍵 */
    nanpa: S("南管琵琶線稿（橫抱）", '<g transform="rotate(-90 50 50)">' + PIPA + "</g>"),
    pipa: S("現代琵琶線稿（豎抱）", PIPA),

    /* 殼仔弦：辨識關鍵＝椰殼音箱＋弓 */
    khakhian: S("殼仔弦線稿",
      '<rect x="46" y="10" width="8" height="58" rx="2"/>' +
      '<path d="M46 18 H37 M46 27 H37"/>' +
      '<circle cx="50" cy="74" r="18" class="hl"/>' +
      '<path d="M34 68 H66" stroke-width="1"/>' +
      '<path d="M48 12 V70 M52 12 V70" stroke-width="1"/>' +
      '<path d="M18 58 C40 64 60 68 84 72"/>' +
      '<path d="M18 58 L21 51 M84 72 L87 65" stroke-width="1.6"/>' +
      '<path d="M21 51 C42 57 62 61 87 65" stroke-width="1"/>'),

    /* 雙管鼻笛：辨識關鍵＝兩根並列的竹管 */
    nosefl: S("排灣族雙管鼻笛線稿",
      '<rect x="34" y="16" width="11" height="76" rx="5" class="hl"/>' +
      '<rect x="55" y="16" width="11" height="76" rx="5" class="hl"/>' +
      '<path d="M34 20 H66" stroke-width="1.6"/>' +
      '<path d="M42 16 V9 H58 V16"/>' +
      '<circle cx="60.5" cy="42" r="1.8"/><circle cx="60.5" cy="52" r="1.8"/>' +
      '<circle cx="60.5" cy="62" r="1.8"/><circle cx="60.5" cy="72" r="1.8"/>'),

    /* 口簧琴：辨識關鍵＝極小、扁平、中央有簧片 */
    lubuw: S("泰雅族口簧琴線稿",
      '<rect x="14" y="41" width="66" height="16" rx="3"/>' +
      '<path d="M26 45 H68 V53 H26 Z" class="hl"/>' +
      '<path d="M26 49 H60" stroke-width="1"/>' +
      '<path d="M80 45 C92 40 96 54 86 58" stroke-width="1.8"/>' +
      '<path d="M14 45 C4 40 2 54 10 58" stroke-width="1.8"/>'),

    /* 笛：辨識關鍵＝橫吹＋笛膜孔 */
    dizi: S("笛線稿（橫吹）",
      '<rect x="6" y="45" width="88" height="11" rx="5"/>' +
      '<circle cx="22" cy="50.5" r="2.4" class="hl"/>' +
      '<rect x="29" y="46" width="8" height="9" rx="1" class="hl"/>' +
      '<circle cx="48" cy="50.5" r="1.8"/><circle cx="55" cy="50.5" r="1.8"/>' +
      '<circle cx="62" cy="50.5" r="1.8"/><circle cx="69" cy="50.5" r="1.8"/>' +
      '<circle cx="76" cy="50.5" r="1.8"/>' +
      '<path d="M94 50 L99 44 M94 53 L99 59" stroke-width="1"/>')
  };
  T.instSVG = SVG;

  /* 主表：七件必認的樂器。順序＝從最好認到最難認。 */
  T.instruments = [
    { id: "suona", svg: SVG.suona, name: "嗩吶", alias: "台語「鼓吹」／客語「噠仔」",
      look: "雙簧管樂器，木管前端接一個<b>外張的銅喇叭口</b>",
      sound: "<b>極響、極亮、穿透力最強。</b>全課最好認的一件——聽到那個能蓋過整條街的聲音就是它",
      where: "北管（單元 2）、客家八音（單元 6）" },

    { id: "yueqin", svg: SVG.yueqin, name: "月琴", alias: "",
      look: "<b>正圓形</b>音箱加長頸，台灣民間的月琴多為<b>兩弦</b>",
      sound: "乾、顆粒感重，<b>一撥一個點、幾乎沒有延音</b>。與人聲輪流「接話」而不是墊在底下",
      where: "恆春民謠（單元 3）、唸歌" },

    { id: "dongxiao", svg: SVG.dongxiao, name: "洞簫", alias: "南管洞簫「十目九節」",
      look: "<b>直立</b>吹奏的竹管，頂端有一個吹口缺角。竹節清楚可見",
      sound: "<b>氣聲明顯、音量小</b>，能把一個音吹得很長。南管的旋律主體",
      where: "南管（單元 1）" },

    { id: "nanpa", svg: SVG.nanpa, name: "南琶", alias: "南管琵琶",
      look: "<b>橫抱</b>——這是視覺上最好認的特徵，姿勢與唐代壁畫相同。琴身形制與現代琵琶相同，<b>差別只在抱法</b>",
      sound: "點狀、乾淨，與洞簫的長音互補：<b>簫走線，琶打點</b>",
      where: "南管（單元 1）" },

    { id: "khakhian", svg: SVG.khakhian, name: "殼仔弦", alias: "",
      look: "<b>椰殼</b>作音箱的擦弦樂器，兩弦，用弓拉",
      sound: "音色偏尖、偏窄，<b>帶鼻音</b>。歌仔戲一開口你就會聽到它在旁邊跟著",
      where: "歌仔戲（單元 4）主奏" },

    { id: "nosefl", svg: SVG.nosefl, name: "雙管鼻笛", alias: "排灣族",
      look: "<b>兩根並列的竹管</b>，用<b>鼻孔</b>吹。通常只有一管開指孔",
      sound: "一管吹<b>不動的持續低音</b>，另一管走旋律——與西方的 drone（持續低音）是同一個原理",
      where: "排灣族（單元 7）" },

    { id: "lubuw", svg: SVG.lubuw, name: "口簧琴", alias: "泰雅族 lubuw",
      look: "竹片或金屬簧片，<b>整件只有手指長</b>，含在口中拉繩振動",
      sound: "<b>音量極小</b>，音色隨口腔形狀改變，接近說話。<b>務必用耳機聽</b>",
      where: "泰雅族（單元 7）" }
  ];

  /* 對照組：三組最容易搞混的，並列兩張圖直接看差別 */
  T.instCompare = [
    { title: "南琶 vs. 現代琵琶",
      a: { svg: SVG.nanpa, name: "南琶（南管）", d: "<b>橫抱</b>。琴身幾乎與地面平行" },
      b: { svg: SVG.pipa, name: "現代琵琶", d: "<b>豎抱</b>。琴身直立、抵在腿上" },
      note: "同源但姿勢不同。<b>看姿勢比看琴身快得多</b>——南管的影片一眼就能認出來。" },

    { title: "洞簫 vs. 笛",
      a: { svg: SVG.dongxiao, name: "洞簫", d: "<b>直吹</b>。氣聲重、音色暗" },
      b: { svg: SVG.dizi, name: "笛", d: "<b>橫吹</b>，且有<b>笛膜孔</b>。音色亮而脆" },
      note: "笛多了一個貼笛膜的孔（圖中方框），那層膜就是它比洞簫刺耳的原因。" },

    { title: "月琴 vs. 琵琶",
      a: { svg: SVG.yueqin, name: "月琴", d: "音箱<b>正圓</b>，多為兩弦" },
      b: { svg: SVG.pipa, name: "琵琶", d: "音箱<b>梨形</b>，四弦" },
      note: "音色也不同：月琴一撥一個點、沒有延音；琵琶能用輪指做出連續的長音。" }
  ];
})();
