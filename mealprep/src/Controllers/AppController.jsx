import React from 'react';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';


import AccountStatusController from './AccountStatusController.jsx';
import MainController from './MainController.jsx'
import ConfigController from './ConfigurationController.jsx'

import Food from '../Components/Food.jsx'
import Meal from '../Components/Meal.jsx'

import Footer from '../Components/Footer.jsx'
import Header from '../Components/Header.jsx'

import updateMeal from '../Services/UpdateMeal.jsx'

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
            userId: '',
            constraints: {
                numMeals: 0,
                calories: 0,
                protein: 0,
                carbs: 0,
                fat: 0,
                sugar: 0,
                fiber: 0,
            },
            foodAndMealInfo: {
                mealId: ''
            },
            mealDataUpdated: false
        }

        this.setLogInStatus = this.setLogInStatus.bind(this);
        this.getUserId = this.getUserId.bind(this);
        this.getSearchQuery = this.getSearchQuery.bind(this);
        this.getFoodToAdd = this.getFoodToAdd.bind(this);
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
                userId: userToken.userId
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

                signedInStatus["userId"] = this.state.userId
                sessionStorage.setItem('token', JSON.stringify(signedInStatus));
            }
        })
    }

    getUserId(userid) {
        this.setState({
            userId: userid
        })
    }

    getSearchQuery(searchQuery){
        this.setState({
            food: searchQuery
        })
    }

    getFoodToAdd(foodAndMealInfo){

        console.log(foodAndMealInfo)

        this.setState({
            foodAndMealInfo: foodAndMealInfo
        }, async () => {
            await updateMeal(this.state.foodAndMealInfo);
            this.setState({
                mealDataUpdated: true
            })
        })
    }

    render(){

        if(!this.state.signedIn){
            return(
                <AccountStatusController 
                setLogInStatus = { this.setLogInStatus }
                getUserId = { this.getUserId }/>
            );
        }else if(this.state.signedIn){
            return(
                <div className="mainAppWrapper">
                <BrowserRouter>
                    <Switch>
                        <Route path="/configure">
                            <ConfigController userId={this.state.userId}/>
                        </Route>
                        <Route path="/food">
                            <Header/>
                            <Food foodInfo={this.state.food} userId={this.state.userId} getFoodToAdd={ this.getFoodToAdd }/>
                            <Footer setSignInStatus = { this.setSignInStatus }/>
                        </Route>
                        <Route path="/meal">
                            <Header/>
                            <Meal mealId={this.state.foodAndMealInfo.mealId} userId={this.state.userId} mealDataUpdated={this.state.mealDataUpdated}/>
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