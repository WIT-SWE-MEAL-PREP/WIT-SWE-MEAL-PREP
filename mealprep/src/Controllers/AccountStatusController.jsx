import React from 'react';
import LoginController from './LoginController.jsx'
import AccountCreationController from './AccountCreationController.jsx'

class AccountStatusController extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            hasAccount: true
        }

        this.isLoggedIn = this.props.isLoggedIn.bind(this);
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
                isLoggedIn = { this.isLoggedIn }
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