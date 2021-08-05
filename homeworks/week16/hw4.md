# hw2：Hoisting
###### 請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。
```javascript
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value) // object.value
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value) // inner.value
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // ??
obj2.hello() // ??
hello() // ??
```
### this
1. 在和根本與物件無關的地方呼叫、console.log this，看是不是嚴格模式及環境來定義是 `window`、`undefined`、`global`。
2. 物件導向呼叫 this，就是自己的 instance。
3. 在物件的情況下呼叫 this，可以把 this 轉換成 function code 的狀況下，第一個參數為何就是 this為何。
4. 和 function 怎麼被呼叫有關，與 function 程式碼定義、位置在哪無關。

### 1. `obj.inner.hello()`
step 1. 寫成 call function 的形式：`obj.inner.hello.call(obj.inner)`
`call()` 內的 call function，第一個傳的值是什麼，放到 hello function 內的 this 就是什麼。
step 2. this 為 `obj.inner`
看回原 code：
```javascript=
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
    // 上一行可以看成：
    // console.log(obj.inner.value) // 值為 2
  },
  ...
}
```
得 `obj.inner.hello()` 為 2

### 2. `obj2.hello()`
step 2.  寫成 call function 的形式：`obj2.hello.call(obj2)`
`call()` 內的 call function，第一個傳的值是什麼，放到 hello function 內的 this 就是什麼。
step 3.  this 為 `obj2`
step 4. 代換
```
const obj2 = obj.inner
```
`this` 為 `obj2` 然後 `obj2` 可以看成 `obj.inner`，所以 `this` 可以看成 `obj.inner`。
step 5. 看回原 code：
```javascript=
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
    // 上一行可以看成：
    // console.log(obj.inner.value) // 值為 2
  },
  ...
}
```
得 `obj.inner.hello()` 印出為 2

### 3. `hello()`
step 1. 寫成 call function 的形式：`hello.call(undefined)`
因為在 hello function 沒有傳東西進去，所以預設為綁定。
`'use strict';`：使用嚴格模式， `hello()` 印出為 `undefined`。
如果沒有使用 `'use strict';`(
嚴格模式）的話，在瀏覽器 `this` 的預設值為 `window` 在 Node.js `this` 的預設值為 `global`，有使用`'use strict';`(
嚴格模式）的話，this 預設值為 `undefined`。

### 4. 輸出結果
```javascript=
2
2
undefined
```
 