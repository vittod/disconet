import React from 'react';
import { connect } from 'react-redux';

import axios from './service/axios'
import { togglePhotoBooth, setBoothPhoto } from './service/actions'



class Stories extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            story: '',
            allStories: []
        }

        let inputField

        this.getStories = this.getStories.bind(this)
        this.handleStory = this.handleStory.bind(this)
        this.togglePhotoBooth = this.togglePhotoBooth.bind(this)
    }

    componentDidMount() {
        this.getStories()
    }

    async getStories() {
        try {
            let {data} = await axios.get(`/api/getUserStory/${this.props.idFriend}`)
            console.log('got story..', data.story)
            this.setState({allStories: data.story})            
        } catch (err) {
            console.log('err get stories..', err)
        }
    }

    async handleStory(e) {
        e.preventDefault()
        try {
            let res = await axios.post('/api/postUserStory', {
                story: this.state.story,
                target: this.props.idFriend,
                picUrl: ''                              ////////////////DO SOMETHING HERE
            })
            console.log('res post..', res)
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

    render() {
        return (
            <div className="wall">
                <h2>Disco Stories</h2>
                <div className="inner-wall">
                    {this.state.allStories && 
                    this.state.allStories.map((el, i) => {
                        //console.log('loggin render', el)
                        return <div key={i}>{el.story}</div>
                    })}
                </div>
                
                <form>
                    <input className="input-bigger" onChange={(e) => this.setState({story: e.target.value})} ref={inp => this.inputField = inp} />
                    {this.props.boothPhoto &&
                    <img className="booth-up-prev" src={this.props.boothPhoto.photo} />}
                    <button onClick={this.handleStory}><i className="fas fa-upload  fa-2x" /></button>
                    <button onClick={this.togglePhotoBooth} className="button-invert button-full"><i className="fas fa-camera-retro fa-2x" /></button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = function(state) {
    return {
        boothPhoto: state.boothPhoto
    };
};

export default connect(mapStateToProps)(Stories);