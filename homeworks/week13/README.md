## week 13 hw 1 陽春部落格
###### 請用這週學到的 CSS 預處理器重新改寫之前第十一週做的陽春部落格的 CSS 檔案。作業只需要把寫好的 SCSS 檔案複製過來就好，不需要放其他 PHP 的檔案。

### SCSS 檔案打包方式
1. `main.scss`：使用 `@import` 匯入以下 files，一併編譯（compile）成一個 CSS 檔案。
2. `_base.scss`：基礎設置
- variables 如：字型樣式、資料夾路徑
- font-size 如：字體大小
- reset 如：`margin`、`padding`、`box-sizing`
1. `_component.scss`：不受限任何區塊，如 footer 才能使用，例如 buttons，有需要就可以挪用的元件、模組等等。如：icon 圖片、
2. `_layout.scss`：版型相關，如 `header`、`footer`、`navbar`、每個頁面都會使用到的部分。
3. `_mixin.scss`：好像可以改成 `utils.scss` 放一些變數、工具類 class


### 作業心得紀錄：
如何將很多 `div` 的 background 打包成 `@mixin`？
在[這篇](https://stackoverflow.com/questions/5448044/sass-background-image-mixin/5448100) 查到怎麼打包 background，然後根據[此篇的 background 屬性介紹](https://ithelp.ithome.com.tw/articles/10250499)整理一下原 code：
```
background: url(./resources/icon_social-media/svg/041-linkedin.svg) center/cover no-repeat;
```
因為 icon 圖片的設置，如 `repeat`、`position`、`size`皆相同，只有資料夾路徑跟檔名不同，所以可以整理成如下：
```
@mixin background-image($path--rel,$img) {
	background-image: url('#{$path--rel}/#{$img}');
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
} 
```

## hw3：改寫第八週 Twitch 作業
###### 第八週有一個作業是串接 Twitch API，當時我們是用 XMLHttpRequest 這個 WebAPI 來做的。但是在新的標準中，有一個東西叫做 `fetch`，能夠用不同的語法發出 request 並且串接 API。

###### 而這個作業呢，就是要把第八週的那個 Twitch API 的作業從 XMLHttpRequest 改成用 fetch 來串接 API。
### 作業心得紀錄：
將 JavaScript 取得 API 與 JavaScript 新增、刪除 HTML 內容都包成 function。
在參考 week 13 的自我檢討後，發現寫的方法不太一樣，不知道在 `async & await` 的部分寫的對不對。
