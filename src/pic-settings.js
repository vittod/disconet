import React from 'react';
import { connect } from 'react-redux';

import ImgUpload from './img-upload'
import ImgGallery from './img-gallery'
import { setBoothPhoto } from './service/actions'


class PicSettings extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
        }
        
        let triggerRefresh /////////do somthing fot refresh

        this.triggerRefresh = this.triggerRefresh.bind(this)
        this.triggerSet = this.triggerSet.bind(this)
        this.escape = this.escape.bind(this)
    }

    triggerSet(clb) {
        this.triggerRefresh = clb
    }
    triggerRefresh() {
        this.triggerRefresh()
    }

    escape() {
        this.props.dispatch(setBoothPhoto(false))
        this.props.escapeModal()
    }

    render() {
        return (
            <div className="modal-outer">
                <div className="user-settings">
                    <i onClick={this.escape} className="fas fa-times fa-2x exit-right exitor" />
                    <ImgGallery setAvatar={this.props.setAvatar} avatar={this.props.avatar} triggerSet={this.triggerSet} />
                    <ImgUpload triggerRefresh={this.triggerRefresh} />

                </div>
            </div>
        )
    }

}

const mapStateToProps = function(state) {
    return {};
};

export default connect(mapStateToProps)(PicSettings);