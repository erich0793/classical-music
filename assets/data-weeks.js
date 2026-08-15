/* 24 週單元資料。tasks[0] 為「必做」＝核心 15 分鐘的最低完成標準 */
window.WEEKS = [
{
  n: 1, m: "m1", title: "音色與樂器辨識", en: "Timbre & Instrumentation",
  tw: [["britten-ypg"], ["prokofiev-peter"], []],
  yt: { q: "管弦樂團 樂器" },
  concept: [
    { tier: "析", t: "管弦樂團依發聲原理分為四大家族：<b>弦樂（strings）、木管（woodwinds）、銅管（brass）、打擊（percussion）</b>。辨識樂器是所有後續聆聽的基礎——你無法描述你聽不出來的東西。" }
  ],
  works: ["britten-ypg", "prokofiev-peter", "saintsaens-carnival"],
  tasks: [
    "聽 Britten Op. 34。<b>先不要打開下面的「🔒 對照表（答案）」</b>，準備紙筆，每一段開始時寫下你判斷的樂器家族（弦／木管／銅管／打擊）。全曲結束後展開對照表，答對數 ÷ 19 就是正確率。",
    "聽《彼得與狼》，記下每個角色對應的樂器，再展開下面的<b>「🔒 對照表（答案）」</b>核對。此曲刻意將「角色—樂器」一對一綁定，是最有效的記憶錨點；旁白版會直接報答案，練習時可先忽略旁白。",
    "挑出三種你<b>最容易混淆</b>的樂器（常見組合：雙簧管 oboe vs. 單簧管 clarinet；小號 trumpet vs. 法國號 horn；中提琴 viola vs. 大提琴 cello），單獨搜尋該樂器的獨奏曲各聽 2 分鐘。"
  ],
  checks: [
    "能在合奏中辨識出弦樂、木管、銅管、打擊四大家族",
    "能單獨辨識：小提琴、大提琴、長笛、雙簧管、單簧管、小號、法國號、定音鼓"
  ]
},
{
  n: 2, m: "m1", title: "織體", en: "Texture",
  tw: [["gregorian", "chopin-noc9-2", "bach-artoffugue"], ["bach-artoffugue"], []],
  yt: { q: "複音 織體 對位" },
  concept: [
    { tier: "析", t: "織體指音樂中「同時進行的聲部之間的關係」。" }
  ],
  table: {
    head: ["織體", "定義", "聽覺特徵"],
    rows: [
      ["<b>單音織體</b><br>Monophony", "僅一條旋律線，無伴奏", "「只有一個人在唱／拉」"],
      ["<b>主音織體</b><br>Homophony", "一條主旋律 + 伴奏聲部", "「有主角，其他人在襯托」——流行音樂幾乎皆屬此類"],
      ["<b>複音織體</b><br>Polyphony", "多條<b>地位平等</b>的旋律線同時進行", "「好幾條旋律在互相追逐，聽不出誰是主角」"]
    ]
  },
  key: "辨識關鍵：問自己「這裡有幾條旋律？它們是平等的嗎？」",
  works: ["gregorian", "chopin-noc9-2", "bach-artoffugue"],
  tasks: [
    "依序聽上表三首。聽 Chopin 時，用一隻手在膝上跟著「主旋律」比劃；聽 Bach 時，嘗試同樣的事——<b>你會發現手不夠用</b>。這個挫折感就是複音織體的體驗本身。",
    "聽 Bach《賦格的藝術》第一首，只追蹤<b>最低聲部（bass）</b>，忽略其他聲部。再聽一次，只追蹤最高聲部。",
    "隨機播放任一古典曲目，在 30 秒內判定其織體類型。重複 5 次。"
  ],
  checks: ["能在 30 秒內判定一段音樂的織體類型", "理解「複音織體聽起來比較複雜」不是錯覺，而是結構事實"]
},
{
  n: 3, m: "m1", title: "曲式", en: "Form",
  tw: [["haydn-94"], ["beethoven-elise"], []],
  yt: { q: "曲式 變奏" },
  concept: [
    { tier: "析", t: "曲式是音樂的時間結構。所有曲式都建立在三種基本操作上：<b>重複（repetition）、對比（contrast）、變化（variation）</b>。入門階段先掌握三種：<br>• <b>二段體 / 三段體（Binary / Ternary, AB / ABA）</b>：最基本的對比結構。ABA 的關鍵是「回來了」的辨識。<br>• <b>主題與變奏（Theme and Variations）</b>：同一主題經歷多次改裝。<br>• <b>迴旋曲式（Rondo, ABACA…）</b>：主題反覆回歸，中間穿插不同段落。" }
  ],
  works: ["haydn-94", "mozart-k525", "beethoven-elise"],
  tasks: [
    "聽 Haydn 第 94 號第二樂章。<b>數出主題共出現幾次</b>，並在每次出現時記下「這次變了什麼」（變快？變成小調？加了裝飾音？換了樂器？）。聽完展開該曲下方的<b>「🔒 對照表（答案）」</b>核對。",
    "聽《給愛麗絲》，標記主題（那段最有名的旋律）每次回歸的時刻。你會發現它回來了三次。",
    "在本週任一背景聆聽中，只做一件事：<b>察覺「這段我剛才聽過」的時刻</b>。這是曲式感知的起點。"
  ],
  checks: ["能辨識主題的回歸", "能描述變奏中「改變了哪一個參數」"]
},
{
  n: 4, m: "m1", title: "調性與張力", en: "Tonality & Tension",
  tw: [["mozart-40", "mozart-41"], ["bach-wtc1-prelude"], []],
  yt: { q: "大調 小調 調性" },
  concept: [
    { tier: "析", t: "調性系統是西方古典音樂約 1600–1900 年間的組織原則。入門階段需掌握三件事：<br>1. <b>大調 vs. 小調</b>：最粗糙但最有用的區分。大調聽感偏明亮、穩定；小調偏黯淡、緊張。<b>此為文化習得之聽感關聯，非物理必然</b>——但在西方古典曲目中高度一致。<br>2. <b>終止感（cadence）</b>：音樂「講完一句話」的感覺。完全終止給人「句號」感，半終止給人「逗號」感。<br>3. <b>轉調（modulation）</b>：音樂中途換了「家」。聽覺特徵是「本來很穩定的地方，突然變得不太一樣，但也還算穩定」。" }
  ],
  works: ["mozart-40", "mozart-41", "bach-wtc1-prelude"],
  tasks: [
    "連續對比聽 Mozart 第 40 號與第 41 號的開頭各 60 秒。<b>不要分析，只感受兩者的情緒差異。</b> 這個差異就是小調與大調。",
    "聽 Bach 平均律第一首前奏曲（約 2 分鐘）。此曲無旋律，只有分解和弦——<b>它是純粹的和聲流動</b>。聽的時候只注意「什麼時候感覺穩定、什麼時候感覺想往前走」。",
    "隨機播放 10 段古典音樂片段，各聽 20 秒，判定大調或小調。目標正確率 70%。"
  ],
  checks: ["能以約 70% 正確率區分大小調", "能察覺樂句結束（終止感）的位置"],
  after: "<b>模組一完成後的自我評估</b>：若四項自我檢核中有兩項以上未達成，建議<b>重做本模組一次</b>再前進。這四項工具在後續 20 週中會不斷使用，基礎不穩會使後續學習事倍功半。"
},
{
  n: 5, m: "m2", title: "協奏曲與 Ritornello 形式", en: "Concerto & Ritornello",
  tw: [["vivaldi-seasons"], ["vivaldi-seasons"], ["bach-bwv1050"]],
  yt: { q: "韋瓦第 協奏曲 巴洛克" },
  concept: [
    { tier: "析", t: "<b>協奏曲（concerto）</b>的核心是「獨奏 vs. 合奏」的對抗與對話。巴洛克協奏曲多採 <b>ritornello 形式</b>：合奏段（ritornello，「回歸段」）反覆回來，中間穿插獨奏段。<b>這是第 3 週迴旋曲式概念在巴洛克的具體實現。</b>" }
  ],
  works: ["vivaldi-seasons", "bach-bwv1048", "bach-bwv1050"],
  tasks: [
    "聽《四季》之〈春〉第一樂章。<b>標記每一次合奏主題（ritornello）回來的時刻</b>。你會發現它像副歌一樣反覆出現，中間夾著小提琴獨奏。聽完展開該曲下方的<b>「🔒 對照表（答案）」</b>核對段落地圖。",
    "聽《四季》之〈夏〉第三樂章，對照該樂章的十四行詩（描述雹暴）——<b>詩的原文與中譯就放在該曲的「🔒 對照表」裡</b>，是 Vivaldi 出版時親自附上的。這是「音樂描繪具體事物」的早期範例。",
    "聽布蘭登堡第 5 號第一樂章。<b>找出那段極長的大鍵琴獨奏開始的位置</b>（提示：<b>不在中段</b>），再展開該曲下方的<b>「🔒 對照表（答案）」</b>核對。此段常被視為鍵盤協奏曲的濫觴。"
  ],
  extraWorks: ["corelli-op6"]
},
{
  n: 6, m: "m2", title: "對位法與賦格", en: "Counterpoint & Fugue",
  tw: [["bach-wtc1-fugue"], ["bach-goldberg"], ["bach-cello1"]],
  yt: { q: "賦格 巴哈", v: [{ t: "極致的音樂創作方式！賦格，為什麼這麼重要?", id: "5o1KYoXO6l4" }] },
  concept: [
    { tier: "析", t: "<b>賦格（fugue）</b>是複音織體的最高度組織形式。基本機制：<br>1. <b>主題（subject）</b>由單一聲部獨自呈示。<br>2. 第二聲部以<b>答題（answer）</b>進入（通常在五度上），此時第一聲部繼續，形成<b>對題（countersubject）</b>。<br>3. 各聲部依序進入，之後主題在不同聲部、不同調性上反覆出現，中間穿插<b>插句（episode）</b>。" }
  ],
  key: "入門者只需掌握一件事：辨識主題每一次的進入。",
  works: ["bach-wtc1-fugue", "bach-goldberg", "bach-cello1"],
  note: { tier: "史析", t: "<b>一則值得注意的個案</b>：廣為人知的《d 小調觸技曲與賦格》BWV 565，其作者歸屬在音樂學界存在爭議。此例可作為理解分類系統的實例：「BWV 565 存在」屬【史】；「它是否為巴赫所作」則屬【析】——通說與異見並存，本課程據此不將其列為巴赫代表作。" },
  tasks: [
    "聽 BWV 846 賦格（約 2 分鐘）。<b>先單獨記住開頭的主題</b>（前 5 秒），然後從頭聽，每次聽到主題出現就在紙上畫一筆。全曲聽 3 遍，<b>比較三次的計數是否一致</b>（目標是自己三次一致，不是命中某個數字——原因見該曲的「🔒 對照表」）。",
    "聽《郭德堡變奏曲》的詠嘆調（Aria，第一軌）與最後一軌（Aria da capo）。兩者為同一段音樂，中間隔著 30 個變奏。感受「回到原點但你已經不同」的效果。",
    "聽大提琴組曲第 1 號前奏曲。此曲<b>只有一件樂器、一條線</b>，但透過分解和弦暗示出完整的和聲進行——這是「單旋律暗示複音」的極致範例。"
  ]
},
{
  n: 7, m: "m2", title: "聲樂與神劇", en: "Vocal Music & Oratorio",
  tw: [["handel-messiah"], ["bach-matthew"], ["handel-messiah", "bach-bminor-mass"]],
  yt: { q: "神劇 受難曲 合唱" },
  concept: [
    { tier: "析", t: "巴洛克聲樂作品的兩種基本單位：<br>• <b>宣敘調（recitative）</b>：接近說話的節奏，推進劇情，伴奏稀疏。<br>• <b>詠嘆調（aria）</b>：旋律性強，時間「停下來」，人物抒發情感。多採 <b>da capo aria（ABA）</b>形式。" }
  ],
  key: "辨識線索：聽起來「像在講話、沒什麼旋律」= 宣敘調；聽起來「開始唱歌了、旋律優美且會重複」= 詠嘆調。",
  works: ["handel-messiah", "bach-bminor-mass", "bach-matthew"],
  tasks: [
    "聽《彌賽亞》開頭連續三軌。<b>標記宣敘調與詠嘆調的切換點</b>——你會清楚感覺到「講話模式」與「唱歌模式」的差別。",
    "聽《馬太受難曲》中的〈Erbarme dich〉（女中音詠嘆調 + 小提琴獨奏）。此曲常被列為巴赫最著名的單曲之一。只聽，不分析。",
    "對比《彌賽亞》〈Hallelujah〉與 Bach《b 小調彌撒》Kyrie：同為大型合唱，<b>一者外向宣示、一者內向懇求</b>。感受兩者的情緒差異如何由音樂手段造成。"
  ]
},
{
  n: 8, m: "m3", title: "奏鳴曲式", en: "Sonata Form", flag: "全課程最關鍵的單一單元",
  tw: [["mozart-40"], ["mozart-40"], ["mozart-40"], ["beethoven-5"]],
  yt: { q: "奏鳴曲式 交響曲 結構", v: [{ t: "大解密！貝多芬如何寫出偉大的《命運交響曲》!?", id: "me3Ji3KVdwg" }] },
  banner: "奏鳴曲式是 1750 年後約 150 年間西方器樂音樂的主導結構，掌握它等於掌握了大部分交響曲、協奏曲、奏鳴曲、四重奏第一樂章的地圖。<b>若時間有限，請優先投資本週。</b>",
  concept: [{ tier: "析", t: "奏鳴曲式三大段：" }],
  table: {
    head: ["段落", "內容", "聽覺辨識線索"],
    rows: [
      ["<b>呈示部</b><br>Exposition", "第一主題（主調）→ 過渡 → 第二主題（屬調或關係大調）→ 結束句", "通常會<b>整段重複一次</b>（早期作品）。聽到「咦，剛才那段又來了」就是呈示部反覆"],
      ["<b>發展部</b><br>Development", "主題素材被拆解、轉調、重組，調性不穩定", "<b>聽起來「迷路了」、不知道現在在哪裡</b>——這種不安定感就是發展部"],
      ["<b>再現部</b><br>Recapitulation", "兩個主題皆回歸，且<b>皆在主調上</b>", "<b>「開頭的東西原封不動回來了」的瞬間非常明顯</b>。這是最容易辨識的結構點"]
    ]
  },
  works: ["mozart-40", "mozart-k525", "beethoven-5"],
  tasks: [
    "聽 Mozart K. 550 第一樂章，<b>專門找「再現部開始」的那個瞬間</b>——即開頭那個著名主題原封不動回來的時刻。找到後記下時間點，再展開該曲下方的<b>「🔒 奏鳴曲式地圖（答案）」</b>核對。<b>這一個任務就值得單獨花 15 分鐘。</b>",
    "同一樂章聽第二遍，這次找<b>第二主題</b>：第一主題結束後，音樂會經過一段不安定的過渡，然後出現一個<b>性格明顯不同、較為抒情</b>的新旋律。",
    "聽第三遍，標出發展部的起訖。提示：呈示部結束後（若有反覆則為第二次結束後），音樂開始「亂跑」的地方即為發展部起點。",
    "用同樣的三個步驟分析 Beethoven 第 5 號第一樂章。此曲的動機（三短一長）在發展部中被拆解得極為徹底，是觀察「素材如何被發展」的最佳範例。"
  ],
  checks: ["能在 Mozart K. 550 第一樂章中指出再現部的起點", "能區分第一主題與第二主題的性格差異"]
},
{
  n: 9, m: "m3", title: "交響曲的成形", en: "Symphony",
  tw: [["haydn-94"], ["mozart-41"], ["haydn-94"]],
  yt: { q: "海頓 交響曲", v: [{ t: "深入解析，莫札特的音樂為什麼聽起來很「順」?", id: "CLX_fCC97Sk" }] },
  concept: [{ tier: "析", t: "古典交響曲的標準四樂章配置：" }],
  table: {
    head: ["樂章", "速度", "常見曲式", "功能"],
    rows: [
      ["I", "快板 Allegro", "奏鳴曲式", "最具份量的結構性樂章"],
      ["II", "慢板 Adagio / Andante", "三段體、主題與變奏", "抒情核心"],
      ["III", "中速", "小步舞曲 Minuet / 詼諧曲 Scherzo（ABA）", "舞曲性格"],
      ["IV", "快板 / 急板 Presto", "奏鳴曲式、迴旋曲式", "終樂章，收束全局"]
    ]
  },
  works: ["haydn-94", "haydn-104", "mozart-41"],
  tasks: [
    "完整聽 Haydn 第 94 號（約 23 分鐘）。<b>每個樂章結束時暫停，用一句話寫下該樂章的性格。</b> 目的是建立「四樂章是一個整體」的架構感。",
    "聽 Mozart 第 41 號末樂章。此樂章結尾將五個主題以對位方式同時疊置——<b>這是古典時期形式與巴洛克對位技術的結合</b>。即使聽不出五條線，也請感受那種「越堆越滿、最後爆開」的效果。",
    "對照第 3 週所學：Haydn 第 94 號第二樂章即為主題與變奏。此時再聽一次，你應該能辨識得比第 3 週更清楚。"
  ]
},
{
  n: 10, m: "m3", title: "協奏曲與歌劇（Mozart）", en: "Concerto & Opera",
  tw: [["mozart-k466"], ["mozart-flute"], ["mozart-figaro"]],
  yt: { q: "莫札特 協奏曲 歌劇", v: [{ t: "為什麼莫札特鋼琴協奏曲是極品尤物？", id: "K5fSeWInowc" }, { t: "《阿瑪迪斯》仍然是神作？深入解析莫札特電影的音樂歷史意涵", id: "Orzo38LamfQ" }, { t: "最多餘的?也是最感人的? 莫札特「聖體頌」為何如此感人?", id: "PYGeap5AGUU" }] },
  concept: [
    { tier: "析", t: "古典協奏曲與巴洛克協奏曲的差異：獨奏者的角色從「合奏中的領奏」轉為<b>具有戲劇性人格的獨立主體</b>。標誌性特徵為<b>裝飾奏（cadenza）</b>——樂團停止，獨奏者獨自演奏一段技巧展示，傳統上帶即興性質。" }
  ],
  works: ["mozart-k466", "mozart-k467", "mozart-figaro", "mozart-flute"],
  tasks: [
    "聽 K. 466 第一樂章，<b>找出裝飾奏的位置</b>：樂團突然全體停止、只剩鋼琴獨奏、之後樂團再進來收尾。此結構在幾乎所有古典協奏曲中皆適用。",
    "聽《魔笛》夜后詠嘆調〈Der Hölle Rache〉。注意人聲被當作<b>器樂化的技巧展示工具</b>使用。",
    "聽《費加洛的婚禮》序曲（約 4 分鐘）。這是「用純器樂建立戲劇氣氛」的範例。"
  ]
},
{
  n: 11, m: "m3", title: "Beethoven：轉折點", en: "Beethoven: The Turning Point",
  tw: [["beethoven-5"], ["beethoven-3"], ["beethoven-moonlight", "beethoven-op131"]],
  yt: { q: "貝多芬", v: [{ t: "大解密！貝多芬如何寫出偉大的《命運交響曲》!?", id: "me3Ji3KVdwg" }, { t: "貝多芬-第七號交響曲！為什麼是世紀經典？", id: "AuTN_VQDoOA" }, { t: "貝多芬到底有多狂？讓音樂家在台上「互飆」!? 解析《三重協奏曲》", id: "DGWtY2M-pqU" }] },
  concept: [
    { tier: "選析", t: "Beethoven（1770–1827）在音樂史敘述中的位置，是<b>古典形式的完成者與其邊界的突破者</b>。其作品通常分為三期（此三期劃分為<b>傳統學術慣例</b>，非作曲家本人所定）：" }
  ],
  table: {
    head: ["分期", "大致範圍", "特徵"],
    rows: [
      ["早期", "至約 1802", "承襲 Haydn、Mozart 之古典語法"],
      ["中期（「英雄期」）", "約 1803–1814", "規模擴張、戲劇張力強化、動機發展手法極端化"],
      ["晚期", "約 1815 之後", "結構高度個人化、賦格再度大量出現、內省性強"]
    ]
  },
  works: ["beethoven-5", "beethoven-3", "beethoven-9", "beethoven-moonlight", "beethoven-op131"],
  tasks: [
    "聽第 5 號交響曲<b>第三樂章至第四樂章的接續處</b>。兩樂章之間不間斷，且以一段極長的漸強由 c 小調轉入 C 大調——這是「黑暗到光明」敘事在音樂結構上的具體實現，也是後世無數作品的模板。",
    "聽《英雄》第一樂章。此曲規模顯著超越當時交響曲慣例。感受「這首曲子比 Haydn 的長很多」這件事本身。",
    "<b>對比實驗</b>：連續聽《月光》第一樂章與 Op. 131 第一樂章。兩者相隔約 25 年。不需分析，只需感受兩者在「可親近程度」上的落差——這個落差就是 Beethoven 晚期風格的體驗。"
  ],
  after: "<b>模組三完成後</b>：你已具備聆聽 1750–1820 年間絕大多數器樂作品的結構工具。此時可自行探索任何古典時期曲目。"
},
{
  n: 12, m: "m4", title: "鋼琴詩人（Chopin & Schumann）", en: "The Piano Poets",
  tw: [["chopin-nocturnes"], ["chopin-ballade1"], ["schumann-kinderszenen"]],
  yt: { q: "蕭邦", v: [{ t: "深入解析，蕭邦為什麼這麼好聽", id: "RcVyNE5L-zk" }, { t: "回到最初的起點：超級美的蕭邦夜曲 Op.27-2", id: "JRK3uvgc_0M" }, { t: "蕭邦-敘事曲的奧秘，原來還能這樣說故事!?", id: "0h-pg-ob-z0" }] },
  concept: [
    { tier: "析", t: "十九世紀鋼琴製造技術的進步（鑄鐵框架、擊弦機改良）使鋼琴成為<b>能夠獨自承載完整音樂世界的樂器</b>。隨之興起的是<b>性格小品（character piece）</b>——短小、單一情緒、無需大型形式的獨奏曲。" }
  ],
  works: ["chopin-nocturnes", "chopin-ballade1", "chopin-etudes10", "schumann-kinderszenen"],
  tasks: [
    "聽 Chopin 夜曲 Op. 9 No. 2。注意<b>左手（伴奏）與右手（旋律）的節奏並不嚴格對齊</b>——此為 rubato（彈性速度）的體現，是浪漫時期演奏美學的核心。",
    "聽 Chopin 第 1 號敘事曲全曲（約 9 分鐘）。此曲無標準曲式標籤，結構由<b>敘事邏輯</b>而非形式範本決定。留意情緒的推進與最後的爆發。",
    "聽 Schumann《兒時情景》全套 13 首（約 18 分鐘）。每首約 1–2 分鐘。<b>觀察「一組短曲如何構成一個整體」</b>。"
  ]
},
{
  n: 13, m: "m4", title: "藝術歌曲", en: "Lied",
  tw: [["schubert-erlkonig"], ["schubert-winterreise"], []],
  yt: { q: "舒伯特 藝術歌曲 歌曲" },
  concept: [
    { tier: "析", t: "<b>藝術歌曲（Lied）</b>的定義性特徵：<b>鋼琴不是伴奏，而是與人聲平等的敘事夥伴</b>。鋼琴部分常獨立描繪場景、心理狀態或潛台詞。" }
  ],
  works: ["schubert-erlkonig", "schubert-winterreise", "schumann-dichterliebe"],
  tasks: [
    "聽《魔王》（約 4 分鐘）。<b>歌詞大意就放在該曲下方的「📖 歌詞大意與角色對照」裡，請先讀再聽。</b>此曲中一名歌手需扮演四個角色（敘述者、父親、孩子、魔王），且<b>鋼琴的三連音持續模擬奔馳的馬蹄</b>。任務：辨識出四個角色的音區與語氣切換。",
    "聽《冬之旅》第一首〈Gute Nacht〉與最後一首〈Der Leiermann〉。感受連篇歌曲集的起點與終點在情緒上的落差。",
    "<b>本週特別建議</b>：藝術歌曲是<b>編制最小、最適合零碎時間與吵雜環境</b>的古典曲類（人聲 + 鋼琴，動態範圍較窄）。可作為通勤時段的主要曲目。"
  ]
},
{
  n: 14, m: "m4", title: "標題音樂", en: "Program Music",
  tw: [["berlioz-fantastique"], ["mussorgsky-pictures"], []],
  yt: { q: "白遼士 標題音樂 交響詩" },
  concept: [
    { tier: "析", t: "<b>標題音樂</b>指以音樂敘述特定文學、繪畫或事件內容的器樂作品，與<b>絕對音樂（absolute music）</b>相對。核心技術為<b>主導動機（leitmotif）</b>與 Berlioz 的 <b>idée fixe（固定樂思）</b>——以一段可辨識的旋律代表特定人物或概念，並在全曲中變形出現。" }
  ],
  works: ["berlioz-fantastique", "liszt-preludes", "mussorgsky-pictures"],
  tasks: [
    "聽《幻想交響曲》第一樂章，<b>記住 idée fixe 的旋律</b>（代表「摯愛」的主題）。然後跳到第五樂章〈女巫安息日之夜〉，<b>找出同一旋律被扭曲成怪誕版本的段落</b>，再展開該曲下方的<b>「🔒 對照表（答案）」</b>——它列出這個主題在<b>五個樂章</b>各變了什麼樣。這是主導動機技術最戲劇化的示範。",
    "聽《展覽會之畫》。各曲之間穿插的〈漫步 Promenade〉代表參觀者在畫作之間行走——<b>這是曲式中的「迴旋」原則被賦予敘事意義</b>。<b>數出〈漫步〉出現幾次</b>，再展開該曲下方的<b>「🔒 對照表（答案）」</b>核對——注意<b>答案會因為你聽的是鋼琴版還是管弦樂版而不同</b>。",
    "<b>對比思考</b>：對照第 5 週的 Vivaldi《四季》。兩者皆為標題音樂，相隔約 100 年。差異在哪裡？"
  ]
},
{
  n: 15, m: "m4", title: "交響曲的擴張（Brahms & Tchaikovsky）", en: "The Symphony Expanded",
  tw: [["tchaikovsky-6"], ["brahms-4"], ["brahms-1"]],
  yt: { q: "布拉姆斯 柴可夫斯基 交響曲" },
  concept: [
    { tier: "選析", t: "十九世紀後期交響曲創作呈現兩種取向：<b>Brahms 代表在古典形式框架內深化</b>；<b>Tchaikovsky 代表以情感敘事驅動形式</b>。兩者並非對立陣營，但提供了理解此時期的有用座標。" }
  ],
  works: ["brahms-1", "brahms-4", "tchaikovsky-6", "tchaikovsky-pc1"],
  tasks: [
    "聽 Tchaikovsky 第 6 號<b>末樂章</b>。傳統交響曲末樂章多為快速、外向、收束於強奏；此曲末樂章為緩慢的哀歌，且<b>以極弱的消散作結</b>。這是形式慣例被情感敘事推翻的明確案例。",
    "聽 Brahms 第 4 號末樂章。此樂章建立於一段反覆的低音主題之上（passacaglia），主題共出現 30 餘次——<b>這是巴洛克技術在十九世紀末的復歸</b>，可對照第 6 週的對位法內容。",
    "對比 Brahms 第 1 號末樂章的主題與 Beethoven 第 9 號〈歡樂頌〉主題。兩者的相似性長期為評論者所注意，Brahms 本人對此有所回應。"
  ]
},
{
  n: 16, m: "m4", title: "歌劇", en: "Opera",
  tw: [["wagner-tristan"], ["verdi-traviata", "wagner-walkure"], ["puccini-boheme"]],
  yt: { q: "歌劇 華格納 普契尼" },
  concept: [
    { tier: "選", t: "歌劇對自學者的門檻最高（時長、語言、劇情），故本課程採<b>片段優先策略</b>：先聽著名選曲建立熟悉度，暫不追求全劇。" },
    { tier: "析", t: "十九世紀歌劇的三條主要路線：<br>• <b>義大利 bel canto 至 Verdi</b>：以人聲旋律為核心。<br>• <b>Puccini 的 verismo（寫實主義）</b>：題材貼近日常，旋律直接訴諸情感。<br>• <b>Wagner 的樂劇（Musikdrama）</b>：取消分曲結構，以主導動機與連綿不斷的音樂織體推進戲劇。" }
  ],
  works: ["verdi-traviata", "puccini-boheme", "puccini-turandot", "wagner-walkure", "wagner-tristan"],
  tasks: [
    "聽《崔斯坦與伊索德》前奏曲開頭 3 分鐘。開頭數小節的和聲（俗稱「崔斯坦和弦」）<b>長時間不解決至穩定終止</b>，此手法常被視為調性系統瓦解的重要標誌。任務：感受那種「一直想要落地卻始終落不下來」的懸置感。",
    "對比聽 Verdi〈飲酒歌〉與 Wagner〈女武神的騎行〉。兩者同為十九世紀中後期，但美學取向截然不同。",
    "<b>選擇性挑戰</b>：若時間充裕，選一部完整歌劇（建議《波希米亞人》，約 110 分鐘，劇情單純），<b>四幕劇情摘要就放在該曲下方的「📖 劇情摘要（建議先讀）」裡</b>，讀完再配合中文字幕或歌詞翻譯完整聽一次。"
  ]
},
{
  n: 17, m: "m4", title: "國民樂派", en: "Nationalism",
  tw: [["smetana-vltava"], ["dvorak-9"], ["rimsky-scheherazade"]],
  yt: { q: "德弗札克 西貝流士 國民樂派" },
  concept: [
    { tier: "析", t: "十九世紀民族意識興起，作曲家開始有意識地將本國民間音樂素材（音階、節奏、舞曲型態、民謠旋律）納入藝術音樂，並以音樂表述民族認同。" }
  ],
  works: ["smetana-vltava", "dvorak-9", "sibelius-finlandia", "rimsky-scheherazade", "grieg-peergynt"],
  tasks: [
    "聽〈莫爾道河〉（約 12 分鐘）。此曲描繪一條河流從源頭到入海的全程。<b>閉眼聽，試著標記出：兩條溪流匯合、林中狩獵、鄉村婚禮、月光下的水仙女、急流、河流開闊入城</b>。聽完展開該曲下方的<b>「🔒 對照表（答案）」</b>核對——段落順序是 Smetana 自己寫下的，有標準答案。這是標題音樂最易懂的範例之一。",
    "聽 Dvořák 第 9 號第二樂章（Largo）。其主要旋律極為著名。",
    "聽《天方夜譚》第一樂章。注意<b>小提琴獨奏代表說故事的 Scheherazade</b>，與代表蘇丹的低音銅管主題交替出現——這是主導動機技術的另一應用。"
  ]
},
{
  n: 18, m: "m5", title: "印象派", en: "Impressionism",
  tw: [["debussy-faune"], ["ravel-bolero"], ["debussy-clairdelune"]],
  yt: { q: "德布西 拉威爾 印象派" },
  concept: [
    { tier: "析", t: "Debussy（1862–1918）與 Ravel（1875–1937）的核心轉向：<b>音色與音響本身成為結構要素</b>，取代旋律—和聲的功能性推進。手法包括全音音階（whole-tone scale）、平行和弦、模糊的節奏脈動。" }
  ],
  key: "聽覺辨識線索：聽起來「沒有明確的方向感、像在漂浮」，但和聲仍然悅耳——通常就是印象派。",
  works: ["debussy-faune", "debussy-clairdelune", "debussy-lamer", "ravel-bolero", "ravel-pavane"],
  tasks: [
    "聽《牧神的午後前奏曲》開頭（長笛獨奏）。注意<b>此曲沒有明確的節拍感，也沒有傳統意義的「主題呈示」</b>。與第 8 週的 Mozart K. 550 開頭做直接對比——兩者的「開場方式」差異即為此模組的核心轉變。",
    "聽《波麗露》全曲（約 15 分鐘）。全曲<b>旋律與和聲幾乎不變，只有配器與音量持續累積</b>。任務：<b>記錄每一次旋律重複時的主奏樂器</b>（共 18 次），聽完展開該曲下方的<b>「🔒 對照表（答案）」</b>核對。這是最好的配器法教材。",
    "聽 Debussy《月光》。這可能是本模組中最容易親近的一首，可作為心理緩衝。"
  ]
},
{
  n: 19, m: "m5", title: "節奏的革命", en: "Stravinsky & Bartók",
  tw: [["stravinsky-rite", "stravinsky-firebird"], ["stravinsky-rite"], ["bartok-msoc"]],
  yt: { q: "史特拉汶斯基 春之祭 節奏" },
  concept: [
    { tier: "析", t: "二十世紀初的另一路線：<b>以節奏、而非旋律或和聲，作為主要驅動力</b>。特徵為不規則節拍、切分、多重節奏疊置、打擊樂化的樂團書寫。" }
  ],
  works: ["stravinsky-rite", "stravinsky-firebird", "stravinsky-petrushka", "bartok-msoc"],
  tasks: [
    "聽《火鳥》組曲<b>之前</b>，先聽《春之祭》開頭 5 分鐘。然後聽《火鳥》。此順序刻意設計：先承受衝擊，再獲得緩解，你會更清楚感受兩者的差距。",
    "聽《春之祭》第一部分〈春之預兆〉。<b>試著跟著打拍子——你會失敗。</b> 這個失敗即為重點：此段使用不規則的重音配置，刻意破壞穩定的節拍預期。",
    "聽 Bartók《為弦樂、打擊樂與鋼片琴而作的音樂》第一樂章。此樂章為賦格——可直接對照第 6 週的 Bach。<b>同一種形式，相隔 200 年，聲響完全不同。</b>"
  ]
},
{
  n: 20, m: "m5", title: "調性的解體", en: "Atonality & Serialism", flag: "全課程門檻最高的一週",
  tw: [["schoenberg-verklarte"], ["berg-violin"], ["webern-op10"]],
  yt: { q: "荀白克 十二音 無調性" },
  concept: [
    { tier: "析", t: "第二維也納樂派（Second Viennese School）——Schoenberg（1874–1951）、Berg（1885–1935）、Webern（1883–1945）——放棄調性中心，並發展出<b>十二音技法（twelve-tone technique）</b>：將半音階十二個音排成一組音列（tone row），全曲素材由該音列及其變形推導而來。" },
    { tier: "選", t: "目標<b>不是</b>「喜歡」或「聽出音列」，而是理解<b>為什麼有人要這樣寫</b>，以及辨識其聲響特徵。" }
  ],
  works: ["schoenberg-verklarte", "berg-violin", "schoenberg-pierrot", "webern-op10"],
  tasks: [
    "<b>依上表難度順序</b>聽。先聽《昇華之夜》——此曲作於 1899 年，屬 Schoenberg 早期調性作品，聽感接近晚期浪漫派。這證明了：<b>他有能力寫「好聽」的音樂，後來的轉向是選擇而非能力不足。</b> 這個認知對接受後續作品至關重要。",
    "聽 Berg 小提琴協奏曲。此曲題獻「紀念一位天使」。曲中引用了 Bach 的聖詠——<b>十二音技法與調性素材在此共存</b>。",
    "聽 Webern Op. 10。全套五首<b>總長度不到 5 分鐘</b>。任務：只需注意「每個聲音都被單獨對待」的密度與寂靜的使用。"
  ]
},
{
  n: 21, m: "m5", title: "戰後至當代", en: "Post-1945",
  tw: [["part-spiegel"], ["reich-18"], ["shostakovich-5"]],
  yt: { q: "蕭士塔高維契 極簡主義 當代" },
  concept: [
    { tier: "選", t: "二十世紀後半的多條路線中，選取三條對當代聽眾最具可及性者：<b>政治壓力下的交響傳統</b>、<b>神聖極簡主義（Holy Minimalism）</b>、<b>過程性極簡主義（Process Minimalism）</b>。" }
  ],
  works: ["shostakovich-5", "shostakovich-sq8", "gorecki-3", "part-spiegel", "part-fratres", "reich-18"],
  tasks: [
    "聽 Pärt《鏡中鏡》（約 9 分鐘）。此曲極簡至僅有鋼琴與一件獨奏樂器。這是本模組中最容易接受的作品，可作為進入當代音樂的入口。",
    "聽 Reich《為 18 位音樂家而作的音樂》開頭 10 分鐘。重點不在旋律，而在<b>細微變化的漸進累積</b>——注意你何時察覺「事情變了」，以及變化實際上是何時開始的。兩者的落差即為此類音樂的核心體驗。",
    "聽 Shostakovich 第 5 號末樂章。此樂章的結尾究竟是真誠的勝利宣示或反諷，長期為評論者所爭議——<b>兩種詮釋並存，本課程不作裁定</b>。任務：形成你自己的判斷。"
  ]
},
{
  n: 22, m: "m6", title: "版本比較", en: "Comparative Listening",
  tw: [["beethoven-5"], ["chopin-nocturnes"], []],
  yt: { q: "詮釋 版本 指揮" },
  concept: [
    { tier: "選析", t: "古典音樂的<b>樂譜與演出是分離的</b>：同一部作品經由不同指揮、樂團與時代，可產生顯著不同的結果。<b>能夠聽出版本差異，是從「聽曲子」進階到「聽演出」的分水嶺。</b>" }
  ],
  table: {
    head: ["比較維度", "觀察重點"],
    rows: [
      ["<b>速度 Tempo</b>", "全曲總長度可差距 10–20% 以上"],
      ["<b>力度對比 Dynamics</b>", "強弱落差的極端程度"],
      ["<b>樂句處理 Phrasing</b>", "呼吸點、句法的塑造"],
      ["<b>音色 Sound</b>", "樂團音色、錄音年代與空間感"],
      ["<b>樂器類型</b>", "現代樂器 vs. 古樂器（period instruments）"]
    ]
  },
  works: ["beethoven-5", "chopin-nocturnes"],
  compare: {
    title: "本週指定比較：Beethoven 第 5 號交響曲 第一樂章 × 3 版本",
    picks: [
      { q: "Beethoven Symphony 5 Kleiber", label: "Carlos Kleiber / Wiener Philharmoniker", qa: "hires" },
      { q: "Beethoven Symphony 5 Karajan", label: "Herbert von Karajan / Berliner Philharmoniker", qa: "hifi" },
      { q: "Beethoven Symphony 5 Gardiner", label: "任一古樂器版本（Gardiner / ORR）", qa: "hifi" }
    ]
  },
  tasks: [
    "選定 <b>Beethoven 第 5 號交響曲第一樂章</b>，找出三個版本聆聽（見上方指定比較）。<b>記錄各版本的樂章長度</b>，並用三個形容詞描述各自性格。",
    "對同一首 Chopin 夜曲做同樣的事（建議比較 Rubinstein 與其他鋼琴家）。獨奏曲的版本差異通常比管弦樂更容易察覺。",
    "建立一份個人筆記：<b>你偏好什麼樣的演出取向？</b> 這個答案沒有對錯，但它是你音樂品味成形的證據。"
  ]
},
{
  n: 23, m: "m6", title: "歷史知情演奏", en: "Historically Informed Performance (HIP)",
  tw: [["vivaldi-seasons"], ["bach-bwv1048"], []],
  yt: { q: "古樂器 巴洛克 演奏法" },
  concept: [
    { tier: "析", t: "HIP 運動主張以作品<b>創作年代的樂器、演奏技法與演出慣例</b>重現作品。" }
  ],
  table: {
    head: ["面向", "古樂器演奏", "現代樂器演奏"],
    rows: [
      ["弦樂", "羊腸弦、較少揉音（vibrato）", "金屬弦、持續揉音"],
      ["音高", "通常較低（如 A=415 Hz）", "標準 A=440 Hz 或以上"],
      ["樂團規模", "較小", "較大"],
      ["整體聽感", "較透明、銳利、輕盈", "較豐厚、圓潤、有重量"]
    ]
  },
  works: ["vivaldi-seasons", "bach-bwv1048"],
  compare: {
    title: "本週指定比較：Vivaldi《四季》古樂器 vs. 現代樂器",
    picks: [
      { q: "Vivaldi Four Seasons Il Giardino Armonico", label: "古樂器組：Il Giardino Armonico", qa: "hires" },
      { q: "Vivaldi Four Seasons Rachel Podger", label: "古樂器組：Rachel Podger / Brecon Baroque", qa: "hires" },
      { q: "Vivaldi Four Seasons I Musici", label: "現代樂器組：I Musici", qa: "hifi" },
      { q: "Vivaldi Four Seasons Nigel Kennedy", label: "現代樂器組：Nigel Kennedy / ECO", qa: "hifi" }
    ]
  },
  tasks: [
    "找出 Vivaldi《四季》的兩個版本——一個古樂器，一個現代樂器，聽同一樂章。<b>差異會非常明顯。</b>",
    "對 Bach《布蘭登堡協奏曲》做同樣比較（古樂器：Pinnock 或 Café Zimmermann；現代樂器：Karl Richter）。",
    "<b>注意此議題的爭議性</b>：HIP 是否真能「還原」歷史演出，學界存在持續辯論——反對意見指出歷史證據的不完整性與詮釋的不可避免性。<b>本課程不對此作裁定，但你應知道爭議存在。</b>"
  ]
},
{
  n: 24, m: "m6", title: "建立自主聆聽路徑", en: "Building Your Own Path",
  tw: [[], [], []],
  yt: { q: "古典音樂 入門 推薦" },
  banner: "本週任務不是聽新曲目，而是<b>整理與規劃</b>。",
  concept: [],
  works: [],
  tasks: [
    "檢視 24 份播放清單，將<b>你會主動想再聽</b>的曲目移入「重聽區」（本站右上角的 ★ 收藏即為此用途，可一鍵匯出全部搜尋字串）。",
    "統計：你的重聽區中，哪個時期／作曲家／編制佔比最高？<b>這就是你的品味起點。</b>",
    "針對佔比最高的方向，選定<b>一位作曲家進行深度探索</b>（建議下一個 6 個月聽完該作曲家的主要作品）。"
  ],
  gaps: {
    title: "本課程未涵蓋的主要區塊",
    items: [
      "<b>文藝復興及更早期音樂</b>（約 1400–1600）：Palestrina、Josquin、Monteverdi 牧歌",
      "<b>Mahler 交響曲全集</b>：極為重要，但單曲長度（60–90 分鐘）不適合入門階段",
      "<b>室內樂深度</b>：弦樂四重奏為古典音樂最精密的曲類，值得單獨一輪課程",
      "<b>鍵盤獨奏深度</b>：Beethoven 32 首鋼琴奏鳴曲全集",
      "<b>完整歌劇聆聽</b>：本課程僅採片段策略",
      "<b>非西方藝術音樂傳統</b>：本課程完全限於西方古典音樂脈絡"
    ]
  },
  live: "<b>強烈建議</b>：本課程結束後，安排一次現場音樂會。錄音與現場的差異（動態範圍、空間感、視覺資訊、社會情境）無法由串流取代。建議首次選擇<b>曲目熟悉的管弦樂音樂會</b>，而非歌劇或當代作品。"
}
];
