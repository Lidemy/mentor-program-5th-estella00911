const db = require('../models')

const { Article } = db
const { User } = db

const blogController = {
  homePage: (req, res) => {
    Article.findAll({
      where: {
        is_deleted: null
      },
      order: [['id', 'DESC']],
      include: User
      // offset: 5,
      // limit: 5
    }).then((article) => {
      // console.log(JSON.stringify(article,null,4))
      res.render('index', {
        article
      })
    })
  },
  pageAdd: (req, res) => {
    res.render('add_article')
  },
  add: (req, res) => {
    const { title, category, content } = req.body
    const { UserId, username } = req.session

    if (!title || !category || !content) {
      req.flash('errorMessage', 'Please input missing fields')
      return res.redirect('back')
    }

    User.findOne({
      where: {
        username
      }
    }).then(() => {
      Article.create({
        title,
        category,
        content,
        UserId
      }, {
        include: [
          { model: User }
        ]
      }).then(() => res.redirect('/')).catch((err) => {
        req.flash('errorMessage', err.toString())
      })
    }).catch((err) => {
      req.flash('errorMessage', 'Please login before add a new post') // req.session.username 與資料庫 User 不符
      res.redirect('back')
    })
  },
  article: (req, res) => {
    Article.findOne({
      where: {
        id: req.params.id,
        is_deleted: null
      }
    }).then((article) => {
      res.render('article_page', {
        article
      })
    })
  },
  delete: (req, res) => {
    const { UserId } = req.session
    Article.findOne({
      where: {
        id: req.params.id,
        UserId
      }
    }).then((article) => article.update({
      is_deleted: 1
    })).then(() => {
      res.redirect('/')
      res.sendStatus(200)
    }).catch((err) => {
      res.redirect('back')
    })
  },
  pageUpdate: (req, res) => {
    Article.findOne({
      where: {
        id: req.params.id
      }
    }).then((article) => {
      res.render('update_article', {
        article
      })
    })
  },
  update: (req, res) => {
    const { title, category, content } = req.body
    const { UserId } = req.session
    Article.findOne({
      where: {
        id: req.params.id,
        UserId
      }
    }).then((article) => article.update({
      title,
      category,
      content
    })).then((record) => {
      res.redirect('/')
    }).catch((err) => {
      req.flash('errorMessage', 'You are not authorized to edit this post')
      res.redirect('back')
    })
  },
  list: (req, res) => {
    Article.findAll({
      where: {
        is_deleted: null
      },
      order: [['id', 'DESC']],
      include: User
    }).then((article) => {
      res.render('list_articles', {
        article
      })
    }).catch((err) => {
    })
  }
}

module.exports = blogController
