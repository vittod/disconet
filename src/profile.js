import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

import ProfilePic from './profile-pic';
//import axios from './service/axios';
import ProfileEdit from './profile-edit'



class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            profile: {}
        }
    }
    //     this.getProfile = this.getProfile.bind(this)
    // }

    // componentDidMount() {
    //     this.getProfile()
    // }

    // async getProfile() {
    //     console.log('got called')
    //     try {
    //         let {data} = await axios.get('/api/getProfile')
    //         this.props.dispatch(setUser(data[0]))
    //         console.log('parent', this.state.profile);
        
    //     } catch (err) {
    //         console.log(err);
    //     }
        
    // }

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