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

import { forwardRef } from 'react';

import Modal from '@material-ui/core/Modal';
import MaterialTable from 'material-table'

import getMeals from '../Models/GetMeal.js'

import '../Stylings/AddMealPlanModal.css'

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
}

class AddMealPlanModal extends React.Component {

    constructor(props){
        super(props)
  
        this.state = {

        }

    }

    getMeals = async e => {

        var url = "http://3.233.98.252:8080/getMeals?userId='" + String(this.props.userId) + "'";
        var returnedResults = await getMeals(url);
    
        if(returnedResults.success) {
    
          this.setState({
            data: returnedResults.success
          })  
        }
        return {}
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
                  <h4 className="modal-title">Add Meals</h4>
                </div>
                    <div className="modal-body"> 
                    <MaterialTable
                    title="My Meals"
                    icons={tableIcons}
                    columns={[
                        { title: 'Name', field: 'Name' },
                        { title: 'Calories', field: 'Calories' },
                        { title: 'Protein (g)', field: 'Protein' },
                        { title: 'Carbs (g)', field: 'Carbs' },
                        { title: 'Total Fat (g)', field: 'Total_Fat'},
                        { title: 'Fiber (g)', field: 'Fiber'},
                        { title: 'Sugar (g)', field: 'Sugar'},
                        ]}
                    data={[
                        { Name: 'Non-Meat', Calories: '6', Protein: '0', Carbs: '0', Total_Fat: '1', Fiber: '0', Sugar: '0' },
                        { Name: 'Snacks', Calories: '600', Protein: '98', Carbs: '102', Total_Fat: '60', Fiber: '90', Sugar: '74' },
                        { Name: 'Other', Calories: '253', Protein: '41', Carbs: '12', Total_Fat: '1', Fiber: '55', Sugar: '46' }
                    ]}
                    actions={[
                        {
                        icon: tableIcons.Edit,
                        tooltip: 'Edit Meal',
                        onClick: (event, rowData) => this.editMeal(rowData.Meal_Id)
                        },
                        rowData => ({
                        icon: tableIcons.Delete,
                        tooltip: 'Delete Meal',
                        onClick: (event, rowData) => this.deleteMeal(rowData.Meal_Id),
                        })
                    ]}
                    options={{
                        actionsColumnIndex: -1
                    }}
                    style={{
                        opacity:1,
                        zIndex:1
                    }}
                    />
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