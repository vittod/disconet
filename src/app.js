import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';

import axios from './service/axios';
import HeaderBar from './header-bar';
import PicSettings from './pic-settings';
import Profile from './profile';
import ProfileBrowser from './profile-browser'
import Friends from './friends'


export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showPicModal: false,
            avatar: null
        }

        this.showHide = this.showHide.bind(this)
        this.getAvatarFromDb = this.getAvatarFromDb.bind(this)
        this.setAvatar = this.setAvatar.bind(this)
        this.setAvatarInDb = this.setAvatarInDb.bind(this)
    }

    componentDidMount() {
        window.addEventListener('keydown', e => {
            if (e.key === 'Escape') this.setState({ showPicModal: false })
        })

        this.getAvatarFromDb()
    }
    componentWillUnmount() {
        ///////////////////////////////////////////////////// unhook evtLstnr ??
    }

    showHide() {
        this.state.showPicModal ? this.setState({ showPicModal: false }) : this.setState({ showPicModal: true })
    }

    getAvatarFromDb() {
        axios.get('/api/getAvatar')
            .then(({data}) => this.setAvatar(data[0].url))
            .catch(err => console.log(err))
    }

    setAvatar(url) {
        this.setState({avatar: url})
    }

    setAvatarInDb(imgObj) {
        this.setAvatar(imgObj.url)
        axios.post('/api/setAvatar', {imgId: imgObj.id})
            .then(resp => console.log(resp))
            .catch(err => console.log('err set ava..', err))
    }

    render() {
        return ( 
            <>
                <BrowserRouter>
                    <>
                        <HeaderBar loggedIn="true" picSettings={this.showHide} avatar={this.state.avatar} /> 
                        {this.state.showPicModal && <PicSettings setAvatar={this.setAvatarInDb} avatar={this.state.avatar} escapeModal={this.showHide} />}
                        <div className="main-container">
                                <Route exact path="/" render={() => (<Profile picSettings={this.showHide} avatar={this.state.avatar} />)} />
                                <Route path="/user/:id" render={props => (<ProfileBrowser key={props.match.url} match={props.match} history={props.history} />)} />
                                <Route path="/friends" render={() => <Friends />} />
                        </div>
                    </>
                </BrowserRouter>

            </>
        )
    }

}