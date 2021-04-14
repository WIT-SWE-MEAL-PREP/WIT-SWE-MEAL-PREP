import React from 'react'
import GitHubLogo from '../Images/GitHub-Mark-64px.png'
import '../Stylings/FooterStylings.css'


class Footer extends React.Component{

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
                </div>
            </div>
        )
    }
}   

export default Footer;