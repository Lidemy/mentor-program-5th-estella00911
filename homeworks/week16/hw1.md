# hw1：Event Loop
###### 在 JavaScript 裡面，一個很重要的概念就是 Event Loop，是 JavaScript 底層在執行程式碼時的運作方式。請你說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。
```javascript=
console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)
```
![](https://github.com/Lidemy/mentor-program-5th-estella00911/blob/week16/homeworks/week16/resources/hw1_eventLoop.gif?raw=true)

* JavaScript 
JavaScript 為 single-threaded（單線執行緒），意思就是只會有一個單線的流程，流程裡有很多項任務，在沒有執行任何同步程式碼的前提下，一次只會照著順序執行一項任務（同步synchronous)，當執行到比較費時的任務時，要完成此項費時任務，才可以往後執行後面的任務，而這些後面的任務，此時就處在「等待」狀態。

* Call Stack
紀錄著每個 function 執行時需要用到的資源，以及記錄著 function 執行的順序。然後，因為 JavaScript 是 single-threaded，一次只能有一個 thread，意思就是 JavaScript 同個時間內只能執行一件執行。

* WebAPI
Web API 是瀏覽器提供的，setTimeout 屬於 Web API。
當 call stack 執行到 seTimeout 時，發現 seTimeout 屬於 Web API，就交給瀏覽器的 Web API，叫瀏覽器幫忙設定一個計時器計時，計時完畢，就可以將這個 function 丟到 Task Queue等待執行。<sup>[1]</sup>

* Task Queue
很多 callback function 等待執行的排隊機制。
另外，進到 Task Queue 排隊等待的 function，需要等到 Call Stack 執行完畢清空後，才會依序將在 Task Queue 裡等待的 function 依序放回 Call Stack 執行。

* Event Loop
Event Loop 就是指一整個循環，從執行 code，依照執行順序將 function 放入 Call Stack 執行，執行完畢後，將 Call Stack 清空，才會查看是否有待執行任務於 Task Queue 內（WebAPI 的非同步），如果有，就會依序將他拉到 Call Back 執行，查看的過程就是 Event Loop。<sup>[2]</sup>

[1] [JavaScript 中的同步與非同步（上）：先成為 callback 大師吧！](https://blog.huli.tw/2019/10/04/javascript-async-sync-and-callback/)
[2] [Day5 單執行緒&非同步發生的血案](https://ithelp.ithome.com.tw/articles/10200054)
