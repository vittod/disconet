import axios from './axios'

export async function getAllFriends() {
    const {data} = await axios.get('/api/getAllFriends/friends')
    console.log('action', data)
    return {
        friends: data,
        type: 'GET_ALL_FRIENDS'   
    }
}
export async function getAllFrientees() {
    const {data} = await axios.get('/api/getAllFriends/pending')
    console.log('action', data)
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

export function setBoothPhoto(photo) {
    return {
        boothPhoto: photo,
        type: 'SET_BOOTH_PHOTO'
    }
}

export function setOnlineUsers(oUsers) {
    return {
        onlineUsers: oUsers,
        type: 'SET_ONLINE_USERS'
    }
}

export function joinOnlineUser(user) {
    console.log('action', user)
    
    return {
        user: user,
        type: 'JOIN_ONLINE_USER'
    }
}

export function deleteOnlineUser({delUser}) {
    return {
        delUser: delUser,
        type: 'DELETE_ONLINE_USER'
    }
}



