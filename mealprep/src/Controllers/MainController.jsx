import React from 'react';
import ConfigPage from '../Views/ConfigurationPage.jsx';
import MainPage from '../Views/MainPage.jsx'
import uploadUserConfig from '../Models/UploadUserConfig.js'

class MainController extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            configured: false,
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
                vegan: false,
                vegetarian: false
            }
        }

        this.configuredChangedListener(this.props.footerConfiguredStatus)
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

        this.uploadUserConfig();
    }

    configuredChangedListener(status){
        this.setState({
            configured: status
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

    setConfigStatus(status){
        this.setState({
            configured: status
        })
    }
   
    render() { 

        if(this.state.configured){
            return(
                <MainPage 
                username={this.state.username} 
                constraints={this.state.constraints}
                getConfigStatus={this.getConfigStatus}
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