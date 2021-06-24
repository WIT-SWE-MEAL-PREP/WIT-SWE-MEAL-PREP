import React from 'react'
import { withRouter } from 'react-router-dom';

import getNutrients from '../Models/GetFoodNutrients.js'

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import '../Stylings/FoodStylings.css'

import calculateValues from '../Services/CalculateValues.jsx'

import AddFoodModal from '../Views/AddFoodModal.jsx'

class Food extends React.Component{
    constructor(props){
      super(props)

      this.state = {
        foodInfo: {},
        userId: this.props.userId,
        preliminaryInfo: this.props.foodInfo,
        dataReturned: false,
        showModal: false,
        initialModalRender: true
      }

      this.onClose = this.onClose.bind(this);
    }

    getData = async e => {
        var url = "https://api.edamam.com/api/food-database/v2/nutrients?app_id=36b7b45f&app_key=cb6dd0831871febd1d0ce5077a364182";

        var jsonBody = {
            "ingredients": [
              {
                "quantity": 1,
                "measureURI": "http://www.edamam.com/ontologies/edamam.owl#Measure_gram",
                "foodId": this.state.preliminaryInfo.foodId
              }
            ]
          }

        var returnedResults = await getNutrients(url, jsonBody);

        if(returnedResults.totalNutrients.SUGAR != undefined){
            this.setState({
                foodInfo: returnedResults,
                dataReturned: true,
                nutrients: {
                    name: this.state.preliminaryInfo.label,
                    id: this.state.preliminaryInfo.foodId,
                    calories: returnedResults.totalNutrients.ENERC_KCAL.quantity,
                    protein: returnedResults.totalNutrients.PROCNT.quantity,
                    carbs: returnedResults.totalNutrients.CHOCDF.quantity,
                    fat: returnedResults.totalNutrients.FAT.quantity,
                    fiber: returnedResults.totalNutrients.FIBTG.quantity,
                    sugar: returnedResults.totalNutrients.SUGAR.quantity,
                    serving: 1,
                    unit: "gram"
                }
            });
        }else{
            this.setState({
                foodInfo: returnedResults,
                dataReturned: true,
                nutrients: {
                    name: this.state.preliminaryInfo.label,
                    id: this.state.preliminaryInfo.foodId,
                    calories: returnedResults.totalNutrients.ENERC_KCAL.quantity,
                    protein: returnedResults.totalNutrients.PROCNT.quantity,
                    carbs: returnedResults.totalNutrients.CHOCDF.quantity,
                    fat: returnedResults.totalNutrients.FAT.quantity,
                    fiber: returnedResults.totalNutrients.FIBTG.quantity,
                    serving: 1,
                    unit: "gram"
                }
            });
        }

    }

    setValues(quanity, unit) {

        if(this.state.foodInfo.totalNutrients.SUGAR != undefined){
            this.setState({
                nutrients: {
                    name: this.state.preliminaryInfo.label,
                    id: this.state.preliminaryInfo.foodId,
                    calories: this.state.foodInfo.totalNutrients.ENERC_KCAL.quantity,
                    protein: this.state.foodInfo.totalNutrients.PROCNT.quantity,
                    carbs: this.state.foodInfo.totalNutrients.CHOCDF.quantity,
                    fat: this.state.foodInfo.totalNutrients.FAT.quantity,
                    fiber: this.state.foodInfo.totalNutrients.FIBTG.quantity,
                    sugar: this.state.foodInfo.totalNutrients.SUGAR.quantity,
                    serving: 1,
                    unit: "gram",
                    dataReturned: false
                }
            }, () => {
                this.setState({
                    nutrients: calculateValues(quanity, unit, this.state.nutrients),
                    dataReturned: true
                });
            })
        }else{
            this.setState({
                nutrients: {
                    name: this.state.preliminaryInfo.label,
                    id: this.state.preliminaryInfo.foodId,
                    calories: this.state.foodInfo.totalNutrients.ENERC_KCAL.quantity,
                    protein: this.state.foodInfo.totalNutrients.PROCNT.quantity,
                    carbs: this.state.foodInfo.totalNutrients.CHOCDF.quantity,
                    fat: this.state.foodInfo.totalNutrients.FAT.quantity,
                    fiber: this.state.foodInfo.totalNutrients.FIBTG.quantity,
                    serving: 1,
                    unit: "gram",
                    dataReturned: false
                }
            }, () => {
                this.setState({
                    nutrients: calculateValues(quanity, unit, this.state.nutrients),
                    dataReturned: true
                });
            })
        }
    }

