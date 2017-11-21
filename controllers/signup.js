const express = require('express')
  , axios = require('axios')

const config = require('./../config').setup(process.env.NODE_ENV)

const signup = express.Router()

/**
 * GET signup 
 */
signup.get('/signup', (req, res) => {
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
    if (result.data['status'] === undefined) {
      req.flash('error', 'Invalid Request to Sign up')
      return res.redirect('/signup')
    }

    if (result.data['status'] === 'failure') {
      req.flash('error', result.data['message'])
      return res.redirect('/signup')
    }

    req.flash('success', result.data['message'])
    return res.redirect('/login')
  })

  .catch(function (error) {
    return res.send(error)
  })
})

module.exports = {
  signup
}
