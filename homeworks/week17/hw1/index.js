require('dotenv').config()
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const session = require('express-session')
const moment = require('moment')

const shortDateFormat = 'YYYY-MM-DD HH:mm' // "ddd @ h:mmA"
const app = express()
const port = process.env.DB_PORT

const userController = require('./controllers/user')
const blogController = require('./controllers/blog')

app.set('views', './views')
app.set('view engine', 'ejs')
app.use('/public', express.static(`${__dirname}/public`))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

app.use((req, res, next) => {
  res.locals.username = req.session.username
  res.locals.errorMessage = req.flash('errorMessage')
  res.locals.id = req.params.id
  app.locals.moment = moment
  app.locals.shortDateFormat = shortDateFormat
  // ejs: <%= moment(article.createdAt).format(shortDateFormat) %>
  next()
})
app.get('/scripts/click.js', (req, res) => {
  res.sendFile(path.join(`${__dirname}/scripts/click.js`))
})

app.get('/', blogController.homePage)
app.get('/scripts')
app.get('/login', userController.login)
app.post('/login', userController.handleLogin)
app.get('/logout', userController.logout)
app.get('/register', userController.register)
app.post('/register', userController.handleRegister)

app.get('/add-article', blogController.pageAdd)
app.post('/add-article', blogController.add)
app.get('/article/:id', blogController.article)
app.get('/delete/:id', blogController.delete)
app.get('/update-article/:id', blogController.pageUpdate)
app.post('/update-article/:id', blogController.update)
app.get('/list-articles', blogController.list)
// app.get('/blog-admin', blogController.blogAdmin);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
