import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import ProfilePic from './profile-pic'
import axios from './service/axios'
import { getAllFriends, getAllFrientees } from './service/actions'


class Friends extends React.Component {
    constructor(props) {
        super(props)

        this.refresh = this.refresh.bind(this)
        this.answerFriendReq = this.answerFriendReq.bind(this)
        this.cancelFriendship = this.cancelFriendship.bind(this)
    }

    componentDidMount() {
       this.refresh()
    }

    refresh() {
        this.props.dispatch(getAllFriends());
        this.props.dispatch(getAllFrientees());
    }

    async answerFriendReq(idFriend) {
        let aReq = await axios.post('/api/answerFriendReq', {id: idFriend})
        try {
            if (aReq.data.success === true) {
                this.refresh()
            } else if (fReq.data.success === false) {
                console.log('something went wrong', aReq.msg)
            }
        } catch (err) {
            console.log('something went wrong with request..', err)
        }
    }

    async cancelFriendship(idFriend) {
        let cReq = await axios.post('/api/cancelFriendship', {id: idFriend})
        try {
            if (cReq.data.success === true) {
                this.refresh()
            } else if (cReq.data.success === false) {
                console.log('something went wrong', cReq.msg)
            }
        } catch (err) {
            console.log('something went wrong with request..', err)
        }
    }

    render() {
        return (
            <>
                {this.props.friends &&
                <div className="friends-list">
                    <h2>My Disco-Friends:</h2>
                    <div className="friends">
                        
                        {this.props.friends.success ? this.props.friends.data.map((el, i) => {
                            return (
                                <div className="friend-card" key={i}> 
                                    <Link to={`/user/${el.id_user}`}>
                                        <ProfilePic avatar={el.url} />
                                    </Link>
                                    <div className="card-body">
                                        <h4>
                                            {el.first_name} <br />
                                            {el.last_name} 
                                        </h4>
                                    </div>
                                    <div className="card-footer">
                                        <button className="button-full" onClick={() => this.cancelFriendship(el.id_user)}>terminate friendship</button>
                                    </div>
                                </div>
                            )
                        }) : <div><h2>There has been a Problem..</h2></div>}

                    </div>
                </div>}

                {this.props.frientees &&
                <div className="friends-list">
                    <h2>My Disco-Frientees:</h2>
                    <div className="friends">
                                                
                        {this.props.frientees.success ? this.props.frientees.data
                            .filter(frientee => frientee.id_from != this.props.frientees.user) //// maybe add a thing for outgoing requests..?
                            .map((el, i) => {
                                return (
                                    <div className="friend-card" key={i}> 
                                        <Link to={`/user/${el.id_user}`}>
                                            <ProfilePic avatar={el.url} />
                                        </Link>
                                        <div className="card-body">
                                            <h4>
                                                {el.first_name} <br />
                                                {el.last_name} 
                                            </h4>
                                        </div>
                                        <div className="card-footer">
                                            <button className="button-full" onClick={() => this.answerFriendReq(el.id_user)}>accept <br /> friendship</button>
                                        </div>
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
        friends: state.friends,
        frientees: state.frientees //&& state.frientees.data && state.frientees.data.filter(frientee => frientee.id_from != state.frientees.user)
    };
};

export default connect(mapStateToProps)(Friends);