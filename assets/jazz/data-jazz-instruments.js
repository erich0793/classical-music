/* 爵士樂．樂器線稿
   與另外兩門課同一套做法：手繪內嵌 SVG，用 currentColor 描邊（深色模式自動變色），
   .hl 標出辨識關鍵。小號、長號、單簧管、低音提琴直接沿用古典課的線稿——
   同一件樂器在兩門課裡長得一樣，這本身就是要讓人看見的事。 */
(function () {
  var C = (window.COURSES = window.COURSES || {});
  var J = (C.jazz = C.jazz || {});
  var K = (C.classical && C.classical.instSVG) || {};

  var S = function (title, body) {
    return '<svg viewBox="0 0 100 100" role="img" aria-label="' + title + '"><title>' + title + "</title>" + body + "</svg>";
  };
  // 以中心縮放，用來畫「同一個形狀、不同尺寸」的真實比例對照
  var G = function (sc, ty, body) {
    return '<g transform="translate(50 ' + ty + ") scale(" + sc + ') translate(-50 -50)">' + body + "</g>";
  };

  /* 薩克斯風家族共用一個 J 字形的管身。中音與次中音的形狀幾乎相同，
     差在尺寸，以及次中音的吹管（脖子）多一個彎——對照圖照真實比例縮放。 */
  var SAX_BODY =
    '<path d="M42 22 L37 74 C36 90 66 94 70 76 L75 58 L62 58 L63 70 C63 80 52 82 51 72 L48 22 Z"/>' +
    '<path d="M62 58 L75 58 L86 46 C80 43 66 43 61 47 Z" class="hl"/>' +
    '<circle cx="43.5" cy="32" r="2.2"/><circle cx="42.5" cy="42" r="2.2"/>' +
    '<circle cx="41.5" cy="52" r="2.2"/><circle cx="40.5" cy="62" r="2.2"/>' +
    '<path d="M46 76 C48 80 54 80 56 77" stroke-width="1.2"/>';
  var ALTO_NECK =
    '<path d="M45 22 C45 15 41 11 34 11" stroke-width="2.8"/>' +
    '<path d="M34 8 L26 10 L27 14 L34 14 Z"/>';
  // 次中音：吹管先往上拱、再彎下來接吹嘴——這個「駝峰」是一眼分辨的地方
  var TENOR_NECK =
    '<path d="M45 22 C45 12 40 6 34 8 C31 9 30 12 28 13" stroke-width="2.8" class="hl"/>' +
    '<path d="M28 10 L20 13 L22 17 L29 15 Z"/>';

  var SVG = {
    trumpet: K.trumpet || "",
    trombone: K.trombone || "",
    clarinet: K.clarinet || "",
    bass: K.bass || "",

    /* 加弱音器的小號：沿用小號線稿，喇叭口塞進一個 Harmon 弱音器。
       辨識關鍵改成弱音器本身，所以把原本喇叭口的填色拿掉。 */
    mute: (K.trumpet || "")
      .replace(/小號線稿/g, "加弱音器的小號線稿")
      .replace(' class="hl"', "")
      .replace("</svg>",
        '<path d="M70 41 C80 39 88 42 90 50 C88 58 80 61 70 59 C67 55 67 45 70 41 Z" class="hl"/>' +
        '<path d="M90 50 H97" stroke-width="2.4"/><circle cx="97" cy="50" r="2"/></svg>'),

    alto: S("中音薩克斯風線稿", ALTO_NECK + SAX_BODY),
    tenor: S("次中音薩克斯風線稿", TENOR_NECK + SAX_BODY.replace(' class="hl"', "")),

    /* 高音薩克斯風：直的。與單簧管最大的差別是管身一路愈來愈粗（圓錐管），
       單簧管則粗細幾乎不變、只在最下面張開 */
    soprano: S("高音薩克斯風線稿",
      '<path d="M48 4 H52 L53 13 H47 Z"/>' +
      '<path d="M47 13 H53 L58 84 C60 88 62 92 63 95 H37 C38 92 40 88 42 84 Z" class="hl"/>' +
      '<circle cx="50" cy="26" r="2"/><circle cx="50" cy="37" r="2.2"/>' +
      '<circle cx="50" cy="49" r="2.4"/><circle cx="50" cy="61" r="2.6"/>' +
      '<circle cx="50" cy="73" r="2.8"/>'),

    /* 爵士鼓：一個人同時操作好幾件。辨識關鍵是右上那片大的 ride 鈸——
       搖擺的「叮、叮ㄉ叮」就是它 */
    drums: S("爵士鼓線稿",
      '<circle cx="50" cy="72" r="18"/><circle cx="50" cy="72" r="5" stroke-width="1.4"/>' +
      '<ellipse cx="50" cy="47" rx="9" ry="3"/><path d="M41 47 V53 C41 56 59 56 59 53 V47" />' +
      '<ellipse cx="23" cy="60" rx="10" ry="3"/><path d="M13 60 V65 C13 68 33 68 33 65 V60"/>' +
      '<path d="M23 68 V92 M18 92 L23 84 L28 92"/>' +
      '<ellipse cx="11" cy="38" rx="8" ry="1.8"/><ellipse cx="11" cy="41" rx="8" ry="1.8"/>' +
      '<path d="M11 43 V92 M6 92 L11 86 L16 92"/>' +
      '<ellipse cx="80" cy="32" rx="16" ry="3.2" class="hl"/>' +
      '<path d="M80 35 V92 M74 92 L80 86 L86 92"/>'),

    /* 平台鋼琴（側面）：琴蓋掀開。鍵盤是辨識關鍵——但真正要聽的是它的兩個角色 */
    piano: S("鋼琴線稿",
      '<path d="M18 44 H82 C90 44 93 50 88 56 H18 Z"/>' +
      '<path d="M20 44 L86 20" stroke-width="2"/><path d="M62 44 L66 28" stroke-width="1.4"/>' +
      '<path d="M4 44 H18 V51 H4 Z" class="hl"/>' +
      '<path d="M7 44 V48 M10 44 V48 M13 44 V48 M16 44 V48" stroke-width="1"/>' +
      '<path d="M22 56 V84 M82 56 V84 M50 56 V76"/>' +
      '<path d="M45 76 H55 M47 76 V86 M53 76 V86"/>'),

    /* 空心 archtop 吉他：爵士吉他的典型樣子，有 f 孔、琴身大而深 */
    guitar: S("爵士吉他線稿",
      '<path d="M50 40 C38 40 32 46 34 54 C35 58 33 60 32 64 C30 76 38 95 50 95 C62 95 70 76 68 64 C67 60 65 58 66 54 C68 46 62 40 50 40 Z" class="hl"/>' +
      '<path d="M47 40 V9 H53 V40"/>' +
      '<path d="M46 9 L45 2 H55 L54 9"/>' +
      '<path d="M47 15 H53 M47 21 H53 M47 27 H53 M47 33 H53" stroke-width="0.9"/>' +
      '<path d="M41 60 C39 66 40 72 42 76 M59 60 C61 66 60 72 58 76" stroke-width="1.3"/>' +
      '<path d="M45 82 H55 L53 89 H47 Z"/>' +
      '<path d="M48.5 9 V82 M51.5 9 V82" stroke-width="0.7"/>')
  };
  // 中音／次中音對照用：同一個管身照真實比例縮放（中音約為次中音的八成）
  SVG.altoSmall = S("中音薩克斯風線稿", G(0.8, 58, ALTO_NECK + SAX_BODY));
  SVG.tenorBig = SVG.tenor;

  J.instruments = [
    { group: "前排：旋律樂器", groupNote: "負責主旋律與獨奏",
      id: "trumpet", svg: SVG.trumpet, name: "小號", alias: "trumpet",
      look: "<b>三個直立的活塞</b>，喇叭口朝前",
      sound: "明亮、直接。爵士最常見的領頭樂器——Louis Armstrong、Dizzy Gillespie、Miles Davis",
      where: "單元 5（Armstrong）、單元 7（Gillespie）、單元 3、8（Miles Davis）" },
    { group: "前排：旋律樂器", id: "mute", svg: SVG.mute, name: "加弱音器的小號", alias: "muted trumpet",
      look: "喇叭口<b>塞著一個金屬的弱音器</b>",
      sound: "像被摀住、帶金屬的嗡鳴，又近又私密。<b>Miles Davis 的招牌聲音</b>",
      where: "單元 3〈'Round Midnight〉的 Miles Davis 版、單元 4 King Oliver 的「哇哇」聲" },
    { group: "前排：旋律樂器", id: "trombone", svg: SVG.trombone, name: "長號", alias: "trombone",
      look: "<b>沒有按鍵，用滑管</b>前後推拉",
      sound: "低、厚，<b>能做出連續的滑音</b>——紐奧良爵士的長號就靠這個把一句推向下一句",
      where: "單元 4（集體即興）、單元 6（大樂團）" },
    { group: "前排：旋律樂器", id: "clarinet", svg: SVG.clarinet, name: "單簧管", alias: "clarinet",
      look: "黑色直管，頂端有吹嘴，<b>管身粗細幾乎不變</b>",
      sound: "圓潤、靈活。紐奧良與搖擺年代的主角之一，比波普之後就少見了",
      where: "單元 4（集體即興）、單元 6（Benny Goodman）" },
    { group: "前排：旋律樂器", id: "alto", svg: SVG.alto, name: "中音薩克斯風", alias: "alto saxophone",
      look: "<b>彎成 J 字形的金屬管</b>，喇叭口朝上。四種薩克斯風裡最常見的尺寸",
      sound: "明亮、靈活，偏高。Charlie Parker、Cannonball Adderley、Paul Desmond",
      where: "單元 7〈Ko-Ko〉、單元 8〈Take Five〉、單元 10〈Lonely Woman〉" },
    { group: "前排：旋律樂器", id: "tenor", svg: SVG.tenor, name: "次中音薩克斯風", alias: "tenor saxophone",
      look: "比中音大一號，<b>吹管（脖子）多一個彎</b>",
      sound: "低、厚，帶沙啞的氣聲。<b>爵士最具代表性的聲音之一</b>",
      where: "單元 3〈Body and Soul〉、單元 2〈Blue Seven〉、單元 10 Coltrane" },
    { group: "前排：旋律樂器", id: "soprano", svg: SVG.soprano, name: "高音薩克斯風", alias: "soprano saxophone",
      look: "<b>直的</b>，像金屬做的單簧管，但<b>管身一路愈來愈粗</b>",
      sound: "最高、最尖，帶一點鼻音",
      where: "單元 10〈My Favorite Things〉" },

    { group: "節奏組", groupNote: "在獨奏者背後提供時間與和聲",
      id: "piano", svg: SVG.piano, name: "鋼琴", alias: "piano",
      look: "平台鋼琴，琴蓋掀開",
      sound: "<b>一人分飾兩角</b>：獨奏時是旋律樂器；替別人伴奏（comping）時，丟出不規則的短和弦",
      where: "單元 1（Basie）、單元 3（Monk）、單元 8（Bill Evans）" },
    { group: "節奏組", id: "bass", svg: SVG.bass, name: "低音提琴", alias: "double bass",
      look: "最大的提琴，立在地上",
      sound: "<b>爵士裡幾乎都用手指撥</b>（pizzicato），很少用弓。walking bass 每拍一個音",
      where: "單元 1，以及每一個單元的最底下" },
    { group: "節奏組", id: "drums", svg: SVG.drums, name: "爵士鼓", alias: "drum kit",
      look: "一個人同時操作好幾件：大鼓、小鼓、hi-hat、<b>ride 鈸</b>",
      sound: "<b>ride 鈸的「叮、叮ㄉ叮」是搖擺的骨架</b>；hi-hat 踩在第 2、4 拍",
      where: "單元 1、單元 7（Max Roach）、單元 9（Art Blakey）" },
    { group: "節奏組", id: "guitar", svg: SVG.guitar, name: "吉他", alias: "archtop guitar",
      look: "爵士常用<b>空心、有 f 孔</b>的 archtop 吉他",
      sound: "搖擺年代多半在節奏組裡每拍刷一下和弦，後來才成為獨奏樂器",
      where: "單元 1（Count Basie 樂團的 Freddie Green）" }
  ];

  J.instCompare = [
    { title: "中音 vs. 次中音薩克斯風（看尺寸與脖子——本圖為真實比例）",
      a: { svg: SVG.altoSmall, name: "中音 alto", d: "較小，<b>吹管幾乎直接接到吹嘴</b>" },
      b: { svg: SVG.tenorBig, name: "次中音 tenor", d: "大一號，<b>吹管先往上拱、再彎下來</b>" },
      note: "形狀幾乎一樣，所以看圖只能靠比例與脖子。<b>聽才是真的判準</b>：中音明亮、偏高；次中音低、厚、帶沙啞的氣聲。Charlie Parker 吹中音，Coleman Hawkins 與 John Coltrane（多數時候）吹次中音。" },

    { title: "單簧管 vs. 高音薩克斯風（兩個都是直的）",
      a: { svg: SVG.clarinet, name: "單簧管 clarinet", d: "黑色木管，<b>粗細幾乎不變</b>，只在最下面張開" },
      b: { svg: SVG.soprano, name: "高音薩克斯風 soprano", d: "金屬管，<b>一路愈來愈粗</b>" },
      note: "聲音上：單簧管圓潤柔軟；高音薩克斯風更尖、更亮，帶鼻音。紐奧良與搖擺年代用單簧管，<b>Coltrane 的〈My Favorite Things〉之後</b>，高音薩克斯風才在爵士裡多起來。" },

    { title: "開放 vs. 加弱音器的小號（看喇叭口）",
      a: { svg: SVG.trumpet, name: "開放 open", d: "喇叭口<b>開著</b>" },
      b: { svg: SVG.mute, name: "加弱音器 muted", d: "喇叭口<b>塞著弱音器</b>" },
      note: "同一把樂器、兩種聲音：開放的小號明亮、直接打到你臉上；加了 Harmon 弱音器，聲音像被摀住、帶金屬嗡鳴、彷彿貼在耳邊。<b>單元 3〈'Round Midnight〉的 Miles Davis 版就是後者</b>。" }
  ];
})();
