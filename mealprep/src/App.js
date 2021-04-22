import React, { useState } from 'react';

// import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainController from './Controllers/MainController.jsx'
import AccountStatusController from './Controllers/AccountStatusController.jsx';
import Footer from './Components/Footer.jsx'
import Header from './Components/Header.jsx'

import './Stylings/AppStylings.css'
import useToken from './useToken.js';


function App() {
    const {success, isLoggedIn} = useToken();
    var staySignedIn = false;

    function setStaySignedIn (status) {
    
        staySignedIn = status;
    }

    if (!success) {
        return <
            AccountStatusController 
            isLoggedIn = { isLoggedIn }
            setStaySignedIn = { setStaySignedIn }
            
        />
    }

    return (
        <div className="mainAppWrapper">
            <Header/>
            <MainController/>
            <Footer/>
        </div>
    )
}

export default App;