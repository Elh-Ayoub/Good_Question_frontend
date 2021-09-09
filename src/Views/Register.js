import React, { useState, useEffect } from 'react';
import '../css/login.css';
import logo from '../images/logo.png';
import { Link } from "react-router-dom";
import Loader from '../Components/LoaderComponent';
import '../css/loader.css';

function Register(){
    const [login, setLogin] = useState(null);
    const [full_name, setFullName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [password_confirmation, setPasswordConfirmation] = useState(null);
    const [fail, setfail] = useState(null)
    const [success, setSuccess] = useState(null)
    const [loader, setLoader] = useState(null)

    async function Submit(){
        let info = {login, full_name, email, password, password_confirmation};
        const registerUrl = `http://127.0.0.1:8000/api/auth/register`;
        setLoader(<Loader/>)
        let result  = await fetch(registerUrl, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            },
            body: JSON.stringify(info)
        })
        result = await result.json()
        let resultArr = JSON.parse(JSON.stringify(result));
        if(resultArr['login'] || resultArr['email'] || resultArr['password']){
            setfail(resultArr['login'] || resultArr['email'] || resultArr['password'])
            setLoader(null)
            setSuccess(null)
        }else{
            setfail(null)
            //localStorage.setItem("user-info", JSON.stringify(result));
            setSuccess('Account created successfully! and an email has been sent to your email!')
            setLoader(null)
        }
    }
    return <div className="auth_container">
                <div class="login_container"> 
                    <img className="logo-icon-login" src={logo} alt="Logo"/>
                    <div class="login_container__card">
                        {fail ? ( <div className="error"><p>{fail}</p></div>
                                ) : (fail)
                                }
                        {success ? ( <div className="success"><p>{success}</p></div>
                                ) : (success)
                        }
                        <div className="loader">{loader}</div>
                        <div className="inputField">
                            <label for="inputLogin">Login</label>
                            <input id="inputLogin" type="text" name="login" onChange={(e) => setLogin(e.target.value)} placeholder="Input your username..."/>
                        </div>
                        <div className="inputField">
                            <label for="inputFullName">Full name</label>
                            <input id="inputFullName" type="text" name="full_name" onChange={(e) => setFullName(e.target.value)} placeholder="Input your username..."/>
                        </div>
                        <div className="inputField">
                            <label for="inputEmail">Email</label>
                            <input id="inputEmail" type="email" name="email" onChange={(e) => setEmail(e.target.value)} placeholder="Input your email..."/>
                        </div>
                        <div className="inputField">
                            <label for="inputPassword">Password</label>
                            <input id="inputPassword" type="password" name="password" onChange={(e) => setPassword(e.target.value)} placeholder="Input your password..."/>
                        </div>
                        <div className="inputField">
                            <label for="inputPassword">Password confirmation</label>
                            <input id="inputPassword" type="password" name="password_confirmation" onChange={(e) => setPasswordConfirmation(e.target.value)} placeholder="confirm your password..."/>
                        </div>
                        <button className="login_btn" onClick={Submit} type="submit">Register</button>
                        <div className="inputField">
                            <Link to="/auth/login" className="login_link">Already have account?</Link>
                            <Link to="/auth/password-reset" className="login_link">Fogot password ?</Link>
                        </div>
                    </div>
                </div>
           </div>
}

export default Register