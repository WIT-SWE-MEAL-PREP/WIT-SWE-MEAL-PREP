import React from "react";
import Modal from '@material-ui/core/Modal';

import "../Stylings/AddFoodModalStylings.css"

import getMeals from '../Models/GetMeals.js'

export default class AddFoodModal extends React.Component {

  createOptions = async e => {
    var url = "http://localhost:8080/getMeals?userId='" + String(this.props.userId) + "'";
    var returnedResults = await getMeals(url);

    console.log(returnedResults)

    if(returnedResults.length > 0) {

      var dropdown = document.getElementById("mealSelect");

      for(let i = 1; i < returnedResults.length; i++){
        var meal = document.createElement('option');
        meal.innerHTML = returnedResults[i].Name;
        meal.value = returnedResults[i].Name;
        dropdown.appendChild(meal)
      }
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
          <div className="addMealModal">
            <h2>Add To:</h2>

            <div>
              <label>Meal:</label>
              <select id="mealSelect"> 
                <option value="newMeal">New Meal</option>
                {/*TO-DO Get it to populate meal names as options */}
              </select>
            </div>

            <button>Add</button>
          </div>
        </Modal>
      </div>
    )
  }
}