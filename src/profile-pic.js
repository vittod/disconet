import React from 'react';

export default function ProfilePic({userSettings, avatar, bigger}) {
    return (
        <div className={bigger ? 'avatar avatar-bigger' : 'avatar'} onClick={userSettings}>
            {avatar ? <img src={avatar}></img> : <i className={bigger ? 'fas fa-user fa-5x' : 'fas fa-user fa-4x'}></i>}        
        </div>
    )
}