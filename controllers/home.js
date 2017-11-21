const express = require('express')
  , axios = require('axios')

const home = express.Router();

/**
 * GET home page
 */
home.get('/home', (req, res) => {
  if (!req.session.token) {
    var err = new Error('User not logged in.')
    err.status = 401
    return res.send(JSON.stringify(err, undefined, 2))
  }

  return res.render('home/index', { title: `Hi, ${req.session.name}!` });
});


module.exports = {
  home
};
