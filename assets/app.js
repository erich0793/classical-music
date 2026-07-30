(function () {
  "use strict";
  var CORE = window.CORE, WORKS = window.WORKS, WEEKS = window.WEEKS;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]; }); };

  /* ---------------- 設定與狀態（localStorage） ---------------- */
  var LS = "cmc.v1";
  var DEFAULTS = {
    region: "tw", lang: "tc",
    hiresFirst: true, hideHistoric: false, theme: "auto",
    done: {}, tasks: {}, checks: {}, fav: {},
    // 每週的概念區塊是否收起（{ 週次: false } = 已收起）。預設展開，
    // 因為第一次讀概念是課程設計的一部分；重聽時可自行收起。
    theory: {},
    // 使用者從 KKBOX App「分享 → 複製連結」貼回來的正式網址，key = 搜尋字串。
    // 這種連結帶有專輯／歌曲 ID，手機上點擊會由 Universal Link 直接開啟 App。
    links: {}
  };
  var S = load();
  function load() {
    try { return Object.assign({}, DEFAULTS, JSON.parse(localStorage.getItem(LS) || "{}")); }
    catch (e) { return Object.assign({}, DEFAULTS); }
  }
  function save() { try { localStorage.setItem(LS, JSON.stringify(S)); } catch (e) {} }

  /* ---------------- KKBOX 連結 ---------------- */
  /* 搜尋網址格式經使用者實測確認：/{region}/{lang}/search?q={關鍵字}
     曾測試並排除：/search/all/{q}/1（404）、/search?word={q}（關鍵字傳不進去）。
     若 KKBOX 日後改版導致連結失效，只需改這一個函式。 */
  function searchUrl(q) {
    return "https://www.kkbox.com/" + S.region + "/" + S.lang + "/search?q=" + encodeURIComponent(q);
  }

  /* 連結解析順序：本機釘選 → 內建（data-links.js，隨網站部署，跨裝置共用）→ 搜尋連結。
     localStorage 綁定單一裝置＋單一瀏覽器，所以電腦上釘的連結手機看不到；
     要跨裝置共用必須放進 data-links.js。 */
  var REPO = window.PINNED || {};
  function pinnedUrl(q) { return S.links[q] || REPO[q] || null; }
  function pinned(q) { return S.links[q] ? "local" : (REPO[q] ? "repo" : false); }
  function kk(q) { return pinnedUrl(q) || searchUrl(q); }

  // 只接受看起來像 KKBOX 曲目／專輯／歌單的網址，避免把搜尋頁本身存進來
  function parseKKLink(raw) {
    var s = (raw || "").trim();
    if (!s) return null;
    var m = s.match(/https?:\/\/[^\s"']+/);
    if (!m) return null;
    var u = m[0].replace(/[)\]},.;]+$/, "");
    if (!/^https?:\/\/([a-z0-9-]+\.)*(kkbox\.com|kkbox\.fm)(\/|$)/i.test(u)) return { err: "這不是 KKBOX 的連結" };
    if (/\/search(\/|\?|$)/i.test(u)) return { err: "這是搜尋頁連結，沒有帶曲目 ID。請改用 App 裡專輯或歌曲頁的「分享 → 複製連結」" };
    return { url: u };
  }

  /* ---------------- 小工具 ---------------- */
  function setFavCount() {
    $("#favBtn").innerHTML = '★<span class="lbl"> 重聽區</span> (' + Object.keys(S.fav).length + ")";
  }

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
  function download(obj, name) {
    var a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(obj, null, 2)], { type: "application/json" }));
    a.download = name; a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
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
    var pin = pinned(v.q);
    var pinLabel = pin === "local"
      ? '<span class="tag pinTag" title="本機釘選——只存在這台裝置的瀏覽器，其他裝置看不到">🔗 本機</span>'
      : pin === "repo"
        ? '<span class="tag pinTag repo" title="內建連結——隨網站部署，所有裝置都有">🔗 內建</span>' : "";
    return '<li class="v ' + v.qa + (pin ? " pinned" : "") + '">' +
      "<div>" +
        '<div class="p">' + esc(v.p) + " " + pinLabel + "</div>" +
        '<div class="sub"><span class="qbadge ' + v.qa + '" title="' + esc(q.desc) + '">' + esc(q.label) + "</span>" +
          esc(v.l) + (v.y ? " · " + v.y : "") + " " + tags + "</div>" +
        (v.w ? '<div class="why">' + esc(v.w) + "</div>" : "") +
        '<div class="qline' + (pin ? " muted" : "") + '">' +
          (pin ? "🔗 直接開啟已釘選連結，不經過搜尋　｜　搜尋字串：" : "🔍 ") +
          "<code>" + esc(v.q) + "</code></div>" +
      "</div>" +
      '<div class="acts">' +
        '<a class="play" data-q="' + esc(v.q) + '" href="' + esc(kk(v.q)) + '" target="_blank" rel="noopener">' +
          (pin ? "▶ 開啟 App" : "在 KKBOX 開啟") + "</a>" +
        '<button class="copy" data-copy="' + esc(v.q) + '">複製搜尋字串</button>' +
        '<button class="copy" data-pin="' + esc(v.q) + '">' + (pin === "local" ? "換／清除連結" : "🔗 貼上分享連結") + "</button>" +
      "</div></li>";
  }

  /* ---------------- 渲染：曲目 ---------------- */
  function workHTML(id, wk) {
    var w = WORKS[id];
    if (!w) return '<div class="work"><div class="workhd"><button class="ttl" aria-expanded="false"><b>（缺少資料：' + esc(id) + "）</b></button></div></div>";
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
        /* .ttl 必須是 button：原本的 <div> 無法聚焦，鍵盤使用者根本展不開曲目，
           也就拿不到任務與播放連結。不把整個 .workhd 變成 button，否則會嵌套 .star。 */
        '<button class="ttl" aria-expanded="' + (open ? "true" : "false") + '"><b>' + esc(w.title) + "</b><em>" + esc(w.en || "") + " · " + esc(w.composer) + "</em></button>" +
        '<span class="chev">▶</span>' +
      "</div>" +
      '<div class="workbd">' +
        (metas.length ? '<div class="meta">' + metas.join(" ｜ ") + "</div>" : "") +
        (w.bg ? '<div class="bg"><b>作品背景</b>' + tierTags("史析") + w.bg + "</div>" : "") +
        (w.fact ? '<div class="meta">' + tierTags("史") + esc(w.fact) + "</div>" : "") +
        (w.life ? '<div class="life"><b>你可能在哪裡聽過</b>' + w.life + "</div>" : "") +
        (w.pick ? '<div class="meta">' + tierTags("選") + esc(w.pick) + "</div>" : "") +
        (w.note ? '<div class="meta">' + esc(w.note) + "</div>" : "") +
        taskBoxHTML(id, wk) +
        '<div class="vhead">以下 <b>' + vs.length + "</b> 個都是<b>同一首曲子的不同演出</b>（皆為全曲，非片段）——" +
          "<b>選一個聽就好</b>，不必每個都聽。" +
          (S.hiresFirst ? "已依 Hi-Res 優先排序，最上面那個就是建議首選。" : "") + "</div>" +
        '<ul class="vlist">' + vs.map(versionHTML).join("") + "</ul>" +
        '<div class="rowbtns"><button class="iconbtn" data-copy="' + esc(w.q) + '">都找不到？複製通用搜尋字串：' + esc(w.q) + "</button></div>" +
      "</div></div>";
  }

  /* 把本週指派給這首曲目的聆聽任務，直接放在播放按鈕正上方。
     原本任務統一放在週的最下方，使用者往往點了 KKBOX 就離開，
     根本沒看到「這次要聽什麼」——那等於架空了本課程的核心方法。 */
  function taskBoxHTML(workId, wk) {
    if (!wk || !wk.tw) return "";
    var hits = [];
    wk.tw.forEach(function (ids, i) {
      if (ids.indexOf(workId) > -1) hits.push(i);
    });
    if (!hits.length) return "";
    return '<div class="taskbox"><b>▶ 播放前先讀：本週要用這首做什麼</b><ul class="chk">' +
      hits.map(function (i) {
        var k = wk.n + ":" + i, on = !!S.tasks[k];
        return '<li class="' + (i === 0 ? "must " : "") + (on ? "dn" : "") + '">' +
          '<label><input type="checkbox" data-task="' + k + '"' + (on ? " checked" : "") + ">" +
          "<span>" + wk.tasks[i] + "</span></label></li>";
      }).join("") + "</ul></div>";
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

    /* 概念與背景放進可摺疊區。課程要求每首曲目重複聽 4–6 次，同一週會回訪多次，
       概念只在第一次要讀；不摺疊的話每次都得滑過最多 1,365px 才看到播放鈕。
       用原生 <details> 而非自製摺疊，因為 <summary> 本身就可聚焦、可用 Enter/Space 開合。 */
    var thy = "";
    // 時期概覽（模組首週）
    if (mod.period && mod.weeks[0] === wk.n) thy += periodHTML(CORE.periods[mod.period]);
    if (mod.goal && mod.weeks[0] === wk.n) thy += '<div class="banner"><b>本模組目標：</b>' + esc(mod.goal) + "</div>";
    if (wk.banner) thy += '<div class="banner">' + wk.banner + "</div>";

    if (wk.concept && wk.concept.length) {
      thy += "<h3>本週核心概念</h3>";
      wk.concept.forEach(function (c) { thy += "<p>" + tierTags(c.tier) + c.t + "</p>"; });
    }
    if (wk.table) thy += tableHTML(wk.table);
    if (wk.key) thy += '<div class="banner">' + wk.key + "</div>";
    if (wk.note) thy += '<div class="note">' + tierTags(wk.note.tier) + wk.note.t + "</div>";
    if (thy) {
      h += '<details class="theory" data-theory="' + wk.n + '"' + (S.theory[wk.n] === false ? "" : " open") + ">" +
        "<summary>本週概念與背景<span class=\"hint\">（重聽時可收起，直接跳到曲目）</span></summary>" +
        thy + "</details>";
    }

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
    if (wk.yt) h += musecowHTML(wk.yt);
    if (wk.tasks && wk.tasks.length) {
      h += "<h3>聆聽任務總覽</h3>";
      h += '<div class="hint" style="margin-bottom:8px">與各曲目下方的任務是<b>同一份</b>，勾選會同步。這裡列出全部，方便一次檢視本週要做的事。</div>';
      h += '<ul class="chk">';
      h += wk.tasks.map(function (t, i) {
        var k = wk.n + ":" + i, on = !!S.tasks[k];
        return '<li class="' + (i === 0 ? "must " : "") + (on ? "dn" : "") + '">' +
          '<label><input type="checkbox" data-task="' + k + '"' + (on ? " checked" : "") + "><span>" + t + "</span></label></li>";
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

  function musecowHTML(yt) {
    var M = CORE.musecow;
    var h = "<h3>延伸影片｜" + esc(M.name) + " " + tierTags("選") + "</h3>";
    h += '<ul class="vlist">';
    h += '<li class="v yt"><div><div class="p">在頻道內搜尋本週主題</div>' +
      '<div class="sub">關鍵字：<code>' + esc(yt.q) + "</code></div>" +
      '<div class="why">頻道內搜尋，永遠不會失效。海牛的影片偏敘事與情境，正好補本課程偏結構分析的不足。</div></div>' +
      '<div class="acts"><a class="play yt" href="' + esc(M.searchBase + encodeURIComponent(yt.q)) +
      '" target="_blank" rel="noopener">▶ 搜尋影片</a></div></li>';
    (yt.v || []).forEach(function (v) {
      h += '<li class="v yt"><div><div class="p">' + esc(v.t) + "</div>" +
        '<div class="sub"><span class="tag">直接連結</span>youtube.com/watch?v=' + esc(v.id) + "</div></div>" +
        '<div class="acts"><a class="play yt" href="https://www.youtube.com/watch?v=' + esc(v.id) +
        '" target="_blank" rel="noopener">▶ 觀看</a></div></li>';
    });
    h += "</ul>";
    if (yt.v) h += '<div class="hint">直接影片連結取自公開搜尋結果，可能被改名或下架。失效的話用上面的頻道搜尋即可。</div>';
    return h;
  }

  function geographyHTML() {
    var G = CORE.geography;
    var h = '<div class="card" id="p-geo"><h2>' + esc(G.title) + "</h2>" +
      '<div class="enttl">地理軸 — 同一段音樂史的另一種切法</div>' +
      "<p>" + G.intro + "</p>";
    h += '<div class="tw"><table><thead><tr><th>城市</th><th>時期</th><th>誰在這裡</th><th>發生了什麼</th><th>對應週次</th></tr></thead><tbody>';
    h += G.rows.map(function (r) {
      return "<tr><td><b>" + esc(r.city) + "</b></td><td>" + esc(r.period) + "</td><td>" + esc(r.who) + "</td><td>" + esc(r.what) + "</td><td>" +
        r.weeks.map(function (n) { return '<button class="wlink" data-go="week-' + n + '">W' + n + "</button>"; }).join(" ") + "</td></tr>";
    }).join("") + "</tbody></table></div>";
    h += '<div class="note">此頁借鏡焦元溥《37 堂古典音樂課》以「時期／地理／樂器」三軸切入的作法。本課程主幹為時期軸，此表補上地理維度——當你發現維也納一座城市橫跨了本課程七個週次，而巴黎則同時是蕭邦、德布西與《春之祭》的舞台，音樂史的形狀會變得比一條時間線更立體。' + tierTags("選") + "</div></div>";
    return h;
  }

  function instrumentsHTML() {
    var I = CORE.instruments;
    var h = '<div class="card" id="p-inst"><h2>' + esc(I.title) + "</h2>" +
      '<div class="enttl">樂器軸 — 為什麼「時代風格」有一半其實是樂器差異</div>' +
      "<p>" + I.intro + "</p>";
    h += I.rows.map(function (r) {
      return '<div class="instrow">' +
        '<div class="instname">' + esc(r.inst) +
          '<span class="instweeks">' + r.weeks.map(function (n) {
            return '<button class="wlink" data-go="week-' + n + '">W' + n + "</button>"; }).join(" ") + "</span></div>" +
        '<div class="instarc">' + r.arc + "</div>" +
        '<div class="insttask"><b>對比聆聽</b>' + r.task + "</div>" +
      "</div>";
    }).join("");
    h += '<div class="note">' + I.note + " " + tierTags("析選") + "</div></div>";
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
  /* 「本週」入口卡片。
     使用者每週回訪一次，原本每次打開都落在瀏覽器還原的隨機位置，
     完全沒有「我現在該做第幾週」的線索。這裡依 done 狀態推算出下一個
     未完成的週次，直接把該週的必聽第一首與必做任務端到眼前。 */
  function thisWeekHTML() {
    var doneCount = WEEKS.filter(function (w) { return S.done[w.n]; }).length;
    var next = WEEKS.filter(function (w) { return !S.done[w.n]; })[0];

    if (!next) {
      return '<div class="card thisweek"><div class="eyebrow">24 / 24 週</div>' +
        "<h2>全部完成了</h2>" +
        "<p>接下來是第 24 週規劃的事：檢視 ★ 重聽區，統計哪個時期／作曲家佔比最高——" +
        "<b>那就是你的品味起點</b>——然後選一位作曲家做下一輪 6 個月的深度探索。</p>" +
        '<div class="rowbtns"><button class="iconbtn on" data-go="week-24">回到第 24 週：建立自主聆聽路徑</button>' +
        '<button class="iconbtn" id="favBtn2">★ 檢視重聽區</button></div></div>';
    }

    var mod = CORE.modules.filter(function (m) { return m.id === next.m; })[0];
    var h = '<div class="card thisweek">' +
      '<div class="eyebrow">' + (doneCount ? "已完成 " + doneCount + " / 24 週　·　" : "") +
        esc(mod.label) + " " + esc(mod.title) + "</div>" +
      "<h2>" + (doneCount ? "接下來：" : "從這裡開始：") + "第 " + next.n + " 週｜" + esc(next.title) +
        (next.flag ? '<span class="flag">' + esc(next.flag) + "</span>" : "") + "</h2>";

    // 必聽第一首 ＝ 課程定義的「核心 15 分鐘」那首
    var id = (next.works || [])[0];
    var w = id && WORKS[id];
    if (w) {
      var top = sortVersions(w.versions || [])[0];
      h += '<div class="tw-work"><div class="tw-label">本週核心必聽（15 分鐘最低標準）</div>' +
        "<b>" + esc(w.title) + "</b>" +
        (top ? '<div class="tw-ver">' + esc(top.p) + "　" +
          '<span class="qbadge ' + top.qa + '">' + esc(CORE.quality[top.qa].label) + "</span></div>" : "") +
        (next.tasks && next.tasks.length
          ? '<ul class="chk" style="margin-top:8px"><li class="must' + (S.tasks[next.n + ":0"] ? " dn" : "") + '">' +
            '<label><input type="checkbox" data-task="' + next.n + ':0"' + (S.tasks[next.n + ":0"] ? " checked" : "") + ">" +
            "<span>" + next.tasks[0] + "</span></label></li></ul>"
          : "") +
        '<div class="rowbtns">' +
          (top ? '<a class="play" data-q="' + esc(top.q) + '" href="' + esc(kk(top.q)) +
            '" target="_blank" rel="noopener">' + (pinned(top.q) ? "▶ 開啟 App" : "在 KKBOX 開啟") + "</a>" : "") +
          '<button class="iconbtn on" data-go="week-' + next.n + '">進入第 ' + next.n + " 週（全部曲目與任務）</button>" +
        "</div></div>";
    } else {
      h += '<div class="rowbtns"><button class="iconbtn on" data-go="week-' + next.n + '">進入第 ' + next.n + " 週</button></div>";
    }
    return h + "</div>";
  }

  function homeHTML() {
    var totalWorks = Object.keys(WORKS).length;
    var totalVers = Object.keys(WORKS).reduce(function (a, k) { return a + (WORKS[k].versions || []).length; }, 0);
    var hires = Object.keys(WORKS).reduce(function (a, k) {
      return a + (WORKS[k].versions || []).filter(function (v) { return v.qa === "hires"; }).length; }, 0);
    var h = thisWeekHTML();
    h += '<div class="card"><h2>' + esc(CORE.meta.title) + "</h2>" +
      '<div class="enttl">' + esc(CORE.meta.subtitle) + " · " + esc(CORE.meta.version) + "</div>" +
      "<p>24 週、每週 15–90 分鐘可調整的自學路徑。每首曲目都附<b>經過挑選的著名版本</b>，並依 <b>Hi-Res &gt; Hi-Fi &gt; 歷史錄音</b> 排序，可直接連往 KKBOX 搜尋。</p>" +
      '<div class="grid2" style="margin:16px 0">' +
        stat("24", "週單元") + stat(String(totalWorks), "首曲目") + stat(String(totalVers), "個版本推薦") + stat(String(hires), "個 Hi-Res 優先版本") +
      "</div>" +
      '<div class="banner"><b>每一週怎麼用（三步驟）</b><br>' +
        "1. 展開曲目 → <b>先讀「播放前先讀」那一格</b>，知道這次要聽什麼<br>" +
        "2. 版本清單<b>選一個就好</b>（最上面那個是建議首選），點「在 KKBOX 開啟」<br>" +
        "3. 聽完回來勾掉任務。時間不夠就<b>只做每首的第一項「必做」</b>，然後前進到下一週——" +
        "<b>課程的連續性比單週的完整性重要。</b></div>" +
      '<div class="rowbtns"><button class="iconbtn" data-go="p-hires">先開好 Hi-Res 音質設定</button>' +
      '<button class="iconbtn" data-go="p-method">課程設計原則</button>' +
      '<button class="iconbtn" data-go="all">顯示全部（一頁瀏覽／列印）</button></div></div>';

    return h;
  }

  function pHiresHTML() {
    var h = '<div class="card" id="p-hires"><h2>Hi-Res / Hi-Fi 版本怎麼挑</h2>' +
      '<div class="enttl">本站所有版本清單都預設把高解析排在最前面</div>' +
      "<ol>" + CORE.practice.hires.map(function (t) { return "<li>" + t + "</li>"; }).join("") + "</ol>" +
      "<h3>本站的音質標記代表什麼</h3><div class=\"tw\"><table><thead><tr><th>標記</th><th>意義</th></tr></thead><tbody>" +
      Object.keys(CORE.quality).map(function (k) {
        return '<tr><td><span class="qbadge ' + k + '">' + esc(CORE.quality[k].label) + "</span></td><td>" + esc(CORE.quality[k].desc) + "</td></tr>";
      }).join("") + "</tbody></table></div>" +
      '<div class="note">這些標記是<b>依錄音年代與發行廠牌所作的推估</b>，不是 KKBOX 的即時資料。實際請以 App 內顯示的音質標記為準。</div></div>';

    return h;
  }

  function pMethodHTML() {
    var h = '<div class="card" id="p-method"><h2>課程設計原則</h2>' +
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

    return h;
  }

  function pKkboxHTML() {
    var h = '<div class="card" id="p-kkbox"><h2>KKBOX 操作實務</h2>' +
      "<h3>搜尋策略 " + tierTags("選") + "</h3><ol>" + CORE.practice.search.map(function (t) { return "<li>" + t + "</li>"; }).join("") + "</ol>" +
      "<h3>播放清單管理</h3><p><b>建議建立 24 個播放清單</b>，命名為 <code>古典課程 W01</code>～<code>W24</code>，每週開始時先建好當週清單。此舉的價值不在整理，而在於<b>課程結束後，你會擁有一份自己的、有結構的個人曲庫</b>。</p>" +
      "<p>另建一份 <code>古典課程｜重聽區</code>，凡是聽了有感覺的曲目立即丟進去。本站右上角的 <b>★ 重聽區</b> 即對應此用途，可一鍵匯出全部搜尋字串。</p>" +
      "<h3>音質與設備 " + tierTags("選") + "</h3>" +
      "<p>古典音樂的動態範圍（dynamic range）遠大於流行音樂——最弱與最強的音量差距可達 60 dB 以上。實務影響：</p>" +
      "<ul>" + CORE.practice.audio.map(function (t) { return "<li>" + t + "</li>"; }).join("") + "</ul></div>";

    return h;
  }

  function pTiersHTML() {
    var h = '<div class="card" id="p-tiers"><h2>內容性質分類宣告</h2>' +
      '<div class="enttl">Content-Nature Classification Declaration</div>' +
      "<p>本課程屬<b>人文藝術教學設計</b>，不包含療效、診斷、預後或風險等可經 RCT 檢定之命題，故<b>不採用 GRADE / Oxford CEBM</b>——強行套用臨床分級系統將構成分級系統誤用。改採專為本領域定義之三層內容性質分類，判準為「陳述可否經由標準參考文獻查證」。</p>" +
      tableHTML({ head: ["標記", "層級", "定義", "可查證性"], rows: Object.keys(CORE.tiers).map(function (k) {
        var t = CORE.tiers[k];
        return ['<span class="tier ' + k + '">' + k + "</span>", "<b>" + esc(t.name) + "</b><br>" + esc(t.en), esc(t.desc), esc(t.verify)];
      }) }) +
      "<p><b>查證基準</b>：【史】層為 <i>Grove Music Online</i>、各作曲家標準作品目錄（BWV、K.、D. 等）及標準校訂樂譜；【析】層為通行音樂理論教材（Kostka &amp; Payne, <i>Tonal Harmony</i>；Burkholder, Grout &amp; Palisca, <i>A History of Western Music</i>）；【選】層無外部基準，即為本課程之教學設計。</p>" +
      "<p><b>本課程中【選】層佔比最高</b>——包含全部 24 週的排序、全部曲目選擇、全部版本推薦、全部聆聽任務設計與難度評估。這是教學設計文件的必然性質：本課程並非唯一正確路徑，僅為一條經過設計、內在一致的路徑。</p></div>";

    return h;
  }

  function pGlossaryHTML() {
    var h = '<div class="card" id="p-glossary"><h2>名詞速查表</h2>' +
      tableHTML({ head: ["中文", "原文／英文", "簡要定義"], rows: CORE.glossary.map(function (g) {
        return [esc(g[0]), "<i>" + esc(g[1]) + "</i>", esc(g[2])]; }) }) + "</div>";

    return h;
  }

  function pCaveatsHTML() {
    var h = '<div class="card" id="p-caveats"><h2>' + esc(CORE.caveats.title) + "</h2>" +
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
    h += '<button class="navitem" data-go="p-geo"><span class="wn"><span>圖</span></span><span class="tx">音樂地圖（地理軸）</span></button>';
    h += '<button class="navitem" data-go="p-inst"><span class="wn"><span>器</span></span><span class="tx">樂器的演變（樂器軸）</span></button>';
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
    h += '<div class="navmod">其他</div>';
    h += '<button class="navitem" data-go="all"><span class="wn"><span>全</span></span><span class="tx">顯示全部（列印用）</span></button>';
    return h;
  }

  /* ---------------- 進度 ---------------- */
  function updateProgress() {
    var d = Object.keys(S.done).filter(function (k) { return S.done[k]; }).length;
    $("#progTxt").textContent = "已完成 " + d + " / 24 週";
    $("#progBar").style.width = (d / 24 * 100) + "%";
  }

  /* ---------------- 檢視與路由 ----------------
     原本 24 週全部渲染在同一份文件裡，實測桌機 44.5 個螢幕高、手機 70.8 個，
     DOM 8944 個節點。一門要用 6 個月、每週只需要一週內容的課程不該這樣。
     改為一次只渲染當前檢視，並以 URL hash 作為單一真實來源——
     因此瀏覽器上一頁／下一頁自動可用，單一週次也能加書籤。 */
  var PAGES = {
    home: homeHTML,
    "p-hires": pHiresHTML,
    "p-method": pMethodHTML,
    "p-kkbox": pKkboxHTML,
    "p-geo": geographyHTML,
    "p-inst": instrumentsHTML,
    "p-tiers": pTiersHTML,
    "p-glossary": pGlossaryHTML,
    "p-caveats": pCaveatsHTML
  };
  var view = "home";
  var searchReturn = "home"; // 清空搜尋時要回到哪個檢視

  function viewFromHash() {
    var h = (location.hash || "").replace(/^#/, "");
    if (!h) return "home";
    if (h === "all") return "all";
    if (PAGES[h]) return h;
    var m = h.match(/^week-(\d+)$/);
    if (m && WEEKS.some(function (w) { return w.n === +m[1]; })) return h;
    return "home"; // 未知的 hash（例如舊書籤）落回首頁，不留白畫面
  }

  function setView(v, opts) {
    opts = opts || {};
    view = v;
    if (!opts.fromHash) {
      var target = v === "home" ? "" : "#" + v;
      if (location.hash !== target) {
        // 用 hash 記錄檢視，讓上一頁／下一頁與書籤都能運作
        if (target) location.hash = v; else history.replaceState(null, "", location.pathname + location.search);
      }
    }
    render();
    if (!opts.keepScroll) window.scrollTo(0, 0);
    $("#side").classList.remove("open");
  }

  var FOOT = '<div class="foot">古典音樂系統聆聽課程 · ' + esc(CORE.meta.version) +
    "<br>版本推薦與音質標記屬編者判斷，實際曲庫與音質請以 KKBOX App 內顯示為準。</div>";

  function weekNavHTML(n) {
    var prev = WEEKS.filter(function (w) { return w.n === n - 1; })[0];
    var next = WEEKS.filter(function (w) { return w.n === n + 1; })[0];
    return '<div class="weeknav">' +
      (prev ? '<button class="iconbtn" data-go="week-' + prev.n + '">← 第 ' + prev.n + " 週　" + esc(prev.title) + "</button>" : "<span></span>") +
      (next ? '<button class="iconbtn" data-go="week-' + next.n + '">第 ' + next.n + " 週　" + esc(next.title) + " →</button>" : "<span></span>") +
      "</div>";
  }

  /* ---------------- 主渲染 ---------------- */
  function render() {
    $("#nav").innerHTML = navHTML();
    var body;
    if (view === "search") {
      body = searchHTML();
    } else if (view === "all") {
      body = '<div class="banner" style="margin-bottom:16px"><b>顯示全部</b>：整份課程在同一頁，適合一路瀏覽或列印。' +
        '要回到單週檢視，點左側任一週次即可。</div>' +
        homeHTML() + geographyHTML() + instrumentsHTML() +
        pHiresHTML() + pMethodHTML() + pKkboxHTML() +
        WEEKS.map(weekHTML).join("") + pTiersHTML() + pGlossaryHTML() + pCaveatsHTML();
    } else if (/^week-\d+$/.test(view)) {
      var n = +view.split("-")[1];
      var wk = WEEKS.filter(function (w) { return w.n === n; })[0];
      body = weekHTML(wk) + weekNavHTML(n);
    } else {
      body = (PAGES[view] || homeHTML)();
    }
    $("#content").innerHTML = body + FOOT;
    updateProgress();
    $$(".navitem").forEach(function (el) {
      el.classList.toggle("active", el.getAttribute("data-go") === view);
    });
  }

  /* ---------------- 搜尋 ----------------
     原本是對已渲染的 DOM 加 .hidden，單週檢視下 DOM 只有一週，那種做法會失效。
     改為對資料本身搜尋並產生結果檢視——順便解決了原本「找到了卻不知道在第幾週」
     的問題：每個結果都標明所屬週次，可直接跳過去。 */

  // 每首曲目出現在哪幾週（同一首可能跨週複用，例如 mozart-40 在第 4、8 週）
  var WORK_WEEKS = (function () {
    var map = {};
    WEEKS.forEach(function (w) {
      [].concat(w.works || [], w.extraWorks || []).forEach(function (id) {
        (map[id] = map[id] || []).push(w.n);
      });
    });
    return map;
  })();

  function searchIndex(id) {
    var w = WORKS[id];
    return [w.title, w.en, w.composer, w.q, w.bg, w.fact, w.life, w.pick,
            (w.versions || []).map(function (v) { return v.p + " " + v.l + " " + v.q; }).join(" ")]
      .filter(Boolean).join(" ").toLowerCase();
  }

  function runSearch(q) {
    q = q.trim().toLowerCase();
    var works = Object.keys(WORKS)
      .filter(function (id) { return searchIndex(id).indexOf(q) > -1; })
      .sort(function (a, b) { return (WORK_WEEKS[a] || [99])[0] - (WORK_WEEKS[b] || [99])[0]; });
    var weeks = WEEKS.filter(function (w) {
      var t = (w.title + " " + (w.en || "") + " " +
        (w.concept || []).map(function (c) { return c.t; }).join(" ")).toLowerCase();
      return t.indexOf(q) > -1;
    });
    return { works: works, weeks: weeks };
  }

  function searchHTML() {
    var q = ($("#q").value || "").trim();
    var r = runSearch(q);
    var h = '<div class="card"><h2>搜尋「' + esc(q) + "」</h2>" +
      '<div class="enttl">曲目 ' + r.works.length + " 首　·　週次 " + r.weeks.length + " 個</div>";
    if (!r.works.length && !r.weeks.length) {
      h += '<p class="hint">沒有符合的結果。試試作曲家姓氏（Beethoven）、演奏者（Kleiber）、' +
        "或中文曲名關鍵字（夜曲、賦格）。</p></div>";
      return h;
    }
    if (r.weeks.length) {
      h += "<h3>週次</h3><div class=\"rowbtns\">" + r.weeks.map(function (w) {
        return '<button class="iconbtn" data-go="week-' + w.n + '">第 ' + w.n + " 週　" + esc(w.title) + "</button>";
      }).join("") + "</div>";
    }
    h += "</div>";
    if (r.works.length) {
      h += '<div class="card"><h2>曲目</h2>';
      h += r.works.map(function (id) {
        var wks = WORK_WEEKS[id] || [];
        var wk = WEEKS.filter(function (w) { return w.n === wks[0]; })[0];
        return '<div class="srow">' + (wks.length
          ? wks.map(function (n) { return '<button class="wlink" data-go="week-' + n + '">第 ' + n + " 週</button>"; }).join(" ")
          : '<span class="hint">延伸曲目</span>') + "</div>" + workHTML(id, wk);
      }).join("");
      h += "</div>";
    }
    return h;
  }

  var searchT;
  function onSearchInput() {
    clearTimeout(searchT);
    searchT = setTimeout(function () {
      var q = ($("#q").value || "").trim();
      if (!q) {
        if (view === "search") setView(searchReturn);
        return;
      }
      if (view !== "search") searchReturn = view;
      view = "search";
      render();
      window.scrollTo(0, 0);
    }, 160);
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
      '<div class="fld"><label>搜尋連結格式</label>' +
        '<div class="hint">已固定為 <code>www.kkbox.com/' + esc(S.region) + "/" + esc(S.lang) + '/search?q=…</code>（經實測確認可用）。<br>' +
        "若日後 KKBOX 改版導致連結失效，仍可用每個版本旁的「複製搜尋字串」，或用「🔗 貼上分享連結」把 App 的正式網址釘上去。</div></div>" +
      "<h3>版本排序</h3>" +
      '<div class="fld"><label><input type="checkbox" id="setHires"' + (S.hiresFirst ? " checked" : "") + '> 高解析優先排序（Hi-Res → Hi-Fi → 歷史錄音）</label>' +
        '<div class="hint">關閉後改以編者推薦順序排列。</div></div>' +
      '<div class="fld"><label><input type="checkbox" id="setHideH"' + (S.hideHistoric ? " checked" : "") + '> 隱藏歷史錄音（單聲道／早期立體聲）</label>' +
        '<div class="hint">歷史錄音的音質先天受限，但多為詮釋史上的關鍵版本。若你只在意音質，可以關掉它們。</div></div>' +
      "<h3>外觀</h3>" +
      '<div class="fld"><label>主題</label><select id="setTheme">' +
        opt("auto", S.theme, "跟隨系統") + opt("light", S.theme, "淺色") + opt("dark", S.theme, "深色") + "</select></div>" +
      "<h3>已釘選的 App 連結</h3>" +
      '<div class="tw"><table><tbody>' +
        '<tr><th>🔗 本機</th><td><b>' + Object.keys(S.links).length + "</b> 個<br>" +
          '<span class="hint">存在<b>這台裝置的這個瀏覽器</b>裡。換手機、換瀏覽器、清除瀏覽資料都會不見，' +
          "而且<b>電腦上釘的手機看不到</b>。</span></td></tr>" +
        '<tr><th>🔗 內建</th><td><b>' + Object.keys(REPO).length + "</b> 個<br>" +
          '<span class="hint">寫在網站原始碼的 <code>assets/data-links.js</code> 裡，隨網站一起部署，' +
          "<b>所有裝置都有</b>。</span></td></tr>" +
      "</tbody></table></div>" +
      '<div class="hint">釘選過的版本在手機上點「開啟 App」會由 Universal Link 直接跳進 KKBOX App，不再經過搜尋。<br>' +
        "做法：KKBOX App 找到專輯 → 分享 → 複製連結 → 回到這裡按該版本的「🔗 貼上分享連結」。</div>" +
      '<div class="hint" style="margin-top:8px"><b>要讓所有裝置都吃到，用「複製全部（JSON）」</b>把內容交給我或自己貼進 ' +
        "<code>assets/data-links.js</code> 後 push，下次部署起全部裝置生效。</div>" +
      '<div class="rowbtns"><button class="iconbtn" id="linkCopy">複製全部（JSON）</button>' +
      '<button class="iconbtn" id="linkExport">下載 .json</button>' +
      '<button class="iconbtn" id="linkImport">貼上匯入</button>' +
      (Object.keys(S.links).length ? '<button class="iconbtn" id="linkClear">清除本機釘選</button>' : "") + "</div>" +
      "<h3>資料</h3>" +
      '<div class="rowbtns"><button class="iconbtn" id="setExport">匯出進度</button>' +
      '<button class="iconbtn" id="setImport">匯入進度</button>' +
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
    var pn = find("data-pin");
    if (pn) {
      var pq = pn.getAttribute("data-pin");
      var cur = S.links[pq] || "";
      var raw = prompt(
        "在 KKBOX App 找到這張專輯 → 分享 → 複製連結 → 貼在這裡。\n" +
        "之後點「開啟 App」就會直接跳到這張專輯。\n\n" +
        "留白並確定＝清除已釘選的連結。\n\n關鍵字：" + pq, cur);
      if (raw === null) return;
      if (!raw.trim()) { delete S.links[pq]; save(); render(); toast("已清除釘選連結"); return; }
      var r = parseKKLink(raw);
      if (!r) { toast("沒有偵測到網址"); return; }
      if (r.err) { toast(r.err); return; }
      S.links[pq] = r.url; save(); render(); toast("已釘選——這一版現在會直接開啟 App");
      return;
    }
    var go = find("data-go");
    if (go) {
      var id = go.getAttribute("data-go");
      if (view === "all") {
        // 顯示全部模式下沿用捲動定位，不切換檢視
        var el = id === "home" ? $("#content").firstElementChild : document.getElementById(id);
        if (el) { el.scrollIntoView({ block: "start" }); $("#side").classList.remove("open"); return; }
      }
      if ($("#q").value) $("#q").value = "";
      setView(id);
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
      setFavCount();
      return;
    }
    var uf = find("data-unfav");
    if (uf) { delete S.fav[uf.getAttribute("data-unfav")]; save(); openDrawer("fav");
      setFavCount();
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
    /* 用 closest 而非 t.id：★／⚙ 兩顆按鈕內含 <span class="lbl">，
       點在「重聽區」「設定」這幾個字上時 e.target 會是那個 span，id 為空，
       按鈕就沒反應——只有點到圖示才有用。 */
    if (t.closest("#favBtn") || t.closest("#favBtn2")) { openDrawer("fav"); return; }
    if (t.closest('[data-open="settings"]') || t.closest("#setBtn")) { openDrawer("settings"); return; }
    if (t.id === "scrim" || t.id === "drawerClose") { closeDrawer(); return; }
    if (t.id === "menuBtn") { $("#side").classList.toggle("open"); return; }
    if (t.id === "favCopy") { var txt = favText(); if (txt) { copyText(txt); toast("已複製，可直接貼進 KKBOX 逐首搜尋"); } return; }
    if (t.id === "favClear") { if (confirm("清空重聽區？")) { S.fav = {}; save(); render(); openDrawer("fav");
      setFavCount(); } return; }
    if (t.id === "setExport") { download(S, "classical-course-progress.json"); return; }
    if (t.id === "linkExport") {
      if (!Object.keys(S.links).length) { toast("還沒有本機釘選"); return; }
      download(S.links, "kkbox-links.json"); return;
    }
    if (t.id === "linkCopy") {
      var all = Object.assign({}, REPO, S.links);
      if (!Object.keys(all).length) { toast("還沒有任何釘選連結"); return; }
      copyText(JSON.stringify(all, null, 2));
      toast("已複製 " + Object.keys(all).length + " 個連結（本機＋內建）");
      return;
    }
    if (t.id === "linkImport" || t.id === "setImport") {
      var isLinks = t.id === "linkImport";
      var raw = prompt(isLinks
        ? "貼上先前匯出的 kkbox-links.json 內容（會與現有的合併，同名覆蓋）："
        : "貼上先前匯出的 classical-course-progress.json 內容（會覆蓋目前的進度）：", "");
      if (raw === null || !raw.trim()) return;
      var data;
      try { data = JSON.parse(raw); } catch (err) { toast("JSON 格式不正確，沒有匯入"); return; }
      if (!data || typeof data !== "object" || Array.isArray(data)) { toast("內容不是預期的格式"); return; }
      if (isLinks) {
        var n = 0;
        Object.keys(data).forEach(function (k) {
          var r = parseKKLink(data[k]);
          if (r && r.url) { S.links[k] = r.url; n++; }
        });
        save(); render(); openDrawer("settings"); toast("已匯入 " + n + " 個連結");
      } else {
        S = Object.assign({}, DEFAULTS, data);
        save(); applyTheme(); render(); openDrawer("settings");
        setFavCount();
        toast("已匯入進度");
      }
      return;
    }
    if (t.id === "linkClear") {
      if (confirm("清除全部已釘選的 App 連結？（進度與收藏不受影響）")) {
        S.links = {}; save(); render(); openDrawer("settings"); toast("已清除");
      }
      return;
    }
    if (t.id === "setReset") {
      if (confirm("清除全部進度、收藏與設定？此動作無法復原。")) {
        S = Object.assign({}, DEFAULTS, { done: {}, tasks: {}, checks: {}, fav: {} });
        save(); applyTheme(); render(); closeDrawer();
        setFavCount();
      }
      return;
    }
    // 展開曲目
    var hd = t.closest(".workhd");
    if (hd && !t.closest(".star")) {
      var on = hd.parentElement.classList.toggle("open");
      var ttl = hd.querySelector(".ttl");
      if (ttl) ttl.setAttribute("aria-expanded", on ? "true" : "false");
      return;
    }
  });

  /* <details> 的 toggle 不會冒泡，必須用捕獲階段監聽 */
  document.addEventListener("toggle", function (e) {
    var d = e.target;
    if (!d.hasAttribute || !d.hasAttribute("data-theory")) return;
    var n = d.getAttribute("data-theory");
    if (d.open) delete S.theory[n]; else S.theory[n] = false;
    save();
  }, true);

  /* 收起的 <details> 內容不會列印，列印前先全部展開 */
  window.addEventListener("beforeprint", function () {
    $$("details").forEach(function (d) { d.open = true; });
  });

  document.addEventListener("change", function (e) {
    var t = e.target;
    if (t.hasAttribute && t.hasAttribute("data-task")) {
      var k = t.getAttribute("data-task");
      S.tasks[k] = t.checked; if (!t.checked) delete S.tasks[k]; save();
      // 同一項任務同時出現在曲目下方與週末總覽，兩處都要同步
      $$('[data-task="' + k + '"]').forEach(function (el) {
        el.checked = t.checked;
        el.closest("li").classList.toggle("dn", t.checked);
      });
      return;
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
  $("#q").addEventListener("input", onSearchInput);
  $("#q").addEventListener("keydown", function (e) {
    if (e.key === "Escape") { this.value = ""; onSearchInput(); }
  });
  window.addEventListener("hashchange", function () {
    var v = viewFromHash();
    if (v !== view) { if ($("#q").value) $("#q").value = ""; setView(v, { fromHash: true }); }
  });
  if (window.matchMedia) {
    var mq = window.matchMedia("(prefers-color-scheme: dark)");
    (mq.addEventListener ? mq.addEventListener.bind(mq, "change") : mq.addListener.bind(mq))(function () { if (S.theme === "auto") applyTheme(); });
  }

  // 捲動時同步導覽高亮
  var spyT;
  window.addEventListener("scroll", function () {
    if (view !== "all") return;   // 單週檢視不需要捲動定位，省掉每次捲動的量測迴圈
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
  view = viewFromHash();
  render();
  setFavCount();
})();
