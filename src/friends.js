import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import ProfilePic from './profile-pic'
import { getAllFriends } from './service/actions'


class Friends extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
       /* !this.props.friends && */ this.props.dispatch(getAllFriends());
    }

    render() {
        return (
            <>
                {this.props.friends &&
                <div className="friends-list">
                    <h2>My Friends:</h2>
                    <div className="friends">
                        
                            {this.props.friends.success ? this.props.friends.data.map(el => {
                                console.log(this.props.friends)
                                return (
                                    <div className="friend-card"> 
                                        <Link to={`/user/${el.id_user}`}>
                                            <ProfilePic avatar={el.url} />
                                            {el.first_name} {el.last_name} 
                                        </Link>
                                    </div>
                                )
                            }) : <div><h2>There has been a Problem..</h2></div>}
                        </div>
                    
                </div>}
            </>
        )
    }
}

const mapStateToProps = function(state) {
    return {
        friends: state.friends // && state.users.filter(user => user.hot == null)
    };
};

export default connect(mapStateToProps)(Friends);