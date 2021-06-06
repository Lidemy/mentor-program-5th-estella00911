## 什麼是 Ajax？
### Ajax
若在瀏覽器要發送 request，就需要用到 Ajax 的方法。那什麼是 Ajax 呢？全名是 Asynchronous JavaScript And XML。其實這是一項技術，結合兩個方法：一是瀏覽器內建 `XMLHttpRequest object`，只要開啟 URL 並發送 request， 這樣就可以利用瀏覽器發出 request，二是可以利用 DOM 連結　JavaScript 與 HTML 之間的溝通，使　JavaScript 可以視覺化呈現，此外 Ajax 還允許 server 可以非同步的在後台交換資料，意思就是說可以只交換部分資料，這樣就不用重新載入頁面。

### 那什麼又是非同步（Asynchronous）、同步（synchronous）呢？
* 同步（synchronous）:
客戶端（client）向伺服器端（server）發出 request時，客戶端（client）要從伺服器端（server）收到 response 後，客戶端的執行內容才會往下執行。如果在發送 request 的過程出了錯誤，可能會導致後面的內容無法執行，那就沒有辦法收到 request，導致一連串的連鎖反應，導致 client 沒有辦法接收到伺服器端的 response，也就是說可能沒辦法 load 出頁面。
* 非同步（Asynchronous）：
客戶端（client）向伺服器端（server）發出 request時，客戶端（client）可以先往下執行內容，不用等待從伺服器端（server）收到 response 後，再做事。這樣的好處就是支線進行，這樣在收到 response 時，執行內容也完成，此時只要將支線結合起來，就可以顯現頁面了。

## 用 Ajax 與我們用表單送出資料的差別在哪？

| 種類 | 頁面更新狀況 |所需時間與資料交換量|
| --- | --- | --- |
| 表單提交 | 發出 request 到 server，server 給 response後，瀏覽器 render 出頁面。<br>整個頁面會重新 render 一次。 | 耗時<br> server 與 browser 之間資料交換量大 |
| Ajax | 頁面只會針對需要更動的部分進行部分更新，不用重新 render 整個頁面。<br>可以只需要向 server 發送及接收需要的資料。 | 比較省時<br> server 與 browser 之間只需部分的資料交換 |

## JSONP 是什麼？
JSON with Padding，這是另一種跨來源取資料的方法，因為在瀏覽器上同源政策來保證有資料安全的規範，其中 `<img>` 和` <script>` 不會受到同源政策的規範，那在 JSONP 就是利用 `<script>` 可以來請求資料，此外 `<script>` 也常用來插入 Google Analytics 的 code 來追蹤。
1. 先建立一個 `<script src='https://...'></script>` 其中 `src` 為取資料的網址
2. 使用回呼函式取到資料。

雖然這個 JSONP 沒有瀏覽器上的同源政策限制，但他只能使用「GET」的方式來取資料，不能使用「POST」。

## 要如何存取跨網域的 API？
同下題內容：**CORS** 跟**小結**的部分。

## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？
#### 發出 request 的源頭：Node.js or 瀏覽器？
第四週，我們是學習在 Node.js 裡發出 request 來取得資料，而這週第八週，我們是使用在瀏覽器上發出 request 來取得資料，執行過程差異如下：
1. 在 Node.js 發出 reqeust：
```
Node.js --request--> server
Node.js <-response-- server
```
2. 在瀏覽器上的 js 發出 reqeust：
```
瀏覽器上的js ----------> 瀏覽器 --request--> server
                       瀏覽器 <--response-- server
```
兩個差異就是在不同的地方發出 request，在瀏覽器上會有一些資料安全的限制，讓使用者沒有辦法隨便或者輕易發出一個 request 就拿到別人資料、讀取電腦檔案；在 Node.js 的執行環境發出 request 就沒有瀏覽器的限制。

#### 那這個瀏覽器所謂的安全限制是什麼呢？
為了不讓他人隨意讀取，所以這個限制應該是限制在自己認識且允許的使用者吧！那在網路的名詞就是網域（domain），要有相同的網域才可以存取資料，不同的網域就不能存取資料，這就是在瀏覽器設立的安全性限制——「同源政策（Same Origin Policy）」。那現在又會迸出一個問題就是什麼叫做相同的網域呢？
相同網域就是發出的 request 來源（origin），要與 server 端的位置一樣，相反，不同網域就是發出 request 的來源與 server 端不同。瞭解相同網域後，那相同網域怎麼進一步解釋呢？

先前提到相同網域就是發出 request 來源，要與 server 端的位置一樣，所以可以朝 origin 解釋。瀏覽器設立了 origin 的規範——同源政策。同源指的是三個項目符合：相同協定、相同埠號、相同主機位置。所謂協定就是是否都是 http 或 https，埠號指的是 TCP/IP 協議的埠號，如 21 埠為 FTP、80 埠為 HTTP 服務，主機位置的話，例如 `https://store.company.com/dir2/other.html` 與 `https://news.company.com/dir2/other.html` 在 `store.company.com` 與 `news.company.com` 上的主機位置是不同的。
那這樣只要非同源，我們就沒辦法隨意存取其他人的資料，那資料怎麼共享呢？所以就需要另一個規範——跨來源資源共用。（CORS）。

#### 跨來源資源共用（CORS）
##### 回顧
像先前在 Node.js 發出 request 時，需要在 request 加上 header，例如：Authorization 是 HTTP 需要身分驗證通過後才能發出請求後，收到 server 的 response，User-Agent 是偵測瀏覽器的版本，規定哪個版本的瀏覽器才能存取，這些在 Node.js 發出 request 時，都要自己加上去 header 才有效。
##### CORS
在瀏覽器發出的 js 中，這個 CORS 規定：必須要在 header 加上 `Access-Control-Allow-Origin`，就是哪些來源的使用者，可以存取該 URL，舉例：
![](https://i.imgur.com/0VyvkMP.png)
如果是 `Access-Control-Allow-Origin: *` 為 `*`，表示可以所有人皆可向這個 URL（https://reqres.in/api/users） 發出 request，並得到 server 的 response。

#### 小結：那什麼情況下才能跨網域存取別人的資料呢？
1. 從跨網域變成與 server 相同網域（相同來源），這樣就可以發出的 request。
2. 在 server 端的 header 加上 `acces-contorl-allow-origin`。
---
[什麼是 Ajax？ 搞懂非同步請求 (Asynchronous request)概念](https://tw.alphacamp.co/blog/ajax-asynchronous-request)
[輕鬆理解 Ajax 與跨來源請求](https://blog.huli.tw/2017/08/27/ajax-and-cors/)
[HTTP Header & Status Code 心得](https://ithelp.ithome.com.tw/articles/10212102)