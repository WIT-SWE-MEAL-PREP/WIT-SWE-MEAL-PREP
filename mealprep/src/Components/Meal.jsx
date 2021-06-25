import React from 'react'
import { withRouter } from 'react-router-dom';

import getMeal from '../Models/GetMeal.js'
import getFoodsInMeal from '../Models/GetFoodsInMeal.js'
import getNutrients from '../Models/GetFoodNutrients.js'
import getFood from '../Models/GetFood.js'
import deleteMeal from '../Models/DeleteMeal.js'

import Ingrediant from './Ingrediant.jsx'

import calculateValues from '../Services/CalculateValues.jsx'
import removeFoodFromMealService from '../Services/RemoveFoodFromMeal.jsx'

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import '../Stylings/MealStylings.css'


class Food extends React.Component{
    constructor(props){
      super(props)

      this.state = {
        mealId: this.props.mealId
      }

      this.removeFood = this.removeFood.bind(this);
    }

    getData = async e => {
        var url = "http://localhost:8080/getMeal?mealId='" + String(this.props.mealId) + "'";

        var mealInfo = await getMeal(url);

        var url = "http://localhost:8080/getFoodsInMeal?mealId='" + String(this.props.mealId) + "'";

        var foodsInMeal = await getFoodsInMeal(url);

        console.log(foodsInMeal);

        if(foodsInMeal.success !== false){

            foodsInMeal = foodsInMeal.success.map(food => {
                food = food;
                return food
            });
    
            for(let i = 0; i < foodsInMeal.length; i++){
                var foodId = foodsInMeal[i].Food_Id;
    
                var url = "https://api.edamam.com/api/food-database/v2/nutrients?app_id=36b7b45f&app_key=cb6dd0831871febd1d0ce5077a364182";
    
                var jsonBody = {
                    "ingredients": [
                      {
                        "quantity": 1,
                        "measureURI": "http://www.edamam.com/ontologies/edamam.owl#Measure_gram",
                        "foodId": foodId
                      }
                    ]
                  }
        
                var foodData = await getNutrients(url, jsonBody);

                if(foodData.totalNutrients.SUGAR != undefined){
                    foodsInMeal[i]['foodInfo'] =  {
                        name: foodData.ingredients[0].parsed[0].food,
                        calories: foodData.totalNutrients.ENERC_KCAL.quantity,
                        protein: foodData.totalNutrients.PROCNT.quantity,
                        carbs: foodData.totalNutrients.CHOCDF.quantity,
                        fat: foodData.totalNutrients.FAT.quantity,
                        fiber: foodData.totalNutrients.FIBTG.quantity,
                        sugar: foodData.totalNutrients.SUGAR.quantity,
                        serving: 1,
                        unit: 'gram',
                    };
                }else{
                    foodsInMeal[i]['foodInfo'] =  {
                        name: foodData.ingredients[0].parsed[0].food,
                        calories: foodData.totalNutrients.ENERC_KCAL.quantity,
                        protein: foodData.totalNutrients.PROCNT.quantity,
                        carbs: foodData.totalNutrients.CHOCDF.quantity,
                        fat: foodData.totalNutrients.FAT.quantity,
                        fiber: foodData.totalNutrients.FIBTG.quantity,
                        serving: 1,
                        unit: 'gram',
                    };
                }
    
    
                foodsInMeal[i]['foodInfo'] = calculateValues(foodsInMeal[i].Serving, foodsInMeal[i].Unit, foodsInMeal[i].foodInfo)
    
            }
    
            this.setState({
                mealInfo: mealInfo.success[0],
                foodsInMeal: foodsInMeal,
                dataReturned: true
            });
        }
    }

    routeToFood = async e => {
        var url = "https://api.edamam.com/api/food-database/v2/parser?nutrition-type=logging&ingr=" + String(e.Food_Id) + "&app_id=36b7b45f&app_key=cb6dd0831871febd1d0ce5077a364182";
        var returnedResults = await getFood(url);

        this.props.getSearchQuery(returnedResults.hints[0].food)
        this.props.history.push("/food")
    }

    removeFood = async e => {

        var foodToremove = e;

        this.setState({
            dataReturned: false
        })

        if(this.state.foodsInMeal.length <= 1){

            var url = "http://localhost:8080/deleteMeal?mealId='" + String(this.props.mealId) + "'";
            var mealDeleted = await deleteMeal(url);

            this.props.history.push("/")

        }else{

            var foodRemoved = await removeFoodFromMealService(foodToremove, this.state.mealInfo);

            this.getData();
        }

        this.setState({
            dataReturned: true
        })

    }
 
    render() {
        
        if(this.state.dataReturned && this.props.mealDataUpdated){
            return(
                <div className="foodWrapper">
                    <div className="foodHeader">
                        <div className="title">
                            <h1>{this.state.mealInfo.Name}</h1>
                        </div>
                    </div>
                    <div className="nutrientWrapper"> 
                        <h2>Calories: <b className="nutrient">{parseFloat(this.state.mealInfo.Calories).toFixed(2) + " kcal"}</b></h2>
                        <h2>Protein: <b className="nutrient">{parseFloat(this.state.mealInfo.Protein).toFixed(2) + " g"}</b></h2>
                        <h2>Carbs: <b className="nutrient">{parseFloat(this.state.mealInfo.Carbs).toFixed(2) + " g"}</b></h2>
                        <h2>Fat: <b className="nutrient">{parseFloat(this.state.mealInfo.Total_Fat).toFixed(2) + " g"}</b></h2>
                        <h2>Fiber: <b className="nutrient">{parseFloat(this.state.mealInfo.Fiber).toFixed(2) + " g"}</b></h2>
                        {(() => {
                        if(this.state.mealInfo.Sugar != undefined){
                            if(this.state.mealId == 0){
                            return(
                                <h2>Sugar: <b className="nutrient">{parseFloat(this.state.mealInfo.Sugar).toFixed(2) + " g"}</b></h2>                
                                )
                            }else{
                                return(
                                <h2>Sugar: <b className="nutrient">{"n/a" + " g"}</b></h2>  
                                )   
                            }
                        }
                        })()}
                        <h2>Ingredients: </h2>
                        {(() => {
                            var foods = this.state.foodsInMeal.map(food => (
                                <Ingrediant foodInfo={food} routeToFood={this.routeToFood} removeFood={this.removeFood} />
                            ))
                            return <div className="ingredientsDiv">{foods}</div>
                        })()}
                        <div className="backToMainDiv">
                            <button type="submit" className="backToMainBtn" onClick={() => this.props.history.push("/")}>My Meals</button>
                        </div>
                    </div>
                </div>
            )
        }else{

            if(this.props.mealDataUpdated){
                this.getData();
            }

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