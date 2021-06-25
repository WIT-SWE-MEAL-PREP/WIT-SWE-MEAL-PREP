import React from 'react'
import '../Stylings/HeaderStylings.css'


class Header extends React.Component{
    render() {
        return(
            <div className="headerWrapper">
                <h1>Gains Day Preppers</h1>
                <a href="/" className="ReturnMain"> ______________________________________________</a>
            </div>
        )
    }
}   

export default Header;