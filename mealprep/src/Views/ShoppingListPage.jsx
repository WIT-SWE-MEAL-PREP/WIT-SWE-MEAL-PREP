import React from 'react';
import { forwardRef } from 'react';
import { withRouter } from 'react-router-dom';


import FoodSearchController from '../Controllers/FoodSearchController.jsx'
import MaterialTable from 'material-table'

import SearchBar from '../Components/SearchBar.jsx'


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
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

class ShoppingListPage extends React.Component{
  constructor(props){
      super(props)
      this.wrapper = React.createRef();

      this.state = {
        renderSearchPage: false,
        searchQuery: "",
        userId: this.props.userId,
        shoplist: this.props.shoplist
      }
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

  retrieveSearchSelections = (selection) => {

    this.props.getFoodId(selection)
    console.log(this.props.getFoodId(selection))
    this.props.history.push("/food")
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
                  title="Shopping List"
                  icons={tableIcons}
                  columns={[
                      { title: 'Name', field: 'name', cellStyle: { whiteSpace: 'nowrap'}},
                      { title: 'Quantity', field: 'serving' },
                      { title: 'Unit', field: 'unit' },
                  ]}
                  onRowClick={ (evt, rowData) => this.retrieveSearchSelections(rowData)}
                  data={this.state.shoplist}
                  
                  options={{
                    actionsColumnIndex: -1,

                  }}
                  style={{
                    opacity:1,
                    zIndex:1
                  }}
                  
              />
            </div>
        </div>
      )
    }
}

export default withRouter(ShoppingListPage); 
