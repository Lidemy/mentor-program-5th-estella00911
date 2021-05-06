const request = require('request')
const process = require('process')

/* [GET] get 1 book */
if (process.argv[2] === 'read') {
  request.get(
    'https://lidemy-book-store.herokuapp.com/books/',
    (error, response, body) => {
      try {
        const num = Number(process.argv[3] - 1)
        const json = JSON.parse(body) // JSON 格式的字串 改成 js的object
        console.log(json[num].id, json[num].name)
      } catch (error) {
        console.log(error)
      }
    }
  ) // [GET] get 20 books
} else if (process.argv[2] === 'list') {
  request.get(
    'https://lidemy-book-store.herokuapp.com/books/?_limit=20',
    (error, response, body) => {
      const json = JSON.parse(body) // object（json格式)
      for (let i = 0; i < json.length; i++) {
        console.log(json[i].id, json[i].name) // 有個問題是 如裹數量小於20 會失敗，但現在設定長度為 json長度，且限制?_limit=20
      }
    }
  ) // [DELETE] delete book : boooks/:id
} else if (process.argv[2] === 'delete') {
  const tmp = Number(process.argv[3])
  const tmpString = tmp.toString()
  request.delete(
    `https://lidemy-book-store.herokuapp.com/books/${tmpString}`,
    (error, response, body) => {
      console.log(`statusCode: ${response.statusCode}`)
    }
  ) // [POST] add new book, path:boooks/,  parameter name:書名
} else if (process.argv[2] === 'create') {
  const newBook = process.argv[3]
  request.post(
    {
      url: 'https://lidemy-book-store.herokuapp.com/books/',
      form: {
        name: newBook
      }
    },
    (error, response, body) => {
      const json = JSON.parse(body) // JSON 格式的字串 改成 js的object
      console.log(`statusCode: ${response.statusCode}`)
      console.log(json.id, json.name)
    }
  ) // [PATCH] path:/books/:id, parameter: name: 書名
} else if (process.argv[2] === 'update') {
  const bookName = process.argv[4]
  request.patch(
    {
      url: `https://lidemy-book-store.herokuapp.com/books/${process.argv[3]}`,
      form: {
        name: bookName
      }
    },
    (error, response, body) => {
      const json = JSON.parse(body) // JSON 格式的字串
      console.log(`statusCode: ${response.statusCode}`)
      console.log(json)
    }
  )
}
