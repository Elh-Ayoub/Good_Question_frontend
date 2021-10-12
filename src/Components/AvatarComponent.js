import React, { useState } from 'react';
import "../css/profile.css"
import { useHistory} from "react-router-dom";
import axios from 'axios';

function Avatar(props){
    const [selectedFile, setSelectedFile] = useState();
    const [fail, setfail] = useState(null)
    const [success, setSuccess] = useState(null)
    const history = useHistory()
    
    const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
        document.getElementById('profile-pic').src = URL.createObjectURL(event.target.files[0]);
	};
    
     function updateAvatar(){
        let user = localStorage.getItem('user-info')
        const formData = new FormData()
        formData.append('image', selectedFile);
        formData.append('user', user);
        const imageUrl = `http://127.0.0.1:8000/api/users/avatar`;
        console.log(formData)
         fetch(imageUrl, {
            method: 'POST',
            body:  formData,
        })
        .then((result) => {
            console.log('Success:', result);
            user = JSON.parse(user)
            setSuccess('Image updated successfully!')
            history.go(0)
        })
        .catch((error) => {
            console.error('Error:', error);
            setfail('Something went wrong!')
            history.go(0)
        });
    }
    function DeleteAvatar(){
        let user = localStorage.getItem('user-info')
        const imageUrl = `http://127.0.0.1:8000/api/users/avatar`;
        axios.delete(imageUrl,
            { data: 
                { user: user }
            })
        .then((result) => {
            console.log('Success:', result);
            setSuccess('Image deleted successfully!')
            history.go(0)
        })
        .catch((error) => {
            console.error('Error:', error);
            setfail('Something went wrong!')
        });
    }
    return  <div className="profile-picture">
                <div>
                    <img id="profile-pic" className="user-picture" src={props.user.profile_photo} alt="Avatar"/>
                    <div className="file-submit">
                        <label className="selectfile" for="choosefile">Edit profile picture</label>
                        <input id="choosefile" type="file" onChange={changeHandler} name="image"/> 
                        <button className="save-btn" onClick={updateAvatar}>Save</button>
                    </div>
                </div>
                <div>
                    <button className="deleteavatar" onClick={DeleteAvatar}>Remove Photo</button>
                </div>
                {selectedFile ? (
                    <div>
                        <p>File name: {selectedFile.name}</p>
                        <p>File type: {selectedFile.type}</p>
                        <p>Size in bytes: {selectedFile.size}</p>
                        <p>
                            Last modified date:{' '}
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
}

export default Avatar
