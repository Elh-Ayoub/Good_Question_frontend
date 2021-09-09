import React, { useEffect } from 'react';
import "../css/profile.css"
import Header from '../Components/HeaderComponent';
import Footer from '../Components/FooterComponent';
import { Link ,useHistory} from "react-router-dom";

function Profie(){
    const history = useHistory()
    let content = null
    /// if there is no authenticated user
    if(localStorage.getItem("user-info")){
        let user = JSON.parse(localStorage.getItem('user-info'))
        content = <div>
        <Header/>
        <div className="profile">
        <div className="profileContainer">
            <div className="profile-picture">
                <form  method="POST">
                    <img id="profile-pic" className="user-picture" src={user['profile_photo']}/>
                    <div className="file-submit">
                        <label className="selectfile" for="choosefile">Edit profile picture</label>
                        <input id="choosefile" type="file" name="image"/> 
                        <input className="save-btn"type="submit" value="save"/>
                    </div>
                </form>
                <form method="POST">
                    <input type="submit" className="deleteavatar" value="Remove Photo"/>
                </form>
            </div>
            <div className="forms">
                <form className="profileform">
                    <p className="form-title">You can edit your personal information.</p>
                    <div className="input-field">
                        <label for="login">Login</label>
                        <input id="login" className="inputText" type="text" name="login" value={user['login']} required/>
                    </div>
                    <div className="input-field" >
                        <label for="email">email</label>
                        <input id="email" className="inputText" type="email" name="email" value={user['email']} required/>
                    </div>
                    <div className="input-field">
                        <label for="full_name">Full name</label>
                        <input id="full_name" className="inputText" type="text" name="full_name" value={user['full_name']} required/>
                    </div>
                    <div className="input-field">
                        <label for="role">Role</label>
                        <span id="role" className="inputText">{user['role']}</span>
                    </div>
                    <div className="txt-btn">
                        <button className="save-btn" type="submit">Save</button>
                    </div>
                </form>
                <form className="profileform">
                    <p className="form-title">You can edit your password.</p>
                    <div className="input-field">
                        <label for="current_password">Current password</label>
                        <input id="current_password" className="inputText" type="password" name="current_password" required/>
                    </div>
                    <div className="input-field">
                        <label for="new_password">New password</label>
                        <input id="new_password" className="inputText" type="password" name="password" required/>
                    </div>
                    <div className="input-field">
                        <label for="password_confirmation">Confirm new password</label>
                        <input id="password_confirmation" className="inputText" type="password" name="password_confirmation" required/>
                    </div>
                    <div className="txt-btn">
                        <button className="save-btn" type="submit">Save</button>
                    </div>
                </form>
            </div>
        </div>
        </div>
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

export default Profie
