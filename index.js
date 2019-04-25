const express = require('express');
const app = express();
const compression = require('compression');
const bodyParser = require('body-parser')
const cs = require('cookie-session')
const db = require('./utility/db')

const isLoggedIn = (req, res, next) => req.session.loggedIn ? res.redirect('/') : next()
const isLoggedOut = (req, res, next) => !req.session.loggedIn ? res.redirect('/welcome') : next()

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
app.use(cs({ maxAge: 1000 * 60 * 60 * 24 * 14, secret: process.env.SESSION_SECRET || require('./.secret.json').cookieS }))

app.use(express.static(__dirname + '/public/'))

app.post('/register', (req, res) => {
    db.getUserByEmail(req.body.email)
        .then(({rows}) => {
            console.log(rows)
            if (rows.length <= 0) {
                db.postUser(req.body.first, req.body.last, req.body.email, req.body.password)
                    .then(resp => {
                        console.log('nu user..', resp)
                        res.status(200)
                    })
                    .catch(err => console.log('err post nu user..', err))
            }
        })
        .catch(err => console.log('err getuserbymail..', err))

    console.log(req.body)
})

app.get('/welcome', isLoggedIn, (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('*', isLoggedOut, (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

app.listen(8080, function() {
    console.log("I'm listening.")
});
