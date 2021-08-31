const bcrypt = require('bcrypt')
const db = require('../models')

const saltRounds = 10
const { User } = db

const userController = {
  homePage: (req, res) => {
    res.render('index')
  },
  faqPage: (req, res) => {
    res.render('faq')
  },
  loginPage: (req, res) => {
    res.render('login')
  },
  registerPage: (req, res) => {
    res.render('register')
  },
  handleRegister: (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
      req.flash('errorMessage', 'Please input missing fields')
      res.redirect('back')
      return
    }

    bcrypt.hash(password, saltRounds, async(err, hash) => {
      if (err) {
        req.flash('errorMessage', err.toString())
        res.redirect('back')
        return
      }
      try {
        const user = await User.create({
          username,
          password: hash
        })
        req.session.username = user.username
        res.redirect('/')
      } catch (err) {
        req.flash('errorMessage', 'already registered')
        res.redirect('back')
      }
    })
  },
  handleLogin: async(req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
      req.flash('errorMessage', 'Please input missing fields')
      res.redirect('back')
      return
    }
    try {
      const user = await User.findOne({
        where: {
          username
        }
      })
      const hash = user.password
      bcrypt.compare(password, hash, (err, result) => {
        if (err || !result) {
          req.flash('errorMessage', 'Incorrect Password')
          return res.redirect('back')
        }
        req.session.username = user.username
        res.redirect('/')
      })
    } catch (err) { // err.toString() = 'TypeError: Cannot read property 'password' of null'
      req.flash('errorMessage', 'Sorry, we cannot find a matching username.')
      res.redirect('back')
    }
  },
  logout: async(req, res) => {
    const { username } = req.session
    if (username) {
      await req.session.destroy()
      await res.clearCookie('connect.sid') // clean up!
      await res.redirect('back')
    }
    // else 如果沒登出？
  }
}

module.exports = userController
