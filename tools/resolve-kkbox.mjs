#!/usr/bin/env node
/**
 * 用 KKBOX Open API 把每個版本的搜尋字串解析成帶專輯 ID 的正式網址。
 *
 * 產出的網址（https://www.kkbox.com/{terr}/{lang}/album/{id}）帶有專輯 ID，
 * 手機上點擊會由 Universal Link 直接開啟 KKBOX App，不再經過搜尋頁。
 *
 * ── 為什麼需要這支腳本 ──────────────────────────────────────
 * 網站目前的連結是「搜尋連結」，只帶關鍵字、不帶 ID，因此無法直接開 App。
 * KKBOX 沒有公開的免驗證搜尋介面，必須用 Open API + client credentials。
 *
 * ── 事前準備 ────────────────────────────────────────────────
 * 1. 到 https://developer.kkbox.com/ 註冊並建立一個 App，取得
 *    client_id 與 client_secret（免費）。
 * 2. 設定環境變數後執行：
 *
 *      export KKBOX_CLIENT_ID=xxxx
 *      export KKBOX_CLIENT_SECRET=yyyy
 *      node tools/resolve-kkbox.mjs --dry-run     # 先看結果，不寫檔
 *      node tools/resolve-kkbox.mjs               # 確認後正式寫入
 *
 * ── 輸出 ────────────────────────────────────────────────────
 *   assets/data-links.js          高信心的結果（直接被網站使用）
 *   tools/review-needed.json      低信心的結果 + 前三名候選，需人工挑選
 *
 * ── 選項 ────────────────────────────────────────────────────
 *   --dry-run          只印出結果，不寫任何檔案
 *   --limit=N          只處理前 N 筆（試跑用）
 *   --only=關鍵字      只處理搜尋字串含此關鍵字者
 *   --territory=TW     KKBOX 地區代碼（預設 TW）
 *   --lang=tc          網址中的語言區段（預設 tc）
 *   --delay=350        每次 API 呼叫之間的間隔毫秒數
 *   --min-score=6      判定為「高信心」的分數門檻
 *   --refresh          重新解析已存在於 data-links.js 的項目
 *
 * Node 18+（使用內建 fetch）。無外部相依套件。
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const argv = process.argv.slice(2);
const flag = (name, dflt) => {
  const hit = argv.find((a) => a === `--${name}` || a.startsWith(`--${name}=`));
  if (!hit) return dflt;
  return hit.includes("=") ? hit.split("=").slice(1).join("=") : true;
};

const DRY = !!flag("dry-run", false);
const REFRESH = !!flag("refresh", false);
const LIMIT = Number(flag("limit", 0)) || 0;
const ONLY = flag("only", "");
const TERRITORY = String(flag("territory", "TW")).toUpperCase();
const LANG = String(flag("lang", "tc"));
const DELAY = Number(flag("delay", 350));
const MIN_SCORE = Number(flag("min-score", 6));

// 測試用：可覆寫端點，以便對本機 mock server 做端對端驗證
const TOKEN_URL = process.env.KKBOX_TOKEN_URL || "https://account.kkbox.com/oauth2/token";
const API_BASE = process.env.KKBOX_API_BASE || "https://api.kkbox.com";

const CLIENT_ID = process.env.KKBOX_CLIENT_ID;
const CLIENT_SECRET = process.env.KKBOX_CLIENT_SECRET;
if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("缺少憑證。請先設定：");
  console.error("  export KKBOX_CLIENT_ID=...");
  console.error("  export KKBOX_CLIENT_SECRET=...");
  console.error("憑證可於 https://developer.kkbox.com/ 免費申請。");
  process.exit(1);
}

/* ── 讀取曲目資料 ───────────────────────────────────────────── */
function loadData() {
  const win = {};
  for (const f of ["data-works-a.js", "data-works-b.js", "data-links.js"]) {
    const src = fs.readFileSync(path.join(ROOT, "assets", f), "utf8");
    new Function("window", src)(win);
  }
  return { WORKS: win.WORKS, PINNED: win.PINNED || {} };
}

/* ── OAuth2 client_credentials ──────────────────────────────
   契約取自 KKBOX 官方 Python SDK：
   https://github.com/KKBOX/OpenAPI-Python  kkbox_developer_sdk/auth_flow.py */
async function getToken() {
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  if (!res.ok) {
    throw new Error(`取得 access token 失敗 ${res.status}：${await res.text()}`);
  }
  const j = await res.json();
  if (!j.access_token) throw new Error("回應中沒有 access_token：" + JSON.stringify(j));
  return j.access_token;
}

/* ── 搜尋 ───────────────────────────────────────────────────
   GET https://api.kkbox.com/v1.1/search?q=&territory=&type=album */
async function search(token, q) {
  const url =
    API_BASE + "/v1.1/search?" +
    new URLSearchParams({ q, territory: TERRITORY, type: "album", limit: "20" });
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (res.status === 429) return { rateLimited: true, albums: [] };
  if (!res.ok) throw new Error(`搜尋失敗 ${res.status}（q="${q}"）：${await res.text()}`);
  const j = await res.json();
  return { albums: j?.albums?.data ?? [] };
}

/* ── 比對評分 ───────────────────────────────────────────────
   搜尋結果常有數十張專輯，必須判斷哪一張真的是我們要的版本。
   不做主觀判斷，只計算「搜尋字串中的詞有多少出現在專輯／演出者名稱裡」。
   分數低者不寫入，改列入待人工確認清單。 */
