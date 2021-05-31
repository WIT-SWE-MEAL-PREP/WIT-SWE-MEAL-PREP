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
      selectedUpdated: this.props.show
    }
  }

  componentDidUpdate() {

    console.log(this.props.show)
    console.log(this.state.selectedUpdated)

    if(this.props.show && this.state.selectedUpdated){
      this.createOptions();
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

      console.log(options);

    }
  }

  render() {
    return (
      <div>
        <Modal
          open={this.props.show}
          onClose={this.props.onClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className="addFoodModal">

            <div className="addFoodModalCentered">
              <h2 className="addFoodModalText">Add To:</h2>
            </div>

            <div>
              <label className="addFoodModalSelectLabel">Meal:</label>
              <select className="addFoodModalSelect" id="mealSelect" onChange={() => this.setState({ mealId: document.getElementById("mealSelect").value, selectedUpdated: true })} defaultValue="0"> 
                <option value="0">New Meal</option>
              </select>

              {(() => {
                      if(this.state.mealId == 0){
                        console.log(this.state.mealId)
                        return(
                          <div className="mealNameDiv">
                            <label className="mealNameInputLabel" >Meal Name:</label>
                            <input className="mealNameInput" id="mealNameInput" type="string" placeholder="Meal Name" required={true} />   
                          </div>                  
                          )
                      }else{
                        return ""
                      }
              })()}
            </div>
            
            <div className="addFoodModalCentered">
            <Link to="/meal" onClick={ () => this.props.getFoodToAdd({foodInfo: this.props.nutrients, mealId: document.getElementById("mealSelect").value, mealName: document.getElementById("mealNameInput").value})}>
              <button className="addFoodModalButton" >Add</button>
            </Link>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

export default withRouter(AddFoodModal)