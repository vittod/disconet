import React from 'react';
import { connect } from 'react-redux';

import axios from './service/axios';
import { togglePhotoBooth, setBoothPhoto } from './service/actions'


class ImgUpload extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showLoader: false,
            files: [],
            dragOverClass: '',
            dragEvents: ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop']
        }

        let inputField;
        let dropzone;
        let boothImg
                
        this.uploadFile = this.uploadFile.bind(this)
        this.setUpload = this.setUpload.bind(this)
        this.handleFileSelect = this.handleFileSelect.bind(this)
        this.doClickOnInput = this.doClickOnInput.bind(this)
        this.handleDrop = this.handleDrop.bind(this)
        this.renderError = this.renderError.bind(this)
    }

    componentDidMount() {
        this.state.dragEvents.forEach(el => {
            this.dropzone.addEventListener(el, e => {
                e.stopPropagation();
                e.preventDefault();
            })
        })

        this.dropzone.addEventListener('drop', e => {
            this.setState({files: Array.prototype.slice.call(e.dataTransfer.files)})    
            this.dropzone.classList.remove('box-upload-drag')
        })

        this.dropzone.addEventListener('dragenter', () => {
            this.dropzone.classList.add('box-upload-drag')
        })

        this.dropzone.addEventListener('dragleave', () => {
            this.dropzone.classList.remove('box-upload-drag')
        })

    }
    componentWillUnmount() {
        //////////////////////////////////  UNHOOK THE SHIT OUT OF THIS MESS........
    }

    uploadFile() {
        this.setState({showLoader: true})
        Promise.all(this.state.files.map(el => {    
            let upData = new FormData();
            upData.append('iUser', this.props.user.id_user);  
            upData.append('iFile', el);
            console.log('upload..', upData)
            return axios.post('/api/postImg', upData)                
        }))
            .then((resp) => {
                console.log('post img success..', resp);
                if (resp.status === 200 || resp[0].status === 200) {
                    this.setState({
                        showLoader: false,
                        files: []
                    })
                    this.props.dispatch(setBoothPhoto(false))
                    this.props.triggerRefresh()
                } else {
                    this.renderError('something went wrong!')
                }
            }) 
            .catch(err => {
                console.log('err upload..', err);
                this.renderError('something went wrong!')
            })
    }

    handleFileSelect(e) {
        let nuFiles = Array.prototype.slice.call(e.target.files)           
        this.setState({files: nuFiles})
    }

    doClickOnInput(e) {
        this.inputField.click()
    }

    handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        return false
    }

    renderError(msg) {
        this.setState({
            showLoader: false,
            files: [{name: msg}]
        })
    }

    setUpload() {
        if (this.props.boothPhoto) {
            this.setState({files: [this.props.boothPhoto.blob]}, this.uploadFile)
        } else {
            this.uploadFile()
        }
    }

    render() {
        return (
            <div className="img-upload">
                {!this.props.boothPhoto && !this.state.showLoader && 
                <div id="box-upload" className={this.state.dragOverClass} ref={dropF => this.dropzone = dropF}>
                        <input id="fileupload" onChange={this.handleFileSelect} ref={input => this.inputField = input} type="file" accept="image/*" multiple />
                        <label className="orange" onClick={this.doClickOnInput}><strong className="orange">Choose file</strong> or drag upon...</label>
                        <div className="files">
                            {this.state.files.map((el, i) => <h5 key={i}>{el.name}</h5>)}                     
                        </div>
                </div>}

                {!this.props.boothPhoto && this.state.showLoader && 
                <div id="box-uploading" className="button-full">
                    <i className="fas fa-sync-alt fa-spin"></i>
                </div>}

                {this.props.boothPhoto &&
                <img className="booth-up-prev" src={this.props.boothPhoto.photo} />}

                <button className="button-invert button-full" onClick={this.setUpload}><i className="fas fa-upload  fa-2x" /></button>
                <button onClick={() => this.props.dispatch(togglePhotoBooth(true))} className="button-invert button-full"><i className="fas fa-camera-retro fa-2x" /></button>
                
            </div>
        )
    }
}

const mapStateToProps = function(state) {
    return {
        user: state.user,
        boothPhoto: state.boothPhoto
    };
};

export default connect(mapStateToProps)(ImgUpload);