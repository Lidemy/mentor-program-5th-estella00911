## 請以自己的話解釋 API 是什麼
常常可以在 App Store 或者 Google Play 上看見氣象跟星象有關的 app，或者是在網誌上看食記的時候，會看到文章內鑲嵌 Google Map 地圖，網誌跟 app 的資訊都是來自 Google Map 跟氣象局的資料。在 Google Map 和氣象局的角度，就是提供資料，而在 app 和食記的角度，就是在使用資料，這樣一來一往就是交換資料，但是一般人不會想把自己的資料直接分享給別人使用，可能會有一些隱私顧慮，所以利用另一種形式將提供資料給大眾使用，這樣有利於大眾做一些新功能的開發，例如：使用他方的星象跟氣象資料，製作的新 app，或者是幫助食記圖像化餐廳位置的 Google Map。那這些資料種類繁多、資料龐大，怎麼樣讓大家可以擷取使用？就需要訂立一個統一化的格式、規範跟環境，讓大家不僅可以分享資料，也可以使用這些資料。
這些資料的提供跟使用，就是使用 API 這個方法，API 全名是應用程式介面（application programming interface），重點是「介面」這個詞，先前提到，若要讓大家都看的懂資料，就要有統一的格式跟環境，這個 API 就是中間的媒介，讓大家可以擷取跟提供資料，有了資料的統一格式跟資料說明，再搭配程式語言的輔助，讓大家可以成功的將資料交換，讓更多人可以使用資料跟開發新功能。

## 請找出三個課程沒教的 HTTP status code 並簡單介紹
- **202 accepted**
已經發送 request，沒有辦法立即可以返回的 response，需要進一步的非同步處理，才能獲得 response。
不一定可以處理完成，可能會在處理過程中出現意外。

- **403 forbidden**
當訪客在瀏覽網頁時，會發送 request，當 requesst 送到 server 時，若 request 成功，server 會發送一個 response 作為回應，成功加載顯示頁面，而這個成功會有一個 2XX 開頭的 HTTP 狀態碼，相反如果失敗，會出現 4XX 的狀態碼，其中 403 為URL有效，但是訪客無權限存取此頁面，原因可能為，一該網頁訪客過多，可以稍後再試，二是同一個 IP request 存取要求過多，伺服器繁忙，被伺服器擋住，三是要求身份驗證過程中，密碼輸錯。
題外話：好像突然想起以前開賣搶購商品的時候，有重新整理頁面太多次，導致網頁進不去印象。

- **401 Unauthorized**
在瀏覽器發送 request 的過程中，出現的 HTTP 狀態碼，身份驗證成功，但因為在伺服器內缺乏此身份（invalid authentication），所以存取失敗。


**比較：**
相較於上一個的 403 Forbidden，在 401 Unauthorized 是身份驗證通過，但是在伺服器內沒有該身驗證，所以存取失敗；在 403 Forbidden是沒有通過身份驗證，因為密碼輸入錯誤。

## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。
|說明            |Method|path|參數|範例|
|---------------|------|------|----|---|
|新增餐廳       |POST  |/restaurants|name:餐廳名|無|
|更改餐廳       |PATCH  |/restaurants/:id|name:餐廳名|無|
|刪除餐廳       |DELETE |/restaurants/:id|無|無|
|回傳所有餐廳資料|GET     |/restaurants|_limit:限制回傳資料數量|/restaurants?_limit=5|

---
參考：
**1. 202 accepted**
- [非同步(Asynchronous)與同步(Synchronous)的差異](https://medium.com/@hyWang/%E9%9D%9E%E5%90%8C%E6%AD%A5-asynchronous-%E8%88%87%E5%90%8C%E6%AD%A5-synchronous-%E7%9A%84%E5%B7%AE%E7%95%B0-c7f99b9a298a)
- [深度解析——常用 HTTP 狀態碼](https://kknews.cc/zh-tw/tech/bg5n5j.html)
- [HTTP 狀態碼 (Status Codes)](https://notfalse.net/48/http-status-codes#202-Accepted-8212)

**2. 403 Forbidden**
- [什麼是403禁止的錯誤以及如何解決（5個解決方案的解釋）](https://hostingpill.com/zh-TW/403%E7%A6%81%E6%AD%A2%E7%9A%84%E9%8C%AF%E8%AA%A4/)
- [爬蟲之遇到403 Forbidden,你該怎麼辦？](https://www.itread01.com/content/1541928801.html)

**3. 401 Unauthorized**
- [401 Unauthorized](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401)