import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './auth/welcome';
import App from './app.js';

let content 

if (location.pathname === '/welcome') {
    content = <Welcome />
} else {
    content = <App />
}


ReactDOM.render(
    content,
    document.querySelector('main')
);



