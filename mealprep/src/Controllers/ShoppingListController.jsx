import React from 'react';

import getNutrients from '../Models/GetFoodNutrients.js'

import getShoppingList from '../Models/GetShoppingList.js';
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
            shoplist: [{}]
        }
    }

    componentDidMount(){
        this.getSL();

        this.setState({
            dataReturned: true
        })
    }

    
    getSL = async e =>{
        var url = "http://3.233.98.252:8080/getShoppingList?userId='" + String(this.state.userId) + "'";
        var shoplist = await getShoppingList(url);
        if(shoplist.success.length > 0){

            shoplist = shoplist.success.map(food => {
                food = food;
                return food
            });

            for(let i = 0; i < shoplist.length; i++){
                var foodId = shoplist[i].Food_Id;
    
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
                console.log(shoplist)
                shoplist[i]['foodInfo'] =  {
                    name: foodData.ingredients[0].parsed[0].food,
                    foodId: shoplist[i].Food_Id,
                };
            }

            shoplist = shoplist.map(food => {
                food = food.foodInfo;
                return food
            });

        }else{
            shoplist = [{}]
        }

        console.log(shoplist)

        this.setState({
            shoplist: shoplist
        })
    }

    
    render(){

        if(this.state.dataReturned){
           return(
            <ShoppingListPage 
            shoplist={this.state.shoplist}
            getSearchQuery={this.props.getSearchQuery}
            getFoodId={this.props.getFoodId}
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