const express = require('express')
  , axios = require('axios')

const home = express.Router();

/**
 * GET home page
 */
home.get('/home', (req, res) => {
  if (!req.session.token) {
    return res.render('home/index', { title: 'Markd'});
  }

  return res.render('home/index', { title: `${req.session.name}'s Markd` });
});


module.exports = {
  home
};
