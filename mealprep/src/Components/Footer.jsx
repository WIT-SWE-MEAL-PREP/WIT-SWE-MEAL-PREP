import React from 'react'
import GitHubLogo from '../Images/GitHub-Mark-64px.png'
import '../Stylings/FooterStylings.css'


class Footer extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            signedIn: true
        }

        this.setSignInStatus= this.props.setSignInStatus.bind(this);
    }

    componentDidMount(){
        console.log(this.setSignInStatus)
    }

    render() {
        return(
            <div className="footerWrapper">
                <div className="textCenter">
                    <div className="centerDiv">
                        <h5>Want to contribute? Check out the repo! </h5>
                    </div>
                    <div className="centerDiv">
                        <a className="ft-social" href="https://github.com/WIT-SWE-MEAL-PREP/WIT-SWE-MEAL-PREP"><img className="imageLink" alt="github" src={GitHubLogo}/></a>
                    </div>
                    <div className="centerDiv buttons">
                        <button className="signoutButton" onClick={() => { this.setSignInStatus(false) }}>Sign Out </button>
                    </div>
                    <div className="centerDiv">
                        <button className="signoutButton">Configure </button>
                    </div>
                </div>
            </div>
        )
    }
}   

export default Footer;