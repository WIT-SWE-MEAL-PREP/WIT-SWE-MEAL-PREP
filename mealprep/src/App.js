import React, { useState } from 'react';

// import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AccountStatusController from './Controllers/AccountStatusController.jsx';
import HeaderAndFooterController from './Controllers/headerAndFooterController.jsx'

import './Stylings/AppStylings.css'
import useToken from './useToken.js';

function App() {
    const {success, isLoggedIn} = useToken();

    if (!success) {
        return <AccountStatusController 
        isLoggedIn = { isLoggedIn }
        />
    }else{
        return (
            <HeaderAndFooterController/>
        )
    }
}

export default App;