import React, { useState } from 'react';

// import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AccountStatusController from './AccountStatusController.jsx';
import MainController from './MainController.jsx'
import ConfigPage from '../Views/ConfigurationPage.jsx';
import Footer from '../Components/Footer.jsx'
import Header from '../Components/Header.jsx'

import uploadUserConfig from '../Models/UploadUserConfig.js'

import '../Stylings/AppStylings.css'

class AppController extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            configured: false,
            signedIn: false,
            staySignedIn: false,
            firstName: '',
            lastName: '',
            username: '',
            constraints: {
                numMeals: 0,
                calories: 0,
                protein: 0,
                carbs: 0,
                fat: 0,
                sugar: 0,
                fiber: 0,
            }
        }

        this.setLogInStatus = this.setLogInStatus.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setConfiguredStatus = this.setConfiguredStatus.bind(this);
    }

    componentDidMount(){
        this.getSignInStatus()
        console.log(this.state)
    }

    setConfiguredStatus(status){
        this.setState({
            signedIn: this.state.signedIn,
            staySignedIn: this.state.staySignedIn,
            configured: status,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            constraints: this.state.constraints
        })
    }

    getSignInStatus(){
        var tokenString = sessionStorage.getItem('token');
        var userToken = JSON.parse(tokenString);

        if(userToken != null){
            this.setState({
                signedIn: userToken.loggedIn
            })
        }
    }

    handleSubmit(status){
        console.log(status)
        // this.uploadUserConfig();

        this.setState({
            signedIn: this.state.signedIn,
            staySignedIn: this.state.staySignedIn,
            configured: status,
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            constraints:{
                numMeals: document.getElementById("numMeals").value,
                calories: document.getElementById("calories").value,
                protein: document.getElementById("protein").value,
                carbs: document.getElementById("carbs").value,
                fat: document.getElementById("fat").value,
                sugar: document.getElementById("sugar").value,
                fiber: document.getElementById("fiber").value,
            }
        })
    }

    uploadUserConfig = async e => {

        console.log(this.state.username);

        var url = "http://localhost:8080/uploadUserConfig?username='" + String(this.state.username) + "'";
        //  + this.state.firstName + "'&lastname='" + this.state.lastName;
        var returnedResults = await uploadUserConfig(url);

        this.setState({
            results: returnedResults,
            dataReturned: true
        });
    }

    setSignInStatus (status) {
        if(!status){
            sessionStorage.clear();
            window.location.reload(false);
        }
    }

    setLogInStatus(signedInStatus, staySignedInStatus){
        console.log(signedInStatus, staySignedInStatus)

        this.setState({
            signedIn: signedInStatus.loggedIn,
            staySignedIn: staySignedInStatus
        }, () => {
            if(this.state.staySignedIn){
                sessionStorage.setItem('token', JSON.stringify(signedInStatus));
            }

            console.log(this.state)
        })
    }

    getUsername(username) {
        this.setState({
            username: username
        }, console.log(this.state.username))
    }

    render(){

        console.log(this.state)

        if(!this.state.signedIn){
            return(
                <AccountStatusController 
                setLogInStatus = { this.setLogInStatus }
                getUsername = { this.getUsername }/>
            );
        }else if(this.state.signedIn){
            if(!this.state.configured){
                return(
                <ConfigPage 
                handleSubmit={this.handleSubmit} 
                />
                )
            }else if(this.state.configured){
                return(
                <div className="mainAppWrapper">
                    <Header/>
                    <MainController />
                    <Footer setSignInStatus = { this.setSignInStatus } setConfiguredStatus={ this.setConfiguredStatus } />
                </div>
                )
            }
        }
    }
}

export default AppController;