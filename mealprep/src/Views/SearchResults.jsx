import React from 'react';
import { forwardRef } from 'react';

import MaterialTable from 'material-table'
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core/styles";
import '../Stylings/SearchResultsStylings.css'

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
import AddIcon from '@material-ui/icons/Add';

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

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#f5f5f5',
      },
      secondary: {
        main: '#4d6f8a',
      },
    },

  });


class SearchResults extends React.Component {
  constructor(props){
      super(props)
      this.wrapper = React.createRef();
      this.state = {
          results: this.props.results
      }
  }

  render(){
    return(
        <div>
            <div className="tableDiv">
                <MuiThemeProvider theme={theme}>
                    <MaterialTable
                        title="Search results: values are out of 100g"
                        icons={tableIcons}
                        options={{
                         
                          headerStyle: { position: 'sticky', top: 0 },
                          maxBodyHeight: 700,
                          
                        }}
                        columns={[
                            { field: 'image', render: rowData => <img src={rowData.image} style={{width: 50, borderRadius: '50%'}}/> },
                            { title: 'Name', field: 'label' },
                            { title: 'Calories', field: 'Calories' },
                            { title: 'Protein (g)', field: 'Protein' },
                            { title: 'Carbs (g)', field: 'Carbs' },
                            { title: 'Fat (g)', field: 'Fat'},
                            { title: 'Fiber (g)', field: 'Fiber'}
                        ]}
                        data={this.state.results}
                        onRowClick={ (evt, rowData) => this.props.retrieveSearchSelections(rowData)}
                    />
                </MuiThemeProvider>
            </div>
        </div>
    ) 
  }

}
export default SearchResults;