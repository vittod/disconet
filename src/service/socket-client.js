import * as io from 'socket.io-client'
import { store } from '../start'
import { setOnlineUsers, joinOnlineUser, deleteOnlineUser } from './actions'

export let socket;

export function init(store) {
    if (!socket) {
        socket = io.connect();


        socket.on('onlineUsers', oUsers => store.dispatch(setOnlineUsers(oUsers)))

        socket.on('userJoined', user => store.dispatch(joinOnlineUser(user)))

        socket.on('userLeft', user => store.dispatch(deleteOnlineUser(user)))
    }
}
