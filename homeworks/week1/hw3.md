# hw3: 教你朋友 CLI
## 零、作業說明
###### 學了一項東西之後若是想驗證自己是不是真的懂，教別人是最快的方法。

###### 有天，你的麻吉 h0w 哥跑來找你說：「欸！能不能教我 command line 到底是什麼，然後怎麼用啊？我想用 command line 建立一個叫做 wifi 的資料夾，並且在裡面建立一個叫 afu.js 的檔案。就交給你了，教學寫好記得傳給我，ㄅㄅ」

###### 可...可惡，居然這樣子就跑走了。但因為他是你的麻吉，所以你也沒辦法拒絕。

###### 因此這個作業要請你寫一篇簡短的文章，試圖教會 h0w 哥什麼是 command line 以及如何使用，並且要教他如何達成他想要的功能。
## 一、什麼是 command line 
原名為 command line interface（命令列介面，CLI），以文字與電腦溝通，其實還有一個我們熟悉且常用的介面——圖形使用者介面（Graphical user interface），是透過圖形跟電腦溝通。

GUI 就是我們在使用電腦時常常使用的介面，例如使用滑鼠點選新增、剪下、貼上、複製資料夾等按鈕、視窗的圖形，使用鍵盤跟滑鼠跟電腦溝通。

command line 就是以文字為主跟電腦溝通的方式，像電腦的早期發展，人們主要是以 command line 跟電腦溝通。
### 為何要使用 command line？
1. 有些功能只能透過 command line 使用。
2. 有時候使用 command line 比使用 GUI 還來的有效率跟方便。

