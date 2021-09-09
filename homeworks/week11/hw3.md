## 請說明雜湊跟加密的差別在哪裡，為什麼密碼要雜湊過後才存入資料庫
### 請說明雜湊跟加密的差別在哪裡
| 種類       | process                                                                                                                                                       | 目的                                                 | 用途                                                                                                 |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| encryption | **two-way function**<br>plain text（明碼）透過密鑰加密後，可以再透過密鑰解密回相同的文本，此為 two-way function。<br>其中密鑰分為對稱與非對稱。               | 保護資訊的機密性、完整性，驗證發送、接收資訊的身份。 | 確保在網路上傳輸信用卡號碼的安全性、保護在筆電、桌電上或其他設備上的資訊、保護網路平台裡的使用者資訊 |
| Hash       | **one-way function**<br>若 plain text 經過 hash function 後成為 hashed text，hashed text 沒有辦法再透過 hash function 回復成相同的文本，為 one-way function。 | 密碼不易被解密，然後洩漏。                           | 密碼、兩者文件資料相異的比對、Blockchain                                                             |

![encryption and hash](https://aboutssl.org/wp-content/uploads/2020/09/encryption-description-example.svg)
### 為什麼密碼要雜湊過後才存入資料庫
#### 為什麼密碼不能用編碼、加密的形式，要經過雜湊？
如果使用編碼（如：Base64、Base32、Base16、UTF-7），熟悉電腦的駭客，可能會去嘗試看看編碼能不能拆解密碼，因為這些編碼在網路上都有拆解的方法，所以是最不安全的一種。那要是使用加密（如：AES256）呢？經過加密會比較安全嗎？那也不會比較安全，因為其他人也可能拿到加密的密鑰，此時再將加密過後的密碼與不同的加密密鑰核對看看，就有可能會拆解密碼，所以加密的密鑰若是有可能會洩漏的話，加密的方法也不安全。以上方法都可以將密碼編碼、加密，然後還可以再利用解碼、解密，將密碼還原成原本相同字符的明碼，那有沒有一個方法是只能將明碼變成亂碼，但亂碼沒辦法變回明碼呢？這樣一來，密碼就很安全許多，不易被拆解。那就是「雜湊」，網路支援的雜湊有很多種，例如：MD5、SHA1、SHA256、Tiger128、SHA1。
雜湊的原理就是：不同長度的密碼，經過雜湊後，會變成相同長度的英數符號，進一步解釋，有機會不同的密碼經過雜湊後，得到相同的英數符號。今天若是駭客駭進了資料庫，發現這些密碼都是經過雜湊的方式儲存，這樣駭客就沒辦法將這些雜湊解密，如此一來，密碼就得到了保護，不容易被駭客偷走，做其他不好的事情。
最常見破解雜湊的方法就是把各種可能的字串給雜湊演算法，得到輸出結果後，再將輸入的字串與輸出結果做成彩虹表（rainbow table），但這通常不太可行，因為這只是得到一小片的雜湊演算法結果，雜湊演算法是經由不同的 chains 構成，然後只儲存了 chain 裡的第一個及最後一個元素，但在演算雜湊時，這個 chain 裡可能有幾十個元素。在彩虹表裡只儲存了第一個元素（輸入的字串）與最後一個元素（輸出結果），也就是一小片雜湊演算法的內容。
#### 為什麼密碼要雜湊過後才存入資料庫？
有可能駭客駭入資料庫，利用 SQL injection 撈出了使用者資訊（如：帳號、密碼），如果這時密碼存的是明碼，那使用者的資料就會洩漏，因為大多數人有在不同網站設立相同密碼的習慣，這時駭客就可以拿這些資料去嘗試登入其他網站，竊取使用者的資料。
為了避免資料庫被駭客竊取密碼，就要以雜湊的方式儲存，讓駭客沒有辦法還原亂碼，取得密碼的明碼。

## `include`、`require`、`include_once`、`require_once` 的差別
### 什麼是 `include()` 和 `require()`?
`include()` 和 `require()` 可以讓該 PHP 檔案裡，包含另一個 PHP 檔案的 code，這樣可以節省重複性的 code。例如：
1. conn.php` 為 MySQL 與 PHP 的互動，目的：讓 PHP 檔案可以連結 MySQL 資料庫>
2. index.php、login.php 等等，在裡讀取 MySQL 資料，製作頁面。

其中，index.php、login 因為要讀取資料庫，必須先連線到 MySQL 才能讀取資料，如果每次在 code 前面寫連線資料庫的 code，會讓 code 很冗長跟而且重複性高（每個 PHP 檔案一開始都寫連線資料庫的 code）。
因為都讀取相同的資料庫，所以資料庫的帳號跟密碼一樣，這樣的話，連線資料庫的 code 都一樣，就可以將這段 code 獨立出來，存成一個 conn.php，用於連線資料庫。
那這樣把連線資料庫與使用資料庫製作頁面檔案分開，要怎麼連結呢？就是在 index.php 使用 `require()`或`include()`指令：`require('conn.php')`，這樣就可以讓連線資料庫的這段 code，包含在 index.php 內，不僅讓 code 重複性下降，也可以更好的管理檔案，例如更新資料庫的密碼，此時就只要修改一個 conn.php 即可；相反地，如果是將連線資料庫這段 code 寫在每個 php 檔案內（如：index.php、login.php），若要更新資料庫密碼，就要從 index.php、login.php 內更改資料庫密碼，有了正確的密碼，才能連到資料庫。
舉例：
1. 連線資料庫的 conn.php，以及主頁 index.php
```
// conn.php
<?php
	$servername = 'localhost';
	$username = 'test';
	$password = 'test';
	$dbname = 'test';
	$conn = new mysqli($servername, $username, $password, $dbname);

	if (!empty($conn->connect_error)) {
	  die('資料庫連線錯誤' . $conn->connect_error);
	}

  $conn->query('SET NAMES UTF8');
  $conn->query('SET time_zone = "+8:00"');
?>
```
```
// index.php
<?php require('conn.php'); ?>

<!DOCTYPE html>
<html lang="en">
    <head>
    </head>
    <body>
    </body>
</html>
```

2. 主頁 index.php 先連線資料庫，再使用資料庫的內容

```
// index.php
<?php
	$servername = 'localhost';
	$username = 'test';
	$password = 'test';
	$dbname = 'test';
	$conn = new mysqli($servername, $username, $password, $dbname);

	if (!empty($conn->connect_error)) {
	  die('資料庫連線錯誤' . $conn->connect_error);
	}

  $conn->query('SET NAMES UTF8');
  $conn->query('SET time_zone = "+8:00"');
?>

<!DOCTYPE html>
<html lang="en">
    <head>
    </head>
    <body>
    </body>
</html>
```
利用 `require();` 讓 PHP 的 code 更簡潔、清楚，容易維護修改。

### `include`、`require` 的異同
相同之處：
兩個的指令操作起來相似。

不同之處：
以在 index.php 內連接 `require('conn.php')` 或`include('conn.php)` 為例子。
當在 index.php 無法找到指令內的 PHP 檔案時，`include` 只會產生一個 warning 說沒有找到文件，然後繼續執行 index.php 後面的指令；相反地，`require` 若是沒有找到該指令中的 PHP 檔案，會產生一個嚴重致命的錯誤，然後停止 index.php 檔案的執行。

## `include`、`require` 與 `include_once`、`require_once` 的差別
有時候會使用 `include` 或 `require` 多次連結其他 PHP 檔案，特別是常用的放很多 function 的檔案，如果連結同一檔案多次，可能會發生錯誤，因為放很多 function 檔案（utils.php）內的 function（如：`getUserFromSession()`） 因為被引入多次，所以被定義了好幾次，那就會產生 fatal error，為了避免這個情形發生，就可以使用 `include_once` 這個指令，就算在 code 裡面多次連結這個放很多 function 檔案的指令，PHP 在執行時，只會包含這個 function 檔案一次，這樣就避免了多次連結 PHP 檔案，發生的重複定義的致命錯誤。
舉例可參考這篇：[The include_once and require_once Statements TutorialRepulbic](https://www.tutorialrepublic.com/php-tutorial/php-include-files.php)

## 請說明 SQL Injection 的攻擊原理以及防範方法
### 攻擊原理：
利用 SQL 的語法是字串拼接的方式，輸入一些惡意字串，試圖改變 SQL 的語法，來破壞跟攻擊資料庫的伺服器。

#### 例如：
竊取資料庫的帳號密碼、使用者資訊，使用者常常將不同網站設立相同的密碼，所以駭客可以將帳號密碼輸在其他網站，來竊取其他資訊。

### 攻擊方法：
以留言板為例，其中 $nickname 從 cookie 取， $content，則是客戶端輸入留言的地方。
以下 code 為按下新增留言鈕後，使用 SQL 語法將留言內容新增至資料庫：
```
Insert into comments(nickname, content) values('aaa', 'I am aaa')
```

#### 攻擊 1：
登入使用者（username）： aaa
留言內容：`'), ('admin', 'hi`
![](https://i.imgur.com/QlZkRKi.png)

#### 攻擊 2：
登入使用者（username）： aaa
留言內容：`'), ('admin', (select password from jean_users limit 1))#`
![](https://i.imgur.com/MdF2Sa8.png)

#### 攻擊 3：
登入使用者（username）： aaa
留言內容：`'), ((select username from jean_users where id=25) , (select password from jean_users where id =25))#`
![](https://i.imgur.com/ixHMRaR.png)

### 防範方法：`prepared statement`
```
$sql = 'insert into comments(username, content) values('?', '?')';
$stmt = $conn->prepare($sql);
$stmt->bind_param('ss', $username, $content);
$result = $stmt->execute();
$result = $stmt->get_result();
$result->num_rows;
$row = $result->fetch_assoc();
```
1. `$conn->prepare()`：
為 SQL query 做準備，會回傳（return）一個字串（string），之後會對這個字串做進一步的使用。

2. `$stmt->bind_param('ss', $username, $content);`：
將 SQL query 的字串帶上參數，其中`'ss'` 為插入的變數型態，舉例：`i`為該變數的型態整數、`s`為變數型態字串、`d`為變數型態浮點數。剛好 `$username` 與 `$content` 都是字串，所有就是 `'ss'`。

3. `$result = $stmt->execute();`：
執行先前準備好的 `$conn->prepare();`以及有參數的話，也要 `$stmt->bind_param();`，然後就執行 query。

4. `$result = $stmt->get_result();`
如果是執行 SELECT 的 SQL query，就可以使用這個指令來產生資料庫 query 的結果。

5. 如果執行的 SQL query 是 `UPDATE`、`DELETE` 或 `INSERT`，可以利用 `$stmt->affected_rows` 來確認有沒有更新、刪除、新增至 MySQL 資料庫內，另外也可以使用 `$stmt->num_rows` 來取得回傳幾行的結果

6. `$row = $result->fetch_assoc();`
取得 SQL query 相關聯的某行的一組資料。然後可以輸入欄位名稱，來獲取該行的欄位資料： `$row['欄位名稱']`

##  請說明 XSS 的攻擊原理以及防範方法
前情提要：
網頁有分成動態網頁跟靜態網頁，動態網頁就是利用 PHP 跟後台做連結取資料，靜態網頁就是 HTML 與 CSS 寫成的網頁那要怎麼把 PHP 跟 HTML 寫在同一個檔案呢？就是副檔名使用 PHP，當要執行 PHP 語法的過程，像是 apache 幫 php test.php 跑 php，然後 apache 幫 php 得到的 response 傳回去，而要執行 PHP 語法與資料庫後台連結的話，需使用 `<?php ?>` 包住，如果沒有被他包住的語法，在被瀏覽器解析 code（如 HTML 語法）然後被瀏覽器 render 出來。

### 攻擊原理
在客戶端可以輸入文字的地方，假如文字輸入了 JavaScript、HTML 的語法，就會被瀏覽器解析成 code，像是輸入 HTML 標籤，就會被解讀成 heading 1 的語法。
![](https://i.imgur.com/3RRpr4w.png)
範例二：在留言處輸入 Javascript 的語法 `alert()`，按送出後，就會跳出小窗。
![](https://i.imgur.com/Z5FL6wV.png)
![](https://i.imgur.com/oFdS2Oc.png)
範例三：輸入：`<script>location.href="https://www.google.com"</script>` 後，每次進入留言板（或頁面重新整理），就會導入 google 搜尋頁面，雖然在留言板內容為空白沒有文字，但是其實他隱藏了 Javascript 的語法，會自動導入到 google 頁面。這樣很危險，因為駭客可以將其導入到釣魚網站，竊聽使用者輸入的資料，然後竊取。

### 防範方法
利用跳脫 escape 字元，瀏覽器會把留言內容解析成語法，要避免這個方法就是將內容裡的有可能會變成語法的符號，例如 `<`、`>`、`/`、`&`、`"`、`'` 這些符號，進行 HTML 特殊字元編碼的轉換，即使是輸入`<alert>`，在顯示留言時，也會轉成：`&lt;alert&gt;`，在瀏覽器上 render 出來的話，就仍是 `<alert>` 的字面上英文字母與符號，不會變成 HTML、Javascript 的語法，遭受駭客攻擊導到釣魚網站。

## 請說明 CSRF 的攻擊原理以及防範方法
CSRF(Cross Site Request Forgery)：跨網站請求偽造攻擊，不需要使用 GET / POST request method，就可以發出請求，
### 攻擊原理
攻擊的駭客，透過網站上的一些漏洞，發出非該使用者的請求，或做一些惡意的攻擊（任意竄改他人留言或刪除他人留言）。

今天製作留言板的刪除功能，在刪除的功能運作上，是點刪除時，帶在 URL string query 上該留言內容的編號（id）
，如：`handle_delete_comment.php?id=xx`，然後在 handle_delete.php 上執行 SQL DELETE query 將該留言編號（id）的內容刪除，問題來了，如果我在 URL 上修改 string query，將 `handle_delete_comment.php?id=11`，就可以把其他編號的留言刪除（可能是其他人，也可能是自己的留言），這樣就繞過了「只能刪自己留言」的限制，同理如編輯留言，在點擊編輯按鈕時，使用URL query string 帶上 id 編號，然後再修改該編號的留言，並更新至 SQL 資料庫中，當然非留言本人，也可以利用修改 string query 來得到修改他人留言的目的。

### 防範方法
在進行 SQL query DELETE（舉例，如刪除留言） 或 UPDATE（編輯留言）時，原本只有在 id 編號多少的地方刪除留言，這樣一來，有惡意的攻擊者就可以利用 query string 來修改 id 編號，然後刪除他人留言。
如果要防範的話，可以多加一層驗證，就是當使用者名稱跟 cookie 的使用者身份相符合，這樣就可以刪除自己的留言，同時也限制他人惡意刪除、編輯他人的留言。

reference:
Q1:
[Fundamental difference between Hashing and Encryption algorithms--stackoverflow](https://stackoverflow.com/questions/4948322/fundamental-difference-between-hashing-and-encryption-algorithms)

[The 3 Applications of Hash Functions--Medium](https://levelup.gitconnected.com/the-3-applications-of-hash-functions-fab1a75f4d3d)

[Chapter: 2 Encryption and Its Applications--National Academy of Sciences](https://www.nap.edu/read/25010/chapter/4)

[聽說不能用明文存密碼，那到底該怎麼存？--Medium](https://medium.com/starbugs/how-to-store-password-in-database-sefely-6b20f48def92)

Q2:
[Understanding Hash Tables and rainbow tables--stackoverflow](https://stackoverflow.com/questions/35117950/understanding-hash-tables-and-rainbow-tables)

[PHP Include and Require Files--TutorialRepulbic](https://www.tutorialrepublic.com/php-tutorial/php-include-files.php)

Q3:相關指令查詢 php.net 的說明
 
Q4: 
[Can I escape HTML special chars in JavaScript?](https://stackoverflow.com/questions/6234773/can-i-escape-html-special-chars-in-javascript)