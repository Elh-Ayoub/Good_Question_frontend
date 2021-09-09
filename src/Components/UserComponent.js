import React, { useEffect, useState } from 'react';
import "../css/profile.css"
import { Link ,useHistory} from "react-router-dom";
import axios from 'axios';

function UserById(props){
    const [user, setUser] = useState()
    const userURL = `http://127.0.0.1:8000/api/users/${props.id}`;
    console.log('from UserById: ' + props.id)
    useEffect(() => {
        axios.get(userURL)
            .then(response => {
                setUser(response.data)
                
            })
    }, [userURL])
    if(user){
        localStorage.removeItem('user-info')
        localStorage.setItem('user-info', user)
        return user
    }
}

export default UserById
