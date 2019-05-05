import React from 'react';
import { Link } from 'react-router-dom'

export default class MainMenue extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <>
            {/* <div className="modal-outer"> */}
                <div className="main-menue">
                    <Link to="/">Home</Link>
                    <Link to="/friends">Friends Page</Link>
                    <Link to="/user/1">change to u browser..</Link>
                </div>
            {/* </div> */}
            </>
        )
    }
}