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
![](https://github.com/Lidemy/mentor-program-5th-estella00911/blob/week16/homeworks/week16/resources/hw2_eventLoop_Scope.gif?raw=true)