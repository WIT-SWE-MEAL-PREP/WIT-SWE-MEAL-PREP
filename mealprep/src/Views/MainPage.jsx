import React, {useState} from 'react';
import { forwardRef } from 'react';
import { withRouter } from 'react-router-dom';


import FoodSearchController from '../Controllers/FoodSearchController.jsx'
import MaterialTable from 'material-table'

import SearchBar from '../Components/SearchBar.jsx'
import AddMealPlanModal from '../Views/AddMealPlanModal.jsx'

import getMeals from '../Models/GetMeal.js'
import deleteMeal from '../Models/DeleteMeal.js'

import AddMealPlanModal from '../Views/AddMealPlanModal.jsx'

import '../Stylings/MainStylings.css'
import '../Stylings/SearchBarStylings.css'

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
};

const [data1, setData] = ([
  { name: 'Mehmet' },
  { name: 'Zerya Betül' },
]);

class MainPage extends React.Component{
  constructor(props){
      super(props)
      this.wrapper = React.createRef();
      
      this.state = {
        renderSearchPage: false,
        searchQuery: "",
        userId: this.props.userId,
        constraints: this.props.constraints,
        showModal: false,
        initialModalRender: true,
        selectedFoods: [{}]
      }
      
      // this.retrieveSearchSelections = this.retrieveSearchSelections.bind(this)
      
  }
  
  componentDidMount(){
    this.getMeals()
  }

  componentDidMount(){
    this.getMeals()
  }

  handleInputChange = () => {
    this.setState({
      searchQuery: this.search.value
    })
  }

  handleSearchSubmit = (search) => {
    
    this.props.getSearchQuery(search);
    this.props.history.push("/search")
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

  editMeal(mealId){
    this.props.getMealId(mealId);
    this.props.history.push("/meal")
  }

  deleteMeal = async e => {
    var url = "http://3.233.98.252:8080/deleteMeal?mealId='" + String(e) + "'";
    var mealDeleted = await deleteMeal(url);

    if(mealDeleted.success){
      this.getMeals();
    }
  }
  render(){
      return(
        <div className="pageWrapper">

          <div className="wrapper" >
            <SearchBar 
              getSearchQuery={this.props.getSearchQuery}
              handleSearchSubmit={this.handleSearchSubmit} />
          </div>

          <div className="tableDiv">
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
                  data={this.state.data}
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
            <AddMealPlanModal onClose={() => this.setState({showModal: false})} show={this.state.showModal} initialModalRender={this.state.initialModalRender}/>
            <div className="tableDivMealPlans">
            <MaterialTable
                title="My Meal Plan"
                icons={tableIcons}
                columns={([
                  { title: 'Meal Plan Name', field: 'name' }
                ])}
                data1={data1}
                editable={{
                  onRowAdd: newData =>
                    new Promise((resolve, reject) => {
                      setTimeout(() => {
                        setData([...this.data1, newData]);
                        resolve();
                      }, 1000)
                    }),
                  onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                      setTimeout(() => {
                        const dataUpdate = [...this.data1];
                        const index = oldData.tableData.id;
                        dataUpdate[index] = newData;
                        setData([...dataUpdate]);
                        resolve();
                      }, 1000)
                    }),
                  onRowDelete: oldData =>
                    new Promise((resolve, reject) => {
                      setTimeout(() => {
                        const dataDelete = [...this.data1];
                        const index = oldData.tableData.id;
                        dataDelete.splice(index, 1);
                        setData([...dataDelete]);
                        resolve()
                      }, 1000)
                    }),
                }}
             />
            </div>
        </div>
      )
  }
}

export default withRouter(MainPage); 
