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
    res.send('Could not login user.')
  }

  axios.post(config.serverURL + '/auth/login', {
    email: req.body.email,
    password: req.body.password
  })
  .then(function (result) {
    const data = result.data

    if (data['status'] === 'failure') {
      return res.send('failure')
    }

    req.session.email = data['email']
    req.session.name = data['name'] 
    req.session.token = data['token']

    return res.send(data)
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
          return res.send('successfully logged out')
        }
      })
    })
    .catch(function (error) {
      return res.send('could not log out')
    })
  }
})

module.exports = {
  login
}
