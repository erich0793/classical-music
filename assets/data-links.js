/* 內建的 KKBOX 正式連結（跨裝置共用）
 *
 * 這裡的連結是網站的一部分，會隨 git 一起部署，所以「電腦、手機、平板都看得到」。
 * 相對地，在網站上用「🔗 貼上分享連結」釘選的連結只存在該台裝置的瀏覽器裡。
 *
 * 解析順序：本機釘選 → 這個檔案 → 搜尋連結
 * （本機釘選會蓋過這裡的值，方便個別裝置臨時覆寫。）
 *
 * 怎麼把本機釘選變成內建：
 *   1. 在任一裝置上釘選好連結
 *   2. ⚙ 設定 → 已釘選的 App 連結 → 「複製全部（JSON）」
 *   3. 把內容貼進下面的物件，commit + push
 *
 * key   = 該版本的 KKBOX 搜尋字串（見 data-works-*.js 的 q 欄位）
 * value = 從 KKBOX App「分享 → 複製連結」得到的正式網址
 *
 * 範例：
 *   "Beethoven Symphony 5 Kleiber": "https://www.kkbox.com/tw/tc/album/XXXXXXXXXXXXXXXX",
 */
window.PINNED = {
};
