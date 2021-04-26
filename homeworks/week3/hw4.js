const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin
})

const lines = []

// 讀取到一行，先把這一行加進去 lines 陣列，最後再一起處理
rl.on('line', (line) => {
  lines.push(line)
})

// 上面都不用管，只需要完成這個 function 就好，可以透過 lines[i] 拿取內容
function solve(lines) {
  if (lines[0] === reverse(lines[0])) {
    console.log('True')
  } else {
    console.log('False')
  }
}

function reverse(str) {
  const strSplit = str.split('')
  const reverseStr = []
  for (let i = 0; i < strSplit.length; i++) {
    reverseStr[i] = strSplit[strSplit.length - 1 - i]
  }
  return reverseStr.join('')
}

// 輸入結束，開始針對 lines 做處理
rl.on('close', () => {
  solve(lines)
})
