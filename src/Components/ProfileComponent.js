import React, { useState } from 'react';
import "../css/profile.css"
import { useHistory} from "react-router-dom";
import UserById from './UserComponent';

function ProfileCard(props){
    const [selectedFile, setSelectedFile] = useState();
    const [fail, setfail] = useState(null)
    const [success, setSuccess] = useState(null)
    const history = useHistory()
    const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
        document.getElementById('profile-pic').src = URL.createObjectURL(event.target.files[0]);
	};
    
    async function updateAvatar(){
        let user = localStorage.getItem('user-info')
        const formData = new FormData()
        formData.append('image', selectedFile);
        formData.append('user', user);
        const imageUrl = `http://127.0.0.1:8000/api/users/avatar`;
        
        let newUser = null
        await fetch(imageUrl, {
            method: 'POST',
            body:  formData,
        }).then((response) => response.json())
        .then((result) => {
            console.log('Success:', result);
            user = JSON.parse(user)
            newUser = <UserById id={user['id']}/>
            setSuccess('Image updated successfully!')
            history.go(0)
        })
        .catch((error) => {
            console.error('Error:', error);
            setfail('Something went wrong!')
        });
    }
    return <div className="profile">
    <div className="profileContainer">
        <div className="profile-picture">
            <div>
                <img id="profile-pic" className="user-picture" src={props.user['profile_photo']}/>
                <div className="file-submit">
                    <label className="selectfile" for="choosefile">Edit profile picture</label>
                    <input id="choosefile" type="file" onChange={changeHandler} name="image"/> 
                    <button className="save-btn" onClick={updateAvatar}>Save</button>
                </div>
            </div>
            <form method="POST">
                <input type="submit" className="deleteavatar" value="Remove Photo"/>
            </form>
            {selectedFile ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
					</p>
				</div>
			) : (
				<p>Select a file to show details</p>
			)}
            {fail ? (
				<div>
					{fail}
				</div>
			) : (
				<p>{success}</p>
			)}
        </div>
        <div className="forms">
            <div className="profileform">
                <p className="form-title">You can edit your personal information.</p>
                <div className="input-field">
                    <label for="login">Login</label>
                    <input id="login" className="inputText" type="text" name="login" value={props.user['login']} required/>
                </div>
                <div className="input-field" >
                    <label for="email">email</label>
                    <input id="email" className="inputText" type="email" name="email" value={props.user['email']} required/>
                </div>
                <div className="input-field">
                    <label for="full_name">Full name</label>
                    <input id="full_name" className="inputText" type="text" name="full_name" value={props.user['full_name']} required/>
                </div>
                <div className="input-field">
                    <label for="role">Role</label>
                    <span id="role" className="inputText">{props.user['role']}</span>
                </div>
                <div className="txt-btn">
                    <button className="save-btn" >Save</button>
                </div>
            </div>
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
