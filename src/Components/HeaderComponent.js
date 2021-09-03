import React from 'react';
import './css/header.css';
import logo from '../images/logo.png';
import Navigation from './NavigationComponent';

function Header() {
        return <nav className="navbar">
                <ul className="left-elements">
                    <li><Navigation/></li>
                    <li><img className="logo-icone" src={logo} alt="Logo"/> </li>
                    <li className="left-elem"><a href="">Home</a></li>
                    <li className="left-elem"><a href="">Categories</a></li>
                    <li className="left-elem"><a href="">Contact</a></li>
                </ul>
                <ul className="right-elements">
                    <li className="btn-li"><a href="">Log in</a></li>
                    <li className="btn-li"><a href="">Register</a></li>
                </ul>
            </nav>
}

export default Header