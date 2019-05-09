import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

import { toggleMainMenue } from './service/actions'


class MainMenue extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <>
            {/* <div className="modal-outer"> */}
                <div className="main-menue">
                    <i className="exitor fas fa-times" onClick={() => this.props.dispatch(toggleMainMenue(false))} />
                    <Link to="/"><i className="fas fa-home orange"></i> Home</Link>
                    <Link to="/friends"><i className="fas fa-user-friends orange"></i> Friends Page</Link>
                    <Link to="/users"><i className="fas fa-users orange"></i> browser</Link>
                    <Link to="/chat"><i className="fas fa-comment-dots orange"></i> chat</Link>
                    <a className="orange" href="/logout"><i className="fas fa-sign-out-alt orange" /> logout</a>
                </div>
            {/* </div> */}
            </>
        )
    }
}

const mapStateToProps = function(state) {
    return {
        showMainMenue: state.showMainMenue
    };
};

export default connect(mapStateToProps)(MainMenue);