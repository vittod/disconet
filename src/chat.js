import React from 'react';
import { connect } from 'react-redux';


class Chat extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <>
                {this.props.onlineUsers && this.props.onlineUsers.map((el, i) => (<div key={i}>{el}</div>)) }
            </>
        )
    }
}

const mapStateToProps = function(state) {
    return {
        user: state.user,
        onlineUsers: state.onlineUsers && Object.values(state.onlineUsers)
    };
};

export default connect(mapStateToProps)(Chat);