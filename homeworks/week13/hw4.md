## Webpack 是做什麼用的？可以不用它嗎？
### Webpack 是做什麼用的？
webpack 是將原始碼（例如：SCSS、瀏覽器看不懂最新的語法）打包處理過後，放上去瀏覽器，因為原本的原始碼放上去瀏覽器沒辦法執行，所以需要 webpack 將檔案打包好讓瀏覽器去執行。有了 webpack 的使用，我們可以像是在 node.js 環境一樣，引用一些 npm 的第三方模組，因為在原本的瀏覽器上不支援 `node.js` 環境上的 `require` 指令，所以不能在瀏覽器使用一些 npm 的套件。


> 「前端的世界很簡單，不支援的東西，寫工具自己支援就好了。」，這邊要稍微修改一下，變成：「前端的世界很簡單，不支援或是支援度很差的東西，寫工具自己支援就好了」。
就是因為瀏覽器原生的模組機制會碰到許多問題（相容性、無法兼容 npm 等等），所以我們才需要一個額外的工具。
而這個工具，就是 webpack。
擷取自：[webpack 新手教學之淺談模組化與 snowpack
](https://blog.huli.tw/2020/01/21/webpack-newbie-tutorial/)

此時就希望可以寫一個工具自己支援瀏覽器沒有支援的功能，工具就是 webpack，有了 webpack，就可以將一些工具藉由 webpack 打包後放在瀏覽器上使用，例如：引用 npm packages、將多個 JS 檔案打包成一個檔案、最小化優化 code。

### 可以不用它嗎？
如果專案的規模很小，如果只需要 JavaScript、HTML、CSS 等等的 code 為基礎製作的網站，那使用 webpack 可能會超出預期的需求。如果是製作相對較複雜的前端專案，其中包含著很多設置，如 CSS、圖片、字體等等，那使用 webpack 對於管理、維護、製作上會有幫助。


## gulp 跟 webpack 有什麼不一樣？

| 差異     | Gulp                                                                                                            | webpack                                                                            |
| -------- | --------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| 名稱含義 | task manager（管理任務工具）                                                                                    | module bundler（模組打包工具）                                                     |
| 目的     | 將每日例行的事情寫成自動化的任務，可以透過執行 code 來執行任務，完成重複的事情                                  | 利用 module 的概念，將 code 打包，讓 code 可以分享跟取用他人的資源                 |
| 舉例   | 執行一行指令，就可以將 SCSS 編譯 CSS<br>也可以打一行指令，讓 babel 將最新的 JS 轉換成舊瀏覽器也看的懂的 JS 語法 | 利用模組化的方式，可以引用別人的模組或者是內建模組的功能，也可以將 code 打包成模組給別人使用，例如 disqus 將留言板的功能打包之後，別人就可以引用這個留言板到部落格上。 |
| 差異 | 為任務管理工具，所以將能例行化的各種類別任務，都可以寫成任務後自動化執行，精簡工作量 | 將資源、個別功能打包後為模組化的功能，便於使用模組來開發。 |

Gulp 與 webpack 也有使用上一些重複的地方，例如：利用 Babel 把現在最新的 JS 語法編譯成舊的語法、將 SCSS 編譯成 CSS 的 code 或是壓縮 code 及圖片的大小，在 Gulp 裡，這些是一些重複相同工作的方法，所以就可以寫成一個任務：`compile JS`、`compile CSS
`、`minify pictures` 的固定流程自動化：在 webpack 裡則是在把各個檔案如： SCSS、最新語法的JS、圖片檔打包成瀏覽器看的檔案之前，需要做資源的轉換，而這個資源轉換就是上述做的事情：如：利用 Babel 把現在最新的 JS 語法編譯成舊的語法、將 SCSS 編譯成 CSS 的 code 或是壓縮 code 及圖片的大小，所以會有一些重複的地方，但是本質上是不同的概念，Gulp 是任務管理的工具，輔助我們將例行的事件自動化寫成 code，只要打一行指令，就可以完成例行事項；然後 webpack 是可以將網路的資源模組化，

## CSS Selector 權重的計算方式為何？
[CSS Specificity Calculator](https://specificity.keegan.st/) 可以使用這個來計算 CSS Selector 的權重。
`inline styles` > `ID selectors` > `Class`, `Attribute`, `Pseudo-Class Selectors`> `Element and Pseudo-Element Selectors`

| specificity | 條件                                                                |
| ----------- | ------------------------------------------------------------------- |
| 1-0-0-0   | HTML inline style                                                   |
| 0-1-0-0   | ID selectors(#)                                                     |
| 0-0-1-0   | class selector(`.`), pseudo class(`:`), attribute(`[type="radio"]`) |
| 0-0-0-1   | HTML element(`h1`), pseudo element(`::`)                            |


[Webpack: When To Use And Why](https://blog.andrewray.me/webpack-when-to-use-and-why/)
[[week 13] 前端工具之三 - gulp、webpack](https://hackmd.io/@Heidi-Liu/note-fe201-gulp-and-webpack)
[談一下 CSS Specificity](https://askie.today/css-specificity/)