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
                    <Link to="/">Home</Link>
                    <Link to="/friends">Friends Page</Link>
                    <Link to="/user/1">change to u browser..</Link>
                    <a href="/logout">logout</a>
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