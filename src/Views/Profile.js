import React, { useState, useEffect } from 'react';
import "../css/profile.css"
import Header from '../Components/HeaderComponent';
import Footer from '../Components/FooterComponent';
import { useHistory } from "react-router-dom";
import ProfileCard from '../Components/ProfileComponent';
import axios from 'axios';

function Profile(){
    const [user, setUser] = useState(null)
    const history = useHistory()
    let content = null
    
    let id = localStorage.getItem('user-info')
    const userURL = `http://127.0.0.1:8000/api/users/${id}`;
    useEffect(() => {
        axios.get(userURL)
        .then(response => {
            setUser(response.data)
            console.log(response.data)
        })
    }, [])
    if(user){
        content = <div>
            <Header/>
            <ProfileCard user={user}/>
            <div className="profile-footer">
                <Footer/>
            </div>
        </div>
    }
    // else{
    //     alert("Log in or register please to access profile!")
    //     history.goBack()
    // }
        
    return content
}

export default Profile
