import React, { useEffect } from 'react';
import "../css/profile.css"
import Header from '../Components/HeaderComponent';
import Footer from '../Components/FooterComponent';
import { useHistory } from "react-router-dom";
import ProfileCard from '../Components/ProfileComponent';

function Profile(){
    const history = useHistory()
    let content = null
    /// if there is no authenticated user
    if(localStorage.getItem("user-info")){
        let user = JSON.parse(localStorage.getItem('user-info'))
        content = <div>
        <Header/>
        <ProfileCard user={user}/>
        <div className="profile-footer">
            <Footer/>
        </div>
       </div>
    }else{
        alert("Log in or register please to access profile!")
        history.goBack()
    }
    return content
}

export default Profile
