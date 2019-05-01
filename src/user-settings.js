import React from 'react';
import ImgUpload from './img-upload'
import ImgGallery from './img-gallery'

export default class UserSettings extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
        }
        
        let triggerRefresh /////////do somthing fot refresh

        this.triggerRefresh = this.triggerRefresh.bind(this)
        this.triggerSet = this.triggerSet.bind(this)
    }

    triggerSet(clb) {
        this.triggerRefresh = clb
    }
    triggerRefresh() {
        this.triggerRefresh()
    }

    render() {
        return (
            <div className="modal-outer">
                <div className="user-settings">
                    <ImgGallery setAvatar={this.props.setAvatar} avatar={this.props.avatar} triggerSet={this.triggerSet} />
                    <ImgUpload triggerRefresh={this.triggerRefresh} />
                    <button onClick={this.props.escapeModal}>exit</button>

                </div>
            </div>
        )
    }

}