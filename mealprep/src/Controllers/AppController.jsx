import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AccountStatusController from './AccountStatusController.jsx';
import MainController from './MainController.jsx'
import ConfigController from './ConfigurationController.jsx'
import InventoryController from './InventoryController.jsx';

import Food from '../Components/Food.jsx'
import Meal from '../Components/Meal.jsx'

import Footer from '../Components/Footer.jsx'
import Header from '../Components/Header.jsx'

import addNewFood from '../Services/AddNewFood.jsx'
import updateUserInventory from '../Models/UpdateUserInventory.js'
import UpdateExpiration from '../Models/UpdateExpiration.js'

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
            mealId: '',
            foodAndMealInfo:{
                mealId: ''
            },
            mealDataUpdated: false
        }

        this.setLogInStatus = this.setLogInStatus.bind(this);
        this.getUserId = this.getUserId.bind(this);
        this.getSearchQuery = this.getSearchQuery.bind(this);
        this.getFoodToAdd = this.getFoodToAdd.bind(this);
        this.getMealId = this.getMealId.bind(this);
        this.getFoodId = this.getFoodId.bind(this);
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

    getFoodId(foodData){

        this.setState({
            food: foodData
        })
    }

    getMealId(mealId){
        this.setState({
            mealDataUpdated: true,
            mealId: mealId
        })
    }

    getFoodToAdd(foodAndMealInfo){

        this.setState({
            foodAndMealInfo: foodAndMealInfo,
            mealId: foodAndMealInfo.mealId
        }, async () => {
            
            var newId = await addNewFood(foodAndMealInfo, this.state.userId);

            this.setState({
                mealDataUpdated: true,
                mealId: newId
            })
        })

    }

    addToInventory = async e => {
        var foodId = e.id;
        var serving = e.serving;
        var unit = e.unit;

        var url = "http://3.233.98.252:8080/updateUserInventory?userId='" + 
                                          String(this.state.userId) 
                                          + "'&foodId='" + String(foodId) 
                                          + "'&serving='" + String(serving)
                                          + "'&unit='" + String(unit)
        var inventory = await updateUserInventory(url);

        console.log(inventory);
    }

    /*addExpiration = async e => {
        var exp = e.expiration;

        var url = "http://localhost:8080/updateUserInventory?userId='" + 
                                          String(this.state.userId) 
                                          + "'&Expiration='" + String(exp) 
        var inventory = await updateExpiration(url);

        console.log(inventory);
    }*/

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
                            <Food foodInfo={this.state.food} userId={this.state.userId} getFoodToAdd={ this.getFoodToAdd } addToInventory={this.addToInventory} />
                            <Footer setSignInStatus = { this.setSignInStatus }/>
                        </Route>
                        <Route path="/meal">
                            <Header/>
                            <Meal mealId={this.state.mealId} userId={this.state.userId} mealDataUpdated={this.state.mealDataUpdated} getSearchQuery={this.getSearchQuery}/>
                            <Footer setSignInStatus = { this.setSignInStatus }/>
                        </Route>
                        <Route path="/inventory">
                            <Header/>
                            <InventoryController userId={this.state.userId} getSearchQuery={this.getSearchQuery} getFoodId={this.getFoodId}/>
                            <Footer setSignInStatus = { this.setSignInStatus }/>
                        </Route>
                        <Route path="/">
                            <Header/>
                            <MainController getSearchQuery={this.getSearchQuery} getMealId={this.getMealId} userId={this.state.userId} getFoodId={this.getFoodId} />
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