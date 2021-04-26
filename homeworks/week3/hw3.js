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
  const arrLength = lines[0] // save array length
  let result = []
  for (let i = 1; i <= arrLength; i++) { // for loop
    result = isPrime(lines[i])
    console.log(result) // print
  } // endfor

  // judge a number: composite or prime
  function isPrime(num) {
    if (num > 1) {
      if (totalFactors(num) === 2) {
        return 'Prime'
      } else if (totalFactors(num) > 2) {
        return 'Composite'
      }
    } else if (num === '1') {
      return 'Composite'
    }
  }

  // calculate how many factors in a number.
  function totalFactors(num) {
    let sum = 0
    for (let i = 1; i <= num; i++) {
      if (num % i === 0) {
        sum += 1
      }
    }
    return sum
  }
}
// 輸入結束，開始針對 lines 做處理
rl.on('close', () => {
  solve(lines)
})
