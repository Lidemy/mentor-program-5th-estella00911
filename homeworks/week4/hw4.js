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
    if (!error && response.statusCode >= 200 && response.statusCode < 300) {
      const json = JSON.parse(body)
      for (let i = 0; i < json.top.length; i++) {
        console.log(json.top[i].viewers, json.top[i].game.name) // json.top[0] object
      }
    }
  }
)
