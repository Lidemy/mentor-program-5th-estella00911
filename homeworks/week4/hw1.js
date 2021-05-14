const request = require('request')

request(
  'https://lidemy-book-store.herokuapp.com/books', // correct API link
  // 'https://lidemy-http-challenge.herokuapp.com/api/v2', // 需 authorization
  // 'https://lidemy-book-store.herokuappsfdsfs.com/books', // incorrect API link
  (error, response, body) => {
    if (error) {
      console.log('伺服器無回應（以下為可能解決辦法）:') // https://support.freshdesk.com/support/discussions/topics/317310
      console.log('The domain that you are trying to reach is wrong or unavailable.\nPlease check the URL that you are trying to request is correct.\n', 'error\n', error)
      return
    }
    let json = {}
    try {
      json = JSON.parse(body) // object （json格式）
    } catch (error) {
      console.log('error!!! 伺服器有回應，出現 error 可能的原因為：')
      console.log('  (1) 網址有效，但API 文件內的資料可能不符合 JSON 格式，無法做資料轉換')
      console.log('  (2) 網址有效，但無法使用 API 文件內的資料，可能是沒有權限訪問該頁面或瀏覽器本版錯誤等問題')
      return
    }
    for (let i = 0; i < 10; i++) {
      console.log(`ID=${json[i].id} ${json[i].name}`)
    }
  }
)
