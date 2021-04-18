# hw5
### 請解釋後端與前端的差異。
以 google 表單為例，眼睛看的到的介面，如排版（CSS）、文字（html）、使用者與網頁的互動與功能（JavaScript）屬於前端。後端是著重在看不到的地方，如：資料的儲存。當 google 表單送出，需要將表單內容作儲存。
<br/>
### 假設我今天去 Google 首頁搜尋框打上：JavaScript 並且按下 Enter，請說出從這一刻開始到我看到搜尋結果為止發生在背後的事情。
按 Enter 後，跟瀏覽器說送出 JavaScript 的 request，瀏覽器跟作業系統說送出 reqeust，作業系統跟網路說要送出 request 給 google 的 server，把資料送到 dataBase，google server 回傳 response 給網路，網路再把 response 交還給作業系統，之後作業系統把 response 給 chrome 瀏覽器，最後 google chrome 在顯示出結果。
<br/>
### 請列舉出 3 個「課程沒有提到」的 command line 指令並且說明功用
1. `chmod 754 modulelist`：更改檔案權限[1]
```bash
ls -l modulelist
-rwxrwxr-- 1 mike users 3808 Jan 4 2015 modulelist
```
其中 `rwxrwxr--`，r（read）為讀取，有權限可以閱讀檔案內容， w（write）為寫入，可以編輯、新增、刪除該檔案內容，x（execute）為執行，該檔案具有被系統執行的權限。三個字母為一組，第一組至第三組分別為擁有者、群組與其他人，每組都有不同的權限。可以使用數字來代表 r、w、x，依序數字代表為4、2、1。這樣可以知道「754」，所代表的是：擁有者具有 rwx 三個權限，群組具有 rx 的權限，其他人具有 r 的權限。而「modulelist」為欲修改權限的檔案。

2. `gzip <fileName>`：壓縮檔案[2] 
```bash
cp ./w1_journal_0415.md w1_journal_0415_copy
ls -l
-rw-r--r--@ 1 jeanlu  staff  3035 Apr 17 00:01 w1_journal_0415.md
-rw-r--r--@ 1 jeanlu  staff  3035 Apr 18 23:20 w1_journal_0415_copy.md
gzip -v w1_journal_0415.md
w1_journal_0415.md:	   44.0% -- replaced with w1_journal_0415.md.gz
ls -l
-rw-r--r--@ 1 jeanlu  staff  1699 Apr 17 00:01 w1_journal_0415.md.gz
-rw-r--r--@ 1 jeanlu  staff  3035 Apr 18 23:20 w1_journal_0415_copy.md
```
因為使用 `gzip` 後，會直接將檔案壓縮，所以壓縮前先複製一個檔案作為對照。使用 `gzip` 後，可以發現檔案容量由 3035 降低至 1699，容量有被壓縮。

3. `head <fileName>`：印出檔案首幾行[3]
若沒有寫印出檔案幾行，就是預設 10 行。若想要設定印出幾行，可以輸入`head -n <行數> <fileName>`

### 參考：
[1] [鳥哥的私房菜 〈Linux 的檔案權限與目錄配置〉](http://linux.vbird.org/linux_basic/0210filepermission.php)
[2] [鳥哥的私房菜 〈檔案與檔案系統的壓縮,打包與備份〉](http://linux.vbird.org/linux_basic/0240tarcompress.php)
[3] [UNIX 常見指令教學](https://it.cs.nycu.edu.tw/unix-basic-commands)