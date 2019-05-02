import React from 'react';
import {Link} from 'react-router-dom';

import axios from './service/axios'
import ProfilePic from './profile-pic';
import FriendButton from './friend-button'

export default class ProfileBrowser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            profile: {}
        }

        this.renderDefault = this.renderDefault.bind(this)
        this.renderProfile = this.renderProfile.bind(this)
    }

    componentDidMount() {
        console.log(this.props.match.params.id)
        axios.get(`/api/getProfile/${this.props.match.params.id}`)
            .then(({data}) => {
                this.setState({profile: data[0]})
            })
            .catch(err => console.log('err user data', err))

    }

    renderProfile(profile) {
        return (
            <div>
                <div>
                    this is the fancy bio.. <br />
                    {this.state.profile.bio} <br />
                </div>               
            </div>
        )
    }

    renderDefault() {
        return (
            <div>
                <div className="bio-area">
                    no bio yet..
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="profile-area">
                <ProfilePic bigger="true" avatar={this.state.profile.url} />
                <h3> {this.state.profile.first} {this.state.profile.last} </h3>
                {this.state.profile.bio ? this.renderProfile(this.state.profile) : this.renderDefault()}
                
                {/* SET THIS TO SMTH SECURE!!!! */}
                {localStorage.getItem('user') === this.props.match.params.id && <Link to='/'>would you like to edit your site?</Link>}    

                <FriendButton idFriend={this.props.match.params.id} />
            </div>
        )
    }
}