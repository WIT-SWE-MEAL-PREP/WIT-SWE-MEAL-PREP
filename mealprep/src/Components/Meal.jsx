import React from 'react'
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import getMeal from '../Models/GetMeal.js'

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import '../Stylings/FoodStylings.css'


class Food extends React.Component{
    constructor(props){
      super(props)

      this.state = {
        mealId: this.props.mealId
      }
    }

    getData = async e => {
        var url = "http://localhost:8080/getMeal?mealId='" + String(this.state.mealId) + "'";

        var returnedResults = await getMeal(url);

        console.log(returnedResults)

        this.setState({
            mealInfo: returnedResults.success[0],
            dataReturned: true
        }, () => console.log(this.state.mealInfo));
    }

    
    render() {
        
        if(this.state.dataReturned && this.props.mealDataUpdated){
            return(
                <div>
                    <h1>{this.state.mealInfo.Name}</h1>
                </div>
            )
        }else{

            this.getData();

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

export default withRouter(Food);