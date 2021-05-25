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

![box model](https://static.coderbridge.com/img/estella00911/da44a3d0bbad420db4711a39ca39594e.png)
在這邊稱此圖為「元素」。

-----

### 一、盒模型組成：
1. content: 元素裡的內容，有可能是文字或圖。
1. padding: 在 border 之內，content 之外的透明區域（spacing inside the border）。
1. border: 邊框，包覆 padding 和 content。
1. margin: 在 border 之外的透明區域（spacing outside the border）。
1. 方便方別調整四個邊的樣式，還有區分 top、right、bottom、left，依照名稱長短有兩種屬性（property），以 border 舉例：

**(1) individual property**
- a. border-left
- b. border-right
- c. border-top
- d. border-bottom
- e. 舉例： `border-bottom: 5px;`，即為 border 的下邊為 5px 的粗細。

**(2) shorthand property**
- a. border: Apply to all four sides
`border: 10px;`

- b. border: Vertical | horizontal
`border: 5px 10px;`

- c. border: Top | Horizontal | Botton
`border: 1px 2px 3px;`

- d. border: Top | Right | Bottom | Left
`border: 5px 1px 0 2px;`

-----

### 二、border

##### 1. 簡介 border style
- `border-width`: 控制 border 粗細。
- `boder-color`: 調整 border 顏色。
- `border-style`: 調整 border 類型，如`dashed`（虛線）、`solid`（實線）。
- `border-radius: 20% or 5px`: 調整 border 四個邊角的弧度，舉例可以使用的單位有：`%` 及 `px`。
- `box-sizing: border-box;`

##### 2. 實際應用：

表示方法有好幾種：

- 表示方法：`border - <side> - <style>`
    - `<side>`: top, bottom, left, right
    - `<style>`: color, width, color, style
    - 舉例：
        - `border-top-color: yellow`
        - `border-left-width: 3px`
        - `border-right-style: dotted`


- 常用的表示方法：

<iframe height="265" style="width: 100%;" scrolling="no" title="box_model_sample_1" src="https://codepen.io/estella00911/embed/MWppqmz?height=265&theme-id=dark&default-tab=css,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/estella00911/pen/MWppqmz'>box_model_sample_1</a> by PinChun
  (<a href='https://codepen.io/estella00911'>@estella00911</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

-----

### 三、padding

##### 1. 簡介 padding
在 border 之內增加透明的區域，所以在 content 與 border 之間有一個間隙。

##### 2. 實際應用
**Shorthand Property**
1. pading: Apply to all four sides:
`pading: 10px`

2. pading: Vertical | horizontal:
`padding: 5px 10px;`

3. pading:Top | Horizontal | Botton
`padding: 1px 2px 3px;`

4. pading: Top | Right | Bottom | Left
`Padding: 5px 1px 0 2px;`

-----

### 四、margin
元素邊界外面與其他元素的邊界外的區域。

-----


## 請問 display: inline, block 跟 inline-block 的差別是什麼？什麼時機點會用到？
### 五、Display Property（屬性模式）
在講屬性模式之前，要先講一下在 html 裡各標籤（tag）會根據不同的元素的形式，在網頁裡呈現不同的預設模式（default display value）。
先舉例介紹一下在 html 裡，不同的標籤都有其預設的 display property。可以分成`inline-level element` 及 `block-level element`：
<iframe height="265" style="width: 100%;" scrolling="no" title="inline &amp; block element" src="https://codepen.io/estella00911/embed/QWppVxV?height=265&theme-id=dark&default-tab=html,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/estella00911/pen/QWppVxV'>inline &amp; block element</a> by PinChun
  (<a href='https://codepen.io/estella00911'>@estella00911</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

以 `<span>` 及 `<div>` 為例子，可以發現被 `<span>` 包住的「成功登入」，仍與內文在同一行（row），沒有換行，可以知道：在 html 裡 `span` 是屬於 inline-level element；被 `<div>` 包住的「成功登入」自己佔一行，得知在 html 內， `div` 屬於 block-level element。若要更詳細得知 html 的標籤各是什麼元素。

現在知道 html 標籤都會有一個預設的顯示模式（default display property），既然是預設的顯示樣式，那就可以更改，那要怎麼更改呢？
我們可以透過在 CSS 的 display 將元素賦予新的 display property，來改變原本預設的顯示模式，如此一來，就可以將版面改成我們想要呈現的方式，是放在同一行呢？或者是直放放在一欄。

以下是可以修改預設 display property 的舉例：
1.  `display: inline;`
1.  `display: block;`
1.  `display: inline-block;` （可以呈現inline，同時保有區塊的特性）

-----

1. `display:Inline;`
在 inline 的文字或圖片都不換行，放在同一行。inline 特性就是高、寬度、padding、margin 都不能改變，也就是說：放在同一行的文字或圖片就是本身的寬度。

使用時機：當元素呈現 block 的排列，又想要把他改成同一行的排列時，就需要使用到 inline。

<iframe height="265" style="width: 100%;" scrolling="no" title="display: inline" src="https://codepen.io/estella00911/embed/MWppZOL?height=265&theme-id=dark&default-tab=html,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/estella00911/pen/MWppZOL'>display: inline</a> by PinChun
  (<a href='https://codepen.io/estella00911'>@estella00911</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

-----

2. `display:block;`
元素會以區塊的方式呈現，而且預設的寬度是 100%，如果沒有特別設定，寬度會佔滿視窗。區塊的特性就是可以自行設定寬度、高度、padding、margin。

使用時機：因為 `<img>` 預設顯示模式為 inline，但在刻靜態網頁的時候，除了考慮電腦版，也要考慮手機版，在電腦版中，圖片可以維持原預設的 inline 模式，但是在手機版，因為畫面變為狹長，圖片無法並排而列，就要改成 block，此時就需要 `display: block`，將圖片直直列下來，方便手機觀看。

<iframe height="265" style="width: 100%;" scrolling="no" title="img: inline -&gt; block" src="https://codepen.io/estella00911/embed/qBrrJxP?height=265&theme-id=dark&default-tab=html,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/estella00911/pen/qBrrJxP'>img: inline -&gt; block</a> by PinChun
  (<a href='https://codepen.io/estella00911'>@estella00911</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

-----

3. `display:inline-block;`
將同一層的元素保持在同一行（inline），但這些元素可以設置各自的寬度、高度。換句話說，顯示方式很像 inline-element，但是保有自己的寬度（width）、高度（height）、margin、padding。

使用時機：當在切版時，會使用 `div` 將網頁切成各個區塊，如 navbar、footer等，但是 `div` 的預設為 block，但是我們一般在電腦版網頁上的 navbar 都是一行（row）列出來，如：加入購物車、會員訊息、優惠券查詢，此時就會希望把 `div` 預設的 disply property —— block，改為 inline-block，同時又保有 block 可以更改。

<iframe height="265" style="width: 100%;" scrolling="no" title="display: inline-block" src="https://codepen.io/estella00911/embed/vYxxVyd?height=265&theme-id=dark&default-tab=html,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/estella00911/pen/vYxxVyd'>display: inline-block</a> by PinChun
  (<a href='https://codepen.io/estella00911'>@estella00911</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

-----

##### 比較
| Display Property | 元素尺寸設定 | 呈現形式 |
| --- | --- | --- |
| inline | 保有原本寬高，不可更改。 | 同一行（row） |
| block | 可更改寬高、padding、margin | 預設寬度為 100% 視窗，以區塊的方式呈現 |
| Inline-block | 可更改寬高、padding、margin| 在同一行內，仍保有區塊的形式呈現|




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