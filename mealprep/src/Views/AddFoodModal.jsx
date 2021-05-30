import React from "react";
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';


import Modal from '@material-ui/core/Modal';

import getMeals from '../Models/GetMeals.js'
import "../Stylings/AddFoodModalStylings.css"

class AddFoodModal extends React.Component {

  componentDidUpdate() {

    if(this.props.show){
      this.createOptions();
    }
  }
  

  createOptions = async e => {
    var url = "http://localhost:8080/getMeals?userId='" + String(this.props.userId) + "'";
    var returnedResults = await getMeals(url);

    if(returnedResults.success.length > 0) {

      var options = document.getElementById("mealSelect").options;

      returnedResults.success.forEach(meal => options.add(
        new Option(meal.Name, meal.Meal_Id, false)
      ))

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
              <select className="addFoodModalSelect" id="mealSelect" onChange={() => console.log(document.getElementById("mealSelect").value)} > 
                <option value="0">New Meal</option>
              </select>
            </div>
            
            <div className="addFoodModalCentered">
            <Link to="/meal" onClick={ () => this.props.getFoodToAdd({foodInfo: this.props.nutrients, mealId: document.getElementById("mealSelect").value })}>
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