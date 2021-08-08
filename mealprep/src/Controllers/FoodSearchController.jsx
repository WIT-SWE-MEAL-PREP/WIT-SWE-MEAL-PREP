import React from 'react';
import { withRouter } from 'react-router-dom';
import getFood from '../Models/GetFood.js'

import SearchResults from '../Views/SearchResults.jsx'
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

class FoodSearchController extends React.Component {
    constructor(props){
        super(props);
        console.log(this.props)
        this.state = {
            searchQuery: this.props.searchQuery,
            dataReturned: false,
            // renderSearchResults: true,
            results: [{}]
        }
    }

    componentDidMount = () =>{
        this.getData(this.state.searchQuery);
    }

    retrieveSearchSelections = (foodInfo) => {

        console.log(foodInfo)

        this.props.getFoodId(foodInfo);
        this.props.history.push('/food');
        console.log("got here")
    }
    

    getData = async e => {
        var url = "https://api.edamam.com/api/food-database/v2/parser?nutrition-type=logging&ingr=" + String(this.state.searchQuery) + "&app_id=36b7b45f&app_key=cb6dd0831871febd1d0ce5077a364182";
        var returnedResults = await getFood(url);

        returnedResults = returnedResults.hints.map(hint => {
            return( {
                label: hint.food.label,
                Calories: parseFloat(hint.food.nutrients.ENERC_KCAL).toFixed(2),
                Protein: parseFloat(hint.food.nutrients.PROCNT).toFixed(2),
                Carbs: parseFloat(hint.food.nutrients.CHOCDF).toFixed(2),
                Fat: parseFloat(hint.food.nutrients.FAT).toFixed(2),
                Fiber: parseFloat(hint.food.nutrients.FIBTG).toFixed(2),
                foodId: hint.food.foodId,
                image: hint.food.image
            })
        })

        this.setState({
            results: returnedResults,
            dataReturned: true
        });
    }

    render(){

        if(this.state.dataReturned){
           return(
            <SearchResults 
            results={this.state.results}
            retrieveSearchSelections={this.retrieveSearchSelections}
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

export default withRouter(FoodSearchController);