const express = require('express')
    , axios = require('axios')

const config = require('./../config').setup(process.env.NODE_ENV)

const marks = express.Router()


/**
 * GET marks 
 */
marks.get('/', (req, res) => {
    if (!req.session.token) {
        req.flash('error', 'Please login to access your bookmarks.')
        return res.redirect('/login')
    }

    axios.post(config.serverURL + '/read/all', {
        email: req.session.email,
        token: req.session.token
    })
    .then(function (result) {
        if (result.data['status'] !== 'success') {
            req.flash('error', result.data['message'])
            return res.redirect('/')
        }

        return res.render('marks/marks', {
            bookmarks: result.data['bookmarks']
        })
    })
    .catch(function (error) {
        return console.log(error)
    })
})


/**
 * POST marks
 */
marks.post('/', (req, res) => {
    if (!req.session.token) {
        req.flash('error', 'Please login to access your bookmarks.')
        return res.redirect('/login')
    }

    bookmark = req.body
    axios.post(config.serverURL + "/create", {
        email: req.session.email, 
        token: req.session.token, 
        url: bookmark['url'],
        name: bookmark['name'],
        tags: bookmark['tags[]']
    })
    .then(function (result) {
        if (result.data['status'] !== 'success') {
            req.flash('error', result.data['message'])
            return res.redirect('/')
        }

        req.flash('success', 'Added bookmark')
        return res.redirect('/marks')
    })
    .catch(function (error) {
        req.flash('error', error)
        return res.redirect('/marks')
    })

    return res.redirect('/marks')
})


module.exports = {
    marks 
}