const fold = (s) =>
  (s || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

// 這些詞在古典曲目裡到處都是，命中不代表配對正確
const STOP = new Set(
  ("the a an of in and for no nos op symphony symphonies concerto concertos sonata sonatas " +
   "suite suites piece pieces music major minor flat sharp variations prelude preludes fugue " +
   "quartet quartets mass complete works vol volume").split(" ")
);

function scoreAlbum(query, album, version) {
  const albumText = fold(`${album.name} ${album.artist?.name || ""}`);
  const qTokens = fold(query).split(" ").filter((t) => t.length > 2 && !STOP.has(t));
  let hits = 0;
  for (const t of qTokens) if (albumText.includes(t)) hits++;

  let score = hits;
  // 演奏者是區分版本的關鍵，單獨加權
  const perfTokens = fold(version.p.split("（")[0].split("(")[0])
    .split(" ")
    .filter((t) => t.length > 3);
  const perfHit = perfTokens.some((t) => albumText.includes(t));
  if (perfHit) score += 4;
  // 廠牌相符是額外佐證
  if (version.l && fold(version.l).split(" ").some((t) => t.length > 2 && albumText.includes(t))) score += 1;

  return { score, hits, qTokens: qTokens.length, perfHit };
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* ── 主流程 ─────────────────────────────────────────────────── */
const { WORKS, PINNED } = loadData();

let targets = [];
for (const [id, w] of Object.entries(WORKS)) {
  for (const v of w.versions) {
    targets.push({ workId: id, work: w, version: v, q: v.q });
  }
}
// 同一個搜尋字串可能被多首曲目共用（例如同一張專輯），只需解析一次
targets = targets.filter((t, i, arr) => arr.findIndex((x) => x.q === t.q) === i);
if (!REFRESH) targets = targets.filter((t) => !PINNED[t.q]);
if (ONLY) targets = targets.filter((t) => t.q.toLowerCase().includes(String(ONLY).toLowerCase()));
if (LIMIT) targets = targets.slice(0, LIMIT);

console.log(`待解析 ${targets.length} 筆（已內建 ${Object.keys(PINNED).length} 筆${REFRESH ? "，本次一併重解析" : "，將略過"}）`);
if (!targets.length) { console.log("沒有需要處理的項目。"); process.exit(0); }

const token = await getToken();
console.log("已取得 access token\n");

const resolved = { ...PINNED };
const review = [];
let ok = 0, low = 0, none = 0;

for (let i = 0; i < targets.length; i++) {
  const t = targets[i];
  const tag = `[${String(i + 1).padStart(3)}/${targets.length}]`;
  let r;
  try {
    r = await search(token, t.q);
  } catch (e) {
    console.log(`${tag} ✗ ${t.q}\n        ${e.message}`);
    review.push({ q: t.q, work: t.work.title, performer: t.version.p, error: e.message, candidates: [] });
    await sleep(DELAY);
    continue;
  }
  if (r.rateLimited) {
    console.log(`${tag} … 觸發速率限制，等 10 秒後重試`);
    await sleep(10000); i--; continue;
  }

  const ranked = r.albums
    .map((a) => ({ album: a, ...scoreAlbum(t.q, a, t.version) }))
    .sort((x, y) => y.score - x.score);
  const best = ranked[0];
  const runnerUp = ranked[1];

  const cands = ranked.slice(0, 3).map((c) => ({
    score: c.score,
    name: c.album.name,
    artist: c.album.artist?.name,
    date: c.album.release_date,
    url: c.album.url || `https://www.kkbox.com/${TERRITORY.toLowerCase()}/${LANG}/album/${c.album.id}`,
  }));

  if (!best) {
    console.log(`${tag} ✗ 查無結果  ${t.q}`);
    review.push({ q: t.q, work: t.work.title, performer: t.version.p, reason: "查無結果", candidates: [] });
    none++;
  } else if (best.score >= MIN_SCORE && (!runnerUp || best.score > runnerUp.score)) {
    // 分數達標，且與第二名不並列（並列代表無法區分，交人工判斷）
    resolved[t.q] = cands[0].url;
    console.log(`${tag} ✓ ${t.q}\n        → ${cands[0].name} — ${cands[0].artist}  (score ${best.score})`);
    ok++;
  } else {
    console.log(`${tag} ? 信心不足  ${t.q}  (最高分 ${best.score}，門檻 ${MIN_SCORE})`);
    review.push({
      q: t.q, work: t.work.title, performer: t.version.p,
      reason: best.score < MIN_SCORE ? "分數低於門檻" : "前兩名同分，無法區分",
      candidates: cands,
    });
    low++;
  }
  await sleep(DELAY);
}

console.log(`\n─────────────────────────────────`);
console.log(`高信心 ${ok}　需人工確認 ${low}　查無結果 ${none}`);

if (DRY) {
  console.log("\n--dry-run：未寫入任何檔案。");
  process.exit(0);
}

/* ── 寫檔 ───────────────────────────────────────────────────── */
const header = fs
  .readFileSync(path.join(ROOT, "assets", "data-links.js"), "utf8")
  .split("window.PINNED")[0];
const body =
  "window.PINNED = {\n" +
  Object.keys(resolved).sort().map((k) => `  ${JSON.stringify(k)}: ${JSON.stringify(resolved[k])}`).join(",\n") +
  "\n};\n";
fs.writeFileSync(path.join(ROOT, "assets", "data-links.js"), header + body);
console.log(`\n已寫入 assets/data-links.js（共 ${Object.keys(resolved).length} 筆）`);

if (review.length) {
  fs.writeFileSync(path.join(ROOT, "tools", "review-needed.json"), JSON.stringify(review, null, 2));
  console.log(`需人工確認 ${review.length} 筆 → tools/review-needed.json`);
  console.log("挑選正確的候選網址後，手動加進 assets/data-links.js 即可。");
}

console.log("\n最後執行 `node build.js` 驗證並重新打包。");
