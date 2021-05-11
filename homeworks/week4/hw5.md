## 請以自己的話解釋 API 是什麼

常常可以在 App Store 或者 Google Play 上看見氣象跟星象有關的 app，或者是在網誌上看食記的時候，會看到文章內鑲嵌 Google Map 地圖，網誌跟 app 的資訊都是來自 Google Map 跟氣象局的資料。在 Google Map 和氣象局的角度，就是提供資料，而在 app 和食記的角度，就是在使用資料，這樣一來一往就是交換資料，但是一般人不會想把自己的資料直接分享給別人使用，可能會有一些隱私顧慮，所以利用另一種形式將提供資料給大眾使用，這樣有利於大眾做一些新功能的開發，例如：使用他方的星象跟氣象資料，製作的新 app，或者是幫助食記圖像化餐廳位置的 Google Map。那這些資料種類繁多、資料龐大，怎麼樣讓大家可以擷取使用？就需要訂立一個統一化的格式、規範跟環境，讓大家不僅可以分享資料，也可以使用這些資料。
這些資料的提供跟使用，就是使用 API 這個方法，API 全名是應用程式介面（application programming interface），重點是「介面」這個詞，先前提到，若要讓大家都看的懂資料，就要有統一的格式跟環境，這個 API 就是中間的媒介，讓大家可以擷取跟提供資料，有了資料的統一格式跟資料說明，再搭配程式語言的輔助，讓大家可以成功的將資料交換，讓更多人可以使用資料跟開發新功能。

---

## 請找出三個課程沒教的 HTTP status code 並簡單介紹
- **202 accepted**
已經發送 request，沒有辦法立即可以返回的 response，需要進一步的非同步處理，才能獲得 response。
不一定可以處理完成，可能會在處理過程中出現意外。

- **403 forbidden**
HTTP 狀態碼 403 是永久的問題，當接收到 403 時，就是 server 在告訴使用者：已經通過身份驗證（authenticated），但是使用者沒有訪問此網頁的權限（not authorized）。所以若要取得權限，請向系統管理員更改後再來訪問。

- **401 Unauthorized**
HTTP 狀態碼 401 Unauthorized 是用在身份驗證的錯誤（authentication errors），401 response 是 server 在告訴使用者：「沒有通過身份驗證，可能是身份驗證不正確或者是沒有身份驗證」。通常 401 是由使用者的 web server 發出，不是由 web application 發出，所以這只是暫時上的錯誤，因此 server 會要求使用者再嘗試一遍。

- **比較：**
401 Unauthorized response 是用在暫時性的錯誤，是沒有通過身份驗證，可能是身份驗證時密碼輸錯的原因或者是頁面載入過時，所造成的身份驗證失敗，因此再嘗試一次，輸入正確的身份驗證資料，就可以解決暫時性的錯誤。
403 Forbidden 是永久性的，雖然通過身份驗證（authentication），但是沒有被授權允許訪問（被禁止訪問該頁面），所以，若要解決此問題，需要詢問系統管理員並得到授權（authorization）。

    > Authentication（驗證）：確認使用者是否真的是其所宣稱的那個人的過程。
    > Authorization（授權）：根據使用者的角色來授予應有的權限。
    > 搭配HTTP狀態碼，未通過驗證時，回傳 401 Unauthorized，
    > 通過驗證但未授權時，回傳 403 Forbidden。
    > 引用自：[驗證(Authentication)與授權(Authorization)的區別
    Authentication vs Authorization
    ](https://matthung0807.blogspot.com/2018/03/authenticationauthorization.html)

---

## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。
|說明            |Method|path|參數|範例|
|---------------|------|------|----|---|
|新增餐廳       |POST  |/restaurants|name:餐廳名|無|
|更改餐廳       |PATCH  |/restaurants/:id|name:餐廳名|無|
|刪除餐廳       |DELETE |/restaurants/:id|無|無|
|回傳所有餐廳資料|GET     |/restaurants|_limit:限制回傳資料數量|/restaurants?_limit=5|
|回傳單一餐廳資料|GET     |/restaurants/:id|無|/restaurants/10|

---
參考：
**1. 202 accepted**
- [非同步(Asynchronous)與同步(Synchronous)的差異](https://medium.com/@hyWang/%E9%9D%9E%E5%90%8C%E6%AD%A5-asynchronous-%E8%88%87%E5%90%8C%E6%AD%A5-synchronous-%E7%9A%84%E5%B7%AE%E7%95%B0-c7f99b9a298a)
- [深度解析——常用 HTTP 狀態碼](https://kknews.cc/zh-tw/tech/bg5n5j.html)
- [HTTP 狀態碼 (Status Codes)](https://notfalse.net/48/http-status-codes#202-Accepted-8212)

**2. 403 Forbidden**
- [驗證(Authentication)與授權(Authorization)的區別
Authentication vs Authorization](https://matthung0807.blogspot.com/2018/03/authenticationauthorization.html)
- [403 Forbidden vs 401 Unauthorized HTTP responses](https://stackoverflow.com/questions/3297048/403-forbidden-vs-401-unauthorized-http-responses)
- [Authentication versus Authorization](https://stackoverflow.com/questions/6556522/authentication-versus-authorization)

**3. 401 Unauthorized**
- [401 Unauthorized](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401)