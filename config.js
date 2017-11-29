var config = {
  production: {
    session: {
      secret: '7670df08880cbeba1451d5a888ba26ee1f542a1f1a0ddb01',
      resave: true,
      saveUninitialized: false
    },
    port: process.env.PORT,
    serverURL: 'http://markd-api.herokuapp.com'
  },
  default: {
    session: {
      secret: '7670df08880cbeba1451d5a888ba26ee1f542a1f1a0ddb01',
      resave: true,
      saveUninitialized: false
    },
    port: 3000,
    serverURL: 'http://localhost:5000'
  }
}

const setup = function(env) {
  return config[env] || config.default
}

module.exports = {
  setup
}
