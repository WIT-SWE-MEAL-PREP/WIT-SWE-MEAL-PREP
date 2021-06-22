import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import getUserInventory from '../Models/GetUserInventory.js'

import InventoryPage from '../Views/InventoryPage.jsx';

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import '../Stylings/AppStylings.css'

class InventoryController extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            userId: this.props.userId,
            dataReturned: false,
            inventory: {}
        }
    }

    componentDidMount(){
        this.getInventory()
    }

    getInventory = async e =>{
        var url = "http://localhost:8080/getUserInventory?userId='" + String(this.state.userId) + "'";
        var inventory = await getUserInventory(url);


        this.setState ({
            inventory: inventory,
            dataReturned: true
        })
    }

    handleInputChange = () => {
        this.setState({
            searchQuery: this.search.value
        })
    }
    
    handleSearchSubmit = (search) => {
        this.setState({
            renderSearchPage: true,
            searchQuery: search
        })
    }

    retrieveSearchSelections = (selection) => {
        this.props.getFoodId(selection)
        this.props.history.push("/food")
    }
    

    render(){

        if(this.state.dataReturned){
           return(
            <InventoryPage 
            inventory={this.state.inventory}
            getSearchQuery={this.props.getSearchQuery}
            getFoodId={this.props.getFoodId}
            />
            ) 
        }else{
            return(
                <div style={{
                    height: '100%',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    position: 'relative',
                    paddingTop: '25%',
                    }}>

                    <Loader
                    type="Oval"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    />

                </div>
            )
        }
    }

}

export default InventoryController;