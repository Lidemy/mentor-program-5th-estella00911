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
  const totalTeam = lines[0]
  for (let i = 1; i <= totalTeam; i++) {
    console.log(teamGame(lines[i]))
  }
}

function teamGame(input) {
  const inputArray = input.split(' ')
  const A = inputArray[0] // A number, typeof(A)=string
  const B = inputArray[1] // B number, typeof(B)=string
  const BiggerOrSmaller = inputArray[2] // 1=bigger num, -1=smaller num
  if (A === B) { // A = B -> draw
    return 'DRAW'
  }
  if (A.length === B.length) { // Same number of digits e.g. A=12345 v.s. B=13543
    // compare the number of each digit
    for (let i = 0; i < A.length; i++) {
      if (A[i] === B[i]) {
        continue
      } else if (A[i] > B[i]) {
        if (BiggerOrSmaller === '1') { // bigger
          return 'A'
        } else if (BiggerOrSmaller === '-1') { // smaller
          return 'B'
        }
      } else if (A[i] < B[i]) {
        if (BiggerOrSmaller === '1') { // bigger
          return 'B'
        } else if (BiggerOrSmaller === '-1') { // smaller
          return 'A'
        }
      }
    }
  // the length of digits: A > B
  } else if (A.length > B.length) {
    if (BiggerOrSmaller === '1') { // bigger
      return 'A'
    } else if (BiggerOrSmaller === '-1') { // smaller
      return 'B'
    } else if (A.length < B.length) {
      if (BiggerOrSmaller === '1') { // bigger
        return 'B'
      } else if (BiggerOrSmaller === '-1') { // smaller
        return 'A'
      }
    }
    // the length of digits: A < B
  } else if (A.length < B.length) {
    if (BiggerOrSmaller === '1') { // bigger
      return 'B'
    } else if (BiggerOrSmaller === '-1') { // smaller
      return 'A'
    } else if (A.length < B.length) {
      if (BiggerOrSmaller === '1') { // bigger
        return 'A'
      } else if (BiggerOrSmaller === '-1') { // smaller
        return 'B'
      }
    }
  }
}

// 輸入結束，開始針對 lines 做處理
rl.on('close', () => {
  solve(lines)
})
