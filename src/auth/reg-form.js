import React from 'react';
import { Link } from 'react-router-dom';

import axios from '../service/axios';

export default class RegForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            first: '',
            last: '',
            email: '',
            password: '',
            msg: ''
        }

        console.log('hello')
        this.changeVal = this.changeVal.bind(this);
        this.registerUser = this.registerUser.bind(this);
    }

    registerUser() {
        axios.post('/register', {
            first: this.state.first,
            last: this.state.last,
            email: this.state.email,
            password: this.state.password
        }, {
            xsrfCookieName: 'cToken',
            xsrfHeaderName: 'csrf-token'
        })
            .then(resp => {
                console.log(resp.data);
                if (resp.data.isLoggedIn) {
                    localStorage.setItem('user', resp.data.isLoggedIn)
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
                <h2>register</h2>
                <div className="msg">
                    <h4>{this.state.msg}</h4>
                </div>
                <label>
                    first name
                    <input name="first" onChange={this.changeVal} />
                </label>
                <label>
                    last name
                    <input name="last" onChange={this.changeVal} />
                </label>
                <label>
                    email
                    <input name="email" onChange={this.changeVal} />
                </label>
                <label>
                    password
                    <input type="password" name="password" onChange={this.changeVal} />
                </label>
                <button onClick={this.registerUser}>register</button>
                <p>
                    <Link to='/login'>or would you like to login</Link>
                </p>
            </div>
        )
    }
}
