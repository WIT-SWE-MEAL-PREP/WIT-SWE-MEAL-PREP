import React from "react";

import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import Modal from '@material-ui/core/Modal';

import '../Stylings/AddMealPlanModal.css'


class AddMealPlanModal extends React.Component {

    constructor(props){
      super(props)
  
      this.state = {
        mealPlanId: 0

      }
    }
    
    render() {
        return (
            <Modal
              open={this.props.show}
              onClose={this.props.onClose}
            >    
              <div className="addMealPlanModal">
                <div className="addMealPlanModal-content">
                  <div className = "modal-header">
                    <h4 className="modal-title">Add New Meal Plan</h4>
                  </div>
                    <div className="modal-body">
                    <label className="mealPlanNameInputLabel" >New Meal Plan Name:</label>
                    <input className="mealPlanNameInput" id="mealPlanNameInput" type="string" placeholder="Meal Plan Name: " required={true} />   
                    </div>
                        <Link to="/mainpage" onClick={ () => this.props.getMealPlanToAdd({mealPlanId: this.state.mealPlanId, mealPlanName: (document.getElementById("mealPlanNameInput") != null) ? document.getElementById("mealPlanNameInput").value : ""})}>
                          <button className="addMealPlanModalButton" >Add To Meal Plan</button> 
                        </Link> 
                      <div className="modal-footer">
                        <button onClick={this.props.onClose} className="button">Close</button>
                      </div>
                </div>
            </div>  
            </Modal>
        )
    }
}

export default withRouter(AddMealPlanModal)