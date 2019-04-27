import React from 'react';

export default function ProfilePic({userSettings}) {
    return (
        <div className="avatar" onClick={userSettings}>
            <img src=""></img>
            <i className="fas fa-user fa-4x"></i>
        </div>
    )
}