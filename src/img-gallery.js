import React from 'react'
import { connect } from 'react-redux';

import axios from './service/axios';
import ImgDisplay from './img-display'


class ImgGallery extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            images: [],
            selectAvatar: ''
        }

        this.getAllImg = this.getAllImg.bind(this)
    }

    componentDidMount() {
        this.getAllImg()
        if (this.props.triggerSet) this.props.triggerSet(this.getAllImg)
    }

    getAllImg() {
        axios.get('/api/getImgByUserAll')   
            .then(({data}) => {
                // console.log('resp..', data)
                this.setState({images: data})    
            
            })
            .catch(err => console.log('err..', err))
    }

    
    render() {
        return (
            <div className="img-gallery">
                {this.state.images.map((el, i) => {
                    return <ImgDisplay 
                                url={el.url} 
                                key={i} 
                                imgNo={i} 
                                imgId={el.id_img} 
                                setAvatar={this.props.setAvatar} 
                                triggerRefresh={this.getAllImg} 
                            />
                })}
            </div>
        )
    }
}

const mapStateToProps = function(state) {
    return {
        
    };
};

export default connect(mapStateToProps)(ImgGallery);