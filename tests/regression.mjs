#!/usr/bin/env node
/* 回歸測試：在真的瀏覽器裡把整個網站點過一遍。

     npm install          # 第一次：裝 Playwright（只有測試用得到，網站本身零相依）
     npx playwright install chromium
     npm test

   已經有 Chromium 的環境可以用 CHROME_PATH 指定，不必另外下載：
     CHROME_PATH=/path/to/chrome npm test

   全部通過時結束碼為 0，任何一項失敗為 1。每一項都寫成「使用者會遇到什麼」，
   失敗時看名稱就知道哪裡壞了。

   為什麼要自己起一個伺服器：離線快取（sw.js）只能在 http(s) 上運作，
   用 file:// 直接開檔測不到「加到主畫面之後斷網還能用」這件事。 */
import { chromium } from "playwright";
import http from "http";
import fs from "fs";
import path from "path";
import { execFileSync } from "child_process";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const results = [];
let section = "";
const ok = (name, pass, detail) => {
  results.push({ section, name, pass: !!pass, detail: detail === undefined ? "" : String(detail) });
};
const group = (s) => { section = s; };

/* ---------- 靜態伺服器 ---------- */
const MIME = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".json": "application/json", ".webmanifest": "application/manifest+json", ".svg": "image/svg+xml",
  ".png": "image/png", ".ico": "image/x-icon"
};
const server = http.createServer((req, res) => {
  const p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  let f = path.join(ROOT, p);
  if (!f.startsWith(ROOT)) { res.writeHead(403); return res.end(); }
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, "index.html");
  if (!fs.existsSync(f)) { res.writeHead(404); return res.end("not found"); }
  res.writeHead(200, { "Content-Type": MIME[path.extname(f)] || "application/octet-stream", "Cache-Control": "no-store" });
  fs.createReadStream(f).pipe(res);
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const U = `http://127.0.0.1:${server.address().port}/`;

const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
const UA = {
  iphone: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1",
  android: "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Mobile Safari/537.36"
};
async function page(opts = {}) {
  const ctx = await browser.newContext(Object.assign(
    { viewport: { width: 1180, height: 900 }, serviceWorkers: "block" }, opts.mobile
      ? { viewport: { width: opts.width || 390, height: 844 }, isMobile: true, hasTouch: true } : {},
    opts.ctx || {}));
  const p = await ctx.newPage();
  p.errors = [];
  p.on("pageerror", (e) => p.errors.push(e.message));
  p.on("console", (m) => { if (m.type() === "error") p.errors.push(m.text()); });
  if (opts.state) await ctx.addInitScript((s) => {
    if (!sessionStorage.getItem("__seeded")) { localStorage.setItem("cmc.v1", JSON.stringify(s)); sessionStorage.setItem("__seeded", "1"); }
  }, opts.state);
  return p;
}
async function go(p, hash) {
  await p.goto(U + (hash || ""));
  await p.waitForSelector("#content .card");
  await p.waitForTimeout(120);
}
const visible = (sel) => [...document.querySelectorAll(sel)]
  .filter((e) => e.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true })).length;

/* ---------- A. 資料與打包 ---------- */
group("資料與打包");
try {
  const out = execFileSync(process.execPath, [path.join(ROOT, "build.js")], { cwd: ROOT, encoding: "utf8" });
  ok("build.js 通過全部資料驗證並產出單一檔案版", /dist\/index\.html/.test(out));
} catch (e) {
  ok("build.js 通過全部資料驗證並產出單一檔案版", false, (e.stdout || "") + (e.stderr || ""));
}

/* ---------- B. 每一頁都能正常顯示 ---------- */
group("每一頁都能正常顯示");
{
  const p = await page();
  await go(p, "");
  const classical = await p.$$eval("#nav [data-go]", (b) => b.map((x) => x.getAttribute("data-go")));
  await go(p, "#taiwan");
  const taiwan = await p.$$eval("#nav [data-go]", (b) => b.map((x) => x.getAttribute("data-go")));
  const views = [...new Set(classical)].map((v) => (v === "home" ? "" : "#" + v))
    .concat([...new Set(taiwan)].map((v) => "#taiwan/" + (v === "home" ? "" : v)));
  ok("兩門課的導覽列都列出頁面", classical.length > 30 && taiwan.length > 12, `古典 ${classical.length}、台灣 ${taiwan.length}`);

  const blank = [], literal = [];
  for (const v of views) {
    await p.goto(U + v);
    const has = await p.waitForSelector("#content .card", { timeout: 4000 }).then(() => true).catch(() => false);
    if (!has) { blank.push(v); continue; }
    // 資料裡的 <b> 被跳脫成字面文字時，畫面上會直接看到 "<b>"
    if (await p.evaluate(() => /<\/?(b|i|br|code|span|div)>/i.test(document.querySelector("#content").innerText))) literal.push(v);
  }
  ok(`全部 ${views.length} 個檢視都有內容`, !blank.length, blank.join(" "));
  ok("沒有任何頁面把 HTML 標籤當成文字顯示出來", !literal.length, literal.join(" "));
  ok("瀏覽全部頁面時沒有任何程式錯誤", !p.errors.length, p.errors.slice(0, 3).join(" | "));

  const m = await page({ mobile: true });
  const over = [];
  for (const v of views) {
    await m.goto(U + v); await m.waitForSelector("#content .card");
    const o = await m.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    if (o > 1) over.push(`${v}:${o}px`);
  }
  ok("手機（390px）上每一頁都不會左右晃", !over.length, over.slice(0, 5).join(" "));
  await p.context().close(); await m.context().close();
}

