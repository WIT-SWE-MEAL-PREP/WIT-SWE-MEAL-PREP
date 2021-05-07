import React from 'react'
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import '../Stylings/SearchBarStylings.css'

class Food extends React.Component{
    constructor(props){
      super(props)

      this.state = {
        foodInfo: {},
        preliminaryInfo: this.props.foodInfo
      }
    }
     
    // getData = async e => {
    //     var url = "https://api.edamam.com/api/food-database/v2/parser?nutrition-type=logging&ingr=" + String(this.state.search) + "&app_id=36b7b45f&app_key=cb6dd0831871febd1d0ce5077a364182";
    //     var returnedResults = await getFood(url);

    //     this.setState({
    //         foodInfo: returnedResults,
    //         dataReturned: true
    //     });
    // }
    
    render() {
        return(
            <div>
                <img src={this.state.preliminaryInfo.image} alt={this.state.preliminaryInfo.label}/>
                <h1>{this.state.preliminaryInfo.label}</h1>
            </div>
        )
    }
}   

export default withRouter(Food);