/* 爵士樂．參考頁面（資料驅動，由 app.js 的 pageHTML() 渲染）
   appendix: true 的頁面排在側邊欄的「附錄」區。 */
(function () {
  var J = (window.COURSES = window.COURSES || {}).jazz;
  var core = J.core;

  J.pages = [
  {
    id: "p-start", icon: "十", title: "先聽這 10 首", en: "Start Here · The First Ten",
    blocks: [
      { p: "整門課有 12 個單元、30 多首曲目。<b>但你不需要按順序來。</b>下面這十首依「好入口」而非「歷史順序」排列——前三首幾乎人人都聽得進去，最後三首是這門課最難的地方。聽完這十首，爵士的主要地貌就大致完整了。" },
      { banner: "<b>預估時間：約 70 分鐘。</b>一次聽完會累，建議分三次。每一首<b>至少聽兩遍</b>：第一遍只聽，第二遍照旁邊的提示只注意一件事。" },
      { h3: "第一輪：三個最好的入口", tier: "選" },
      { picks: [
        { label: "1　Dave Brubeck〈Take Five〉", sub: "1959 · 5/4 拍。<b>旋律多數人一聽就認得</b>，先從這裡開始", q: "Dave Brubeck Quartet Take Five Time Out 1959", qa: "hires" },
        { label: "2　Miles Davis〈So What〉", sub: "1959 ·《Kind of Blue》。低音提琴問、管樂答——<b>史上最暢銷的爵士專輯之一的第一首</b>", q: "Miles Davis So What Kind of Blue", qa: "hires" },
        { label: "3　Stan Getz & João Gilberto〈The Girl from Ipanema〉", sub: "1963 · bossa nova。輕、慢、低聲細語", q: "Stan Getz Joao Gilberto Astrud Gilberto The Girl from Ipanema", qa: "hires" }
      ] },
      { note: "這三首刻意選得彼此不同：<b>一個奇數拍、一個調式、一個巴西節奏</b>。它們的共同點只有一個：都很好聽，而且都是當場即興出來的。" },
      { folds: [
        { t: "第二輪：往回走到源頭", sub: "第 4–7 首 · 聽完第一輪再點開", blocks: [
          { picks: [
            { label: "4　Art Blakey〈Moanin'〉", sub: "1958 · 教會式的一問一答，<b>你哼得出來的那種爵士</b>", q: "Art Blakey Jazz Messengers Moanin 1958 Blue Note", qa: "hires" },
            { label: "5　Duke Ellington〈Take the 'A' Train〉", sub: "1941 · 搖擺大樂團。音質變舊了，請先接受這件事", q: "Duke Ellington Take the A Train 1941", qa: "historic" },
            { label: "6　Louis Armstrong〈West End Blues〉", sub: "1928 · <b>開頭 15 秒的無伴奏小號</b>，爵士史最重要的錄音片段之一", q: "Louis Armstrong Hot Five West End Blues 1928", qa: "historic" },
            { label: "7　Coleman Hawkins〈Body and Soul〉", sub: "1939 · 幾乎一開始就離開原曲旋律，整段都是即興", q: "Coleman Hawkins Body and Soul 1939", qa: "historic" }
          ] }
        ] },
        { t: "第三輪：最難的三首", sub: "第 8–10 首", blocks: [
          { picks: [
            { label: "8　Charlie Parker〈Ko-Ko〉", sub: "1945 · 比波普。<b>跟不上是正常的</b>，先感受速度", q: "Charlie Parker Ko-Ko 1945 Savoy", qa: "historic" },
            { label: "9　John Coltrane〈Acknowledgement〉", sub: "1964 ·《A Love Supreme》第一段。注意那個四個音的低音型", q: "John Coltrane A Love Supreme Part 1 Acknowledgement 1964", qa: "hires" },
            { label: "10　Ornette Coleman〈Lonely Woman〉", sub: "1959 · 自由爵士。<b>旋律其實很好聽</b>，自由的是底下", q: "Ornette Coleman Lonely Woman Shape of Jazz to Come 1959", qa: "hires" }
          ] }
        ] }
      ] },
      { h3: "聽完之後" },
      { p: "這十首走完，你大致碰過了這條線：<br><b>紐奧良 → 搖擺 → 比波普 → 調式 → 硬式比波普 → 自由 → 巴西</b><br>接下來從左側的<b>單元 1</b> 開始。前三個單元會給你三件工具（搖擺、骨架、誰在獨奏），之後再聽這十首，會聽到完全不一樣的東西。" }
    ]
  },

  {
    id: "p-listen", icon: "耳", title: "怎麼聽一首爵士樂", en: "How to Listen to a Jazz Record",
    blocks: [
      { p: "爵士最常讓人放棄的原因是「聽不出在幹嘛」。<b>下面九條是實際有用的聽法與找法</b>，點開看細節。" },
      { banner: "<b>一句話版本：</b>先找主題，再問「現在輪到誰」。答得出這兩件事，就不會在一首爵士樂裡迷路。" },
      { folds: [
        { t: "一、先找主題", sub: "開頭與結尾", blocks: [
          { p: "小編制爵士幾乎都是<b>主題 → 輪流獨奏 → 主題</b>。開頭那段大家一起奏的旋律就是主題（head）——<b>記住它，結尾它會再回來</b>，你就知道曲子要結束了。" } ] },
        { t: "二、問「現在輪到誰」", sub: "最有用的一條", blocks: [
          { p: "獨奏是一個人接一個人輪流的：小號、薩克斯風、鋼琴、有時貝斯和鼓。<b>每換一個人，音色就變一次</b>——不用認得樂手，只要聽出「換人了」就夠。〈So What〉的段落地圖（單元 3）是最好的練習。" } ] },
        { t: "三、聽不懂獨奏時，改聽節奏組", blocks: [
          { p: "獨奏太快、太複雜時，<b>把注意力移到底下</b>：低音提琴每拍一個音、鼓手的 ride 鈸一直在響。只要你還跟得上它們，就沒有迷路。這是單元 1 整個在練的事。" } ] },
        { t: "四、數骨架", sub: "12 小節或 32 小節", blocks: [
          { p: "大多數爵士曲子不是 <b>12 小節藍調</b>（單元 2），就是 <b>32 小節 AABA</b>（單元 3）。數不出小節沒關係，<b>先聽「轉彎」</b>：藍調在第 5、9 小節轉彎；AABA 在第 17 小節進入橋段。" } ] },
        { t: "五、同一首聽兩個版本", sub: "爵士最好的學法", blocks: [
          { p: "爵士的每一次演出都是重新即興，<b>所以比較版本比古典音樂更有收穫</b>。單元 3 的〈'Round Midnight〉、〈Body and Soul〉都附了不同年代、不同樂手的版本——連著聽，你會清楚聽到「同一副骨架、不同的人在說話」。" } ] },
        { t: "六、聽專輯，不只聽單曲", blocks: [
          { p: "1950 年代以後的爵士多半是<b>以專輯為單位</b>設計的：《Kind of Blue》《Time Out》《A Love Supreme》的曲序都是刻意安排的。<b>喜歡哪一首，就把那張專輯從頭聽完。</b>" } ] },
        { t: "七、搜尋：演奏者＋曲名＋年份", sub: "KKBOX／YouTube 都適用", blocks: [
          { p: "同一首曲子有上百個版本，<b>只搜曲名一定會找錯</b>。本課每個版本的搜尋字串都是「演奏者＋曲名＋年份或專輯」。自己找的時候也照這個格式，例如：<code>Miles Davis So What 1959</code>。" } ] },
        { t: "八、舊錄音請多給一點耐心", blocks: [
          { p: "1920–40 年代的錄音雜訊多、低音少，鼓幾乎錄不到。<b>請不要因此跳過</b>——這是爵士誕生的現場。聽的時候把注意力放在<b>前排的管樂器</b>上，耳朵很快就會習慣。" } ] },
        { t: "九、現場錄音與錄音室錄音都要聽", blocks: [
          { p: "現場錄音（例如 Ella Fitzgerald 的柏林現場、Miles Davis 的《Four & More》）通常更快、更自由，有觀眾的反應；錄音室錄音則更精緻。<b>同一位樂手兩種都聽，最能聽出他「當場」的那一面。</b>" } ] }
      ] },
      { note: "<b>聽不出細節也沒關係。</b>爵士樂手自己也是一聽再聽同一張唱片學起來的。這門課的設計就是：<b>少聽幾首，每首多聽幾遍</b>。" }
    ]
  },

  {
    id: "p-inst", icon: "器", title: "樂器辨識", en: "Instruments · Who Is Playing",
    blocks: [
      { p: "爵士的樂器不多，<b>難的是分辨同一家族的成員</b>——尤其是三種薩克斯風。下面分成兩組：站在前面吹旋律的，以及在後面撐起時間與和聲的節奏組。" },
      { banner: "<b>圖是手繪線稿，不是照片。</b>小號、長號、單簧管、低音提琴直接沿用古典課的線稿——同一件樂器在兩門課裡長得一樣。圖中<b>填色的部分就是辨識關鍵</b>。" },
      { instcards: true },
      { h3: "最容易搞混的三組", tier: "選" },
      { p: "這三組用文字說不清楚，直接看圖最快。" },
      { instcompare: true },
      { note: "<b>建議做法：</b>每認一件樂器，就找一段它當主角的錄音聽 2 分鐘。中音薩克斯風聽單元 8 的〈Take Five〉，次中音聽單元 3 的〈Body and Soul〉，加弱音器的小號聽單元 3 的〈'Round Midnight〉（Miles Davis 版）。" }
    ]
  },

  {
    id: "p-cross", icon: "橋", title: "與另外兩門課的對照", en: "Cross-Course Listening",
    blocks: [
      { p: "三門課放在同一個網站，理由在這一頁。<b>古典課教的四項聆聽工具（音色、織體、曲式、調性）在爵士裡全部用得上</b>，台灣課的「一曲多用」與「對唱」在這裡也找得到對應。下面七組最值得連著聽——兩首接著聽，中間不要停。" },
      { folds: [
        { t: "1　複音：巴赫 vs. 紐奧良爵士", sub: "最推薦從這組開始", blocks: [
          { p: "古典課<b>第 2 週</b>：多條地位平等的旋律線同時進行。<b>紐奧良的集體即興是同一個概念</b>——差別只在巴赫是寫好的，King Oliver 的樂團是當場生出來的。台灣課單元 7 的 Pasibutbut 則是第三種解法：連旋律都沒有，只剩聲部之間的關係。" },
          { picks: [
            { label: "Bach《賦格的藝術》", sub: "古典課第 2 週", q: "Bach Art of Fugue Contrapunctus 1", qa: "hifi" },
            { label: "King Oliver〈Dipper Mouth Blues〉", sub: "本課單元 4", q: "King Oliver Creole Jazz Band Dipper Mouth Blues 1923", qa: "historic" },
            { label: "布農族〈Pasibutbut〉", sub: "台灣課單元 7", q: "布農族 Pasibutbut 祈禱小米豐收歌", qa: "historic" } ] } ] },
        { t: "2　反覆的框架：帕薩卡利亞 vs. 藍調", blocks: [
          { p: "Brahms 第 4 號末樂章（古典課<b>第 15 週</b>）把同一段 8 小節的主題反覆 30 多次，每一次在上面寫新的變奏。<b>藍調的 chorus 是一模一樣的原理</b>：同一個 12 小節的框架反覆，每一輪有人在上面即興。" },
          { picks: [
            { label: "Brahms 第 4 號交響曲 末樂章", sub: "古典課第 15 週", q: "Brahms Symphony 4 Kleiber", qa: "hires" },
            { label: "Sonny Rollins〈Blue Seven〉", sub: "本課單元 2", q: "Sonny Rollins Blue Seven Saxophone Colossus 1956", qa: "hifi" } ] } ] },
        { t: "3　舊骨架填新東西：七字調 vs. 比波普", blocks: [
          { p: "歌仔戲的<b>七字調</b>（台灣課單元 4）是同一個曲調配上新的詞，一個曲調可以唱一輩子。比波普反過來：<b>同一組和弦配上新的旋律</b>——Charlie Parker 的〈Ko-Ko〉就是把〈Cherokee〉的和弦拿來重寫。方向相反，原理相同：<b>骨架是公共財，填進去的才是當下的創作。</b>" },
          { picks: [
            { label: "歌仔戲〈七字調〉", sub: "台灣課單元 4", q: "歌仔戲 七字調", qa: "hifi" },
            { label: "Charlie Barnet〈Cherokee〉→ Charlie Parker〈Ko-Ko〉", sub: "本課單元 7（先聽原曲）", q: "Charlie Parker Ko-Ko 1945 Savoy", qa: "historic" } ] } ] },
        { t: "4　配器：〈波麗露〉vs. Ellington", blocks: [
          { p: "拉威爾〈波麗露〉（古典課<b>第 18 週</b>）旋律不變，靠換樂器推進整首曲子。<b>Duke Ellington 的寫法更進一步：他不是寫給「一把小號」，而是寫給「這一位小號手」</b>，每個團員的個人音色本身就是配器的材料。" },
          { picks: [
            { label: "Ravel《波麗露》", sub: "古典課第 18 週", q: "Ravel Bolero", qa: "hires" },
            { label: "Duke Ellington〈Take the 'A' Train〉", sub: "本課單元 6", q: "Duke Ellington Take the A Train 1941", qa: "historic" } ] } ] },
        { t: "5　懸浮的和聲：Debussy vs. Bill Evans", sub: "兩者的關聯屬【析】層", blocks: [
          { p: "Bill Evans 深受 Debussy 與 Ravel 影響，這是樂評的通說。<b>〈Blue in Green〉那種模糊、沒有方向的和聲</b>，和古典課<b>第 18 週</b>《牧神的午後前奏曲》是同一個家族——都在拿掉「往哪裡去」的感覺，讓聲音懸在空中。" },
          { picks: [
            { label: "Debussy《牧神的午後前奏曲》", sub: "古典課第 18 週", q: "Debussy Prelude a l'apres-midi d'un faune", qa: "hires" },
            { label: "Miles Davis〈Blue in Green〉", sub: "本課單元 8", q: "Miles Davis Blue in Green Kind of Blue", qa: "hires" } ] } ] },
        { t: "6　拿掉一套系統：Schoenberg vs. Ornette Coleman", blocks: [
          { p: "古典課<b>第 20 週</b>的 Schoenberg 拿掉了調性；Ornette Coleman（本課單元 10）拿掉了和弦。<b>兩者相隔 50 年，做的是同一件事，引起的反應也一樣兩極。</b>" },
          { picks: [
            { label: "Schoenberg《月光小丑》", sub: "古典課第 20 週", q: "Schoenberg Pierrot Lunaire", qa: "hires" },
            { label: "Ornette Coleman〈Lonely Woman〉", sub: "本課單元 10", q: "Ornette Coleman Lonely Woman Shape of Jazz to Come 1959", qa: "hires" } ] } ] },
        { t: "7　一問一答：客家山歌 vs. 硬式比波普", blocks: [
          { p: "客家山歌（台灣課<b>單元 5</b>）原是隔著山谷的對唱：一個人唱一句，另一個人回一句。〈Moanin'〉（本課單元 9）的主題也是一問一答，來源是非裔美國人的教會——牧師說一句，會眾回一句。<b>兩個完全沒有關聯的傳統，長出了同一種形狀。</b>" },
          { picks: [
            { label: "客家〈老山歌〉", sub: "台灣課單元 5", q: "客家 老山歌", qa: "hifi" },
            { label: "Art Blakey〈Moanin'〉", sub: "本課單元 9", q: "Art Blakey Jazz Messengers Moanin 1958 Blue Note", qa: "hires" } ] } ] }
      ] },
      { note: "<b>★ 重聽區跨課程共用。</b>三門課的收藏放在一起，你可以直接看出自己偏向哪一邊——那個比例本身就是資訊。" }
    ]
  },

  {
    id: "p-glossary", icon: "詞", title: "名詞速查", en: "Glossary", appendix: true,
    blocks: [
      { p: "這門課用到的爵士術語。很多詞在中文裡沒有固定的譯法，所以保留原文。" },
      { table: { head: ["名詞", "意思"], rows: core.glossary.map(function (g) { return ["<b>" + g.t + "</b>", g.d]; }) } }
    ]
  },

  {
    id: "p-caveats", icon: "限", title: "限制與爭議", en: "Caveats & Disputes", appendix: true,
    blocks: [
      { p: "爵士史比古典音樂史年輕，但爭議不比較少——很多關於「誰先、誰發明、誰的功勞」的故事，至今仍在辯論。本課程的原則：<b>可查證的寫成史實，傳說寫明「據說」，爭議兩說並陳。</b>" },
      { table: { head: ["項目", "說明"], rows: core.caveats.map(function (c) { return ["<b>" + c.t + "</b>", c.d]; }) } }
    ]
  }
  ];
})();