/* ---------- C. 曲目卡片：簡單版先、細節點開 ---------- */
group("曲目卡片");
{
  const p = await page();
  await go(p, "#week-1");
  await p.click(".work .ttl"); await p.waitForTimeout(150);
  const card = await p.evaluate(() => {
    const w = document.querySelector(".work.open") || document.querySelector(".work");
    const vis = (e) => e.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true });
    let chars = 0;
    const tw = document.createTreeWalker(w.querySelector(".workbd") || w, NodeFilter.SHOW_TEXT);
    while (tw.nextNode()) if (vis(tw.currentNode.parentElement)) chars += tw.currentNode.textContent.replace(/\s+/g, "").length;
    return {
      top: w.querySelectorAll(".vlist.top > li").length,
      plays: [...w.querySelectorAll("a.play")].filter(vis).length,
      folds: [...w.querySelectorAll(":scope .workbd > details.fold > summary")].map((s) => s.innerText.replace(/\s+/g, " ").trim()),
      open: w.querySelectorAll(".workbd > details.fold[open]").length,
      vmore: w.querySelectorAll("details.vmore [data-copy]").length,
      chars
    };
  });
  ok("展開曲目後只看到一個建議首選版本", card.top === 1, card.top);
  ok("預設可見的播放按鈕只有兩個（KKBOX＋YouTube）", card.plays === 2, card.plays);
  ok("任務、背景、其他版本、對照表四個摺疊列都在", card.folds.length >= 4, card.folds.join(" / "));
  ok("摺疊列預設全部收起", card.open === 0, card.open);
  ok("任務摺疊列直接寫出還剩幾項", /還有 \d+ 項/.test(card.folds[0] || ""), card.folds[0]);
  ok("展開一首曲目時畫面上的字 ≤ 320 字", card.chars <= 320, card.chars + " 字");
  ok("搜尋字串與複製按鈕降級到 ⋯ 裡，但沒有消失", card.vmore > 0, card.vmore);

  const sumAfter = async () => p.$eval(".work .workbd > details.f-task > summary", (s) => s.innerText.replace(/\s+/g, " "));
  await p.$$eval(".work .workbd > details.f-task input[type=checkbox]", (bs) => bs.forEach((b) => { if (!b.checked) b.click(); }));
  ok("勾完全部任務後，摺疊列變成「已完成」", /已完成/.test(await sumAfter()), await sumAfter());
  await p.$$eval(".work .workbd > details.f-task input[type=checkbox]", (bs) => bs[0].click());
  ok("取消勾選後恢復「還有 N 項」", /還有 1 項/.test(await sumAfter()), await sumAfter());
  ok("在曲目卡片上勾的任務，與本週任務總覽同步", await p.evaluate(() => {
    const k = document.querySelector(".work .workbd > details.f-task input[data-task]:checked").getAttribute("data-task");
    return [...document.querySelectorAll(`input[data-task="${k}"]`)].every((x) => x.checked);
  }));

  await go(p, "");
  const tw = await p.evaluate(() => {
    const c = document.querySelector(".thisweek");
    const vis = (e) => e.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true });
    let chars = 0;
    const w = document.createTreeWalker(c, NodeFilter.SHOW_TEXT);
    while (w.nextNode()) if (vis(w.currentNode.parentElement)) chars += w.currentNode.textContent.replace(/\s+/g, "").length;
    const f = c.querySelector("details.f-task");
    return { fold: !!f, open: f && f.open, sum: f && f.querySelector("summary").innerText, plays: [...c.querySelectorAll("a.play")].filter(vis).length, chars };
  });
  ok("首頁「本週」卡片的任務也收成摺疊列，預設收起", tw.fold && !tw.open);
  ok("「本週」卡片摺疊列寫出還剩幾項", /還有 1 項/.test(tw.sum || ""), tw.sum);
  ok("「本週」卡片有兩個播放按鈕、字數 ≤ 200", tw.plays === 2 && tw.chars <= 200, `${tw.plays} 個、${tw.chars} 字`);
  await p.context().close();
}

