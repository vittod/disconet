import React from 'react';
import { connect } from 'react-redux';

import axios from './service/axios';
import { togglePhotoBooth, setBoothPhoto } from './service/actions'



class PhotoBooth extends React.Component {
    constructor(props) {
        super(props)

        let video
        let canvas
        let ctx
        this.streamActive = {active: null}

        this.connectVideoStream = this.connectVideoStream.bind(this)
        this.makeSnapshot = this.makeSnapshot.bind(this)
        this.dissableStream = this.dissableStream.bind(this)
        this.convertAndBuffer = this.convertAndBuffer.bind(this)
    }

    componentDidMount() {
        this.ctx = this.canvas.getContext('2d')
        this.connectVideoStream()
    }


    makeSnapshot() {
        this.ctx.drawImage(this.video, 0, 0, 320, 240);
    }

    connectVideoStream() {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                this.streamActive.active = stream;
                this.video.srcObject = stream;
                this.video.play();
            })
            .catch(err => console.log('something went wrong with the capture'))
    }
    
    dissableStream() {
        let track = this.streamActive.active.getTracks()[0];
        track.stop();
        this.video.pause();
        this.streamActive.active = null;
    }
    
    convertAndBuffer() {
        this.canvas.toBlob((blob) => {
            console.log('in', blob)
            this.props.dispatch(setBoothPhoto({
                blob: blob,
                photo: this.canvas.toDataURL(Image)
            }))
            this.exitBooth()
       

        }, 'image/png', 1) 
    }

    exitBooth() {
        this.dissableStream()
        this.props.dispatch(togglePhotoBooth(false))
    }


    render() {
        return (
            <div className="modal-outer">
                <div className="photo-booth">
                    <i className="fas fa-times fa-2x exit-right exitor" onClick={() => this.exitBooth()} />
                    
                    <div className="capture-view">
                        <video ref={video => this.video = video} id="video" width="320" height="240" autoPlay />
                        <div className="interface">
                            <button onClick={this.makeSnapshot} id="snapBtn" className="button-invert">Snap Photo</button>
                        </div>
                    </div>
                    <div className="snap-view">
                        <canvas ref={canvas => this.canvas = canvas} id="canvas" width="320" height="240" />
                        <div className="interface">
                            <button onClick={this.convertAndBuffer} type="button" id="resetBtn" className="button-invert">upload</button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = function(state) {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps)(PhotoBooth);