import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route} from 'react-router-dom';

import axios from './service/axios';
import HeaderBar from './header-bar';
import PicSettings from './pic-settings';
import Profile from './profile';
import ProfileBrowser from './profile-browser'
import Friends from './friends'
import MainMenue from './main-menue'
import PhotoBooth from './photo-booth'
import Chat from './chat'
import { setUser, toggleMainMenue } from './service/actions'



class App extends React.Component {
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
        this.getProfile = this.getProfile.bind(this)
    }

    componentDidMount() {
        this.getProfile()
        window.addEventListener('keydown', e => {
            if (e.key === 'Escape') {
                this.setState({showPicModal: false})
                this.props.dispatch(toggleMainMenue(false))
            }
        })

        this.getAvatarFromDb()
    }
    componentWillUnmount() {
        ///////////////////////////////////////////////////// unhook evtLstnr ??
    }
    
    async getProfile() {
        try {
            let {data} = await axios.get('/api/getProfile')
            this.props.dispatch(setUser(data[0]))
            console.log('parent', this.state.profile);
            
        } catch (err) {
            console.log(err);
        }
        
    }
    
    showHide(menue) {
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
                        {this.props.showMainMenue && <MainMenue />}
                        {this.props.showPhotoBooth && <PhotoBooth />}

                        <div className="main-container">
                                <Route exact path="/" render={() => (<Profile getProfile={this.getProfile} picSettings={this.showHide} avatar={this.state.avatar} />)} />
                                <Route path="/user/:id" render={props => (<ProfileBrowser key={props.match.url} match={props.match} history={props.history} user={this.props.user}/>)} />
                                <Route path="/chat" render={() => <Chat />} />
                                <Route path="/friends" render={() => <Friends />} />
                        </div>
                        
                    </>
                </BrowserRouter>

            </>
        )
    }

}

const mapStateToProps = function(state) {
    return {
        showMainMenue: state.showMainMenue,
        user: state.user,
        showPhotoBooth: state.showPhotoBooth
    };
};

export default connect(mapStateToProps)(App);