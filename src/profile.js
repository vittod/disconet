import React from 'react'
import ProfilePic from './profile-pic';
import axios from './service/axios';


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
        try {
            let {data} = await axios.get('/getProfile')
            this.userState({profile: data})
            console.log(data);
        
        } catch (err) {
            console.log(err);
        }
        
    }

    render() {
        return (
            <div className="profile-area">
                <ProfilePic bigger="true" userSettings={this.props.userSettings} avatar={this.props.avatar} />
                {/* <UserBio bio={this.state.profile} /> */}
            </div>
        )
    }
}