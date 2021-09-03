import React, { useState } from 'react';
import '../css/navmenu.css';
import menuIcon from '../images/menu-icon.png';
import menuIcon2 from '../images/menu-icon2.png';

function Navigation(){
    const [show, setShow] = useState(false);
    let menu;
    if(show){
        menu = 
        <ul className="menu">
            <li className="menu-title" onClick={() => setShow(!show)}><img className="menu-icon"src={menuIcon2} 
                /><p>GoodQuestion</p></li><hr/>
            <li className="menu-element"><a href="">Posts</a></li>
            <li className="menu-element"><a href="">Categories</a></li>
            <li className="menu-element"><a href="">Profile</a></li>
            <li className="menu-element"><a href="">About us</a></li>
        </ul>
    }
    return <div>{menu}
        <img className="menu-icon"src={menuIcon} 
                onClick={() => setShow(!show)}
        />
        </div>
}


export default Navigation