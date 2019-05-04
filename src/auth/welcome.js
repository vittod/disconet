import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import HeaderBar from '../header-bar';
import RegForm from './reg-form';
import LogForm from './log-form';


export default function Welcome() {
    return (
        <div className="login-container">
            <HeaderBar /> 
            <div className="start-content">
                <HashRouter>
                    <div>
                        <Route exact path="/" component={RegForm} />
                        <Route path="/login" component={LogForm} />
                    </div>
                </HashRouter>
            </div>
        </div>
    );
}


