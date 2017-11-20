const fs = require('fs')
  , path = require('path')
  , express = require('express')
  , session = require('express-session')
  , bodyParser = require('body-parser')

// import routes
const { home } = require('./controllers/home')
  , { login } = require('./controllers/login')
  , { signup } = require('./controllers/signup')

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

app.use(session({
  secret: '7670df08880cbeba1451d5a888ba26ee1f542a1f1a0ddb01',
  resave: true,
  saveUninitialized: false
}));

// register routes
app.use('/', home);
app.use('/', login);
app.use('/', signup);

// run server
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), () => {
  console.log('Markd is up on port 5000!');
});
