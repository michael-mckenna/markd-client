const express = require('express')
  , axios = require('axios')

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
 * POST login page
 * 
 * Creates a session for the user
 */
login.post('/login', (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.send('Could not login user.')
  }

  axios.post('http://localhost:5000/auth/login', {
    email: req.body.email,
    password: req.body.password
  })
  .then(function (result) {
    const data = result.data

    if (data.status === 'success')
      return res.send(data)
    else
      return res.send('failure')
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
    req.session.destroy((err) => {
      if (err) {
        return next(err)
      } else {
        return res.redirect('/home')
      }
    })
  }
})

module.exports = {
  login
}
