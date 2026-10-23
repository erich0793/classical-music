#!/usr/bin/env node
/* 把 index.html + assets/* 內聯成單一 dist/index.html
   用途：離線收藏、寄給別人、或丟到任何靜態空間。無外部相依。 */
const fs = require("fs");
const path = require("path");

const root = __dirname;
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");

let html = read("index.html");

// 驗證 data-links.js 的 key 都對得上實際版本的搜尋字串，
// 打錯字的 key 會靜默失效，這裡先擋下來。
{
  const sandbox = { window: {} };
  for (const f of ["data-works-a.js", "data-works-b.js", "data-links.js"]) {
    new Function("window", read("assets/" + f))(sandbox.window);
  }
  const valid = new Set();
  for (const w of Object.values(sandbox.window.WORKS)) {
    valid.add(w.q);
    for (const v of w.versions) valid.add(v.q);
  }
  const bad = Object.keys(sandbox.window.PINNED || {}).filter((k) => !valid.has(k));
  if (bad.length) {
    console.error("data-links.js 有對不上任何搜尋字串的 key：");
    bad.forEach((k) => console.error("  " + JSON.stringify(k)));
    process.exit(1);
  }

  // 課程 §2.1 的搜尋原則是「作曲家 + 作品 + 演奏者」三段式。
  // 缺作曲家會讓搜尋落到同名作品上，缺演奏者則每個版本會搜到同一批結果。
  const fold = (s) =>
    (s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  const surname = (c) =>
    (c || "").replace(/（.*?）/g, "").replace(/\(.*?\)/g, "").trim()
      .split(/\s+/).filter((x) => !/^[A-Z]\.$/.test(x)).pop() || "";
  const problems = [];
  for (const [id, w] of Object.entries(sandbox.window.WORKS)) {
    const sn = fold(surname(w.composer));
    const seen = new Map();
    for (const v of w.versions) {
      const q = fold(v.q);
      if (sn && !q.includes(sn)) problems.push(`${id} / ${v.p}：搜尋字串缺作曲家「${surname(w.composer)}」→ "${v.q}"`);
      if (seen.has(q)) problems.push(`${id}：兩個版本的搜尋字串相同 → "${v.q}"（${seen.get(q)} / ${v.p}）`);
      seen.set(q, v.p);
    }
  }

  // 台灣傳統音樂課程：多數曲目沒有個人作者，所以「搜尋字串含作曲家姓氏」的規則
  // 不適用。改為驗證：每個版本要有搜尋字串、同一曲目下不得重複、且必須包含
  // 樂種關鍵字之一——否則「將軍令」之類的曲牌名會搜到完全不同的音樂。
  {
    const tw = { window: { COURSES: {} } };
    for (const f of ["data-tw-core.js", "data-tw-works.js", "data-tw-units.js", "data-tw-pages.js"]) {
      new Function("window", read("assets/tw/" + f))(tw.window);
    }
    const T = tw.window.COURSES.taiwan;
    if (!T || !T.works || !T.weeks || !T.pages) {
      console.error("台灣傳統音樂課程資料不完整");
      process.exit(1);
    }
    const GENRE = ["南管", "北管", "陳達", "恆春", "歌仔戲", "客家", "布農", "阿美", "排灣", "泰雅", "卑南",
                   "口簧", "鼻笛", "月琴", "八音", "漢唐樂府", "王心心", "民族樂手", "黑澤隆朝", "郭英男",
                   "Difang", "Pasibutbut", "陸森寶", "賴碧霞", "邱火榮", "楊麗花", "明華園", "唐美雲", "美濃", "陳家班"];
    for (const [id, w] of Object.entries(T.works)) {
      const seen = new Map();
      if (!w.versions || !w.versions.length) problems.push(`taiwan/${id}：沒有任何版本`);
      for (const v of w.versions || []) {
        if (!v.q) { problems.push(`taiwan/${id} / ${v.p}：缺搜尋字串`); continue; }
        if (!GENRE.some((g) => v.q.includes(g)))
          problems.push(`taiwan/${id} / ${v.p}：搜尋字串缺樂種／人名關鍵字 → "${v.q}"`);
        if (seen.has(v.q)) problems.push(`taiwan/${id}：兩個版本的搜尋字串相同 → "${v.q}"`);
        seen.set(v.q, v.p);
      }
    }
    // 單元引用的曲目必須存在
    for (const u of T.weeks) {
      for (const id of [].concat(u.works || [], u.extraWorks || [])) {
        if (!T.works[id]) problems.push(`taiwan/單元 ${u.n}：引用了不存在的曲目 "${id}"`);
      }
      // tw（任務→曲目對應）的長度要與 tasks 一致，否則就地任務會錯位
      if (u.tw && u.tw.length !== (u.tasks || []).length)
        problems.push(`taiwan/單元 ${u.n}：tw 長度 ${u.tw.length} 與 tasks 長度 ${(u.tasks || []).length} 不符`);
      for (const ids of u.tw || []) for (const id of ids) {
        if (!T.works[id]) problems.push(`taiwan/單元 ${u.n}：tw 指向不存在的曲目 "${id}"`);
      }
    }
    for (const pg of T.pages) {
      for (const b of pg.blocks || []) for (const id of b.works || []) {
        if (!T.works[id]) problems.push(`taiwan/${pg.id}：引用了不存在的曲目 "${id}"`);
      }
    }
  }

  // 爵士課：原則同台灣課。另外檢查每個版本的搜尋字串含有演奏者名字裡的某個字——
  // 爵士的同一首曲子有上百個版本，搜尋字串沒有演奏者，就會搜到別人的錄音。
  {
    const jz = { window: { COURSES: {} } };
    for (const f of ["data-jazz-core.js", "data-jazz-works.js", "data-jazz-units.js", "data-jazz-pages.js"]) {
      new Function("window", read("assets/jazz/" + f))(jz.window);
    }
    const J = jz.window.COURSES.jazz;
    if (!J || !J.works || !J.weeks || !J.pages) {
      console.error("爵士樂課程資料不完整");
      process.exit(1);
    }
    const tokens = (p) => (p.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().match(/[a-z]{4,}/g) || [])
      .filter((t) => !["with", "orchestra", "quintet", "quartet", "trio", "band", "live"].includes(t));
    for (const [id, w] of Object.entries(J.works)) {
      const seen = new Set();
      if (!w.versions || !w.versions.length) problems.push(`jazz/${id}：沒有任何版本`);
      for (const v of w.versions || []) {
        if (!v.q) { problems.push(`jazz/${id} / ${v.p}：缺搜尋字串`); continue; }
        const q = v.q.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        const tk = tokens(v.p);
        if (tk.length && !tk.some((t) => q.includes(t)))
          problems.push(`jazz/${id} / ${v.p}：搜尋字串沒有演奏者名字 → "${v.q}"`);
        if (seen.has(v.q)) problems.push(`jazz/${id}：兩個版本的搜尋字串相同 → "${v.q}"`);
        seen.add(v.q);
      }
    }
    for (const u of J.weeks) {
      for (const id of [].concat(u.works || [], u.extraWorks || [])) {
        if (!J.works[id]) problems.push(`jazz/單元 ${u.n}：引用了不存在的曲目 "${id}"`);
      }
      if ((u.tw || []).length !== (u.tasks || []).length)
        problems.push(`jazz/單元 ${u.n}：tw 長度 ${(u.tw || []).length} 與 tasks 長度 ${(u.tasks || []).length} 不符`);
      for (const ids of u.tw || []) for (const id of ids) {
        if (!J.works[id]) problems.push(`jazz/單元 ${u.n}：tw 指向不存在的曲目 "${id}"`);
      }
    }
    for (const m of J.core.modules) for (const n of m.weeks) {
      if (!J.weeks.some((u) => u.n === n)) problems.push(`jazz/${m.label}：列了不存在的單元 ${n}`);
    }

    // ★ 重聽區跨課程共用，以曲目 id 查找——三門課之間 id 重複，就會顯示成別門課的曲子
    const tw = { window: { COURSES: {} } };
    new Function("window", read("assets/tw/data-tw-core.js") + "\n" + read("assets/tw/data-tw-works.js"))(tw.window);
    const owner = {};
    for (const [cid, works] of [["classical", sandbox.window.WORKS], ["taiwan", tw.window.COURSES.taiwan.works], ["jazz", J.works]]) {
      for (const id of Object.keys(works)) {
        if (owner[id]) problems.push(`曲目 id "${id}" 同時出現在 ${owner[id]} 與 ${cid}——重聽區會分不清`);
        owner[id] = cid;
      }
    }
  }

  // 作答欄（data-asks.js）以「週次:任務序號」掛在任務底下。任務在中間被插入或刪掉時
  // 編號會位移，作答欄就會默默掛到別的任務上——所以每一筆都帶一小段任務原文，這裡逐一比對。
  {
    const box = { window: { COURSES: {} } };
    new Function("window", read("assets/data-weeks.js"))(box.window);
    new Function("window", read("assets/tw/data-tw-core.js") + "\n" + read("assets/tw/data-tw-units.js"))(box.window);
    new Function("window", read("assets/jazz/data-jazz-core.js") + "\n" + read("assets/jazz/data-jazz-units.js"))(box.window);
    new Function("window", read("assets/data-asks.js"))(box.window);
    const weeksOf = { classical: box.window.WEEKS, taiwan: (box.window.COURSES.taiwan || {}).weeks, jazz: (box.window.COURSES.jazz || {}).weeks };
    const strip = (s) => String(s).replace(/<[^>]+>/g, "");
    for (const [cid, asks] of Object.entries(box.window.ASKS || {})) {
      const weeks = weeksOf[cid];
      if (!weeks) { problems.push(`data-asks.js：沒有「${cid}」這門課`); continue; }
      for (const [key, a] of Object.entries(asks)) {
        const [n, i] = key.split(":").map(Number);
        const wk = weeks.find((w) => w.n === n);
        const task = wk && (wk.tasks || [])[i];
        if (!task) { problems.push(`data-asks.js ${cid} ${key}：找不到這一項任務`); continue; }
        if (!a.ask) problems.push(`data-asks.js ${cid} ${key}：缺少 ask（要寫什麼）`);
        if (!a.match || !strip(task).includes(a.match))
          problems.push(`data-asks.js ${cid} ${key}：任務原文裡找不到「${a.match}」——任務編號可能位移了。這一項目前是：「${strip(task).slice(0, 40)}…」`);
      }
    }
  }

  if (problems.length) {
    console.error("搜尋字串檢查未通過：");
    problems.forEach((x) => console.error("  " + x));
    process.exit(1);
  }
}

// 離線快取（sw.js）的預存清單必須涵蓋 index.html 載入的每一支 script 與樣式表，
// 而且清單裡的每個檔案都要真的存在——漏一個，裝到主畫面之後一斷網就是白畫面。
{
  const sw = read("sw.js");
  const list = (sw.match(/var PRECACHE = \[([\s\S]*?)\];/) || [])[1];
  if (!list) { console.error("sw.js 找不到 PRECACHE 清單"); process.exit(1); }
  const pre = new Set([...list.matchAll(/"([^"]+)"/g)].map((m) => m[1]));
  const need = [...html.matchAll(/<(?:script src|link rel="stylesheet" href)="([^"]+)"/g)].map((m) => m[1]);
  const missing = need.filter((f) => !pre.has(f));
  const ghost = [...pre].filter((f) => f !== "./" && !fs.existsSync(path.join(root, f)));
  if (missing.length || ghost.length) {
    if (missing.length) console.error("sw.js 的 PRECACHE 少了：\n  " + missing.join("\n  "));
    if (ghost.length) console.error("sw.js 的 PRECACHE 列了不存在的檔案：\n  " + ghost.join("\n  "));
    process.exit(1);
  }
}

// 單一檔案版旁邊沒有圖檔與 manifest：拿掉標了 data-pwa 的那幾行，SVG 圖示改為內嵌
html = html.replace(/^.*\sdata-pwa>\r?\n/gm, "");
html = html.replace('href="assets/icons/icon.svg"',
  'href="data:image/svg+xml,' + encodeURIComponent(read("assets/icons/icon.svg").trim()) + '"');

html = html.replace(
  /<link rel="stylesheet" href="(assets\/[^"]+)">/g,
  (_, p) => "<style>\n" + read(p) + "\n</style>"
);

html = html.replace(
  /<script src="(assets\/[^"]+)"><\/script>/g,
  // </script> 出現在字串中會提前結束 script 標籤，故轉義
  (_, p) => "<script>\n" + read(p).replace(/<\/script>/gi, "<\\/script>") + "\n</script>"
);

fs.mkdirSync(path.join(root, "dist"), { recursive: true });
fs.writeFileSync(path.join(root, "dist", "index.html"), html);

/* Artifact 版本：託管平台會自行包上 <!doctype>/<html>/<head>/<body>，
   故剝掉外層標籤，只留 <title> 與頁面內容。 */
const artifact =
  html.match(/<title>[\s\S]*?<\/title>/)[0] + "\n" +
  html.match(/<style>[\s\S]*?<\/style>/)[0] + "\n" +
  html.slice(html.indexOf("<body>") + 6, html.lastIndexOf("</body>")).trim();
fs.writeFileSync(path.join(root, "dist", "artifact.html"), artifact);

const kb = (s) => (Buffer.byteLength(s) / 1024).toFixed(0);
console.log(`dist/index.html     ${kb(html)} KB`);
console.log(`dist/artifact.html  ${kb(artifact)} KB`);
