import React from 'react';
import LoginPage from '../Views/LoginPage.jsx'
import loginUser from '../Models/LoginUser.js'

class LoginController extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            username: "",
            password: "",
            staySignedIn: false
        }

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

    setStaySignedIn = (status) => {
        this.setState({
            staySignedIn: status
        })     
    }

    handleSubmit = async e => {
        e.preventDefault();
        var url = "http://3.233.98.252:8080/login?username='" + String(this.state.username) + "'&password='" + String(this.state.password) + "'";
        var token = await loginUser(url);

        if (token["loggedIn"] === true) {
            this.props.getUserId(token.userId);
            this.props.setLogInStatus(token, this.state.staySignedIn);
        }
    }

    render(){

        return(
            <
            LoginPage handleSubmit = { this.handleSubmit }
            setUserName = { this.setUserName }
            setPassword = { this.setPassword }
            setAccountStatus = { this.setAccountStatus }
            setStaySignedIn = {this.setStaySignedIn}
            />
        )
    }

}

export default LoginController;