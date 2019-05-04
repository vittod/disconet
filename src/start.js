import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux'

import reducer from './service/reducer'
import Welcome from './auth/welcome';
import App from './app.js';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)));

let content 

if (location.pathname === '/welcome') {
    content = <Welcome />
} else {
    content = (
        <Provider store={store}>
            <App />
        </Provider>
    )
}


ReactDOM.render(
    content,
    document.querySelector('main')
);



