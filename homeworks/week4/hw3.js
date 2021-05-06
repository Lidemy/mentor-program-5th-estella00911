const request = require('request')
const process = require('process')

request.get(
  `https://restcountries.eu/rest/v2/name/${process.argv[2]}`,
  (error, response, body) => { // body type: string
    try {
      const json = JSON.parse(body) // JSON 格式的字串 改成 "js的object"
      // console.log(json.status) //404
      if (json.message === 'Not Found') {
        console.log('找不到國家資訊')
      }
      for (let i = 0; i < json.length; i++) {
        console.log('============')
        console.log(`國家：${json[i].name}`)
        console.log(`首都：${json[i].capital}`)
        console.log(`貨幣：${json[i].currencies[0].code}`)
        console.log(`國碼：${json[i].callingCodes}`)
      }
    } catch (error) {
      console.log(error)
    }
  }
)
