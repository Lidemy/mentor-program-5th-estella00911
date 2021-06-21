## 資料庫欄位型態 VARCHAR 跟 TEXT 的差別是什麼
| Difference | `VARCHAR(M)`| `TEXT` |
| -------- | -------- | -------- |
| max size     | fixed <br>(2<sup>16</sup> -1)     | variable<br> (`M`: 1 ~ <code>M=2<sup>16</sup> -1</code>)    |
| disk space | 1 + `c` bytes (for `M` $\leq$ 255) <br>2 + `c` bytes (for 256 $\leq$ `M` $\leq$ 2<sup>16</sup> -1)| 2 + `c` bytes|
|advantage|將 characters 存在較小的 disk space 有助於更有效率的檢索資料||
|application|Username, email, password...|messages, emails, code, links, comments|

相關符號解釋：
1. `c` 為 the length of the stored string。
2. `VARCHAR(M)` 的 `M` 為可儲存的字符數，如果字符數 $\leq$  `M`，剩餘的空間會以空格儲存。`VARCHAR(M)` 在 **M** $\leq$ 255 的儲存空間為<code>1 + **c** bytes </code>，其中 1 character 的空間是要留給儲存 `c` 的「字串長度訊息」。

3. `c` 前面有提到是字串的長度，需要 `1 + c` bytes。
<br>例如：今天在 username 設定資料類型為 `VARCHAR(M=12)`，儲存的資料為 `'ABC'`，那 `c` 的長度為 3， `1` 的儲存空間留給「字串長度訊息」，即 3，但是前面提到 username 的儲存空間為 M=12，但是前面的字串長度訊息跟字串長度加起來小於 12，所以剩下的空間，會以空格儲存。
<br>假設今天 username 的值為 `'ABCDEFGHIJKLMNO'` 的話，長度為 15 個字符（characters），但是在 username 設定資料類型為 12 個字符，那 username 在儲存時，就會只存 12 個字符，那就是 `'ABCDEFGHIJKL'`，剩下的 `MNO`就沒有被存進去。





## Cookie 是什麼？在 HTTP 這一層要怎麼設定 Cookie，瀏覽器又是怎麼把 Cookie 帶去 Server 的？
### Cookie 是什麼？
在 HTTP 中，又可以被稱為 HTTP cookie、web cookie、browser cookie，cookie 是讓伺服器傳送給使用者瀏覽器的一小段資料。

為什麼伺服器要傳給使用者的瀏覽器這一小段資料呢？因為瀏覽器記不住上一個發 request 到伺服器的人是不是與這一次發 request 的人一樣，這個就是HTTP 是一個「無狀態協議Stateless Protocol」。
既然記不住的話，在需要登入才能留言的留言板中，我怎麼知道我有沒有登入留言板呢？那我要怎麼在登入後，使用自己的暱稱發表留言？
這時候就需要 cookie 來讓伺服器記住使用者是誰（client 端向伺服器發 request 後，伺服器會回傳一個 cookie，像是server 給的識別證回傳給 client 端），那 cookie 被存在哪呢？ cookie 的資料會被存在瀏覽器內，這樣一來，使用者使用瀏覽器時，帶著上次造訪網頁得到的 cookie，再次造訪相同網頁時，伺服器收到來自使用者的附帶 cookie 的 request 時，伺服器就知道：上次拜訪網頁的人與這次拜訪網頁的人為同一個，這樣就記得了 HTTP stateless protocal 的無狀態協定。記得我是誰之後，我就可以在自己的留言板進行留言 。
### 使用 Cookie 的目的
1. 管理
    (1) 登入
    (2) 購物車
    (3) 或者是伺服器任何需要記得的資訊
2. 個人化的資訊
    (1) 使用者使用偏好、偏好主題等等的設定
3. 追蹤與分析：紀錄使用者行為偏好

### 在 HTTP 這一層要怎麼設定 Cookie，瀏覽器又是怎麼把 Cookie 帶去 Server 的？
先前有學過如何使用 Node.js 發 request 到伺服器（`request = require('request');`），也有學習如何使用瀏覽器發 request 到伺服器（`XMLHttpRequest`），最近也有學如何在 PHP 利用 html form 的提交表單發送 POST method request，然後在 PHP 有寫好的封包 `$_POST['']` 來取得參數。

1. Node.js 發 request 要怎麼帶上 cookie？
引入 http 的 npm 套件
```javascript=
http = require('http');
// method 1: write a header
http.createServer(function (request, response) {
  // To Sends a response header to the request
  // write a cookie
  response.writeHead(200, {
    'Set-Cookie': 'cookie=SDJIWLA',
    'Content-Type': 'text/plain'
  });
  response.end('Hello World\n');
});
// method 2: setheader: set-cookie
response.setHeader("Set-Cookie", "username=" + data.name);
```

參考 [`response.setHeader(name, value)` Node.js v8.17.0 Documentation](https://nodejs.org/dist/latest-v8.x/docs/api/http.html#http_response_setheader_name_value)

1. 瀏覽器發 request
在 [send a cookie with XMLHTTPRequest (TVMLJS)
](https://stackoverflow.com/questions/42260885/send-a-cookie-with-xmlhttprequest-tvmljs) 中有提到出於安全性的原因，不能使用 JavaScript 的 `xmlHTTPRequest` 不允許設置 cookie，所以利用其他方法來解決。 

3. PHP
- set cookie
    - cookie 名稱：`'username'`
    - cookie 值：`$username`
    - cookie 效期：`time() + 3600` 現今時間加上一小時內。

```php=
setcookie("username", $username, time()+3600);  /* expire in 1 hour */
```
- 自動帶上 cookie： `$_COOKIE['username']`。
參考 [setcookie -- php.net](https://www.php.net/manual/en/function.setcookie.php)


## 我們本週實作的會員系統，你能夠想到什麼潛在的問題嗎？
1. 後台資料的密碼一覽無遺
2. 可能被有惡意的人重複註冊跟登入洗版
3. 發出留言後不能編輯與刪除
4. 忘記密碼只能重新註冊，沒有找回密碼的功能。


參考資料：
1. [MySQL: Large VARCHAR vs. TEXT?--stackoverflow](https://stackoverflow.com/questions/2023481/mysql-large-varchar-vs-text/2023513#2023513)
2. [What is the difference between VARCHAR and TEXT in MySQL?--Quora](https://www.quora.com/What-is-the-difference-between-VARCHAR-and-TEXT-in-MySQL)
3. [Difference between VARCHAR and TEXT in MySQL [duplicate]--stackoverflow](https://stackoverflow.com/questions/25300821/difference-between-varchar-and-text-in-mysql)
4. [Size of varchar columns--stackoverflow](https://stackoverflow.com/questions/177354/size-of-varchar-columns)
5. [SQL varchar data type deep dive--SQLShack](https://www.sqlshack.com/sql-varchar-data-type-deep-dive/)
6. [HTTP cookie-- MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)