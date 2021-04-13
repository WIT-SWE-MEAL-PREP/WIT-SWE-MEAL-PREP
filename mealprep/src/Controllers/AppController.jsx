import React, { useState } from 'react';

// import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainController from './MainController.jsx'
import AccountStatusController from './AccountStatusController.jsx'
import Footer from '../Components/Footer.jsx'
import Header from '../Components/Header.jsx'

import '../Stylings/AppStylings.css'

class AppController extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            loggedIn: false,
        }
    }

    isLoggedIn = (token) => {
        this.setState({
            loggedIn: token
        })
    }

    render(){
        if (!this.state.loggedIn) {
            return <AccountStatusController isLoggedIn = { this.isLoggedIn }
            />
        }
    
        return (
            <div className="mainAppWrapper">
                <div>
                    <Header/>
                </div>

                <MainController/>
                
                <div>
                    <Footer/>
                </div>
            </div>
        )
    }
}

export default AppController;