export function appendStyle(cssTemplate) {
  const styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  styleElement.appendChild(document.createTextNode(cssTemplate))
  document.head.appendChild(styleElement)
}

export function escape(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/\//g, '&#x2F;')
}

// 增加新留言 function 的 append
export function appendCommentToDOM(container, comment, isPrepend) {
  const html = `
  <div class="card mt-3">
    <div class="card-body">
      <h5 class="card-title">${escape(comment.nickname)}</h5>
      <p class="card-text">${escape(comment.content)}</p>
    </div>
  </div>
  `
  if (isPrepend) {
    container.prepend(html)
  } else {
    container.append(html)
  }
}
