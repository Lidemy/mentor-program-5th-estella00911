const topGameNumber = 5
const streamsNumber = 20

const apiUrl = 'https://api.twitch.tv/kraken/'
const acceptHeader = 'application/vnd.twitchtv.v5+json'
const clientIdHeader = 'bmrryhslbf6vtr71xzyluf4ahb641o'

const requestNavBar = new XMLHttpRequest()
const requestStreams = new XMLHttpRequest()
const requestTopFiveStreams = new XMLHttpRequest()

requestNavBar.addEventListener('load', () => {
  if (requestNavBar.status >= 200 && requestNavBar.status < 400) {
    const jsonNavBar = jsonForm(requestNavBar) // navbar: get data
    const topFiveGames = topGamesList(jsonNavBar, topGameNumber) // get top 5 games
    // update navbar & subtitle(the most popular game)
    dynamicUpdateNavBar(topFiveGames)
    dynamicUpdateH2(topFiveGames)

    // 2nd layer: 20 streamers of the most popular game(default page)
    requestStreams.addEventListener('load', () => {
      if (requestStreams.status >= 200 && requestStreams.status < 400) {
        const jsonStreams = jsonForm(requestStreams)
        updateLiveStreams(jsonStreams, streamsNumber)
      } else {
        console.log(requestStreams.status, requestStreams.responseText)
      }
    })
    requestStreams.onerror = () => {
      console.log('error')
    }
    requestStreams.open('GET', `${apiUrl}streams?stream_type=live&game=${topFiveGames[0]}`, true)
    requestStreams.setRequestHeader('Accept', acceptHeader)
    requestStreams.setRequestHeader('Client-ID', clientIdHeader)
    requestStreams.send()
    // end of 2nd layer

    // start 2nd layer: click other games in navbar, and show 20 liv streams of the corresponding game.
    document.querySelector('.navbar__list').addEventListener('click', (e) => {
      if (e.target.classList.contains('navbar__topFiveGames')) {
        const clickGameBtn = e.target.innerText
        requestTopFiveStreams.addEventListener('load', () => {
          if (requestTopFiveStreams.status >= 200 && requestTopFiveStreams.status < 400) {
            const json = jsonForm(requestTopFiveStreams)
            // removeChild: old 20 streams
            const node = document.querySelector('.section__top20-live-streams')
            const parentNode = document.querySelector('.section__content .wrapper')
            parentNode.removeChild(node)
            // appendChild: new 20 streams
            const div = document.createElement('div')
            div.classList.add('section__top20-live-streams')
            parentNode.appendChild(div)
            updateLiveStreams(json, streamsNumber)
            dynamicUpdateH2(clickGameBtn)
          } else {
            console.log(requestTopFiveStreams.status, requestTopFiveStreams.responseText)
          }
        })
        requestTopFiveStreams.onerror = () => {
          console.log('error')
        }
        requestTopFiveStreams.open('GET', `${apiUrl}streams?stream_type=live&game=${clickGameBtn}`, true)
        requestTopFiveStreams.setRequestHeader('Accept', acceptHeader)
        requestTopFiveStreams.setRequestHeader('Client-ID', clientIdHeader)
        requestTopFiveStreams.send()
        // end of 2nd layer
      }
    })
  } else {
    console.log(requestStreams.status, requestStreams.responseText)
  }
})
requestNavBar.onerror = () => {
  console.log('error')
}
requestNavBar.open('GET', `${apiUrl}games/top?limit=${topGameNumber}`, true)
requestNavBar.setRequestHeader('Accept', acceptHeader)
requestNavBar.setRequestHeader('Client-ID', clientIdHeader)
requestNavBar.send()

// functions----------------------------------------------------------------------------------------

// get API data, and change into json format
function jsonForm(request) {
  const response = request.responseText
  const jsonStreams = JSON.parse(response)
  return jsonStreams
}

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

// console.log(jsonStreams.streams[0].channel.logo) //avatar ???????????????
// console.log(jsonStreams.streams[i].channel.name) // ID ???????????????
// console.log(jsonStreams.streams[i].channel.status) // ??????????????? ???????????????
// console.log(jsonStreams.streams[i].preview.medium)  // board ???????????????
