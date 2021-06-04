import React from 'react';
import {withRouter} from 'react-router-dom';

import ConfigPage from '../Views/ConfigurationPage.jsx';
import uploadUserConfig from '../Models/UploadUserConfig.js'
import getConfig from '../Models/GetConfig.js'

class ConfigController extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            firstName: '',
            lastName: '',
            age: '',
            weight: '',
            height: '',
            userId: this.props.userId,
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

        this.handleSubmit = this.handleSubmit.bind(this);
    }



    handleSubmit(){

        this.setState({
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            age: document.getElementById("Age").value,
            weight: document.getElementById("Weight").value,
            height: document.getElementById("Height").value,
            userID: this.state.userId,
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

        var url = "http://localhost:8080/getConfig?userId='" + String(this.state.userId) + "'";
        var returnedResults = await getConfig(url);

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
        var url = "http://localhost:8080/uploadUserConfig?userId='" + 
                                          String(this.state.userId) 
                                          + "'&firstname='" + String(this.state.firstName) 
                                          + "'&lastname='" + String(this.state.lastName)
                                          + "'&age='" + String(this.state.age)
                                          + "'&weight='" + String(this.state.weight)
                                          + "'&height='" + String(this.state.height);
        var returnedResults = await uploadUserConfig(url);

        if(!returnedResults.success){
            //TO-DO add error handling for datbase failure here 
        }else{
            this.props.history.push("/")
        }
    }

    render(){
        return(
            <ConfigPage 
            handleSubmit={this.handleSubmit}
            />
        )
    }
}

export default withRouter(ConfigController);