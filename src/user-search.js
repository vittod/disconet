import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import { socket } from "./service/socket-client";
import ProfilePic from './profile-pic'


class UserSearch extends React.Component {
    constructor(props) {
        super(props)

        let inputField
        this.getUsersRange = this.getUsersRange.bind(this)
    }

    componentDidMount() {
        this.getUsersRange(null)
    }

    getUsersRange(range) {
        socket.emit('getUserRange', range)
    }

    sentRangeReq(e) {
        e.preventDefault()
        console.log('req field', e.target.value)
        socket.emit('getUserRange', e.target.value)
    }

    render() {
        return (
            <>
                <div className="search-area">
                    <h2>Search Users..</h2>
                    <form>
                        <input className="input-bigger" onChange={this.sentRangeReq} ref={inp => this.inputField = inp} />
                    </form>
                </div>

                <div className="active-users">
                    {this.props.usersRange && 
                    this.props.usersRange.map((el, i) => {
                        return (
                        <Link key={i} to={`/user/${el.id_user}`}>
                            <ProfilePic avatar={el.url} />
                        </Link>
                    )}) }
                </div>
            </>
        )
    }
}


const mapStateToProps = function(state) {
    return {
        usersRange: state.usersRange
    };
};

export default connect(mapStateToProps)(UserSearch);