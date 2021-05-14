const request = require('request')

request(
  'https://lidemy-book-store.herokuapp.com/books',
  (error, response, body) => {
  // console.log(typeof(body)) // string
    try {
      const json = JSON.parse(body) // object （json格式）
      for (let i = 0; i < 10; i++) {
        console.log(json[i].id, json[i].name)
      }
    } catch (error) {
      console.log(error)
    }
  }
)
