import React, { useState, useEffect } from 'react';
import "../css/profile.css"
import Header from '../Components/HeaderComponent';
import Footer from '../Components/FooterComponent';
import ProfileCard from '../Components/ProfileComponent';
import axios from 'axios';

function Profile(){
    const [user, setUser] = useState(null)
    let content = null
    
    let id = localStorage.getItem('user-info')
    const userURL = `http://127.0.0.1:8000/api/users/${id}`;
    useEffect(() => {
        axios.get(userURL)
        .then(response => {
            setUser(response.data)
            console.log(response.data)
        })
    }, [userURL])
    if(user){
        content = <div>
            <Header/>
            <h2 className="page-title">Profile</h2>
            <ProfileCard user={user}/>
            <div className="profile-footer">
                <Footer/>
            </div>
        </div>
    }
    return content
}

export default Profile
