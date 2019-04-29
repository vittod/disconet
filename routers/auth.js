const express = require('express')
const authRouter = express.Router()

const db = require('../utility/db')
const {isLoggedIn, validateUserInput} = require('../middleware')

////////////////////    ROUTES

authRouter.post('/register',isLoggedIn, validateUserInput, (req, res) => {
    db.getUserByEmail(req.body.email)
        .then(({rows}) => {
            if (!rows.length) {
                db.postUser(req.body.first, req.body.last, req.body.email, req.body.password)
                .then(({rows}) => {
                    console.log('nu user..', rows[0].id_user);
                    req.session.isLoggedIn = rows[0].id_user
                    res.json({ isLoggedIn: rows[0].id_user })
                })
                .catch(err => {
                    console.log('err post nu user..', err)
                    res.json({
                        isLoggedIn: false,
                        msg: 'there has been a Problem, please try again later..'
                    })
                })
            } else {
                console.log('user already exists', rows[0])
                res.json({
                    isLoggedIn: false,
                    msg: 'user already exits'
                })
            }
        })
        .catch(err => {
            console.log('err getuserbymail..', err);
            res.json({
                isLoggedIn: false,
                msg: 'there has been a Problem, please try again later..'
            })
        })

    console.log(req.body)
})

authRouter.post('/login', isLoggedIn, validateUserInput, (req, res) => {
    console.log('trying to login', req.body.email);
    db.getUserByEmail(req.body.email)
        .then(({rows}) => {
            if (!!rows.length) {
                db.checkUser(req.body.password, rows[0].password)
                    .then(passValid => {
                        console.log('user pass valid..', passValid)
                        if (passValid) {
                            req.session.isLoggedIn = rows[0].id_user;
                            res.json({
                                isLoggedIn: rows[0].id_user,                    
                            })
                        } else {
                            console.log('password wrong')
                            res.json({
                                isLoggedIn: false,
                                msg: 'wrong password/user'
                            })
                        }
                    })
                    .catch(err => {
                        console.log('err check pass..', err)
                        res.json({
                            isLoggedIn: false,
                            msg: 'there has been a Problem, please try again later..'
                        })
                    })
            } else {
                console.log('user not found..', req.body.email)
                res.json({
                    isLoggedIn: false,
                    msg: 'no such user'
                })
            }
        })
        .catch(err => {
            console.log('err getuserbymail..', err)
                res.json({
                    isLoggedIn: false,
                    msg: 'there has been a Problem, please try again later..'
                })
        })
})

/////

module.exports = authRouter


