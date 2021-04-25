import React from 'react';
import ConfigPage from '../Views/ConfigurationPage.jsx';
import MainPage from '../Views/MainPage.jsx'

class MainController extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            configured: false,
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            constraints: {
                numMeals: 0,
                calories: 0,
                protein: 0,
                carbs: 0,
                fat: 0,
                sugar: 0,
                fiber: 0,
                vegan: false,
                vegetarian: false
            }
        }
    }

    handleSubmit = () => {
        this.setState({
            configured: true,
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
   
    render() { 

        if(this.state.configured){
            return(
                <MainPage 
                username={this.state.username} 
                constraints={this.state.constraints}
                />
                )
        }else{
            return(
                <ConfigPage 
                handleSubmit={this.handleSubmit} 
                />
                )
        }
    }
}

export default MainController;