/* ---------- D. 參考頁 ---------- */
group("參考頁");
{
  const p = await page({ mobile: true });
  for (const [h, n] of [["#taiwan/p-search", 9], ["#taiwan/p-cross", 6], ["#taiwan/p-manner", 5], ["#p-kkbox", 4], ["#p-inst", 5]]) {
    await go(p, h);
    const c = await p.$$eval("#content details.fold", (d) => d.length);
    ok(`${h} 有 ${n} 個以上的摺疊列`, c >= n, c);
  }
  await go(p, "#p-orch");
  const orch = await p.evaluate(() => ({
    families: [...document.querySelectorAll("#p-orch > .fold > summary")].map((s) => s.innerText),
    shown: [...document.querySelectorAll("#p-orch .instrow")].filter((e) => e.checkVisibility({ checkVisibilityCSS: true })).length,
    h: document.body.scrollHeight
  }));
  ok("樂器圖鑑：摘要列寫出組內樂器名，可以當目錄用", /小提琴、中提琴、大提琴、低音提琴/.test(orch.families[0] || ""), orch.families[0]);
  ok("樂器圖鑑：收起時看不到任何樂器說明，整頁 < 2000px", orch.shown === 0 && orch.h < 2000, `${orch.shown} 列、${orch.h}px`);
  await p.evaluate(() => { document.querySelector("#p-orch > .fold").open = true; });
  await p.waitForTimeout(100);
  ok("樂器圖鑑：點開弦樂後出現四件樂器各三列說明", await p.evaluate(() =>
    [...document.querySelectorAll("#p-orch .instrow")].filter((e) => e.checkVisibility({ checkVisibilityCSS: true })).length === 12));
  ok("樂器圖鑑：說明列沒有被另一頁的樣式加上邊框（類名衝突）", await p.evaluate(() =>
    getComputedStyle(document.querySelector("#p-orch .instcard .instrow")).borderTopWidth === "0px"));
  await go(p, "#taiwan/p-inst");
  ok("樂器辨識：七件樂器各自收合，線稿留在外面當索引", await p.evaluate(() =>
    document.querySelectorAll("#p-inst .instfold").length === 7 &&
    [...document.querySelectorAll("#p-inst .instfold > summary .instfig")].every((e) => e.checkVisibility())));
  await go(p, "#taiwan/unit-8");
  ok("單元 8 的「沒有涵蓋的東西」收起來了", await p.evaluate(() =>
    [...document.querySelectorAll("details.fold")].some((f) => /沒有涵蓋/.test(f.querySelector("summary").innerText) && !f.open)));
  await p.context().close();
}

/* ---------- E. 網址與上一頁 ---------- */
group("網址與上一頁");
{
  const p = await page();
  const h2s = () => p.$$eval("#content .card h2", (h) => h.map((x) => x.textContent).join(" ／ "));
  for (const [h, want] of [["#taiwan/p-inst", "樂器辨識"], ["#p-inst", "樂器的演變"], ["#taiwan", "台灣傳統音樂聆聽課程"], ["#p-inst", "樂器的演變"]]) {
    await go(p, h);
    ok(`兩門課同名的頁面切換正確：${h}`, (await h2s()).includes(want), (await h2s()).slice(0, 30));
  }
  // 直接從台灣課的網址開啟，再換到古典課的同名頁（啟動時沒記錄所屬課程會失敗）
  const q = await page();
  await go(q, "#taiwan/p-inst");
  await q.evaluate(() => { location.hash = "#p-inst"; }); await q.waitForTimeout(250);
  ok("從台灣課網址直接開啟後，換到古典課同名頁會重新顯示", (await q.$eval("#content .card h2", (e) => e.textContent)).includes("樂器的演變"));
  await go(p, "#no-such-page");
  ok("不存在的網址回到首頁，不會白畫面", await p.$$eval(".thisweek", (x) => x.length === 1));
  await go(p, "#week-3"); await go(p, "#week-7");
  await p.goBack(); await p.waitForTimeout(250);
  ok("瀏覽器的「上一頁」回到前一週", (await p.$eval("#content .card h2", (e) => e.textContent)).includes("第 3 週"));
  await p.context().close(); await q.context().close();
}

/* ---------- F. 字級 ---------- */
group("字級");
{
  const STEPS = [[1, "15.5px"], [1.15, "17.825px"], [1.3, "20.15px"], [1.5, "23.25px"], [1.75, "27.125px"]];
  for (const [f, want] of STEPS) {
    const p = await page({ state: { fs: f } });
    await go(p, "");
    const got = await p.evaluate(() => getComputedStyle(document.body).fontSize);
    ok(`字級 ×${f}：內文 ${want}`, got === want, got);
    await p.context().close();
  }
  const bad = [];
  for (const w of [320, 390]) for (const [f] of STEPS) {
    const p = await page({ mobile: true, width: w, state: { fs: f } });
    for (const v of ["", "#week-1", "#p-orch", "#taiwan/unit-1", "#p-glossary"]) {
      await go(p, v);
      const o = await p.evaluate(() => {
        const de = document.documentElement;
        const wide = [...document.querySelectorAll("body *")].filter((e) => {
          if (e.closest(".tw,.drawer,.scrim,.side,.skip")) return false;
          const b = e.getBoundingClientRect();
          return b.width > 0 && b.right > de.clientWidth + 1;
        }).length;
        return de.scrollWidth - de.clientWidth + wide;
      });
      if (o > 1) bad.push(`${w}px×${f}${v}`);
    }
    await p.context().close();
  }
  ok("五個字級在 320／390px 手機上都不會撐破版面", !bad.length, bad.slice(0, 5).join(" "));

  const p = await page({ mobile: true, state: { fs: 1.3 } });
  await go(p, "");
  await p.click("#setBtn"); await p.waitForTimeout(300);
  const s = await p.evaluate(() => ({
    n: document.querySelectorAll(".fsbtn").length,
    first: document.querySelector("#drawer h3").textContent.trim(),
    on: (document.querySelector(".fsbtn.on") || {}).textContent,
    tall: [...document.querySelectorAll(".fsbtn")].every((e) => e.getBoundingClientRect().height >= 48)
  }));
  ok("設定面板第一項就是字級，五顆按鈕", s.n === 5 && s.first === "字級", `${s.first}／${s.n}`);
  ok("目前的字級有標記出來", (s.on || "").trim() === "特大", s.on);
  ok("字級按鈕觸控範圍 ≥ 48px", s.tall);
  await p.click('.fsbtn[data-fs="1.75"]'); await p.waitForTimeout(150);
  ok("按下去立刻生效", (await p.evaluate(() => getComputedStyle(document.body).fontSize)) === "27.125px");
  await p.reload(); await p.waitForSelector(".card");
  ok("重新整理後字級還在", (await p.evaluate(() => getComputedStyle(document.body).fontSize)) === "27.125px");
  await p.context().close();
}

