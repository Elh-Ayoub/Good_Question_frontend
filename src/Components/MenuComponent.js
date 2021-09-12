import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';

function Menu(props){
    const [dropdown, setDropdown] = useState(false)
    const history = useHistory()
    let commentURL = `http://127.0.0.1:8000/api/${props.Target}/${props.id}`
    function deleteComment(){
        axios.delete(commentURL)
        .then(response => {
            alert(response.data.success)
            if(props.Target == 'posts'){
                history.push('/')
            }
            history.go(0)
        })
    }
    let content = null
    function editComment(){
        content = prompt(`Rewrite your ${(props.Target).slice(0, -1)} here please`, props.content);
        if(content){
            axios.patch(commentURL, {content})
            .then(response => {
                alert(response.data.success)
                if(props.Target == 'post'){
                    history.push('/')
                }
                history.go(0)
            })
        }
    }
    
    let dropdownMenu = null;
    if(dropdown){
      dropdownMenu = <ul className="comment-menu">
        <li className="comment-menu-element" onClick={editComment}>Edit</li>
        <li className="comment-menu-element" onClick={deleteComment}>Delete</li>
      </ul>
    }

    return  <div className="comment-menu-container">
                <button className="menu-btn" onClick={() => setDropdown(!dropdown)}>...</button>
                {dropdownMenu}
            </div>
}

export default Menu