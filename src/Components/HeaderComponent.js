import React from 'react';
import '../css/header.css';
import logo from '../images/logo.png';
import Navigation from './NavigationComponent';
import { Link, useHistory} from "react-router-dom";

function Header() {
    const history = useHistory()
    function logout(){
        localStorage.removeItem('user-info')
        history.push('/auth/login')
    }
    let rightElement =  <ul className="right-elements">
                            <li className="btn-li"><Link to="/auth/login">Log in</Link></li>
                            <li className="btn-li"><Link to="/auth/register">Register</Link></li>
                        </ul>;
    if(localStorage.getItem('user-info')){
        rightElement = <ul className="right-elements">
                            <li className="btn-li"><Link>Profile</Link></li>
                            <li className="btn-li" onClick={logout}>Logout</li>
                        </ul>
    }
    return <nav className="navbar">
            <ul className="left-elements">
                <li><Navigation/></li>
                <li><img className="logo-icone" src={logo} alt="Logo"/> </li>
                <li className="left-elem"><Link to='/'>Home</Link></li>
                <li className="left-elem"><Link to="/contact-us">Contact us</Link></li>
            </ul>
            {rightElement}
        </nav>
}

export default Header