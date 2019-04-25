import React from 'react';
import ReactDOM from 'react-dom';
import Logo from './logo';
import RegForm from './regForm';

ReactDOM.render(
    <HelloWorld />,
    document.querySelector('main')
);

function HelloWorld() {
    return (
        <div className="main-container">
            <Logo />
            <div className="start-content">
                <RegForm />
            </div>
        </div>
    );
}

