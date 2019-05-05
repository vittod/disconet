import React from 'react';
import { Link } from 'react-router-dom';

import axios from '../service/axios';


export default class LogForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            msg: ''
        }

        this.changeVal = this.changeVal.bind(this);
        this.loginUser = this.loginUser.bind(this);
    }

    loginUser() {
        axios.post('/api/login', {
            email: this.state.email,
            password: this.state.password
        }, {
            xsrfCookieName: 'cToken',
            xsrfHeaderName: 'csrf-token'
        })
            .then(resp => {
                console.log('loggie', resp.data);
                if (resp.data.isLoggedIn) {
                    //localStorage.setItem('user', resp.data.isLoggedIn) ////////////////////// take out!!!!!!!!!!!!!!!
                    location.replace('/')
                } else {
                    console.log(resp.data.msg)
                    this.setState({msg: resp.data.msg})
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    changeVal(e) {
        this.setState({[e.target.name]: e.target.value})
    }
    
    render() {
        return (
            <div className="net-form">
                <h2>login</h2>
                <div className="msg">
                    <h4>{this.state.msg}</h4>
                </div>
                <label>
                    email
                    <input name="email" onChange={this.changeVal} />
                </label>
                <label>
                    password
                    <input type="password" name="password" onChange={this.changeVal} />
                </label>
                <button onClick={this.loginUser}>login</button>
                <p>
                    <Link to='/'>or would you like to register</Link>
                </p>
            </div>
        )
    }
}

