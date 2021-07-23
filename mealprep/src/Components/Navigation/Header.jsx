import React from 'react'
import { withRouter } from 'react-router-dom';
import '../../Stylings/HeaderStylings.css'
import { Divide as Hamburger } from 'hamburger-react'

class Header extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            signedIn: true,
            configured: this.props.configured,
            visible: false
        }
        this.setSignInStatus= this.setSignInStatus.bind(this);    
        this.toggleMenu = this.toggleMenu.bind(this)
    }
    
    toggleMenu(){
        this.setState({visible: !this.state.visible})
    }

    setSignInStatus(){
        this.setState({signedIn: !this.state.signedIn})
    }

    render() {
        return(
            <div className="headerWrapper">
                <Hamburger rounded onToggle={toggled => {
                    if (toggled) {
                        this.toggleMenu()
                        console.log(this.state.visible)
                    } else {
                        this.toggleMenu()
                        console.log(this.state.visible)
                    }
                }} />
            {this.state.visible?
            (
              <div className="menu">
                <button onClick={() => { this.setSignInStatus() }}>Sign Out  </button>
                <button onClick={() => { this.props.history.push("/configure")}}>Configure </button>
                <button onClick={() => { this.props.history.push("/inventory")}}>Inventory </button>
                <button onClick={() => { window.location.href="https://github.com/WIT-SWE-MEAL-PREP/WIT-SWE-MEAL-PREP" }}>Repository</button>
              </div>
            )
            :(
              null
            )
        }
            </div>
        )
    }
}   

export default withRouter(Header);