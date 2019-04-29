import React from 'react';
import ImgUpload from './img-upload'
import ImgGallery from './img-gallery'

export default class UserSettings extends React.Component {
    constructor (props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className="modal-outer">
                <div className="user-settings">
                    <ImgGallery setAvatar={this.props.setAvatar} avatar={this.props.avatar} />
                    <ImgUpload />
                </div>
            </div>
        )
    }

}