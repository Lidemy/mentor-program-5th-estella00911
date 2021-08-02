# hw2：Hoisting
###### 請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。
```javascript
var a = 1
function fn(){
  console.log(a)
  var a = 5
  console.log(a)
  a++
  var a
  fn2()
  console.log(a)
  function fn2(){
    console.log(a)
    a = 20
    b = 100
  }
}
fn()
console.log(a)
a = 10
console.log(a)
console.log(b)
```

cosplay JS 引擎
```
global EC 建立 → VO 建立 → 找參數、func → 有 func 建立 <funcName>.[[Scope]] → 執行 code
                                                                       → 沒有參數，繼續下一個 execution context                                                                    ```
![](./resources/hw3_hoisting.gif)                                                                     
                                                                       