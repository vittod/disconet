process.env.NODE_ENV = 'develpoment';

const express = require('express');
const app = module.exports.app = express();

const authRouter = require('./routers/auth')
const imgRouter = require('./routers/img')
const mw = require('./middleware.js')


/////////////////////  MIDDLEWARE 

app.use(mw.cs)
app.use(mw.csurf)
app.use(mw.cToken)
app.use(mw.helmet)
app.use(mw.compress)
app.use(mw.bParserJ)
 

///////////////////// ROUTES

app.use(express.static(__dirname + '/public/'))

app.use(imgRouter)
app.use(authRouter)

app.get('/welcome', mw.isLoggedIn, (req, res) => {
    res.sendFile(__dirname + '/index.html')
})


app.get('/logout', (req, res) => {
    req.session = null;
    res.redirect('/')
})

app.get('*', mw.isLoggedOut, (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

app.listen(8080, function() {
    console.log("I'm listening.")
});
