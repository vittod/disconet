import React from 'react';

export default function ProfilePic({picSettings, avatar, bigger}) {
    return (
        <div className={bigger ? 'avatar avatar-bigger' : 'avatar'} onClick={picSettings}>
            {avatar ? <img src={avatar}></img> : <i className={bigger ? 'fas fa-user fa-5x' : 'fas fa-user fa-4x'}></i>}        
        </div>
    )
}