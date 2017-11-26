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
    req.flash('error', 'Invalid Input Provided.  Please Try Again.')
    return res.redirect('/signup')
  }

  axios.post(config.serverURL + '/auth/signup', {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })
  .then(function (response) {
    if (!response.data['status']) {
      req.flash('error', 'Invalid Request to Sign up')
      return res.redirect('/signup')
    }

    if (response.data['status'] === 'failure') {
      req.flash('error', response.data['message'])
      return res.redirect('/signup')
    }

    req.flash('success', response.data['message'])
    return res.redirect('/login')
  })

  .catch(function (error) {
    return res.send(error)
  })
})

module.exports = {
  signup
}
