/* 古典音樂．管弦樂器線稿
   第 1 週整週在教樂器辨識，自我檢核要求「能單獨辨識小提琴、大提琴、長笛、
   雙簧管、單簧管、小號、法國號、定音鼓」，任務 3 更直接點名三組容易混淆的
   組合——但原本全站沒有任何一張樂器圖，等於只能靠文字把名字對到實物。

   與台灣課同一套做法：手繪內嵌 SVG，用 currentColor 描邊（深色模式自動變色），
   .hl 標出辨識關鍵。不用照片的理由見 README。 */
(function () {
  var C = (window.COURSES = window.COURSES || {});
  var K = (C.classical = C.classical || {});

  var S = function (title, body, extra) {
    return '<svg viewBox="0 0 100 100" role="img" aria-label="' + title + '"' + (extra || "") + ">" +
      "<title>" + title + "</title>" + body + "</svg>";
  };

  /* 提琴家族共用同一組路徑——小提琴、中提琴、大提琴、低音提琴的<b>形狀幾乎相同</b>，
     真正的差別是尺寸。用同一份圖再縮放，正好把這件事畫出來。 */
  function violinBody(cls) {
    return '<path d="M50 38 C39 38 32 45 32 54 C32 60 36 63 36 66 C36 69 30 72 30 80 C30 90 39 96 50 96 C61 96 70 90 70 80 C70 72 64 69 64 66 C64 63 68 60 68 54 C68 45 61 38 50 38 Z" class="' + (cls || "hl") + '"/>' +
      '<path d="M43 65 C41 70 42 77 44 79" stroke-width="1.3"/>' +
      '<path d="M57 65 C59 70 58 77 56 79" stroke-width="1.3"/>' +
      '<path d="M46 10 V42 H54 V10"/>' +
      '<path d="M46 10 C41 4 50 0 54 4 C57 8 52 10 50 7"/>' +
      '<path d="M47 6 V88 M50 6 V88 M53 6 V88" stroke-width="0.8"/>' +
      '<path d="M43 74 H57"/>';
  }
  var VIOLIN = violinBody();
  // 大提琴／低音提琴多一根腳柱（endpin）——靠地面立著，不是夾在下巴
  var ENDPIN = '<path d="M50 96 V99" stroke-width="2.6"/>';

  var G = function (sc, ty, body) {
    return '<g transform="translate(50 ' + ty + ') scale(' + sc + ') translate(-50 -50)">' + body + "</g>";
  };

  var SVG = {
    violin: S("小提琴線稿", VIOLIN),
    viola: S("中提琴線稿", VIOLIN),
    cello: S("大提琴線稿", VIOLIN + ENDPIN),
    bass: S("低音提琴線稿", VIOLIN + ENDPIN),

    /* 尺寸對照用：同一張圖依真實比例縮放後並列 */
    violaSmall: S("中提琴（依真實比例縮小）", G(0.62, 62, VIOLIN)),
    celloBig: S("大提琴（依真實比例）", G(1, 50, VIOLIN + ENDPIN)),

    /* 豎琴：辨識關鍵＝左直柱＋上彎頸＋右斜共鳴箱組成的三角形，弦張在中間 */
    harp: S("豎琴線稿",
      '<path d="M26 88 L62 18 L74 22 L40 90 Z" class="hl"/>' +
      '<path d="M22 26 C34 10 52 6 68 14" stroke-width="2.6"/>' +
      '<path d="M22 26 V88" stroke-width="2.6"/>' +
      '<path d="M16 90 H46" stroke-width="2.6"/>' +
      '<path d="M30 24 V79 M36 22 V68 M42 21 V57 M48 20 V46 M54 18 V35 M59 17 V26" stroke-width="0.9"/>'),

    /* 長笛：辨識關鍵＝橫吹、金屬、有按鍵 */
    flute: S("長笛線稿",
      '<rect x="8" y="45" width="86" height="10" rx="5"/>' +
      '<circle cx="22" cy="50" r="2.6" class="hl"/>' +
      '<circle cx="42" cy="50" r="2.6"/><circle cx="52" cy="50" r="2.6"/>' +
      '<circle cx="62" cy="50" r="2.6"/><circle cx="72" cy="50" r="2.6"/>' +
      '<path d="M40 42 H76" stroke-width="1.2"/>' +
      '<path d="M8 45 V55"/>'),

    /* 雙簧管：辨識關鍵＝頂端一小片雙簧片，沒有吹嘴；下端小喇叭口 */
    oboe: S("雙簧管線稿",
      '<path d="M48 4 H52 L51 13 H49 Z" class="hl"/>' +
      '<path d="M46 13 H54 L57 78 H43 Z"/>' +
      '<circle cx="50" cy="24" r="1.8"/><circle cx="50" cy="34" r="1.8"/>' +
      '<circle cx="50" cy="44" r="1.8"/><circle cx="50" cy="54" r="1.8"/>' +
      '<circle cx="50" cy="64" r="1.8"/>' +
      '<path d="M43 78 C40 86 38 90 37 95 H63 C62 90 60 86 57 78 Z" class="hl"/>'),

    /* 單簧管：辨識關鍵＝楔形吹嘴（單簧片）；喇叭口比雙簧管張得開 */
    clarinet: S("單簧管線稿",
      '<path d="M46 4 H54 L53 16 H47 Z" class="hl"/>' +
      '<path d="M46 12 L53 15" stroke-width="1.2"/>' +
      '<path d="M45 16 H55 L56 76 H44 Z"/>' +
      '<circle cx="50" cy="26" r="1.8"/><circle cx="50" cy="36" r="1.8"/>' +
      '<circle cx="50" cy="46" r="1.8"/><circle cx="50" cy="56" r="1.8"/>' +
      '<circle cx="50" cy="66" r="1.8"/>' +
      '<path d="M44 76 C38 86 33 90 30 96 H70 C67 90 62 86 56 76 Z" class="hl"/>'),

    /* 低音管：辨識關鍵＝很長、頂端伸出一根彎曲的金屬吹管（bocal） */
    bassoon: S("低音管線稿",
      '<path d="M40 20 C30 14 24 10 20 6" class="hl"/>' +
      '<circle cx="19" cy="5" r="2.4" class="hl"/>' +
      '<rect x="38" y="20" width="11" height="74" rx="4"/>' +
      '<rect x="52" y="30" width="11" height="64" rx="4"/>' +
      '<path d="M38 94 H63"/>' +
      '<circle cx="43.5" cy="38" r="1.6"/><circle cx="43.5" cy="50" r="1.6"/>' +
      '<circle cx="43.5" cy="62" r="1.6"/><circle cx="43.5" cy="74" r="1.6"/>'),

    /* 小號：辨識關鍵＝三個直立活塞、喇叭口朝前 */
    trumpet: S("小號線稿",
      '<path d="M14 50 H62"/>' +
      '<path d="M62 36 C78 36 88 42 92 50 C88 58 78 64 62 64 Z" class="hl"/>' +
      '<rect x="30" y="34" width="7" height="16" rx="2"/>' +
      '<rect x="41" y="34" width="7" height="16" rx="2"/>' +
      '<rect x="52" y="34" width="7" height="16" rx="2"/>' +
      '<path d="M14 44 C6 44 6 56 14 56 Z"/>' +
      '<path d="M20 50 C20 62 40 62 40 50" stroke-width="1.4"/>'),

    /* 法國號：辨識關鍵＝盤成一圈的管身＋極寬的喇叭口 */
    horn: S("法國號線稿",
      '<circle cx="44" cy="50" r="26" class="hl"/>' +
      '<circle cx="44" cy="50" r="17"/>' +
      '<path d="M62 68 C74 76 84 80 92 82 C90 70 86 60 78 52" class="hl"/>' +
      '<path d="M22 34 C14 28 10 24 6 20" stroke-width="1.8"/>' +
      '<circle cx="5" cy="19" r="2.2"/>'),

    /* 長號：辨識關鍵＝兩根平行的伸縮滑管 */
    trombone: S("長號線稿",
      '<path d="M8 44 H66 M8 56 H60" stroke-width="2.4"/>' +
      '<path d="M8 44 C2 44 2 56 8 56"/>' +
      '<path d="M66 32 C82 32 92 40 96 50 C92 60 82 68 66 68 Z" class="hl"/>' +
      '<path d="M30 40 V60" stroke-width="1.4"/>' +
      '<path d="M60 56 C64 56 66 54 66 50" stroke-width="1.8"/>' +
      '<path d="M24 38 H36" stroke-width="1.4"/>'),

    /* 低音號：辨識關鍵＝巨大且朝上的喇叭口（下窄上寬） */
    tuba: S("低音號線稿",
      '<path d="M43 50 C38 36 32 22 27 12 H73 C68 22 62 36 57 50 Z" class="hl"/>' +
      '<ellipse cx="50" cy="12" rx="23" ry="5" class="hl"/>' +
      '<path d="M43 50 C36 62 38 78 46 86" stroke-width="2.4"/>' +
      '<path d="M57 50 C64 62 62 78 54 86" stroke-width="2.4"/>' +
      '<path d="M46 86 C48 91 52 91 54 86"/>' +
      '<rect x="35" y="58" width="6" height="13" rx="2"/>' +
      '<rect x="44" y="62" width="6" height="13" rx="2"/>' +
      '<rect x="53" y="62" width="6" height="13" rx="2"/>'),

    /* 定音鼓：辨識關鍵＝半球形銅鍋＋鼓面 */
    timpani: S("定音鼓線稿",
      '<ellipse cx="50" cy="34" rx="34" ry="11" class="hl"/>' +
      '<path d="M16 34 C16 62 30 78 50 78 C70 78 84 62 84 34"/>' +
      '<path d="M22 40 V33 M34 44 V32 M50 45 V32 M66 44 V32 M78 40 V33" stroke-width="1.3"/>' +
      '<path d="M40 78 L34 94 M60 78 L66 94"/>' +
      '<path d="M50 78 V92 M40 92 H62" stroke-width="1.6"/>')
  };
  K.instSVG = SVG;

  K.instruments = [
    { group: "弦樂", groupNote: "四件形狀幾乎相同，差別是尺寸——所以真正要練的是「聽音高範圍」",
      id: "violin", svg: SVG.violin, name: "小提琴", alias: "violin",
      look: "家族中<b>最小</b>，夾在下巴與肩膀之間",
      sound: "<b>音域最高</b>、最亮。管弦樂團裡人數最多，旋律多半在這裡",
      where: "幾乎每一週" },
    { group: "弦樂", id: "viola", svg: SVG.viola, name: "中提琴", alias: "viola",
      look: "與小提琴<b>幾乎一模一樣</b>，只是大一點（琴身約大 15%）",
      sound: "比小提琴低、<b>音色偏暗偏鈍</b>，帶一點鼻音。常被形容為「聽起來悶悶的」",
      where: "第 1 週 Britten 變奏 F" },
    { group: "弦樂", id: "cello", svg: SVG.cello, name: "大提琴", alias: "cello",
      look: "<b>立在地上</b>，用腳柱撐著，夾在兩膝之間",
      sound: "<b>最接近人聲中低音</b>，歌唱性最強。Britten 那段最抒情的變奏就是它",
      where: "第 1 週變奏 G、第 6 週無伴奏組曲" },
    { group: "弦樂", id: "bass", svg: SVG.bass, name: "低音提琴", alias: "double bass",
      look: "<b>最大</b>，通常站著拉或坐高腳椅",
      sound: "<b>最低沉、最笨重</b>，常帶點滑稽感。多半在底下撐和聲，很少當主角",
      where: "第 1 週變奏 H" },

    { group: "木管", groupNote: "同樣是黑色直管，靠「頂端長什麼樣」分辨最快",
      id: "flute", svg: SVG.flute, name: "長笛", alias: "flute",
      look: "<b>金屬製、橫吹</b>，吹口是一個橢圓孔，不含在嘴裡",
      sound: "<b>最高、最輕盈</b>，沒有簧片的沙沙聲。Britten 的第一段變奏就是它",
      where: "第 1 週變奏 A、第 18 週《牧神的午後》" },
    { group: "木管", id: "oboe", svg: SVG.oboe, name: "雙簧管", alias: "oboe",
      look: "<b>頂端只有一小片雙簧片</b>，沒有吹嘴。管身錐形，喇叭口小",
      sound: "<b>鼻音明顯</b>、略帶哀愁，穿透力強。<b>樂團調音就是聽它的 A 音</b>",
      where: "第 1 週變奏 B" },
    { group: "木管", id: "clarinet", svg: SVG.clarinet, name: "單簧管", alias: "clarinet",
      look: "<b>頂端有楔形吹嘴</b>（含在嘴裡），下端喇叭口比雙簧管張得開",
      sound: "<b>圓潤、沒有鼻音</b>，音域跨度極大，能吹很流暢的快速音群",
      where: "第 1 週變奏 C、第 14 週被扭曲的 idée fixe" },
    { group: "木管", id: "bassoon", svg: SVG.bassoon, name: "低音管", alias: "bassoon",
      look: "<b>很長、對折成兩管</b>，頂端伸出一根彎曲的金屬吹管",
      sound: "低沉<b>帶詼諧感</b>。《彼得與狼》裡的爺爺就是它",
      where: "第 1 週變奏 D" },

    { group: "銅管", groupNote: "全部靠嘴唇振動發聲，差別在「管子怎麼繞」與「喇叭口多大」",
      id: "horn", svg: SVG.horn, name: "法國號", alias: "horn",
      look: "<b>管身盤成一圈</b>，喇叭口極寬且朝後（演奏者的手伸進去）",
      sound: "<b>圓潤、帶回音感</b>，像從遠處傳來。與小號最大的差別就在這個「柔」",
      where: "第 1 週變奏 J、第 17 週狩獵段落" },
    { group: "銅管", id: "trumpet", svg: SVG.trumpet, name: "小號", alias: "trumpet",
      look: "<b>三個直立的活塞</b>，管身接近直的，喇叭口朝前",
      sound: "<b>明亮、尖銳、直接</b>。適合快速斷奏與宣示性的段落",
      where: "第 1 週變奏 K" },
    { group: "銅管", id: "trombone", svg: SVG.trombone, name: "長號", alias: "trombone",
      look: "<b>沒有按鍵，用滑管</b>——兩根平行的管子前後推拉",
      sound: "厚重，<b>能做出連續的滑音</b>（其他銅管做不到）。《波麗露》第 11 次就是它",
      where: "第 1 週變奏 L、第 18 週《波麗露》" },
    { group: "銅管", id: "tuba", svg: SVG.tuba, name: "低音號", alias: "tuba",
      look: "<b>最大，喇叭口朝上</b>，抱在腿上演奏",
      sound: "銅管家族<b>最低</b>，是整個樂團的地基",
      where: "第 1 週變奏 L" },

    { group: "打擊與其他", id: "timpani", svg: SVG.timpani, name: "定音鼓", alias: "timpani",
      look: "<b>半球形的銅鍋</b>上蒙鼓面，鼓緣一圈調音螺栓，下方有踏板",
      sound: "<b>打擊樂器中少數有明確音高的</b>——這是它與大鼓、小鼓的根本差別",
      where: "第 1 週變奏 M 開頭、第 11 週貝多芬" },
    { group: "打擊與其他", id: "harp", svg: SVG.harp, name: "豎琴", alias: "harp",
      look: "<b>三角形外框</b>，弦張在斜面上，坐著用雙手撥",
      sound: "<b>琶音與滑奏</b>一聽就認得出來，沒有第二件樂器會那樣響",
      where: "第 1 週變奏 I、第 18 週印象派" }
  ];

  /* 對照組＝第 1 週任務 3 直接點名的三組 */
  K.instCompare = [
    { title: "雙簧管 vs. 單簧管（看頂端）",
      a: { svg: SVG.oboe, name: "雙簧管 oboe", d: "頂端<b>只有一小片雙簧片</b>，沒有吹嘴。喇叭口小" },
      b: { svg: SVG.clarinet, name: "單簧管 clarinet", d: "頂端有<b>楔形吹嘴</b>（單簧片）。喇叭口張得開" },
      note: "聲音上最快的判準是<b>鼻音</b>：雙簧管有，單簧管沒有。單簧管圓潤、音域跨度大；雙簧管窄而尖、帶哀愁。<b>樂團調音時吹 A 音的那個就是雙簧管。</b>" },

    { title: "小號 vs. 法國號（看管子怎麼繞）",
      a: { svg: SVG.trumpet, name: "小號 trumpet", d: "管身接近<b>直的</b>，三個直立活塞，喇叭口朝前" },
      b: { svg: SVG.horn, name: "法國號 horn", d: "管身<b>盤成一圈</b>，喇叭口極寬且朝後" },
      note: "聲音差別比外形更大：小號<b>明亮尖銳、直接打到你臉上</b>；法國號<b>圓潤帶回音感、像從遠處傳來</b>。這是因為法國號的喇叭口朝後、演奏者的手還伸在裡面。" },

    { title: "中提琴 vs. 大提琴（看尺寸——本圖為真實比例）",
      a: { svg: SVG.violaSmall, name: "中提琴 viola", d: "<b>夾在下巴</b>與肩膀之間。琴身約 40 cm" },
      b: { svg: SVG.celloBig, name: "大提琴 cello", d: "<b>立在地上</b>，用腳柱撐著。琴身約 75 cm" },
      note: "<b>形狀一樣，差別只有大小與姿勢</b>——所以看圖只能靠比例，聽才是真的判準：中提琴偏暗偏鈍、帶鼻音；大提琴接近人聲中低音，歌唱性強得多。" }
  ];

  K.pages = [{
    id: "p-orch", icon: "器", title: "樂器圖鑑", en: "Know the Orchestra by Sight",
    blocks: [
      { p: "第 1 週的自我檢核要求「能單獨辨識小提琴、大提琴、長笛、雙簧管、單簧管、小號、法國號、定音鼓」，任務 3 更直接點名三組最容易混淆的組合。<b>這一頁就是那份對照表。</b>" },
      { banner: "<b>圖是手繪線稿，不是照片。</b>辨識樂器真正要看的是<b>輪廓與演奏姿勢</b>——長笛要看橫吹、大提琴要看立在地上、法國號要看盤成一圈。圖中<b>填色的部分就是辨識關鍵</b>。" },
      { instcards: true },
      { h3: "第 1 週任務 3 點名的三組", tier: "選" },
      { p: "這三組用文字說不清楚，直接看圖最快。" },
      { instcompare: true },
      { h3: "配合 Britten 使用", tier: "選" },
      { p: "第 1 週的必聽曲《青少年管弦樂入門》<b>就是照著這個順序展示樂器的</b>：長笛與短笛 → 雙簧管 → 單簧管 → 低音管 → 小提琴 → 中提琴 → 大提琴 → 低音提琴 → 豎琴 → 法國號 → 小號 → 長號與低音號 → 打擊。<b>把這一頁開在旁邊，邊聽邊對。</b>" },
      { note: "<b>建議做法：</b>每認一件樂器，就單獨搜尋它的<b>獨奏曲</b>聽 2 分鐘，並把影片裡的實物與線稿對一次。這正是第 1 週任務 3 要你做的事。" }
    ]
  }];
})();