process.env.NODE_ENV = 'develpoment'                                                          //////////////////change when PROD 

const express = require('express')
const app = module.exports.app = express()
const {server} = require('./routers/socket')

const authRouter = require('./routers/auth')
const imgRouter = require('./routers/img')
const profileRouter = require('./routers/profile')
const friendsRouter = require('./routers/friends')

const mw = require('./middleware.js')


///////////////////////////////////////////////// MIDDLEWARE
//////////////////////////////////////////////////////////// 

app.use(mw.cs)
app.use(mw.csurf)
app.use(mw.cToken) 
app.use(mw.helmet)     
app.use(mw.compress)
app.use(mw.bParserJ)
 

///////////////////////////////////////////////////// ROUTES
////////////////////////////////////////////////////////////

app.use(express.static(__dirname + '/public'))

app.use(authRouter)
app.use(imgRouter)
app.use(profileRouter)
app.use(friendsRouter)

app.get('/welcome', mw.isLoggedIn, (req, res) => {
    res.sendFile(__dirname + '/index.html')
})


app.get('/logout', (req, res) => {
    req.session = null;
    res.redirect('/')
})

app.get('*', mw.isLoggedOut, (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

server.listen(8080, () => {
    console.log("server listening..")
})


////////////////////////////////////////////////// SOCKET IO
////////////////////////////////////////////////////////////


// let onlineUsers = {};

// io.on('connection', socket => {

//     console.log(`socket with the id ${socket.id} is now connected`)

//     const userId = socket.request.session.isLoggedIn

//     console.log('user id has been mounted', userId)

//     onlineUsers[socket.id] = userId

//     console.log('online useres object', onlineUsers)

//     socket.emit('test', {
//         msg: 'this is a test'
//     })

//     socket.on('disconnect', () => {
//         console.log(`socket with the id ${socket.id} is now disconnected`);
//     })

// })