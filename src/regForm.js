import React from 'react';
import axios from 'axios';

export default class RegForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            first: '',
            last: '',
            email: '',
            password: ''
        }
        this.changeVal = this.changeVal.bind(this);
        this.registerUser = this.registerUser.bind(this);
    }

    registerUser() {
        axios.post('/register', {
            first: this.state.first,
            last: this.state.last,
            email: this.state.email,
            password: this.state.password
        })
            .then(resp => console.log(resp))
            .catch(err => console.log(err))
    }

    changeVal(e) {
        this.setState({[e.target.name]: e.target.value})
    }
    
    render() {
        return (
            <div>
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
                    <input name="password" onChange={this.changeVal} />
                </label>
                <button onClick={this.registerUser}>register</button>
            </div>
        )
    }
}

// export default class Hello extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             name: 'Kitty'
//         };
//     }
//     render() {
//         const changeName = name => this.setState({name});
//         return (
//             <div>
//                 Hello, <Greetee name={this.state.name} />!
//                 <TextField change={changeName} />
//             </div>
//         );
//     }
// }

// export default function TextField(props) {
//     const handleEvent = e => {
//         props.change(e.target.value);
//     }
//     return (
//         <div>
//             <input type="text" onChange={handleEvent} />
//         </div>
//     );
// }

// export default function Greetee(props) {
//     return (
//         <strong
//             style={{
//                 color: 'tomato',
//                 textTransform: 'capitalize'
//             }}
//             className={'blah' + Date.now()}
//         >{props.name}</strong>
//     );
// }