/* ---------- G. 鍵盤與觸控 ---------- */
group("鍵盤與觸控");
{
  const p = await page();
  await go(p, "");
  await p.keyboard.press("Tab");
  ok("第一下 Tab 出現「跳到主內容」", (await p.evaluate(() => document.activeElement.textContent)) === "跳到主內容");
  await p.keyboard.press("Enter"); await p.waitForTimeout(150);
  const after = await p.evaluate(() => ({ id: document.activeElement.id, hash: location.hash, home: !!document.querySelector(".thisweek") }));
  ok("按下去焦點移到主內容，而且不會被當成換頁", after.id === "content" && after.hash === "" && after.home, JSON.stringify(after));
  await go(p, "#week-2");
  // 從頁首一路按 Tab，看會不會停在摺疊列上（而不是被跳過）
  let reached = false;
  for (let i = 0; i < 60 && !reached; i++) {
    await p.keyboard.press("Tab");
    reached = await p.evaluate(() => document.activeElement.tagName === "SUMMARY" && !!document.activeElement.closest("#content"));
  }
  ok("摺疊列可以用鍵盤 Tab 到", reached);
  const before = await p.evaluate(() => document.activeElement.parentElement.open);
  await p.keyboard.press("Enter"); await p.waitForTimeout(100);
  ok("按 Enter 可以展開／收起摺疊列", (await p.evaluate(() => document.activeElement.parentElement.open)) !== before);
  await p.context().close();

  const m = await page({ mobile: true });
  const small = [];
  for (const v of ["#week-1", "#taiwan/unit-1", "#taiwan/p-search", "#p-orch"]) {
    await go(m, v);
    const n = await m.evaluate(() => [...document.querySelectorAll("details.fold > summary")]
      .filter((e) => { const h = e.getBoundingClientRect().height; return h > 0 && h < 40; }).length);
    if (n) small.push(`${v}:${n}`);
  }
  ok("手機上每一條摺疊列的觸控高度都 ≥ 40px", !small.length, small.join(" "));
  await m.context().close();
}

/* ---------- H. 加到主畫面 ---------- */
group("加到主畫面");
{
  const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  const mHref = (html.match(/<link rel="manifest" href="([^"]+)"/) || [])[1];
  ok("index.html 有 manifest", !!mHref);
  let man = {};
  try { man = JSON.parse(fs.readFileSync(path.join(ROOT, mHref), "utf8")); ok("manifest 是合法的 JSON", true); }
  catch (e) { ok("manifest 是合法的 JSON", false, e.message); }
  ok("manifest 有名稱、主畫面上的短名稱、獨立視窗模式", man.name && man.short_name && man.display === "standalone" && man.start_url,
    `${man.short_name}／${man.display}`);
  ok("主畫面上的名字夠短，不會被截斷（≤ 6 個字）", [...(man.short_name || "")].length <= 6, man.short_name);
  const png = (f) => { const b = fs.readFileSync(path.join(ROOT, f)); return b.slice(1, 4).toString() === "PNG" ? [b.readUInt32BE(16), b.readUInt32BE(20)] : null; };
  const icons = man.icons || [];
  const badIcons = icons.filter((i) => {
    if (!fs.existsSync(path.join(ROOT, i.src))) return true;
    if (i.type !== "image/png") return false;
    const d = png(i.src); return !d || `${d[0]}x${d[1]}` !== i.sizes;
  }).map((i) => i.src);
  ok("manifest 列的每個圖示都存在、尺寸與宣告相符", icons.length && !badIcons.length, badIcons.join(" "));
  ok("有 192 與 512 兩種尺寸，以及 Android 自適應用的 maskable 版", ["192x192", "512x512"].every((s) => icons.some((i) => i.sizes === s)) &&
    icons.some((i) => /maskable/.test(i.purpose || "")));
  const apple = (html.match(/<link rel="apple-touch-icon" href="([^"]+)"/) || [])[1];
  ok("iPhone 主畫面圖示 180×180", apple && JSON.stringify(png(apple)) === "[180,180]", apple && JSON.stringify(png(apple)));
  ok("瀏覽器分頁上有網站圖示", /<link rel="icon" href="[^"]+\.svg"/.test(html) && fs.existsSync(path.join(ROOT, "assets/icons/icon.svg")));
  ok("有 theme-color（手機網址列跟著變色）", /<meta name="theme-color" content="#[0-9a-f]{6}">/i.test(html));

  // 離線：需要真的讓 service worker 跑起來
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true });
  const p = await ctx.newPage();
  const errs = []; p.on("pageerror", (e) => errs.push(e.message));
  await p.goto(U); await p.waitForSelector(".card");
  const reg = await p.evaluate(() => navigator.serviceWorker.ready.then(() => true));
  await p.reload(); await p.waitForSelector(".card");
  ok("離線快取有註冊，並接管了頁面", reg && (await p.evaluate(() => !!navigator.serviceWorker.controller)));
  await ctx.setOffline(true);
  const off = [];
  // 每次換一個 ?n= 讓瀏覽器真的重新載入文件，而不是只換 # 後面那段
  for (const [i, v] of ["", "#week-8", "#taiwan/unit-3", "#p-orch"].entries()) {
    await p.goto(U + "?n=" + i + v).catch(() => {});
    if (!(await p.waitForSelector("#content .card", { timeout: 6000 }).then(() => true).catch(() => false))) off.push(v || "首頁");
  }
  ok("斷網時首頁、週次、台灣課、參考頁都打得開", !off.length, off.join(" "));
  const hasStyle = await p.evaluate(() => getComputedStyle(document.body).fontFamily.includes("Noto Sans TC"));
  ok("斷網時樣式也在（不是一片沒排版的白底黑字）", hasStyle);
  ok("斷網瀏覽時沒有程式錯誤", !errs.length, errs.slice(0, 2).join(" | "));
  await ctx.close();

  const kinds = [
    ["iphone", { userAgent: UA.iphone }, /分享按鈕[\s\S]*加入主畫面/],
    ["android", { userAgent: UA.android }, /⋮[\s\S]*加到主畫面/],
    ["電腦", {}, null]
  ];
  for (const [label, ctxo, re] of kinds) {
    const q = await page({ mobile: label !== "電腦", ctx: ctxo });
    await go(q, "");
    await q.click('.devhelp [data-open="install"]'); await q.waitForTimeout(200);
    const t = await q.$eval("#drawer", (d) => ({ text: d.innerText, qr: d.querySelectorAll(".qr svg").length }));
    if (re) ok(`${label}：照該平台的步驟一步一步教`, re.test(t.text), t.text.slice(0, 80).replace(/\n/g, " "));
    else ok("電腦：給一個 QR code，用手機掃了直接開", t.qr === 1);
    await q.context().close();
  }
  const st = await page({ mobile: true });
  await st.context().addInitScript(() => {
    const mm = window.matchMedia.bind(window);
    window.matchMedia = (q) => (/display-mode: standalone/.test(q) ? { matches: true, media: q, addListener() {}, addEventListener() {} } : mm(q));
  });
  await go(st, "");
  ok("已經從主畫面打開時，不再顯示「加到主畫面」按鈕", !(await st.$('.devhelp [data-open="install"]')));
  await st.context().close();
}

