import React from 'react';
import { connect } from 'react-redux';

import axios from './service/axios'
import { socket } from "./service/socket-client";
import { datePipe } from './service/pipes'
import { togglePhotoBooth, setBoothPhoto } from './service/actions'



class Stories extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            story: '',
            allStories: [],
            showLoader: false
        }

        let inputField

        this.getStories = this.getStories.bind(this)
        this.handleStory = this.handleStory.bind(this)
        this.togglePhotoBooth = this.togglePhotoBooth.bind(this)
        this.uploadFile = this.uploadFile.bind(this)
        this.setUpload = this.setUpload.bind(this)
    }

    componentDidMount() {
        this.getStories()
        socket.on('refreshStoryClient', id => {if (id == this.props.idFriend) this.getStories()})
    }

    async getStories() {
        try {
            let {data} = await axios.get(`/api/getUserStory/${this.props.idFriend}`)
            this.setState({allStories: data.story})            
        } catch (err) {
            console.log('err get stories..', err)
        }
    }

    async handleStory(imgId) {
        try {
            let res = await axios.post('/api/postUserStory', {
                story: this.state.story,
                target: this.props.idFriend,
                imgId: imgId                         
            })
            socket.emit('refreshStory', this.props.idFriend)  ////send refresh request to server..
            this.inputField.value = ''
            this.setState({story: ''})
        } catch (err) {
            console.log('err post stories..', err)
        }
    }

    togglePhotoBooth(e) {
        e.preventDefault()
        this.props.dispatch(togglePhotoBooth(true))
    }

    uploadFile() {  
        this.setState({showLoader: true})

        let upData = new FormData();
        upData.append('iUser', this.props.user.id_user);  
        upData.append('iFile', this.props.boothPhoto.blob);
        axios.post('/api/postImg', upData)                
            .then(({data}) => {
                if (data) {
                    this.handleStory(data.imgId.rows[0].id_img)
                    this.setState({
                        showLoader: false,
                    })
                    this.props.dispatch(setBoothPhoto(false))
                } 
            }) 
            .catch(err => {
                console.log('err upload..', err);
                this.renderError('something went wrong!')
            })
    }

    setUpload(e) {
        e.preventDefault()
        this.props.boothPhoto ? this.uploadFile() : this.handleStory(null)
    }

    render() {
        return (
            <div className="wall">
                <h2>Disco Stories</h2>
                <div className="inner-wall">
                    {this.state.allStories && 
                    this.state.allStories.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((el, i, arr) => {
                        return (
                        
                            <div className="story" key={i}>
                                <div className="story-content">
                                    <h3>{el.story} </h3>
                                    <img src={el.url} />
                                </div>
                                <div className="story-meta">
                                    {el.first} {el.last} - {datePipe(el.created_at)}
                                </div>                            
                                {arr.length - 1 > i  && <div className="thin-line" />}
                            </div>
                
                        )
                    })}
                </div>
                
                <form>
                    <input className="input-bigger button-full" onChange={(e) => this.setState({story: e.target.value})} ref={inp => this.inputField = inp} />
                    {this.props.boothPhoto && !this.state.showLoader && 
                    <img className="booth-up-prev" src={this.props.boothPhoto.photo} />}
                    {this.state.showLoader && 
                    <div id="box-uploading" className="button-full">
                        <i className="fas fa-sync-alt fa-2x fa-spin"></i>
                    </div>}
                    <button onClick={this.setUpload} className="button-invert button-full"><i className="fas fa-upload fa-2x" /></button>
                    <button onClick={this.togglePhotoBooth} className="button-invert button-full"><i className="fas fa-camera-retro fa-2x" /></button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = function(state) {
    return {
        boothPhoto: state.boothPhoto,
        user: state.user
    };
};

export default connect(mapStateToProps)(Stories);