#!/usr/bin/env node
/* 把 index.html + assets/* 內聯成單一 dist/index.html
   用途：離線收藏、寄給別人、或丟到任何靜態空間。無外部相依。 */
const fs = require("fs");
const path = require("path");

const root = __dirname;
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");

let html = read("index.html");

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

const kb = (Buffer.byteLength(html) / 1024).toFixed(0);
console.log(`dist/index.html  ${kb} KB`);
