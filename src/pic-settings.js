import React from 'react';
import ImgUpload from './img-upload'
import ImgGallery from './img-gallery'

export default class PicSettings extends React.Component {
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
                    <i onClick={this.props.escapeModal} className="fas fa-times fa-2x exit-right exitor" />
                    <ImgGallery setAvatar={this.props.setAvatar} avatar={this.props.avatar} triggerSet={this.triggerSet} />
                    <ImgUpload triggerRefresh={this.triggerRefresh} />

                </div>
            </div>
        )
    }

}