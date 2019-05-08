import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import { socket } from "./service/socket-client";
import ProfilePic from './profile-pic'


class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            chatter: ''
        }

        this.sentChatMsg = this.sentChatMsg.bind(this)
        this.handleChatText = this.handleChatText.bind(this)
    }

    sentChatMsg(e) {
        e.preventDefault()
    
        socket.emit('incommingChat', {
            msg: this.state.chatter,
            userId: this.props.user.id_user,
            first: this.props.user.first,
            last: this.props.user.last,
            avatar: this.props.user.url,
            date: Date()
        })

        this.setState({chatter: ''})   //////////value von textarea ....
    }

    handleChatText(e) {
        this.setState({chatter: e.target.value})
    }

    render() {
        return (
            <>
                <div className="active-users">
                    <h3>Active users..</h3>
                    {this.props.onlineUsers && this.props.onlineUsers.map((el, i) => (
                        <Link key={i} to={`/user/${el.userId}`}>
                            <ProfilePic avatar={el.url} />
                        </Link>
                    )) }
                </div>
                <div className="chat-area">
                    <h2>Mass Chat <em>Live</em></h2>
                    <div className="mass-chat border-move">


                        {this.props.chatter && 
                        this.props.chatter.map((chat, i) => 

                            <div className="chat-card" key={i}> 
                                <Link to={`/user/${chat.userId}`}>
                                    <ProfilePic avatar={chat.avatar} />
                                </Link>
                                <div className="chat-msg">
                                    <h4>
                                        {chat.msg}
                                    </h4>
                                </div>
                                <div className="chat-meta">
                                    {chat.first} - {chat.date} 
                                </div>
                            </div>

                        )}

                    </div>
                    <form>
                        <textarea onChange={this.handleChatText} />
                        {this.state.chatter}
                        <button onClick={this.sentChatMsg}>send</button>
                    </form>
                </div>
            </>
        )
    }
}

const mapStateToProps = function(state) {
    return {
        user: state.user,
        onlineUsers: state.onlineUsers && Object.values(state.onlineUsers),
        chatter: state.chatter
    };
};

export default connect(mapStateToProps)(Chat);