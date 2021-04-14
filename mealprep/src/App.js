import React from 'react';

// import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainController from './Controllers/MainController.jsx'
import AccountStatusController from './Controllers/AccountStatusController.jsx';
import Footer from './Components/Footer.jsx'
import Header from './Components/Header.jsx'

import './Stylings/AppStylings.css'
import useToken from './useToken.js';

function App() {
    const {loggedIn, isLoggedIn} = useToken();

    console.log(loggedIn)

    if (!loggedIn) {
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