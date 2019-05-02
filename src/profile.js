import React from 'react';
import {Link} from 'react-router-dom';

import ProfilePic from './profile-pic';
import axios from './service/axios';
import ProfileEdit from './profile-edit'


export default class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            profile: {}
        }

        this.getProfile = this.getProfile.bind(this)
    }

    componentDidMount() {
        this.getProfile()
    }

    async getProfile() {
        console.log('got called')
        try {
            let {data} = await axios.get('/api/getProfile')
            this.setState({profile: data[0]})
            console.log('parent', this.state.profile);
        
        } catch (err) {
            console.log(err);
        }
        
    }

    render() {
        return (
            <div className="profile-area">
                <ProfilePic bigger="true" userSettings={this.props.userSettings} avatar={this.props.avatar} />
                <ProfileEdit profile={this.state.profile} editProfile={() => this.setState} refreshProfile={this.getProfile} />
                
                {/* CHANGE TO SMTHN SECURE */}
                <Link to={`/user/${localStorage.getItem('user')}`}>would you like to see your site as others do?</Link>
            </div>
        )
    }
}