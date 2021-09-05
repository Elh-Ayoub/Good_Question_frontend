import React, { useState } from 'react';
import '../css/navmenu.css';
import menuIcon from '../images/menu-icon.png';
import menuIcon2 from '../images/menu-icon2.png';
import { useTransition, animated } from 'react-spring'

function Navigation(){
    const [showMenu, setShowMenu] = useState(false);

    const transitions = useTransition(showMenu, {
        from:  { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    })
    
    let menu;
    if(showMenu){
        menu = 
        <ul className="menu">
            <li className="menu-title" onClick={() => setShowMenu(!showMenu)}><img className="menu-icon"src={menuIcon2} 
                />GoodQuestion</li><hr/>
            <li className="menu-element"><a href="">Posts</a></li>
            <li className="menu-element"><a href="">Categories</a></li>
            <li className="menu-element"><a href="">Profile</a></li>
            <li className="menu-element"><a href="">About us</a></li>
        </ul>
    }
    
    return <div>{transitions(
            (styles, item) => item && <animated.div style={styles}>{menu}</animated.div>
        )}
        <img className="menu-icon"src={menuIcon} 
                onClick={() => setShowMenu(!showMenu)}
        />
        </div>
}


export default Navigation