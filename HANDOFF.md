# 交接說明：把搜尋連結升級為帶 ID 的正式連結

這份文件給接手這項工作的人（或 AI agent）。**請先讀完「真正的限制」一節再動工**——
這件事卡住的原因不是「模型能力不足」，而是兩個外部條件，換誰做都一樣。

---

## 目標

網站現在每個版本的連結是**搜尋連結**：

```
https://www.kkbox.com/tw/tc/search?q=Britten Young Person's Guide Rattle
```

它可以用，但點下去是搜尋結果頁，使用者還要再點一次；而且**手機上不會直接開 KKBOX App**。

要直接開 App，需要**帶專輯 ID 的正式網址**（Universal Link）：

```
https://www.kkbox.com/tw/tc/album/Kx0mR8sLp2QaBcDeFg
```

**任務就是把 305 個版本的搜尋字串，逐一解析成這種網址。**

---

## 真正的限制

### 1. KKBOX 沒有免驗證的搜尋介面

- 網站對機器人請求回 **403**，無法抓取
- 唯一的正規途徑是 **KKBOX Open API**，需要 `client_id` / `client_secret`
- 申請處：<https://developer.kkbox.com/>（免費，但**必須由帳號持有者本人申請**）

**這是硬性條件。** 沒有憑證，任何 AI 都做不到這件事。

### 2. 沙箱環境的網路限制

本專案先前是在受管制的執行環境中開發的，`kkbox.com`、`api.kkbox.com`、
`account.kkbox.com` 全都不在允許清單內，實測錯誤訊息為：

```
Host not in allowlist: account.kkbox.com
```

多數 AI coding agent（含 ChatGPT Codex 的雲端沙箱）都有類似的網路政策。
**在本機執行不受此限。**

### 結論

> 最可靠的做法是：**在你自己的電腦上執行下面這支腳本。**
> 需要 AI 協助的部分只有「人工確認清單」的判斷，那才是真正需要判斷力的地方。

---

## 已經準備好的東西

`tools/resolve-kkbox.mjs` — 完整可用的解析腳本，**已用 mock server 做過端對端驗證**。

- Node 18+，**無外部相依套件**
- API 契約取自 KKBOX 官方 Python SDK（`KKBOX/OpenAPI-Python`），非臆測
- 自動略過已解析的項目，可分批執行
- 內建速率限制處理（遇 429 自動等待重試）
- **信心不足的不會亂寫**，改列入 `tools/review-needed.json` 附前三名候選

### 執行方式

```bash
# 1. 取得憑證後設定環境變數
export KKBOX_CLIENT_ID=你的_client_id
export KKBOX_CLIENT_SECRET=你的_client_secret

# 2. 先試跑 10 筆，確認比對品質
node tools/resolve-kkbox.mjs --dry-run --limit=10

# 3. 覺得結果合理就正式跑（約 305 筆，預設間隔 350ms，約 2 分鐘）
node tools/resolve-kkbox.mjs

# 4. 驗證並重新打包
node build.js
```

### 產出

| 檔案 | 內容 |
|---|---|
| `assets/data-links.js` | 高信心結果，**網站會直接使用** |
| `tools/review-needed.json` | 低信心結果 + 前三名候選，需人工挑選 |

`data-links.js` 的格式是 `{"搜尋字串": "網址"}`。手動補上待確認的項目後，
`node build.js` 會檢查每個 key 都對得上實際的搜尋字串——**打錯字會讓建置失敗**，
不會靜默失效。

---

## 比對邏輯（最需要改進的部分）

搜尋一個關鍵字會回傳數十張專輯，難的是判斷**哪一張才是我們要的那個版本**。
目前用的是保守的計分法（`scoreAlbum()`）：

- 搜尋字串中的每個詞出現在專輯／演出者名稱中 → +1（已排除 symphony、concerto
  這類到處都是的通用詞）
- **演奏者姓名命中 → +4**（演奏者是區分版本的關鍵）
- 廠牌相符 → +1
- 分數 ≥ 6 **且不與第二名同分** 才自動採用

已驗證的行為：

| 情境 | 結果 |
|---|---|
| 正確專輯明顯勝出 | ✓ 自動寫入（score 9） |
| 兩張同名同演奏者專輯 | ? 攔截，兩個候選都列出 |
| 搜尋結果完全無關 | ? 攔截（score 1） |

**這是可以改進的地方**：可加入發行年份比對、`available_territories` 過濾、
或對「全集 vs. 單曲」做區分。但請維持「寧可攔截也不要寫錯」的取向——
寫錯的連結會把使用者導到錯誤的錄音，比留白更糟。

---

## 如果要交給 ChatGPT Codex

把這段貼給它：

> 這個 repo 有一支 `tools/resolve-kkbox.mjs`，用 KKBOX Open API 把
> `assets/data-works-*.js` 裡每個版本的搜尋字串解析成帶專輯 ID 的正式網址，
> 結果寫入 `assets/data-links.js`。腳本本身已可運作並通過 mock 測試。
>
> 我要你做的是**改進 `scoreAlbum()` 的比對準確度**，目標是減少
> `tools/review-needed.json` 的筆數，同時不能產生錯誤配對。
> 可用的訊號包括：`album.release_date`（資料中每個版本都有 `y` 欄位可比對年份）、
> `album.artist.name`、`album.available_territories`。
>
> 注意：
> - 你的沙箱可能連不到 `api.kkbox.com`。若如此，請用 mock 資料開發，
>   並明確告訴我你沒有實際呼叫過 API。
> - `node build.js` 會驗證產出的 key 是否合法，改完請跑一次。
> - 不要放寬「寧可攔截也不要寫錯」的原則。

**但說實話**：如果你只是想要連結能用，`--dry-run` 跑一次看結果就夠了，
不一定需要另一個 AI 介入。真正需要人的是那份待確認清單——那需要判斷
「Rubinstein 1965 年的夜曲全集」對應到 KKBOX 上哪一次再版，這件事
沒有 API 能替你決定。

---

## 不需要 API 的替代做法

如果不想申請憑證，網站內建了手動釘選：

1. KKBOX App 找到專輯 → **分享 → 複製連結**
2. 網站上該版本按 **🔗 貼上分享連結** → 貼上

釘選的連結存在瀏覽器（只限該裝置）。要跨裝置共用，到
**⚙ 設定 → 複製全部（JSON）**，把內容貼進 `assets/data-links.js` 後 push。

**課程一週只用 1–3 首**，聽到哪釘到哪，一週不到一分鐘，24 週自然就補完了。
以實際使用節奏來說，這個做法未必比批次解析差。
