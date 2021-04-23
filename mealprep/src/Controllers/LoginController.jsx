import React from 'react';
import LoginPage from '../Views/LoginPage.jsx'
import loginUser from '../Models/LoginUser.js'

class LoginController extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            username: "",
            password: ""
        }

        this.isLoggedIn = this.props.isLoggedIn.bind(this);
        this.setAccountStatus = this.props.setAccountStatus.bind(this);
    }

    setUserName = (username) => {
        this.setState({
            username: username
        })
    }

    setPassword = (password) => {
        this.setState({
            password: password
        })
    }

    handleSubmit = async e => {
        e.preventDefault();
        var url = "http://localhost:8080/login?username='" + String(this.state.username) + "'&password='" + String(this.state.password) + "'";
        const token = await loginUser(url);

        if (token["success"] === true) {
            this.isLoggedIn(token);
        }
    }

    render(){

        return(
            <
            LoginPage handleSubmit = { this.handleSubmit }
            setUserName = { this.setUserName }
            setPassword = { this.setPassword }
            setAccountStatus = { this.setAccountStatus }
            />
        )
    }

}

export default LoginController;