// new XML
const request = new XMLHttpRequest()
const activityWindow = document.querySelector('.section__lottery')
const lotteryPage = document.querySelector('.lottery__bg')
const prizeDesc = [
  {
    prize: 'FIRST',
    prizeNum: '恭喜你中頭獎了！',
    prizeGift: '日本東京來回雙人遊！'
  },
  {
    prize: 'SECOND',
    prizeNum: '二獎！',
    prizeGift: '90 吋電視一台！'
  },
  {
    prize: 'THIRD',
    prizeNum: '恭喜你抽中三獎：',
    prizeGift: '知名 YouTuber 簽名握手會入場券一張，bang！'
  },
  {
    prize: 'NONE',
    prizeNum: '銘謝惠顧',
    prizeGift: ''
  }
]

request.addEventListener('load', () => {
  if (request.status >= 200 && request.status < 400) {
    let json = {}
    // try catch： 偵測 json 格式是否錯誤
    try {
      const response = request.responseText
      json = JSON.parse(response)
    } catch (error) {
      console.log('ERROR!!!', error)
      alert('系統不穩定，請再試一次')
    }
    const result = json.prize
    activityWindow.addEventListener('click', (e) => {
      if (e.target.classList.contains('lottery__btn-drawing')) {
        lotteryResult(result)
      } else if (e.target.classList.contains('lottery__btn-prize')) {
        BackLotteryPage(result)
      }
    })
  } else { // status code != (200~400)
    console.log(request.status, request.responseText)
    alert('系統不穩定，請再試一次')
  }
})
request.onerror = () => { // request 發出時，發生錯誤
  console.log('error')
  alert('系統不穩定，請再試一次')
}
request.open('GET', 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery', true) // open 表示：發出一個 request 到這個 URL ，並使用 GET request method，true=要非同步
request.send() // 真正把 request 發送出去。

// functions

function lotteryResult(result) {
  for (let i = 0; i < prizeDesc.length; i++) {
    const lotteryPrize = prizeDesc[i].prize
    if (lotteryPrize.indexOf(`${result}`) === 0) {
      const lotteryPage = document.querySelector('.lottery__bg')
      lotteryPage.removeChild(activityWindow.querySelector('.lottery__body'))
      activityWindow.querySelector('.lottery__bg').classList.add(`${prizeDesc[i].prize}__bg`)
      activityWindow.querySelector('.lottery__bg').classList.remove('lottery__bg')
      const div = document.createElement('div')
      div.classList.add(`${prizeDesc[i].prize}__body`)
      div.innerHTML = `
          <h2 class='${prizeDesc[i].prize}__title'><span class='phone__style'>${prizeDesc[i].prizeNum}</span><span class='phone__style'>${prizeDesc[i].prizeGift}</span></h2>
          <div class='lottery__btn lottery__btn-prize' onclick='javascript:window.location.reload()'>我要抽獎</div>
        ` // <input type='button' value='我要抽獎' class='lottery__btn lottery__btn-prize'></input>
      lotteryPage.appendChild(div)
    }
  }
}

function BackLotteryPage(result) {
  lotteryPage.removeChild(activityWindow.querySelector(`.${result}__body`))
  activityWindow.querySelector(`.${result}__bg`).classList.add('lottery__bg')
  activityWindow.querySelector('.lottery__bg').classList.remove(`${result}__bg`)

  const div = document.createElement('div')
  div.classList.add('lottery__body')
  div.innerHTML = `
      <h2 class='lottery__title'>2020 夏日輕盈特賞！ 抽獎活動辦法</h2>
        <div class='lottery__info'>
          <div class='lottery__row'>
            <div class='lottery__header'>活動期間：</div>
            <div class='lottery__text'>2020/06/01~2020/07/01</div>
          </div> <!-- end .lottery__row -->
          <div class='lottery__row'>
            <div class='lottery__header'>活動說明：</div>
            <div class='lottery__text'>今天老闆佛心來著決定給大家發獎勵，有看有機會，沒看只能幫QQ！只要在店內消費滿1000000元即有機會獲得 - 頭獎日本東京來回雙人遊！</div>
          </div> <!-- end .lottery__row -->
          <div class='lottery__row'>
            <div class='lottery__header'>獎&emsp;&emsp;品：</div>
            <div class='lottery__text'>❤ 頭獎一名：日本東京來回雙人遊(市價14990元)<br>
              ❤ 貳獎三名：90 吋電視一台(市價5990元)<br>
              ❤ 參獎十名：知名 YouTuber 簽名握手會入場券一張(市價1500元)</div>
            </div>
          </div>
          <div class='lottery__btn lottery__btn-drawing' onclick='javascript:window.location.reload()'>我要抽獎</div>
    ` // <input type='button' class='lottery__btn lottery__btn-drawing' value='我要抽獎'></input>
  lotteryPage.appendChild(div)
}