/* ---------- I. 分享預覽 ---------- */
group("LINE／Facebook 分享預覽");
{
  const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  const meta = (prop) => (html.match(new RegExp(`<meta (?:property|name)="${prop}" content="([^"]*)"`)) || [])[1];
  ok("有分享標題與描述", meta("og:title") && meta("og:description"), meta("og:title"));
  const img = meta("og:image") || "";
  ok("預覽圖是完整網址（LINE 不吃相對路徑）", /^https:\/\/.+\/assets\/og-image\.png$/.test(img), img);
  const local = path.join(ROOT, "assets/og-image.png");
  const d = fs.existsSync(local) ? fs.readFileSync(local) : null;
  ok("預覽圖檔案存在，尺寸 1200×630", d && d.readUInt32BE(16) === 1200 && d.readUInt32BE(20) === 630);
  ok("og:url 與預覽圖在同一個網站底下", meta("og:url") && img.startsWith(meta("og:url")), meta("og:url"));
  ok("宣告大圖卡片樣式", meta("twitter:card") === "summary_large_image");
  ok("搬家連結用的正式網址與 og:url 一致", (fs.readFileSync(path.join(ROOT, "assets/app.js"), "utf8")
    .match(/var SITE_URL = "([^"]+)"/) || [])[1] === meta("og:url"));
}

/* ---------- J. 搬到另一台裝置 ---------- */
group("搬到另一台裝置");
{
  const A = { done: { 1: true, 2: true, "taiwan:1": true }, tasks: { "1:0": true, "1:2": true, "3:1": true, "taiwan:2:0": true },
    checks: { "1:0": true }, fav: { "britten-guide": true }, links: { "Britten Young Person's Guide Rattle": "https://www.kkbox.com/tw/tc/album/TEST" }, fs: 1.3, theme: "dark" };
  const a = await page({ mobile: true, state: A });
  await go(a, "");
  await a.click('.devhelp [data-open="sync"]'); await a.waitForTimeout(200);
  const out = await a.evaluate(() => ({
    url: (document.querySelector("#syncUrl") || {}).value || "",
    qr: document.querySelectorAll("#drawer .qr svg").length,
    sum: (document.querySelector("#drawer .sumlist") || {}).innerText || ""
  }));
  ok("產生搬家連結與 QR code", out.url.includes("?sync=") && out.qr === 1, out.url.length + " 字元");
  ok("畫面寫出連結裡有哪些進度", /古典音樂.*完成 2 週.*任務 3 項/.test(out.sum.replace(/\n/g, " ")) && /台灣傳統音樂/.test(out.sum) && /重聽區/.test(out.sum),
    out.sum.replace(/\n/g, " | "));

  const B = { done: { 5: true }, tasks: { "9:1": true, "1:0": true }, fav: {}, links: {}, fs: 1, theme: "light" };
  const b = await page({ mobile: true, state: B });
  await go(b, "#taiwan");
  await b.goto(out.url.replace(/^https?:\/\/[^/]+\/(classical-music\/)?/, U));
  await b.waitForSelector(".card"); await b.waitForTimeout(200);
  ok("另一台裝置打開連結時，先問要不要合併", (await b.$eval("#drawer", (d) => d.getAttribute("data-which") + (d.classList.contains("open") ? "+open" : ""))) === "syncin+open");
  ok("網址列上的搬家資料隨即拿掉（重新整理不會再問一次）", !(await b.evaluate(() => location.search)));
  await b.click("#syncMerge"); await b.waitForTimeout(200);
  const s = await b.evaluate(() => JSON.parse(localStorage.getItem("cmc.v1")));
  ok("合併後兩邊的完成週次都在", ["1", "2", "5", "taiwan:1"].every((k) => s.done[k]), Object.keys(s.done).join(","));
  ok("合併後兩邊勾過的任務都在，沒有重複", ["1:0", "1:2", "3:1", "9:1", "taiwan:2:0"].every((k) => s.tasks[k]) && Object.keys(s.tasks).length === 5,
    Object.keys(s.tasks).join(","));
  ok("★ 重聽區與釘選連結也搬過來了", s.fav["britten-guide"] && Object.keys(s.links).length === 1);
  ok("字級、主題是這台裝置自己的，不被覆蓋", s.fs === 1 && s.theme === "light", `fs=${s.fs} theme=${s.theme}`);
  ok("合併後畫面告訴你新增了幾項", /已合併，新增 \d+ 項/.test(await b.$eval("#toast", (t) => t.textContent)), await b.$eval("#toast", (t) => t.textContent));

  const c = await page({ mobile: true, state: { done: { 7: true } } });
  await c.goto(U + "?sync=abc-not-valid#week-2"); await c.waitForSelector(".card"); await c.waitForTimeout(150);
  ok("壞掉的連結：說明原因與解法，不會當掉", /讀不出來[\s\S]*重新產生/.test(await c.$eval("#drawer", (d) => d.innerText)) && !c.errors.length);
  ok("壞掉的連結：原本的進度完全沒動", await c.evaluate(() => JSON.stringify(JSON.parse(localStorage.getItem("cmc.v1")).done) === '{"7":true}'));
  await c.goto(out.url.replace(/^https?:\/\/[^/]+\/(classical-music\/)?/, U)); await c.waitForSelector(".card"); await c.waitForTimeout(150);
  await c.click("#syncSkip"); await c.waitForTimeout(100);
  ok("按「不要」就什麼都不改", await c.evaluate(() => Object.keys(JSON.parse(localStorage.getItem("cmc.v1")).done).join() === "7"));

  const e = await page({ mobile: true });
  await go(e, "");
  await e.click('.devhelp [data-open="sync"]'); await e.waitForTimeout(150);
  ok("還沒有進度時，直接告訴你沒有東西可以搬", /還沒有任何進度/.test(await e.$eval("#drawer", (d) => d.innerText)));

  // 最壞情況：兩門課全部勾完、全部收藏。QR code 要還能畫得出來
  await e.evaluate(() => {
    const s = { done: {}, tasks: {}, checks: {}, fav: {}, links: {} };
    for (const id of Object.keys(window.COURSES)) {
      const C = window.COURSES[id], pre = id === "classical" ? "" : id + ":";
      C.weeks.forEach((w) => {
        s.done[pre + w.n] = true;
        (w.tasks || []).forEach((_, i) => { s.tasks[pre + w.n + ":" + i] = true; });
        (w.checks || []).forEach((_, i) => { s.checks[pre + w.n + ":" + i] = true; });
      });
      Object.keys(C.works).slice(0, 20).forEach((k) => { s.fav[k] = true; });
    }
    localStorage.setItem("cmc.v1", JSON.stringify(s));
  });
  await e.reload(); await e.waitForSelector(".card");
  await e.click('.devhelp [data-open="sync"]'); await e.waitForTimeout(200);
  const full = await e.evaluate(() => ({ len: document.querySelector("#syncUrl").value.length, qr: document.querySelectorAll("#drawer .qr svg").length }));
  ok("兩門課全部完成＋40 首收藏，連結仍 < 1600 字元、QR code 畫得出來", full.len < 1600 && full.qr === 1, full.len + " 字元");
  for (const x of [a, b, c, e]) await x.context().close();
}

/* ---------- J2. 作答欄 ---------- */
group("作答欄");
{
  const p = await page({ mobile: true });
  await go(p, "#week-1");
  ok("第 1 週兩項要作答的任務都有作答欄（曲目卡片與本週總覽各一份）", await p.$$eval(".askbox", (b) => b.length) === 4);
  ok("還沒寫時，按鈕上直接寫出要寫什麼", /寫下答案[\s\S]*依出場順序/.test(await p.$eval('.askbox[data-ask="1:0"]', (b) => b.innerText)));
  ok("不需要作答的任務沒有作答欄", !(await p.$('.askbox[data-ask="1:2"]')));

  await p.click(".work .ttl"); await p.waitForTimeout(100);
  await p.evaluate(() => { document.querySelector(".work details.ans").open = true; });
  ok("還沒寫就打開對照表：最上面先提醒「先寫再看」", /先寫再看/.test(await p.$eval(".work .yours", (y) => y.innerText)));
  await p.click(".work .yours [data-askgo]"); await p.waitForTimeout(150);
  const st = await p.evaluate(() => ({
    ans: document.querySelector(".work details.ans").open,
    task: document.querySelector(".work details.f-task").open,
    focus: document.activeElement.getAttribute("data-askta")
  }));
  ok("按「先寫下來」：對照表收起、任務展開、游標直接在輸入框裡", !st.ans && st.task && st.focus === "1:0", JSON.stringify(st));
  await p.keyboard.type("弦、木管\n銅管");
  await p.waitForTimeout(500);
  const saved = await p.evaluate(() => JSON.parse(localStorage.getItem("cmc.v1")).answers);
  ok("邊打邊存（不用按儲存）", saved && saved["1:0"] === "弦、木管\n銅管", JSON.stringify(saved));
  ok("同一項任務在本週總覽裡的那一份同步更新", /弦、木管[\s\S]*銅管/.test(await p.evaluate(() =>
    [...document.querySelectorAll('.askbox[data-ask="1:0"]')].filter((b) => !b.classList.contains("editing")).map((b) => b.innerText).join(""))));
  await p.click('.work [data-askdone="1:0"]'); await p.waitForTimeout(100);
  await p.evaluate(() => { document.querySelector(".work details.ans").open = true; });
  const y = await p.evaluate(() => {
    const body = document.querySelector(".work details.ans .foldbd");
    return { text: body.querySelector(".yours").innerText, first: body.firstElementChild.className };
  });
  ok("打開對照表：你寫的答案在最上面，緊接著才是標準答案", y.first === "yours" && /你寫的答案[\s\S]*弦、木管[\s\S]*銅管/.test(y.text), y.text.replace(/\n/g, " | "));
  await p.reload(); await p.waitForSelector(".card");
  ok("重新整理後答案還在", /弦、木管/.test(await p.$eval('.askbox[data-ask="1:0"]', (b) => b.innerText)));

  // 版面：任務列的「必做」標籤與劃線不能波及作答欄
  await p.evaluate(() => localStorage.setItem("cmc.v1", JSON.stringify({ tasks: { "1:0": true }, checks: { "1:0": true }, answers: { "1:0": "弦" } })));
  await p.reload(); await p.waitForSelector(".card");
  const look = await p.evaluate(() => {
    const deco = (e) => getComputedStyle(e).textDecorationLine;
    return {
      badges: [...document.querySelectorAll(".askbox span")].filter((e) => getComputedStyle(e, "::before").content.includes("必做")).length,
      struck: [...document.querySelectorAll(".chk li.dn .askbox *")].filter((e) => deco(e).includes("line-through")).length,
      task: deco(document.querySelector(".chk li.dn > label > span")),
      check: deco(document.querySelector(".chk li.dn > span"))
    };
  });
  ok("「必做」標籤只出現在任務文字上，不會蓋到作答欄裡", look.badges === 0, look.badges);
  ok("勾完任務時任務文字劃掉，但你寫的答案不會被劃掉", look.task === "line-through" && look.struck === 0, JSON.stringify(look));
  ok("自我檢核勾完時一樣會劃掉", look.check === "line-through");

  // 切到 KKBOX／YouTube（頁面進背景）時，還在等待中的內容要立刻存
  // 用本週總覽裡那一份（曲目卡片裡的那份在收起的摺疊列中，看不到也點不到）
  const box = p.locator('.askbox[data-ask="1:0"]').last();
  await box.locator("[data-askedit]").click();
  await box.locator(".askta").fill("剛打完還沒停");
  await p.evaluate(() => window.dispatchEvent(new Event("pagehide")));
  ok("頁面進背景的瞬間就存好，不必等", (await p.evaluate(() => JSON.parse(localStorage.getItem("cmc.v1")).answers["1:0"])) === "剛打完還沒停");
  await box.locator(".askta").fill("   ");
  await p.waitForTimeout(500);
  ok("清空內容等於刪掉這則答案", !(await p.evaluate(() => "1:0" in JSON.parse(localStorage.getItem("cmc.v1")).answers)));

  // 搬家連結是別人傳來的資料：答案內容必須一律當文字顯示，不能變成網頁元素
  const evil = '<img src=x onerror="window.__pwned=1"><b>粗體</b>';
  await p.evaluate((v) => localStorage.setItem("cmc.v1", JSON.stringify({ answers: { "1:0": v } })), evil);
  await p.reload(); await p.waitForSelector(".card");
  await p.click(".work .ttl");
  await p.evaluate(() => { document.querySelector(".work details.ans").open = true; });
  await p.waitForTimeout(150);
  const safe = await p.evaluate(() => ({
    pwned: !!window.__pwned,
    imgs: document.querySelectorAll(".askbox img, .yours img").length,
    shown: document.querySelector(".yours .yqa").textContent
  }));
  ok("答案裡的 HTML 原樣顯示成文字，不會被執行", !safe.pwned && safe.imgs === 0 && safe.shown.includes("<img"), JSON.stringify(safe));

  // 每一筆作答設定都真的出現在畫面上（不會掛在一個不存在或不顯示的任務底下）
  const asks = await p.evaluate(() => window.ASKS);
  const missing = [];
  for (const [cid, map] of Object.entries(asks)) {
    for (const key of Object.keys(map)) {
      const [n] = key.split(":");
      const hash = cid === "classical" ? `#week-${n}` : `#taiwan/unit-${n}`;
      const full = (cid === "classical" ? "" : cid + ":") + key;
      await p.goto(U + hash); await p.waitForSelector("#content .card");
      if (!(await p.$(`.askbox[data-ask="${full}"]`))) missing.push(cid + " " + key);
    }
  }
  const total = Object.values(asks).reduce((a, m) => a + Object.keys(m).length, 0);
  ok(`全部 ${total} 個作答欄都出現在對應的${"週次／單元"}裡`, !missing.length, missing.join(" "));

  await p.emulateMedia({ media: "print" });
  await p.evaluate(() => localStorage.setItem("cmc.v1", "{}"));
  await go(p, "#week-1"); await p.reload(); await p.waitForSelector(".card");
  const pr = await p.evaluate(() => {
    const b = document.querySelector(".askbox.empty");
    return { btn: getComputedStyle(b.querySelector(".askbtn")).display, h: b.getBoundingClientRect().height };
  });
  ok("列印時沒寫過的作答欄變成幾條空白橫線，可以直接在紙上寫", pr.btn === "none" && pr.h > 40, JSON.stringify(pr));
  await p.context().close();

  // 搬家：答案跟著搬；兩邊都寫過不同內容時兩份都留
  const a = await page({ mobile: true, state: { answers: { "1:0": "A 寫的", "3:0": "主題 6 次" }, done: { 1: true } } });
  await go(a, "");
  await a.click('.devhelp [data-open="sync"]'); await a.waitForTimeout(150);
  const link = await a.$eval("#syncUrl", (e) => e.value);
  ok("搬家內容列出寫下的答案", /寫下的答案\s*2 則/.test(await a.$eval("#drawer .sumlist", (e) => e.innerText)));
  const b2 = await page({ mobile: true, state: { answers: { "1:0": "B 寫的" } } });
  await go(b2, "");
  await b2.goto(link.replace(/^https?:\/\/[^/]+\/(classical-music\/)?/, U)); await b2.waitForSelector(".card"); await b2.waitForTimeout(150);
  await b2.click("#syncMerge"); await b2.waitForTimeout(150);
  const merged = await b2.evaluate(() => JSON.parse(localStorage.getItem("cmc.v1")).answers);
  ok("另一台沒寫過的答案直接搬過來", merged["3:0"] === "主題 6 次");
  ok("兩邊都寫過不一樣的內容：兩份都留下，不替你決定哪份算數", /B 寫的[\s\S]*另一台裝置[\s\S]*A 寫的/.test(merged["1:0"] || ""), merged["1:0"]);

  const long = {};
  for (let i = 0; i < 3; i++) long[`${[1, 3, 8][i]}:0`] = "這段答案寫得很長".repeat(40);
  const c2 = await page({ mobile: true, state: { answers: long } });
  await go(c2, "");
  await c2.click('.devhelp [data-open="sync"]'); await c2.waitForTimeout(150);
  const big = await c2.evaluate(() => ({ qr: document.querySelectorAll("#drawer .qr").length, msg: /QR code 放不下/.test(document.querySelector("#drawer").innerText), url: document.querySelector("#syncUrl").value.length }));
  ok("答案寫很多、QR code 放不下時，改說明用傳送或複製", big.qr === 0 && big.msg, JSON.stringify(big));
  for (const x of [a, b2, c2]) await x.context().close();
}

/* ---------- K. 單一檔案版 ---------- */
group("單一檔案版（dist/）");
{
  const p = await page({ state: { done: { 1: true } } });
  const go2dist = async (q, h = "") => { await q.goto("file://" + path.join(ROOT, "dist/index.html") + h); await q.waitForSelector("#content .card", { timeout: 4000 }); };
  await p.goto("file://" + path.join(ROOT, "dist/index.html") + "#week-4");
  const shown = await p.waitForSelector("#content .card", { timeout: 4000 }).then(() => true).catch(() => false);
  ok("dist/index.html 直接點兩下就能開", shown);
  ok("單一檔案版沒有程式錯誤", !p.errors.length, p.errors.slice(0, 2).join(" | "));
  const d = fs.readFileSync(path.join(ROOT, "dist/index.html"), "utf8");
  ok("單一檔案版拿掉了找不到的圖檔連結，網站圖示改為內嵌", !/<[^>]+\sdata-pwa>/.test(d) && /rel="icon" href="data:image\/svg\+xml,/.test(d));
  await go2dist(p);
  await p.click('.devhelp [data-open="sync"]'); await p.waitForTimeout(150);
  ok("從單一檔案版產生的搬家連結指向正式網站（不是 file://）",
    (await p.$eval("#syncUrl", (e) => e.value)).startsWith("https://erich0793.github.io/classical-music/?sync="));
  await p.context().close();
}

await browser.close();
server.close();

/* ---------- 報告 ---------- */
let cur = "";
for (const r of results) {
  if (r.section !== cur) { cur = r.section; console.log("\n" + cur); }
  console.log(`  ${r.pass ? "✓" : "✗"} ${r.name}${r.detail && (!r.pass || process.env.VERBOSE) ? "  — " + r.detail : ""}`);
}
const fail = results.filter((r) => !r.pass);
console.log(`\n${results.length - fail.length} / ${results.length} 通過` + (fail.length ? `，${fail.length} 項失敗` : ""));
process.exit(fail.length ? 1 : 0);
