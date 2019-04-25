const express = require('express');
const app = express();
const compression = require('compression')
const bodyParser = require('body-parser')
const csurf = require('csurf')
const cs = require('cookie-session')
const db = require('./utility/db')

/////////////////////  MIDDLEWARE 
const isLoggedIn = (req, res, next) => req.session.isLoggedIn ? res.redirect('/') : next()
const isLoggedOut = (req, res, next) => !req.session.isLoggedIn ? res.redirect('/welcome') : next()

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

app.post('/register',isLoggedIn, (req, res) => {
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

app.post('/login', isLoggedIn, (req, res) => {
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

app.get('*', isLoggedOut, (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

app.listen(8080, function() {
    console.log("I'm listening.")
});
