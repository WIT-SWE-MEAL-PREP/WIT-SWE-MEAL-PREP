import React from 'react'
import { withRouter } from 'react-router-dom';

class Ingrediant extends React.Component{
    constructor(props){
      super(props)

      this.state = {
        ingredientInfo: this.props.foodInfo
      }
    }

    
    render() {
        return(
            <div className="ingredientDiv" key={this.state.ingredientInfo.Food_Id}>
                <h3 className="ingredientTitle" onClick={() => { this.props.routeToFood(this.state.ingredientInfo) }}>
                    <u className="ingredientTitle">{this.state.ingredientInfo.foodInfo.name}</u>
                </h3>
                <h4 id={"calories_" + this.state.ingredientInfo.Food_Id} className="nutrientLabel">Calories: <b className="nutrient">{parseFloat(this.state.ingredientInfo.foodInfo.calories).toFixed(2) + " kcal"}</b></h4>
                <h4 id={"protein_" + this.state.ingredientInfo.Food_Id} className="nutrientLabel">Protein: <b className="nutrient">{parseFloat(this.state.ingredientInfo.foodInfo.protein).toFixed(2) + " g"}</b></h4>
                <h4 id={"carbs_" + this.state.ingredientInfo.Food_Id} className="nutrientLabel">Carbs: <b className="nutrient">{parseFloat(this.state.ingredientInfo.foodInfo.carbs).toFixed(2) + " g"}</b></h4>
                <h4 id={"fat_" + this.state.ingredientInfo.Food_Id} className="nutrientLabel">Fat: <b className="nutrient">{parseFloat(this.state.ingredientInfo.foodInfo.fat).toFixed(2) + " g"}</b></h4>
                <h4 id={"serving_" + this.state.ingredientInfo.Food_Id} className="nutrientLabel">Serving: <b className="nutrient">{this.state.ingredientInfo.foodInfo.serving + " " + this.state.ingredientInfo.foodInfo.unit + "(s)"}</b></h4>
                <div className="backToMainDiv">
                    <button type="submit" className="backToMainBtn" onClick={() => this.props.removeFood(this.state.ingredientInfo)}>Remove</button>
                </div>
            </div>
        )
    }
}   

export default withRouter(Ingrediant);