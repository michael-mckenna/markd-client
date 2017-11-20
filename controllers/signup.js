const express = require('express')
  , axios = require('axios')

const signup = express.Router();

/**
 * GET signup 
 */
signup.get('/signup', (req, res) => {
  res.render('auth/signup', { title: 'Signup' });
});

/**
 * POST signup
 */
signup.post('/signup', (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    res.send('Could not save new user.')
  }

  axios.post('http://localhost:5000/auth/signup', {
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
});

module.exports = {
  signup
}
