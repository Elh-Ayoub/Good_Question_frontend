import React from 'react';
import Posts from '../Views/Posts'
import Header from '../Components/HeaderComponent';
import Footer from '../Components/FooterComponent';
import userIcon from "../images/user-icon.png"
import UserProfilePhoto from '../Components/UserProfilePhotoComponent';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

function Home(){
    let avatar = null
    const history = useHistory()
    if(localStorage.getItem('user-info')){
        avatar = <UserProfilePhoto Author={localStorage.getItem('user-info')}/>
    }else{
        avatar= <img className="img-responsive" src={userIcon} alt="avatar"/>
    }
    function createPost(){
        if(localStorage.getItem('user-info')){
            history.push('post/create')
        }else{
            alert('Login or register first!')
        }
    }
    return <div>
        <Header/>
            <div className="toCreatePost">
                <Link to="users/profile">{avatar}</Link>
                <span onClick={createPost}>What's in your mind? a goodquestion?</span>
            </div>
            <Posts/>
        <Footer/>
        </div>
}

export default Home
