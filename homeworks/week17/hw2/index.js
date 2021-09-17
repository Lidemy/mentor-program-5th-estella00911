require('dotenv').config()

const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const session = require('express-session')

const port = process.env.PORT || 3000
const SESSION_SECRET = process.env.SESSION_SECRET || 'keyboard cat'

const app = express()

const userController = require('./controllers/user')
const prizeController = require('./controllers/prize')

app.set('views', './views')
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(flash())
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true
  // cookie: { maxAge: 60000 }
}))

app.use((req, res, next) => {
  res.locals.errorMessage = req.flash('errorMessage')
  res.locals.username = req.session.username
  res.locals.id = req.query.id
  next()
})

app.use('/public', express.static(`${__dirname}/public`))

app.get('/scripts/faq.js', (req, res) => {
  res.sendFile(path.join(`${__dirname}/scripts/faq.js`))
})

function checkIsLogin(req, res, next) {
  // 沒有登入，導回首頁
  if (!req.session.username) {
    res.redirect('/')
    return
  }
  // 有登入，放行
  next()
}

app.get('/', userController.homePage)
app.get('/FAQ', userController.faqPage)
app.get('/login', userController.loginPage)
app.post('/login', userController.handleLogin)
app.get('/register', userController.registerPage)
app.post('/register', userController.handleRegister)
app.get('/logout', userController.logout)

app.get('/lottery', prizeController.lotteryPage)
app.get('/draw-lottery', prizeController.drawLottery)

app.get('/back-stage', checkIsLogin, prizeController.backStagePage)
app.post('/back-stage', checkIsLogin, prizeController.add)
app.get('/update-lottery/:id', checkIsLogin, prizeController.updatePage)
app.post('/update-lottery/:id', checkIsLogin, prizeController.update)
app.get('/delete-lottery/:id', checkIsLogin, prizeController.delete)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
