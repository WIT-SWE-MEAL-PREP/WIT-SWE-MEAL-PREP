import React from 'react';
import {withRouter} from 'react-router-dom';

import ConfigPage from '../Views/ConfigurationPage.jsx';
import uploadUserConfig from '../Models/UploadUserConfig.js'
import getConfig from '../Models/GetConfig.js'

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

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
            },
            dataReturned: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.getUserConfig();
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

        var url = "http://3.233.98.252:8080/getConfig?userId='" + String(this.state.userId) + "'";
        var returnedResults = await getConfig(url);

        console.log(returnedResults)

        if(returnedResults.configData !== false){
            this.setState({
                userConfig: returnedResults.configData,
                dataReturned: true
            })
        }
    }

    uploadUserConfig = async e => {
        var url = "http://localhost:8080/uploadUserConfig?userId='" + 
                                          String(this.state.userId) 
                                          + "'&firstname='" + String(this.state.firstName) 
                                          + "'&lastname='" + String(this.state.lastName)
                                          + "'&age='" + String(this.state.age)
                                          + "'&weight='" + String(this.state.weight)
                                          + "'&height='" + String(this.state.height)
                                          + "'&calories='" + String(this.state.constraints.calories)
                                          + "'&protein='" + String(this.state.constraints.protein)
                                          + "'&carbs='" + String(this.state.constraints.carbs)
                                          + "'&fat='" + String(this.state.constraints.fat)
                                          + "'&sugar='" + String(this.state.constraints.sugar)
                                          + "'&fiber='" + String(this.state.constraints.fiber)
                                          + "'&numMeals='" + String(this.state.constraints.numMeals)
                                          ;

        var returnedResults = await uploadUserConfig(url);

        if(!returnedResults.success){

            alert("An error occurred in the upload. Please try again later.")
        }else{
            this.props.history.push("/")
        }
    }

    render(){
        if(this.state.dataReturned){
            return(
                <ConfigPage 
                handleSubmit={this.handleSubmit}
                userConfig={this.state.userConfig}
                />
            )
        }else{
            return(
                <div style={{
                    height: '100%',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    position: 'relative',
                    paddingTop: '25%',
                    }}>
    
                    <Loader
                    type="Oval"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    />
    
                </div>
            )
        }
    }
}

export default withRouter(ConfigController);