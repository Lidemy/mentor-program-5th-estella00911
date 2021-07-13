## 請簡單解釋什麼是 Single Page Application
Single Page Application 縮寫為 SPA，中文為單頁應用程式，如全名其實只有一個 html 檔案的應用程式，使用起來很流暢，不需要經過換頁、重新跳轉頁面，就可以達到基本的資料刪除、新增、編輯等等的功能，不用重新載入頁面就可以動態從資料庫更新資料，使網站與使用者產生了互動感，也提升了使用者體驗。

## SPA 的優缺點為何
參考 [Advantages & Disadvantages of Single Page Application](https://www.skenix.com/advantages-disadvantages-of-single-page-application/)
### SPA 優點
1. 網頁與使用者的互動性
2. 有了 SPA 在單頁面就可以獲取資料，這樣就不用讓 server 再去載入其他頁面
#### Fast and Flexible
使用 SPA 只會動態新增需要的內容，只會傳輸需要的資料，加上大多數的資料及 DOM 只需要載入一次，所以降低了使用者等待頁面載入的時間。
#### 網頁與使用者的互動性
使用者在網頁做新增、編輯等等的動作時，網頁可以動態的更新資料，讓使用者與網頁有互動感。
#### 緩存功能
進入 SPA 的網頁中，當使用者需要新增某個資料時，SPA 有暫時儲存本地的數據，所以不需要發送請求讓伺服器把所有資訊取出來再透過網頁 render，這時，伺服器只會傳輸使用者需要的資料，如此一來就算使用者處在網路不好的地方，也可以在網路傳輸速度有限的情況下，獲取需要的資料。
#### 可以利用瀏覽器找 bug
在 SPA 網站裡找 bug 方便許多，因為 SPA 是使用框架如（JavaScript、Typescript）來開發的，這些框架具有網站的開發工具可以使用，讓開發人員可以更方便的調整、嘗試。
### SPA 缺點
#### SEO 搜尋優化問題
因為 SEO 主要是依賴 html 的 meta 標籤及 URL 針對內容、關鍵字的抓取，但是 SPA 是根據使用者的請求，使用 JavaScript 向伺服器拿取資料，但不會將使用者請求取得的資料放在 html 頁面裡面，所以這樣增加了 SEO 在 SPA 搜尋上的困難，大多數的網頁內容，無法透過爬蟲或者是 SEO 依賴的 meta 標籤來獲取資料。
#### 安全性的問題
只要需要使用 JavaScript，就會有受到 XSS 攻擊上的疑慮，只要是使用者可以輸入值的地方都要保持懷疑，需要注意將可能會變成 JavaScript、HTML 語法的文字，如`<`、`&`、`>` 等等，都轉成編碼呈現，還有其他的攻擊如惡意代碼需要防範，才不會讓別人惡意獲取資料或注入腳本。（參考：[前端安全系列（一）：如何防止XSS攻擊](https://kknews.cc/zh-tw/tech/grl4lj8.html)）

#### 首次渲染速度慢

## 這週這種後端負責提供只輸出資料的 API，前端一律都用 Ajax 串接的寫法，跟之前透過 PHP 直接輸出內容的留言板有什麼不同？

### 1. Client-side rendering（CSR）：前端渲染
#### 例子：第十二週的 API 留言板
#### 解釋：
後端只負責輸出資料的 API（如： JSON 資料），前端（index.html）使用 Ajax 串接的寫法，取出 API 資料。

### 2. Server-side Rendering（SSR）：後端渲染
#### 例子：第九週透過 PHP 直接輸出內容的留言板
#### 解釋：
在 html 裡面夾著 PHP 的語法，利用 PHP 語法，舉例如下：
```
// index.php 留言板
<body>
<tbody>
   // 從 PHP 取資料，後端渲染
    <?php 
      while($row = $result->fetch_assoc()) {
    ?>
    <tr>
        <td><?php echo escape($row['id']); ?></td>
        <td><?php echo escape($row['username']); ?></td>
        <td><?php echo escape($row['nickname']); ?></td>
        <td><?php echo escape($row['status']); ?></td>
        <td><a class='board__edit-btn'>suspend</a></td>
    </tr>
<?php } ?>
</tbody>
</body>
```
index.php 為留言板的主頁，將 PHP 語法包在 `<?php ?>` ，利用 PHP 可以被嵌入於 HTML 語言的特性，在後端 PHP 的檔案裡寫好：server 先建立好要回傳的 HTML 內容。當使用者在頁面裡每發送一個 request 要獲取資料時，都會在 PHP 處理：先從 server 先抓取資料，再建立起 HTML 內容後，才會回傳 response，瀏覽器再渲染（render）出頁面。

### 差異
#### SEO
當在瀏覽器中的頁面上按右鍵，點選「檢視網頁原始碼」時，後端渲染因為資料是在後端處理好，將 HTML 內容回傳，所以可以在網頁原始碼中找到 HTML 的內容。  但是在前端渲染，由於初始網頁的 HTML 檔案沒有資料內容，是後來使用者使用 Ajax 發送請求取資料後， JavaScript 生成的內容，所以在檢視網頁原始碼時，呈現的內容為初始的 HTML 檔案，而不是使用者發送請求後得到的資料，這讓網站在 SEO 搜尋下會有困難。
#### 前後端分工
在前端渲染（CSR）可以好好的將前端與後端分工，後端只要寫好 API 文件，將資料整理好給前端，前端只要負責串 API，並渲染在前端就好。
但如果是 SSR，像是第九週寫的留言板（主頁 index.php），就需要在 PHP 檔案內夾雜 PHP 語法，這讓製作留言板的過程裡，同時要會前端的 HTML、CSS，還要會後端的 PHP 語法，前後端都要會一些。


參考
[React服務端渲染CSR和SSR](https://codertw.com/%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80/698790/)
[Advantages & Disadvantages of Single Page Application](https://www.skenix.com/advantages-disadvantages-of-single-page-application/)