import React from 'react';
import "../css/profile.css"
import Avatar from './AvatarComponent';
import UpdateUser from './UpdateUserComponent';

function ProfileCard(props){
    
    return <div className="profile">
    <div className="profileContainer">
        <Avatar user={props.user}/>
        <div className="forms">
            <UpdateUser user={props.user}/>
            <div className="profileform">
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
            </div>
        </div>
    </div>
    </div>
}

export default ProfileCard
