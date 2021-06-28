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


##  請說明 XSS 的攻擊原理以及防範方法

## 請說明 CSRF 的攻擊原理以及防範方法

reference:
Q1:
[Fundamental difference between Hashing and Encryption algorithms--stackoverflow](https://stackoverflow.com/questions/4948322/fundamental-difference-between-hashing-and-encryption-algorithms)

[The 3 Applications of Hash Functions--Medium](https://levelup.gitconnected.com/the-3-applications-of-hash-functions-fab1a75f4d3d)

[Chapter: 2 Encryption and Its Applications--National Academy of Sciences](https://www.nap.edu/read/25010/chapter/4)

[聽說不能用明文存密碼，那到底該怎麼存？--Medium](https://medium.com/starbugs/how-to-store-password-in-database-sefely-6b20f48def92)

Q2:
[Understanding Hash Tables and rainbow tables--stackoverflow](https://stackoverflow.com/questions/35117950/understanding-hash-tables-and-rainbow-tables)

[PHP Include and Require Files--TutorialRepulbic](https://www.tutorialrepublic.com/php-tutorial/php-include-files.php)