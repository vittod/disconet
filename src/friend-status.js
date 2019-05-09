import React from 'react';

import axios from './service/axios'
import Stories from './stories'


export default class FriendStatus extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            status: ''
        }


        this.getFriendship = this.getFriendship.bind(this)
        this.renderFriendButton = this.renderFriendButton.bind(this)
        this.makeFriendReq = this.makeFriendReq.bind(this)
        this.answerFriendReq = this.answerFriendReq.bind(this)
    }

    componentDidMount() {
        this.getFriendship()
    }

    async getFriendship() {
        let status = await axios.get(`/api/getFriendship/${this.props.idFriend}`)
        try {
            if (status.data.data[0]) {
                this.setState({
                    status: status.data.data[0].status,
                    from: status.data.data[0].id_from,
                    to: status.data.data[0].id_to
                })
            }
            this.setState({user: status.data.user})
        } catch (err) {
            console.log('err get friendstat..', err)
        }
    }

    async makeFriendReq() {
        let fReq = await axios.post('/api/makeFriendReq', {id: this.props.idFriend})
        try {
            console.log(fReq.data)
            if (fReq.data.success === true) {
                this.setState({
                    status: 'pending',
                    to: this.props.idFriend
                })
            } else if (fReq.data.success === false) {
                console.log('something went wrong', fReq.msg)
            }
        } catch (err) {
            console.log('something went wrong eith request..', err)
        }
    }

    async answerFriendReq() {
        let aReq = await axios.post('/api/answerFriendReq', {id: this.props.idFriend})
        try {
            console.log(aReq.data)
            if (aReq.data.success === true) {
                this.setState({
                    status: 'friends',
                })
            } else if (fReq.data.success === false) {
                console.log('something went wrong', aReq.msg)
            }
        } catch (err) {
            console.log('something went wrong eith request..', err)
        }
    }

    renderFriendButton() {
        return (
            <div>
               {this.state.status === 'friends' && <h4>hurray, you are friends with this person!!</h4>}
               {this.state.status === 'pending' && this.state.to == this.props.idFriend && <h4>you send a friend request which is still pending</h4>}
               {this.state.status === 'pending' && this.state.from == this.props.idFriend && <span><h4>this frientee send a friend request</h4><button onClick={this.answerFriendReq}>accept friendship</button></span>}
               {!this.state.status && <span><h4>would you like to be friends with this person?</h4><button onClick={this.makeFriendReq}>send friend request</button></span>}
            </div>
        )
    }

    render() {
        return (
            <>
                {this.state.user && this.props.idFriend != this.state.user && this.renderFriendButton()}

                {this.state.status === 'friends' && <Stories idFriend={this.props.idFriend} />}
            </>
        )
    }
}