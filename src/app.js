import React from 'react';
import HeaderBar from './header-bar';
import UserSettings from './user-settings'

// import ErrorBoundary from './error-boundary';




export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showSettingsModal: false
        }

        this.showHide = this.showHide.bind(this)
    }

    componentDidMount() {
        window.addEventListener('keydown', e => {
            if (e.key === 'Escape') this.setState({ showSettingsModal: false })
        })
    }
    componentWillUnmount() {

    }

    showHide() {
        this.state.showSettingsModal ? this.setState({ showSettingsModal: false }) : this.setState({ showSettingsModal: true })
    }

    render() {
        return ( 
            <div>
                <HeaderBar loggedIn="true" userSettings={this.showHide} />
                {this.state.showSettingsModal && <UserSettings />}
            </div>
        )
    }

}