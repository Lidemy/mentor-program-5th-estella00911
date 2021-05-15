/* eslint-disable no-useless-return */

const request = require('request')

request.get(
  {
    url: 'https://api.twitch.tv/kraken/games/top?_limit=100',
    headers: {
      accept: 'application/vnd.twitchtv.v5+json',
      'client-id': 'bmrryhslbf6vtr71xzyluf4ahb641o'
    }
  },
  (error, response, body) => {
    // 1st step : request() 出錯：通常是發送的過程有問題，然後沒有接到任何回應。
    if (error) {
      console.log(`請求錯誤： ${error}`)
    }

    // 2nd step : 程式碼先處理Status Code 的4xx 5xx
    if (response.statusCode >= 400) {
      console.log(`請求錯誤，狀態碼：${response.statusCode}`)
      return
    } else if (!error && response.statusCode >= 200 && response.statusCode < 300) {
      let json
      // 3rd step: 看有沒有成功把 API 的資料從「json 字串」轉成「js 的object」
      try {
        json = JSON.parse(body) // JSON 格式的字串 改成 "js的object"
      } catch (error) {
        console.log('ERROR!!!', error)
      }

      // 4th step: 處理 API 資料，印出 熱門遊戲的名稱及觀看人數
      for (let i = 0; i < json.top.length; i++) {
        console.log(json.top[i].viewers, json.top[i].game.name) // json.top[0] object
      }
    }
  }
)
