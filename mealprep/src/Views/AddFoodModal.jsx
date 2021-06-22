import React from "react";
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';


import Modal from '@material-ui/core/Modal';

import getMeals from '../Models/GetMeals.js'
import "../Stylings/AddFoodModalStylings.css"

class AddFoodModal extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      mealId: 0,
      initalRender: this.props.initialModalRender
    }
  }
  
  createOptions = async e => {

    var url = "http://localhost:8080/getMeals?userId='" + String(this.props.userId) + "'";
    var returnedResults = await getMeals(url);

    if(returnedResults.success.length > 0) {

      var options = document.getElementById("mealSelect").options;

      returnedResults.success.forEach(meal => 
        options.add(
        new Option(meal.Name, meal.Meal_Id, false)
      ))

      this.setState({
        initalRender: false
      })

    }
  }

  render() {
    return (
      <div>
        <Modal
          open={this.props.show}
          onClose={this.props.onClose}
          onRendered={this.createOptions}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className="addFoodModal">

            <div className="addFoodModalCentered">
              <h2 className="addFoodModalText">Add To:</h2>
            </div>

            <div>
              <label className="addFoodModalSelectLabel">Meal:</label>
              <select className="addFoodModalSelect" id="mealSelect"  defaultValue="0" onChange={e => this.setState({mealId: e.target.value, initalRender: false})}> 
                <option value="0">New Meal</option>
              </select>

              {(() => {
                if(this.props.show){
                  if(this.state.mealId == 0){
                    return(
                      <div className="mealNameDiv">
                        <label className="mealNameInputLabel" >Meal Name:</label>
                        <input className="mealNameInput" id="mealNameInput" type="string" placeholder="Meal Name" required={true} />   
                      </div>                  
                      )
                  }else{
                    <div className="mealNameDiv" style={{display: "none"}}>
                    <label className="mealNameInputLabel" >Meal Name:</label>
                    <input className="mealNameInput" id="mealNameInput" type="string" placeholder="Meal Name" required={true} />   
                  </div>       
                  }
                }
              })()}
            </div>
            
            <div className="addFoodModalCentered">
            <Link to="/meal" onClick={ () => this.props.getFoodToAdd({foodInfo: this.props.nutrients, mealId: this.state.mealId, mealName: (document.getElementById("mealNameInput") != null) ? document.getElementById("mealNameInput").value : "" })}>
              <button className="addFoodModalButton" >Add To Meal</button>
            </Link>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

export default withRouter(AddFoodModal)