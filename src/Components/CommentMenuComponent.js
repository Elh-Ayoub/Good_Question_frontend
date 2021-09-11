import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';

function CommentMenu(props){
    const [dropdown, setDropdown] = useState(false)
    const [fail, setfail] = useState(null)
    const [success, setSuccess] = useState(null)
    const history = useHistory()
    let deleteURL = `http://127.0.0.1:8000/api/comments/${props.id}`
    function deleteComment(){
        axios.delete(deleteURL)
        .then(response => {
            alert(response.data.success)
            history.go(0)
        })
    }
    if(success){
        alert(success);
    }
    let dropdownMenu = null;
    if(dropdown){
      dropdownMenu = <ul className="comment-menu">
        <li className="comment-menu-element">Edit</li>
        <li className="comment-menu-element" onClick={deleteComment}>Delete</li>
      </ul>
    }

    return  <div className="comment-menu-container">
                <button className="menu-btn" onClick={() => setDropdown(!dropdown)}>...</button>
                {dropdownMenu}
            </div>
}

export default CommentMenu
