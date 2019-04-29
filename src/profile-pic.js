import React from 'react';

export default function ProfilePic({userSettings, avatar}) {
    return (
        <div className="avatar" onClick={userSettings}>
            {avatar ? <img src={avatar}></img> : <i className="fas fa-user fa-4x"></i>}        
        </div>
    )
}