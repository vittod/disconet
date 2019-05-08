const {app} = require('../index')
const server = require('http').Server(app)
const io = module.exports.io = require('socket.io')(server, {origins: 'localhost:8080 SOMTHINGINHREOKU.heroku.com:*'}) /////////////// change this to proper url

const redis = require('../redis') 
const db = require('../utility/db')

let onlineUsers = [];

io.on('connection', socket => {
    console.log(`socket with the id ${socket.id} is now connected`)
    const userId = socket.request.session.isLoggedIn
    if (userId) {
        console.log('user id mounted', userId)
    }  else {
        console.log(`access denied to socket ${socket.id}`)
        return socket.disconnect(true)
    }

    handleUSer(userId, socket)

    socket.on('incommingChat', chat => {
        handleIncomeChat(chat)
    })
    
    socket.on('disconnect', () => {
        console.log(`socket ${socket.id} is disconnected`)
        io.sockets.emit('userLeft', {delUser: socket.id })
        onlineUsers = onlineUsers.filter(el => el.socket != socket.id)
    })
})


async function handleUSer(user, socket) {
    try {
        let {rows} = await db.getOtherProfile(user)
        let userAggr = {
            userId: user,
            socket: socket.id,
            first: rows[0].first,
            last: rows[0].last,
            url: rows[0].url
        }
        console.log('userAggr', userAggr.first)
        
        if (!onlineUsers.filter(el => el.userId == user).length) {
            io.sockets.emit('userJoined', userAggr)
        }

        onlineUsers.push(userAggr)
        onlineUsers.forEach(el => console.log('online', el. first))

        socket.emit('onlineUsers', onlineUsers)
        
        sendRecentChatter(socket)
    
    } catch (err) {
        console.log('err get user prof socket..', err)
    }

}

async function sendRecentChatter(socket) {

    try {
        let chatStore = await redis.get('chatStore')
        chatStore = JSON.parse(chatStore)//.slice(10) //////// dDODOOOOO STUUUUFFFFFFF
        socket.emit('recentChatter', chatStore) 
    } catch (err) {
        console.log('err send/get recent chat..', err)
    }
}

async function handleIncomeChat(chat) {
    io.sockets.emit('nuChatter', chat)
    try {
        let chatStore = await redis.get('chatStore')
        chatStore == null ? chatStore = [] : chatStore = JSON.parse(chatStore)
        chatStore.unshift(chat)
        console.log('chatstore get..', chatStore)
        let storeInfo = await redis.setex('chatStore', 18000, JSON.stringify(chatStore))
        console.log('storeNfo', storeInfo)
    } catch (err) {
        console.log('err store nue chat in redis..', err)
    }
}



module.exports.server = server