export default function reducer(state = {}, action) {
    switch(action.type) {
        case 'GET_ALL_FRIENDS': return {...state, friends: action.friends }; break 

        case 'GET_ALL_FRIENTEES': return {...state, frientees: action.frientees }; break 

        case 'TOGGLE_MAIN_MENUE': return {...state, showMainMenue: action.showMainMenue }; break

        case 'SET_USER': return {...state, user: action.user }; break

    }
        
    return state
}