import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

import { socket } from "./service/socket-client";
import ProfilePic from './profile-pic';
import ProfileEdit from './profile-edit'
import Stories from './stories'



class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            profile: {}
        }
    }
   
    componentDidUpdate() {
        this.props.user && socket.emit('refreshStory', this.props.user.id_user)
    }

    render() {
        return (
            <div className="profile-area">
                <div className="profile-content">
                    <ProfilePic bigger="true" picSettings={this.props.picSettings} avatar={this.props.avatar} />
                    <ProfileEdit profile={this.props.user} refreshProfile={this.props.getProfile} />
                </div> 
                <div className="profile-footer">
                    {this.props.user && <Link to={`/user/${this.props.user.id_user}`}>would you like to see your site as others do?</Link>}
                </div>
                {this.props.user && <Stories idFriend={this.props.user.id_user} />}
            </div>
        )
    }
}

const mapStateToProps = function(state) {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps)(Profile);