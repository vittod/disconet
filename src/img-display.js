import React from 'react'

import axios from './service/axios'

export default class ImgDisplay extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}

        this.deleteImg = this.deleteImg.bind(this)
    }

    async deleteImg(id, url) {
        console.log('deleto', id, url)
        try {
            let resp = await axios.post('/api/deleteImg', {delId: id, delUrl: url})        
            console.log(resp)
            this.props.triggerRefresh()
        } catch (err) {
            console.log('err on delete', err)
        }
    }

    render() {  
        return (
            <div className="img-wrapper">
                <img src={this.props.url} />
                {this.props.imgNo +1}
                <div className="button-inline">
                    <button onClick={() => this.props.setAvatar({
                        url: this.props.url,
                        id: this.props.imgId
                    })}><i className="fas fa-portrait fa-2x" /></button>
                    <button onClick={() => this.deleteImg(this.props.imgId, this.props.url)}><i className="fas fa-trash-alt fa-2x" /></button>
                </div>
            </div>
        )
    }
}