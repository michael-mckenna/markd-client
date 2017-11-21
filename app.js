const fs = require('fs')
  , path = require('path')
  , express = require('express')
  , session = require('express-session')
  , bodyParser = require('body-parser')

// import routes
const { home } = require('./controllers/home')
  , { login } = require('./controllers/login')
  , { signup } = require('./controllers/signup')

// setup configuration
const config = require('./config').setup(process.env.NODE_ENV)

// initialize app
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// serve static files
app.use('/static', express.static(path.join(__dirname, 'public')));

// middle-ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session(config.session))

// register routes
app.use('/', home);
app.use('/', login);
app.use('/', signup);

// run server
app.set('port', config.port);

var server = app.listen(app.get('port'), () => {
  console.log('Markd is up on port ' + config.port);
});

module.exports = {
  config
}
