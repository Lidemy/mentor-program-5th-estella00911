/* eslint-disable quote-props */
/* eslint-disable no-inner-declarations */

const topGameNumber = 5
const streamsNumber = 20

const apiUrl = 'https://api.twitch.tv/kraken/'
const acceptHeader = 'application/vnd.twitchtv.v5+json'
const clientIdHeader = 'bmrryhslbf6vtr71xzyluf4ahb641o'

function getData(url) {
  return fetch(url, {
    method: 'GET',
    headers: new Headers({
      'Accept': acceptHeader,
      'Client-ID': clientIdHeader
    })
  }).then((response) => response.json())
    .catch((error) => console.log('error:', error)) // 當 API URL 錯誤，沒有抓到 API 時
}

async function getNavAndStreams() {
  // 首頁：從 API 抓取前五熱門遊戲名稱及 top 1
  // 並新增至 navbar 與 top 1 遊戲名稱(heading 2)
  try {
    const navBarUrl = `https://api.twitch.tv/kraken/games/top?limit=${topGameNumber}`
    const jsonData = await getData(navBarUrl) // GET API: 前五熱門的遊戲 data
    const topFiveGames = await topGamesList(jsonData, topGameNumber) // array(length= 5):前五熱門遊戲名稱的
    await dynamicUpdateNavBar(topFiveGames) // JS動態新增到 HTML：導覽列的前五熱門遊戲名稱
    await dynamicUpdateH2(topFiveGames) // JS動態新增到 HTML：首頁最熱門遊戲的名稱(heading 2)

    // 首頁：20 個實況
    const top1StreamsUrl = `${apiUrl}streams?stream_type=live&game=${topFiveGames[0]}` // 準備發 request 的 URL，目的為尋找該遊戲的前20實況台
    const jsonStreams = await getData(top1StreamsUrl) // GET API 該遊戲的前 20 實況台資料
    await updateLiveStreams(jsonStreams, streamsNumber) // JS動態新增到 HTML：前 20 實況台資料
  } catch (err) {
    console.log('error in the home page:\n', err)
  }
  // 監聽 navbar，點擊 navbar 的遊戲名稱時，會顯示該遊戲的 20 個實況
  document.querySelector('.navbar__list').addEventListener('click', (e) => {
    if (e.target.classList.contains('navbar__topFiveGames')) {
      async function appendOtherStreams() {
        // to get gameName that you clicked on the navbar
        const clickGameBtn = e.target.innerText
        // get the game API data that you clicked
        try {
          const popularStreamsUrl = `${apiUrl}streams?stream_type=live&game=${clickGameBtn}`
          const jsonStreams = await getData(popularStreamsUrl)
          // removeChild: old 20 streams
          const node = document.querySelector('.secstion__top20-live-streams')
          const parentNode = document.querySelector('.section__content .wrapper')
          parentNode.removeChild(node)
          // appendChild: new 20 streams
          const div = document.createElement('div')
          div.classList.add('section__top20-live-streams')
          parentNode.appendChild(div)
          // update 20 streams & heading 2
          await updateLiveStreams(jsonStreams, streamsNumber)
          await dynamicUpdateH2(clickGameBtn)
        } catch (err) {
          console.log('error to show new 20 streams when clicking game name on navbar:\n', err)
        }
      }
      appendOtherStreams() // execute aynsc function
    }
  })
}

getNavAndStreams()
// functions----------------------------------------------------------------------------------------

// choose the top #number of popular games
function topGamesList(jsonData, totalNumber) {
  const nameOfgames = []
  for (let i = 0; i < totalNumber; i++) {
    nameOfgames[i] = jsonData.top[i].game.name
  }
  return nameOfgames
}

// dynamially update the top 5 games on the nav bar
function dynamicUpdateNavBar(gameList) {
  for (let i = 0; i < gameList.length; i++) {
    const newElement = document.createElement('li')
    newElement.innerHTML = `
    <a href='#' class='navbar__topFiveGames href__style'>${gameList[i]}</a>
    `
    const ulNavBar = document.querySelector('.navbar__list')
    ulNavBar.appendChild(newElement)
  }
}

// dynamically update h2
function dynamicUpdateH2(topFiveGamesList) {
  const gameSubtitle = document.querySelector('.section__game-name')
  if (typeof (topFiveGamesList) === 'object') {
    gameSubtitle.innerHTML = `${topFiveGamesList[0]}`
    return topFiveGamesList[0]
  } else if (typeof (topFiveGamesList) === 'string') {
    gameSubtitle.innerHTML = `${topFiveGamesList}`
  }
}

// dynamically update streams when a user click a game in navbar
function updateLiveStreams(jsonStreams, totalNumber) {
  for (let i = 0; i < totalNumber; i++) {
    const streamer = jsonStreams.streams[i]
    const sectionStreamer = document.createElement('div')
    sectionStreamer.classList.add('section__streamer')
    sectionStreamer.innerHTML = `
    <a href='${streamer.channel.url}' class='href__style'>
      <img class='streaming__figure-board'
        src='${streamer.preview.medium}'></img>
      <div class='streaming__profile'>
        <img class='streaming__avatar' src='${streamer.channel.logo}' width='30px' height='30px'></img>
        <div class='streaming__info'>
          <div class='streamding__tv-name ellipsis'>${streamer.channel.status}</div>
          <div class='streaming__ID'>${streamer.channel.name}</div>
        </div>
      </div>
      </a>
    `
    const sectionAllStreamers = document.querySelector('.section__top20-live-streams')
    sectionAllStreamers.appendChild(sectionStreamer)
  }
}
// console.log(jsonStreams.streams[0].channel.logo) //avatar 就是我要的
// console.log(jsonStreams.streams[i].channel.name) // ID 就是我要的
// console.log(jsonStreams.streams[i].channel.status) // 頻道實況名 就是我要的
// console.log(jsonStreams.streams[i].preview.medium)// board 就是我要的
