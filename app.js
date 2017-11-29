const fs = require('fs')
  , path = require('path')
  , flash = require('flash')
  , express = require('express')
  , session = require('express-session')
  , bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser')

// import routes
const { login } = require('./controllers/login')
  , { signup } = require('./controllers/signup')
  , { marks } = require('./controllers/marks')

// setup configuration
var config = require('./config').setup(process.env.NODE_ENV)

// initialize app
var app = express()


// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// serve static files
app.use('/static', express.static(path.join(__dirname, 'public')))

// middle-ware
app.use(cookieParser())
// app.use(cookieSession({ secret: 'secret', cookie: { maxAge: 60 * 60 * 1000 } }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session(config.session))
app.use(require('flash')())

// register routes
app.use('/', login)
app.use('/', signup)
app.use('/marks', marks)

app.get('/', (req, res) => {
  return res.redirect('/marks')
})

// run server
app.set('port', config.port)


var server = app.listen(app.get('port'), () => {
  console.log('Markd is up on port ' + config.port)
})

module.exports = {
  config
}
