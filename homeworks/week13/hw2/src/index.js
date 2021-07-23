/* eslint-disable prefer-template, prefer-const, arrow-parens, import/prefer-default-export, no-unused-vars */

import $ from 'jquery'
import { addComments, getComments } from './api'
import { appendCommentToDOM, appendStyle } from './utils'
import { cssTemplate, getLoadMoreButton, getForm } from './templates'

// 初始化
export function init(options) {
  let siteKey = ''
  let apiUrl = ''
  let commentDOM = null
  let containerElement = null
  let lastId = null
  let isEnd = false
  let loadMoreClassName = ''
  let commentsClassName = ''
  let commentsSelector = ''
  let formClassName = ''
  let formSelector = ''

  siteKey = options.siteKey
  apiUrl = options.apiUrl
  loadMoreClassName = `${siteKey}-load-more`
  commentsClassName = `${siteKey}-comments`
  formClassName = `${siteKey}-add-comment-form`

  commentsSelector = '.' + commentsClassName
  formSelector = '.' + formClassName

  containerElement = $(options.containerSelector)
  containerElement.append(getForm(formClassName, commentsClassName))

  appendStyle(cssTemplate)

  commentDOM = $(commentsSelector)
  getNewComments()

  $(commentsSelector).on('click', '.' + loadMoreClassName, () => {
    getNewComments()
  })
  $(formSelector).submit(e => {
    e.preventDefault()
    const nicknameDOM = $(`${formSelector} input[name=nickname]`)
    const contentDOM = $(`${formSelector} textarea[name=content]`)
    const newCommentData = {
      site_key: siteKey,
      nickname: nicknameDOM.val(),
      content: contentDOM.val()
    }
    addComments(apiUrl, siteKey, newCommentData, data => {
      if (!data.ok) {
        alert(data.message)
        return
      }
      getNewComments()
      appendCommentToDOM(commentDOM, newCommentData, true)
      contentDOM.val('')
      nicknameDOM.val('')
    })
  })
  function getNewComments() {
    const commentDOM = $(commentsSelector)
    $('.' + loadMoreClassName).hide()
    if (isEnd) {
      return
    }
    getComments((apiUrl, siteKey, lastId, data) => {
      if (!data.ok) {
        alert(data.message)
        return
      }
      const { comments } = data
      for (const comment of comments) {
        appendCommentToDOM(commentDOM, comment)
      }
      const { length } = comments
      lastId = comments[length - 1].id
      const loadMoreBtnHTML = getLoadMoreButton(loadMoreClassName)
      $(commentsSelector).append(loadMoreBtnHTML)
      if (length <= 5) {
        isEnd = true
        $('.' + loadMoreClassName).hide()
      }
    })
  }
}
