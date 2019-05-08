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
            console.log('nu user:', action.user)
            return state.onlineUsers ? {...state, onlineUsers:  [...state.onlineUsers, action.user] } : state; break
        } 
        
        case 'DELETE_ONLINE_USER': {
            let nuOnUsers = state.onlineUsers.filter(user => user.socket != action.delUser)
            console.log('users delete.. copy:', nuOnUsers)
            return {...state, onlineUsers: nuOnUsers }; 
        } break

        case 'SET_RECENT_CHATTER': return {...state, chatter: action.chatter }; break

        case 'NU_CHAT': {
            let nuChatter = state.chatter.slice()
            nuChatter.unshift(action.chat)
            return {...state, chatter: nuChatter}
         } break  

        case 'ADD_TO_USER': return {...state, user: {...state.user, url: action.elem} }; break 

    }
        
    return state
}