    onClose() {
        this.setState({
            showModal: false,
            initialModalRender: true
        })
    }
    
    render() {
        
        if(this.state.dataReturned){
            return(
                <div className="foodWrapper">
                    <div className="foodHeader">
                        <img className="foodImage" src={this.state.preliminaryInfo.image} alt={this.state.preliminaryInfo.label}/>
                        <div className="title">
                            <h1>{this.state.nutrients.name}</h1>
                        </div>
                    </div>
                    <div className="nutrientWrapper"> 
                        <h2>Calories: <b className="nutrient">{parseFloat(this.state.nutrients.calories).toFixed(2) + " kcal"}</b></h2>
                        <h2>Protein: <b className="nutrient">{parseFloat(this.state.nutrients.protein).toFixed(2) + " g"}</b></h2>
                        <h2>Carbs: <b className="nutrient">{parseFloat(this.state.nutrients.carbs).toFixed(2) + " g"}</b></h2>
                        <h2>Fat: <b className="nutrient">{parseFloat(this.state.nutrients.fat).toFixed(2) + " g"}</b></h2>
                        <h2>Fiber: <b className="nutrient">{parseFloat(this.state.nutrients.fiber).toFixed(2) + " g"}</b></h2>
                        <h2>Sugar: <b className="nutrient">{parseFloat(this.state.nutrients.sugar).toFixed(2) + " g"}</b></h2>
                        <h2>
                            Serving: 
                            <div className="nutrient">
                                <select name="units" id="unitSelect" defaultValue="gram" onChange={e => this.setValues(document.getElementById("qtyInput").value, document.getElementById("unitSelect").value)}>
                                    <option value="gram" >Gram</option>
                                    <option value="ounce">Ounce</option>
                                    <option value="pound">Pound</option>
                                    <option value="kilogram">Kilogram</option>
                                    <option value="pinch">Pinch</option>
                                    <option value="liter">Liter</option>
                                    <option value="fluid ounce">Fluid Ounce</option>
                                    <option value="gallon">Gallon</option>
                                    <option value="pint">Pint</option>
                                    <option value="quart">Quart</option>
                                    <option value="mililiter">Mililiter</option>
                                    <option value="drop">Drop</option>
                                    <option value="cup">Cup</option>
                                    <option value="tablespoon">Tablespoon</option>
                                    <option value="teaspoon">Teaspoon</option>
                                </select>
                                <input className="qtyInput" id="qtyInput" onChange={e => this.setValues(e.target.value, document.getElementById("unitSelect").value)} defaultValue="1"/> 
                            </div>
                        </h2>
                    </div>
                    <div className="addFoodDiv">
                        <button type="submit" className="addFoodBtn" onClick={() => this.setState({showModal: true, modalView: "Meal"})}>Add to meal</button>
                        <button type="submit" className="addFoodBtn" onClick={() => this.setState({showModal: true, modalView: "Inventory"})}>Add to inventory</button>
                    </div>
                    <AddFoodModal modalView={this.state.modalView} onClose={this.onClose} show={this.state.showModal} foodId={this.state.foodInfo.ingredients[0].parsed[0].foodId} nutrients={ this.state.nutrients } userId={this.state.userId} getFoodToAdd={ this.props.getFoodToAdd } initialModalRender={this.state.initialModalRender}/>
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