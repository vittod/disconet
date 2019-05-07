const {app} = require('../index')
const server = require('http').Server(app)
const io = module.exports.io = require('socket.io')(server, {origins: 'localhost:8080 SOMTHINGINHREOKU.heroku.com:*'}) /////////////// change this to proper url
const {db} = require('../utility/db')

let onlineUsers = {};

io.on('connection', socket => {
    console.log(`socket with the id ${socket.id} is now connected`)
    const userId = socket.request.session.isLoggedIn
    if (userId) {
        console.log('user id mounted', userId)
    }  else {
        console.log(`access denied to socket ${socket.id}`)
        return socket.disconnect(true)
    }
            /////////// check if the user is not signed in..
    if (!Object.values(onlineUsers).filter(el => el == userId).length) {
        io.sockets.emit('userJoined', {[socket.id]: userId})
    }
    onlineUsers[socket.id] = userId
    console.log('online useres object', Object.values(onlineUsers))

    socket.emit('onlineUsers', onlineUsers)

    socket.on('disconnect', () => {
        console.log(`socket ${socket.id} is disconnected`)
        io.sockets.emit('userLeft', {delUser: socket.id })
        delete onlineUsers[socket.id]
    })
})





module.exports.server = server