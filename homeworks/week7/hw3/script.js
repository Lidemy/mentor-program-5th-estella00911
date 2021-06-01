let number = 0
document.querySelector('.container').addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-add')) {
    const inputWords = document.querySelector('input[name=input-new]') // value = inputWords.value
    const divAdd = document.createElement('div')
    divAdd.classList.add('todo__list')
    divAdd.setAttribute('id', `${number}`)
    divAdd.setAttribute('οnmοusemοve', 'changeBgColor()')
    divAdd.innerHTML = `<div><label class='line-through'><input type='checkbox' class='btn-checkbox' name='btn-name'></input><span>${inputWords.value}</span></label></div>
<div><button class='btn-delete'>刪除</button></div>`
    document.querySelector('.section__todo-lists').appendChild(divAdd)
    number += 1
  }
  if (e.target.classList.contains('btn-delete')) {
    document.querySelector('.section__todo-lists').removeChild(e.target.closest('.todo__list'))
  }
})
