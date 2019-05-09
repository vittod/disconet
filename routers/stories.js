const express = require('express')
const storiesRouter = express.Router()

const db = require('../utility/db')
const {guard} = require('../middleware')  


storiesRouter.get('/api/getUserStory/:id', guard, (req, res) => {
    console.log('get stories..', req.params.id)
    db.getUserStories(req.params.id)
        .then(({rows}) => {
            console.log('got stories..', rows)
                res.json({
                    success: true,
                    story: rows
                })
        })
        .catch(err => {
            res.json({
                success: false,
                msg: err.message
            })
            console.log('err get friens..', err)
        })

})

storiesRouter.post('/api/postUserStory', guard, (req, res) => {
    console.log('post story..', req.body)
    db.postUserStory(req.body.target, req.session.isLoggedIn, req.body.story, req.body.imgId)
        .then(({rows}) => {
            console.log('posted stories..')
                res.json({
                    success: true,
                    story: rows
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



module.exports = storiesRouter