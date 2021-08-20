require('dotenv').config()

const bcrypt = require('bcrypt')
const db = require('../models')

const saltRounds = 10
const { User } = db

const userController = {
  register: (req, res) => {
    res.render('register')
  },
  handleRegister: (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
      req.flash('errorMessage', 'Please input missing fields')
      return res.redirect('back')
    } else if (!req.session.username) {
      req.flash('errorMessage', 'You are not authorized to register')
      return res.redirect('back')
    }

    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        req.flash('errorMessage', err.toString())
        return res.redirect('back')
      }

      User.create({
        username,
        password: hash
      }).then((user) => {
        req.session.username = username
        req.session.UserId = user.id
        res.redirect('/')
      }).catch((err) => {
        req.flash('errorMessage', 'the username provided is already registered')
        res.redirect('back')
      })
    })
  },
  login: (req, res) => {
    res.render('login')
  },
  handleLogin: (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
      req.flash('errorMessage', 'Please input missing fields')
      return res.redirect('back')
    }

    User.findOne({
      where: {
        username
      }
    }).then((user) => {
      if (!user) {
        req.flash('errorMessage', 'the username provided is not registered')
        return res.redirect('back')
      }
      bcrypt.compare(password, user.password, (err, result) => {
        if (err || !result) {
          req.flash('errorMessage', 'Incorrect Password')
          return res.redirect('back')
        }
        req.session.UserId = user.id
        req.session.username = user.username
        return res.redirect('/')
      })
    })
  },
  logout: (req, res) => {
    req.session.destroy()
    res.redirect('/')
  }
}

module.exports = userController
