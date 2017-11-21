const express = require('express')
  , axios = require('axios')

const config = require('./../config').setup(process.env.NODE_ENV)

const signup = express.Router()

/**
 * GET signup 
 */
signup.get('/signup', (req, res) => {
  req.flash('info', 'hello')
  res.render('auth/signup', { title: 'Signup' })
})

/**
 * POST signup
 */
signup.post('/signup', (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    res.send('Could not save new user.')
  }

  axios.post(config.serverURL + '/auth/signup', {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })
  .then(function (result) {
    return res.send(result.data)
  })
  .catch(function (error) {
    return res.send(error)
  })
})

module.exports = {
  signup
}
