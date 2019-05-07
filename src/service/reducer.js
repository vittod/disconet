export default function reducer(state = {}, action) {
    switch(action.type) {
        case 'GET_ALL_FRIENDS': return {...state, friends: action.friends }; break 

        case 'GET_ALL_FRIENTEES': return {...state, frientees: action.frientees }; break 

        case 'TOGGLE_MAIN_MENUE': return {...state, showMainMenue: action.showMainMenue }; break

        case 'TOGGLE_PHOTO_BOOTH': return {...state, showPhotoBooth: action.showPhotoBooth }; break

        case 'SET_USER': return {...state, user: action.user }; break

        case 'SET_BOOTH_PHOTO': return {...state, boothPhoto: action.boothPhoto }; break 

        case 'SET_ONLINE_USERS': return {...state, onlineUsers: action.onlineUsers }; break 

        case 'JOIN_ONLINE_USER':{ 
            console.log('des1', Object.keys(action.user)[0])  
            console.log('des2', Object.values(action.user)[0])  
            return {...state, onlineUsers: {...state.onlineUsers, [Object.keys(action.user)[0]]: Object.values(action.user)[0]} }; break
        } 
        
        case 'DELETE_ONLINE_USER': {
            let nuOnUsers = {...state.onlineUsers}
            console.log('useres copy', nuOnUsers)
            delete nuOnUsers[action.delUser]
            console.log('deleted', nuOnUsers)
            return {...state, onlineUsers: nuOnUsers }; 
        } break 


    }
        
    return state
}
