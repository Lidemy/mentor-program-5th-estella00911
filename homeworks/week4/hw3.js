/* eslint-disable no-trailing-spaces */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const request = require('request')
const process = require('process')

request.get(
  `https://restcountries.eu/rest/v2/name/${process.argv[2]}`,
  (error, response, body) => { // body type: string
    // 1st step : request() 出錯：通常是發送的過程有問題，然後沒有接到任何回應。
    if (error) {
      console.log(`請求錯誤： ${error}`)
    }
    // 2nd step :程式碼先處理Status Code 的4xx 5xx
    if (response.statusCode >= 300) {
      console.log(`請求錯誤，狀態碼：${response.statusCode}`)
      return
    }

    // 3rd step:看有沒有成功把 API 的資料從「json 字串」轉成「js 的object」 
    try {
      const json = JSON.parse(body) // JSON 格式的字串 改成 "js的object"
    } catch (error) {
      console.log('ERROR!!!', error)
    }
    
    // 4th step: 處理 API 資料，輸入國家，並印出國家資訊（國家、首都、貨幣、國碼）
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
  }
)
