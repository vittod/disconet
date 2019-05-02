import React from 'react';
import axios from './service/axios';

export default class ImgUpload extends React.Component {
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
                
        this.uploadFile = this.uploadFile.bind(this)
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
            upData.append('iUser', localStorage.getItem('user'));      //////// CHANGE THIS TO SOMETHING SECURE!!!!!!!!!!
            upData.append('iFile', el);
            console.log(upData)
            return axios.post('/api/postImg', upData)                
        }))
            .then((resp) => {
                console.log('post img success..', resp[0].data);
                if (resp[0].status === 200) {
                    this.setState({
                        showLoader: false,
                        files: []
                    })
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
        console.log('files before..', nuFiles)     
        this.setState({files: nuFiles})
        console.log('is in my state files..', this.state.files)
    }

    doClickOnInput(e) {
        this.inputField.click()
    }

    handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        console.log(e.target.files)
        return false
    }

    renderError(msg) {
        this.setState({
            showLoader: false,
            files: [{name: msg}]
        })
    }

    render() {
        return (
            <div className="img-upload">
                {!this.state.showLoader && <div id="box-upload" className={this.state.dragOverClass} ref={dropF => this.dropzone = dropF}
                    // onDragEnter={(e) => {
                    //     e.preventDefault();
                    //     e.stopPropagation();
                    //     this.setState({dragOverClass: 'box-upload-drag'})}
                    // }
                    // onDragLeave={(e) => {
                    //     e.preventDefault();
                    //     e.stopPropagation();
                    //     this.setState({dragOverClass: ''})}
                    // }
                    // onDragEnd={(e) => {
                    //     e.preventDefault();
                    //     e.stopPropagation();
                    // }}
                    // onDrop={(e) => {
                    //     e.preventDefault();
                    //     e.stopPropagation();
                    //     console.log(e)
                    // }}
                    >
                        <input id="fileupload" onChange={this.handleFileSelect} ref={input => this.inputField = input} type="file" accept="image/*" multiple />
                        <label onClick={this.doClickOnInput}><strong>Choose file</strong> or drag upon...</label>
                        <div className="files">
                            {this.state.files.map((el, i) => <h5 key={i}>{el.name}</h5>)}                     
                        </div>
                </div>}

                {this.state.showLoader && <div id="box-uploading">
                    <i className="fas fa-sync-alt fa-spin"></i>
                </div>}

                <button onClick={this.uploadFile}>share</button>
                
            </div>
        )
    }
}