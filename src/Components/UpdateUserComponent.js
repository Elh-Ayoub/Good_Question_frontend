import React, { useState } from 'react';
import "../css/profile.css"
import { useHistory} from "react-router-dom";
import axios from 'axios';

function UpdateUser(props){
    const [login, setLogin] = useState(props.user.login);
    const [email, setEmail] = useState(props.user.email);
    const [full_name, setFullName] = useState(props.user.full_name);
    const [fail, setfail] = useState(null)
    const [success, setSuccess] = useState(null)
    const history = useHistory()
    function Update(){
        const formData = new FormData()
        formData.append('login', login);
        formData.append('email', email);
        formData.append('full_name', full_name);
        const userUrl = `http://127.0.0.1:8000/api/users/${props.user.id}`;
        console.log(formData)
        axios.patch(userUrl,
                { login, full_name, email}
        )
        .then((result) => {
            console.log('Success:', result);
            setSuccess('user updated successfully!')
            history.go(0)
        })
        .catch((error) => {
            console.error('Error:', error);
            setfail('Something went wrong!')
        });
    }
    return  <div className="profileform">
                <p className="form-title">You can edit your personal information.</p>
                <div className="input-field">
                    <label for="login">Login</label>
                    <input id="login" className="inputText" type="text" onChange={(e) => { setLogin(e.target.value)}} value={login}/>
                </div>
                <div className="input-field" >
                    <label for="email">email</label>
                    <input id="email" className="inputText" type="email" onChange={(e) => { setEmail(e.target.value)}} value={email} />
                </div>
                <div className="input-field">
                    <label for="full_name">Full name</label>
                    <input id="full_name" className="inputText" type="text" onChange={(e) => { setFullName(e.target.value)}} value={full_name} />
                </div>
                <div className="input-field">
                    <label for="role">Role</label>
                    <span id="role" className="inputText">{props.user.role}</span>
                </div>
                <div className="txt-btn">
                    <button className="save-btn" onClick={Update}>Save</button>
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

export default UpdateUser
