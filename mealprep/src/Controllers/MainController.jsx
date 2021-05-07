import React from 'react';
import MainPage from '../Views/MainPage.jsx'

class MainController extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            username: this.props.username,
            constraints: this.props.constraints
        }
    }

    render() { 

        return(
            <MainPage 
            username={this.state.username} 
            constraints={this.state.constraints}
            getSearchQuery={this.props.getSearchQuery}
            />
            )
    }
}

export default MainController;