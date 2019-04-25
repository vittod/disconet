import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './welcome';

let content 

if (location.pathname === '/') {
    content = (
        <div>
            <div> loggedin </div>
            <div><a href="/logout">logout</a>  </div>
        </div>
    )
} else {
    content = <Welcome />
}


ReactDOM.render(
    content,
    document.querySelector('main')
);



