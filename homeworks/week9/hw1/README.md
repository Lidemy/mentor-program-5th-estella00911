# 留言板製作的流程紀錄

<h2 id="workStream">規劃產品路由及功能</h2>
<ul>
  <li>index.php: 觀看所有留言</li>
  <li>handle_add_comment.php: 「新增」留言</li>
</ul>

<h3 id="css">切版</h3>
切出留言板的頁面。

<h3 id="HandleAddComment">送出並發布留言</h3>

**思考流程**

按下「Submit」按鈕 → 將輸入的資料放進MySQL 資料庫 → 從 MySQL 取出 → 在 index.php 發布留言

**製作步驟**
<h4>Step 1. 抓取提交表單的輸入內容</h4>


 index.php
 ```html=
 <form method='POST' action='handle_add_comment.php'>
     <span>Nickname:</span>
     <input type='text' name='nickname'></input>
     <textarea name='content'></textarea>
    <input type='submit' value='Submit'></input>
</form>
```

handle_add_comment.php
```php=
<?php
	$nickname = $_POST['nickname'];
	$content = $_POST['content'];
?>
```

<hr>
<h4>Step 2. 連結 MySQL 資料庫 & 顯示連結錯誤訊息</h4>

handle_add_comment.php
```php=
<?php
require_once('conn.php');
$result = $conn->query('SELECT * FROM jean_users');
if (empty($result)) {
  die($conn->error);
}
?>
```

