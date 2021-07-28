# hw 1：URL 縮網址
1. Load balancer: 中文是負載平衡器，功能是當有新的 request 發進來時，可以將請求分流到不同的地方，這樣將大量的請求，分向其他相同功能的伺服器，可以讓各個伺服器的工作量平均，才不會向同一個網站發送過多請求，而變慢或中斷。<sup>[1]</sup>

2. URL shortening service (app cluster): 
URL shortening service 是一個第三方的網站，將長的網址（以[How a URL Shortening Application Works](https://dzone.com/articles/how-a-url-shortening-application-works)的網站為例）縮短成網址（https://reurl.cc/4annr3），可以發現這個結構組成裡，`reurl` 為其網域（domain），然後最後面的 `4annr3` 為隨機產生的字母與數字，可以稱為 `token`，字母由 a ~ z，數字由 0 ~ 9，隨機組成的亂數，總共有 36 個字符，但是世界上網站這麼多個，會不會 `token` 裝不下呢？可以從這篇文章：看到不同的 token 長度，可以有幾種排列組合：長度為 6 的 token 有 36<sup>6</sup>（約 20 億）組合，長度為 9 的 token 有 36<sup>9</sup>（約 100 兆）組合，可以看需要容納的數量來選擇 token 長度。
那要怎麼產生 token 又不會分給兩個不同的網址相同的 token 呢？通常會交給third library（如 Hashids) 或者是 Base 36 encode 來產生 `token`。
3. zookeeper service: 
在縮短網址裡扮演的角色就是維持已經分配好的節點（application node）範圍，以及當收到用戶端的 request 時，分配一個新的節點。
zookeeper 是用來管理分布式的系統，通常需要奇數個機器（如：三台、五台機器），如果是三台機器的話，可以容忍有一台機器掛掉，如果五台機器的話，可以容忍兩台機器壞掉。
可以用於解決一：同步的服務（例如：將新產生的 short URL 放入 database），解決分布應用配置（將新產生的 short URL 放到與管理 URL shortening application 節點）。

參考：

[1] [什麼是負載平衡？](https://www.ithome.com.tw/node/26592)
[2] [zookeeper介紹與環境搭建](https://codertw.com/%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80/735554/)