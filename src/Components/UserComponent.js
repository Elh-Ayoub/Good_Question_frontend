import React, { useEffect, useState } from 'react';
import "../css/profile.css"
import { Link ,useHistory} from "react-router-dom";
import axios from 'axios';

async function UserById(props){
    const [user, setUser] = useState(null)
    const userURL = `http://127.0.0.1:8000/api/users/${props.id}`;
    
    useEffect(() => {
        axios.get(userURL)
            .then(response => {
                setUser(response.data)
                
            })
    }, [userURL])
    if(user){
        localStorage.removeItem('user-info')
        localStorage.setItem('user-info', user)
        
    }
    return <div>user</div>
}
