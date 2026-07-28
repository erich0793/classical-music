# 古典音樂系統聆聽課程 · 互動網站

把 24 週的古典音樂自學教程做成可互動的單頁網站：每首曲目都附**經過挑選的著名版本**，依 **Hi-Res → Hi-Fi → 歷史錄音** 排序，可一鍵連往 KKBOX 搜尋。

## 直接使用

```bash
# 方式一：直接用瀏覽器開啟
open index.html

# 方式二：起一個本機伺服器
python3 -m http.server 8000   # 然後開 http://localhost:8000
```

不需要安裝任何東西，沒有相依套件、沒有 build step。

## 功能

| 功能 | 說明 |
|---|---|
| **版本推薦** | 75 首曲目、305 個版本，每個版本標註演奏者、廠牌、年份與推薦理由 |
| **Hi-Res 優先排序** | 預設把高解析錄音排在最前面，可在設定中關閉 |
| **隱藏歷史錄音** | 單聲道／早期立體聲可一鍵隱藏（音質先天受限，但多為詮釋史關鍵版本） |
| **KKBOX 連結** | 每個版本一個「在 KKBOX 開啟」按鈕，另附「複製搜尋字串」 |
| **進度追蹤** | 週完成標記、聆聽任務與自我檢核的勾選狀態，存在瀏覽器 localStorage |
| **★ 重聽區** | 收藏曲目並一鍵匯出全部搜尋字串，對應課程 §2.2 的「重聽區」播放清單 |
| **每週搜尋字串匯出** | 一鍵複製本週全部曲目的搜尋字串，用來建 `古典課程 W01`～`W24` 播放清單 |
| **全站搜尋** | 曲名、作曲家、演奏家、內文都能搜 |
| **深色模式** | 跟隨系統或手動切換 |

## 音質標記怎麼判定

網站上的三種標記是**依錄音年代與發行廠牌所作的推估**，不是 KKBOX 的即時資料：

- **Hi-Res 優先** — 近年數位錄音，或大廠已發行 24bit 高解析重製（BIS、Channel Classics、Linn、Pentatone、LSO Live、近年的 DG / Decca / Harmonia Mundi 等）
- **Hi-Fi 無損** — 類比時代名盤之數位重製，通常為 16bit/44.1kHz
- **歷史錄音** — 單聲道或早期立體聲。收錄理由為詮釋史地位，不以音質取勝

實際請以 KKBOX App 內顯示的音質標記為準。App 內需先到「設定 → 音質」把串流音質調到最高。

## KKBOX 連結格式

KKBOX 對機器人請求回傳 403，因此**無法在開發時驗證搜尋網址格式**。網站提供三種格式可在「⚙ 設定」中切換：

1. `www.kkbox.com/{region}/{lang}/search?word=…`（預設）
2. `www.kkbox.com/{region}/{lang}/search/all/…/1`（舊格式）
3. `play.kkbox.com/search/…`（網頁播放器）

**若連結點下去找不到結果，換一個格式試試。** 每個版本旁的「複製搜尋字串」按鈕不受此影響——貼進 KKBOX App 的搜尋列永遠可用。

地區（tw / hk / sg / my / jp）與語言（tc / sc / en / ja）也可在設定中調整。

## 檔案結構

```
index.html              頁面骨架
assets/style.css        樣式（含深色模式）
assets/data-core.js     模組、時期概覽、名詞表、分類宣告
assets/data-works-a.js  曲目資料庫（第 1–11 週）
assets/data-works-b.js  曲目資料庫（第 12–24 週）
assets/data-weeks.js    24 週單元內容
assets/app.js           渲染與互動邏輯
build.js                產生單檔版本
```

### 產生單檔版本

```bash
node build.js   # → dist/index.html（約 172 KB，可離線使用／單檔分享）
```

### 新增或修改版本推薦

編輯 `assets/data-works-*.js`，每個版本的欄位為：

```js
{
  p: "演奏者 / 樂團",
  l: "廠牌", y: 1974,
  qa: "hires",              // hires | hifi | historic
  t: ["ref", "modern"],     // ref 公認代表版 / period 古樂器 / modern 現代樂器
                            // entry 入門友善 / narrated 附旁白
  q: "KKBOX 搜尋字串",
  w: "推薦理由"
}
```

## 內容性質

課程內容依三層分類標記：**【史】史實層**（可查證的客觀事實）、**【析】分析層**（學界通說）、**【選】策展層**（編者的教學判斷，無客觀對錯）。

**全部曲目選擇與版本推薦皆屬【選】層。** 若指定版本在 KKBOX 無法取得，改用平台上任何其他版本仍可完成全部聆聽任務。

## 部署

純靜態檔案，可直接放上 GitHub Pages、Netlify、Cloudflare Pages 或任何靜態空間。GitHub Pages 只需在 repo 設定中把來源指向此分支的根目錄。
