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

  if (problems.length) {
    console.error("搜尋字串檢查未通過：");
    problems.forEach((x) => console.error("  " + x));
    process.exit(1);
  }
}

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
