import React from 'react'
import { Link } from 'react-router-dom';
import '../Stylings/HeaderStylings.css'


class Header extends React.Component{
    render() {
        return(
            <div className="headerWrapper">
                <Link to="/">
                    <h1>Gains Day Preppers</h1>
                </Link>
            </div>
        )
    }
}   

export default Header;