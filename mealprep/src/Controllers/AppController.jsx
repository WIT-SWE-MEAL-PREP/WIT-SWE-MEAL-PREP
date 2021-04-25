import React from 'react';

// import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AccountStatusController from './AccountStatusController.jsx';
import MainController from './MainController.jsx'
import ConfigPage from '../Views/ConfigurationPage.jsx';
import Footer from '../Components/Footer.jsx'
import Header from '../Components/Header.jsx'

import uploadUserConfig from '../Models/UploadUserConfig.js'
import getConfig from '../Models/GetConfig.js'

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
            age: '',
            weight: '',
            height: '',
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
        this.getUsername = this.getUsername.bind(this);
    }

    componentDidMount(){
        this.getUserConfig()
        this.getSignInStatus()
    }

    setConfiguredStatus(status){
        this.setState({
            signedIn: this.state.signedIn,
            staySignedIn: this.state.staySignedIn,
            configured: status,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            username: this.state.username,
            age: this.state.age,
            weight: this.state.weight,
            height: this.state.height,
            constraints: this.state.constraints
        })
    }

    getSignInStatus(){
        var tokenString = sessionStorage.getItem('token');
        var userToken = JSON.parse(tokenString);

        if(userToken != null){
            this.setState({
                signedIn: userToken.loggedIn,
                username: userToken.username
            }, () => {
                this.getUserConfig()
            })
        }
    }

    handleSubmit(status){
        this.setState({
            signedIn: this.state.signedIn,
            staySignedIn: this.state.staySignedIn,
            configured: status,
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            age: document.getElementById("Age").value,
            weight: document.getElementById("Weight").value,
            height: document.getElementById("Height").value,
            username: this.state.username,
            constraints:{
                numMeals: document.getElementById("numMeals").value,
                calories: document.getElementById("calories").value,
                protein: document.getElementById("protein").value,
                carbs: document.getElementById("carbs").value,
                fat: document.getElementById("fat").value,
                sugar: document.getElementById("sugar").value,
                fiber: document.getElementById("fiber").value,
            }
        }, () => {

            this.uploadUserConfig()
        })
    }

    getUserConfig = async e => {

        var url = "http://localhost:8080/getConfig?username='" + String(this.state.username) + "'";
        var returnedResults = await getConfig(url);

        console.log(returnedResults.configData)

        if(returnedResults.configData !== false){
            if(returnedResults.configData[0].First_Name !== ''){
                this.setState({
                    signedIn: this.state.signedIn,
                    staySignedIn: this.state.staySignedIn,
                    configured: true,
                    firstName: returnedResults.configData[0].First_Name,
                    lastName: returnedResults.configData[0].Last_Name,
                    username: this.state.username,
                    age: returnedResults.configData[0].Age,
                    weight: returnedResults.configData[0].Weight,
                    height: returnedResults.configData[0].Height,
                    constraints: this.state.constraints
                })
            }
        }
    }

    uploadUserConfig = async e => {

        var url = "http://localhost:8080/uploadUserConfig?username='" + 
                                          String(this.state.username) 
                                          + "'&firstname='" + String(this.state.firstName) 
                                          + "'&lastname='" + String(this.state.lastName)
                                          + "'&age='" + String(this.state.age)
                                          + "'&weight='" + String(this.state.weight)
                                          + "'&height='" + String(this.state.height);
        var returnedResults = await uploadUserConfig(url);

        if(!returnedResults.success){
            //TO-DO add error handling for datbase failure here 
        }
    }

    setSignInStatus (status) {
        if(!status){
            sessionStorage.clear();
            window.location.reload(false);
        }
    }

    setLogInStatus(signedInStatus, staySignedInStatus){
        this.setState({
            signedIn: signedInStatus.loggedIn,
            staySignedIn: staySignedInStatus
        }, () => {
            if(this.state.staySignedIn){

                signedInStatus["username"] = this.state.username
                sessionStorage.setItem('token', JSON.stringify(signedInStatus));
            }
        })
    }

    getUsername(username) {
        this.setState({
            username: username
        }, () =>{
            this.getUserConfig()
        })
    }

    render(){

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