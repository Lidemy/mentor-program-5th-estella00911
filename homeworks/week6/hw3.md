## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。
1. **`<textarea>`**
- 作用：可以在製作表單的時候，填寫一些內容的書寫框。
- 舉例：
<iframe height="265" style="width: 100%;" scrolling="no" title="vYxxawO" src="https://codepen.io/estella00911/embed/vYxxawO?height=265&theme-id=dark&default-tab=html,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/estella00911/pen/vYxxawO'>vYxxawO</a> by PinChun
  (<a href='https://codepen.io/estella00911'>@estella00911</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

---

2. **`<select>`**
- 作用：在表單內，可以使用選單，來選擇項目。
- 舉例：
<iframe height="265" style="width: 100%;" scrolling="no" title="w6_hw3_select" src="https://codepen.io/estella00911/embed/RwppBzr?height=265&theme-id=dark&default-tab=html,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/estella00911/pen/RwppBzr'>w6_hw3_select</a> by PinChun
  (<a href='https://codepen.io/estella00911'>@estella00911</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

3. **`<cite>`**
- 解釋：表示「引用」，必須包含標題。
- 使用類型：書、研究文獻、詩、歌、電影、歌劇、展覽、網頁、部落格文章的評論、Facebook 貼文，等等。
- 可搭配的 html 標籤：`<blockquote>`、`<q>` 之中內容的引用來源就是使用 `cite` attribute。
- <cite>[cite MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/cite) </cite>


## 請問什麼是盒模型（box modal）
[Box Model 與 Display Property](https://www.coderbridge.com/series/11df29fa4c294d8fbb207a3455e5ad77/posts/007fedeef78a49ffad71a91669bef21e)


## 請問 display: inline, block 跟 inline-block 的差別是什麼？什麼時機點會用到？
[Box Model 與 Display Property](https://www.coderbridge.com/series/11df29fa4c294d8fbb207a3455e5ad77/posts/007fedeef78a49ffad71a91669bef21e)




## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？分別各舉一個會用到的場合。
* `position: static;`
為預設，靜止，跟著排版流，排下去。

* `position: relative;`
跟預設一樣，跟著排版流排列，不一樣的是：在自己的顯示位置產生一個基準點，讓其他元素（`position: absolute`)可以將設定 `position: relative` 的元素作為基準，來做偏移。
使用時機：
(1) 其他設為`position: absolute`元素的基準元素。
(2) 將元素自己本身設為基準點，想要偏移，或者是重疊圖層的效果，又要保留原本在排版流的空間。

* `position: absolute;`
參考 [這個網頁](https://medium.com/ui-ux%E7%B7%B4%E5%8A%9F%E5%9D%8A/position-%E5%B1%AC%E6%80%A7%E7%9A%84%E5%9F%BA%E7%A4%8E%E6%A6%82%E5%BF%B5-5931254e5203) 的譬喻，將這個設定 `position: absolute` 譬喻成便條紙，可以四處黏貼很方便，但是在 CSS 裡面，需要有個參考的基準點，才可以隨處黏貼，而這個參考基準點就是~~上層元素~~（看自我檢討後，修正為：**absolute 的定位點是往上找第一個 position 不是 static 的元素**）中有設定 `position: relative` 的元素，若沒有上層元素設成 relative 的話，就是以整個視窗（body 元素）為基準點。瞭解基準點在哪裡後，就可以使用在 CSS 中使用 `top`、`left`、`bottom`、`right` 做偏移（將便條紙黏貼至不同地方）。
補充：`top`、`left`、`bottom`、`right`的指令，只有在 position 不是預設 static 時才可以使用。同樣地，在做圖層的重疊時會需要使用到 `z-index`（值越大，越上層），這也是在 position 不是預設 static 時才可以使用。

使用時機：
與 relative 搭配，這樣 設定 absolute 的元素就可以位移，有時候可以用在 CSS 製作幾何圖形或繪圖。

* `position: fixed;`
這個設定與`position: absolute` 一樣跳脫了排版流，不一樣的是：在 absolute 裡基準點<u>為上一層元素或視窗本身</u>（觀看自我檢討後，修正成：**absolute 的定位點是往上找第一個 position 不是 static 的元素**）；而 fixed 的基準點為整個視窗（body 元素）。因為是將基準點設在整個視窗上，意即在視窗頁面上不動，但是當頁面捲動時，因基準點為整個視窗，因此，也會定點於視窗的位置，不隨著頁面滑動。

使用時機：像瀏覽網頁看到的廣告，不會隨著頁面滾動而移動，會固定在視窗的某一處上。

* `position: sticky;`
這個是 fixed 與 absolute 的混合，一樣跳脫排版流，既然是混合，就兼具兩者的功能，在頁面滑動時，會與 relative 的基準點為主，跟著移動，但當 relative 的基準點因為滾動頁面消失後，失去基準點， sticky 的元素就會 fixed 在視窗上面。意即：在第一頁時，會黏著並跟著 relative 的元素移動，但下捲把 relative 的元素移離開後，則停在頁面最上方固定不動。

使用時機：像是購物網站的導覽列，會隨著頁面滾動而移動，當頁面滾動到導覽列位於最上方時，會固定在該處，不會跟著頁面消失。

參考：[position 屬性的基礎概念](https://medium.com/ui-ux%E7%B7%B4%E5%8A%9F%E5%9D%8A/position-%E5%B1%AC%E6%80%A7%E7%9A%84%E5%9F%BA%E7%A4%8E%E6%A6%82%E5%BF%B5-5931254e5203)