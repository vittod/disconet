import React from 'react';
import {Link} from 'react-router-dom';
import ProfilePic from './profile-pic';


export default function HeaderBar({picSettings, loggedIn, avatar}) {
    return (
        <div className="header-bar">

            {loggedIn && 
            <Link className="logo-link" to="/">}
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
                    <img id="burger-menue" src="/img/burger-menue.png" />
                    <div>
                        {/* ////
                        //   WARNING: CHANGE TO REDUX OR SMTH SAVE..
                        //// */}
                        <ProfilePic picSettings={picSettings} avatar={avatar} />
                        <a href="/logout" onClick={() => localStorage.clear()}>logout</a>
                    </div>
                </div>
            }
        </div>
    )
}