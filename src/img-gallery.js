import React from 'react'
import axios from './service/axios';

export default class ImgGallery extends React.Component {
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
        axios.get('/getImgByUserAll')   
            .then(({data}) => {
                console.log('resp..', data)
                this.setState({images: data})    
            
            })
            .catch(err => console.log('err..', err))
    }

    
    render() {
        return (
            <div className="img-gallery">
                {this.state.images.map((el, i) => {
                    return <ImgDisplay url={el.url} key={i} imgNo={i} imgId={el.id_img} setAvatar={this.props.setAvatar} />
                })}
            </div>
        )
    }
}

/////////////////////////////////////////////////////// SOURCE THIS OUT IF NEEDED ELSEWHERE....
class ImgDisplay extends ImgGallery {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {  
        return (
            <div className="img-wrapper">
                <img src={this.props.url} />
                {this.props.imgNo +1}
                <button onClick={() => this.props.setAvatar({
                    url: this.props.url,
                    id: this.props.imgId
                })}>set as Avatar</button>
            </div>
        )
    }
}