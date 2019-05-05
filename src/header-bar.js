import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

import ProfilePic from './profile-pic';
import { toggleMainMenue } from './service/actions'



function showHide(showMainMenue) {
    return showMainMenue ? false : true
}

function HeaderBar({picSettings, loggedIn, avatar, showMainMenue, dispatch}) {
    return (
        <div className="header-bar">

            {loggedIn && 
            <Link className="logo-link" to="/">
                <div className="logo">
                    <span className="logo-text">Disc</span>
                        <img src="/img/disco_logo.png" />
                        <span className="logo-text">net</span>
                </div>
           </Link>}

           {!loggedIn &&
            <div className="logo">
            <span className="logo-text">Disc</span>
                <img src="/img/disco_logo.png" />
                <span className="logo-text">net</span>
            </div>}

            {loggedIn && 
                <div className="nav-area">
                    <img id="burger-menue" src="/img/burger-menue.png" onClick={() => dispatch(toggleMainMenue(showHide(showMainMenue)))} />
                    <div>
                        <ProfilePic picSettings={picSettings} avatar={avatar} />
                        <a href="/logout">logout</a>
                    </div>
                </div>
            }
        </div>
    )
}

const mapStateToProps = function(state) {
    return {
        showMainMenue: state.showMainMenue 
    };
};

export default connect(mapStateToProps)(HeaderBar);