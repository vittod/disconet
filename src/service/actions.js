import axios from './axios'

export async function getAllFriends() {
    const {data} = await axios.get('/api/getAllFriends/friends')
    return {
        friends: data,
        type: 'GET_ALL_FRIENDS'   
    }
}
export async function getAllFrientees() {
    const {data} = await axios.get('/api/getAllFriends/pending')
    return {
        frientees: data,
        type: 'GET_ALL_FRIENTEES'   
    }
}

export function toggleMainMenue(toggle) {
    return {
        showMainMenue: toggle,
        type: 'TOGGLE_MAIN_MENUE'   
    }
}

export function togglePhotoBooth(toggle) {
    return {
        showPhotoBooth: toggle,
        type: 'TOGGLE_PHOTO_BOOTH'   
    }
}

export function setUser(user) {
    return {
        user: user,
        type: 'SET_USER'
    }
}

export function addToUser(elem) {
    return {
        elem: elem,
        type: 'ADD_TO_USER'
    }
}

export function setBoothPhoto(photo) {
    return {
        boothPhoto: photo,
        type: 'SET_BOOTH_PHOTO'
    }
}

export function setOnlineUsers(allUsers) {
    return {
        onlineUsers: allUsers,
        type: 'SET_ONLINE_USERS'
    }
}

export function joinOnlineUser(newUser) {
    return {
        user: newUser,
        type: 'JOIN_ONLINE_USER'
    }
}

export function deleteOnlineUser({delUser}) {
    return {
        delUser: delUser,
        type: 'DELETE_ONLINE_USER'
    }
}

export function setRecentChatter(chatter) {  
    return {
        chatter: chatter,
        type: 'SET_RECENT_CHATTER'
    }
}

export function nuChat(chat) {  
    return {
        chat: chat,
        type: 'NU_CHAT'
    }
}

export function userQuery(users) {  
    console.log('got nu users from query..', users)
    return {
        users: users,
        type: 'NU_USERS_FROM_QUERY'
    }
}



