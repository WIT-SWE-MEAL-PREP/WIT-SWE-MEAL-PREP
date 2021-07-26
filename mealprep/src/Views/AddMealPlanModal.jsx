import React from "react";

import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Modal from '@material-ui/core/Modal';

import '../Stylings/AddMealPlanModal.css'

class AddMealPlanModal extends React.Component {

    constructor(props){
      super(props)
  
      this.state = {
        mealPlanId: 0,
        initalRender: this.props.initialModalRender
      }
    }

    render() {
        return (
            <Modal
              open={this.props.show}
              onClose={this.props.onClose}
              onRendered={this.createOptions}
              aria-labelledby="mealplan-modal-title"
              aria-describedby="mealplan-modal-description"
            >
            <div className="addMealPlanModal">
              <div className="addMealPlanModal-content">
                <div className = "modal-header">
                  <h4 className="modal-title">Add Meal Plan</h4>
                </div>
                  <div className="modal-body"> 
                    {(() => {
                      return(
                        <div className="mealPlanNameDiv">
                          <label className="mealPlanNameLabel" >Enter Meal Plan Name: </label>
                          <input className="mealPlanNameInput" id="mealPlanNameInput" type="string" placeholder="name" required={true} />   
                        </div>    
                      )
                    })()}
                  </div>
                    <div className="modal-footer">
                      <button className="addMealPlanButton" >Add</button>
                      <button onClick={this.props.onClose} className="button">Close</button>
                    </div>
              </div>
            </div>  

            </Modal>
        )
    }
}

export default withRouter(AddMealPlanModal)