conn.php
在 `username`、`password`、`dbname` 中隨便寫個錯誤，偵測有沒有跳出錯誤訊息。
```php=
<php?
$username = '<username>';
$password = '<password>';
$dbname = '<錯誤的dbname>';
$conn = new mysqli($servername, $username, $password, $dbname);
if (!empty($conn->connect_error)) {
   die('資料庫連線錯誤' . $conn->connect_error);
}
?>
```
結果：
成功偵測如下：
![](https://i.imgur.com/Zl3oFSL.png)
<hr>

<h4><a name="step3">Step 3.</a> 將表單輸入內容放入 MySQL 中</h4>

錯誤想法：
handle_add_comment.php

```php=
// 從表單抓取輸入值 
$nickname = $_POST['nickname'];
$content = $_POST['content'];
// [ERRROR!!!] 將表單輸入值放入 db
$result['nickname'] = $nickname;
$result['content'] = $content;
```

正確作法：
handle_add_comment.php
```php=
<?php
  // 抓取表單提交的輸入內容
  $nickname = $_POST['nickname'];
  $content = $_POST['content'];
  
  // 將留言內容放入 MySQL 資料庫內
  $sql = sprintf(
    "insert into jean_comments(nickname, content) values('%s', '%s')",
    $nickname,
    $content
  );
  $result = $conn->query($sql);
  
  // 偵測 MySQL 有沒有正確新增資料
  if (!$result) {
    die($conn->error);
  }
  
  // 頁面自動跳轉回 index.php
  	header("Location: index.php");
?>
```
犯的小錯誤：
1. 放入 MySQL 有 MySQL 自己一套的輸入語法，不能用自己的想法來寫，要按照 MySQL 程式的邏輯寫。
2. `sprintf()` 用法：
其中：
(1) `jean_comments` 為 `<dbTable>`，`nickname` 與 `content` 為該 `<dbTable>` 內參數資料的欄位名稱。
(2) `%s` 為 `sprintf` 替代的變數輸入代號，不同字母分別代表不同形式，如 `%s` 表字串形式、`%d` 表十進制數。
(3) 另存 `$sql` 變數的原因是，可以增加可讀性，也易於修改及維護。
```
sprintf(
    "insert into jean_comments(nickname, content) values('%s', '%s')",
    $nickname,
    $content
  );
  ```

<h4>Step 4. 在 <code>index.php</code> 顯示送出的留言內容 </h4>

1. 從資料庫撈資料 v.s. 取用資料在 php 使用  

 * **從資料庫撈資料**
 `$result = $conn->query(新增、刪除、修改、搜尋);`
  僅是從資料庫裡面撈資料，若需要進一步在 php 使用，需要參考下一個「取用資料」。
 
 * 取用資料 ＆ 在 php 使用
 `$row = $result->fetch_assoc();`
 而且一次取用一筆，所以可以使用 `while` 判斷是否有資料（true or false），true 的話，就取用資料。

2. **知道怎麼取資料後，要怎麼讓 index.php 可以顯示發布的留言呢？**
* `handle_add_comment.php`：將表單提交的輸入內容放入 MySQL 裡，並撈出資料。（在[Step. 3](#step3) ）
* `index.php`：從 MySQL 中取用資料，並發布留言。
利用 php 特性（`<?php ... >` 才能執行 php，在這個以外的可以使用 `html tag`）

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**(1)** @ index.php 利用 php 語法來連結資料庫，從 dbTable (`jeans__comments`) 撈資料，並判斷有沒有成功取得資料。
```php=
<?php
  require_once('conn.php');  //連結資料庫

 // 從 db 撈取資料，並判斷有無錯誤訊息。
  $result = $conn->query("select * from jean_comments order by id desc");
  if (!$result) {
    die('Error:' . $conn->error);
  }
?>
```

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**(2)** @ index.php 拿取並使用 dbTable 內的資料，用於顯示所有的留言。 
```php=
<?php
while ($row = $result->fetch_assoc()) {
?>

  html tags 穿插放入 php語法： <?php nickname in db ?>, <?php created_at in db ?>, <?php content in db?>

<?php } ?>
```
撈好資料，就可以使用 `$row = $result->fetch_assoc()` 來取得資料並在 php 中使用，不過這只有取得一行資料，若要取得所有資料的筆數，可以使用 `while` 判斷 `$result->fetch_assoc()` 存在（true）。



3. **成功加上新增留言的功能後，要 debug，例如：沒有填寫完整的話，要提示然後填寫完整才可以新增留言**
**(1) 判斷 nickname 與 content 的是否為空。**
   &nbsp;&nbsp;&nbsp;&nbsp; a. 是 @ index.php 裡面寫判斷式呢？
&nbsp;&nbsp;&nbsp;&nbsp; b. 還是 @ handle_add_comment.php 裡面寫判斷式呢？
&nbsp;&nbsp;&nbsp;&nbsp; 因為需要在 index.php 顯示「資料輸入不正確，請填寫完整」，所以我覺得應該是放在 index.php 內。
&nbsp;&nbsp;
**(2) 第一次嘗試**
```php=
<h1>Comment</h1>
<?php
  if(empty($_POST['nickname']) ||empty($_POST['content'])) {
  $msg = '資料錯誤請重新填寫';
?>
<h2><?php echo $msg ?></h2>
<?php } ?>
```
![](https://i.imgur.com/6TxSwmJ.png)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**(3) 第二次嘗試**
我覺得好像不能在 index.php 判斷，我突然想起來範例影片好像是在 `handle_add_comment.php` 利用 `header` 將其導到一個錯誤的網址（例如：`https://... index.php?errCode=1`，然後再在 index.php 判斷網址上的 errCode 寫判斷式顯現「資料輸入不齊全」。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a. 先在 `handle_add_comment.php` 判斷兩個輸入框是否有空，若有空的話，利用 `header` 導入一含有 query string 的網址——`https:// ... index.php?errCode=1`，並使用 `die()` 結束執行。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; b. 在 index.php 判斷 errCode 是否存在、是否為 1，是的話，就顯現「`<h3> 資料輸入不齊全</h3>`」


**在 `handle_add_comment.php` 流程問題：**

**問題敘述：**「判斷輸入框是否為空」應該放在前半部，還是放在 code 結尾？
* **狀況 1：「判斷輸入框是否為空」放在後半部：**
    這樣的話，會先把輸入框內容放入資料庫後，才判斷輸入框是否為空。意思就是：當資料被放入 MySQL 後，就會被 index.php 中 `$conn->fetch_assoc()` 讀取，也就是說會被發布到留言中，所以這個方法行不通。

* **狀況 2：「判斷輸入框是否為空」放在前半部：**
    先判斷是否為空，為空的話，就連資料都不要 key 進 MySQL，這樣才能有效偵測輸入不完全的資料被新增到 MySQL 裡面。

**錯誤：「判斷輸入框是否為空」放在後半部**
```php=
<?php
	require_once('conn.php');

	$nickname = $_POST['nickname'];
	$content = $_POST['content'];
	// 將輸入的內容放入 MySQL
  $sql = sprintf(
    "insert into jean_comments(nickname, content) values('%s', '%s')",
    $nickname,
    $content
  );
  $result = $conn->query($sql);
  
  // 判斷輸入框是否為空
  if (empty($_POST['nickname']) 
	|| empty($_POST['content'])) {
	header("Location: index.php?errCode=1");
	die('資料不齊全');
}
	header("Location: index.php");
	
?>
```
<br>

**正確：「判斷輸入框是否為空」放在前半部**
```php=
<?php
	require_once('conn.php');
	
// 判斷輸入框是否為空
if (empty($_POST['nickname']) 
	|| empty($_POST['content'])) {
	header("Location: index.php?errCode=1");
	die('資料不齊全');
}

// 將輸入框的資料新增至 MySQL
	$nickname = $_POST['nickname'];
	$content = $_POST['content'];

  $sql = sprintf(
    "insert into jean_comments(nickname, content) values('%s', '%s')",
    $nickname,
    $content
  );
  $result = $conn->query($sql);

  if (!$result) {
    die($conn->error);
  }

	header("Location: index.php");
?>
```

---

**在 `index.php` 遇到的小問題：怎麼把漏填寫輸入框的錯誤訊息提示印出來？**

**問題敘述：** 要怎麼把 `<h3>` 放在 `<?php  ... ?>` 裡面？

**錯誤想法：將 `<h3>` 與 `php code` 分開**
這樣一來，不論在 php 內怎麼寫判斷式， index.php 始終會顯現(`echo`） `$msg = '資料錯誤請重新填寫'`
```html=
<!-- index.php -->
<h1>Comment</h1>
<?php
  if(empty($_POST['nickname']) ||empty($_POST['content'])) {
  $msg = '資料錯誤請重新填寫';
?>
<h2><?php echo $msg ?></h2>
<?php } ?>
```
![](https://i.imgur.com/6TxSwmJ.png)
<br>
**正確想法：將 `<h3>` 寫在 `php code` 的字串內**
寫在字串內的話，就會直接在瀏覽器 echo 出 `<h3>資料錯誤請重新填寫</h3>`，然後在瀏覽器 render 的時候，會把 `<h3>` 變成 html 標籤，如此一來，判斷式就完成判斷，並印出錯誤訊息。
另外補充：為什麼要多判斷一次 `$code = 1` 呢？因為可以套用在其他偵測可能會有多個錯誤的地方，也許該錯誤不只一個，有二到三個，這樣就可以用 `$code = '1', '2', '3'`，如此一來，多判斷一次 errCode 為何數值，就可以使用同一個判斷式，只要再增加 `else if...`，利用「登入」的功能來舉例： `else if ($code == '2' ) { echo '密碼錯誤'} else if ($code == '3' { echo '無此帳號'}) `。
```php=30
<form class='board__new-comment-form' method='POST' action='handle_add_comment.php'>
<h1>Comment</h1>
<?php
  if (!empty($_GET['errCode'])) {
    $code = $_GET['errCode'];
    $err = 'Err!!!';
    if ($code === '1') {
      $msg = '資料輸入不齊全';
    }
echo '<h2 class="error">Error:' . $msg . '</h2>';
 }
?>
```

---

**在 `index.php` 遇到的小問題：**
使用 query string 導到錯誤頁面，那怎麼取出 query string 的錯誤訊息？因為 form 提交是使用 POST method，但是 `index.php?errCode=1` 也不是被表單提交呀！好像不能使用 `$_POST` 取得 errCode 的 value，應該是哪裡觀念漏掉！

後來想起來了！在 GET method 中使用表單提交，輸入的參數會以 query string 的方式存在網址上，若要取得 query string 的值（value），在 php 內可以使用 `$_GET['參數']`，而此時query string 網址的參數便是 `errCode`，值為 1，這樣就可以實現：在 `handle_add_comment.php` 執行「表單送出」的動作，同時偵測有沒有輸入框都填寫；同時利用 query string 的方法，將 query 傳給 index.php，然後在 index.php 中就可以利用 query string 得到 `handle_add_comment.php` 判斷輸入框皆填寫的結果。

<h2 id="loginAndRegister">規劃會員路由及功能</h2>
<ul>
  <li>register.php：註冊頁面（實際看得到的頁面）</li>
  <li>login.php：登入頁面（實際看得到的頁面）</li>
  <li>logout.php：登出（功能，沒有頁面）</li> 
  <li>handle_register.php：處理註冊邏輯（功能，沒有頁面）</li>
  <li>handle_login.php：處理登入邏輯（功能，沒有頁面）</li>
  </ul>

<h3 id="css">切版</h2>

<h4>register.php</h4>

因為是從 index.php 複製過來的檔案，我發現在 class 命名上不能太客製化，可能在 index.php 是 new-comment，但是在 register.php 只是一個 box，或者是在 `index.php` 的 nickname 輸入框 `class='board__input-nickname'`，但是在 `register.php` 的 `username、password、nickname` 的文字輸入框，就得每個都命名一個 `class='board__input-xxx'`，這樣其實不是一個好命名，因為需要在 style.css 在不同 class 中增加一樣的樣式，而且在不同的 php 檔案裡面，可能樣式有小小的不同，這樣只要有一點不同，就創新的 class，其實滿亂的，後來就在想可不可以改成：文字輸入框相同的 CSS 樣式，就把 class 命名為 `'board__input'`，如果有個別需要的 CSS 樣式，再另外新增 class：如在註冊頁面的文字輸入框需要置中，所以我可能需要新的 class 來設定 CSS 樣式，就可以命名為`'board__input-register'`，這樣一來，就可以盡量把相同的樣式跟不同的樣式分開，而且這樣就不會把 class 樣式複雜化。

我後來再翻看影片範例的 class 屬性，後來發現其實不管文字輸入框是在 username、nickname、password，好像都是同一個 `class='board__nickname'`，沒有特別更改，但也因此沒有造成在複製舊頁面，製作新頁面時發生 class 太複雜的困擾。

這表示我的 class 命名方式可以再改進。

<h3 id="">實作註冊功能</h3>

**製作步驟**

1. register.php （實際「看得見」的註冊頁面）
輸入要註冊的 username、nickname、password。
2. handle_register.php （註冊「功能」頁面）
(1) `require_once('conn.php');`：連結資料庫
(2)  `$_POST`：從 register.php 獲得輸入的值
(3) `$conn->query("INSERT INTO ...")`：將資料新增至MySQL
(4) `偵測錯誤`：例如：帳號已被註冊、資料填寫不齊全
&nbsp; &nbsp; &nbsp; 方法：URL query string 特性及 GET method 獲取參數的方式。
&nbsp; &nbsp; &nbsp; a. 帳號已被註冊：需要在 MySQL 將 username 視為「唯一」
&nbsp; &nbsp; &nbsp; b. 資料填寫不齊全：三個任何一個為 empty。
(5) `header();`：返回留言板頁面

**思考細節**

**思考 1：**

註冊時發生的錯誤，如：帳號已被註冊、資料填寫不完全的功能如何實作？是應該放在 register.php？還是 handle_register.php？

**分析** 

若要把「帳號已被註冊、資料填寫不完整」等訊息提示顯示在實際頁面（register.php），就需要把提示寫在 register.php，那要怎麼判斷呢？

**判斷方式**

在 handle_register.php 在偵測到錯誤時，於 URL 加上 query string。在註冊時，顯示：「Duplicate entry 'aaa' for key 'username'」（重複的 username），那要怎麼抓取這個訊息錯誤，並導至（header）含 query string 的 index.pnp？

**註冊時，可能出現的錯誤**
* **資料填寫不完整**
在按下註冊按鈕，表單的 action 會導至 handle_register.php，此時可以先判斷是否為空，如果不是空的，再新增至 MySQL 裡面，若有空，就導至 register.php?errCode=1，讓 register 可以根據 query string：errCode 來顯示「資料填寫不完整」。
* **帳號已被註冊**
 就是依據「按下」按鈕送出「註冊」的那個地方判斷，所以我們會使用到先前在發布留言在 handle_xxx.php 加上 URL query string 的方法，讓 register.php 可以藉由 URL query string 來判斷是否跳出錯誤訊息提示。
 
**想法套用至實際操作**

**思考 1**
1. **如何使用 PHP 的 errno 錯誤代碼呢？**
* `$errCode = $conn->errno;`？
* `$errCode = $result->errno;`？
2. **PHP 的 errno 錯誤代碼的形式為 number 或 string？**
為什麼要在意他的形式呢？因為我想要使用判斷式，來判斷 errno 的錯誤代碼，然後給出相對應錯誤的訊息提示。

以下擷取部分的 code：
```php=
// test in hangle_register.php
<?php
  $result = $conn->query($sql);

  $errCode = $conn->errno;
  // $errCode = $result->errno; // nothing happen;
  if ($errCode === 1062) {
  	echo 'number'; //correct
  } else if($errCode ==='1062') {
  	echo 'string'; // incorrect
  }
?>
```
--- 
**思考 2：**
「新增至 MySQL」與「判斷 errCode=1062 code」哪一段 code 放前面？有差嗎？（備註：在 MySQL 已經標 username 為唯一。

這段判斷「username 重複」的 code，到底要放在哪？
```php=
$errCode = $conn->errno;
if ($errCode === 1062) {
  header("Location: register.php?errCode=2");
  die();
}
```
以下為好幾個放置段落的參考：
```php=
<?php
  require_once('conn.php');

  if (
  	empty($_POST['nickname']) || 
  	empty($_POST['username']) ||
  	empty($_POST['password'])
	) {
  	header("Location: register.php?errCode=1");
  	die();
	}
	
/* 
放置位置一：錯誤
原因：註冊的內容尚未被新增至 MySQL，所以 MySQL 還沒有辦法判斷這個新的 username 是否有與 MySQL 內的 username 重複！所以沒有辦法在 $conn->error 給出「Duplicate entry 'aaa' for key 'username'」，或者是在使用 $conn-errno 時，給出 1062 數字的錯誤代碼。
*/

  $nickname = $_POST['nickname'];
  $username = $_POST['username'];
  $password = $_POST['password'];

  $sql = sprintf(
  	"INSERT INTO jean_users(nickname, username, password) VALUES('%s', '%s', '%s')",
  	$nickname, 
  	$username, 
  	$password
  );

  $result = $conn->query($sql);

/*
放置位置 2：正確
// 原因：在放入 MySQL 後，MySQL 發現 username 重複後，會給出錯誤訊息（可以從 $conn->error 或 $conn->errno 得知），這樣一來就可以導向 URL query string 到 ?errCode=2，第二個錯誤：username 已被使用。
*/

  if(!$result) {
/*
放置位置 3：好像也正確耶！
原因：利用 echo 'sucessfully 偵測到 errCode = 1062'; 取代 導向 errCode=2 的頁面，可以發現仍然可以執行。
我覺得會不會是 MySQL 發現 username 重複後，就沒有將新內容「新增」至 MySQL ，所以在 $result = $conn->query("INSERT INTO...") 是失敗的，所以$result = false，所以 !$result = true，這樣就會執行判斷 errno 為 1062 的話，就是 username 已被註冊的錯誤。
*/
  echo $result->error;
  	die();
  };

  header("Location: index.php");
?>
```
--- 
**思考 3：**
衍伸另一個問題：放在 `if(!result)` 裡面 vs. 外面的差異在哪？
我覺得可能是統一包覆「錯誤」?

--- 
**待辦事項**
1. 前端後端的驗證比較差異？
2. 增加先前所學的 js 表單驗證
(1)  * required 
(2) incorrect password or username
(3) 提示：
a. this username is already registered. want to login or recover your password? 
b. sign in unsuccessful. Please try again.
(4) 在輸入框右邊增加 strong / weak / safe 提示密碼是否安全


---

<h3 id="">實作登入功能</h3>

**製作步驟**
1. register.php （實際「看得見」的登入頁面）
輸入要登入的 username、password。
1. handle_register.php （登入「功能」頁面）
(1) `require_once('conn.php');`：連結資料庫
(2) `$conn->query(SELECT * ... where username = '' and password = '')`：輸入的 username 與 password 是否符合 MySQL 內的資訊？
(3) `***`怎麼得知是否符合MySQL 內的 username 和 password？
(4) 錯誤訊息提示：輸入的帳號或密碼錯誤、輸入不完整。

---

**思考細節**

**思考 1：** 
`$conn->error` 跟 `$result->error` 的差異？或者是有使用`$result->error`這種方式查錯誤的指令嗎？

---

**思考 2：**
怎麼得知是否符合 MySQL 內的 username 和 password？
不論輸入正確或錯誤的帳號密碼，頁面會跳轉為空白的 handle_login.php（如下圖）。
![](https://i.imgur.com/dDCY82l.png)
![](https://i.imgur.com/wPCrxuE.png)

**Code**
```php=
<?php
  require_once('conn.php');

// 將輸入的內容存為變數
  $username = $_POST['username'];
  $password = $_POST['password'];

// 在 MySQL 中尋找有沒有跟 $_POST['username'] 和 $_POST['password'] 相符合的資料，如果符合就是有這個使用者帳號與密碼，就登入成功；反之，就登入失敗。
  $sql = sprintf(
  	"SELECT * FROM jean_users where username = '%s' and password = '%s'",
  	$username,
  	$password
  );
  $result = $conn->query($sql);
  
  // 判斷在 MySQL 查詢資料有沒有出錯誤：
  if (!$result) {
  	echo $conn->error;
  	echo 'failed to login';
  	die();
  }
echo 'successfully login';
?>
```
那這樣到底是有沒有登入成功呢？因為在 `if (!$result) {die($conn->error);}` 的判斷式，也沒有執行跟顯示錯誤，那到底是哪裡出了錯呢？
現在就來嘗試看看印出 `$result` 或者是 `$conn->error`
```php=
// 嘗試增加這兩行，看有沒有辦法印出什麼資訊。
  echo 'result:' . $result . '<br>';
  echo 'conn->error:' . $conn->error . '<br>';
```

一樣輸出結果為一片空白：
![](https://i.imgur.com/wPCrxuE.png)

這時候，靈光一閃，好像記得在 PHP 印出結果，好像有幾個方法：`var_dump($var);`、`echo 'string';`、`print_r($var)`，既然前面使用 `echo` 失敗，那來嘗試簡易版的`print_r($result)`。得到輸出結果：
> mysqli_result Object ( [current_field] => 0 [field_count] => 5 [lengths] => [num_rows] => 0 [type] => 0 )

居然有輸出結果了耶！那來試試看正確與錯誤的帳密有沒有什麼不同好了。
> **正確**的 username 與 password，輸出結果為：
> mysqli_result Object ( [current_field] => 0 [field_count] => 5 [lengths] => [num_rows] => 1 [type] => 0 )
>  
> **錯誤**的 username 與 password，輸出結果為：
> mysqli_result Object ( [current_field] => 0 [field_count] => 5 [lengths] => [num_rows] => 0 [type] => 0 )

我發現正確與錯誤的帳密不同之處在於 `num_rows`，再來看怎麼樣把這個參數取出來，研究一下。
現在要嘗試看看，如何把 `num_rows` 取出，利用在 PHP 語法基礎提過的一些取參數的方法如下：
```php=
  print_r($result['num_rows']); // 錯誤
  print_r($result_num_rows);  // 錯誤
  print_r($result->nums_rows); // 正確
```
知道怎麼取出來 `num_rows` 了，但是我忽略了一個最重要的問題，那 `num_rows` = 1 或 0 分別代表什麼意思呢？
回憶一下前面所得出的結果：
1. 正確的帳密 → `num_rows = 1`
2. 錯誤的帳密 → `num_rows = 0`

**到底是代表 Boolean 值（1 為 true；0 為 false）呢？還是代表幾筆符合？**

所以現在在資料庫建立兩筆使用者資料，其中密碼設成一樣的，來嘗試看看查詢 `password = 'aaa'`。下表建立兩筆使用者的資料：
| id | Username  | Password |
| --- | --- | --- |
| 1 | aaa | aaa |
| 2 | bbb | aaa |

MySQL 指令來查詢 `password = 'aaa'`得：`$conn->query("SELECT * FROM jean_users where password = 'aaa'");`

輸出結果如下：
> mysqli_result Object ( [current_field] => 0 [field_count] => 5 [lengths] => [num_rows] => 2 [type] => 0 )
num_rows: 2

再對照上表，可以發現也是兩筆符合 `passwrod = 'aaa'`，然後在 `num_rows => 2`，所以可以從這裡得知： `num_rows` 的意思是「**符合查詢 MySQL 條件的資料筆數**」。


**（補充）此為 code 執行後，詳細印出帳密與輸出結果**

因為前面段落只有以文字的形式印出 `print_r($result->num_rows);`，在此以比較詳細的印出結果來表示：
在 `Error:` 與 `errno: 0` 可以得知在 MySQL 搜尋特定條件的資料，沒有發生錯誤，但是我們的目標是找到符合的資料，而不是在搜尋時有無出錯。

```php=
<?php
  require_once('conn.php');

  $username = $_POST['username'];
  $password = $_POST['password'];

  $sql = sprintf(
  	"SELECT * FROM jean_users where username = '%s' and password = '%s'",
  	$username,
  	$password
  );
  $result = $conn->query($sql);
  
  // 印出正確 or 錯誤帳密的輸出結果，可先跳過，直接下方圖片的看輸出結果。
  echo 'correct username and passwrod is "aaa" and "aaa". <br>';
  echo 'input username: ' . $username . '<br>';
  echo 'input password: ' . $password . '<br>';
  echo '<br>';
  echo '<br> num_rows:';
  print_r($result->num_rows);  // num_rows=1
  echo '<br>';
  echo 'error:' . $conn->error . '<br>';  // nothing
  echo 'errno(0=no err):' . $conn->errno;  // 0 = no err occured.

  if (!$result) {
  	echo $conn->error;
  	die();
  }
  // header("Location: index.php");

?>
```

* 正確的 username 與 password：
![](https://i.imgur.com/wjvVxNG.png)

* 錯誤的 username 與 password：
![](https://i.imgur.com/KgavKfZ.png)

從這兩張輸出結果，可以發現輸入帳號密碼正確與否的差異為 `num_rows`，當正確的時候`num_rows=1`，錯誤的時候`num_rows=0`，也就是說在 MySQL 尋找 `username ='帳號'` 與 `password = '密碼'` 時，有符合的會回傳 `1`，若不符合，則回傳 `0`。

--- 

**思考 3：**
整理一下在製作登入及註冊功能時，需要考慮到可能會發生什麼樣的問題，以及要製作並套用該功能？

**可能發生的問題：**
* 登入時，可能會遇到的問題：
    * 帳密其中一個輸入錯誤。
    * 帳號或密碼填寫不完整。
* 註冊時，可能會遇到的問題：
    * 此帳號已被註冊。
    * 填寫不完整。

**可能發生的問題：**

想好大概會實際操作會遇到的問題後，開始判斷是需要將 action、if 寫在（以註冊為例）register.php（實際頁面） 還是 handle_register.php（功能製作）上？

在按下「註冊」按鈕時，代表送出內容，若要在輸入值上做一些判斷，就需要在`handle_register.php` 透過 PHP 取得參數的 `$_GET['']` 或 `$_POST['']` 來判斷。

進一步需要在實際頁面做出反應的話，就需要連接實際頁面的 php 檔案與功能製作的 php，那要怎麼連接呢？在此練習的方法是以 `header` 頁面導向至自己實際頁面並附上 URL query string（藉此傳回在 `handle_register.php` 判斷得出的結果），然後可以再實際頁面的 register.php 寫判斷式，當發生「帳密輸錯」的狀況時，顯示「帳密輸入錯誤，請再輸入一次」諸如此類的提示訊息。



---
