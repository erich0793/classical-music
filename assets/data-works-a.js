/* 曲目資料庫 A：第 1–11 週
   qa（音質推估）：hires = Hi-Res 優先；hifi = Hi-Fi 無損；historic = 歷史錄音
   標籤 t：ref=公認代表版 / period=古樂器 / modern=現代樂器 / entry=入門友善 / narrated=附旁白 */
window.WORKS = Object.assign(window.WORKS || {}, {

  "britten-ypg": {
    title: "Britten《青少年管弦樂入門》Op. 34",
    en: "The Young Person's Guide to the Orchestra",
    composer: "Benjamin Britten",
    q: "Britten Young Person's Guide to the Orchestra",
    fact: "作於 1946 年，原為英國教育影片配樂，全曲以 Purcell 之主題為基礎，依序展示管弦樂團各樂器組，其設計目的即為樂器辨識教學。",
    pick: "附旁白版（narrated）優先，若無則任何版本皆可。",
    versions: [
      { p: "Simon Rattle / City of Birmingham SO", l: "EMI／Warner", y: 1990, qa: "hires", t: ["ref"], q: "Britten Young Person's Guide Rattle", w: "數位錄音、聲部分離清晰，最適合本週的「聽出樂器」任務。" },
      { p: "Marin Alsop / Bournemouth SO", l: "Naxos", y: 2004, qa: "hires", t: ["entry"], q: "Britten Young Person's Guide Alsop", w: "近年錄音，動態自然，Naxos 曲庫在 KKBOX 上通常齊全。" },
      { p: "Leonard Bernstein / New York Phil", l: "Sony", y: 1961, qa: "hifi", t: ["narrated"], q: "Britten Young Person's Guide Bernstein", w: "伯恩斯坦親自解說的旁白版，教學性最強。" },
      { p: "André Previn / London SO", l: "EMI", y: 1972, qa: "hifi", t: [], q: "Britten Young Person's Guide Previn", w: "類比時代名盤，音色溫暖。" }
    ]
  },

  "prokofiev-peter": {
    title: "Prokofiev《彼得與狼》Op. 67",
    en: "Peter and the Wolf",
    composer: "Sergei Prokofiev",
    q: "Prokofiev Peter and the Wolf",
    pick: "任意版本皆可；此曲刻意將「角色—樂器」一對一綁定，是最有效的記憶錨點。",
    life: "長年作為全世界兒童音樂教育的標準教材——很多人第一次認識管弦樂團的樂器就是靠這首。",
    versions: [
      { p: "Claudio Abbado / Chamber Orch of Europe（旁白：Sting）", l: "DG", y: 1990, qa: "hires", t: ["ref", "narrated"], q: "Prokofiev Peter and the Wolf Abbado Sting", w: "DG 數位錄音 + Sting 旁白，錄音與演奏皆為現行首選。" },
      { p: "Eugene Ormandy / Philadelphia（旁白：David Bowie）", l: "RCA", y: 1978, qa: "hifi", t: ["narrated"], q: "Prokofiev Peter and the Wolf David Bowie", w: "最著名的旁白版之一，Bowie 的敘事節奏極佳。" },
      { p: "Leonard Bernstein / New York Phil", l: "Sony", y: 1960, qa: "hifi", t: ["narrated"], q: "Prokofiev Peter and the Wolf Bernstein", w: "伯恩斯坦旁白版，語速較慢，適合初次接觸。" }
    ]
  },

  "saintsaens-carnival": {
    title: "Saint-Saëns《動物狂歡節》",
    en: "Le Carnaval des animaux",
    composer: "Camille Saint-Saëns",
    q: "Saint-Saens Carnival of the Animals",
    pick: "任意版本。每段各以不同樂器組合描繪一種動物，是樂器辨識的絕佳補充教材。",
    life: "其中的〈天鵝〉是芭蕾獨舞《垂死的天鵝》所用的音樂，也是大提琴最常被單獨演奏的小品之一。",
    versions: [
      { p: "Charles Dutoit / London Sinfonietta（Rogé & Ortiz 雙鋼琴）", l: "Decca", y: 1980, qa: "hifi", t: ["ref"], q: "Saint-Saens Carnival of the Animals Dutoit Roge", w: "Decca 錄音平衡，樂器線條乾淨。" },
      { p: "André Previn / Vienna Phil", l: "Philips／Decca", y: 1987, qa: "hires", t: [], q: "Saint-Saens Carnival of the Animals Previn Vienna", w: "數位錄音，維也納愛樂音色厚實。" },
      { p: "Leonard Bernstein / New York Phil", l: "Sony", y: 1962, qa: "hifi", t: ["narrated"], q: "Saint-Saens Carnival of the Animals Bernstein", w: "含解說版本，可與《彼得與狼》連聽。" }
    ]
  },

  "gregorian": {
    title: "葛利果聖歌",
    en: "Gregorian Chant",
    composer: "（中世紀單旋律聖歌）",
    q: "Gregorian Chant",
    texture: "單音織體 Monophony",
    bg: "中世紀教會禮儀所用的單旋律拉丁文聖歌，因傳說由教宗額我略一世（Gregory I）整理而得名——<b>此歸屬為後世傳說，非史實</b>。它同時是西方記譜法的起點：為了讓各地修道院唱得一致，九世紀起發展出符號記譜，最終演化成今天的五線譜。沒有伴奏、沒有小節線，節奏跟著拉丁文歌詞的重音走——這也是為什麼它聽起來「沒有拍子」。",
    versions: [
      { p: "Coro de Monjes del Monasterio de Silos", l: "EMI", y: 1973, qa: "hifi", t: ["ref"], q: "Gregorian Chant Monks of Santo Domingo de Silos", w: "1994 年再發行後成為全球最暢銷的聖歌錄音，也是最容易在串流上找到的版本。" },
      { p: "Ensemble Organum / Marcel Pérès", l: "Harmonia Mundi", y: 1990, qa: "hires", t: [], q: "Ensemble Organum Chant Gregorien Peres", w: "學術性強、裝飾唱法還原度高；HM 曲庫多有高解析。" },
      { p: "Choralschola der Wiener Hofburgkapelle", l: "DG Archiv", y: 1990, qa: "hifi", t: [], q: "Gregorian Chant Wiener Hofburgkapelle", w: "音色乾淨中性，適合單純辨識「只有一條線」的織體特徵。" }
    ]
  },

  "chopin-noc9-2": {
    title: "Chopin 夜曲 Op. 9 No. 2",
    en: "Nocturne in E-flat major, Op. 9 No. 2",
    composer: "Frédéric Chopin",
    q: "Chopin Nocturne Op 9 No 2",
    texture: "主音織體 Homophony",
    bg: "蕭邦二十歲左右出版的第一組夜曲之一，也是他流傳最廣的作品。<b>夜曲（nocturne）並非蕭邦所創</b>，而是愛爾蘭作曲家 John Field 的發明；蕭邦承接後把它推到極致——左手的分解和弦鋪出寬廣音域，右手則像歌劇詠嘆調一樣自由裝飾。主題反覆出現三次，每次的裝飾音都更繁複，這是他向義大利美聲唱法借來的手法。",
    versions: [
      { p: "Arthur Rubinstein", l: "RCA", y: 1965, qa: "hifi", t: ["ref"], q: "Chopin Nocturnes Rubinstein", w: "夜曲全集的長年基準版，句法自然不誇飾。" },
      { p: "Maria João Pires", l: "DG", y: 1996, qa: "hires", t: ["ref"], q: "Chopin Nocturnes Pires", w: "數位錄音時代的代表版，鋼琴音色捕捉極佳，高解析首選。" },
      { p: "Jan Lisiecki", l: "DG", y: 2021, qa: "hires", t: [], q: "Chopin Nocturnes Lisiecki", w: "近年新錄音，24bit 高解析發行機率最高。" },
      { p: "Claudio Arrau", l: "Philips", y: 1978, qa: "hifi", t: [], q: "Chopin Nocturnes Arrau", w: "速度較慢、聲部層次分明，適合追蹤左右手關係。" }
    ]
  },

  "bach-artoffugue": {
    title: "Bach《賦格的藝術》Contrapunctus 1",
    en: "Die Kunst der Fuge, BWV 1080",
    composer: "J.S. Bach",
    q: "Bach Art of Fugue Contrapunctus 1",
    texture: "複音織體 Polyphony",
    bg: "巴赫最後的作品之一，1740 年代晚期著手，未完成即逝世。全曲只用<b>一個 d 小調主題</b>，以各種對位技法寫成 14 首賦格與 4 首卡農。最特別的是巴赫<b>沒有指定樂器</b>——樂譜寫成四行開放總譜，所以大鍵琴、鋼琴、管風琴、弦樂四重奏、管樂合奏的版本都成立。最後一首賦格在他寫入 B-A-C-H（德式音名：降B-A-C-B，以自己的名字構成的動機）之後戛然而止。",
    versions: [
      { p: "Pierre-Laurent Aimard（鋼琴）", l: "DG", y: 2008, qa: "hires", t: ["ref"], q: "Bach Art of Fugue Aimard", w: "鋼琴版，聲部以觸鍵分層，最容易追蹤個別旋律線。高解析首選。" },
      { p: "Akademie für Alte Musik Berlin（合奏）", l: "Harmonia Mundi", y: 2019, qa: "hires", t: ["period"], q: "Bach Art of Fugue Akademie fur Alte Musik", w: "以不同樂器承擔各聲部，四條線分得最開，本週任務最好懂的版本。" },
      { p: "Angela Hewitt（鋼琴）", l: "Hyperion", y: 2014, qa: "hires", t: [], q: "Bach Art of Fugue Hewitt", w: "咬字清楚、速度中庸，教學上非常可靠。" },
      { p: "Glenn Gould", l: "Sony", y: 1962, qa: "historic", t: [], q: "Bach Art of Fugue Gould", w: "管風琴／鋼琴片段錄音，詮釋極具個性，但非本週首選。" }
    ]
  },

  "haydn-94": {
    title: "Haydn 第 94 號交響曲《驚愕》",
    en: "Symphony No. 94 in G major 'Surprise', Hob. I:94",
    composer: "Joseph Haydn",
    q: "Haydn Symphony 94 Surprise",
    form: "第二樂章＝主題與變奏",
    fact: "別名「驚愕」源於第二樂章中一次突如其來的強奏（fortissimo）和弦，位於樂章開頭主題第一次呈示之後。",
    versions: [
      { p: "Marc Minkowski / Les Musiciens du Louvre", l: "Naïve", y: 2009, qa: "hires", t: ["period", "ref"], q: "Haydn London Symphonies Minkowski", w: "古樂器、對比銳利，那一記「驚愕」和弦效果最強。近年錄音，高解析機率高。" },
      { p: "Colin Davis / Concertgebouw", l: "Philips", y: 1981, qa: "hifi", t: ["modern", "ref"], q: "Haydn Symphony 94 Colin Davis", w: "現代樂器的標準參照，句法端正。" },
      { p: "Herbert von Karajan / Berlin Phil", l: "DG", y: 1982, qa: "hifi", t: ["modern"], q: "Haydn Symphony 94 Karajan", w: "音色豐厚、規模較大，可作為與古樂器版的對照組。" },
      { p: "Bruno Weil / Tafelmusik", l: "Sony Vivarte", y: 1994, qa: "hifi", t: ["period"], q: "Haydn Symphony 94 Bruno Weil Tafelmusik", w: "古樂器版另一選擇，速度輕快。" }
    ]
  },

  "mozart-k525": {
    title: "Mozart《小夜曲》K. 525",
    en: "Eine kleine Nachtmusik, K. 525",
    composer: "W.A. Mozart",
    q: "Mozart Eine kleine Nachtmusik K 525",
    form: "第一樂章＝奏鳴曲式（第 8 週深入）",
    bg: "1787 年作於維也納，標題直譯就是「一首小夜曲」。莫札特在自己的作品目錄中記為<b>五個樂章</b>，但流傳至今只有四個——其中一個小步舞曲樂章失傳了。這是他最家喻戶曉的作品，但寫作目的與委託者至今不明。",
    versions: [
      { p: "Orpheus Chamber Orchestra", l: "DG", y: 1988, qa: "hires", t: ["ref"], q: "Mozart Eine kleine Nachtmusik Orpheus Chamber Orchestra", w: "無指揮室內樂團，聲部平衡極佳，結構聽得最清楚。" },
      { p: "Neville Marriner / Academy of St Martin in the Fields", l: "Philips", y: 1985, qa: "hifi", t: ["entry"], q: "Mozart Eine kleine Nachtmusik Marriner", w: "最普及的版本，速度與句法都很標準。" },
      { p: "Herbert von Karajan / Berlin Phil", l: "DG", y: 1980, qa: "hifi", t: [], q: "Mozart Eine kleine Nachtmusik Karajan", w: "大編制、線條圓潤的讀法。" }
    ]
  },

  "beethoven-elise": {
    title: "Beethoven《給愛麗絲》",
    en: "Für Elise, WoO 59",
    composer: "Ludwig van Beethoven",
    q: "Beethoven Fur Elise",
    form: "迴旋曲式 Rondo（主題回歸三次）",
    life: "<b>台灣垃圾車的旋律之一</b>（另一首是巴達捷芙斯卡的《少女的祈禱》）。你大概已經聽過它幾千次了——這週請把它當一首曲子聽，而不是當作要倒垃圾的信號。",
    versions: [
      { p: "Wilhelm Kempff", l: "DG", y: 1965, qa: "hifi", t: ["ref"], q: "Beethoven Fur Elise Kempff", w: "句法質樸，主題每次回歸都很好辨認。" },
      { p: "Alfred Brendel", l: "Philips", y: 1985, qa: "hifi", t: [], q: "Beethoven Bagatelles Brendel", w: "結構感清楚，收錄於小品集中。" },
      { p: "András Schiff", l: "ECM", y: 2006, qa: "hires", t: [], q: "Beethoven Fur Elise Schiff", w: "ECM 錄音質感佳，高解析機率高。" }
    ]
  },

  "mozart-40": {
    title: "Mozart 第 40 號交響曲 K. 550",
    en: "Symphony No. 40 in G minor, K. 550",
    composer: "W.A. Mozart",
    q: "Mozart Symphony No 40 K 550",
    key: "g 小調 — 小調的緊張感",
    bg: "1788 年夏天，莫札特在約六到八週內連續完成第 39、40、41 三首交響曲——這是他最後三首，而且<b>沒有證據顯示曾在他生前演出</b>。第 40 號是他僅有的兩首小調交響曲之一（另一首是第 25 號，同為 g 小調）。全曲由一個簡單的下行二度動機貫穿；開頭幾乎沒有前奏就直接切入主題，在當時極不尋常。",
    versions: [
      { p: "Karl Böhm / Berlin Phil", l: "DG", y: 1962, qa: "hifi", t: ["ref", "modern"], q: "Mozart Symphony 40 Bohm", w: "課程指定版之一。速度穩、結構清楚，最適合第 8 週找再現部。" },
      { p: "Nikolaus Harnoncourt / Concentus Musicus Wien", l: "Sony", y: 2014, qa: "hires", t: ["period", "ref"], q: "Mozart Symphony 40 Harnoncourt", w: "課程指定版之一。重音與articulation 極為刻意，主題輪廓最鮮明。近年錄音，高解析首選。" },
      { p: "Teodor Currentzis / MusicAeterna", l: "Sony", y: 2016, qa: "hires", t: ["period"], q: "Mozart Symphony 40 Currentzis", w: "極端對比、速度激烈，是「小調緊張感」最戲劇化的示範。" },
      { p: "Bruno Walter / Columbia SO", l: "Sony", y: 1959, qa: "historic", t: [], q: "Mozart Symphony 40 Bruno Walter", w: "歌唱性的經典讀法，音質為早期立體聲。" }
    ]
  },

  "mozart-41": {
    title: "Mozart 第 41 號交響曲《朱庇特》K. 551",
    en: "Symphony No. 41 in C major 'Jupiter', K. 551",
    composer: "W.A. Mozart",
    q: "Mozart Symphony No 41 Jupiter",
    key: "C 大調 — 大調的開闊感；末樂章五主題對位疊置",
    bg: "「朱庇特」這個別名<b>並非莫札特所取</b>，一般認為出自倫敦的演出經紀人 Johann Peter Salomon——也就是邀請海頓赴倫敦的那位。末樂章的尾聲把五個主題同時疊在一起做對位，被視為十八世紀器樂寫作的技術頂點。這是莫札特最後一首交響曲，完成後三年他即去世。",
    versions: [
      { p: "Charles Mackerras / Scottish Chamber Orchestra", l: "Linn", y: 2007, qa: "hires", t: ["ref"], q: "Mozart Symphony 41 Jupiter Mackerras", w: "Linn Records 以高解析發行著稱，本版是「錄音規格 + 詮釋」兼顧的最佳解。末樂章五條線分得極清楚。" },
      { p: "Karl Böhm / Berlin Phil", l: "DG", y: 1962, qa: "hifi", t: ["modern"], q: "Mozart Symphony 41 Jupiter Bohm", w: "與第 40 號同一套錄音，便於做大小調的直接對比。" },
      { p: "Nikolaus Harnoncourt / Concentus Musicus Wien", l: "Sony", y: 2014, qa: "hires", t: ["period"], q: "Mozart Symphony 41 Jupiter Harnoncourt", w: "與第 40 號同一套，對比條件最一致。" },
      { p: "Leonard Bernstein / Vienna Phil", l: "DG", y: 1984, qa: "hifi", t: [], q: "Mozart Symphony 41 Jupiter Bernstein", w: "規模宏大的浪漫化讀法。" }
    ]
  },

  "bach-wtc1-prelude": {
    title: "Bach《平均律》第一冊 第 1 首前奏曲 BWV 846",
    en: "Well-Tempered Clavier Book 1, Prelude in C major",
    composer: "J.S. Bach",
    q: "Bach Well-Tempered Clavier Book 1 Prelude C major",
    key: "無旋律，只有分解和弦——純粹的和聲流動",
    life: "古諾（Gounod）把這首前奏曲原封不動當成伴奏，在上面加了一條新旋律，就成了家喻戶曉的《聖母頌 Ave Maria》。這是「和聲本身就足以撐起一首曲子」最直接的證明。",
    versions: [
      { p: "Sviatoslav Richter", l: "RCA／Melodiya", y: 1973, qa: "hifi", t: ["ref"], q: "Bach Well-Tempered Clavier Richter", w: "課程指定版之一。速度沉穩、觸鍵中性，最適合觀察和聲的穩定與推進。" },
      { p: "Angela Hewitt", l: "Hyperion", y: 2008, qa: "hires", t: ["ref"], q: "Bach Well-Tempered Clavier Hewitt", w: "重錄版本，錄音規格最好，高解析首選。" },
      { p: "András Schiff", l: "ECM", y: 2012, qa: "hires", t: [], q: "Bach Well-Tempered Clavier Schiff ECM", w: "現場錄音，聲響通透。" },
      { p: "Glenn Gould", l: "Sony", y: 1963, qa: "historic", t: [], q: "Bach Well-Tempered Clavier Gould", w: "課程指定版之一。極具個性，速度與分句都非常規，宜作對照而非入門。" }
    ]
  },

  "vivaldi-seasons": {
    title: "Vivaldi《四季》Op. 8 Nos. 1–4",
    en: "Le quattro stagioni",
    composer: "Antonio Vivaldi",
    q: "Vivaldi Four Seasons",
    fact: "為《和聲與創意的競賽》Op. 8 之前四首，1725 年於阿姆斯特丹出版，每首附有描述季節景象的十四行詩，屬早期標題音樂。",
    pick: "古樂器版本較銳利、戲劇性強；第 23 週會用同一曲做古樂器 vs. 現代樂器的比較。",
    versions: [
      { p: "Rachel Podger / Brecon Baroque", l: "Channel Classics", y: 2018, qa: "hires", t: ["period", "ref"], q: "Vivaldi Four Seasons Rachel Podger", w: "Channel Classics 為 DSD／高解析錄音廠牌，古樂器版中錄音規格最高。" },
      { p: "Il Giardino Armonico / Giuliano Carmignola", l: "Naïve", y: 2000, qa: "hires", t: ["period", "ref"], q: "Vivaldi Four Seasons Il Giardino Armonico", w: "課程指定版。速度與力度對比極端，〈夏〉的暴風雨最有衝擊力。" },
      { p: "Fabio Biondi / Europa Galante", l: "Virgin／Erato", y: 1991, qa: "hifi", t: ["period"], q: "Vivaldi Four Seasons Biondi Europa Galante", w: "古樂器演奏的分水嶺錄音，第 23 週對比可用。" },
      { p: "I Musici / Felix Ayo", l: "Philips", y: 1959, qa: "hifi", t: ["modern"], q: "Vivaldi Four Seasons I Musici", w: "現代樂器的經典基準，句法圓潤。第 23 週的「現代樂器組」首選。" },
      { p: "Anne-Sophie Mutter / Trondheim Soloists", l: "DG", y: 1999, qa: "hires", t: ["modern"], q: "Vivaldi Four Seasons Mutter", w: "浪漫化的現代樂器讀法，與古樂器版差異最大。" },
      { p: "Nigel Kennedy / English Chamber Orchestra", l: "EMI", y: 1989, qa: "hifi", t: ["modern"], q: "Vivaldi Four Seasons Nigel Kennedy", w: "史上最暢銷古典錄音之一，個性強烈。" }
    ]
  },

  "bach-bwv1048": {
    title: "Bach《布蘭登堡協奏曲》第 3 號 BWV 1048",
    en: "Brandenburg Concerto No. 3",
    composer: "J.S. Bach",
    q: "Bach Brandenburg Concerto No 3 BWV 1048",
    fact: "六首布蘭登堡協奏曲於 1721 年獻呈布蘭登堡侯爵。",
    versions: [
      { p: "Trevor Pinnock / The English Concert", l: "DG Archiv", y: 1982, qa: "hifi", t: ["period", "ref"], q: "Bach Brandenburg Concertos Pinnock", w: "課程指定版。古樂器演奏的長年基準。" },
      { p: "Café Zimmermann", l: "Alpha", y: 2005, qa: "hires", t: ["period", "ref"], q: "Bach Brandenburg Concertos Cafe Zimmermann", w: "近年錄音，聲部透明度極高，高解析首選。" },
      { p: "Freiburger Barockorchester", l: "Harmonia Mundi", y: 2013, qa: "hires", t: ["period"], q: "Bach Brandenburg Concertos Freiburger Barockorchester", w: "HM 高解析發行，活力充沛。" },
      { p: "Karl Richter / Munich Bach Orchestra", l: "DG Archiv", y: 1967, qa: "hifi", t: ["modern"], q: "Bach Brandenburg Concertos Karl Richter", w: "現代樂器的代表版，第 23 週對比用。" }
    ]
  },

  "bach-bwv1050": {
    title: "Bach《布蘭登堡協奏曲》第 5 號 BWV 1050",
    en: "Brandenburg Concerto No. 5",
    composer: "J.S. Bach",
    q: "Bach Brandenburg Concerto No 5 BWV 1050",
    fact: "第一樂章中段有一段極長的大鍵琴獨奏，常被視為鍵盤協奏曲的濫觴。",
    versions: [
      { p: "Trevor Pinnock / The English Concert", l: "DG Archiv", y: 1982, qa: "hifi", t: ["period", "ref"], q: "Bach Brandenburg Concertos Pinnock", w: "課程指定版；Pinnock 自己彈大鍵琴獨奏段。" },
      { p: "Café Zimmermann", l: "Alpha", y: 2005, qa: "hires", t: ["period", "ref"], q: "Bach Brandenburg Concertos Cafe Zimmermann", w: "大鍵琴獨奏段的細節捕捉最清楚，高解析首選。" },
      { p: "Il Giardino Armonico", l: "Teldec", y: 1996, qa: "hifi", t: ["period"], q: "Bach Brandenburg Concertos Il Giardino Armonico", w: "速度快、稜角分明。" },
      { p: "Freiburger Barockorchester", l: "Harmonia Mundi", y: 2013, qa: "hires", t: ["period"], q: "Bach Brandenburg Concertos Freiburger Barockorchester", w: "近年高解析發行。" }
    ]
  },

  "corelli-op6": {
    title: "Corelli《大協奏曲》Op. 6",
    en: "Concerti Grossi, Op. 6",
    composer: "Arcangelo Corelli",
    q: "Corelli Concerti Grossi Op 6",
    extra: true,
    bg: "1714 年於阿姆斯特丹出版（Corelli 逝世後一年），是<b>「大協奏曲 concerto grosso」這個曲類的奠基之作</b>——由一小組獨奏者（concertino）與全體合奏（ripieno）交替對答。第 8 首附有「為聖誕夜而作」的標註，其中的田園樂章長年是聖誕音樂的固定曲目。韓德爾與巴赫的協奏曲寫作都直接受其影響。",
    versions: [
      { p: "Trevor Pinnock / The English Concert", l: "DG Archiv", y: 1988, qa: "hifi", t: ["period", "ref"], q: "Corelli Concerti Grossi Op 6 Pinnock", w: "古樂器基準版。" },
      { p: "Rinaldo Alessandrini / Concerto Italiano", l: "Naïve", y: 2015, qa: "hires", t: ["period"], q: "Corelli Concerti Grossi Concerto Italiano", w: "近年錄音，高解析機率高。" }
    ]
  },

  "bach-wtc1-fugue": {
    title: "Bach《平均律》第一冊 第 1 首賦格 BWV 846",
    en: "Well-Tempered Clavier Book 1, Fugue in C major",
    composer: "J.S. Bach",
    q: "Bach Well-Tempered Clavier Book 1 BWV 846",
    fact: "《平均律鍵盤曲集》兩冊共 48 組前奏曲與賦格（BWV 846–893），涵蓋全部 24 個大小調。",
    pick: "Glenn Gould（極具個性）或 Sviatoslav Richter（較中性）。本週任務要數主題進入次數，建議先用中性版本。",
    versions: [
      { p: "Sviatoslav Richter", l: "RCA／Melodiya", y: 1973, qa: "hifi", t: ["ref"], q: "Bach Well-Tempered Clavier Richter", w: "課程指定版。聲部平均，數主題進入最不容易漏。" },
      { p: "Angela Hewitt", l: "Hyperion", y: 2008, qa: "hires", t: ["ref"], q: "Bach Well-Tempered Clavier Hewitt", w: "主題每次進入都用觸鍵稍微突顯，教學上最友善。高解析首選。" },
      { p: "András Schiff", l: "ECM", y: 2012, qa: "hires", t: [], q: "Bach Well-Tempered Clavier Schiff ECM", w: "現場錄音，層次感佳。" },
      { p: "Glenn Gould", l: "Sony", y: 1963, qa: "historic", t: [], q: "Bach Well-Tempered Clavier Gould", w: "課程指定版。聲部獨立性驚人，但速度極端，建議數完主題後再聽。" }
    ]
  },

  "bach-goldberg": {
    title: "Bach《郭德堡變奏曲》BWV 988",
    en: "Goldberg Variations",
    composer: "J.S. Bach",
    q: "Bach Goldberg Variations",
    fact: "第一軌詠嘆調（Aria）與最後一軌（Aria da capo）為同一段音樂，中間隔著 30 個變奏。",
    pick: "課程建議 Gould 1955 或 1981 錄音。兩者皆為單聲道／早期數位，若要兼顧音質請並聽下列高解析版本。",
    versions: [
      { p: "Beatrice Rana", l: "Warner", y: 2016, qa: "hires", t: ["ref"], q: "Bach Goldberg Variations Beatrice Rana", w: "近年最受好評的新錄音之一，24bit 發行機率最高。" },
      { p: "András Schiff", l: "ECM", y: 2001, qa: "hires", t: ["ref"], q: "Bach Goldberg Variations Schiff ECM", w: "現場錄音，音色與空間感俱佳。" },
      { p: "Murray Perahia", l: "Sony", y: 2000, qa: "hires", t: ["entry"], q: "Bach Goldberg Variations Perahia", w: "句法自然、不刻意，最適合第一次完整聽完。" },
      { p: "Trevor Pinnock（大鍵琴）", l: "DG Archiv", y: 1980, qa: "hifi", t: ["period"], q: "Bach Goldberg Variations Pinnock harpsichord", w: "原始樂器版，音響世界完全不同。" },
      { p: "Glenn Gould（1981 錄音）", l: "Sony", y: 1981, qa: "hifi", t: ["ref"], q: "Bach Goldberg Variations Gould 1981", w: "課程指定版。速度大幅放慢，聲部關係經過重新設計。" },
      { p: "Glenn Gould（1955 錄音）", l: "Sony", y: 1955, qa: "historic", t: ["ref"], q: "Bach Goldberg Variations Gould 1955", w: "課程指定版，單聲道。錄音史上的分水嶺，但音質先天受限——聽詮釋不聽音質。" }
    ]
  },

  "bach-cello1": {
    title: "Bach 無伴奏大提琴組曲第 1 號 BWV 1007",
    en: "Cello Suite No. 1 in G major",
    composer: "J.S. Bach",
    q: "Bach Cello Suite No 1 BWV 1007",
    pick: "只有一件樂器、一條線，卻透過分解和弦暗示出完整的和聲進行。",
    life: "第 1 號的前奏曲是廣告、電影與典禮中最常出現的大提琴片段，辨識度僅次於《給愛麗絲》這一級的旋律。",
    versions: [
      { p: "Jean-Guihen Queyras", l: "Harmonia Mundi", y: 2007, qa: "hires", t: ["ref"], q: "Bach Cello Suites Queyras", w: "錄音極為自然，琴體共鳴與弓法細節都聽得到。高解析首選。" },
      { p: "Yo-Yo Ma（Six Evolutions, 第三次錄音）", l: "Sony", y: 2018, qa: "hires", t: ["ref", "entry"], q: "Bach Cello Suites Yo-Yo Ma Six Evolutions", w: "最新錄音規格，句法成熟，入門最好上手。" },
      { p: "Pieter Wispelwey", l: "Channel Classics", y: 2012, qa: "hires", t: ["period"], q: "Bach Cello Suites Wispelwey", w: "古樂器＋DSD 錄音，透明度極高。" },
      { p: "Anner Bylsma", l: "Sony Vivarte", y: 1992, qa: "hifi", t: ["period"], q: "Bach Cello Suites Bylsma", w: "古樂器演奏的重要參照。" },
      { p: "Mstislav Rostropovich", l: "EMI", y: 1991, qa: "hifi", t: [], q: "Bach Cello Suites Rostropovich", w: "規模宏大的浪漫化讀法。" },
      { p: "Pablo Casals", l: "EMI／Warner", y: 1938, qa: "historic", t: ["ref"], q: "Bach Cello Suites Casals", w: "使這套組曲重見天日的歷史錄音，單聲道且雜訊明顯。地位無可取代，但不建議作為第一次聆聽。" }
    ]
  },

  "handel-messiah": {
    title: "Handel《彌賽亞》HWV 56",
    en: "Messiah",
    composer: "George Frideric Handel",
    q: "Handel Messiah",
    fact: "作於 1741 年，1742 年於都柏林首演。",
    pick: "任一完整版本，先聽〈Hallelujah〉與〈I know that my Redeemer liveth〉。",
    life: "〈Hallelujah〉是西方聖誕與復活節季節的固定曲目，也是百貨公司與購物中心每年 12 月的背景音樂。",
    versions: [
      { p: "Harry Christophers / The Sixteen", l: "Coro", y: 2008, qa: "hires", t: ["period", "ref"], q: "Handel Messiah The Sixteen Christophers", w: "近年錄音規格最好的完整版之一，合唱咬字清楚。" },
      { p: "John Eliot Gardiner / English Baroque Soloists", l: "Philips", y: 1982, qa: "hifi", t: ["period", "ref"], q: "Handel Messiah Gardiner", w: "古樂器演奏的長年基準，速度輕快。" },
      { p: "Trevor Pinnock / The English Concert", l: "DG Archiv", y: 1988, qa: "hifi", t: ["period"], q: "Handel Messiah Pinnock", w: "另一部古樂器代表版。" },
      { p: "Colin Davis / London SO", l: "Philips", y: 1966, qa: "hifi", t: ["modern"], q: "Handel Messiah Colin Davis", w: "現代樂器大編制版，宣敘調與詠嘆調的切換極為清楚。" },
      { p: "Thomas Beecham / RPO", l: "RCA", y: 1959, qa: "historic", t: [], q: "Handel Messiah Beecham", w: "使用 Goossens 的大型現代管弦樂配器，與原作差距大，屬歷史趣味。" }
    ]
  },

  "bach-bminor-mass": {
    title: "Bach《b 小調彌撒》BWV 232",
    en: "Mass in B minor",
    composer: "J.S. Bach",
    q: "Bach Mass in B minor BWV 232",
    pick: "先聽開頭 Kyrie。",
    bg: "巴赫身為路德派教徒，卻寫下這部完整的<b>天主教拉丁彌撒</b>——這件事本身就是個謎。全曲並非一氣呵成，而是他在生命最後幾年，把橫跨數十年的舊作重新編修拼接而成；其中 Kyrie 與 Gloria 早在 1733 年就已完成並獻給薩克森選帝侯。<b>他生前從未聽過全曲演出。</b>",
    versions: [
      { p: "Masaaki Suzuki / Bach Collegium Japan", l: "BIS", y: 2007, qa: "hires", t: ["period", "ref"], q: "Bach Mass in B minor Suzuki", w: "BIS 為 SACD／高解析錄音代表廠牌，本版是「音質 + 詮釋」的最佳交集。" },
      { p: "Philippe Herreweghe / Collegium Vocale Gent", l: "Harmonia Mundi", y: 2011, qa: "hires", t: ["period", "ref"], q: "Bach Mass in B minor Herreweghe", w: "合唱線條極為內斂，Kyrie 的懇求性格最鮮明。" },
      { p: "John Eliot Gardiner / English Baroque Soloists", l: "DG Archiv", y: 1985, qa: "hifi", t: ["period", "ref"], q: "Bach Mass in B minor Gardiner", w: "戲劇性最強的古樂器版。" },
      { p: "Karl Richter / Munich Bach Choir", l: "DG Archiv", y: 1961, qa: "hifi", t: ["modern"], q: "Bach Mass in B minor Karl Richter", w: "現代樂器大編制的代表版，厚重莊嚴。" }
    ]
  },

  "bach-matthew": {
    title: "Bach《馬太受難曲》BWV 244",
    en: "St Matthew Passion",
    composer: "J.S. Bach",
    q: "Bach St Matthew Passion BWV 244",
    pick: "先聽開頭合唱與〈Erbarme dich〉（女中音詠嘆調 + 小提琴獨奏）。",
    bg: "1727 年（或 1729 年）於萊比錫聖多馬教堂首演，是西方音樂中規模最大的受難曲。編制包含<b>雙合唱團、雙管弦樂團</b>與獨立的兒童合唱，兩組人馬在空間上分開，形成問答與環繞的效果。巴赫死後此曲幾乎被遺忘，直到 1829 年<b>二十歲的孟德爾頌在柏林重新演出</b>，才引發十九世紀的巴赫復興運動。",
    versions: [
      { p: "Masaaki Suzuki / Bach Collegium Japan", l: "BIS", y: 2019, qa: "hires", t: ["period", "ref"], q: "Bach St Matthew Passion Suzuki", w: "近年錄音規格最高的完整版，雙合唱團的空間分離感清楚。" },
      { p: "Philippe Herreweghe / Collegium Vocale Gent", l: "Harmonia Mundi", y: 1998, qa: "hires", t: ["period", "ref"], q: "Bach St Matthew Passion Herreweghe", w: "〈Erbarme dich〉由 Andreas Scholl 演唱，是最常被推薦的一版。" },
      { p: "John Eliot Gardiner / English Baroque Soloists", l: "DG Archiv", y: 1988, qa: "hifi", t: ["period", "ref"], q: "Bach St Matthew Passion Gardiner", w: "戲劇推進最強。" },
      { p: "Otto Klemperer / Philharmonia", l: "EMI", y: 1961, qa: "hifi", t: ["modern"], q: "Bach St Matthew Passion Klemperer", w: "速度極慢、規模巨大的現代樂器讀法，與古樂器版差異極端。" },
      { p: "Karl Richter / Munich Bach Orchestra", l: "DG Archiv", y: 1958, qa: "historic", t: ["ref"], q: "Bach St Matthew Passion Karl Richter", w: "二十世紀最具影響力的錄音之一，早期立體聲。" }
    ]
  },

  "beethoven-5": {
    title: "Beethoven 第 5 號交響曲 Op. 67",
    en: "Symphony No. 5 in C minor",
    composer: "Ludwig van Beethoven",
    q: "Beethoven Symphony No 5",
    pick: "課程指定 Carlos Kleiber / Wiener Philharmoniker。第 22 週會用此曲做三版本比較。",
    note: "第三樂章至第四樂章不間斷，以一段極長的漸強由 c 小調轉入 C 大調。",
    life: "開頭的「三短一長」在摩斯電碼中是字母 V（Victory）。二戰期間 BBC 對歐洲廣播即以此節奏作為開場呼號。",
    versions: [
      { p: "Carlos Kleiber / Vienna Phil", l: "DG", y: 1974, qa: "hires", t: ["ref", "modern"], q: "Beethoven Symphony 5 Kleiber", w: "課程指定版，也是公認的第一參考。DG 已發行 24bit 重製，優先找標有 Hi-Res 的版本。" },
      { p: "Riccardo Chailly / Gewandhausorchester", l: "Decca", y: 2011, qa: "hires", t: ["modern"], q: "Beethoven Symphony 5 Chailly", w: "近年數位錄音，速度依貝多芬節拍器指示偏快，動態極大。高解析首選。" },
      { p: "John Eliot Gardiner / Orchestre Révolutionnaire et Romantique", l: "DG Archiv", y: 1994, qa: "hifi", t: ["period"], q: "Beethoven Symphony 5 Gardiner", w: "第 22 週指定的「古樂器組」。銅管與定音鼓的原始音色差異極明顯。" },
      { p: "Herbert von Karajan / Berlin Phil（1963 全集）", l: "DG", y: 1963, qa: "hifi", t: ["ref", "modern"], q: "Beethoven Symphony 5 Karajan", w: "第 22 週指定的對照組。線條連綿、音色統一，與 Kleiber 的稜角形成強對比。" },
      { p: "Teodor Currentzis / SWR Symphonieorchester", l: "Sony", y: 2021, qa: "hires", t: [], q: "Beethoven Symphony 5 Currentzis", w: "近年錄音，處理極端，適合第 22 週再加一個座標。" },
      { p: "Wilhelm Furtwängler / Berlin Phil", l: "DG／EMI", y: 1943, qa: "historic", t: ["ref"], q: "Beethoven Symphony 5 Furtwangler", w: "戰時實況，單聲道且雜訊重。詮釋史地位極高，但不適合作為音質比較的樣本。" }
    ]
  },

  "haydn-104": {
    title: "Haydn 第 104 號交響曲《倫敦》",
    en: "Symphony No. 104 in D major 'London'",
    composer: "Joseph Haydn",
    q: "Haydn Symphony 104 London",
    fact: "Haydn 一生創作逾百首交響曲，其對交響曲與弦樂四重奏形式的確立作用，使其常被稱為「交響曲之父」——此稱號屬傳統敘事之簡化。",
    versions: [
      { p: "Marc Minkowski / Les Musiciens du Louvre", l: "Naïve", y: 2009, qa: "hires", t: ["period", "ref"], q: "Haydn London Symphonies Minkowski", w: "與第 94 號同一套，四樂章性格對比最鮮明。" },
      { p: "Colin Davis / Concertgebouw", l: "Philips", y: 1994, qa: "hifi", t: ["modern", "ref"], q: "Haydn Symphony 104 Colin Davis", w: "現代樂器基準版。" },
      { p: "Eugen Jochum / London Phil", l: "DG", y: 1973, qa: "hifi", t: ["modern"], q: "Haydn London Symphonies Jochum", w: "倫敦交響曲全集的經典錄音。" },
      { p: "Ádám Fischer / Austro-Hungarian Haydn Orchestra", l: "Nimbus", y: 1990, qa: "hifi", t: [], q: "Haydn Symphony 104 Adam Fischer", w: "海頓交響曲全集，曲目最齊全。" }
    ]
  },

  "mozart-k466": {
    title: "Mozart 第 20 號鋼琴協奏曲 K. 466",
    en: "Piano Concerto No. 20 in D minor",
    composer: "W.A. Mozart",
    q: "Mozart Piano Concerto No 20 K 466",
    pick: "d 小調，戲劇性強。本週任務是找出裝飾奏（cadenza）的位置。",
    bg: "1785 年首演，莫札特自己擔任獨奏。這是他<b>第一首小調鋼琴協奏曲</b>，戲劇性與不安感遠超當時協奏曲的慣例。貝多芬極為推崇此曲，並為它寫下裝飾奏——至今仍是最常被採用的版本。第一樂章開頭樂團的切分低音營造出一種不祥的脈動，與古典協奏曲慣有的明亮開場截然不同。",
    versions: [
      { p: "Mitsuko Uchida / Cleveland Orchestra", l: "Decca", y: 2010, qa: "hires", t: ["ref"], q: "Mozart Piano Concerto 20 Uchida Cleveland", w: "近年錄音，鋼琴與樂團的層次極清楚，裝飾奏進出點一聽就知道。高解析首選。" },
      { p: "Murray Perahia / English Chamber Orchestra", l: "Sony", y: 1980, qa: "hifi", t: ["ref"], q: "Mozart Piano Concerto 20 Perahia", w: "身兼指揮與獨奏，句法統一，全集長年被視為基準。" },
      { p: "Maria João Pires / Claudio Abbado", l: "DG", y: 1993, qa: "hifi", t: [], q: "Mozart Piano Concerto 20 Pires Abbado", w: "抒情性強，第二樂章極美。" },
      { p: "Clara Haskil / Igor Markevitch", l: "Philips", y: 1960, qa: "historic", t: ["ref"], q: "Mozart Piano Concerto 20 Clara Haskil", w: "歷史名演，早期立體聲。" }
    ]
  },

  "mozart-k467": {
    title: "Mozart 第 21 號鋼琴協奏曲 K. 467",
    en: "Piano Concerto No. 21 in C major",
    composer: "W.A. Mozart",
    q: "Mozart Piano Concerto No 21 K 467",
    pick: "第二樂章極為著名。",
    life: "第二樂章因 1967 年瑞典電影《Elvira Madigan》廣為流傳，這首協奏曲因此常被直接稱為「Elvira Madigan 協奏曲」。",
    versions: [
      { p: "Mitsuko Uchida / Cleveland Orchestra", l: "Decca", y: 2010, qa: "hires", t: ["ref"], q: "Mozart Piano Concerto 21 Uchida Cleveland", w: "與 K. 466 同一套錄音，便於對比。高解析首選。" },
      { p: "Murray Perahia / English Chamber Orchestra", l: "Sony", y: 1980, qa: "hifi", t: ["ref"], q: "Mozart Piano Concerto 21 Perahia", w: "第二樂章的句法極自然。" },
      { p: "Géza Anda / Camerata Academica Salzburg", l: "DG", y: 1961, qa: "hifi", t: [], q: "Mozart Piano Concerto 21 Geza Anda", w: "因電影《Elvira Madigan》而聞名的錄音。" }
    ]
  },

  "mozart-figaro": {
    title: "Mozart《費加洛的婚禮》K. 492",
    en: "Le nozze di Figaro",
    composer: "W.A. Mozart",
    q: "Mozart Le nozze di Figaro",
    pick: "先聽序曲與〈Sull'aria〉二重唱。序曲是「用純器樂建立戲劇氣氛」的範例。",
    life: "電影《刺激 1995》(The Shawshank Redemption) 中安迪播放給全獄囚犯聽的，就是本劇的〈Sull'aria〉二重唱——那一幕常被列為電影史上最著名的古典音樂場景之一。",
    versions: [
      { p: "Teodor Currentzis / MusicAeterna", l: "Sony", y: 2014, qa: "hires", t: ["period"], q: "Mozart Le nozze di Figaro Currentzis", w: "近年錄音規格最高的全曲版，宣敘調處理極為戲劇化。" },
      { p: "René Jacobs / Concerto Köln", l: "Harmonia Mundi", y: 2003, qa: "hires", t: ["period", "ref"], q: "Mozart Le nozze di Figaro Rene Jacobs", w: "古樂器版基準，錄音層次極佳。" },
      { p: "Erich Kleiber / Vienna Phil", l: "Decca", y: 1955, qa: "historic", t: ["ref"], q: "Mozart Le nozze di Figaro Erich Kleiber", w: "公認的歷史名演之一（Carlos Kleiber 之父），單聲道。" },
      { p: "Carlo Maria Giulini / Philharmonia", l: "EMI", y: 1959, qa: "hifi", t: ["ref"], q: "Mozart Le nozze di Figaro Giulini", w: "以 Schwarzkopf 領銜的黃金卡司。" },
      { p: "Karl Böhm / Deutsche Oper Berlin", l: "DG", y: 1968, qa: "hifi", t: [], q: "Mozart Le nozze di Figaro Bohm", w: "現代樂器的標準參照。" }
    ]
  },

  "mozart-flute": {
    title: "Mozart《魔笛》K. 620",
    en: "Die Zauberflöte",
    composer: "W.A. Mozart",
    q: "Mozart Die Zauberflote",
    pick: "先聽〈Der Hölle Rache〉（夜后詠嘆調）。注意人聲被當作器樂化的技巧展示工具使用。",
    bg: "1791 年首演，莫札特去世前兩個月。與《費加洛》《唐喬凡尼》不同，這是一部<b>德語的 Singspiel（歌唱劇）</b>——有口白、有喜劇也有莊嚴儀式，寫給維也納市郊的平民劇院而非宮廷。劇中有大量共濟會（Freemasonry）象徵，莫札特本人是會員。夜后的詠嘆調要求連續唱到高音 F，是花腔女高音的技術極限。",
    versions: [
      { p: "René Jacobs / Akademie für Alte Musik Berlin", l: "Harmonia Mundi", y: 2010, qa: "hires", t: ["period", "ref"], q: "Mozart Die Zauberflote Rene Jacobs", w: "近年錄音規格最高，戲劇節奏鮮活。" },
      { p: "Otto Klemperer / Philharmonia", l: "EMI", y: 1964, qa: "hifi", t: ["ref"], q: "Mozart Die Zauberflote Klemperer", w: "夜后由 Lucia Popp 演唱，是這首詠嘆調最著名的錄音之一。" },
      { p: "Georg Solti / Vienna Phil", l: "Decca", y: 1969, qa: "hifi", t: ["ref"], q: "Mozart Die Zauberflote Solti", w: "Decca 錄音工藝的代表作，音場極佳。" },
      { p: "Wolfgang Sawallisch / Bayerische Staatsoper", l: "EMI", y: 1973, qa: "hifi", t: [], q: "Mozart Die Zauberflote Sawallisch Edda Moser", w: "Edda Moser 的夜后被許多人視為技術標竿。" },
      { p: "John Eliot Gardiner / English Baroque Soloists", l: "DG Archiv", y: 1995, qa: "hifi", t: ["period"], q: "Mozart Die Zauberflote Gardiner", w: "古樂器版，速度輕盈。" }
    ]
  },

  "beethoven-3": {
    title: "Beethoven 第 3 號交響曲《英雄》Op. 55",
    en: "Symphony No. 3 'Eroica'",
    composer: "Ludwig van Beethoven",
    q: "Beethoven Symphony No 3 Eroica",
    period: "中期",
    fact: "此曲規模顯著超越當時交響曲慣例。",
    versions: [
      { p: "Riccardo Chailly / Gewandhausorchester", l: "Decca", y: 2009, qa: "hires", t: ["modern", "ref"], q: "Beethoven Symphony 3 Eroica Chailly", w: "近年數位錄音，速度快、結構緊，高解析首選。" },
      { p: "John Eliot Gardiner / ORR", l: "DG Archiv", y: 1993, qa: "hifi", t: ["period", "ref"], q: "Beethoven Symphony 3 Eroica Gardiner", w: "古樂器，銅管的粗糲感讓「英雄」的衝擊力更直接。" },
      { p: "Herbert von Karajan / Berlin Phil", l: "DG", y: 1963, qa: "hifi", t: ["modern", "ref"], q: "Beethoven Symphony 3 Eroica Karajan", w: "音色統一、線條連綿的經典讀法。" },
      { p: "Otto Klemperer / Philharmonia", l: "EMI", y: 1959, qa: "hifi", t: [], q: "Beethoven Symphony 3 Eroica Klemperer", w: "速度沉穩、結構感極強。" }
    ]
  },

  "beethoven-9": {
    title: "Beethoven 第 9 號交響曲 Op. 125",
    en: "Symphony No. 9 in D minor",
    composer: "Ludwig van Beethoven",
    q: "Beethoven Symphony No 9",
    period: "晚期",
    life: "第四樂章的〈歡樂頌〉主題自 1972 年起被歐洲理事會採用、1985 年成為<b>歐盟盟歌</b>（僅用旋律，不含歌詞）。",
    versions: [
      { p: "Riccardo Chailly / Gewandhausorchester", l: "Decca", y: 2011, qa: "hires", t: ["modern", "ref"], q: "Beethoven Symphony 9 Chailly", w: "近年錄音，合唱與樂團平衡極好，高解析首選。" },
      { p: "Simon Rattle / Berlin Phil", l: "EMI／Warner", y: 2002, qa: "hires", t: ["modern"], q: "Beethoven Symphony 9 Rattle Berlin", w: "現場錄音，數位規格佳。" },
      { p: "John Eliot Gardiner / ORR", l: "DG Archiv", y: 1994, qa: "hifi", t: ["period"], q: "Beethoven Symphony 9 Gardiner", w: "古樂器版，速度接近作曲家標示。" },
      { p: "Herbert von Karajan / Berlin Phil", l: "DG", y: 1962, qa: "hifi", t: ["ref"], q: "Beethoven Symphony 9 Karajan 1962", w: "長年的標準參照。" },
      { p: "Wilhelm Furtwängler / Bayreuth", l: "EMI／Warner", y: 1951, qa: "historic", t: ["ref"], q: "Beethoven Symphony 9 Furtwangler Bayreuth", w: "音樂史上最著名的第九號錄音，單聲道實況。聽詮釋不聽音質。" }
    ]
  },

  "beethoven-moonlight": {
    title: "Beethoven 鋼琴奏鳴曲《月光》Op. 27 No. 2",
    en: "Piano Sonata No. 14 'Moonlight'",
    composer: "Ludwig van Beethoven",
    q: "Beethoven Moonlight Sonata Op 27",
    period: "早／中期之交",
    bg: "<b>「月光」不是貝多芬取的名字</b>，而是他死後由詩人 Ludwig Rellstab 比喻為「琉森湖上的月光」才流傳開來。貝多芬自己的標題是「幻想曲風的奏鳴曲」（Sonata quasi una fantasia）——關鍵在他刻意打破慣例：<b>把慢速樂章放在第一、最激烈的樂章放在最後</b>，整首曲子的重心因此落在結尾而非開頭。多數人只聽過第一樂章，等於只聽了他設計的前三分之一。",
    versions: [
      { p: "Igor Levit", l: "Sony", y: 2019, qa: "hires", t: ["ref"], q: "Beethoven Piano Sonatas Igor Levit", w: "全集錄音，24bit 發行，鋼琴音色捕捉極佳。" },
      { p: "Wilhelm Kempff", l: "DG", y: 1965, qa: "hifi", t: ["ref"], q: "Beethoven Moonlight Sonata Kempff", w: "句法質樸、不誇飾，長年基準版。" },
      { p: "Emil Gilels", l: "DG", y: 1980, qa: "hifi", t: ["ref"], q: "Beethoven Moonlight Sonata Gilels", w: "音色厚重，第一樂章的沉滯感最強。" },
      { p: "Claudio Arrau", l: "Philips", y: 1985, qa: "hifi", t: [], q: "Beethoven Moonlight Sonata Arrau", w: "速度極慢，聲部層次分明。" }
    ]
  },

  "beethoven-op131": {
    title: "Beethoven 弦樂四重奏 Op. 131",
    en: "String Quartet No. 14 in C-sharp minor",
    composer: "Ludwig van Beethoven",
    q: "Beethoven String Quartet Op 131",
    period: "晚期",
    pick: "與《月光》連續對比聽，兩者相隔約 25 年。不需分析，只需感受「可親近程度」的落差。",
    bg: "作於 1826 年，貝多芬生命的最後一年。全曲<b>七個樂章不間斷連續演奏</b>，這在當時完全無先例。舒伯特在臨終前要求聽此曲；華格納曾為它寫下長篇分析。貝多芬被問到自己最滿意哪一首四重奏時，據稱指的就是這首。<b>此時他已完全失聰，這些作品他從未親耳聽過。</b>",
    versions: [
      { p: "Belcea Quartet", l: "Alpha", y: 2012, qa: "hires", t: ["ref"], q: "Beethoven String Quartets Belcea Quartet", w: "近年全集，錄音規格最高，晚期四重奏的內聲部細節清楚。" },
      { p: "Takács Quartet", l: "Decca", y: 2004, qa: "hires", t: ["ref"], q: "Beethoven Late String Quartets Takacs", w: "晚期四重奏的現行首選之一，獲獎無數。" },
      { p: "Alban Berg Quartett", l: "EMI", y: 1983, qa: "hifi", t: ["ref"], q: "Beethoven String Quartets Alban Berg Quartett", w: "音色統一、技術完美的代表版。" },
      { p: "Quartetto Italiano", l: "Philips", y: 1969, qa: "hifi", t: [], q: "Beethoven String Quartets Quartetto Italiano", w: "句法溫暖，全集長年受推崇。" },
      { p: "Busch Quartet", l: "EMI／Warner", y: 1936, qa: "historic", t: ["ref"], q: "Beethoven String Quartet Op 131 Busch Quartet", w: "歷史錄音的標竿，單聲道。" }
    ]
  }

});
