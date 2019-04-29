const express = require('express')
const imgRouter = express.Router()
const multer = require('multer')
const uidSafe = require('uid-safe')
const path = require('path')

const db = require('../utility/db')
const s3 = require('../utility/s3')
const {isLoggedIn, guard} = require('../middleware')



///////////////////////////////////////////////   DISCBUFFER
////////////////////////////////////////////////////////////

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/uploads');
    },
    filename: function (req, file, callback) {
      uidSafe(24).then(function(uid) {
          callback(null, uid + path.extname(file.originalname));
      });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
})

//////////////////////////////////////////////////    ROUTES
////////////////////////////////////////////////////////////

imgRouter.get('/getAvatar', guard, (req, res) => {
    console.log('get avatar..')
    db.getAvatar(req.session.isLoggedIn) 
        .then(({rows}) => {
            console.log('index', rows);
            res.json(rows)
        })
        .catch(err => {
            console.log('prob getting avatar..', err);
            res.status(500)
        })
})

imgRouter.post('/setAvatar', guard, (req, res) => {
    console.log('set avatar..', req.body.imgId)
    db.setAvatar(req.session.isLoggedIn, req.body.imgId)
        .then(({rows}) => {
            console.log('set', rows);
            res.status(400)
        })
        .catch(err => {
            res.status(404)
            console.log('err set ava..', err);
        })
})

imgRouter.get('/getImgByUserAll', guard, (req, res) => {
    console.log('para', req.params.id);
    db.getImgByUserAll(req.session.isLoggedIn)
        .then(({rows}) => {
            console.log('index', rows);
            res.json(rows)
        })
        .catch(err => {
            res.status(404)
            console.log('no img..', err);
        })
})

imgRouter.post('/postImg', guard, uploader.single('iFile'), s3.upload, (req, res) => { 
    console.log('index', res.locals.newImg)
    if (req.file) {
        db.postNewImg(res.locals.newImg.url, res.locals.newImg.userId) 
            .then(dbEntry => {
                console.log(dbEntry);
                res.json({
                    success: true,
                    url: res.locals.newImg.url
                });
            })
            .catch(err => console.log('on route..', err))
    } else {
        res.json({
            success: false
        });
    }
})

imgRouter.post('/deleteImg', guard, s3.deleteImg, (req, res) => {
    if (req.body.delId) {
        console.log('deleting..', req.body.delId);
        db.deleteRow(req.body.delId)
            .then(({data}) => {
                console.log(data);
                res.json(data)
            })
            .catch(err => console.log('del err..', err))
    }
})

/////

module.exports = imgRouter


