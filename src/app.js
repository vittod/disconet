import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';

import axios from './service/axios';
import HeaderBar from './header-bar';
import UserSettings from './user-settings';
import Profile from './profile';
import ProfileBrowser from './profile-browser'




export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showSettingsModal: false,
            avatar: null
        }

        this.showHide = this.showHide.bind(this)
        this.getAvatarFromDb = this.getAvatarFromDb.bind(this)
        this.setAvatar = this.setAvatar.bind(this)
        this.setAvatarInDb = this.setAvatarInDb.bind(this)
    }

    componentDidMount() {
        window.addEventListener('keydown', e => {
            if (e.key === 'Escape') this.setState({ showSettingsModal: false })
        })

        this.getAvatarFromDb()
    }
    componentWillUnmount() {
        ///////////////////////////////////////////////////// unhook evtLstnr ??
    }

    showHide() {
        this.state.showSettingsModal ? this.setState({ showSettingsModal: false }) : this.setState({ showSettingsModal: true })
    }

    getAvatarFromDb() {
        axios.get('/getAvatar')
            .then(({data}) => this.setAvatar(data[0].url))
            .catch(err => console.log(err))
    }

    setAvatar(url) {
        this.setState({avatar: url})
    }

    setAvatarInDb(imgObj) {
        this.setAvatar(imgObj.url)
        axios.post('/setAvatar', {imgId: imgObj.id})
            .then(resp => console.log(resp))
            .catch(err => console.log('err set ava..', err))
    }

    render() {
        return ( 
            <div>
                <BrowserRouter>
                    <div>
                        <HeaderBar loggedIn="true" userSettings={this.showHide} avatar={this.state.avatar} /> 
                        {this.state.showSettingsModal && <UserSettings setAvatar={this.setAvatarInDb} avatar={this.state.avatar} escapeModal={this.showHide} />}
                        <Route exact path="/" render={() => (<Profile userSettings={this.showHide} avatar={this.state.avatar} />)} />
                        <Route path="/user/:id" component={ProfileBrowser} />
                    </div>
                </BrowserRouter>

            </div>
        )
    }

}