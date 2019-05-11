import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

import { toggleMainMenue } from './service/actions'


class MainMenue extends React.Component {
    constructor(props) {
        super(props)

        this.closeMenue = this.closeMenue.bind(this)
    }

    closeMenue() {
        this.props.dispatch(toggleMainMenue(false))
    }

    render() {
        return (
            <>
                <div className="main-menue">
                    <i className="exitor fas fa-times" onClick={this.closeMenue} />
                    <Link to="/" onClick={this.closeMenue}><i className="fas fa-home orange"></i> Home</Link>
                    <Link to="/friends" onClick={this.closeMenue}><i className="fas fa-user-friends orange"></i> Friends Page</Link>
                    <Link to="/users" onClick={this.closeMenue}><i className="fas fa-users orange"></i> browser</Link>
                    <Link to="/chat" onClick={this.closeMenue}><i className="fas fa-comment-dots orange"></i> chat</Link>
                    <a className="orange" href="/logout" onClick={this.closeMenue}><i className="fas fa-sign-out-alt orange" /> logout</a>
                </div>
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