import React, { useState } from 'react';
import '../css/navmenu.css';
import '../css/header.css';
import menuIcon from '../images/menu-icon.png';
import menuIcon2 from '../images/menu-icon2.png';
import { useTransition, animated } from 'react-spring'
import { Link, useHistory } from 'react-router-dom';

function Navigation(){
    const [showMenu, setShowMenu] = useState(false);
    const history = useHistory();
    const transitions = useTransition(showMenu, {
        from:  { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    })
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
    let menu;
    if(showMenu){
        menu = 
        <ul className="menu">
            <li className="menu-title" onClick={() => setShowMenu(!showMenu)}><img className="menu-icon"src={menuIcon2} alt="menu"
                />GoodQuestion</li><hr/>
            <li className="menu-element"><Link className="menu-link" to="/">Posts</Link></li>
            <li className="menu-element"><Link className="menu-link" to="/categories">Categories</Link></li>
            {localStorage.getItem('user-info') ? (<li className="menu-element"><Link className="menu-link" to={`/users/${localStorage.getItem('user-info')}/myposts`}>My posts</Link></li>) : (null)}
            {localStorage.getItem('user-info') ? (<li className="menu-element right-elements-navbar"><Link to="/users/profile" className="menu-link">Profile</Link></li>): 
                    (<li className="menu-element right-elements-navbar"><Link to="/auth/login" className="menu-link">Login</Link></li>)}
            {localStorage.getItem('user-info') ? (<li className="menu-element right-elements-navbar" onClick={logout}><span className="menu-link">Logout</span></li>):
                    (<li className="menu-element right-elements-navbar"><Link to="/auth/register" className="menu-link">Register</Link></li>)}
        </ul>
    }
    
    return <div>{transitions(
            (styles, item) => item && <animated.div style={styles}>{menu}</animated.div>
        )}
        <img className="menu-icon"src={menuIcon} alt="menu"
                onClick={() => setShowMenu(!showMenu)}
        />
        </div>
}


export default Navigation