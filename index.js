const express = require('express');
const app = express();
const compression = require('compression')
const bodyParser = require('body-parser')
const csurf = require('csurf')
const cs = require('cookie-session')
const path = require('path')
const uidSafe = require('uid-safe')
const multer = require('multer')


const s3 = require('./utility/s3')
const db = require('./utility/db')
const uIf = require('./utility/userInputFormatter')

/////////////////////   GENERAL STUFF

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
});

/////////////////////  MIDDLEWARE 
const isLoggedIn = (req, res, next) => req.session.isLoggedIn ? res.redirect('/') : next()
const isLoggedOut = (req, res, next) => !req.session.isLoggedIn ? res.redirect('/welcome') : next()

const validateUserInput = (req, res, next) => {
    console.log('middle', req.body)
    if (req.path === '/register') {
        if (req.body.email && req.body.password && req.body.first && req.body.last) {
            if (
                uIf.sanitizer(req.body.first) === req.body.first
                &&
                uIf.sanitizer(req.body.last) === req.body.last
            ) {
                uIf.mailValid(req.body.email) ? next() : res.json({
                    isLoggedIn: false,
                    msg: 'your email is not valid'
                })
            } else {
                res.json({
                    isLoggedIn: false,
                    msg: 'you are using invalid characters'
                })
            }
        } else {
            res.json({
                isLoggedIn: false,
                msg: 'all fields are required'
            })
        }
    } else if (req.path === '/login') {
        if (req.body.email && req.body.password) {
            uIf.mailValid(req.body.email) ? next() : res.json({
                isLoggedIn: false,
                msg: 'your email is not valid'
            })
        } else {
            res.json({
                isLoggedIn: false,
                msg: 'all fields are required'
            })
        }
    } else {
        next()
    }
}
app.use((req, res,next) => {console.log('here', req.path); next()})

app.use(cs({ maxAge: 1000 * 60 * 60 * 24 * 14, secret: process.env.SESSION_SECRET || require('./.secret.json').cookieS }))
app.use(csurf());

app.use(function(req, res, next){
    res.cookie('cToken', req.csrfToken());
    next();
});

app.use(compression());
app.use(bodyParser.json())
if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`))
}

///////////////////// ROUTES

app.use(express.static(__dirname + '/public/'))

app.post('/register',isLoggedIn, validateUserInput, (req, res) => {
    db.getUserByEmail(req.body.email)
        .then(({rows}) => {
            if (!rows.length) {
                db.postUser(req.body.first, req.body.last, req.body.email, req.body.password)
                .then(({rows}) => {
                    console.log('nu user..', rows[0].id_user);
                    req.session.isLoggedIn = rows[0].id_user
                    res.json({ isLoggedIn: true })
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

app.post('/login', isLoggedIn, validateUserInput, (req, res) => {
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
                                isLoggedIn: true,                    
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

app.get('/welcome', isLoggedIn, (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/logout', (req, res) => {
    req.session = null;
    res.redirect('/')
})

////   

app.get('/getById/:id', (req, res) => {
    console.log('para', req.params.id);
    db.getById(req.params.id)
        .then(({rows}) => {
            console.log('index', rows);
            res.json(rows)
        })
        .catch(err => {
            res.status(404).json([])
            console.log('no img..', err);
        })
})

app.post('/postImg', uploader.single('iFile'), s3.upload, (req, res) => {
    console.log('index', res.locals.newImg)
    if (req.file) {
        db.postNewImg(res.locals.newImg.url, res.locals.newImg.username, res.locals.newImg.title, res.locals.newImg.description)
            .then(dbEntry => {
                console.log(dbEntry);
                res.json({
                    success: true,
                    url: res.locals.newImg.url
                });
            })
    } else {
        res.json({
            success: false
        });
    }
})

app.post('/deleteImg', s3.deleteImg, (req, res) => {
    if (req.body.delId) {
        console.log('deleting..', req.body.delId);
        db.deleteImg(req.body.delId)
            .then(({data}) => {
                console.log(data);
                res.json(data)
            })
            .catch(err => console.log('del err..', err))
    }
})

/////

app.get('*', isLoggedOut, (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

app.listen(8080, function() {
    console.log("I'm listening.")
});
