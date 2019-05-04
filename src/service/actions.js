import axios from './axios'

export async function getAllFriends() {
    const {data} = await axios.get('/api/getAllFriends')
    console.log('action', data)
    return {
        friends: data,
        type: 'GET_ALL_FRIENDS'   
    }
}