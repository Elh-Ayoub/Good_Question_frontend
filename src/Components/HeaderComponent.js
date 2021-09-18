import React, { useState } from 'react';
import '../css/header.css';
import logo from '../images/logo.png';
import Navigation from './NavigationComponent';
import { Link, useHistory} from "react-router-dom";
import axios from 'axios';
import UserProfilePhoto from './UserProfilePhotoComponent';

function Header() {
    const history = useHistory()
    const [user, setAuthor] = useState(null)
    async function logout(){
        const logoutrUrl = `http://127.0.0.1:8000/api/auth/logout`;
        let result = await fetch(logoutrUrl, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            },
        })
        result = await result.json()
        let resultArr = JSON.parse(JSON.stringify(result));
        if(resultArr['success']){
            localStorage.removeItem('user-info')
            history.push('/auth/login')
        }
    }
    let rightElement =  <ul className="right-elements">
                            <li className="btn-li"><Link to="/auth/login">Log in</Link></li>
                            <li className="btn-li"><Link to="/auth/register">Register</Link></li>
                        </ul>;
    if(localStorage.getItem('user-info')){
            rightElement = <ul className="right-elements">
                                <li className=""><Link to="/users/profile" ><UserProfilePhoto Target="profile" Author={localStorage.getItem('user-info')}/></Link></li>
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