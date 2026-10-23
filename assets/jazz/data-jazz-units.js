/* 爵士樂．12 個單元
   欄位與另外兩門課相同（n / m / title / concept / works / tasks / checks / tw…）。
   tw[i] 是第 i 項任務對應的曲目：任務會直接出現在那首曲目的播放按鈕上方。
   tw 的長度必須與 tasks 一致，build.js 會檢查。 */
(function () {
  var J = (window.COURSES = window.COURSES || {}).jazz;

  J.weeks = [
  {
    n: 1, m: "j1", title: "搖擺與節奏組", en: "Swing & the Rhythm Section",
    tw: [["basie-oneoclock"], ["basie-oneoclock"], ["basie-aprilparis"]],
    banner: "爵士入門最常卡住的地方，是<b>不知道要聽什麼</b>。這一單元只聽一件事：獨奏者背後的<b>節奏組</b>——鋼琴、吉他、低音提琴、鼓——它們在做什麼。",
    concept: [
      { tier: "析", t: "「搖擺」（swing）最直觀的說法：把兩個等長的音彈成<b>「長—短」</b>，像說「噹——ㄉㄚ」而不是「噹ㄉㄚ」。但真正讓音樂搖擺起來的，是<b>重拍放在第 2、4 拍</b>——古典音樂與進行曲多半強調第 1、3 拍。" },
      { tier: "史", t: "節奏組的分工：<b>低音提琴走 walking bass</b>（每拍一個音，像在走路）；<b>鼓手右手打 ride 鈸</b>（叮、叮ㄉ叮）；<b>左腳踩 hi-hat，落在第 2、4 拍</b>；<b>鋼琴或吉他負責 comping</b>（伴奏）——不規則地丟和弦給獨奏者。" },
      { tier: "史", t: "Count Basie 樂團的節奏組——Basie（鋼琴）、Freddie Green（吉他）、Walter Page（低音提琴）、Jo Jones（鼓）——在 1930 年代被稱為 <b>All-American Rhythm Section</b>，是搖擺節奏組的範本。Basie 自己的鋼琴彈得極少：<b>留白本身就是他的風格</b>。" }
    ],
    table: {
      head: ["樂器", "在做什麼", "怎麼聽出來"],
      rows: [
        ["低音提琴", "走路：每拍一個音", "最低、最穩的「咚、咚、咚、咚」"],
        ["鼓：ride 鈸", "時間的骨架", "一直在響的金屬聲「叮、叮ㄉ叮」"],
        ["鼓：hi-hat", "標出第 2、4 拍", "兩片鈸合起來的短促「嚓」"],
        ["鋼琴／吉他", "伴奏（comping）", "不規則、短促的和弦"]
      ]
    },
    key: "<b>辨識關鍵：跟著打拍子時，拍在 2 和 4。</b>拍在 1 和 3 會像在聽進行曲；改拍 2 和 4，你就在搖擺了。",
    works: ["basie-oneoclock", "basie-aprilparis"],
    yt: { q: "爵士 搖擺 節奏組 walking bass 示範" },
    tasks: [
      "聽 Count Basie〈One O'Clock Jump〉。<b>只聽低音提琴</b>，用腳跟著它踩：每一拍一下。獨奏者換了一個又一個，它幾乎從頭到尾沒停——這就是 walking bass。聽完展開該曲下方的<b>「🔒 聽點對照」</b>。",
      "再聽一次，這次<b>在第 2、4 拍拍手</b>（心裡數「1、2、3、4」，拍在 2 和 4）。拍一陣子之後，故意改拍 1 和 3，感受差別。",
      "聽〈April in Paris〉。注意<b>大樂團一起奏</b>與<b>一個人獨奏</b>怎麼交替，以及 Basie 的鋼琴有多「少」——他常常只彈幾個音就停。最後聽 Basie 喊「One more time!」之後，樂團做了什麼。"
    ],
    checks: [
      "能在一首爵士樂裡，單獨跟上低音提琴的 walking bass",
      "能在第 2、4 拍拍手，並說出它與拍 1、3 的感覺差異"
    ],
    note: { tier: "選", t: "如果你覺得「好像沒在聽音樂、只是在數拍子」——那正是這個單元的設計。<b>節奏組是爵士的地板</b>，地板踩穩了，後面每一位獨奏者才聽得出是在什麼上面說話。" }
  },

  {
    n: 2, m: "j1", title: "藍調：十二小節的骨架", en: "The Blues · Twelve Bars",
    tw: [["bessie-stlouis"], ["rollins-blueseven"], ["miles-allblues"]],
    banner: "藍調是爵士的地基。<b>記住一個 12 小節的框架</b>，你就能聽懂一半以上的爵士曲子在做什麼。",
    concept: [
      { tier: "析", t: "「藍調」（blues）有兩個意思：一種<b>曲式</b>——12 小節、三個和弦的固定框架；以及一種<b>聲音</b>——藍調音，比大調音階略低、介於大小調之間的音。爵士兩者都用。" },
      { tier: "析", t: "12 小節的骨架（見下表）不必記和弦名稱，只要記住兩個轉彎：<b>第 5 小節「換一個地方」，第 9 小節開始「往回走」</b>。歌詞常是 <b>AAB</b>：第一句唱兩次，第三句回答。" },
      { tier: "析", t: "<b>這就是主題與變奏。</b>同一個 12 小節框架反覆十幾遍，每一遍（稱為一個 <b>chorus</b>）由不同的人在上面即興。與古典課第 15 週 Brahms 第 4 號末樂章的帕薩卡利亞——同一段 8 小節的主題反覆 30 餘次——是同一個原理。" }
    ],
    table: {
      head: ["小節", "和弦", "聽起來"],
      rows: [
        ["1–4", "I", "在家"],
        ["<b>5–6</b>", "<b>IV</b>", "<b>換一個地方</b>"],
        ["7–8", "I", "回家"],
        ["<b>9</b>", "<b>V</b>", "<b>最緊張的地方，開始往回走</b>"],
        ["10", "IV", "放鬆一點"],
        ["11–12", "I", "回家，準備下一輪"]
      ]
    },
    key: "<b>12 小節的兩個轉彎：第 5 小節、第 9 小節。</b>每次聽到音樂「換了一個地方」又「繞回來」，就是一輪走完了。（上表是最常見的版本，實際演奏常有變化。）",
    works: ["bessie-stlouis", "rollins-blueseven"],
    extraWorks: ["miles-allblues"],
    yt: { q: "12 bar blues 十二小節藍調 教學" },
    tasks: [
      "聽 Bessie Smith〈St. Louis Blues〉（1925）。跟著歌詞：第一句唱完，<b>是不是又唱了一次同一句，第三句才回答？</b>這就是藍調歌詞的 AAB。也注意每句唱完之後，Louis Armstrong 的短號都會「回一句」。",
      "聽 Sonny Rollins〈Blue Seven〉。開頭先只有低音提琴。<b>記住 Rollins 主題的前幾個音</b>，然後聽他的獨奏怎麼一次又一次回到這個小動機——拆開、變形、再組回來。聽完展開該曲下方的<b>「🔒 聽點對照」</b>。",
      "延伸：聽 Miles Davis〈All Blues〉。這也是藍調，但每小節<b>六拍</b>（6/8）。試著數 12 小節：每小節「1-2-3-4-5-6」。"
    ],
    checks: [
      "能在一首藍調中數出 12 小節為一輪",
      "能說出藍調歌詞 AAB 的結構，並舉出一個例子"
    ],
    note: { tier: "選", t: "數不出 12 小節很正常——<b>先數「轉彎」就好</b>：聽到和聲突然換了一個方向（第 5 小節），心裡記一下；再聽到它繞回來，就差不多是一輪。" }
  },

  {
    n: 3, m: "j1", title: "標準曲、曲式與即興", en: "Standards, Form & Improvisation",
    tw: [["hawkins-bodysoul"], ["miles-sowhat"], ["miles-sowhat"], ["monk-roundmidnight"]],
    banner: "爵士樂手不是在「演奏一首歌」，而是<b>在一首歌的骨架上重新說一遍</b>。這個單元學的，就是那副骨架長什麼樣子。",
    concept: [
      { tier: "史", t: "「標準曲」（standard）是爵士樂手的共同曲庫，多半來自 1920–50 年代的百老匯與好萊塢歌曲。樂手熟記它們的和弦，可以不經排練直接上台合奏。<b>所以同一首〈Body and Soul〉有上千個版本，每一個都是一件獨立的作品。</b>" },
      { tier: "析", t: "最常見的曲式是 <b>32 小節 AABA</b>：A 段 8 小節、再一次 A、中間一段不一樣的 B（稱為<b>橋段 bridge</b>），最後回到 A。<b>找得到橋段，你就不會在一首爵士樂裡迷路。</b>" },
      { tier: "析", t: "小編制爵士的標準流程：<b>主題（head）→ 輪流獨奏 → 主題</b>。開頭和結尾大家一起奏旋律，中間每個人輪流即興，每一輪都走完整個 32 小節。<b>這就是古典課第 3 週的「主題與變奏」，差別在於變奏是當場生出來的。</b>" }
    ],
    table: {
      head: ["段", "小節", "聽起來"],
      rows: [
        ["A", "1–8", "主旋律"],
        ["A", "9–16", "同一段旋律再一次（結尾可能略有不同）"],
        ["<b>B（橋段）</b>", "17–24", "<b>換一個地方</b>：新的旋律、新的和聲"],
        ["A", "25–32", "回家"]
      ]
    },
    key: "<b>聽一首爵士樂時，先問兩件事：現在是主題還是獨奏？如果是獨奏，現在輪到誰？</b>這兩個問題答得出來，就不會迷路。",
    works: ["hawkins-bodysoul", "miles-sowhat", "monk-roundmidnight"],
    yt: { q: "jazz standard AABA form 爵士 曲式 主題 獨奏" },
    tasks: [
      "聽 Coleman Hawkins〈Body and Soul〉（1939）。先聽該曲下方 Billie Holiday 的版本記住原曲旋律，再聽 Hawkins：<b>他什麼時候還在奏原曲，什麼時候已經完全離開？</b>",
      "聽 Miles Davis〈So What〉。<b>找出主題、獨奏、主題三段</b>，並記下獨奏的順序——四位獨奏者，樂器都不一樣。聽完展開該曲下方的<b>「🔒 段落地圖（答案）」</b>核對。",
      "再聽一次〈So What〉的主題，這次找<b>橋段</b>：低音提琴「問」、管樂「答」重複兩輪之後，<b>整個音樂升高半音</b>——那就是 B 段。8 小節後它又降回來。",
      "版本比較：〈'Round Midnight〉先聽 Monk 自己彈，再聽 Miles Davis 1956 年的版本。<b>同一首曲子，哪一個聽起來比較「怪」？怪在哪裡？</b>"
    ],
    checks: [
      "能在一首 AABA 曲子中指出橋段開始的位置",
      "能說出「主題—獨奏—主題」的流程，並在一首曲子裡指出現在是誰在獨奏"
    ],
    after: "<b>模組一完成。</b>你現在有三件工具：<b>搖擺</b>（節奏組在做什麼）、<b>骨架</b>（12 小節藍調與 32 小節 AABA）、<b>流程</b>（主題—獨奏—主題）。接下來九個單元不管聽到什麼，都可以先問：骨架是哪一種？現在是誰在說話？"
  },

  {
    n: 4, m: "j2", title: "紐奧良：集體即興", en: "New Orleans · Collective Improvisation",
    tw: [["oliver-dippermouth"], ["oliver-dippermouth"], ["morton-blackbottom"]],
    banner: "<b>本模組的錄音都很舊。</b>1920 年代的唱片雜訊多、低音少、鼓幾乎錄不到——請先接受這件事，專心聽前排的樂器。這是爵士誕生的現場，沒有替代品。",
    concept: [
      { tier: "析", t: "爵士在 20 世紀初誕生於<b>紐奧良</b>：非裔美國人的藍調與靈歌、街頭與葬禮遊行的銅管樂隊、拉格泰姆鋼琴（ragtime）、加勒比海與歐洲的音樂，在這座港口城市混在一起。<b>它不是一個人的發明。</b>" },
      { tier: "析", t: "紐奧良爵士的核心是<b>集體即興</b>：小號（或短號）吹主旋律，單簧管在上面繞著飛，長號在底下滑——<b>三條線同時即興、互不相讓</b>。這是<b>複音</b>，與古典課第 2 週的巴赫、台灣課單元 7 的布農族 Pasibutbut 是同一個概念。" },
      { tier: "史", t: "1917 年第一張被稱為爵士的唱片，由白人樂團 Original Dixieland Jass Band 錄製。King Oliver 的 Creole Jazz Band 在 1923 年的錄音，則是最早完整保存黑人紐奧良樂團聲音的錄音之一。" }
    ],
    table: {
      head: ["前排", "角色", "怎麼聽出來"],
      rows: [
        ["小號／短號", "主旋律", "最響、最直接"],
        ["單簧管", "在上面繞", "最高、音最多"],
        ["長號", "在下面推", "最低，常用滑音"]
      ]
    },
    key: "<b>辨識關鍵：好幾件管樂器同時在即興，卻不打架。</b>分得出三條線各在做什麼，就聽懂紐奧良爵士了。",
    works: ["oliver-dippermouth", "morton-blackbottom"],
    yt: { q: "New Orleans jazz collective improvisation 紐奧良爵士" },
    tasks: [
      "聽 King Oliver〈Dipper Mouth Blues〉。<b>先只跟短號，再只跟單簧管，再只跟長號</b>——各聽一遍。三條線一直同時在走，這就是集體即興。聽完展開該曲下方的<b>「🔒 聽點對照」</b>。",
      "再聽一次，找 King Oliver 的<b>弱音器短號獨奏</b>：聲音像被摀住，會「哇、哇」地變化。這段獨奏太有名，後來的樂手照著吹了幾十年。",
      "聽 Jelly Roll Morton〈Black Bottom Stomp〉。找出<b>樂團突然全部停住、只剩一件樂器</b>的地方（斷奏，stop-time）。和〈Dipper Mouth Blues〉比，這首哪裡聽起來更「有設計」？"
    ],
    checks: [
      "能在紐奧良爵士中分辨小號、單簧管、長號三條線",
      "能說出集體即興與古典課「複音」概念的關係"
    ]
  },

  {
    n: 5, m: "j2", title: "阿姆斯壯：獨奏者登場", en: "Louis Armstrong · The Rise of the Soloist",
    tw: [["armstrong-westend"], ["armstrong-westend"], ["armstrong-potatohead"]],
    flag: "爵士史最重要的 15 秒",
    banner: "如果爵士史只能記一個名字，大多數評論者會選 <b>Louis Armstrong</b>。這個單元聽他怎麼把爵士從「大家一起說」變成「一個人站出來說」。",
    concept: [
      { tier: "析", t: "Armstrong 做的事可以濃縮成一句：<b>把爵士的重心從集體即興移到個人獨奏</b>。1925–28 年他以 Hot Five、Hot Seven 名義錄的一系列唱片，是這個轉變發生的現場。" },
      { tier: "析", t: "他也改變了唱歌。<b>scat</b>——用沒有意義的音節即興演唱——因他 1926 年的〈Heebie Jeebies〉而流行。據說是他唱到一半歌詞紙掉了，只好用聲音繼續唱；這個故事流傳極廣，但無法查證。" },
      { tier: "史", t: "〈West End Blues〉（1928）的開頭是一段<b>完全沒有伴奏的小號獨奏</b>，常被列為爵士史上最重要的錄音片段之一。曲子是他的老師 King Oliver 寫的——<b>五年前，Armstrong 還是 Oliver 樂團裡的第二短號</b>（單元 4）。" }
    ],
    key: "<b>連著聽單元 4 與本單元：只隔五年，小號從「三條線之一」變成「全場唯一的主角」。</b>",
    works: ["armstrong-westend", "armstrong-potatohead"],
    extraWorks: ["armstrong-wonderful"],
    yt: { q: "Louis Armstrong West End Blues 分析" },
    tasks: [
      "聽〈West End Blues〉<b>前 15 秒</b>——那段無伴奏小號——聽三遍，每一遍只注意一件事：它停了幾次？最高的音在哪裡？聽起來像在「說話」還是在「唱歌」？",
      "聽完整首〈West End Blues〉。找出 Armstrong 和單簧管<b>一問一答</b>的段落：單簧管吹一句，他用 scat 唱一句。聽完展開該曲下方的<b>「🔒 段落地圖（答案）」</b>。",
      "聽〈Potato Head Blues〉，找 Armstrong 的<b>斷奏獨奏</b>：樂團每隔一下才打一個和弦，把空間全讓給他。<b>和單元 4 的集體即興比，差在哪裡？</b>"
    ],
    checks: [
      "能說出 Armstrong 對爵士的關鍵貢獻（從集體即興到個人獨奏）",
      "能辨識 scat 演唱，並說出它與一般歌唱的差別"
    ]
  },

  {
    n: 6, m: "j2", title: "大樂團與歌手", en: "Big Bands & Singers",
    tw: [["ellington-atrain"], ["holiday-strangefruit"], ["ella-howhigh"]],
    banner: "1930 年代中到 1940 年代中，<b>爵士是全美國的流行音樂</b>。這個單元聽兩件事：十幾個人的大樂團怎麼「寫」，以及爵士歌手怎麼「說」。",
    concept: [
      { tier: "史", t: "這段時期稱為<b>搖擺年代</b>（Swing Era）。大樂團通常 12–17 人：<b>小號、長號、薩克斯風三個聲部</b>，加上節奏組。舞廳是它的主場，跳舞是它的目的。" },
      { tier: "析", t: "大樂團的關鍵在<b>編曲</b>：聲部之間的<b>呼叫與回應</b>——薩克斯風奏一句，銅管回一句。<b>Duke Ellington 是把整個樂團當成一件樂器來寫的人</b>：他依照每一位團員獨特的音色寫譜。對照古典課第 18 週拉威爾的配器法。" },
      { tier: "析", t: "爵士歌手的關鍵不是音量或高音，而是<b>咬字與時間感</b>。Billie Holiday 常把字唱得比拍子晚一點點（behind the beat），讓同一句歌詞聽起來像在說話；Ella Fitzgerald 則把人聲當成樂器，用 scat 即興。" }
    ],
    key: "<b>聽大樂團時，把它想成三組人在對話：</b>薩克斯風、小號、長號。現在是誰在說話？誰在回應？",
    works: ["ellington-atrain", "holiday-strangefruit"],
    extraWorks: ["goodman-singsingsing", "ella-howhigh"],
    yt: { q: "Duke Ellington big band 大樂團 搖擺年代" },
    tasks: [
      "聽 Ellington〈Take the 'A' Train〉。找出<b>薩克斯風聲部</b>與<b>銅管聲部</b>輪流說話的地方：一組奏一句，另一組回應。",
      "聽 Billie Holiday〈Strange Fruit〉。<b>先讀該曲下方的「📖 歌詞大意」再聽</b>。只注意一件事：她的聲音在哪幾個地方變得最冷、最平？",
      "延伸：聽 Ella Fitzgerald〈How High the Moon〉（1960 柏林現場）的 scat 段落。她在即興中<b>引用了好幾首別的曲子</b>——你認出了哪幾首？（認不出來也沒關係，聽她怎麼把人聲當樂器用。）"
    ],
    checks: [
      "能在大樂團中分辨薩克斯風聲部與銅管聲部",
      "能說出 Billie Holiday 的唱法與一般流行歌手的差別"
    ],
    after: "<b>模組二完成。</b>你聽過了爵士的前三十年：紐奧良的集體即興、Armstrong 的獨奏、大樂團的舞曲。接下來，爵士要從舞廳走進俱樂部——音樂會變快、變難，也變成「聽」的音樂。"
  },

  {
    n: 7, m: "j3", title: "比波普", en: "Bebop",
    tw: [["parker-koko"], ["parker-koko"], ["gillespie-saltpeanuts"]],
    banner: "<b>這個單元第一遍一定跟不上，那是正常的。</b>比波普是刻意做得又快又難的音樂——它就是要讓只想跳舞的人跟不上。",
    concept: [
      { tier: "史", t: "1940 年代初中期，一群年輕樂手在紐約哈林區的 Minton's Playhouse 等俱樂部，下班後即興合奏（jam session），發展出<b>比波普</b>：Charlie Parker（中音薩克斯風）、Dizzy Gillespie（小號）、Thelonious Monk（鋼琴）、Kenny Clarke 與 Max Roach（鼓）。" },
      { tier: "析", t: "比波普的三個特徵：<b>極快</b>、<b>和聲更複雜</b>（在原本的和弦上疊更多音、塞進更多和弦）、<b>小編制</b>（五人左右，不再是十幾人的大樂團）。<b>最重要的轉變是：爵士從舞曲變成聽的音樂</b>——這麼快，沒有人能跳舞。" },
      { tier: "析", t: "比波普樂手常把舊曲子的和弦拿來，<b>寫一條全新的旋律</b>（contrafact）。Parker 的〈Ko-Ko〉就建立在流行歌〈Cherokee〉的和弦上。這和台灣課歌仔戲的「一曲多用」方向相反：那邊是同一個曲調配新的詞，這邊是同一組和弦配新的旋律。" }
    ],
    table: {
      head: ["", "搖擺年代（單元 6）", "比波普（單元 7）"],
      rows: [
        ["編制", "12–17 人大樂團", "<b>5 人左右</b>"],
        ["目的", "跳舞", "<b>聽</b>"],
        ["速度", "中快", "<b>極快</b>"],
        ["重心", "編曲、合奏", "<b>個人即興</b>"],
        ["場所", "舞廳", "<b>小俱樂部</b>"]
      ]
    },
    key: "<b>比波普聽不懂旋律沒關係，先抓住鼓手的 ride 鈸。</b>只要時間的骨架還在，你就沒有迷路。",
    works: ["parker-koko", "gillespie-saltpeanuts"],
    extraWorks: ["monk-straightnochaser"],
    yt: { q: "bebop Charlie Parker 比波普 介紹" },
    tasks: [
      "聽 Charlie Parker〈Ko-Ko〉（1945）。<b>不用跟旋律</b>——跟不上是正常的。只做一件事：跟著鼓手的 ride 鈸打拍子，感受那個速度。",
      "先聽該曲下方的原曲〈Cherokee〉，再聽一次〈Ko-Ko〉：<b>哪一段比較像「寫好的」、哪一段比較像「當場說的」？</b>聽完展開<b>「🔒 段落地圖（答案）」</b>。",
      "聽 Dizzy Gillespie〈Salt Peanuts〉。樂手在曲中<b>用人聲喊出「salt peanuts!」</b>——注意那個喊聲的節奏，就是旋律開頭那兩個音。"
    ],
    checks: [
      "能說出比波普與搖擺大樂團在編制、目的、速度上的差異",
      "能在一首比波普中分辨「編好的主題」與「即興獨奏」"
    ]
  },

  {
    n: 8, m: "j3", title: "酷派與調式", en: "Cool Jazz & Modal Jazz",
    tw: [[], ["miles-blueingreen"], ["brubeck-takefive"]],
    banner: "上一單元把爵士推到最快、最滿。這一單元往反方向走：<b>更慢、更輕、更多空間</b>。",
    concept: [
      { tier: "史", t: "1949–50 年，Miles Davis 九重奏的錄音（後來集結為《Birth of the Cool》）用了<b>法國號與低音號</b>——兩件古典樂團的樂器——讓爵士的聲音變得柔和、圓潤。這個方向被稱為<b>酷派爵士</b>（cool jazz）。" },
      { tier: "析", t: "1959 年的《Kind of Blue》是<b>調式爵士</b>（modal jazz）的里程碑：不再每一兩拍就換一個和弦，而是<b>在一個音階上停留很久</b>——〈So What〉的 A 段 16 小節只有一個調式。樂手從「追著和弦跑」變成「在一片顏色裡慢慢走」。" },
      { tier: "析", t: "同一年，Dave Brubeck 四重奏的《Time Out》實驗不尋常的拍子：〈Take Five〉是 <b>5/4 拍</b>。爵士在 1959 年同時往好幾個方向打開——調式、奇數拍，以及下一個模組的自由爵士。" }
    ],
    key: "<b>連著聽單元 7 的〈Ko-Ko〉和單元 3 的〈So What〉：</b>前者每幾拍就換一個和弦，後者 16 小節停在同一個顏色上。同樣是小編制爵士，相隔不到 15 年。",
    works: ["miles-blueingreen", "brubeck-takefive"],
    extraWorks: ["miles-boplicity"],
    yt: { q: "modal jazz Kind of Blue 調式爵士 介紹" },
    tasks: [
      "回頭聽單元 3 的〈So What〉，這次只注意<b>和聲換得有多慢</b>。然後立刻聽單元 7 的〈Ko-Ko〉。感受「快速換和弦」與「長時間停在一個顏色」的差別。",
      "聽〈Blue in Green〉。這首曲子<b>好像沒有明顯的開始與結束</b>——試著指出它從哪裡又「回到起點」。聽完展開該曲下方的<b>「🔒 聽點對照」</b>。",
      "聽〈Take Five〉。跟著數「1-2-3-4-5」：鋼琴的伴奏型每 5 拍重複一次。<b>數得出來嗎？中段鼓獨奏時，還數得住嗎？</b>"
    ],
    checks: [
      "能說出調式爵士與比波普在「和弦換得多快」上的差異",
      "能在〈Take Five〉中跟著數出 5 拍"
    ]
  },

  {
    n: 9, m: "j3", title: "硬式比波普", en: "Hard Bop",
    tw: [["blakey-moanin"], ["silver-songformyfather"], ["blakey-moanin"]],
    banner: "比波普讓爵士變成了藝術，也讓它離一般聽眾愈來愈遠。<b>硬式比波普是把聽眾找回來的那一步</b>：同樣的技術，加上藍調和教會的味道。",
    concept: [
      { tier: "析", t: "1950 年代中後期，紐約、底特律、費城的樂手把比波普的技術，和<b>藍調、福音詩歌</b>（gospel）的感覺接回來，稱為<b>硬式比波普</b>（hard bop）。Blue Note 唱片公司是這個風格的大本營。" },
      { tier: "析", t: "最明顯的特徵是<b>呼叫與回應</b>：一句問、一句答，來自非裔美國人的教會——牧師說一句，會眾回一句。對照<b>台灣課單元 5 的客家山歌對唱</b>：同樣是一問一答，一邊是教會，一邊是隔著山谷。" },
      { tier: "史", t: "Art Blakey 的 Jazz Messengers 是硬式比波普的「學校」：數十年間培養出大批重要樂手——Lee Morgan、Wayne Shorter、Freddie Hubbard、Wynton Marsalis 都曾是團員。" }
    ],
    key: "<b>硬式比波普最好認的地方：你哼得出來。</b>一首 1950 年代末的小編制爵士，如果旋律像教會歌、節奏很穩、聽一遍就記得住——多半就是它。",
    works: ["blakey-moanin", "silver-songformyfather"],
    extraWorks: ["adderley-mercy"],
    yt: { q: "hard bop Art Blakey Blue Note 硬式比波普" },
    tasks: [
      "聽 Art Blakey〈Moanin'〉的主題。<b>誰在「問」？誰在「答」？</b>答的那兩個音，像不像有人在說「阿們」？聽完展開該曲下方的<b>「🔒 主題的一問一答」</b>。",
      "聽 Horace Silver〈Song for My Father〉。注意<b>開頭鋼琴與低音提琴一起彈的重複低音型</b>——它帶著巴西 bossa nova 的搖晃感，單元 11 會再遇到。",
      "比較單元 7 的〈Ko-Ko〉和這單元的〈Moanin'〉：同樣是五人左右的小編制，<b>哪一首比較容易跟著哼？為什麼？</b>"
    ],
    checks: [
      "能辨識爵士中的呼叫與回應",
      "能說出硬式比波普與比波普在聽感上的差異"
    ],
    after: "<b>模組三完成。</b>從 1940 到 1960 年，爵士在二十年間走了三步：比波普（加速、加難）、酷派與調式（減法、留白）、硬式比波普（找回藍調）。下一個模組，爵士要開始拆掉自己的規則。"
  },

  {
    n: 10, m: "j4", title: "柯川與自由爵士", en: "Coltrane & Free Jazz",
    flag: "整門課門檻最高的一單元",
    tw: [["coltrane-giantsteps"], ["coltrane-lovesupreme"], ["coleman-lonelywoman"], ["coltrane-favoritethings"]],
    banner: "<b>聽不慣是正常的</b>——古典課第 20 週的荀貝格也一樣。這個單元的目標不是喜歡上它，而是聽懂它<b>拿掉了什麼</b>。",
    concept: [
      { tier: "析", t: "John Coltrane 在五年內走了兩個方向相反的極端：1959 年的〈Giant Steps〉<b>和弦換得極快、跳得極遠</b>，至今仍是爵士樂手的試金石；1964 年的《A Love Supreme》則是<b>一部四段的靈性組曲</b>，獻給神。" },
      { tier: "史", t: "同一年（1959），Ornette Coleman 的《The Shape of Jazz to Come》<b>拿掉了鋼琴</b>，也拿掉了固定的和弦進行——樂手不再「照和弦即興」，而是彼此聆聽、隨時轉向。這個方向被稱為<b>自由爵士</b>（free jazz）。" },
      { tier: "析", t: "對照古典課第 20 週的 Schoenberg：兩者都在<b>拿掉一套系統</b>——那邊拿掉調性，這邊拿掉和弦。聽眾的反應也一樣兩極。" }
    ],
    key: "<b>聽自由爵士的方法：不要找旋律或和弦，改聽「誰在回應誰」。</b>樂手之間的對話，取代了原本的骨架。",
    works: ["coltrane-giantsteps", "coltrane-lovesupreme", "coleman-lonelywoman"],
    extraWorks: ["coltrane-favoritethings"],
    yt: { q: "John Coltrane A Love Supreme Giant Steps 介紹" },
    tasks: [
      "聽〈Giant Steps〉。<b>不用分析和弦</b>，只比較一件事：鋼琴手 Tommy Flanagan 的獨奏，聽起來是不是比 Coltrane「卡」？當年錄音時，他也是第一次面對這樣的和弦進行。",
      "聽《A Love Supreme》第一段〈Acknowledgement〉。注意那個<b>四個音的低音型</b>，以及最後樂手們<b>用人聲唸出「a love supreme」</b>——唸誦和那個低音型是什麼關係？聽完展開該曲下方的<b>「🔒 聽點對照」</b>。",
      "聽 Ornette Coleman〈Lonely Woman〉。這首<b>沒有鋼琴</b>：鼓打得很快、低音提琴走得很慢、兩把管樂吹一段哀傷的旋律。<b>你覺得它是快還是慢？</b>",
      "延伸：聽〈My Favorite Things〉。先聽該曲下方《真善美》的原曲，再聽 Coltrane 怎麼把一首兩分多鐘的歌，變成十幾分鐘的即興。"
    ],
    checks: [
      "能說出〈Giant Steps〉與《A Love Supreme》代表的兩種不同方向",
      "能說出自由爵士「拿掉了什麼」，並與古典課的荀貝格對照"
    ]
  },

  {
    n: 11, m: "j4", title: "拉丁與巴薩諾瓦", en: "Latin Jazz & Bossa Nova",
    tw: [["gillespie-manteca"], ["gillespie-manteca", "getz-ipanema"], ["getz-ipanema"]],
    banner: "爵士往旁邊打開的一扇門：<b>換一種節奏的骨架</b>。搖擺是「長—短」的流動，拉丁是幾個節奏型的咬合。",
    concept: [
      { tier: "史", t: "1947 年，Dizzy Gillespie 邀請古巴康加鼓手 <b>Chano Pozo</b> 加入大樂團，合寫〈Manteca〉——<b>非洲—古巴節奏</b>正式進入爵士，稱為 Afro-Cuban jazz。" },
      { tier: "析", t: "拉丁音樂的節奏骨架叫 <b>clave</b>：一個 3＋2（或 2＋3）的不對稱節奏型，所有樂器都圍繞它排列。<b>搖擺是流動的，clave 是咬合的</b>——兩種完全不同的「律動」。" },
      { tier: "史", t: "1950 年代末的巴西，João Gilberto 與 Antônio Carlos Jobim 發展出 <b>bossa nova</b>（葡萄牙文「新潮流」）：森巴的節奏放輕、放慢，配上低聲細語的唱法。1964 年的《Getz/Gilberto》讓它席捲全球。" }
    ],
    key: "<b>拍手測試：</b>跟著 clave 拍「拍、拍、拍——拍、拍」（3＋2）。拍得上去的，多半有拉丁節奏的骨架；拍不上去、卻很想在 2、4 拍拍手的，是搖擺。",
    works: ["gillespie-manteca", "getz-ipanema"],
    yt: { q: "Afro-Cuban jazz clave bossa nova 拉丁爵士 介紹" },
    tasks: [
      "聽〈Manteca〉的開頭：低音提琴與康加鼓先建立一個不斷重複的節奏型，管樂再一層一層疊上去。<b>它和單元 6 的 Ellington，差在哪裡？</b>",
      "跟著 clave 拍手：「拍、拍、拍——拍、拍」。先在〈Manteca〉上試，再試〈The Girl from Ipanema〉。哪一首比較容易抓到？",
      "聽〈The Girl from Ipanema〉。João Gilberto 先用葡萄牙文唱，Astrud Gilberto 接著用英文唱。<b>兩人的唱法有什麼共同點？</b>（提示：音量）"
    ],
    checks: [
      "能說出搖擺節奏與拉丁節奏（clave）的差異",
      "能辨識 bossa nova 的唱法與節奏特徵"
    ]
  },

  {
    n: 12, m: "j4", title: "融合，以及接下來", en: "Fusion & What Comes Next",
    tw: [["hancock-chameleon"], ["weatherreport-birdland"], [], []],
    banner: "最後一個單元做三件事：<b>聽爵士插上電之後的樣子、把十二個單元串起來、決定接下來往哪裡走。</b>",
    concept: [
      { tier: "史", t: "1969–70 年，Miles Davis 的《In a Silent Way》《Bitches Brew》把<b>電吉他、電鋼琴、搖滾節奏</b>帶進爵士，稱為<b>融合爵士</b>（fusion）。他的樂手們各自組團：Herbie Hancock 的 Head Hunters、Joe Zawinul 與 Wayne Shorter 的 Weather Report。" },
      { tier: "析", t: "融合爵士常被老派樂迷批評為「不是爵士」，這個爭論從 1970 年代吵到今天，<b>本課程不作裁定</b>。值得注意的是，同樣的話在 1940 年代也被拿來罵比波普。" },
      { tier: "析", t: "今天的爵士同時有好幾條路：延續傳統的、與嘻哈和 R&B 結合的（例如 Robert Glasper）、大編制靈性路線的（例如 Kamasi Washington）。<b>爵士從來不是一種固定的聲音，而是一種做音樂的方法</b>：一副骨架、一群人、當場說話。" }
    ],
    table: {
      head: ["風格", "年代", "一句話"],
      rows: [
        ["紐奧良", "1910–20 年代", "三條線一起即興"],
        ["搖擺／大樂團", "1930–40 年代", "全美國的舞曲"],
        ["比波普", "1940 年代", "快到不能跳舞"],
        ["酷派／調式", "1950 年代", "減法與留白"],
        ["硬式比波普", "1950–60 年代", "把藍調與教會找回來"],
        ["自由爵士", "1960 年代", "拿掉和弦"],
        ["拉丁／巴西", "1940–60 年代", "換一種節奏骨架"],
        ["融合", "1970 年代起", "插上電"]
      ]
    },
    key: "<b>如果你只帶走一件事：</b>爵士的每一次演出都是當場的創作。同一首曲子，換一群人、換一個晚上，就是另一件作品——<b>所以爵士最好的聽法，永遠是同一首聽兩個版本，或去現場聽一次。</b>",
    works: ["hancock-chameleon", "weatherreport-birdland"],
    yt: { q: "jazz fusion Herbie Hancock Weather Report 融合爵士" },
    tasks: [
      "聽 Herbie Hancock〈Chameleon〉的開頭：那條低音<b>不是低音提琴，是合成器</b>。整首建立在一個不斷重複的低音型上——<b>這和單元 9〈Song for My Father〉、單元 11〈Manteca〉的重複低音型，是同一個思路嗎？</b>",
      "聽 Weather Report〈Birdland〉。主旋律要等一陣子才完整出現——<b>在它出現之前，你聽到了幾段不同的音型？</b>",
      "打開<b>★ 重聽區</b>，看看你這十二個單元收藏了哪些。<b>你偏向哪一個時期？</b>那就是你的起點。（重聽區跨課程共用，古典與台灣課的收藏也在裡面。）",
      "找一場<b>現場</b>。爵士比任何一種音樂都更依賴現場：同一首曲子，今晚和明晚不會一樣。"
    ],
    checks: [
      "能說出融合爵士帶進了哪些新的元素",
      "重聽區已有內容，並能說出自己偏向哪一個時期"
    ],
    gaps: {
      title: "這門課沒有涵蓋的東西",
      items: [
        "<b>拉格泰姆與跨步鋼琴</b>：Scott Joplin、James P. Johnson、Fats Waller、Art Tatum——爵士鋼琴的源頭",
        "<b>吉普賽爵士</b>：Django Reinhardt 與 Stéphane Grappelli，歐洲第一個重要的爵士聲音",
        "<b>Charles Mingus</b>：貝斯手、作曲家，把教會、藍調、Ellington 與政治全寫進大編制作品裡",
        "<b>西岸爵士</b>：Chet Baker、Gerry Mulligan 等，與本課單元 8 的酷派同一脈絡",
        "<b>風琴三重奏與靈魂爵士</b>：Jimmy Smith 的 Hammond 風琴",
        "<b>歐洲與 ECM 唱片的爵士</b>：Keith Jarrett《The Köln Concert》等",
        "<b>更多的歌手</b>：Sarah Vaughan、Nat King Cole、Frank Sinatra、Nina Simone……",
        "<b>台灣與亞洲的爵士</b>：本課完全沒有碰，這是一個真實的缺口"
      ]
    },
    live: "<b>強烈建議：去聽一次現場。</b>爵士的即興是當場發生的，錄音只是某一個晚上的紀錄。台灣各大城市都有固定排爵士演出的 live house 與酒吧，也有大型的戶外爵士音樂節（例如每年秋天的臺中爵士音樂節）。查詢時用「爵士 現場」加上城市名；演出資訊請以主辦單位公告為準。"
  }
  ];
})();
