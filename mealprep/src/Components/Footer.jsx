import React from 'react'
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

    setConfigStatus(status, shouldRefresh){
        this.props.setConfiguredStatus(status, shouldRefresh);
    }

    // componentDidUpdate(){
    //     if(this.props.shouldRefresh){
    //         this.forceUpdate();
    //     }
    //  }

    render() {
        return(
            <div className="footerWrapper">
                <div className="textCenter">
                    <div className="centerDiv buttons">
                        <button className="signoutButton" onClick={() => { this.setSignInStatus(false) }}>Sign Out </button>
                    </div>
                    <div className="centerDiv">
                        <button className="signoutButton" onClick={() => { this.setConfigStatus(false, true) }}>Configure </button>
                    </div>
                    <div className="centerDiv">
                        <button className="signoutButton" onClick={() => { window.location.href="https://github.com/WIT-SWE-MEAL-PREP/WIT-SWE-MEAL-PREP" }}>Repository</button>
                    </div>
                </div>
            </div>
        )
    }
}   

export default Footer;