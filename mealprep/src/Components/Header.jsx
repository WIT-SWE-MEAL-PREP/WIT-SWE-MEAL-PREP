import React from 'react'
import { withRouter, Link } from 'react-router-dom';
import '../Stylings/HeaderStylings.css'
import { Fade as Hamburger } from 'hamburger-react'

class Header extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props)
        this.state = {
            signedIn: true,
            configured: this.props.configured,
            visible: false
        }
        this.setSignInStatus= this.props.setSignInStatus.bind(this);    
        this.toggleMenu = this.toggleMenu.bind(this)
    }
    
    toggleMenu(){
        this.setState({visible: !this.state.visible})
    }

    render() {
        return(
            <div className="headerWrapper">
                
                <Hamburger direction='right' color='white' onToggle={toggled => {
                    if (toggled) {
                        this.toggleMenu()
                    } else {
                        this.toggleMenu()
                    }
                }} />
                <h1>
                    <Link className="headerText" to="/">Gains Day Preppers</Link>
                </h1>
            {this.state.visible?
            (
                null
            )
            :(
              <ul className="dropdown">
                    <li>
                        <Link to="/" className="menuItem">My Meals</Link>
                    </li>
                    
                    <li>
                        <Link className="menuItem" onClick={() => { this.props.history.push("/configure")}}>Configure </Link>
                    </li>
                    <li>   
                        <Link className="menuItem" onClick={() => { this.props.history.push("/inventory")}}>Inventory </Link>
                    </li>
                    <li>
                        <Link className="menuItem" onClick={() => { this.props.history.push("/shoppinglist")}}>Shopping List </Link>
                    </li>
                    <li>   
                        <Link className="menuItem" onClick={() => { window.location.href="https://github.com/WIT-SWE-MEAL-PREP/WIT-SWE-MEAL-PREP" }}>Repository</Link>
                    </li>
                    <li>
                        <Link className="menuItem" onClick={() => { this.setSignInStatus(false) }}>Sign Out  </Link> 
                    </li>  
              </ul>
            )
        }
            </div>
        )
    }
}   

export default withRouter(Header);