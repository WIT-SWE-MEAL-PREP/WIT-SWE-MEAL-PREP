import React from 'react';

import MainController from './MainController.jsx'
import Footer from '../Components/Footer.jsx'
import Header from '../Components/Header.jsx'

import '../Stylings/AppStylings.css'

class HeaderAndFooterController extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            configured: false,
            signedIn: true
        }
    }

    setSignInStatus (status) {

        this.setState({
            signedIn: status
        }) 

        if(!this.state.signedIn){
            sessionStorage.clear();
            window.location.reload(false);
        }
    }

    getConfiguredStatus(status){
        this.setState({
            configured: false
        })
    }

    render(){
        return (
            <div className="mainAppWrapper">
                <Header/>
                <MainController footerConfiguredStatus={this.state.configured}/>
                <Footer setSignInStatus = { this.setSignInStatus }/>
            </div>
        )
    }
}

export default HeaderAndFooterController;