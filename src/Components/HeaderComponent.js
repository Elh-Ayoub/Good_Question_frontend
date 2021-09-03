import React from 'react';
import '../css/header.css';
import logo from '../images/logo.png';
import Navigation from './NavigationComponent';
import { Link } from "react-router-dom";

function Header() {
        return <nav className="navbar">
                <ul className="left-elements">
                    <li><Navigation/></li>
                    <li><img className="logo-icone" src={logo} alt="Logo"/> </li>
                    <li className="left-elem"><Link to='/'>Home</Link></li>
                    <li className="left-elem"><Link to="/contact-us">Contact us</Link></li>
                </ul>
                <ul className="right-elements">
                    <li className="btn-li"><Link to="/auth/login">Log in</Link></li>
                    <li className="btn-li"><Link to="/auth/register">Register</Link></li>
                </ul>
            </nav>
}

export default Header