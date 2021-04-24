import React from 'react';

import MainController from './MainController.jsx'
import Footer from '../Components/Footer.jsx'
import Header from '../Components/Header.jsx'

import '../Stylings/AppStylings.css'

class HeaderAndFooterController extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            configured: false,
            signedIn: true,
            shouldRefresh: false,
            username: this.props.username
        }

        this.isLoggedIn = this.props.isLoggedIn.bind(this);
        this.setConfiguredStatus = this.setConfiguredStatus.bind(this);
    }

    setSignInStatus (status) {
        this.setState({ 
            signedIn: status 
        })

        if(!status){
            sessionStorage.clear();
            window.location.reload(false);
        }
    }

    render(){
        return (
            <div className="mainAppWrapper">
                <Header/>
                <MainController username={ this.state.username } configured={this.state.configured} shouldRefresh={ this.state.shouldRefresh } setConfiguredStatus={ this.setConfiguredStatus }/>
                <Footer setSignInStatus = { this.setSignInStatus } shouldRefresh={ this.state.shouldRefresh } setConfiguredStatus={ this.setConfiguredStatus } configured={ this.state.configured }/>
            </div>
        )
    }
}

export default HeaderAndFooterController;