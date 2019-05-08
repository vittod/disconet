import * as io from 'socket.io-client'
import { store } from '../start'

import { setOnlineUsers, joinOnlineUser, deleteOnlineUser, setRecentChatter, nuChat } from './actions'


export let socket;

export function connectSocket(store) {
    console.log('socket prev..', socket)
    if (!socket) {
        socket = io.connect();
        console.log('socket after..', socket)

        socket.on('onlineUsers', allUsers => store.dispatch(setOnlineUsers(allUsers)))

        socket.on('userJoined', newUser => store.dispatch(joinOnlineUser(newUser)))

        socket.on('userLeft', delUser => store.dispatch(deleteOnlineUser(delUser)))

        socket.on('recentChatter', chatter => store.dispatch(setRecentChatter(chatter)))
        
        socket.on('nuChatter', chat => store.dispatch(nuChat(chat))) 
    }
}
