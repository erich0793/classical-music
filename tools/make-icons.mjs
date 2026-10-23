#!/usr/bin/env node
/* 由 assets/icons/icon.svg 產生「加到主畫面」與分享預覽所需的全部圖檔。
   改了 icon.svg 之後重跑一次即可：

     node tools/make-icons.mjs

   需要 Playwright（與測試共用：npm install）。分享預覽圖的中文用 Google Fonts，
   所以這一步要能連網。產出的檔案都會進版控，網站本身執行時不需要這支腳本。 */
import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = (p) => path.join(root, "assets", p);
const svg = fs.readFileSync(out("icons/icon.svg"), "utf8");

// 全幅版本（iOS 與 Android 自適應圖示會自己裁圓角）：背景鋪滿，
// 音符縮小到安全區內——Android 可能把圖示裁成圓形，只保證中央 80% 看得到。
const fullBleed = (scale) => svg
  .replace('rx="112"', 'rx="0"')
  .replace(/<g fill="#f7f5f1" transform="([^"]+)">/,
    (_, t) => `<g transform="translate(256 256) scale(${scale}) translate(-256 -256)"><g fill="#f7f5f1" transform="${t}">`)
  .replace("</svg>", "</g></svg>");

const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
const page = await browser.newPage();

async function png(markup, size, file, transparent) {
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(`<style>html,body{margin:0;background:transparent}svg{display:block;width:${size}px;height:${size}px}</style>${markup}`);
  await page.screenshot({ path: out(file), omitBackground: !!transparent });
  console.log("  " + file);
}

console.log("圖示：");
await png(svg, 32, "icons/favicon-32.png", true);
await png(svg, 192, "icons/icon-192.png", true);
await png(svg, 512, "icons/icon-512.png", true);
await png(fullBleed(0.78), 512, "icons/maskable-512.png");
await png(fullBleed(0.84), 180, "icons/apple-touch-icon.png");

// 分享預覽圖（LINE、Facebook 貼網址時出現的那張卡片），1200×630 是兩者共通的比例。
// 字要大：LINE 聊天室裡這張圖常常只顯示成手機寬度的一半。
console.log("分享預覽：");
await page.setViewportSize({ width: 1200, height: 630 });
await page.setContent(`
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@500;700&family=Noto+Serif+TC:wght@700&display=swap">
<style>
  html,body{margin:0}
  body{width:1200px;height:630px;background:#f7f5f1;color:#22201d;display:flex;align-items:center;
    gap:64px;padding:0 96px;box-sizing:border-box;font-family:"Noto Sans TC",sans-serif;
    border-bottom:14px solid #8a5a2b}
  .ic{flex:none;width:230px;height:230px}
  .ic svg{width:100%;height:100%;display:block}
  h1{font-family:"Noto Serif TC",serif;font-weight:700;font-size:104px;line-height:1.1;margin:0 0 22px;color:#22201d}
  .sub{font-size:42px;font-weight:700;color:#8a5a2b;line-height:1.35}
  .meta{font-size:30px;font-weight:500;color:#6d6760;margin-top:24px;line-height:1.4}
</style>
<div class="ic">${svg}</div>
<div>
  <h1>聆聽課程</h1>
  <div class="sub">古典音樂 24 週<br>台灣傳統音樂 8 單元<br>爵士樂 12 單元</div>
  <div class="meta">133 首曲目 · 424 個版本推薦<br>KKBOX／YouTube 一鍵開啟</div>
</div>`);
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(400);
await page.screenshot({ path: out("og-image.png") });
console.log("  og-image.png");

await browser.close();
