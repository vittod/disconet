import React from 'react';
import ProfilePic from './profile-pic';

// import ErrorBoundary from './error-boundary';


export default function HeaderBar({userSettings, loggedIn, avatar}) {
    return (
        <div className="header-bar">
            <div className="logo">My fancy Logo</div>
            
            {loggedIn && 
                <div className="nav-area">
                <a href="/logout" onClick={() => localStorage.clear()}>logout</a>
                <ProfilePic userSettings={userSettings} avatar={avatar} />
                </div>
            }
        </div>
    )
}