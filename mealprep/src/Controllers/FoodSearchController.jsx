import React from 'react';
import getFood from '../Models/GetFood.js'

import SearchResults from '../Views/SearchResults.jsx'
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

class FoodSearchController extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            searchQuery: this.props.searchQuery,
            dataReturned: false,
            results: [{}]
        }
    }

    componentDidMount = () =>{
        this.getData(this.state.searchQuery);
    }

    getData = async e => {
        var url = "https://api.edamam.com/api/food-database/v2/parser?nutrition-type=logging&ingr=" + String(this.state.searchQuery) + "&app_id=36b7b45f&app_key=cb6dd0831871febd1d0ce5077a364182";
        var returnedResults = await getFood(url);

        returnedResults = returnedResults.hints.map(hint => {
            return( {
                Name: hint.food.label,
                Calories: hint.food.nutrients.ENERC_KCAL
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
            retrieveSearchSelections={this.props.retrieveSearchSelections}
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

export default FoodSearchController;