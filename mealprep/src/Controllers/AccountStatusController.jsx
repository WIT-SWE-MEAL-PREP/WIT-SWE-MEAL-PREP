import React from 'react';
import LoginController from './LoginController.jsx'
import AccountCreationController from './AccountCreationController.jsx'

class AccountStatusController extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            hasAccount: true,
            staySignedIn: false
        }
        
        this.getUsername = this.props.getUsername.bind(this);
    }

    setAccountStatus = (val) => {
        this.setState({
            hasAccount: val
        })
    }

    render(){
        if(this.state.hasAccount){
            return(
                <
                LoginController 
                setAccountStatus = { this.setAccountStatus }
                setLogInStatus = { this.props.setLogInStatus }
                getUsername = { this.getUsername }
                />
            )
        }else {
            return(
                <
                AccountCreationController 
                setAccountStatus = { this.setAccountStatus }
                />
            )
        }

    }
}

export default AccountStatusController