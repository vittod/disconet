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
                    this is your fancy bio.. <br />
                    {profile.bio} <br />
                    heres some personal data.. <br />
                    city {profile.city} <br />
                    age {profile.age}
                </div>
                <div>
                    <button onClick={ () => this.setState({showEditor: !this.state.showEditor}) }>would you like to edit?</button>    
                </div>
            </div>
        )
    }

    renderDefault() {
        return (
            <div>
                <div className="bio-area">
                    here could go your fancy bio..
                </div>
                <div>
                    <button onClick={ () => this.setState({showEditor: !this.state.showEditor}) }>would you like to add?</button>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="profile-render">
                <h3>Hello {this.props.profile.first} {this.props.profile.last} </h3>
                {this.props.profile.bio ? this.renderProfile(this.props.profile) : this.renderDefault()}
                {this.state.showEditor && 
                    <ProfileModal profile={this.props.profile} refreshProfile={this.props.refreshProfile} closeModal={() => this.setState({showEditor: false})} />
                }
            </div>
        )
    }
}


