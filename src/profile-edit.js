import React from 'react';

import ProfileModal from './profile-modal'

export default class ProfileEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showEditor: false
        }

        this.renderDefault = this.renderDefault.bind(this)
        this.renderProfile = this.renderProfile.bind(this)
    }

    renderProfile(profile) {
        return (
            <div>
                <div>
                    <h4>this is your fancy bio.. </h4>
                    {profile.bio} <br />
                    <h4>personal data.. </h4>
                    <p>
                        city {profile.city} <br />
                        age {profile.age} 
                    </p>
                </div>
                <div>
                    <button onClick={ () => this.setState({showEditor: !this.state.showEditor}) }><i className="fas fa-edit"></i> like to edit?</button>    
                </div>
            </div>
        )
    }

    renderDefault() {
        return (
            <div>
                <div className="bio-area">
                <h4>here could go your fancy bio.. </h4>
                </div>
                <div>
                    <button onClick={ () => this.setState({showEditor: !this.state.showEditor}) }><i className="fas fa-user-edit"></i> like to add?</button>
                </div>
            </div>
        )
    }

    render() {
        return (
            <>
                {this.props.profile &&
                <div className="profile-render">
                    <h2>Hello <span className="title-font"> {this.props.profile.first} {this.props.profile.last} </span> </h2>
                    {this.props.profile.bio ? this.renderProfile(this.props.profile) : this.renderDefault()}
                    {this.state.showEditor && 
                        <ProfileModal profile={this.props.profile} refreshProfile={this.props.refreshProfile} closeModal={() => this.setState({showEditor: false})} />
                    }
                </div>}
            </>
        )
    }
}


