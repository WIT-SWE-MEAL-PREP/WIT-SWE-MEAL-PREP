import React from 'react'
import GitHubLogo from '../Images/GitHub-Mark-64px.png'
import '../Stylings/FooterStylings.css'


class Footer extends React.Component{

    render() {
        return(
            <div className="footerWrapper">
                <div class="ft-social">
                    <ul class="clearfix">		
                    
                        <li><a href="https://github.com/connollyp/WIT-SWE-MEAL-PREP"><img className="imageLink" alt="github" src={GitHubLogo}/></a></li>
                        <li><a href="http://www.instagram.com"><img img className="imageLink" src={GitHubLogo}/></a></li>
                        <li><a href="http://www.twitter.com"><img className="imageLink" src={GitHubLogo} /></a></li>
                        <li><a href="http://www.facebook.com"><img className="imageLink" src={GitHubLogo} /></a></li>
            
                    </ul>
                </div>
            </div>
        )
    }
}   

export default Footer;