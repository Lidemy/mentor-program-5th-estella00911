# hw2：Event Loop + Scope
###### 請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。
```javascript
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```
![](./hw2_eventLoop_Scope.gif)