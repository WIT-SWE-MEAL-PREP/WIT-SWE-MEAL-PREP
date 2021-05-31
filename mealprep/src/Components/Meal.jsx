import React from 'react'
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import getMeal from '../Models/GetMeal.js'
import getFoodsInMeal from '../Models/GetFoodsInMeal.js'
import getNutrients from '../Models/GetFoodNutrients.js'
import getFood from '../Models/GetFood.js'

import calculateValues from '../Services/CalculateValues.jsx'

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

        var mealInfo = await getMeal(url);

        var url = "http://localhost:8080/getFoodsInMeal?mealId='" + String(this.state.mealId) + "'";

        var foodsInMeal = await getFoodsInMeal(url);

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

            console.log(foodData)

            foodsInMeal[i]['Food_Info'] = {
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

        }

        console.log(foodsInMeal)

        this.setState({
            mealInfo: mealInfo.success[0],
            foodsInMeal: foodsInMeal,
            dataReturned: true
        });
    }

    routeToFood = async e => {
        var url = "https://api.edamam.com/api/food-database/v2/parser?nutrition-type=logging&ingr=" + String(e.Food_Id) + "&app_id=36b7b45f&app_key=cb6dd0831871febd1d0ce5077a364182";
        var returnedResults = await getFood(url);

        console.log(returnedResults)

        this.props.getSearchQuery(returnedResults.hints[0].food)
        this.props.history.push("/food")
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
                        <h2>Sugar: <b className="nutrient">{parseFloat(this.state.mealInfo.Sugar).toFixed(2) + " g"}</b></h2>
                        <h2>Ingredients: </h2>
                        {(() => {
                            var foods = this.state.foodsInMeal.map(food => (
                                <div className="ingredientDiv" key={food.Food_Id}>
                                    <Link onClick={() => { this.routeToFood(food) }}>
                                        {food.Food_Info.name}
                                    </Link>
                                    <h4 id={"calories_" + food.Food_Id}>Calories:  {parseFloat(food.Food_Info.calories).toFixed(2) + " kcal"} </h4>
                                    <h4 id={"protein_" + food.Food_Id}>Protein:  {parseFloat(food.Food_Info.protein).toFixed(2) + " g"} </h4>
                                    <h4 id={"carbs_" + food.Food_Id}>Carbs: {parseFloat(food.Food_Info.carbs).toFixed(2) + " g"} </h4>
                                    <h4 id={"fat_" + food.Food_Id}>Fat:  {parseFloat(food.Food_Info.fat).toFixed(2) + " g"} </h4>
                                </div>
                            ))
                            return <div>{foods}</div>
                        })()}
                    </div>
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