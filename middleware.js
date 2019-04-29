const {app} = require('./index')
const compression = require('compression')
const bodyParser = require('body-parser')
const csurf = require('csurf')
const cs = require('cookie-session')
const helmet = require('helmet')

const uIf = require('./utility/userInputFormatter')

///////////////////////// BUILD SERVER HANDLING

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

///////////////////////// EXPORTS

exports.cs = cs({ 
    maxAge: 1000 * 60 * 60 * 24 * 14, 
    secret: process.env.SESSION_SECRET || require('./.secrets.json').cookieS 
})

exports.csurf = csurf()

exports.cToken = (req, res, next) => { 
    res.cookie('cToken', req.csrfToken()); 
    next() 
}

exports.helmet = helmet()

exports.compress = compression()

exports.bParserJ = bodyParser.json()
    
exports.isLoggedIn = (req, res, next) => req.session.isLoggedIn ? res.redirect('/') : next()

exports.isLoggedOut = (req, res, next) => !req.session.isLoggedIn ? res.redirect('/welcome') : next()

exports.guard = (req, res, next) => req.session.isLoggedIn ? next() : res.status(403)

exports.validateUserInput = (req, res, next) => {
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