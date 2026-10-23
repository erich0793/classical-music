/* 離線支援。讓「加到主畫面」之後的網站在沒有網路時也打得開。

   策略是「網路優先」：有網路時一律拿最新版本（所以內容更新不會卡在舊版），
   拿到的同時存一份；沒網路、或網路慢到 4 秒還沒回應，才改用存著的那份。
   反過來的「快取優先」會快一點，但更新之後使用者要開兩次才看得到新內容——
   對一個會持續修訂的課程來說，那比慢一點更糟。

   PRECACHE 是第一次開啟時就先存好的檔案，確保「裝好之後馬上斷網」也能用。
   index.html 裡新增任何 <script>／<link> 都要加進來——
   tests/regression.mjs 會檢查兩邊有沒有對上。 */
var CACHE = "lc-v3";
var PRECACHE = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "assets/style.css",
  "assets/data-core.js",
  "assets/data-works-a.js",
  "assets/data-works-b.js",
  "assets/data-weeks.js",
  "assets/data-instruments.js",
  "assets/data-links.js",
  "assets/data-asks.js",
  "assets/tw/data-tw-core.js",
  "assets/tw/data-tw-instruments.js",
  "assets/tw/data-tw-works.js",
  "assets/tw/data-tw-units.js",
  "assets/tw/data-tw-pages.js",
  "assets/jazz/data-jazz-core.js",
  "assets/jazz/data-jazz-instruments.js",
  "assets/jazz/data-jazz-works.js",
  "assets/jazz/data-jazz-units.js",
  "assets/jazz/data-jazz-pages.js",
  "assets/vendor/qrcode.min.js",
  "assets/app.js",
  "assets/icons/icon.svg",
  "assets/icons/favicon-32.png",
  "assets/icons/icon-192.png",
  "assets/icons/apple-touch-icon.png"
];
var TIMEOUT = 4000;

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(PRECACHE); })
    .then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; })
      .map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

// 快取的鍵不含 ?query：?sync=… 的搬家連結每次都不同，不該每個都存一份
function keyOf(req) {
  var u = new URL(req.url);
  return u.origin + u.pathname;
}

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  // 只處理本站檔案。KKBOX／YouTube 連結是直接跳出去的，不經過這裡
  if (new URL(req.url).origin !== self.location.origin) return;

  e.respondWith(caches.open(CACHE).then(function (cache) {
    var net = fetch(req).then(function (res) {
      if (res && res.ok) cache.put(keyOf(req), res.clone());
      return res;
    });
    var fallback = function () {
      return cache.match(keyOf(req)).then(function (hit) {
        if (hit) return hit;
        // 任何頁面網址都用同一份 index.html（例如從主畫面打開 ./?sync=…）
        if (req.mode === "navigate") return cache.match(new URL("index.html", self.registration.scope).href);
        return undefined;
      });
    };
    var slow = new Promise(function (resolve) {
      setTimeout(function () { fallback().then(function (hit) { if (hit) resolve(hit); }); }, TIMEOUT);
    });
    return Promise.race([
      net.catch(function () {
        return fallback().then(function (hit) { return hit || Response.error(); });
      }),
      slow
    ]);
  }));
});
