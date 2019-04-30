const express = require('express')
const profileRouter = express.Router()

const db = require('../utility/db')
const {guard} = require('../middleware')



profileRouter.get('/getProfile', (req, res) => {
    console.log('get profile..')
    db.getProfileById(req.session.isLoggedIn) 
        .then(({rows}) => {
            console.log('index', rows);
            res.json(rows)
        })
        .catch(err => {
            console.log('prob getting profile..', err);
            res.status(500)
        })
})

profileRouter.post('/setProfile', guard, (req, res) => {
    console.log('set profile..', req.session.isLoggedIn)
    db.setProfile(req.session.isLoggedIn, req.body.bio, req.body.age, req.body.city)
        .then(() => {
            console.log('set');
            res.json({success: true})
        })
        .catch(err => {
            res.status(500)
            console.log('err set ava..', err);
        })
})


module.exports = profileRouter