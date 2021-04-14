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

    console.log(success);
    console.log(isLoggedIn);

    if (!success) {
        return <AccountStatusController isLoggedIn = { isLoggedIn }
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