import React from 'react';

import getUserInventory from '../Models/GetUserInventory.js'
import getNutrients from '../Models/GetFoodNutrients.js'
import getExpiration from '../Models/UpdateExpiration.js'
import deleteInventoryItem from '../Models/DeleteInventoryItem.js'
import getShoppingList from '../Models/GetShoppingList.js';
import getMeals from '../Models/GetMeals.js';
import getFoodsInMeal from '../Models/GetFoodsInMeal.js';

import ShoppingListPage from '../Views/ShoppingListPage';

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import '../Stylings/AppStylings.css'
import moment from '../moment.js';

class ShoppingListController extends React.Component {

    constructor(props){
        super(props);   

        this.state = {
            userId: this.props.userId,
            dataReturned: false,
            inventory: {}
        }
    }

    componentDidMount(){
        this.getInventory();
        this.getMealsandFoods();

        this.setState({
            dataReturned: true
        })
    }

    getMealsandFoods = async e => {
        var url = "http://3.233.98.252:8080/getMeals?userId='" + String(this.state.userId) + "'";
        var returnedResults = await getMeals(url);

        console.log(returnedResults.success)

        var mealIds = returnedResults.success.map(mealId => {
            mealId = mealId.Meal_Id;
            return mealId;
        });

        console.log(mealIds)

        var foodIds = [];

        for(let i = 0; i < mealIds.length ; i++){

            url = "http://3.233.98.252:8080/getFoodsInMeal?mealId='" + String(mealIds[i]) + "'";

            var foodsInMeal = await getFoodsInMeal(url);

            if(foodsInMeal.success !== false){

            foodsInMeal = foodsInMeal.success.map(food => {
                food = food;
                return food
            });
            }
    
            foodIds = foodIds.concat(foodsInMeal)
        };

        console.log(foodIds);

        this.setState({
            foodIds: foodIds,
            mealIds: mealIds
        })
    }

    getInventory = async e =>{
        var url = "http://3.233.98.252:8080/getUserInventory?userId='" + String(this.state.userId) + "'";
        var inventory = await getUserInventory(url);

        if(inventory.success.length > 0){

            inventory = inventory.success.map(food => {
                food = food;
                return food
            });

            for(let i = 0; i < inventory.length; i++){
                var foodId = inventory[i].Food_Id;
    
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
                var expiration = await getExpiration(url, jsonBody); //what will be used to store the days to expiration and calculate expiration date
                var currentDate = moment();
                var expDate = moment().add(5, 'days').format('ll');
                var daysLeft = -1 * currentDate.diff(expDate, 'days') +1;

                console.log(foodData)
                console.log(inventory)
                inventory[i]['foodInfo'] =  {
                    name: foodData.ingredients[0].parsed[0].food,
                    foodId: inventory[i].Food_Id,
                    serving: inventory[i].Serving,
                    unit: inventory[i].Unit,
                    ExpirationDate: expDate,
                    Days_Left: daysLeft,
                };
            }

            inventory = inventory.map(food => {
                food = food.foodInfo;
                return food
            });

        }else{
            inventory = [{}]
        }

        console.log(inventory)

        this.setState({
            inventory: inventory
        })
    }

    removeInventoryItem = async e => {
        var url = "http://3.233.98.252:8080/deleteInventoryItem?foodId='" + String(e) + "'&userId='" + String(this.state.userId);
        var itemRemoved = await deleteInventoryItem(url);
    
        if(itemRemoved.success){
            this.setState({
                dataReturned: false
            }, () =>this.getInventory())
        }
      }
    
    render(){

        if(this.state.dataReturned){
           return(
            <ShoppingListPage 
            inventory={this.state.inventory}
            getSearchQuery={this.props.getSearchQuery}
            getFoodId={this.props.getFoodId}
            removeInventoryItem={this.removeInventoryItem}
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

export default ShoppingListController;