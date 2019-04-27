import React from 'react';
import ProfilePic from './profile-pic';

// import ErrorBoundary from './error-boundary';


export default function HeaderBar({userSettings, loggedIn}) {
    return (
        <div className="header-bar">
            <div className="logo">My fancy Logo</div>
            
            {loggedIn && 
                <div className="nav-area">
                <a href="/logout">logout</a>
                <ProfilePic userSettings={userSettings} />
                </div>
            }
        </div>
    )
}