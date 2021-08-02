## 這週學了一大堆以前搞不懂的東西，你有變得更懂了嗎？請寫下你的心得。
從搞不太清楚 seTimeOut 的運作機制，到複習遺忘的 JS 有執行環境（Node.js 及瀏覽器）的觀念，建立 JS 是 single-thread 的執行方式，不表示在執行環境上也是單線流程執行的方式，然後在 `seTimeout` 語法，是屬於 WebAPI 的語法，是瀏覽器這個執行環境提供的。

### hw1：Event Loop
看了[What the heck is the event loop anyway? | Philip Roberts | JSConf EU](https://www.youtube.com/watch?v=8aGhZQkoFbQ&ab_channel=JSConf)，才比較知道 code 執行的流程長什麼樣，之前就是大概跑到第幾行，會執行什麼語法，對於同步跟非同步的概念其實滿模糊的，現在就知道： `setTimeOut` 是屬於瀏覽器提供的 webAPI，當在瀏覽器的執行環境裡執行到這行指令時，就會跟瀏覽器說要幫我計時，然後時間到要觸發。

### hw2：Event Loop + Scope
一開始對於 scope 的理解只有： function 內的變數只能在 function 內使用，有 return 的話，才可以從裡面拿出來，也很少用到 `x = 24` 的全域變數來宣告。這次透過 execution context 及 scope chain 來理解 JavaScript Scope 的概念，算是對於 scope 有更深的一層認識。

其實一開始在最後面 `console.log(i)` 為 5 的地方滿疑惑的，以為是照著 i 的 for loop 順序執行。後來照著原理走一遍，發現 `setTimeout` 是屬於 webAPI，當 JS 執行到 `setTimeout`，就交給瀏覽器去處理，然後繼續往下跑 code，等到 call stack 處理完畢（`main()` 消失），才會依序處理等待的 `setTimeout`。

### hw3：Hoisting
在寫前兩份作業時，還想說對 hoisting 有進一步認識，結果在第 12 行的 `a=10` 這邊就卡住了，因為 fn2.EC.AO 上沒看到 a 的變數宣告，然後又想說在 `a = 10`，會不會是全域變數的意思？所以就沒有跟著 scope chain 順序去找 a 變數。

### hw4：What is this?
`this` 我對這個用法滿陌生的，這次才有了比較全面的認識，不過在認識 `this` 之前，也有滿多背景知識要補足（物件導向、prototype chain），也難怪 `this` 是一個大家都很頭疼的語法。

### 小結
這次大多都是介紹原理及概念，其實還不太曉得會應用到哪裡，在實際應用之前，對於觀念的掌握其實還是不足的，相信遇到應用的話，會更有深刻的體會QQ。