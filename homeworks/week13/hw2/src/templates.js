export const cssTemplate = '.card {word - wrap: break-word; white-space: pre-line;}'
export const loadMoreBtnHTML = "<button class='btn btn-primary btn-loadMore'>載入更多</button>"

export function getForm(className, commentsClassName) {
  return `
  <div>
    <form class='${className}'>
      <div class="mb-3">
        <label class="form-label">Nickname</label>
        <input name="nickname" type="text" class="form-control">
      </div>
        <div class="mb-3">
          <label class="form-label">留言內容</label>
          <textarea name="content" class="form-control" rows="3"></textarea>
        </div>
        <button type="submit" class="btn btn-primary btn-submit">新增留言</button>
    </form>
      <div class='${commentsClassName}'>
      </div>
  </div>
`
}

export function getLoadMoreButton(className) {
  return `<button class='btn btn-primary ${className}'>載入更多</button>`
}
