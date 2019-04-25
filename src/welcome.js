import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import Logo from './logo';
import RegForm from './regForm';
import LogForm from './logForm';


export default function Welcome() {
    return (
        <div className="main-container">
            <Logo />
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


