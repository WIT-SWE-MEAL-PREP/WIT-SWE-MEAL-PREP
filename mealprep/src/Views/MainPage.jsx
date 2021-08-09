import React from 'react';
import { forwardRef } from 'react';
import { withRouter } from 'react-router-dom';

import MaterialTable from 'material-table'

import SearchBar from '../Components/SearchBar.jsx'

import formatMealsToIds from '../Services/FormatMealsToIds.jsx'

import getMeals from '../Models/GetMeal.js'
import deleteMeal from '../Models/DeleteMeal.js'
import getConfig from '../Models/GetConfig.js';

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

class MainPage extends React.Component{
  constructor(props){
      super(props)
      this.wrapper = React.createRef();
    
      this.state = {
        renderSearchPage: false,
        searchQuery: "",
        userId: this.props.userId,
        selectedFoods: [{}],
        mealPlan: [{}],
        meals: [{}],
        mealCombinations: [],
        configuration: {},
        validMealPlans: [],
        selectedMealPlan: []
      }      

      this.combinationUtil = this.combinationUtil.bind(this);
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
        meals: returnedResults.success
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

  generateMealPlans = async e => {
    var url = "http://3.233.98.252:8080/getConfig?userId='" + String(this.state.userId) + "'";
    var configData = await getConfig(url);

    this.setState({
      configuration: configData.configData[0]
    })

    let numMeals = this.state.configuration.Num_Meals;

    var constraintCal = this.state.configuration.Calories;
    var constraintProtein = this.state.configuration.Protein;
    var constraintCarbs = this.state.configuration.Carbs;
    var constraintFat = this.state.configuration.Fat;
    var constraintSugar = this.state.configuration.Sugar;
    var constraintFiber = this.state.configuration.Fiber;

    let dummyArray = [];

    this.combinationUtil(formatMealsToIds(this.state.meals), dummyArray, 0, this.state.meals.length-1, 0, numMeals);

    let unfilteredMealPlans = this.state.mealCombinations;

    let meals = {}

    for(let i = 0; i < this.state.meals.length; i++ ){
      meals[this.state.meals[i]["Meal_Id"]] = this.state.meals[i]
    }

    for(let i = 0; i < unfilteredMealPlans.length; i++){
      let calories = 0;
      let protein = 0;
      let carbs = 0;
      let fat = 0;
      let sugar = 0;
      let fiber = 0;

      for(let j = 0; j < numMeals; j ++){
        calories += meals[unfilteredMealPlans[i][j]]["Calories"];
        protein += meals[unfilteredMealPlans[i][j]]["Protein"];
        carbs += meals[unfilteredMealPlans[i][j]]["Carbs"];
        fat += meals[unfilteredMealPlans[i][j]]["Total_Fat"];
        sugar += meals[unfilteredMealPlans[i][j]]["Sugar"];
        fiber += meals[unfilteredMealPlans[i][j]]["Fibar"];
      }

      if(calories <= constraintCal && protein <= constraintProtein && carbs <= constraintCarbs && fat <= constraintFat){
        
        this.setState({
          validMealPlans: this.state.validMealPlans.concat([unfilteredMealPlans[i]])
        })
      }

    }

    let selectedPlan = this.state.validMealPlans[Math.floor(Math.random() * (this.state.validMealPlans.length - 0) + 0)];

    console.log(selectedPlan)
    console.log(meals)
    console.log(this.state.meals);

    let mealPlanToDisplay = [];

    for(let i = 0; i < numMeals; i++){
      mealPlanToDisplay[i] = meals[selectedPlan[i]]
    }

    console.log(mealPlanToDisplay)

    this.setState({
      selectedMealPlan: mealPlanToDisplay
    })

  }

  // Based on code from https://www.geeksforgeeks.org/print-all-possible-combinations-of-r-elements-in-a-given-array-of-size-n/

  combinationUtil(meals, generatedMealPlan, start, end, index, numMeals){

      // Current combination is ready to be printed, print it
      if (index == numMeals)
      {
          this.setState({
            mealCombinations: this.state.mealCombinations.concat([generatedMealPlan.slice(0,numMeals)])
          })
      }
       
      // replace index with all possible elements. The condition
      // "end-i+1 >= r-index" makes sure that including one element
      // at index will make a combination with remaining elements
      // at remaining positions
      for (let i=start; i<=end && end-i+1 >= numMeals-index; i++)
      {
        generatedMealPlan[index] = meals[i];
        this.combinationUtil(meals, generatedMealPlan, i+1, end, index+1, numMeals);
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
                  data={this.state.meals}
                  actions={[
                    {
                      icon: tableIcons.Edit,
                      tooltip: 'Edit Meal',
                      onClick: (event, rowData) => this.editMeal(rowData.Meal_Id)
                    },
                    rowData => ({
                      icon: tableIcons.Delete,
                      tooltip: 'Delete Meal',
                      onClick: (event, rowData) => this.deleteMeal(rowData.Meal_Id)
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
              <div className="tableDiv">
                <MaterialTable
                title="My Meal Plans"
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
                data={this.state.selectedMealPlan}
                actions={[
                  {
                    icon: tableIcons.Add,
                    tooltip: 'Generate Meal Plan',
                    isFreeAction: true,
                    onClick: (event) => this.generateMealPlans()
                  }
                ]}
              />
              </div>
        </div>
      )
  }
}

export default withRouter(MainPage); 
