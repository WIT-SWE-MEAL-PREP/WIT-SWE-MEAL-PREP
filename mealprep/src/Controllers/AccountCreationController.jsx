import React from 'react';
import CreateAccountPage from '../Views/CreateAccountPage.jsx'
import uploadNewUser from '../Models/UploadNewUser.js'


class AccountCreationController extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            username: "",
            password: "",
            email: ""
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

    setEmail = (email) => {
        this.setState({
            email: email
        })
    }

    handleSubmit = async e => {
        e.preventDefault();
        var url = "http://localhost:8080/uploadNewUser?username='" + String(this.state.username) + "'&password='" + String(this.state.password) + "'&email='" + String(this.state.email) + "'";
        const token = await uploadNewUser(url);

        if (token["success"] === true) {
            this.setAccountStatus(true)
        }
    }

    render(){

        return(
            <
            CreateAccountPage handleSubmit = { this.handleSubmit }
            setEmail = { this.setEmail }
            setUserName = { this.setUserName }
            setPassword = { this.setPassword }
            />
        )
    }

}

export default AccountCreationController;