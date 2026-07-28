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
