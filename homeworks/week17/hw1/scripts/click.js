// let urlBase = 'http://estella00911.tw/w11_blog';
const urlBase = 'http://localhost:5001'
const articlePost = document.querySelectorAll('.article__post')
for (let i = 0; i < articlePost.length; i++) {
  articlePost[i].addEventListener('click', (e) => {
    location.href = `${urlBase}/article/${e.currentTarget.id}`
  })
}
