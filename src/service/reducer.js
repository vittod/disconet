export default function reducer(state = {}, action) {
    switch(action.type) {
        case 'GET_ALL_FRIENDS': return {...state, friends: action.friends }; break 

        case 'GET_ALL_FRIENTEES': return {...state, frientees: action.frientees }; break 

        case 'TOGGLE_MAIN_MENUE': return {...state, showMainMenue: action.showMainMenue }; break

        case 'TOGGLE_PHOTO_BOOTH': return {...state, showPhotoBooth: action.showPhotoBooth }; break

        case 'SET_USER': return {...state, user: action.user }; break

        case 'SET_BOOTH_PHOTO': return {...state, boothPhoto: action.boothPhoto }; break 

    }
        
    return state
}

