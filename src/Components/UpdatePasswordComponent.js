import React, { useState } from 'react';
import "../css/profile.css"
import { useHistory} from "react-router-dom";
import axios from 'axios';

function UpdatePassword(props){
    const [current_password, setPassword] = useState(null);
    const [password, setNewPassword] = useState(null);
    const [password_confirmation, setNewPasswordConfirmation] = useState(null);
    const [fail, setfail] = useState(null)
    const [success, setSuccess] = useState(null)
    const history = useHistory()

    function Update(){
        const userUrl = `http://127.0.0.1:8000/api/users/${props.user.id}/password`;
        axios.patch(userUrl,
                { current_password, password, password_confirmation}
        )
        .then((result) => {
            console.log('Success:', result.data);
            if(result.data.error){
                setfail(result.data.error)
            }else{
                setSuccess('User password updated successfully!')
            } 
           // history.go(0)
        })
        .catch((error) => {
            console.error('Error:', error);
            setfail('Something went wrong!' + error)
        });
    }

    return  <div className="profileform">
                <p className="form-title">You can edit your password.</p>
                <div className="input-field">
                    <label for="current_password">Current password</label>
                    <input id="current_password" className="inputText" type="password" onChange={(e) => { setPassword(e.target.value)}} required/>
                </div>
                <div className="input-field">
                    <label for="new_password">New password</label>
                    <input id="new_password" className="inputText" type="password" onChange={(e) => { setNewPassword(e.target.value)}} required/>
                </div>
                <div className="input-field">
                    <label for="password_confirmation">Confirm new password</label>
                    <input id="password_confirmation" className="inputText" type="password" onChange={(e) => { setNewPasswordConfirmation(e.target.value)}} required/>
                </div>
                <div className="txt-btn">
                    <button className="save-btn" type="submit" onClick={Update}>Save</button>
                </div>
                {fail ? (
                    <div>
                        {fail}
                    </div>
                ) : (
                    <p>{success}</p>
                )}
            </div>
}

export default UpdatePassword