## 二、如何使用 command line
### 1. 電腦的環境設置
#### Windows
- 下載及安裝 [git](https://git-scm.com/) 
當中的 `git bash` 應用程式，使用 command line。
#### MacOS
- 搜尋 terminal.app
- 打開 terminal 就可以了
### 2. 如何使用 command line 指令？
使用文字與電腦溝通，所以要輸入電腦看懂的指令，在此要學習一些常用的基本指令。
我們日常在電腦裡的 GUI 介面中，都是使用滑鼠點選圖形（如資料夾、檔案）做新增、剪下、移動、複製等動作，在 CLI 的介面中，也會使用到這些功能，以下為基本的指令。
#### 基礎四個指令
1. `pwd`: 
印出所在位置（print working directory）
2. `ls`:
列出檔案清單，也有進階的用法如下：
　- `ls -a`: 列出**隱藏**的檔案。
　- `ls -l`: 列出檔案的**詳細**資料，例如存取權限、更動時間、檔名。
　- `ls -al`: 同時列出隱藏的檔案以及詳細資料。
　- 示範<sup>[1]</sup>
``` bash
ls -a #列出隱藏檔案，其中 .DS_Store 首字母為「.」為隱藏檔案。
.				    mac matlab
..				    vscode
.DS_Store			~$xxx.xlsx
github				practice 

ls -l #列出檔案詳細資料
#依序為存取權限（屬性與權限）、連結加子目錄數量、擁有者 (user) 、擁有群組 (owner group)、檔案容量大小、檔案被建立日期時間、檔名或目錄名稱。
total 5
drwxr-xr-x   7 jeanlu  staff  224 Apr 12 15:08 github
drwxr-xr-x@ 20 jeanlu  staff  640 Mar  1  2017 mac matlab
drwxr-xr-x   4 jeanlu  staff  128 Dec  9 15:12 vscode
-rw-r--r--@  1 jeanlu  staff  171 Oct 23  2018 ~$xxx.xlsx
drwxr-xr-x   9 jeanlu  staff  288 Apr  9 16:16 practice
```
3. `cd`: 
切換資料夾（change directory），最常用的指令。
　- `cd /`: 回到根目錄
　- `cd ~`或`cd`: 回到家目錄
　- `cd ..`: 回到上一個目錄
　- `cd <絕對路徑>`: 絕對路徑，可以使用 `pwd` 查看。
　- `cd <相對路徑>`: 相對於現在所在的位置
　- 示範
```bash
pwd #列出檔案清單
/Users/jeanlu/document/vscode
cd #回到家目錄，功能跟「cd ~」一樣
/Users/jeanlu
cd . #回到上一層目錄
pwd #列出檔案清單
/Users
```
4. `man <指令>`:
使用說明書（manual），會列出該指令的使用說明，也會列出可以使用的參數。 
#### 與檔案操作有關的指令
5. `touch <名稱>`:
新增檔案或者更改檔案時間。
```bash
pwd
/Users/jeanlu/document/practice
ls
hw1.md  test

#使用 touch 建立新檔案
touch hw2.md
ls #列出檔案清單
hw1.md  hw2.md test #新建 hw2.md

# touch 更動檔案時間
ls -l #列出檔案詳細資料
-rw-r--r--  1 jeanlu  staff    0 Apr 17 20:05 hw1.md
-rw-r--r--  1 jeanlu  staff    0 Apr 17 20:05 hw2.md
drwxr-xr-x  4 jeanlu  staff  128 Apr  9 17:52 test

touch test #更動 test 的檔案時間
ls -l
-rw-r--r--  1 jeanlu  staff    0 Apr 17 20:05 hw1.md
-rw-r--r--  1 jeanlu  staff    0 Apr 17 20:05 hw2.md
drwxr-xr-x  4 jeanlu  staff  128 Apr 17 20:07 test


```
6. `mkdir <新資料夾名稱>`:
建立資料夾。
7. `mv <欲移動資料夾名稱> <相對/絕對路徑>`:
(1)移動檔案，有相對路徑跟絕對路徑。
　- `mv <相對路徑>`: 
```bash
pwd  #印出所在位置
/Users/jeanlu/document/practice
ls #列出檔案清單
week1 hw1.md
cd hw1.md ./week1 #將 hw1.md 移動到相同目錄下的 week1 資料夾
cd week1 #移動到 week1 資料夾
pwd
/Users/jeanlu/document/practice/week1
ls #印出所在位置
hw1.md #成功將 hw1.md 移到 week1 資料夾內
```
　- `mv <絕對路徑>`: 
``` bash
pwd  #印出所在位置
/Users/jeanlu/document/practice
ls #列出檔案清單
week1 hw1.md
cd .. #回到上一個目錄
pwd #印出所在位置
/Users/jeanlu/document
ls #列出檔案清單
github           practice 
mac matlab       vscode
cd hw1.md  /Users/jeanlu/document #將 hw1.md 移動到 document 資料夾下
```
(2)改名：
```bash
#複製檔案
pwd #列印所在位置
/Users/jeanlu/document/practice
ls #列出檔案清單
hw1.md   week1  week2
cp hw1.md homework1.md  #將 hw1.md 更名為 homework1.md
ls #列出檔案清單
homework1.md  week1  week2
```
8. `rm`:
此指令很危險，使用後，不可以回復被刪除的檔案，所以要想清楚再使用，不然會後悔。
　`rm -r`: 刪除資料夾。
　`rmdir`: 刪除資料夾前，資料夾內必須是空的。
9. `cp <原檔案名> <欲更改之檔案名>`:
複製檔案。
``` bash
#複製檔案
pwd #列印所在位置
/Users/jeanlu/document/practice
ls #列出檔案清單
hw1.md   week1  week2
cp hw1.md hw2.md #複製 hw1.md，並將新檔案命為 hw2.md
ls #列出檔案清單
hw1.md   week1  week2 hw2.md

#複製資料夾的方法
cp week1 week3 #將 week1 複製，並名稱命為 week3，但是 week1 是資料夾，不能複製，檔案才能複製。
cp: week1 is a directory (not copied).
cp -r week1 week3 #使用屬性「-r」，可以將資料夾做複製。
```
## 三、如何達成 h0w 想要的功能
###### 用 command line 建立一個叫做 wifi 的資料夾，並且在裡面建立一個叫 afu.js 的檔案。
假設想放在 `/Users/jeanlu/document/internet/` 內，先需要移動到想要放 wifi 資料夾的位置，再
```bash
# step1. 打開 command line，先查詢所在位置
pwd #印出所在位置
/Users/jeanlu
#移動到 internet 資料夾
cd /Users/jeanlu/document/internet 

# step2. 印出所在位置，已至想要建立 wifi 資料夾的位置
pwd 
/Users/jeanlu/document/internet

# step3. 建立名叫 wifi 的資料夾
mkdir wifi 

# step4. 移動到 wifi 資料夾內
cd wifi 

# step5. 新建 auf.js 的檔案
touch afu.js 

# step6. 檢查及確認 wifi 資料夾內是否新建一個 afu.js 的檔案
pwd 
/Users/jeanlu/document/internet/wifi
ls
afu.js
```

## 四、參考資料
- [1] [鳥哥的 Linux 私房菜——Linux 的檔案屬性與目錄配置](http://linux.vbird.org/linux_basic/0210filepermission/0210filepermission-fc4.php) 