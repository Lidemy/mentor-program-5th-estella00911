const request = require('request')

const url = 'https://lidemy-book-store.herokuapp.com/books' // 也可以設成API_ENDPOINT

request(url, listTenBooks)

function listTenBooks(error, response, body) {
  /* <Q1> request() 出錯：通常是發送的過程有問題，然後沒有接到任何回應。 */
  if (error) {
    console.log(`請求錯誤： ${error}`)
    // 可能出現的問題有 (1) 網址不正錯 (2) 沒有連接到網路
    // 以下為可能出現的錯誤一：網址不正確
    // console.log('The domain that you are trying to reach is wrong or unavailable.\nPlease check the URL that you are trying to request is correct.\n','error\n', error)
    // 上一行是參考：https://support.freshdesk.com/support/discussions/topics/317310）
    return
  }

  // 程式碼先處理Status Code 的4xx 5xx，都順利
  // 再來看抓不抓的到資料：json = JSON.parse(body)
  if (response.statusCode >= 400) {
    console.log(`請求錯誤，狀態碼：${response.statusCode}`)
    return
  }

  /* 處理 API Link 的資料：有沒有抓到 API 文件 */
  let json = {}
  // try 抓 error 看有沒有成功把 API 的資料從「json 字串」轉成「js 的object」
  try { // <Q3>
    json = JSON.parse(body) // 把 json 格式的字串 -> JavaScript 的 object 形式
  } catch (error) {
    console.log('error!!! 資料解析錯誤')
    console.log('ERROR:', error) // <Q2> 不需把錯誤一一列出，只要顯示 error 即可。
    return
  }

  /* 印出書目上有哪些書 */
  for (let i = 0; i < 10; i++) {
    console.log(json[i].id, json[i].name)
  }
}

// 後記整理：
// catch error 的地方有三個:
// - - - - - - - - - - - -
// 1. request() 有沒有給出錯誤
// 2. 發出 request 後，得到的 response statuscode 有沒有 4xx 5xx
// 3. 有沒有順利抓到資料：json.parse 有沒有出錯

// Q1: request() 給出錯誤與 Status Code 4xx 5xx 錯誤不一樣。
// Ans.:
// request() 給出錯誤：通常是在發送的過程有問題，然後沒有接到任何回應。
// Status Code 4xx 5xx 錯誤： request 有發送出去，然後 response 得到的 status code

// 問題描述：先前在 line 30 上列出 json.parse 轉換錯誤的問題：可能是 API 不符合 json 格式或者無法使用 API 文件內的資料，可能是沒有權限訪問該頁面或瀏覽器本版錯誤等問題
// Q2: try catch 不用列出可能是哪些問題
// Ans.
// 通常都是列出 error，再個別自己去找 statusCode 顯示的問題。
// 舉例是 status code 4xx 5xx 有很多問題要處理，不用一一列出來，使用 console.log(`ERROR!! ${statusCode}`) 即可

// 問題描述：
// 在 line 30： catch (error) {
//               console.log('  (2) 網址有效，但無法使用 API 文件內的資料，可能是沒有權限訪問該頁面或瀏覽器本版錯誤等問題')')}
// Q3: 可以跑到這個 parsing 的地方代表一定有抓到資料，如果有權限或是其它問題的話應該是要在上面提到 Status Code 的地方處理
// Ans.:
// 所以處理優先順序
//  (1) <line 20~22> statusCode 判讀 400 500， console.log(statuscode) 後 return 結束 function
//  (2) <line 28~34> json.parse 抓資料

// -嘗試的 API 文件網址----
/* correct: API link */
// url = 'https://lidemy-book-store.herokuapp.com/books' // 也可以設成API_ENDPOINT
/* 需 authorization: API link */
// url = 'https://lidemy-http-challenge.herokuapp.com/api/v2/books'
/* incorrect API link */
// url = 'https://lidemy-book-store.herokuappsfdsfs.com/books',
