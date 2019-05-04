export default function reducer(state = {}, action) {
    switch(action.type) {
        case 'GET_ALL_FRIENDS': return {...state, friends: action.friends }; break
    }
        
    return state
}