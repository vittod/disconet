import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './auth/welcome';
import App from './app.js';

let content 

if (location.pathname === '/') {
    content = <App />
} else {
    content = <Welcome />
}


ReactDOM.render(
    content,
    document.querySelector('main')
);



