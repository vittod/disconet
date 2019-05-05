const express = require('express')
const friendsRouter = express.Router()

const db = require('../utility/db')
const {guard} = require('../middleware')   /////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

friendsRouter.get('/api/getAllFriends/:status', guard, (req, res) => {
    console.log('gettin hereo..')
    db.getAllFriends(req.session.isLoggedIn, req.params.status)
        .then(({rows}) => {
            rows.map(el => {
                console.log('yooyoy', el.status)
            })

            res.json({
                success: true,
                data: rows,
                user: req.session.isLoggedIn
            })
            console.log(rows)
        })
        .catch(err => {
            res.json({
                success: false
            })
            console.log('err get friens..', err)
        })
})

friendsRouter.get('/api/getFriendship/:id', guard, (req, res) => {
    console.log('got friendcheck..', req.params.id)
    db.getFriendship(req.session.isLoggedIn, req.params.id)
        .then(({rows}) => {
            res.json({
                success: true,
                data: rows,
                user: req.session.isLoggedIn
            })
            console.log(rows)
        })
        .catch(err => {
            res.json({
                success: false
            })
            console.log('err get friens..', err)
        })

})

friendsRouter.post('/api/makeFriendReq', guard, (req, res) => {
    console.log('make friendreq..', req.body.id)
    db.getFriendship(req.session.isLoggedIn, req.body.id)
        .then(({rows}) => {
            console.log('got friend from db..', rows)
            if (rows[0]) {
                res.json({
                    success: false,
                    msg: 'request is already pending'
                })
            } else {
                db.makeFriendReq(req.session.isLoggedIn, req.body.id)
                    .then(({rows}) => {
                        console.log(rows)
                        res.json({
                            success: true,
                            data: rows
                        })
                    })
                    .catch(err => {
                        res.json({
                            success: false
                        })
                        console.log('err set friend request..', err)
                    })
            }
        })
        .catch(err => {
            res.json({
                success: false,
                msg: err.message
            })
            console.log('err get friens..', err)
        })
})

friendsRouter.post('/api/answerFriendReq', guard, (req, res) => {
    console.log('answer friendreq..', req.body.id)
    db.getFriendship(req.session.isLoggedIn, req.body.id)
        .then(({rows}) => {
            console.log('got friend from db..', rows[0])
            if (rows[0].status === 'pending') {
                db.answerFriendReq(req.session.isLoggedIn, req.body.id)
                    .then(() => {
                        console.log('friend succes')
                        res.json({
                            success: true
                        })
                    })
                    .catch(err => {
                        res.json({
                            success: false,
                            msg: 'something went wrong'
                        })
                        console.log('err set friend request..', err)
                    })                
            } else {
                res.json({
                    success: false,
                    msg: 'answer not working'
                })
            }
        })
        .catch(err => {
            res.json({
                success: false,
                msg: err.message
            })
            console.log('err get friens..', err)
        })
})

friendsRouter.post('/api/cancelFriendship',guard, (req, res) => {
    console.log('cancel friendreq..', req.body.id)
    db.cancelFriendship(req.session.isLoggedIn, req.body.id)
        .then(() => {
            console.log('terminated frindship..')
                res.json({
                    success: true
                })
        })
        .catch(err => {
            res.json({
                success: false,
                msg: err.message
            })
            console.log('err cancel friens..', err)
        })

})


module.exports = friendsRouter