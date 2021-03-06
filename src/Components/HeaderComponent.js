import React, { useEffect, useState } from 'react';
import '../css/navmenu.css';
import '../css/header.css';
import logo from '../images/logo.png';
import Navigation from './NavigationComponent';
import { Link, useHistory} from "react-router-dom";
import UserProfilePhoto from './UserProfilePhotoComponent';
import axios from 'axios';

function Header() {
    const history = useHistory()
    const [resaults, setResaults] = useState(null);
    const [users, setUsers] = useState(null);
    const AllUsersURL = `http://127.0.0.1:8000/api/users`
    useEffect(() => { async function f(){
        await axios.get(AllUsersURL)
        .then(response => {
            setUsers(response.data)
        })
    } f()}, [AllUsersURL])
    
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
    function search(value){
        if(value.length > 0){
            value = value.toUpperCase()
            const pages = {'home': <Link to="/">Home</Link>, 'Categories': <Link to="/categories">Categories</Link>,
                            'posts': <Link to="/">Posts</Link>,
                            'login': <Link to="/auth/login">Login</Link>, 'register': <Link to="/auth/register">Register</Link>,
                            'contact-us': <Link to="/contact-us">Contact us</Link>,
                        }
            if(users){
                users.forEach(user => {
                    pages[user.login] = <Link to={`/user/profile/${user.id}`}>{user.login} - profile</Link>
                })
            }
            if(localStorage.getItem('user-info')){
                pages['My posts'] = <Link to={`/users/${localStorage.getItem('user-info')}/myposts`}>My posts</Link>
                pages['profile'] = <Link to="/users/profile">Profile</Link>
                pages['Create post'] = <Link to="/post/create">Create post</Link>
            }
            setResaults(Object.keys(pages).map((key, index) =>
                (key.toUpperCase().indexOf(value) > -1) ? (<li key={key} className="search-res-ele">{pages[key]}</li> ) : (null)
                
            ));
        }else{
            setResaults(null)
        }
    }
    return <nav className="navbar">
            <ul className="left-elements">
                <li><Navigation/></li>
                <li><Link to='/'><img className="logo-icon" src={logo} alt="Logo"/></Link></li>
                <li className="left-elem to-hide"><Link to='/'>Home</Link></li>
                <li className="left-elem to-hide"><Link to="/contact-us">Contact us</Link></li>
                <li className="search-container">
                    <input type="text" className="search-input" onChange={(e) => search(e.target.value)} placeholder="Search ..."/>
                    <div className="search-bar">
                        <ul className="search-res">
                            {resaults}
                        </ul>
                    </div>
                </li>
            </ul>
            {rightElement}
        </nav>
}

export default Header