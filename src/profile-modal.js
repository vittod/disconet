import React from 'react';
import axios from './service/axios';


export default class ProfileModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            city: '',
            age: '',
            bio: ''
        }

        this.handleKeyEvt = this.handleKeyEvt.bind(this)
        this.updateProfileData = this.updateProfileData.bind(this)
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyEvt)
        this.setState({bio: this.props.profile.bio})
        this.setState({age: this.props.profile.age})
        this.setState({city: this.props.profile.city})
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyEvt)
    }

    handleKeyEvt(e) {
        console.log('sfdcsdcs')
        if (e.key === 'Escape' || e.target.className === 'escape') {
            this.props.closeModal()
        } else if (e.key === 'Enter') {
            this.updateProfileData()
            this.props.closeModal()
        }
    }

    async updateProfileData() {        
        try {
            await axios.post('/setProfile', {
                bio: this.state.bio,
                age: this.state.age,
                city: this.state.city
            })
            this.props.refreshProfile()
        } catch (err) {
            
        }
    }

    render() {
        return (
            <div className="modal-outer">
                <div className="profile-modal">
                    <textarea value={this.state.bio} onChange={e => this.setState({bio: e.target.value})} />
                    <input value={this.state.city} onChange={e => this.setState({city: e.target.value})} />
                    <input value={this.state.age} onChange={e => this.setState({age: e.target.value})} />
                    <button onClick={this.updateProfileData}>submit information</button>
                    <button className="escape" onClick={this.handleKeyEvt}>exit</button>
                </div>
            </div>
        )
    }
}

