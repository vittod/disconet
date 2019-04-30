const express = require('express')
const profileRouter = express.Router()

const db = require('../utility/db')
const {guard} = require('../middleware')



profileRouter.get('/getProfile', (req, res) => {
    console.log('get profile..')
    db.getByColumn('profiles', 'id_user_fk', req.session.isLoggedIn) 
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
    db.setProfile(req.session.isLoggedIn, req.body.profile)
        .then(() => {
            console.log('set');
            res.status(400)
        })
        .catch(err => {
            res.status(500)
            console.log('err set ava..', err);
        })
})


module.exports = profileRouter