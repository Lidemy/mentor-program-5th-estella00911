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
      console.log('error!!! 伺服器有回應，但是 API 文件內的資料不符合 JSON 格式')
      return
    }
    for (let i = 0; i < 10; i++) {
      console.log(`ID=${json[i].id} ${json[i].name}`)
    }
  }
)
