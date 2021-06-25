import React from 'react'
import { withRouter } from 'react-router-dom';
import '../Stylings/FooterStylings.css'


class Footer extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            signedIn: true,
            configured: this.props.configured
        }

        this.setSignInStatus= this.props.setSignInStatus.bind(this);    
    }

    render() {
        return(
            <div className="footerWrapper">
                <div className="textCenter">
                    <div className="centerDiv">
                        <button className="signoutButton" onClick={() => { this.setSignInStatus(false) }}>Sign Out </button>
                    </div>
                    <div className="centerDiv">
                        <button className="signoutButton" onClick={() => { this.props.history.push("/configure")}}>Configure </button>
                    </div>
                    <div className="centerDiv">
                        <button className="signoutButton" onClick={() => { this.props.history.push("/inventory")}}>Inventory</button>
                    </div>
                    <div className="centerDiv">
                        <button className="signoutButton" onClick={() => { window.location.href="https://github.com/WIT-SWE-MEAL-PREP/WIT-SWE-MEAL-PREP" }}>Repository</button>
                    </div>
                </div>
            </div>
        )
    }
}   

export default withRouter(Footer);