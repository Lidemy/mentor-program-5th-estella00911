/* eslint-disable brace-style */
document.querySelector('.form__body').addEventListener('submit', (e) => {
  const texts = document.querySelectorAll('input.input__style') // 監聽所有文字輸入框，並將這些文字輸入框的標籤存成一個類似矩陣
  const think = document.getElementById('think') // 定位 radio btn 的標籤
  const cellphone = document.getElementById('cellphone') // 定位 radio btn 的標籤

  // 確認文字輸入框與 radio 按鈕，有沒有輸入。有輸入回傳 true；沒有輸入 回傳 false。-----------
  const booleanIsFilled = isFilled() // [文字輸入框1, 文字輸入框2, 文字輸入框3, 文字輸入框4, [1st radio-btn, 2nd radio-btn]]
  const btnChecked = booleanIsFilled[texts.length] // 把 radio-btn 的值（[有填寫true, 沒填寫 false]）取出來另存成 btn-checked

  // 表單驗證：radio 按鈕-----------
  // 設立變數：定位radio btn
  const btnRadios = document.querySelector('.form__radio')
  // 若沒有勾選任何 radio btn ，就會增加 class「.form__required」顯示「紅字必填」，並阻止表單submit發送行為。
  if (btnChecked[0] === false && btnChecked[1] === false) {
    btnRadios.querySelector('.required__style').classList.add('form__required-notification')
    e.preventDefault()
  }
  // 先前沒有勾選，顯示紅字，現在若是有勾選的話，要消除「紅字必填」。
  // 所以分為兩派：選1、選2
  // 並在其中加上判斷式：若含有「紅字必填」的class，就要把這個移除(remove)，這樣勾選按鈕後，紅字必填才會消失。
  else {
    if (btnChecked[0] === false && btnChecked[1] === true) { // 派：選 1
      // 在其中加上判斷式：若含有「紅字必填」的class，就要把這個移除(remove)，這樣勾選按鈕後，紅字必填才會消失。
      if (btnRadios.querySelector('.required__style').classList.contains('form__required-notification')) {
        btnRadios.querySelector('.required__style').classList.remove('form__required-notification')
      }
    } else if (btnChecked[0] === false && btnChecked[1] === true) { // 派：選 2
      // 在其中加上判斷式：若含有「紅字必填」的class，就要把這個移除(remove)，這樣勾選按鈕後，紅字必填才會消失。
      if (btnRadios.querySelector('.required__style').classList.contains('form__required-notification')) {
        btnRadios.querySelector('.required__style').classList.remove('form__required-notification')
      }
    }
  }

  // 判斷每個文字輸入框是否有填寫。
  let iteration = 0 // 用於計算文字輸入框是否有填寫，沒有填寫的話，會 >0，均有填寫會為 0。
  for (let i = 0; i < texts.length - 1; i++) {
    if (!booleanIsFilled[i]) {
      texts[i].closest('.form__question').querySelector('.required__style').classList.add('form__required-notification')
      iteration += 1
    } else if (texts[i].closest('.form__question').querySelector('.required__style').classList.contains('form__required-notification')) {
      texts[i].closest('.form__question').querySelector('.required__style').classList.remove('form__required-notification')
    }
  }
  if (iteration > 0) { // > 0 -> 有空白的
    e.preventDefault()
  }

  // 函式：辨別文字輸入框與 radio button 是不是空白
  // 空白：isFilled()會回傳false，反之，有填寫，在isFilled()會回傳 true
  function isFilled() {
    const boolean = []
    for (let i = 0; i < texts.length - 1; i++) {
      if (texts[i].value === '') {
        boolean[i] = false
      } else {
        boolean[i] = true
      }
    }

    boolean[texts.length] = [think.checked, cellphone.checked]
    return boolean
  }

  // 函式：判斷 radio button 勾選哪一個，用於表單送出後 alert 顯示活動報名類型。
  function typeChoice() {
    if (think) {
      return think.value
    } else if (cellphone) {
      return cellphone.value
    }
  }

  // 判斷式：如果必填都有填寫資料的話，表單就會成功送出，並使用 alert 彈窗出填寫結果。
  if (iteration === 0 && btnChecked !== [false, false]) {
    alert(`
      暱稱：${texts[0].value}
      電子郵件：${texts[1].value}
      手機號碼：${texts[2].value}
      報名類型：${typeChoice()}
      得知活動的原因：${texts[3].value}
      其他：${texts[4].value}
      `)
  }
})
