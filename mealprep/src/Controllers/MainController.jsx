import React from 'react';
import MainPage from '../Views/MainPage.jsx'

class MainController extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            userId: this.props.userId,
            constraints: this.props.constraints
        }
    }

    render() { 

        return(
            <MainPage 
            userId={this.state.userId} 
            constraints={this.state.constraints}
            getSearchQuery={this.props.getSearchQuery}
            getFoodId={this.props.getFoodId}
            getMealId={this.props.getMealId}
            />
            )
    }
}

export default MainController;