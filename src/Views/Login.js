import React, { useState, useEffect } from 'react';
import '../css/login.css';
import logo from '../images/logo.png';
import { Link ,useHistory} from "react-router-dom";
import axios from 'axios';
function Login(){
    const [login, setLogin] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [fail, setfail] = useState(null)
    const history = useHistory()
    useEffect(()=>{
            if(localStorage.getItem("user-info")){
                history.push('/');
            }
    }, [])
    async function Submit(){
        let info = {login, email, password};
        const loginUrl = `http://127.0.0.1:8000/api/auth/login`;
        
        let result  = await fetch(loginUrl, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            },
            body: JSON.stringify(info)
        })
        result = await result.json()
        let resultArr = JSON.parse(JSON.stringify(result));
        if(resultArr['error'] || resultArr['message']){
            setfail(resultArr['error'] || resultArr['message'])
        }else{
            setfail(null)
            localStorage.setItem("user-info", JSON.stringify(result));
            history.push('/');
        }
    }
    return <div className="auth_container">
                <div class="login_container"> 
                    <Link to="/"><img className="logo-icon-login" src={logo} alt="Logo"/></Link>
                    <div class="login_container__card">
                    {fail ? ( <div className="error"><p>{fail}</p></div>
                            ) : (fail)
                            }
                            <div className="inputField">
                                <label for="inputLogin">Login</label>
                                <input id="inputLogin" type="text" name="login" onChange={(e) => setLogin(e.target.value)} placeholder="Input your username..."/>
                            </div>
                            <div className="inputField">
                                <label for="inputEmail">Email</label>
                                <input id="inputEmail" type="email" name="email" onChange={(e) => setEmail(e.target.value)} placeholder="Input your email..."/>
                            </div>
                            <div className="inputField">
                                <label for="inputPassword">Password</label>
                                <input id="inputPassword" type="password" name="password" onChange={(e) => setPassword(e.target.value)} placeholder="Input your password..."/>
                            </div>
                            <button className="login_btn" onClick={Submit} type="submit">Log in</button>
                            <div className="inputField">
                                <Link to="/auth/register" className="login_link">Not registed yet?</Link>
                                <Link to="/auth/password-reset" className="login_link">Fogot password ?</Link>
                            </div>
                    </div>
                </div>
           </div>
}

export default Login