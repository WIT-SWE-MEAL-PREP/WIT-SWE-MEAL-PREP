import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import AccountStatusController from './AccountStatusController.jsx';
import MainController from './MainController.jsx'
import ConfigController from './ConfigurationController.jsx'
import Food from '../Components/Food.jsx'

import Footer from '../Components/Footer.jsx'
import Header from '../Components/Header.jsx'

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
        this.getUsername = this.getUsername.bind(this);
        this.getSearchQuery = this.getSearchQuery.bind(this);
    }

    componentDidMount(){
        this.getSignInStatus()
    }

    getSignInStatus(){
        var tokenString = sessionStorage.getItem('token');
        var userToken = JSON.parse(tokenString);

        if(userToken != null){
            this.setState({
                signedIn: userToken.loggedIn,
                username: userToken.username
            })
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
        })
    }

    getSearchQuery(searchQuery){
        this.setState({
            food: searchQuery
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
            return(
                <div className="mainAppWrapper">
                <BrowserRouter>
                    <Switch>
                        <Route path="/configure">
                            <ConfigController username={this.state.username}/>
                        </Route>
                        <Route path="/food">
                            <Header/>
                            <Food foodInfo={this.state.food}/>
                            <Footer setSignInStatus = { this.setSignInStatus }/>
                        </Route>
                        <Route path="/">
                            <Header/>
                            <MainController getSearchQuery={this.getSearchQuery}/>
                            <Footer setSignInStatus = { this.setSignInStatus }/>
                        </Route>
                    </Switch>
                </BrowserRouter>
            </div>
            )
        }
    }
}

export default AppController;