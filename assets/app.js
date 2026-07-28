(function () {
  "use strict";
  var CORE = window.CORE, WORKS = window.WORKS, WEEKS = window.WEEKS;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]; }); };

  /* ---------------- 設定與狀態（localStorage） ---------------- */
  var LS = "cmc.v1";
  var DEFAULTS = {
    region: "tw", lang: "tc", scheme: "path",
    hiresFirst: true, hideHistoric: false, theme: "auto",
    done: {}, tasks: {}, checks: {}, fav: {}
  };
  var S = load();
  function load() {
    try { return Object.assign({}, DEFAULTS, JSON.parse(localStorage.getItem(LS) || "{}")); }
    catch (e) { return Object.assign({}, DEFAULTS); }
  }
  function save() { try { localStorage.setItem(LS, JSON.stringify(S)); } catch (e) {} }

  /* ---------------- KKBOX 連結 ---------------- */
  // KKBOX 的搜尋網址格式可能隨網站改版變動，故做成可切換。
  // 若某一格式失效，使用者可在「設定」中改用另一種，或直接用「複製」把字串貼進 App。
  var SCHEMES = {
    path:    { label: "網址路徑 /search/all/…/1", build: function (q, r, l) { return "https://www.kkbox.com/" + r + "/" + l + "/search/all/" + encodeURIComponent(q) + "/1"; } },
    q:       { label: "查詢參數 ?q=",        build: function (q, r, l) { return "https://www.kkbox.com/" + r + "/" + l + "/search?q=" + encodeURIComponent(q); } },
    keyword: { label: "查詢參數 ?keyword=",  build: function (q, r, l) { return "https://www.kkbox.com/" + r + "/" + l + "/search?keyword=" + encodeURIComponent(q); } },
    word:    { label: "查詢參數 ?word=",     build: function (q, r, l) { return "https://www.kkbox.com/" + r + "/" + l + "/search?word=" + encodeURIComponent(q); } },
    play:    { label: "網頁播放器 play.kkbox.com", build: function (q) { return "https://play.kkbox.com/search/" + encodeURIComponent(q); } }
  };
  var SCHEME_ORDER = ["path", "q", "keyword", "word", "play"];
  var TESTQ = "Beethoven Symphony 5 Kleiber";
  function kk(q) { return (SCHEMES[S.scheme] || SCHEMES.path).build(q, S.region, S.lang); }

  /* ---------------- 小工具 ---------------- */
  var toastT;
  function toast(msg) {
    var t = $("#toast"); t.textContent = msg; t.classList.add("on");
    clearTimeout(toastT); toastT = setTimeout(function () { t.classList.remove("on"); }, 1800);
  }
  function copyText(txt, btn) {
    var done = function () {
      if (btn) { var o = btn.textContent; btn.textContent = "已複製"; btn.classList.add("ok");
        setTimeout(function () { btn.textContent = o; btn.classList.remove("ok"); }, 1400); }
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(txt).then(done, function () { fallback(txt, done); });
    } else fallback(txt, done);
  }
  function fallback(txt, cb) {
    var ta = document.createElement("textarea");
    ta.value = txt; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); cb(); } catch (e) { toast("複製失敗，請手動選取"); }
    document.body.removeChild(ta);
  }
  function tierTags(str) {
    if (!str) return "";
    return String(str).split("").map(function (c) { return '<span class="tier ' + c + '" title="' + esc(CORE.tiers[c] ? CORE.tiers[c].name + "：" + CORE.tiers[c].desc : "") + '">' + c + "</span>"; }).join("");
  }
  var TAGNAME = { ref: "公認代表版", period: "古樂器", modern: "現代樂器", entry: "入門友善", narrated: "附旁白" };

  /* ---------------- 版本排序 / 過濾 ---------------- */
  var QORDER = { hires: 0, hifi: 1, historic: 2 };
  function sortVersions(vs) {
    var arr = vs.slice();
    if (S.hiresFirst) {
      arr.sort(function (a, b) {
        var d = QORDER[a.qa] - QORDER[b.qa];
        if (d) return d;
        var ar = a.t && a.t.indexOf("ref") > -1 ? 0 : 1, br = b.t && b.t.indexOf("ref") > -1 ? 0 : 1;
        return ar - br;
      });
    }
    if (S.hideHistoric) arr = arr.filter(function (v) { return v.qa !== "historic"; });
    return arr;
  }

  /* ---------------- 渲染：版本 ---------------- */
  function versionHTML(v) {
    var q = CORE.quality[v.qa];
    var tags = (v.t || []).map(function (t) { return '<span class="tag">' + esc(TAGNAME[t] || t) + "</span>"; }).join("");
    return '<li class="v ' + v.qa + '">' +
      "<div>" +
        '<div class="p">' + esc(v.p) + "</div>" +
        '<div class="sub"><span class="qbadge ' + v.qa + '" title="' + esc(q.desc) + '">' + esc(q.label) + "</span>" +
          esc(v.l) + (v.y ? " · " + v.y : "") + " " + tags + "</div>" +
        (v.w ? '<div class="why">' + esc(v.w) + "</div>" : "") +
      "</div>" +
      '<div class="acts">' +
        '<a class="play" data-q="' + esc(v.q) + '" href="' + esc(kk(v.q)) + '" target="_blank" rel="noopener">在 KKBOX 開啟</a>' +
        '<button class="copy" data-copy="' + esc(v.q) + '">複製搜尋字串</button>' +
      "</div></li>";
  }

  /* ---------------- 渲染：曲目 ---------------- */
  function workHTML(id, wk) {
    var w = WORKS[id];
    if (!w) return '<div class="work"><div class="workhd"><div class="ttl"><b>（缺少資料：' + esc(id) + "）</b></div></div></div>";
    var vs = sortVersions(w.versions || []);
    var open = false;
    var fav = !!S.fav[id];
    var metas = [];
    if (w.texture) metas.push("<b>對應織體：</b>" + esc(w.texture));
    if (w.form) metas.push("<b>對應曲式：</b>" + esc(w.form));
    if (w.key) metas.push("<b>重點：</b>" + esc(w.key));
    if (w.country) metas.push("<b>國別：</b>" + esc(w.country));
    if (w.line) metas.push("<b>路線：</b>" + esc(w.line));
    if (w.diff) metas.push("<b>難度：</b>" + esc(w.diff));
    if (w.period) metas.push("<b>分期：</b>" + esc(w.period));

    return '<div class="work' + (open ? " open" : "") + '" data-work="' + esc(id) + '" data-search="' +
        esc((w.title + " " + (w.en || "") + " " + w.composer + " " + w.q + " " + (w.versions || []).map(function (v) { return v.p; }).join(" ")).toLowerCase()) + '">' +
      '<div class="workhd">' +
        '<button class="star' + (fav ? " on" : "") + '" data-fav="' + esc(id) + '" title="加入／移出重聽區">' + (fav ? "★" : "☆") + "</button>" +
        '<div class="ttl"><b>' + esc(w.title) + "</b><em>" + esc(w.en || "") + " · " + esc(w.composer) + "</em></div>" +
        '<span class="chev">▶</span>' +
      "</div>" +
      '<div class="workbd">' +
        (metas.length ? '<div class="meta">' + metas.join(" ｜ ") + "</div>" : "") +
        (w.fact ? '<div class="meta">' + tierTags("史") + esc(w.fact) + "</div>" : "") +
        (w.pick ? '<div class="meta">' + tierTags("選") + esc(w.pick) + "</div>" : "") +
        (w.note ? '<div class="meta">' + esc(w.note) + "</div>" : "") +
        '<div class="rowbtns"><button class="iconbtn" data-copy="' + esc(w.q) + '">複製通用搜尋字串：' + esc(w.q) + "</button></div>" +
        '<ul class="vlist">' + vs.map(versionHTML).join("") + "</ul>" +
      "</div></div>";
  }

  /* ---------------- 渲染：週 ---------------- */
  function tableHTML(t) {
    return '<div class="tw"><table><thead><tr>' + t.head.map(function (h) { return "<th>" + h + "</th>"; }).join("") +
      "</tr></thead><tbody>" + t.rows.map(function (r) {
        return "<tr>" + r.map(function (c) { return "<td>" + c + "</td>"; }).join("") + "</tr>";
      }).join("") + "</tbody></table></div>";
  }

  function weekHTML(wk) {
    var mod = CORE.modules.filter(function (m) { return m.id === wk.m; })[0];
    var h = "";
    h += '<div class="card" id="week-' + wk.n + '">';
    h += '<div class="eyebrow">' + esc(mod.label) + " · " + esc(mod.title) + "</div>";
    h += "<h2>第 " + wk.n + " 週｜" + esc(wk.title) + (wk.flag ? '<span class="flag">' + esc(wk.flag) + "</span>" : "") + "</h2>";
    h += '<div class="enttl">' + esc(wk.en || "") + "</div>";

    // 時期概覽（模組首週）
    if (mod.period && mod.weeks[0] === wk.n) h += periodHTML(CORE.periods[mod.period]);
    if (mod.goal && mod.weeks[0] === wk.n) h += '<div class="banner"><b>本模組目標：</b>' + esc(mod.goal) + "</div>";
    if (wk.banner) h += '<div class="banner">' + wk.banner + "</div>";

    if (wk.concept && wk.concept.length) {
      h += "<h3>本週核心概念</h3>";
      wk.concept.forEach(function (c) { h += "<p>" + tierTags(c.tier) + c.t + "</p>"; });
    }
    if (wk.table) h += tableHTML(wk.table);
    if (wk.key) h += '<div class="banner">' + wk.key + "</div>";
    if (wk.note) h += '<div class="note">' + tierTags(wk.note.tier) + wk.note.t + "</div>";

    if (wk.works && wk.works.length) {
      h += "<h3>必聽曲目與版本建議 " + tierTags("選") + "</h3>";
      h += '<div class="hint" style="margin-bottom:8px">點曲名展開版本清單。' +
        (S.hiresFirst ? "目前<b>依 Hi-Res 優先排序</b>" : "目前<b>依編者推薦順序排列</b>") +
        (S.hideHistoric ? "，且已隱藏歷史錄音" : "") + "。</div>";
      h += wk.works.map(function (id) { return workHTML(id, wk); }).join("");
    }
    if (wk.compare) {
      h += "<h3>" + esc(wk.compare.title) + "</h3><ul class=\"vlist\">";
      h += wk.compare.picks.map(function (p) {
        return '<li class="v ' + p.qa + '"><div><div class="p">' + esc(p.label) + "</div>" +
          '<div class="sub"><span class="qbadge ' + p.qa + '">' + esc(CORE.quality[p.qa].label) + "</span><code>" + esc(p.q) + "</code></div></div>" +
          '<div class="acts"><a class="play" data-q="' + esc(p.q) + '" href="' + esc(kk(p.q)) + '" target="_blank" rel="noopener">在 KKBOX 開啟</a>' +
          '<button class="copy" data-copy="' + esc(p.q) + '">複製</button></div></li>';
      }).join("") + "</ul>";
    }
    if (wk.extraWorks && wk.extraWorks.length) {
      h += "<h3>延伸（深化）</h3>" + wk.extraWorks.map(function (id) { return workHTML(id, wk); }).join("");
    }
    if (wk.tasks && wk.tasks.length) {
      h += "<h3>聆聽任務</h3><ul class=\"chk\">";
      h += wk.tasks.map(function (t, i) {
        var k = wk.n + ":" + i, on = !!S.tasks[k];
        return '<li class="' + (i === 0 ? "must " : "") + (on ? "dn" : "") + '">' +
          '<input type="checkbox" data-task="' + k + '"' + (on ? " checked" : "") + "><span>" + t + "</span></li>";
      }).join("") + "</ul>";
    }
    if (wk.checks && wk.checks.length) {
      h += "<h3>自我檢核</h3><ul class=\"chk\">";
      h += wk.checks.map(function (t, i) {
        var k = wk.n + ":" + i, on = !!S.checks[k];
        return '<li class="' + (on ? "dn" : "") + '"><input type="checkbox" data-check="' + k + '"' + (on ? " checked" : "") + "><span>" + t + "</span></li>";
      }).join("") + "</ul>";
    }
    if (wk.gaps) {
      h += "<h3>" + esc(wk.gaps.title) + " " + tierTags("選") + "</h3><ul>";
      h += wk.gaps.items.map(function (i) { return "<li>" + i + "</li>"; }).join("") + "</ul>";
    }
    if (wk.live) h += '<div class="banner">' + wk.live + "</div>";
    if (wk.n === 24) {
      h += "<h3>台灣在地資源 " + tierTags("史選") + "</h3>";
      h += '<div class="note">時效性警示：以下機構與平台資訊可能異動，實際場次與購票方式請於使用時查證。</div>';
      h += tableHTML({ head: ["類型", "資源"], rows: [
        ["主要場館", esc(CORE.local.venues)], ["主要樂團", esc(CORE.local.orchestras)], ["售票平台", esc(CORE.local.tickets)] ] });
    }
    if (wk.after) h += '<div class="banner">' + wk.after + "</div>";

    // 底部操作
    var done = !!S.done[wk.n];
    h += '<div class="rowbtns">' +
      '<button class="iconbtn' + (done ? " on" : "") + '" data-done="' + wk.n + '">' + (done ? "✓ 本週已完成" : "標記本週完成") + "</button>" +
      (wk.works && wk.works.length ?
        '<button class="iconbtn" data-copyweek="' + wk.n + '">複製本週全部搜尋字串（建 W' + (wk.n < 10 ? "0" : "") + wk.n + " 播放清單用）</button>" : "") +
      "</div>";
    h += "</div>";
    return h;
  }

  function periodHTML(p) {
    if (!p) return "";
    var h = "<h3>" + esc(p.title) + "</h3>";
    h += '<div class="tw"><table><tbody>' + p.rows.map(function (r) {
      return "<tr><th>" + esc(r[0]) + "</th><td>" + tierTags(r[1]) + esc(r[2]) + "</td></tr>";
    }).join("") + "</tbody></table></div>";
    if (p.cue) h += '<div class="banner">' + tierTags(p.cue.tier) + esc(p.cue.text) + "</div>";
    return h;
  }

  /* ---------------- 靜態頁 ---------------- */
  function homeHTML() {
    var totalWorks = Object.keys(WORKS).length;
    var totalVers = Object.keys(WORKS).reduce(function (a, k) { return a + (WORKS[k].versions || []).length; }, 0);
    var hires = Object.keys(WORKS).reduce(function (a, k) {
      return a + (WORKS[k].versions || []).filter(function (v) { return v.qa === "hires"; }).length; }, 0);
    var h = '<div class="card"><h2>' + esc(CORE.meta.title) + "</h2>" +
      '<div class="enttl">' + esc(CORE.meta.subtitle) + " · " + esc(CORE.meta.version) + "</div>" +
      "<p>24 週、每週 15–90 分鐘可調整的自學路徑。每首曲目都附<b>經過挑選的著名版本</b>，並依 <b>Hi-Res &gt; Hi-Fi &gt; 歷史錄音</b> 排序，可直接連往 KKBOX 搜尋。</p>" +
      '<div class="grid2" style="margin:16px 0">' +
        stat("24", "週單元") + stat(String(totalWorks), "首曲目") + stat(String(totalVers), "個版本推薦") + stat(String(hires), "個 Hi-Res 優先版本") +
      "</div>" +
      '<div class="banner"><b>第一次使用請先做這件事：</b>點下面任一個「在 KKBOX 開啟」。' +
        '如果 KKBOX 跳出的搜尋頁是空的（顯示「請輸入一些關鍵字」），表示連結格式要調整——' +
        '到 <b>⚙ 設定 → 搜尋連結格式</b>，那裡有五個格式可以逐一測試，找到會出結果的按「設為預設」即可，只需做一次。<br>' +
        '（保險起見，每次點「在 KKBOX 開啟」都會同時把關鍵字複製到剪貼簿，' +
        '所以就算搜尋頁是空的，直接在 KKBOX 的搜尋框貼上就好。）</div>' +
      '<div class="rowbtns"><button class="iconbtn on" data-go="week-1">從第 1 週開始</button>' +
      '<button class="iconbtn" data-go="p-hires">先看 Hi-Res 設定說明</button>' +
      '<button class="iconbtn" data-open="settings">測試連結格式</button></div></div>';

    h += '<div class="card" id="p-hires"><h2>Hi-Res / Hi-Fi 版本怎麼挑</h2>' +
      '<div class="enttl">本站所有版本清單都預設把高解析排在最前面</div>' +
      "<ol>" + CORE.practice.hires.map(function (t) { return "<li>" + t + "</li>"; }).join("") + "</ol>" +
      "<h3>本站的音質標記代表什麼</h3><div class=\"tw\"><table><thead><tr><th>標記</th><th>意義</th></tr></thead><tbody>" +
      Object.keys(CORE.quality).map(function (k) {
        return '<tr><td><span class="qbadge ' + k + '">' + esc(CORE.quality[k].label) + "</span></td><td>" + esc(CORE.quality[k].desc) + "</td></tr>";
      }).join("") + "</tbody></table></div>" +
      '<div class="note">這些標記是<b>依錄音年代與發行廠牌所作的推估</b>，不是 KKBOX 的即時資料。實際請以 App 內顯示的音質標記為準。</div></div>';

    h += '<div class="card" id="p-method"><h2>課程設計原則</h2>' +
      "<h3>核心方法論：重複聆聽優先於廣度覆蓋 " + tierTags("選") + "</h3>" +
      "<p><b>這是本課程最重要、也最違反直覺的設計決定。</b>成人自學古典音樂最常見的失敗模式，是「聽過 100 首、每首聽一次」。此模式無法建立聆聽能力，因為：</p>" +
      "<ul><li>古典音樂的資訊密度高，<b>單次聆聽的注意力頻寬不足以同時處理旋律、和聲、織體、配器與曲式</b>。</li>" +
      "<li>音樂理解高度依賴<b>預期（expectation）</b>——你必須先熟悉一首曲子的走向，才可能察覺作曲家在哪裡偏離了你的預期。第一次聽時，你沒有預期可言。</li></ul>" +
      "<p>因此本課程的設計是：<b>每單元僅 1–3 首核心曲目，反覆聽 4–6 次，但每次的「注意力標的」不同。</b></p>" +
      '<div class="note"><b>與臨床技能習得的類比</b>：這與影像判讀訓練同構。放射科住院醫師不是靠看過一萬張不同的片子而變強，而是靠對同一批片子在不同教學重點下反覆檢視——第一次看肺野、第二次看縱膈腔、第三次看骨骼。聆聽訓練的機制相同：deliberate practice with a single focused target per repetition。</div>' +
      "<h3>專注聆聽 vs. 背景聆聽</h3>" +
      tableHTML({ head: ["類型", "定義", "功能", "本課程中的角色"], rows: [
        ["<b>專注聆聽</b><br>Focused listening", "不做其他事，戴耳機或面對喇叭，執行明確的聆聽任務", "<b>建立能力</b>", "每週「聆聽任務」必須以此方式進行，<b>最低 15 分鐘</b>"],
        ["<b>背景聆聽</b><br>Background listening", "通勤、家務、閱讀時播放", "<b>建立熟悉度</b>，為下次專注聆聽提供預期基礎", "用於本週曲目的<b>重複曝光</b>，時數不限"] ] }) +
      "<h3>三級時間結構</h3><ul>" +
      "<li><b>核心（15 分鐘）</b>：僅執行「必聽」第一首 + 聆聽任務第 1 題。<b>這是最低完成標準，不可再壓縮。</b></li>" +
      "<li><b>標準（45 分鐘）</b>：核心 + 全部必聽曲目 + 全部聆聽任務 + 概念說明。</li>" +
      "<li><b>深化（90 分鐘以上）</b>：標準 + 延伸曲目 + 版本比較。</li></ul>" +
      "<p><b>若某週只能做到核心，請照做核心並前進，不要暫停課程。</b> 課程的連續性比單週的完整性重要。</p></div>";

    h += '<div class="card" id="p-kkbox"><h2>KKBOX 操作實務</h2>' +
      "<h3>搜尋策略 " + tierTags("選") + "</h3><ol>" + CORE.practice.search.map(function (t) { return "<li>" + t + "</li>"; }).join("") + "</ol>" +
      "<h3>播放清單管理</h3><p><b>建議建立 24 個播放清單</b>，命名為 <code>古典課程 W01</code>～<code>W24</code>，每週開始時先建好當週清單。此舉的價值不在整理，而在於<b>課程結束後，你會擁有一份自己的、有結構的個人曲庫</b>。</p>" +
      "<p>另建一份 <code>古典課程｜重聽區</code>，凡是聽了有感覺的曲目立即丟進去。本站右上角的 <b>★ 重聽區</b> 即對應此用途，可一鍵匯出全部搜尋字串。</p>" +
      "<h3>音質與設備 " + tierTags("選") + "</h3>" +
      "<p>古典音樂的動態範圍（dynamic range）遠大於流行音樂——最弱與最強的音量差距可達 60 dB 以上。實務影響：</p>" +
      "<ul>" + CORE.practice.audio.map(function (t) { return "<li>" + t + "</li>"; }).join("") + "</ul></div>";

    h += '<div class="card" id="p-tiers"><h2>內容性質分類宣告</h2>' +
      '<div class="enttl">Content-Nature Classification Declaration</div>' +
      "<p>本課程屬<b>人文藝術教學設計</b>，不包含療效、診斷、預後或風險等可經 RCT 檢定之命題，故<b>不採用 GRADE / Oxford CEBM</b>——強行套用臨床分級系統將構成分級系統誤用。改採專為本領域定義之三層內容性質分類，判準為「陳述可否經由標準參考文獻查證」。</p>" +
      tableHTML({ head: ["標記", "層級", "定義", "可查證性"], rows: Object.keys(CORE.tiers).map(function (k) {
        var t = CORE.tiers[k];
        return ['<span class="tier ' + k + '">' + k + "</span>", "<b>" + esc(t.name) + "</b><br>" + esc(t.en), esc(t.desc), esc(t.verify)];
      }) }) +
      "<p><b>查證基準</b>：【史】層為 <i>Grove Music Online</i>、各作曲家標準作品目錄（BWV、K.、D. 等）及標準校訂樂譜；【析】層為通行音樂理論教材（Kostka &amp; Payne, <i>Tonal Harmony</i>；Burkholder, Grout &amp; Palisca, <i>A History of Western Music</i>）；【選】層無外部基準，即為本課程之教學設計。</p>" +
      "<p><b>本課程中【選】層佔比最高</b>——包含全部 24 週的排序、全部曲目選擇、全部版本推薦、全部聆聽任務設計與難度評估。這是教學設計文件的必然性質：本課程並非唯一正確路徑，僅為一條經過設計、內在一致的路徑。</p></div>";

    h += '<div class="card" id="p-glossary"><h2>名詞速查表</h2>' +
      tableHTML({ head: ["中文", "原文／英文", "簡要定義"], rows: CORE.glossary.map(function (g) {
        return [esc(g[0]), "<i>" + esc(g[1]) + "</i>", esc(g[2])]; }) }) + "</div>";

    h += '<div class="card" id="p-caveats"><h2>' + esc(CORE.caveats.title) + "</h2>" +
      tableHTML({ head: ["項目", "說明"], rows: CORE.caveats.items.map(function (i) { return ["<b>" + esc(i[0]) + "</b>", esc(i[1])]; }) }) +
      "<h3>存在學術爭議之處</h3>" +
      tableHTML({ head: ["議題", "爭議性質"], rows: CORE.caveats.disputes.map(function (d) { return [esc(d[0]), esc(d[1])]; }) }) +
      "<p><b>本課程對上述爭議一律採平行陳述，不作單一裁定。</b></p></div>";

    return h;
  }
  function stat(n, l) {
    return '<div style="border:1px solid var(--line);border-radius:10px;padding:12px 14px;background:var(--bg)">' +
      '<div style="font-size:26px;font-weight:700;line-height:1.2;color:var(--acc)">' + n + "</div>" +
      '<div style="font-size:12px;color:var(--mut)">' + l + "</div></div>";
  }

  /* ---------------- 導覽列 ---------------- */
  function navHTML() {
    var h = '<button class="navitem" data-go="home"><span class="wn"><span>◎</span></span><span class="tx">課程總覽</span></button>';
    h += '<button class="navitem" data-go="p-hires"><span class="wn"><span>HR</span></span><span class="tx">Hi-Res 挑選指南</span></button>';
    h += '<button class="navitem" data-go="p-method"><span class="wn"><span>法</span></span><span class="tx">課程設計原則</span></button>';
    h += '<button class="navitem" data-go="p-kkbox"><span class="wn"><span>K</span></span><span class="tx">KKBOX 操作實務</span></button>';
    CORE.modules.forEach(function (m) {
      h += '<div class="navmod"><span>' + esc(m.label) + "</span> " + esc(m.title) + "</div>";
      m.weeks.forEach(function (n) {
        var wk = WEEKS.filter(function (w) { return w.n === n; })[0];
        if (!wk) return;
        h += '<button class="navitem' + (S.done[n] ? " done" : "") + '" data-go="week-' + n + '" data-week="' + n + '">' +
          '<span class="wn"><span>' + n + "</span></span>" +
          '<span class="tx">' + esc(wk.title) + "</span></button>";
      });
    });
    h += '<div class="navmod">附錄</div>';
    h += '<button class="navitem" data-go="p-tiers"><span class="wn"><span>層</span></span><span class="tx">內容性質分類</span></button>';
    h += '<button class="navitem" data-go="p-glossary"><span class="wn"><span>詞</span></span><span class="tx">名詞速查表</span></button>';
    h += '<button class="navitem" data-go="p-caveats"><span class="wn"><span>限</span></span><span class="tx">限制與缺口</span></button>';
    return h;
  }

  /* ---------------- 進度 ---------------- */
  function updateProgress() {
    var d = Object.keys(S.done).filter(function (k) { return S.done[k]; }).length;
    $("#progTxt").textContent = "已完成 " + d + " / 24 週";
    $("#progBar").style.width = (d / 24 * 100) + "%";
  }

  /* ---------------- 主渲染 ---------------- */
  function render() {
    $("#nav").innerHTML = navHTML();
    $("#content").innerHTML = homeHTML() + WEEKS.map(weekHTML).join("") +
      '<div class="foot">古典音樂系統聆聽課程 · ' + esc(CORE.meta.version) +
      "<br>版本推薦與音質標記屬編者判斷，實際曲庫與音質請以 KKBOX App 內顯示為準。</div>";
    updateProgress();
    applyFilter();
  }

  /* ---------------- 搜尋過濾 ---------------- */
  function applyFilter() {
    var q = ($("#q").value || "").trim().toLowerCase();
    var cards = $$("#content .card");
    if (!q) {
      cards.forEach(function (c) { c.classList.remove("hidden"); });
      $$("#content .work").forEach(function (w) { w.classList.remove("hidden", "open"); });
      return;
    }
    cards.forEach(function (c) {
      var works = $$(".work", c);
      var anyWork = false;
      works.forEach(function (w) {
        var hit = (w.getAttribute("data-search") || "").indexOf(q) > -1;
        w.classList.toggle("hidden", !hit);
        w.classList.toggle("open", hit);
        if (hit) anyWork = true;
      });
      var textHit = c.textContent.toLowerCase().indexOf(q) > -1;
      c.classList.toggle("hidden", !(anyWork || (textHit && !works.length) || (textHit && anyWork)));
      if (!works.length) c.classList.toggle("hidden", !textHit);
    });
  }

  /* ---------------- 重聽區 ---------------- */
  function favHTML() {
    var ids = Object.keys(S.fav).filter(function (k) { return S.fav[k] && WORKS[k]; });
    if (!ids.length) return '<p class="hint">還沒有收藏。點任一曲目左邊的 ☆ 就會加進來。<br><br>建議用法：課程進行中凡是聽了有感覺的曲目立即收藏，第 24 週統計哪個時期／作曲家佔比最高——那就是你的品味起點。</p>';
    var lines = ids.map(function (id) {
      var w = WORKS[id];
      var top = sortVersions(w.versions || [])[0];
      return { id: id, w: w, top: top };
    });
    var h = '<div class="rowbtns"><button class="iconbtn" id="favCopy">複製全部搜尋字串（' + ids.length + " 首）</button>" +
      '<button class="iconbtn" id="favClear">清空</button></div><ul class="vlist" style="margin-top:14px">';
    h += lines.map(function (L) {
      return '<li class="v ' + (L.top ? L.top.qa : "hifi") + '"><div>' +
        '<div class="p">' + esc(L.w.title) + "</div>" +
        '<div class="sub">' + esc(L.w.composer) + (L.top ? " ｜ 推薦：" + esc(L.top.p) : "") + "</div></div>" +
        '<div class="acts"><a class="play" data-q="' + esc(L.top ? L.top.q : L.w.q) + '" href="' + esc(kk(L.top ? L.top.q : L.w.q)) + '" target="_blank" rel="noopener">開啟</a>' +
        '<button class="copy" data-unfav="' + esc(L.id) + '">移除</button></div></li>';
    }).join("") + "</ul>";
    return h;
  }
  function favText() {
    return Object.keys(S.fav).filter(function (k) { return S.fav[k] && WORKS[k]; }).map(function (k) {
      var top = sortVersions(WORKS[k].versions || [])[0];
      return (top ? top.q : WORKS[k].q);
    }).join("\n");
  }

  /* ---------------- 設定面板 ---------------- */
  function settingsHTML() {
    var opt = function (v, cur, txt) { return '<option value="' + v + '"' + (v === cur ? " selected" : "") + ">" + txt + "</option>"; };
    return "<h3>連結與顯示設定</h3>" +
      '<div class="fld"><label>KKBOX 地區</label><select id="setRegion">' +
        opt("tw", S.region, "台灣 tw") + opt("hk", S.region, "香港 hk") + opt("sg", S.region, "新加坡 sg") +
        opt("my", S.region, "馬來西亞 my") + opt("jp", S.region, "日本 jp") + "</select></div>" +
      '<div class="fld"><label>介面語言</label><select id="setLang">' +
        opt("tc", S.lang, "繁體中文 tc") + opt("sc", S.lang, "簡體中文 sc") + opt("en", S.lang, "English en") + opt("ja", S.lang, "日本語 ja") + "</select></div>" +
      '<div class="fld"><label>搜尋連結格式（目前：' + esc(SCHEMES[S.scheme].label) + "）</label>" +
        '<div class="hint" style="margin-bottom:8px">下面每一個都用同一組關鍵字 <code>' + esc(TESTQ) + '</code> 測試。<b>逐一點開，哪一個真的跑出搜尋結果，就按它旁邊的「設為預設」</b>，之後全站連結都會改用那個格式。這只需要做一次。</div>' +
        '<ul class="vlist">' + SCHEME_ORDER.map(function (k) {
          var cur = k === S.scheme;
          return '<li class="v ' + (cur ? "hires" : "hifi") + '"><div><div class="p">' + esc(SCHEMES[k].label) + (cur ? "　← 目前使用" : "") + "</div>" +
            '<div class="sub" style="word-break:break-all">' + esc(SCHEMES[k].build(TESTQ, S.region, S.lang)) + "</div></div>" +
            '<div class="acts"><a class="play" href="' + esc(SCHEMES[k].build(TESTQ, S.region, S.lang)) + '" target="_blank" rel="noopener">測試</a>' +
            '<button class="copy" data-setscheme="' + k + '"' + (cur ? " disabled style=\"opacity:.45\"" : "") + ">設為預設</button></div></li>";
        }).join("") + "</ul>" +
        '<div class="hint">看到「請輸入一些關鍵字」= 這個格式沒把關鍵字傳進去，換下一個。<br>不管哪個格式，每個版本旁的「複製搜尋字串」按鈕永遠可用——貼進 KKBOX App 的搜尋列即可。</div></div>' +
      "<h3>版本排序</h3>" +
      '<div class="fld"><label><input type="checkbox" id="setHires"' + (S.hiresFirst ? " checked" : "") + '> 高解析優先排序（Hi-Res → Hi-Fi → 歷史錄音）</label>' +
        '<div class="hint">關閉後改以編者推薦順序排列。</div></div>' +
      '<div class="fld"><label><input type="checkbox" id="setHideH"' + (S.hideHistoric ? " checked" : "") + '> 隱藏歷史錄音（單聲道／早期立體聲）</label>' +
        '<div class="hint">歷史錄音的音質先天受限，但多為詮釋史上的關鍵版本。若你只在意音質，可以關掉它們。</div></div>' +
      "<h3>外觀</h3>" +
      '<div class="fld"><label>主題</label><select id="setTheme">' +
        opt("auto", S.theme, "跟隨系統") + opt("light", S.theme, "淺色") + opt("dark", S.theme, "深色") + "</select></div>" +
      "<h3>資料</h3>" +
      '<div class="rowbtns"><button class="iconbtn" id="setExport">匯出進度</button>' +
      '<button class="iconbtn" id="setReset">清除全部進度</button></div>' +
      '<div class="hint">進度、收藏與設定都存在這台裝置的瀏覽器裡（localStorage），不會上傳。換裝置或清除瀏覽器資料會遺失。</div>';
  }

  /* ---------------- 主題 ---------------- */
  function applyTheme() {
    var t = S.theme;
    if (t === "auto") t = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", t);
  }

  /* ---------------- 抽屜 ---------------- */
  function openDrawer(which) {
    var d = $("#drawer");
    d.innerHTML = '<button class="iconbtn" id="drawerClose" style="float:right">✕ 關閉</button>' + (which === "fav"
      ? '<h3>★ 重聽區</h3><p class="hint">對應課程 §2.2 建議建立的 <code>古典課程｜重聽區</code> 播放清單。</p>' + favHTML()
      : settingsHTML());
    d.classList.add("open"); $("#scrim").classList.add("on");
    d.setAttribute("data-which", which);
  }
  function closeDrawer() { $("#drawer").classList.remove("open"); $("#scrim").classList.remove("on"); }

  /* ---------------- 事件 ---------------- */
  document.addEventListener("click", function (e) {
    var t = e.target;
    if (!t || typeof t.closest !== "function") return;
    var find = function (a) { return t.closest("[" + a + "]"); };

    // 開啟 KKBOX 時順手把關鍵字放進剪貼簿：萬一搜尋頁是空的，直接貼上即可
    var pl = t.closest("a.play");
    if (pl && pl.getAttribute("data-q")) {
      copyText(pl.getAttribute("data-q"));
      toast("已複製關鍵字——若 KKBOX 搜尋頁是空的，直接貼上");
      // 不 return，讓連結照常開啟
    }
    var st = find("data-setscheme");
    if (st) {
      S.scheme = st.getAttribute("data-setscheme"); save(); render(); openDrawer("settings");
      toast("已設為預設：" + SCHEMES[S.scheme].label); return;
    }

    var go = find("data-go");
    if (go) {
      var id = go.getAttribute("data-go");
      var el = id === "home" ? $("#content").firstElementChild : document.getElementById(id);
      if (el) el.scrollIntoView({ block: "start" });
      $$(".navitem").forEach(function (n) { n.classList.remove("active"); });
      if (go.classList.contains("navitem")) go.classList.add("active");
      $("#side").classList.remove("open");
      return;
    }
    var cp = find("data-copy");
    if (cp) { copyText(cp.getAttribute("data-copy"), cp.classList.contains("copy") ? cp : null);
      if (!cp.classList.contains("copy")) toast("已複製搜尋字串"); return; }

    var cw = find("data-copyweek");
    if (cw) {
      var n = +cw.getAttribute("data-copyweek");
      var wk = WEEKS.filter(function (w) { return w.n === n; })[0];
      var lines = (wk.works || []).concat(wk.extraWorks || []).map(function (id) {
        var w = WORKS[id]; if (!w) return null;
        var top = sortVersions(w.versions || [])[0];
        return (top ? top.q : w.q);
      }).filter(Boolean);
      copyText(lines.join("\n")); toast("已複製 " + lines.length + " 組搜尋字串"); return;
    }
    var fv = find("data-fav");
    if (fv) {
      var fid = fv.getAttribute("data-fav");
      S.fav[fid] = !S.fav[fid]; if (!S.fav[fid]) delete S.fav[fid];
      save();
      $$('[data-fav="' + fid + '"]').forEach(function (b) {
        b.classList.toggle("on", !!S.fav[fid]); b.textContent = S.fav[fid] ? "★" : "☆"; });
      $("#favBtn").textContent = "★ 重聽區 (" + Object.keys(S.fav).length + ")";
      return;
    }
    var uf = find("data-unfav");
    if (uf) { delete S.fav[uf.getAttribute("data-unfav")]; save(); openDrawer("fav");
      $("#favBtn").textContent = "★ 重聽區 (" + Object.keys(S.fav).length + ")";
      $$('[data-fav="' + uf.getAttribute("data-unfav") + '"]').forEach(function (b) { b.classList.remove("on"); b.textContent = "☆"; });
      return; }

    var dn = find("data-done");
    if (dn) {
      var wn = dn.getAttribute("data-done");
      S.done[wn] = !S.done[wn]; if (!S.done[wn]) delete S.done[wn];
      save();
      dn.classList.toggle("on", !!S.done[wn]);
      dn.textContent = S.done[wn] ? "✓ 本週已完成" : "標記本週完成";
      var nav = $('.navitem[data-week="' + wn + '"]');
      if (nav) nav.classList.toggle("done", !!S.done[wn]);
      updateProgress();
      return;
    }
    if (t.id === "favBtn") { openDrawer("fav"); return; }
    if (t.closest('[data-open="settings"]') || t.id === "setBtn") { openDrawer("settings"); return; }
    if (t.id === "scrim" || t.id === "drawerClose") { closeDrawer(); return; }
    if (t.id === "menuBtn") { $("#side").classList.toggle("open"); return; }
    if (t.id === "favCopy") { var txt = favText(); if (txt) { copyText(txt); toast("已複製，可直接貼進 KKBOX 逐首搜尋"); } return; }
    if (t.id === "favClear") { if (confirm("清空重聽區？")) { S.fav = {}; save(); render(); openDrawer("fav");
      $("#favBtn").textContent = "★ 重聽區 (0)"; } return; }
    if (t.id === "setExport") {
      var blob = new Blob([JSON.stringify(S, null, 2)], { type: "application/json" });
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob); a.download = "classical-course-progress.json"; a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000); return;
    }
    if (t.id === "setReset") {
      if (confirm("清除全部進度、收藏與設定？此動作無法復原。")) {
        S = Object.assign({}, DEFAULTS, { done: {}, tasks: {}, checks: {}, fav: {} });
        save(); applyTheme(); render(); closeDrawer();
        $("#favBtn").textContent = "★ 重聽區 (0)";
      }
      return;
    }
    // 展開曲目
    var hd = t.closest(".workhd");
    if (hd && !t.closest(".star")) { hd.parentElement.classList.toggle("open"); return; }
  });

  document.addEventListener("change", function (e) {
    var t = e.target;
    if (t.hasAttribute && t.hasAttribute("data-task")) {
      var k = t.getAttribute("data-task");
      S.tasks[k] = t.checked; if (!t.checked) delete S.tasks[k]; save();
      t.closest("li").classList.toggle("dn", t.checked); return;
    }
    if (t.hasAttribute && t.hasAttribute("data-check")) {
      var k2 = t.getAttribute("data-check");
      S.checks[k2] = t.checked; if (!t.checked) delete S.checks[k2]; save();
      t.closest("li").classList.toggle("dn", t.checked); return;
    }
    var map = { setRegion: "region", setLang: "lang", setTheme: "theme" };
    if (map[t.id]) { S[map[t.id]] = t.value; save(); if (t.id === "setTheme") applyTheme(); else render(); return; }
    if (t.id === "setHires") { S.hiresFirst = t.checked; save(); render(); return; }
    if (t.id === "setHideH") { S.hideHistoric = t.checked; save(); render(); return; }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && $("#drawer").classList.contains("open")) closeDrawer();
  });
  $("#q").addEventListener("input", applyFilter);
  $("#q").addEventListener("keydown", function (e) { if (e.key === "Escape") { this.value = ""; applyFilter(); } });
  if (window.matchMedia) {
    var mq = window.matchMedia("(prefers-color-scheme: dark)");
    (mq.addEventListener ? mq.addEventListener.bind(mq, "change") : mq.addListener.bind(mq))(function () { if (S.theme === "auto") applyTheme(); });
  }

  // 捲動時同步導覽高亮
  var spyT;
  window.addEventListener("scroll", function () {
    clearTimeout(spyT);
    spyT = setTimeout(function () {
      var best = null, bestD = Infinity;
      $$("#content .card").forEach(function (c) {
        if (c.classList.contains("hidden") || !c.id) return;
        var d = Math.abs(c.getBoundingClientRect().top - 90);
        if (d < bestD) { bestD = d; best = c.id; }
      });
      if (!best) return;
      $$(".navitem").forEach(function (n) { n.classList.toggle("active", n.getAttribute("data-go") === best); });
    }, 120);
  }, { passive: true });

  /* ---------------- 啟動 ---------------- */
  applyTheme();
  render();
  $("#favBtn").textContent = "★ 重聽區 (" + Object.keys(S.fav).length + ")";
})();
