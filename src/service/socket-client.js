import * as io from 'socket.io-client'
import { store } from '../start'

import { setOnlineUsers, joinOnlineUser, deleteOnlineUser, setRecentChatter, nuChat, userQuery } from './actions'


export let socket;

export function connectSocket(store) {
    if (!socket) {
        socket = io.connect();
        console.log('socket connected..', socket)

        socket.on('onlineUsers', allUsers => store.dispatch(setOnlineUsers(allUsers)))

        socket.on('userJoined', newUser => store.dispatch(joinOnlineUser(newUser)))

        socket.on('userLeft', delUser => store.dispatch(deleteOnlineUser(delUser)))

        socket.on('recentChatter', chatter => store.dispatch(setRecentChatter(chatter)))
        
        socket.on('nuChatter', chat => store.dispatch(nuChat(chat))) 

        socket.on('userQuery', users => store.dispatch(userQuery(users))) 
    }
}
