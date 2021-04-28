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
  // about input value
  const range = lines[0].split(' ') // range from start to end
  const A = Number(range[0]) // start value = A
  const B = Number(range[1]) // last value = B

  // find out Narcissistic number
  for (let i = A; i <= B; i++) {
    isNarcissistic(i)
  }

  // function
  function isNarcissistic(num) {
    const numString = String(num) // change format: num -> string
    const numStringLength = numString.length // length of numString
    let narNum = 0 // set variable: Narcissistic number

    // calculate the rule ,Narcissistic number.
    for (let i = 0; i < numStringLength; i++) {
      narNum += Math.pow(numString[i], numStringLength)
    }

    // 'num'  =?=  Narcissistic number
    if (Math.abs(narNum - num) < 0.001) {
      console.log(num)
    }
  }
}

// 輸入結束，開始針對 lines 做處理
rl.on('close', () => {
  solve(lines)
})
