## 什麼是 DNS？Google 有提供的公開的 DNS，對 Google 的好處以及對一般大眾的好處是什麼？
### IP 網址跟網域
在我們習慣上都是以地名來認識地方（如：台北的動物園），但是郵差在送信時，需要有明確的地址，才可以將信件確實送到，例如：動物園的地址為：116016 臺北市文山區新光路二段30號。
在網路的世界也是一樣，從前要使用 IP 位址才可以瀏覽網頁，但人們不習慣跟記地址一樣記 IP 位址（如`163.29.207.130`），習慣以地名來記，後來產生了網域（ Domain Name），可以透過域名來找到想要瀏覽的網站（如動物園為：`https://www.zoo.gov.taipei/`），這樣一來，人們不用再記 IP 位址來瀏覽網站。那要怎麼把人們輸入的網域轉成網路看的懂的 IP 位址呢？就是靠 DNS 來轉換[1]。


### 什麼是 DNS？
DNS 全名為 Domain Name Server，從 [AWS](https://aws.amazon.com/tw/route53/what-is-dns/) 擷取一張圖來解釋，假設我有 `www.example.com` 的網站，其 IP 位址為 1.2.3.4，當今天有一個使用者想要造訪這個網站時，會發送 request 給這個`www.example.com`，但是網路的世界裡看不懂網域形式的網址，這時候就需 DNS server 去裡面找到相對應的域名及 IP ，找到相對應的 IP 後，再告訴回傳給 client 端，這樣使用者就可以造訪到網站。

那世界上這麼成千上萬個網站，要怎麼從 DNS server 裡面找到相對應的 IP 位址呢？
以 `www.example.com` 為例子，在 DNS server 裡面是以階層樹狀圖的架構，在樹狀圖的最頂層為根目錄，也就是 root name server。
1. `root name server`
這時就向 `root name server` 詢問：`www.example.com` 在哪裡呢？因為 root 只紀錄了 `.net`、`.com`、`.org`、`.gov`等的一般最上層領域， `.root` 回答：我不知道 `www.example.com` 在哪，但我知道 `.com` 在哪，我有他的 IP。
2. `name server for .com`
由於 root name server 告訴我們 `.com` 的 IP，就跟著 IP 前往 `.com` 看他知不知道這個網址在哪，所以就問問看 `name serve for .com`：妳知道 `www.example.com` 在哪嗎？ `.com` 回答：知道在哪，我有他的 IP：1.2.3.4。
3. DNS 查到正確的 IP後，會暫存在記憶體內，這樣就不用每次造訪網站的時候，要再在 DNS server 搜尋一次，通常存在暫存記憶體的時間不會太長（據[鳥哥網站](http://linux.vbird.org/linux_server/0350dns.php)上寫：可能是 24 小時），過沒多久就會被清除緩存。

辨別 `.net`、`.com`，以此例（example.com）來說，進入 「Name server for .com」 這個層次後，尋找有沒有名稱為 example 的域名，後來在「Name server for example.com」的 server 找到，就找到了他的 IP 位址「1.2.3.4」，找到之後就回傳 response 給 client 端。<sup>[2]</sup>
![](https://static.coderbridge.com/img/estella00911/e95c020eabaf46639cacdecf9f8171cd.png)
### Google 有提供的公開的 DNS，對 Google 的好處以及對一般大眾的好處是什麼？
#### 對 Google 的好處
Google 收集使用者的搜索數據，用於商業廣告等等的用途

#### 對一般大眾的好處
可以設定將 Google 的 public 代替使用者的網際網路服務供應商（ISP，如 Hinet）的 DNS server，這樣就可以使用 google public DNS，對大眾有以下好處：
- 快速
 google 著眼在快取的部分。
 一般在 DNS 查詢後，會將查詢結果作緩存，下次使用者再次造訪相同網站時，就可以減少 DNS 搜尋 IP 的時間，但這個緩存只會存在一天。如果緩存到期的話，下次再次造訪網頁時，就要再重新等待 DNS 找到相應 IP。
 如果使用 google Public DNS 的話， google 會在 DNS 緩存到期前，預先抓取資料，使用者就可以在進入網站時，減少了等待 DNS 查詢到 IP 然後再導入頁面的時間，這樣就有了比較快速的瀏覽網頁的實現。

- 篩選惡意網站
> 為防範快取毒害攻擊和 DNS 假冒等威脅，網域名稱系統安全性擴充功能 (DNSSEC) 會驗證資訊的交換作業。 --[DNSSEC 安全性](https://support.google.com/domains/answer/6387342?hl=zh-Hant)

使用 google DNS 後，可以開啟網域名稱系統安全性擴充功能 (DNSSEC)，這個可以紀錄 DNS 傳輸的數據，有了這個紀錄，可以確保我們看的網站是對的域名（正確的網址），這樣就避免進入了被駭客侵入的惡意網站，若進入了被駭客侵入的惡意網站，可能會被有心者的收集個人登入資訊，也可能會被駭客分到惡意的程式碼。<sup>[3]</sup>


## 什麼是資料庫的 lock？為什麼我們需要 lock？<sup>[6]</sup>
### 什麼是資料庫的 lock？
資料庫的 lock（database lock）是用來鎖住資料庫的某些資料。那為什麼要鎖住資料呢？因為當使用者 1 要在資料庫 A 做資料的更新、新增、刪除等編輯時，資料庫的 lock 會被啟動，鎖住使用者 1 在資料庫 A 做資料的更動，這樣一來，直到 database lock 被取消之前，其他使用者 2、使用者 3就不能對資料庫 A 的資料做更改， database lock 被取消之後，其他使用者才可以對資料庫 A 做更改。

### 為什麼我們需要 lock？
如果有兩個使用者同時更新同一個資料庫，很可能會丟師資料，所以就需要 database lock 來防止資料丟失的狀況發生。一次只能有一個使用者來更新資料庫的資料，所以就不會有同時更新資料造成數據丟失的事情發生。

## NoSQL 跟 SQL 的差別在哪裡？<sup>[7]</sup>
| 差異           | SQL                                                     | NoSQL                                                                              |
| -------------- | ------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| 型態           | 關聯式資料庫                                            | 非關聯式資料庫                                                                     |
| 儲存形式       | 在資料庫中建立 Table，並使用 SQL 作新增、編輯、刪除等等 | 類似 JSON 的文件                                                                   |
| 存取資料方法   | 使用 SQL 語法在 Table 中檢索                            | 以 object為基礎的 API，需撰寫code 來存取                                           |
| 資料結構       | 有一套標準化的架構，為由列和欄組成的表格。              | 彈性的資料結構                                                                     |
| 程式語言一致性 | 有一套標準的 SQL 語法                                   | 不同 NoSQL 資料庫（如：AWS 的 AWS DynamoDB、Firebase）需要安裝不同套件及其特定函式 |
| 舉例               |    金融系統資訊與交易，就需要數據的完整性與一致性，同時還要考慮到安全性，這時候關聯式資料庫就有安全性的幫助。       |      可以處理大量的資料，例如：會員購物車的物品、儲存使用者的資訊，一般和 key value（如：ID）有關聯的訊息，都可以使用。  |


## 資料庫的 ACID 是什麼？<sup>[9, 10]</sup>
要先瞭解 Transactions（交易） 在 SQL Server 的意思。

**交易（transaction）**
**(1) 解釋**
一個一連串的工作指令，可以為使用者定義的任務指令，可能是資料庫裡的單個或多個任務，為資料的單筆或多筆讀取、寫入、刪除。
**(2) 特性**
一連串的工作指令是一個不能分割的工作指令，要就是工作指令全部執行成功或著是全部執行失敗。
舉例：銀行匯款，如果今天 A 將 1000 元轉給 B，A 就會減少 1000 塊，而 B 會多 1000 塊，如果今天 A 把錢匯出去了，扣了 1000 塊，但是 B 沒有收到款項（A 成功，B 失敗），銀行多了 1000 塊；又或者是 A 沒有把錢匯出去，但是 B 收到了 1000 塊，（A 失敗，B 成功），這樣銀行就會虧錢，這是不能容忍的，所以今天要完成匯款，需要 A 成功扣除款項，並且 B 也成功獲得款項，在這個過程，保證雙方增扣款運作正常，才會進行匯款、結算後的款項一致、匯款紀錄的保存。相同道理，今天在 SQL 要完成這一串任務指令，就必須這一串每個指令都執行成功，這個任務指令才會執行，如果這串指令中間有一個指令執行失敗，這個任務指令就會全部都沒執行，也有一些需要遵循的規則：
**(3) trasaction 的四個特性：ACID**
- **a. Atomicity 原子性**
在銀行匯款中，需要匯出方的扣款與收款方的收到匯款，匯款交易才會成立，要是有一方出錯，這個交易就會失敗。
同樣的，在資料庫的一連串指令操作上要全部成功順利執行，這串指令任務才會成功執行，若操作過程中有失敗的步驟，那麼就會將先前操作到一半的步驟回復到這個指令任務執行前的紀錄。
- **b. Consistency 一致性**
在銀行匯款的前後要有一致性，例如匯出與匯入的款項淨值要為 0，在資料庫的交易（transaction）也要具一致性。

- **c. Isolation 隔離性**
假設 A 帳戶有 500 塊，今天 A 決定匯款給 B 100 塊時，也想要把錢匯給 C 500 元時，此時，如果銀行沒有將這兩筆匯款交易隔開，而是將這兩個匯款同時進行的話，就會以為 A 帳戶內足夠給 B 100 元，A 帳戶足夠給 C 500 元，但實際上 A 沒有足夠的錢匯出 600 元分別給 B 100 元與 C 500 元，這時匯款就會發生問題。所以就需要將這兩筆匯款交易隔開，先匯出給 B，確認匯出後的餘額為 400 後，再看下一筆的餘額，是否可以匯出 500 塊，此時就會發現 A 不夠 500 塊給 C，任務指令中的過程發現其中一個步驟執行失敗，那第二次匯給 C 的 500 塊匯款就不會成立。
換到 SQL 的概念，就是當使用者在針對這個資料表的修改的一連串工作任務指令時，會利用 database lock 將資料表鎖起來，不讓其他使用者更新資料表中相同的資料，以確保不會和其他的任務指令重疊。

- **d. Durability 持久性**
一旦匯款成功後，就不能反悔要取消匯款。同樣地，一旦任務指令執行成功，就會永久被寫入。

參考：
1. DNS
[1] [什麼是 DNS？ -- AWS](https://aws.amazon.com/tw/route53/what-is-dns/)
[2] [網路概念 | 圖解DNS功能．自架站的第一項功課．搞懂網域名稱與IP位址](https://blogimove.com/%E7%B6%B2%E8%B7%AF%E6%A6%82%E5%BF%B5-%E5%9C%96%E8%A7%A3dns%E5%8A%9F%E8%83%BD%EF%BC%8E%E8%87%AA%E6%9E%B6%E7%AB%99%E7%9A%84%E7%AC%AC%E4%B8%80%E9%A0%85%E5%8A%9F%E8%AA%B2%EF%BC%8E%E6%90%9E%E6%87%82/)

2. Google DNS
[3] [網域名稱 (Domain Name) 與網址](https://www.net-chinese.com.tw/nc/index.php/MenuLink/Index/AboutDomainName)
[4] [DNSSEC setup on DNS Server Google Cloud DNS](https://www.cloudbooklet.com/dnssec-setup-on-dns-server-google-cloud-dns/)
[5] [DNS security](https://www.cloudflare.com/zh-tw/learning/dns/dns-security/)
[6] [database-locking](https://www.programmerinterview.com/database-sql/database-locking/)

3. NoSQL 與 SQL
[7] [什麼是SQL？什麼是NOSQL? 用簡單範例看一下他們的差異吧！](https://codegym.tech/blog/sql_vs_nosql.html)
[8] [什麼是 NoSQL？](https://aws.amazon.com/tw/nosql/)
1. ACID in SQL
[9][[極短篇] 資料庫的 ACID 是什麼？](https://lance.coderbridge.io/2021/04/24/short-what-is-acid/)
[10] [Transactions in SQL Server for beginners](https://www.sqlshack.com/transactions-in-sql-server-for-beginners/)