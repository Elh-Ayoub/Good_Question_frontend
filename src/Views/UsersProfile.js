import React, { useState, useEffect } from 'react';
import "../css/profile.css"
import Header from '../Components/HeaderComponent';
import Footer from '../Components/FooterComponent';
import { useHistory } from "react-router-dom";
import UserProfileCard from '../Components/UserProfileComponent';
import axios from 'axios';
import { useParams } from 'react-router';
import Loader from '../Components/LoaderComponent';

function UserProfile(props){
    const [user, setUser] = useState(null)
    const history = useHistory()
    let content = <div><Header/><div className="loader"><Loader/></div><Footer/></div>
    const { id } = useParams();
    if(localStorage.getItem('user-info') && id === localStorage.getItem('user-info')){
        history.push('/users/profile')
    }
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
            <h2 className="page-title">{user.login} profile</h2>
            <UserProfileCard user={user}/>
            <div className="profile-footer">
                <Footer/>
            </div>
        </div>
    }
    return content
}

export default UserProfile
