// 找到 滑鼠點擊的 .section__Q-And-A 定位
document.querySelector('.section__FAQ').addEventListener('click', (e) => {
  e.target.closest('.section__Q-And-A').querySelector('.section__question').nextElementSibling.classList.toggle('fold')
})
