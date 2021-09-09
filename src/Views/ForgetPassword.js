import React, { useState, useEffect } from 'react';
import '../css/login.css';
import logo from '../images/logo.png';
import { Link, useHistory } from "react-router-dom";
import Loader from '../Components/LoaderComponent';
import '../css/loader.css';

function ForgetPassword(){
    const [email, setEmail] = useState(null);
    const [loader, setLoader] = useState(null);
    const [fail, setfail] = useState(null)
    const [success, setSuccess] = useState(null)
    const history = useHistory()
    useEffect(()=>{
        if(localStorage.getItem("user-info")){
            history.push('/');
        }
    }, [])

    async function SendResetLink(){
        let info = { email };
        const resetUrl = `http://127.0.0.1:8000/api/auth/password-reset`;
        setLoader(<Loader/>)
        let result  = await fetch(resetUrl, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            },
            body: JSON.stringify(info)
        })
        result = await result.json()
        let resultArr = JSON.parse(JSON.stringify(result));
        if(resultArr['success']){
            setLoader(null)
            setfail(null)
            setSuccess(resultArr['success'])
        }else if(resultArr['fail']){
            setLoader(null)
            setfail(resultArr['fail'])
            setSuccess(null)
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
                            <label for="inputEmail">Email</label>
                            <input id="inputEmail" type="email"  onChange={(e) => setEmail(e.target.value)} name="email" placeholder="Input your email..."/>
                        </div>
                        <button className="login_btn" onClick={SendResetLink}>Send reset link</button>
                        <div className="inputField">
                            <Link to="/auth/login" className="login_link">Remember password?</Link>
                            <Link to="/auth/register" className="login_link">Not registred yet?</Link>
                        </div>
                    </div>
                </div>
           </div>
}

export default ForgetPassword