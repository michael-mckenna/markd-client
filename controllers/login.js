const express = require('express')
  , axios = require('axios')

const config = require('./../config').setup(process.env.NODE_ENV)

const login = express.Router()

/**
 * GET login
 * 
 * Renders the login page
 */
login.get('/login', (req, res) => {
  res.render('auth/login', { title: 'Login' })
})

/**
 * POST login
 * 
 * Creates a session for the user
 */
login.post('/login', (req, res) => {
  if (!req.body.email || !req.body.password) {
    req.flash('error', 'Invalid Input Provided.  Please Try Again.')
    return res.redirect('/login')
  }
  
  axios.post(config.serverURL + '/auth/login', {
    email: req.body.email,
    password: req.body.password
  })
  .then(function (result) {
    if (!result.data['status']) {
      req.flash('error', 'Invalid Request to Sign up')
      return res.redirect('/signup')
    }

    if (result.data['status'] === 'failure') {
      req.flash('error', result.data['message'])
      return res.redirect('/login')
    }

    req.session.email = result.data['email']
    req.session.name = result.data['name'] 
    req.session.token = result.data['token']

    req.flash('success', 'Welcome, ' + req.session.name)
    return res.redirect('/marks')
  })
  .catch(function (error) {
    return res.send(error)
  })
})

/**
 * GET logout
 * 
 * Deletes the session for the current user
 */
login.get('/logout', (req, res, next) => {
  if (req.session) {
    axios.post(config.serverURL + '/auth/logout', {
      email: req.session.email,
      token: req.session.token
    })
    .then(function () {
      req.session.destroy((err) => {
        if (err) {
          return next(err)
        } else {
          req.flash('success', 'Successfully logged out')
          return res.redirect('/login')
        }
      })
    })
    .catch(function (error) {
      req.flash('error', 'Unable to log out.')
      return res.redirect('/login')
    })
  }
})

module.exports = {
  login
}
