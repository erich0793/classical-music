/* 爵士樂．曲目資料庫
   欄位沿用另外兩門課。兩處用法不同：
   - en 放「專輯 · 年份」而不是英文曲名——爵士的曲名本來就是英文，
     重複一次沒有意義；專輯與年份才是在串流平台上找到它的關鍵。
   - composer 放「領銜樂手」。爵士的署名單位是演出者，不是作曲者：
     同一首〈Body and Soul〉，Hawkins 版和 Coltrane 版是兩件不同的作品。
   versions 的第一個幾乎一定是原始錄音，所以這門課預設不依音質重排（見 core）。 */
(function () {
  var J = (window.COURSES = window.COURSES || {}).jazz;
  J.works = {

  /* ---------- 單元 1：搖擺與節奏組 ---------- */
  "basie-oneoclock": {
    title: "〈One O'Clock Jump〉", en: "Decca · 1937", composer: "Count Basie Orchestra",
    q: "Count Basie One O'Clock Jump",
    bg: "Count Basie 樂團的招牌曲，1937 年 7 月為 Decca 錄製。這首是 <b>12 小節藍調</b>，結構很特別：<b>開頭是 Basie 的鋼琴與節奏組，中間是一段接一段的獨奏，大家最熟的那段旋律反而在最後才出現</b>。它不是先寫好的曲子，而是樂團在演出中靠耳朵慢慢「長」出來的幾個重複短樂句（riff），稱為 head arrangement。",
    pick: "<b>這首要聽的不是旋律，是背景。</b>獨奏者換了一個又一個，但底下的低音提琴、吉他、鼓從頭到尾沒有變——那就是搖擺。",
    form: "12 小節藍調",
    answer: {
      label: "🔒 <b>聽點對照</b>",
      head: ["段落", "聽什麼"],
      rows: [
        ["開頭", "Basie 的鋼琴＋節奏組。鋼琴彈得很少，<b>留白本身就是他的風格</b>"],
        ["中段", "一段接一段的獨奏（薩克斯風、小號、長號……），<b>每一段都走完一輪 12 小節</b>"],
        ["結尾", "全團用幾個很短的重複樂句（riff）互相疊上去——<b>最有名的旋律在這裡才出現</b>"]
      ],
      note: "如果你第一遍覺得「好像沒有旋律」，那就聽對了。這首的主角是節奏組：Basie（鋼琴）、Freddie Green（吉他）、Walter Page（低音提琴）、Jo Jones（鼓），當時被稱為 <b>All-American Rhythm Section</b>。"
    },
    versions: [
      { p: "Count Basie Orchestra", l: "Decca（原始錄音）", y: 1937, qa: "historic", t: ["ref"], q: "Count Basie One O'Clock Jump 1937", w: "原始錄音。音質受限，但這就是搖擺年代的聲音。" },
      { p: "Count Basie Orchestra", l: "後期錄音或現場", y: 0, qa: "hifi", t: ["live"], q: "Count Basie Orchestra One O'Clock Jump live", w: "Basie 樂團演奏這首數十年，後期錄音音質好得多，節奏組更容易聽清楚。" }
    ]
  },

  "basie-aprilparis": {
    title: "〈April in Paris〉", en: "April in Paris · 1955", composer: "Count Basie Orchestra",
    q: "Count Basie April in Paris",
    bg: "原為 Vernon Duke 1932 年的百老匯歌曲，Basie 樂團 1955 年的版本（編曲 Wild Bill Davis）讓它成為搖擺大樂團的代表作之一。<b>結尾 Basie 喊了一聲「One more time!」，樂團就把結尾再奏一次</b>——這種當場的決定，正是爵士與古典最不同的地方：樂譜上沒有寫，但每個人都知道該怎麼接。",
    pick: "和〈One O'Clock Jump〉連著聽：相隔 18 年，同一個樂團、同一種節奏組，錄音技術差很多——<b>這次你應該聽得清楚低音提琴了</b>。",
    form: "32 小節（標準曲）",
    versions: [
      { p: "Count Basie Orchestra", l: "Clef／Verve", y: 1955, qa: "hifi", t: ["ref", "entry"], q: "Count Basie April in Paris 1955", w: "原始錄音，搖擺大樂團入門最友善的一首。" },
      { p: "Ella Fitzgerald & Louis Armstrong", l: "Verve《Ella and Louis》", y: 1956, qa: "hifi", t: [], q: "Ella Fitzgerald Louis Armstrong April in Paris Ella and Louis", w: "同一首歌的人聲版本。爵士標準曲的另一種樣子。" }
    ]
  },

  /* ---------- 單元 2：藍調 ---------- */
  "bessie-stlouis": {
    title: "〈St. Louis Blues〉", en: "Columbia · 1925", composer: "Bessie Smith",
    q: "Bessie Smith St Louis Blues",
    bg: "W. C. Handy 1914 年發表的〈St. Louis Blues〉是最早廣為流傳的藍調歌曲之一。1925 年 1 月，「藍調皇后」Bessie Smith 為 Columbia 錄下這個版本，伴奏只有兩個人：<b>Louis Armstrong 的短號與 Fred Longshaw 的簧風琴</b>。每唱完一句，Armstrong 就用短號回一句——<b>人聲和樂器在對話</b>。",
    pick: "這首要聽的是<b>歌詞的形狀</b>：同一句唱兩次，第三句回答。這就是藍調的 AAB。",
    form: "藍調（AAB 歌詞）",
    versions: [
      { p: "Bessie Smith（Louis Armstrong 短號）", l: "Columbia", y: 1925, qa: "historic", t: ["ref"], q: "Bessie Smith St Louis Blues Louis Armstrong 1925", w: "原始錄音。藍調人聲的源頭之一。" },
      { p: "Louis Armstrong", l: "Columbia《Louis Armstrong Plays W.C. Handy》", y: 1954, qa: "hifi", t: [], q: "Louis Armstrong St Louis Blues Plays W.C. Handy", w: "29 年後，當年的伴奏者自己唱——同一首藍調，換成搖擺樂團的版本。" }
    ]
  },

  "rollins-blueseven": {
    title: "〈Blue Seven〉", en: "Saxophone Colossus · 1956", composer: "Sonny Rollins",
    q: "Sonny Rollins Blue Seven",
    bg: "收在 1956 年錄音的《Saxophone Colossus》（Prestige），被視為 Rollins 最重要的專輯，同一張還有〈St. Thomas〉。樂手：Tommy Flanagan 鋼琴、Doug Watkins 低音提琴、Max Roach 鼓。<b>1958 年作曲家暨樂評 Gunther Schuller 專文分析這首</b>，指出 Rollins 的獨奏不是一串隨意的樂句，而是圍繞主題裡的一個小動機不斷發展——<b>像古典作曲家在發展部裡做的事</b>。",
    pick: "<b>先記住主題開頭那幾個音</b>，然後聽 Rollins 怎麼一次又一次把它拿回來。",
    form: "12 小節藍調",
    answer: {
      label: "🔒 <b>聽點對照</b>",
      text: "開頭由<b>低音提琴獨自</b>走出藍調的節奏，然後 Rollins 奏出主題——一個很短、有點怪的動機。<b>他的整段獨奏一直回到這個動機</b>：拆開、移高、放慢、加花，再組回來。",
      note: "這就是 Schuller 那篇評論〈Sonny Rollins and the Challenge of Thematic Improvisation〉的論點。對照古典課第 8 週的「發展部」：素材被拆解、變形、重組——<b>差別只在這裡是當場發生的</b>。"
    },
    versions: [
      { p: "Sonny Rollins", l: "Prestige《Saxophone Colossus》", y: 1956, qa: "hifi", t: ["ref"], q: "Sonny Rollins Blue Seven Saxophone Colossus 1956", w: "原始錄音（Rudy Van Gelder 錄音室）。" }
    ]
  },

  "miles-allblues": {
    title: "〈All Blues〉", en: "Kind of Blue · 1959", composer: "Miles Davis",
    q: "Miles Davis All Blues",
    bg: "《Kind of Blue》的第四首。<b>這是一首藍調，但是 6/8 拍</b>——每小節六拍，聽起來像在搖晃，而不是在走路。骨架仍然是 12 小節，只是第 9、10 小節換上了不一樣的和弦顏色。",
    pick: "和〈Blue Seven〉連著聽：同樣是藍調，<b>拍子一換，整首的性格就變了</b>。",
    form: "12 小節藍調（6/8 拍）",
    versions: [
      { p: "Miles Davis", l: "Columbia《Kind of Blue》", y: 1959, qa: "hires", t: ["ref", "entry"], q: "Miles Davis All Blues Kind of Blue", w: "原始錄音，有高解析重製版。" }
    ]
  },

  /* ---------- 單元 3：標準曲、曲式與即興 ---------- */
  "hawkins-bodysoul": {
    title: "〈Body and Soul〉", en: "Bluebird · 1939", composer: "Coleman Hawkins",
    q: "Coleman Hawkins Body and Soul",
    bg: "1930 年的百老匯歌曲（Johnny Green 作曲）。1939 年 10 月，次中音薩克斯風手 Coleman Hawkins 錄下這首——據說是錄音結束前臨時加錄的。<b>他幾乎一開始就離開原曲旋律，整整兩輪都在和弦上即興</b>，結果成了暢銷唱片。它常被視為爵士史的轉折點：<b>一般聽眾第一次為一段幾乎聽不到原曲旋律的即興買單</b>。",
    pick: "<b>先聽 Billie Holiday 的版本（下面第二個）記住原曲旋律</b>，再回來聽 Hawkins——你才聽得出他離開了多遠。",
    form: "32 小節 AABA",
    versions: [
      { p: "Coleman Hawkins", l: "Bluebird（RCA Victor）", y: 1939, qa: "historic", t: ["ref"], q: "Coleman Hawkins Body and Soul 1939", w: "原始錄音。爵士即興史上最重要的三分鐘之一。" },
      { p: "Billie Holiday", l: "Okeh", y: 1940, qa: "historic", t: ["entry"], q: "Billie Holiday Body and Soul 1940", w: "人聲版本。先聽這個記住原曲旋律。" },
      { p: "John Coltrane", l: "Atlantic《Coltrane's Sound》", y: 1960, qa: "hifi", t: [], q: "John Coltrane Body and Soul Coltrane's Sound", w: "21 年後的另一位次中音薩克斯風手：同一首曲子，連和弦都被重新改寫。" }
    ]
  },

  "miles-sowhat": {
    title: "〈So What〉", en: "Kind of Blue · 1959", composer: "Miles Davis",
    q: "Miles Davis So What",
    bg: "《Kind of Blue》（1959 年 3、4 月錄音，Columbia）的第一首。這張專輯是史上最暢銷的爵士專輯之一，樂手陣容本身就是一部爵士史：<b>Miles Davis（小號）、John Coltrane（次中音薩克斯風）、Cannonball Adderley（中音薩克斯風）、Bill Evans（鋼琴）、Paul Chambers（低音提琴）、Jimmy Cobb（鼓）</b>。據說 Davis 錄音前幾乎沒有排練，只給樂手簡單的音階草稿。",
    life: "常出現在電影、廣告與咖啡館的背景音樂裡——這可能是你聽過、卻不知道名字的那首爵士樂。",
    pick: "主題是一問一答：<b>低音提琴先「問」一句，管樂用兩個音回答</b>，節奏就像在說「so what」。",
    form: "32 小節 AABA（調式）",
    answer: {
      label: "🔒 <b>段落地圖（答案）</b>",
      head: ["段落", "誰", "聽什麼"],
      rows: [
        ["前奏", "鋼琴＋低音提琴", "沒有固定節拍，像在暖身"],
        ["主題", "全體", "低音提琴問、管樂答。<b>A 段 8 小節 ×2 → B 段（整個升高半音）8 小節 → A 段 8 小節</b>"],
        ["獨奏 1", "Miles Davis　小號", "音很少、空間很多"],
        ["獨奏 2", "John Coltrane　次中音薩克斯風", "音密得多，一口氣往上衝"],
        ["獨奏 3", "Cannonball Adderley　中音薩克斯風", "比較明亮、帶藍調味"],
        ["獨奏 4", "Bill Evans　鋼琴", "很短，管樂在背後輕輕奏著「so what」"],
        ["主題", "全體", "回到開頭的一問一答，淡出"]
      ],
      note: "<b>同一個框架，四個人四種說法。</b>Davis 的「少」與 Coltrane 的「多」接在一起，是這張專輯最常被拿來討論的對比。"
    },
    versions: [
      { p: "Miles Davis", l: "Columbia《Kind of Blue》", y: 1959, qa: "hires", t: ["ref", "entry"], q: "Miles Davis So What Kind of Blue", w: "原始錄音，有高解析重製版。" },
      { p: "Miles Davis（1964 現場）", l: "Columbia《Four & More》", y: 1964, qa: "hifi", t: ["live"], q: "Miles Davis So What Four and More 1964", w: "五年後的現場，速度快了將近一倍——同一首曲子，不同的樂團、不同的年份，完全是另一首。" }
    ]
  },

  "monk-roundmidnight": {
    title: "〈'Round Midnight〉", en: "Blue Note · 1947", composer: "Thelonious Monk",
    q: "Thelonious Monk Round Midnight",
    bg: "Thelonious Monk 作曲，是被錄音次數最多的爵士原創曲之一。Monk 自己最早的錄音在 1947 年（Blue Note）。<b>Monk 的鋼琴聽起來常像「彈錯」</b>——不協和的音、出其不意的停頓、敲擊般的觸鍵——但每一個都是刻意的。1955 年 Miles Davis 在新港爵士音樂節演奏這首，演出轟動，促成他與 Columbia 簽約。",
    pick: "<b>這首最適合做版本比較。</b>先聽 Monk 自己彈，再聽 Miles Davis——同一首曲子，一個稜角分明，一個霧氣瀰漫。",
    form: "32 小節 AABA",
    versions: [
      { p: "Thelonious Monk", l: "Blue Note《Genius of Modern Music》", y: 1947, qa: "historic", t: ["ref"], q: "Thelonious Monk Round Midnight 1947 Blue Note", w: "作曲者自己最早的錄音。" },
      { p: "Thelonious Monk（鋼琴獨奏）", l: "Riverside《Thelonious Himself》", y: 1957, qa: "hifi", t: [], q: "Thelonious Monk Round Midnight Thelonious Himself", w: "只有一架鋼琴，最能聽清楚 Monk 的和聲與停頓。" },
      { p: "Miles Davis Quintet（John Coltrane）", l: "Columbia《'Round About Midnight》", y: 1956, qa: "hifi", t: ["entry"], q: "Miles Davis Round Midnight Round About Midnight Columbia", w: "加了弱音器的小號，最有名的詮釋。中段那個突然爆開的管樂過門是這個版本的招牌。" }
    ]
  },

  /* ---------- 單元 4：紐奧良 ---------- */
  "oliver-dippermouth": {
    title: "〈Dipper Mouth Blues〉", en: "Gennett · 1923", composer: "King Oliver's Creole Jazz Band",
    q: "King Oliver Dipper Mouth Blues",
    bg: "1923 年 4 月在印第安那州的 Gennett 錄音室錄製。King Oliver 的 Creole Jazz Band 是當時芝加哥最紅的紐奧良樂團，<b>第二短號是 21 歲的 Louis Armstrong</b>（「Dipper Mouth」就是他的綽號）。<b>Oliver 在曲中那段弱音器短號獨奏太有名，後來的樂手照著吹了幾十年</b>——爵士的即興，有時也會變成曲子固定的一部分。",
    pick: "<b>音質很差，請先接受這件事。</b>1923 年還是對著一個大喇叭錄音，鼓幾乎錄不到，低音也很少。專心聽前排三種樂器。",
    texture: "集體即興（複音）",
    answer: {
      label: "🔒 <b>聽點對照</b>",
      head: ["樂器", "角色", "怎麼聽出來"],
      rows: [
        ["短號（Oliver、Armstrong）", "主旋律", "最響、最直接，走在中間"],
        ["單簧管", "在上面繞", "最高、音最多，像在旋律周圍飛"],
        ["長號", "在下面推", "最低，常用滑音把一句推向下一句"]
      ],
      note: "三條線<b>同時即興、各走各的</b>，卻不會互相打架——因為每個人都知道自己的位置。<b>這就是複音</b>：古典課第 2 週的巴赫是寫好的複音，這裡是當場生出來的複音。"
    },
    versions: [
      { p: "King Oliver's Creole Jazz Band", l: "Gennett", y: 1923, qa: "historic", t: ["ref"], q: "King Oliver Creole Jazz Band Dipper Mouth Blues 1923", w: "原始錄音（4 月 Gennett 版）。" },
      { p: "King Oliver's Creole Jazz Band", l: "Okeh", y: 1923, qa: "historic", t: [], q: "King Oliver Dippermouth Blues Okeh 1923", w: "同年稍後的 Okeh 錄音，曲名常寫成〈Dippermouth Blues〉。兩個都找不到時互為備案。" }
    ]
  },

  "morton-blackbottom": {
    title: "〈Black Bottom Stomp〉", en: "Victor · 1926", composer: "Jelly Roll Morton's Red Hot Peppers",
    q: "Jelly Roll Morton Black Bottom Stomp",
    bg: "1926 年 9 月為 Victor 錄製。Jelly Roll Morton 自稱「爵士的發明者」——這當然是誇大，但他常被視為<b>第一位重要的爵士作曲家</b>：他在集體即興之中<b>事先安排好</b>誰在什麼時候獨奏、樂團什麼時候突然停住（斷奏，stop-time）、什麼時候換段落。Victor 那時已改用電氣錄音，音質比單元裡的 Oliver 好得多。",
    pick: "和〈Dipper Mouth Blues〉連著聽：一樣是紐奧良的集體即興，<b>這首聽起來更「有設計」</b>——哪裡讓你有這種感覺？",
    texture: "集體即興＋編排",
    versions: [
      { p: "Jelly Roll Morton's Red Hot Peppers", l: "Victor", y: 1926, qa: "historic", t: ["ref"], q: "Jelly Roll Morton Red Hot Peppers Black Bottom Stomp 1926", w: "原始錄音。" }
    ]
  },

  /* ---------- 單元 5：阿姆斯壯 ---------- */
  "armstrong-westend": {
    title: "〈West End Blues〉", en: "Okeh · 1928", composer: "Louis Armstrong and His Hot Five",
    q: "Louis Armstrong West End Blues",
    bg: "1928 年 6 月為 Okeh 錄製，曲子是 Armstrong 的老師 King Oliver 寫的。<b>開頭那段十幾秒、完全沒有伴奏的小號獨奏</b>，常被列為爵士史上最重要的錄音片段之一：它宣告了一件事——<b>爵士的主角可以是一個人</b>。鋼琴是 Earl Hines，他和 Armstrong 在這個時期的合作，被視為爵士鋼琴走向獨立的起點。",
    pick: "<b>前 15 秒聽三遍</b>，再往下聽整首。",
    form: "12 小節藍調",
    answer: {
      label: "🔒 <b>段落地圖（答案）</b>",
      head: ["段落", "誰", "聽什麼"],
      rows: [
        ["開頭", "Armstrong　小號（無伴奏）", "十幾秒的華彩：往上衝、停住、再往下流"],
        ["主題", "全團", "Armstrong 吹主旋律，其他人在旁邊"],
        ["第二段", "長號", "低沉、緩慢"],
        ["第三段", "單簧管＋Armstrong 的 scat", "<b>一問一答</b>：單簧管吹一句，Armstrong 用沒有歌詞的聲音唱一句"],
        ["第四段", "Earl Hines　鋼琴", "鋼琴獨奏"],
        ["最後", "全團", "Armstrong 吹出一個<b>拉得極長的高音</b>，接一串往下的樂句"],
        ["尾奏", "鋼琴＋全團", "安靜地收掉"]
      ],
      note: "連著聽單元 4 的〈Dipper Mouth Blues〉：<b>只隔五年，小號從「三條線之一」變成「全場唯一的主角」</b>。"
    },
    versions: [
      { p: "Louis Armstrong and His Hot Five", l: "Okeh", y: 1928, qa: "historic", t: ["ref"], q: "Louis Armstrong Hot Five West End Blues 1928", w: "原始錄音。收在各種 Hot Fives & Sevens 合輯裡。" }
    ]
  },

  "armstrong-potatohead": {
    title: "〈Potato Head Blues〉", en: "Okeh · 1927", composer: "Louis Armstrong and His Hot Seven",
    q: "Louis Armstrong Potato Head Blues",
    bg: "1927 年 5 月的 Hot Seven 錄音。最有名的是後段的<b>斷奏獨奏</b>（stop-time chorus）：樂團每隔一下才打一個和弦就停住，<b>把整個空間讓給 Armstrong</b>，他一個人在空檔裡把旋律串起來。",
    life: "Woody Allen 的電影《曼哈頓》（1979）裡，主角列舉「讓人生值得活下去的事」，其中一項就是 Armstrong 的〈Potato Head Blues〉。",
    form: "斷奏（stop-time）",
    versions: [
      { p: "Louis Armstrong and His Hot Seven", l: "Okeh", y: 1927, qa: "historic", t: ["ref"], q: "Louis Armstrong Hot Seven Potato Head Blues 1927", w: "原始錄音。" }
    ]
  },

  "armstrong-wonderful": {
    title: "〈What a Wonderful World〉", en: "ABC Records · 1967", composer: "Louis Armstrong",
    q: "Louis Armstrong What a Wonderful World",
    bg: "1967 年錄製，Armstrong 晚年最廣為人知的歌。在美國起初並不暢銷，在英國卻登上排行榜冠軍；1987 年因電影《早安越南》使用而再度走紅。<b>把它和 40 年前的〈West End Blues〉連著聽</b>：同一個人，從爵士史上最大膽的小號手，變成全世界最溫暖的歌聲。",
    life: "電影、廣告、婚禮——幾乎每個人都聽過，但很少人知道他四十年前做過什麼。",
    versions: [
      { p: "Louis Armstrong", l: "ABC Records", y: 1967, qa: "hifi", t: ["ref", "entry"], q: "Louis Armstrong What a Wonderful World 1967", w: "原始錄音。" }
    ]
  },

  /* ---------- 單元 6：大樂團與歌手 ---------- */
  "ellington-atrain": {
    title: "〈Take the 'A' Train〉", en: "Victor · 1941", composer: "Duke Ellington Orchestra",
    q: "Duke Ellington Take the A Train",
    bg: "Billy Strayhorn 作曲，1941 年 2 月由 Duke Ellington 樂團為 Victor 錄製，成為樂團的招牌曲。「A 線」是紐約的地鐵路線，通往哈林區。<b>Ellington 寫曲的方式與眾不同：他依照每一位團員獨特的音色來寫</b>——不是寫給「小號」，而是寫給「這一位小號手」。這可以和古典課第 18 週拉威爾〈波麗露〉的配器思維對照。",
    pick: "<b>這首聽的是聲部之間的對話</b>：薩克斯風一組、銅管一組，輪流說話。",
    form: "32 小節 AABA",
    versions: [
      { p: "Duke Ellington Orchestra", l: "Victor", y: 1941, qa: "historic", t: ["ref"], q: "Duke Ellington Take the A Train 1941", w: "原始錄音，Ray Nance 的小號獨奏。" },
      { p: "Ella Fitzgerald（與 Ellington 樂團）", l: "Verve《Ella Fitzgerald Sings the Duke Ellington Song Book》", y: 1957, qa: "hifi", t: [], q: "Ella Fitzgerald Take the A Train Duke Ellington Song Book", w: "人聲版本，Ella 的 scat 加上 Ellington 樂團本身，音質好得多。" }
    ]
  },

  "holiday-strangefruit": {
    title: "〈Strange Fruit〉", en: "Commodore · 1939", composer: "Billie Holiday",
    q: "Billie Holiday Strange Fruit",
    bg: "原是紐約教師 Abel Meeropol 以筆名 Lewis Allan 寫的一首詩，控訴美國南方對黑人的私刑。1939 年 4 月 Billie Holiday 錄下這首歌；<b>她的唱片公司 Columbia 不願發行，改由小廠 Commodore 出版</b>。它常被稱為美國民權運動的先聲之一。<b>這是一首很沉重的歌</b>，請在有心理準備的時候聽。",
    pick: "<b>先讀下面的歌詞大意，再聽。</b>",
    answer: {
      label: "📖 <b>歌詞大意</b>", hint: "先讀再聽",
      text: "歌詞用美國南方田園最美的意象——木蘭花的香氣、溫柔的風——對照樹上吊著的黑人屍體。<b>「奇異的果實」指的就是被私刑處死的人</b>。全曲沒有一句直接控訴，力量全來自這種冷靜的並置。",
      note: "Holiday 的唱法與歌詞的寫法一致：<b>不哭喊、不煽情</b>，把字唱得很平、很慢，讓聽的人自己承受。拿這首和她的情歌比較，差別就是本單元想讓你聽到的「咬字與時間感」。"
    },
    versions: [
      { p: "Billie Holiday", l: "Commodore", y: 1939, qa: "historic", t: ["ref"], q: "Billie Holiday Strange Fruit 1939 Commodore", w: "原始錄音。" },
      { p: "Nina Simone", l: "Philips《Pastel Blues》", y: 1965, qa: "hifi", t: [], q: "Nina Simone Strange Fruit Pastel Blues", w: "26 年後、民權運動高峰期的另一種詮釋。" }
    ]
  },

  "goodman-singsingsing": {
    title: "〈Sing, Sing, Sing〉", en: "Carnegie Hall · 1938", composer: "Benny Goodman Orchestra",
    q: "Benny Goodman Sing Sing Sing",
    bg: "Louis Prima 作曲。1938 年 1 月 16 日，Benny Goodman 樂團在紐約卡內基音樂廳演出——<b>爵士第一次以完整音樂會的形式進入古典音樂的殿堂</b>。這首長達十多分鐘的版本以 Gene Krupa 的鼓為核心，是整場的高潮。Goodman 也是最早讓黑人與白人樂手公開同台的知名樂團領班之一（Teddy Wilson、Lionel Hampton）。",
    life: "Gene Krupa 的鼓聲被大量電影、廣告與搖擺舞比賽使用。",
    versions: [
      { p: "Benny Goodman Orchestra（卡內基音樂廳現場）", l: "Columbia", y: 1938, qa: "historic", t: ["ref", "live"], q: "Benny Goodman Sing Sing Sing Carnegie Hall 1938", w: "最有名的版本，1950 年才首度發行。" },
      { p: "Benny Goodman Orchestra", l: "Victor（錄音室）", y: 1937, qa: "historic", t: [], q: "Benny Goodman Sing Sing Sing 1937 Victor", w: "錄音室版本，比較短。" }
    ]
  },

  "ella-howhigh": {
    title: "〈How High the Moon〉", en: "Ella in Berlin · 1960", composer: "Ella Fitzgerald",
    q: "Ella Fitzgerald How High the Moon",
    bg: "收在 1960 年 2 月柏林現場的專輯《Ella in Berlin: Mack the Knife》（Verve）。<b>這是 scat 演唱的經典示範</b>：Ella 在即興段落中不斷引用別的曲子的片段，一邊唱一邊跟觀眾開玩笑。同一場的〈Mack the Knife〉她唱到一半忘了詞，就當場自己編——那段也成了名演。",
    versions: [
      { p: "Ella Fitzgerald", l: "Verve《Ella in Berlin》", y: 1960, qa: "hifi", t: ["ref", "live"], q: "Ella Fitzgerald How High the Moon Ella in Berlin 1960", w: "現場錄音。" }
    ]
  },

  /* ---------- 單元 7：比波普 ---------- */
  "parker-koko": {
    title: "〈Ko-Ko〉", en: "Savoy · 1945", composer: "Charlie Parker",
    q: "Charlie Parker Ko-Ko",
    bg: "1945 年 11 月為 Savoy 錄製，常被視為比波普的宣言。<b>它建立在流行歌〈Cherokee〉的和弦上，卻完全不奏原曲旋律</b>——開頭與結尾是 Parker 與 Dizzy Gillespie 編好的快速引子，中間是 Parker 兩輪極快的獨奏，接著是 Max Roach 的鼓。",
    pick: "<b>跟不上是正常的</b>，第一遍只要感受速度。",
    form: "借用〈Cherokee〉的和弦（64 小節 AABA）",
    answer: {
      label: "🔒 <b>段落地圖（答案）</b>",
      head: ["段落", "誰", "聽什麼"],
      rows: [
        ["前奏", "Parker＋Gillespie", "兩把管樂齊奏編好的快速樂句——不是原曲旋律"],
        ["獨奏", "Charlie Parker　中音薩克斯風", "兩輪，每輪走完整個〈Cherokee〉的和弦。<b>這是整首的核心</b>"],
        ["鼓", "Max Roach", "短暫的鼓獨奏"],
        ["尾奏", "Parker＋Gillespie", "回到前奏的材料，收掉"]
      ],
      note: "<b>整首沒有一刻在奏〈Cherokee〉的旋律。</b>比波普樂手常這樣做：借一首舊曲的和弦，寫一條新的旋律（稱為 contrafact）。對照台灣課的歌仔戲「一曲多用」：那邊是同一個曲調配新的詞，這邊是同一組和弦配新的旋律——<b>方向相反，原理相同</b>。"
    },
    versions: [
      { p: "Charlie Parker's Re-Boppers", l: "Savoy", y: 1945, qa: "historic", t: ["ref"], q: "Charlie Parker Ko-Ko 1945 Savoy", w: "原始錄音。" },
      { p: "Charlie Barnet Orchestra（原曲〈Cherokee〉）", l: "Bluebird", y: 1939, qa: "historic", t: ["entry"], q: "Charlie Barnet Cherokee 1939", w: "〈Ko-Ko〉借用和弦的那首原曲。先聽這個，再聽 Parker 怎麼把它拆掉。" }
    ]
  },

  "gillespie-saltpeanuts": {
    title: "〈Salt Peanuts〉", en: "Guild · 1945", composer: "Dizzy Gillespie",
    q: "Dizzy Gillespie Salt Peanuts",
    bg: "Dizzy Gillespie 與鼓手 Kenny Clarke 作曲，1945 年 5 月 Gillespie 與 Charlie Parker 合作錄製（Guild）。<b>主題的核心是一個八度大跳的兩音動機</b>，樂手在曲中用人聲喊出「salt peanuts!」——喊聲的節奏就是那兩個音。Gillespie 是比波普的另一位奠基者，也是最會把複雜音樂變得好笑的人。",
    versions: [
      { p: "Dizzy Gillespie All Star Quintette（Charlie Parker）", l: "Guild", y: 1945, qa: "historic", t: ["ref"], q: "Dizzy Gillespie Charlie Parker Salt Peanuts 1945", w: "原始錄音，Parker 與 Gillespie 同台。" },
      { p: "The Quintet（Massey Hall 現場）", l: "Debut《Jazz at Massey Hall》", y: 1953, qa: "historic", t: ["live"], q: "Jazz at Massey Hall Salt Peanuts 1953", w: "1953 年多倫多的傳奇現場：Parker、Gillespie、Bud Powell、Charles Mingus、Max Roach 同台。" }
    ]
  },

  "monk-straightnochaser": {
    title: "〈Straight, No Chaser〉", en: "Blue Note · 1951", composer: "Thelonious Monk",
    q: "Thelonious Monk Straight No Chaser",
    bg: "Monk 作曲的 12 小節藍調，1951 年首次為 Blue Note 錄製。<b>旋律只用一個很短的動機，不斷移到小節裡不同的位置</b>——同樣幾個音，每次落在不同的拍子上，聽起來就像在跌跌撞撞。這是 Monk 幽默感最好的例子，也可以拿來複習單元 2 的藍調。",
    form: "12 小節藍調",
    versions: [
      { p: "Thelonious Monk", l: "Blue Note", y: 1951, qa: "historic", t: ["ref"], q: "Thelonious Monk Straight No Chaser 1951 Blue Note", w: "原始錄音。" },
      { p: "Thelonious Monk", l: "Columbia《Straight, No Chaser》", y: 1967, qa: "hifi", t: [], q: "Thelonious Monk Straight No Chaser 1967 Columbia", w: "以這首為名的 1967 年專輯，音質好得多。" }
    ]
  },

  /* ---------- 單元 8：酷派與調式 ---------- */
  "miles-blueingreen": {
    title: "〈Blue in Green〉", en: "Kind of Blue · 1959", composer: "Miles Davis",
    q: "Miles Davis Blue in Green",
    bg: "《Kind of Blue》的第三首，全專輯最慢、最安靜的一首。<b>骨架只有 10 小節</b>（不是常見的 12 或 32），頭尾相接成一個圈。唱片上的作曲署名是 Miles Davis，但 Bill Evans 日後表示這首是他寫的——<b>兩說並存，本課程不作裁定</b>。Evans 深受 Debussy 與 Ravel 影響，那種模糊、懸浮的和聲可以直接對照古典課第 18 週的印象派。",
    answer: {
      label: "🔒 <b>聽點對照</b>",
      text: "這首的骨架是 <b>10 小節</b>，而且最後一個和弦會自然地接回第一個——所以很難聽出「一輪」在哪裡結束。<b>如果你覺得它沒有開始也沒有結束，那就聽對了。</b>",
      note: "對照古典課第 18 週 Debussy《牧神的午後前奏曲》：同樣是拿掉明確的方向感，讓聲音懸在空中。"
    },
    versions: [
      { p: "Miles Davis", l: "Columbia《Kind of Blue》", y: 1959, qa: "hires", t: ["ref"], q: "Miles Davis Blue in Green Kind of Blue", w: "原始錄音，有高解析重製版。" },
      { p: "Bill Evans Trio", l: "Riverside《Portrait in Jazz》", y: 1960, qa: "hifi", t: [], q: "Bill Evans Trio Blue in Green Portrait in Jazz", w: "Evans 自己的鋼琴三重奏版本——聽聽他心中的這首曲子。" }
    ]
  },

  "brubeck-takefive": {
    title: "〈Take Five〉", en: "Time Out · 1959", composer: "Dave Brubeck Quartet",
    q: "Dave Brubeck Take Five",
    bg: "收在 1959 年的《Time Out》（Columbia），整張專輯都在實驗不尋常的拍子。<b>〈Take Five〉是 5/4 拍</b>，由中音薩克斯風手 Paul Desmond 作曲，成為最暢銷的爵士單曲之一。鋼琴 Dave Brubeck 整首幾乎一直重複同一個伴奏型，中段是鼓手 Joe Morello 的獨奏。",
    life: "廣告、電影、電視節目的常客，旋律多數人一聽就認得。",
    form: "5/4 拍",
    answer: {
      label: "🔒 <b>聽點對照</b>",
      text: "5/4 拍可以想成 <b>3＋2</b>：「1-2-3、4-5」。鋼琴的伴奏型每 5 拍重複一次，<b>即使在鼓獨奏時也一直在</b>，所以只要跟著鋼琴，就不會數丟。",
      note: "同一張專輯的〈Blue Rondo à la Turk〉是 9/8 拍（2+2+2+3），想再挑戰可以接著聽。"
    },
    versions: [
      { p: "Dave Brubeck Quartet", l: "Columbia《Time Out》", y: 1959, qa: "hires", t: ["ref", "entry"], q: "Dave Brubeck Quartet Take Five Time Out 1959", w: "原始錄音，有高解析重製版。爵士入門最友善的一首。" }
    ]
  },

  "miles-boplicity": {
    title: "〈Boplicity〉", en: "Birth of the Cool · 1949", composer: "Miles Davis Nonet",
    q: "Miles Davis Boplicity",
    bg: "1949 年 4 月為 Capitol 錄製，後來收入專輯《Birth of the Cool》，編曲 Gil Evans。九重奏的編制很特別：<b>除了小號、長號、薩克斯風，還有法國號與低音號</b>——這兩件古典樂團的樂器讓整個聲音變得柔和、圓潤。Gil Evans 後來與 Davis 合作了《Sketches of Spain》等大編制作品。",
    pick: "和單元 7 的比波普連著聽：同樣是 1940 年代末，<b>一個往快、往熱走，一個往慢、往冷走</b>。",
    versions: [
      { p: "Miles Davis Nonet", l: "Capitol《Birth of the Cool》", y: 1949, qa: "historic", t: ["ref"], q: "Miles Davis Boplicity Birth of the Cool 1949", w: "原始錄音。" }
    ]
  },

  /* ---------- 單元 9：硬式比波普 ---------- */
  "blakey-moanin": {
    title: "〈Moanin'〉", en: "Blue Note · 1958", composer: "Art Blakey and the Jazz Messengers",
    q: "Art Blakey Jazz Messengers Moanin",
    bg: "1958 年 10 月為 Blue Note 錄製，鋼琴手 Bobby Timmons 作曲。主題是<b>教會式的一問一答</b>：鋼琴彈一句，管樂用兩個音回答，像會眾在說「阿們」。小號是 20 歲的 Lee Morgan，次中音薩克斯風是 Benny Golson。Art Blakey 的鼓是這個樂團的引擎——他會在獨奏者背後突然用一陣滾奏把音樂往前推。",
    pick: "<b>這首比比波普好哼得多</b>——那正是硬式比波普的用意。",
    form: "32 小節 AABA",
    answer: {
      label: "🔒 <b>主題的一問一答</b>",
      head: ["段", "誰問", "誰答"],
      rows: [
        ["A", "鋼琴（一句旋律）", "管樂（兩個音，像在說「阿們」）"],
        ["A", "同上", "同上"],
        ["B（橋段）", "管樂齊奏另一段旋律", "——"],
        ["A", "鋼琴", "管樂"]
      ],
      note: "對照台灣課單元 5 的客家山歌對唱：同樣是一問一答，<b>一邊來自教會，一邊來自隔著山谷的兩個人</b>。"
    },
    versions: [
      { p: "Art Blakey and the Jazz Messengers", l: "Blue Note《Moanin'》", y: 1958, qa: "hires", t: ["ref", "entry"], q: "Art Blakey Jazz Messengers Moanin 1958 Blue Note", w: "原始錄音，Blue Note 有高解析重製。" }
    ]
  },

  "silver-songformyfather": {
    title: "〈Song for My Father〉", en: "Blue Note · 1964", composer: "Horace Silver",
    q: "Horace Silver Song for My Father",
    bg: "1964 年 10 月錄製，收在同名專輯（Blue Note）。Horace Silver 的父親來自<b>維德角</b>（西非外海的島國），這首曲子的靈感來自他到巴西旅行時聽到的音樂。<b>開頭由鋼琴與低音提琴一起彈的重複低音型</b>，帶著 bossa nova 的搖晃感。次中音薩克斯風獨奏是 Joe Henderson。",
    life: "Steely Dan 1974 年的〈Rikki Don't Lose That Number〉，開頭的低音型借用的就是這首。",
    versions: [
      { p: "Horace Silver Quintet", l: "Blue Note《Song for My Father》", y: 1964, qa: "hires", t: ["ref"], q: "Horace Silver Song for My Father 1964 Blue Note", w: "原始錄音。" }
    ]
  },

  "adderley-mercy": {
    title: "〈Mercy, Mercy, Mercy〉", en: "Capitol · 1966", composer: "Cannonball Adderley Quintet",
    q: "Cannonball Adderley Mercy Mercy Mercy",
    bg: "1966 年錄製（Capitol），鍵盤手 Joe Zawinul 作曲，用的是<b>電鋼琴</b>。這首「靈魂爵士」（soul jazz）登上了流行排行榜——爵士再一次貼近大眾。Zawinul 後來與 Wayne Shorter 組成 Weather Report（單元 12）。",
    versions: [
      { p: "Cannonball Adderley Quintet", l: "Capitol《Mercy, Mercy, Mercy!》", y: 1966, qa: "hifi", t: ["ref"], q: "Cannonball Adderley Mercy Mercy Mercy 1966", w: "原始錄音。" }
    ]
  },

  /* ---------- 單元 10：柯川與自由爵士 ---------- */
  "coltrane-giantsteps": {
    title: "〈Giant Steps〉", en: "Atlantic · 1959", composer: "John Coltrane",
    q: "John Coltrane Giant Steps",
    bg: "1959 年 5 月錄製、1960 年由 Atlantic 發行。<b>和弦換得極快，而且每次都跳到很遠的調</b>（這套進行被稱為「Coltrane changes」），至今仍是爵士樂手練習即興的試金石。常被提起的一個細節：鋼琴手 Tommy Flanagan 錄音時是第一次面對這樣的和弦，他的獨奏聽起來明顯比 Coltrane 吃力。",
    pick: "<b>不用分析和弦。</b>只要感受：這首的「地面」一直在快速移動。",
    versions: [
      { p: "John Coltrane", l: "Atlantic《Giant Steps》", y: 1959, qa: "hires", t: ["ref"], q: "John Coltrane Giant Steps Atlantic 1959", w: "原始錄音，有高解析重製版。" }
    ]
  },

  "coltrane-lovesupreme": {
    title: "《A Love Supreme》〈Acknowledgement〉", en: "Impulse! · 1964", composer: "John Coltrane Quartet",
    q: "John Coltrane A Love Supreme Acknowledgement",
    bg: "1964 年 12 月錄製（Impulse!）。全專輯分四段：〈Acknowledgement〉〈Resolution〉〈Pursuance〉〈Psalm〉，是 Coltrane 獻給神的一部靈性組曲。四重奏：McCoy Tyner（鋼琴）、Jimmy Garrison（低音提琴）、Elvin Jones（鼓）。<b>第一段的核心是一個四個音的低音型</b>，最後由樂手們用人聲唸出「a love supreme」。",
    answer: {
      label: "🔒 <b>聽點對照</b>",
      text: "<b>唸誦的四個音節「a-love-su-preme」，就是那個四音低音型的節奏</b>——同一個動機，先由樂器演奏，最後由人聲說出來。段落後半，Coltrane 把這個動機移到一個又一個不同的調上反覆。",
      note: "最後一段〈Psalm〉也是同一個思路：一般的分析認為，Coltrane 的薩克斯風旋律是在「吹」他印在唱片內頁的一首禱詞，一個音節對一個音。"
    },
    versions: [
      { p: "John Coltrane Quartet", l: "Impulse!", y: 1964, qa: "hires", t: ["ref"], q: "John Coltrane A Love Supreme Part 1 Acknowledgement 1964", w: "原始錄音，有高解析重製版。" }
    ]
  },

  "coleman-lonelywoman": {
    title: "〈Lonely Woman〉", en: "The Shape of Jazz to Come · 1959", composer: "Ornette Coleman",
    q: "Ornette Coleman Lonely Woman",
    bg: "收在 1959 年的《The Shape of Jazz to Come》（Atlantic）。<b>這個四重奏沒有鋼琴</b>：Ornette Coleman（中音薩克斯風）、Don Cherry（短號）、Charlie Haden（低音提琴）、Billy Higgins（鼓）。沒有鋼琴，就沒有人負責「定和弦」——樂手不再照固定的和弦進行即興，而是彼此聆聽、隨時轉向。專輯名稱的意思是「未來爵士的樣子」，發行時引起極大爭議。",
    pick: "<b>這首其實很好聽</b>——旋律哀傷、清楚。它「自由」的地方在底下：鼓很快、低音很慢、旋律自己飄。",
    versions: [
      { p: "Ornette Coleman", l: "Atlantic《The Shape of Jazz to Come》", y: 1959, qa: "hires", t: ["ref"], q: "Ornette Coleman Lonely Woman Shape of Jazz to Come 1959", w: "原始錄音。" }
    ]
  },

  "coltrane-favoritethings": {
    title: "〈My Favorite Things〉", en: "Atlantic · 1960", composer: "John Coltrane",
    q: "John Coltrane My Favorite Things",
    bg: "原是音樂劇《真善美》（The Sound of Music，1959）裡的歌。Coltrane 1960 年錄製（Atlantic，1961 年發行），改用<b>高音薩克斯風</b>，把一首兩分多鐘的音樂劇歌曲變成十幾分鐘的即興——底下長時間只在兩個和弦之間來回，接近單元 8 的調式手法。這張唱片讓高音薩克斯風重新回到爵士的舞台。",
    life: "《真善美》的電影版（1965）在台灣也廣為人知。先聽原曲再聽這首，差距會讓你嚇一跳。",
    versions: [
      { p: "John Coltrane", l: "Atlantic《My Favorite Things》", y: 1960, qa: "hifi", t: ["ref"], q: "John Coltrane My Favorite Things 1960 Atlantic", w: "原始錄音。" },
      { p: "Julie Andrews（電影原聲）", l: "RCA", y: 1965, qa: "hifi", t: ["entry"], q: "Julie Andrews My Favorite Things Sound of Music", w: "先聽原曲。" }
    ]
  },

  /* ---------- 單元 11：拉丁與巴薩諾瓦 ---------- */
  "gillespie-manteca": {
    title: "〈Manteca〉", en: "Victor · 1947", composer: "Dizzy Gillespie Orchestra",
    q: "Dizzy Gillespie Manteca",
    bg: "1947 年 12 月為 Victor 錄製，Gillespie 與古巴康加鼓手 <b>Chano Pozo</b>（及編曲者 Gil Fuller）合寫。這是<b>非洲—古巴爵士</b>（Afro-Cuban jazz）的里程碑：古巴的節奏與比波普的和聲，第一次在大樂團裡真正結合。曲名是西班牙文的「豬油」。",
    pick: "開頭先只聽<b>低音提琴與康加鼓</b>：那個重複的節奏型是整首的地基。",
    versions: [
      { p: "Dizzy Gillespie Orchestra（Chano Pozo）", l: "Victor", y: 1947, qa: "historic", t: ["ref"], q: "Dizzy Gillespie Chano Pozo Manteca 1947", w: "原始錄音。" }
    ]
  },

  "getz-ipanema": {
    title: "〈The Girl from Ipanema〉", en: "Getz/Gilberto · 1963", composer: "Stan Getz & João Gilberto",
    q: "Stan Getz Joao Gilberto The Girl from Ipanema",
    bg: "收在《Getz/Gilberto》（Verve，1963 年錄音、1964 年發行）。作曲 Antônio Carlos Jobim（他也在錄音裡彈鋼琴），João Gilberto 先用葡萄牙文唱，Astrud Gilberto 接著用英文唱，Stan Getz 吹次中音薩克斯風。這張專輯讓 bossa nova 席捲全球，並<b>獲得 1965 年葛萊美獎年度專輯</b>——第一張獲此獎的爵士專輯。",
    life: "全世界被播放最多次的歌曲之一，電梯、咖啡館、機場的常客。",
    versions: [
      { p: "Stan Getz & João Gilberto（Astrud Gilberto 演唱）", l: "Verve《Getz/Gilberto》", y: 1963, qa: "hires", t: ["ref", "entry"], q: "Stan Getz Joao Gilberto Astrud Gilberto The Girl from Ipanema", w: "原始錄音，有高解析重製版。" },
      { p: "Antônio Carlos Jobim", l: "Verve《The Composer of Desafinado, Plays》", y: 1963, qa: "hifi", t: [], q: "Antonio Carlos Jobim The Girl from Ipanema instrumental 1963", w: "作曲者自己的器樂版本。" }
    ]
  },

  /* ---------- 單元 12：融合 ---------- */
  "hancock-chameleon": {
    title: "〈Chameleon〉", en: "Head Hunters · 1973", composer: "Herbie Hancock",
    q: "Herbie Hancock Chameleon",
    bg: "收在 1973 年的《Head Hunters》（Columbia），當時最暢銷的爵士專輯之一。Herbie Hancock 曾是 Miles Davis 五重奏的鋼琴手，這張專輯他改用<b>合成器</b>與放克（funk）節奏——開頭那條低音線就是合成器彈的。",
    versions: [
      { p: "Herbie Hancock", l: "Columbia《Head Hunters》", y: 1973, qa: "hires", t: ["ref"], q: "Herbie Hancock Chameleon Head Hunters 1973", w: "原始錄音，有高解析重製版。" }
    ]
  },

  "weatherreport-birdland": {
    title: "〈Birdland〉", en: "Heavy Weather · 1977", composer: "Weather Report",
    q: "Weather Report Birdland",
    bg: "收在 1977 年的《Heavy Weather》（Columbia），Joe Zawinul 作曲。曲名取自紐約那家以 Charlie Parker 的綽號「Bird」命名的爵士俱樂部。<b>主旋律要等一段時間才完整出現</b>，前面是幾段不同的音型層層鋪陳。電貝斯是 Jaco Pastorius。",
    life: "後來被 The Manhattan Transfer 填詞演唱，也成了大樂團與學生樂團的常演曲目。",
    versions: [
      { p: "Weather Report", l: "Columbia《Heavy Weather》", y: 1977, qa: "hires", t: ["ref"], q: "Weather Report Birdland Heavy Weather 1977", w: "原始錄音。" },
      { p: "The Manhattan Transfer", l: "Atlantic《Extensions》", y: 1979, qa: "hifi", t: [], q: "Manhattan Transfer Birdland Extensions", w: "填詞的人聲版本——同一首曲子變成 scat 合唱。" }
    ]
  }

  };
})();
