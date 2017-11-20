const express = require('express')
  , axios = require('axios')

const home = express.Router();

/**
 * GET home page
 */
home.get('/home', (req, res) => {
  if (!req.session.id) {
    var err = new Error('User not logged in.')
    err.status = 401
    return res.send(JSON.stringify(err, undefined, 2))
  }

  /*
    User.findOne({ _id: req.session.userId })
        .exec((err, user) => {
            if (err) res.send(JSON.stringify(err, undefined, 2))

            if (user === null) {
                var err = new Error('User not found.')
                err.status = 401
                return res.send(JSON.stringify(err, undefined, 2))
            }

            return res.render('home/index', { title: `Hi, ${user.name}!` });
        })
        */

});

module.exports = {
  home
};
