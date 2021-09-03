import React from 'react';
import Header from '../Components/HeaderComponent'
import '../css/login.css';
import logo from '../images/logo.png';

function Login(){
    return <div>
                <div class="login_container"> 
                    <img className="logo-icon-login" src={logo} alt="Logo"/>
                    <div class="login_container__card">
                        <form>
                            <div className="inputField">
                                <label for="inputLogin">Login</label>
                                <input id="inputLogin" type="text" name="login" placeholder="Input your username..."/>
                            </div>
                            <div className="inputField">
                                <label for="inputEmail">Email</label>
                                <input id="inputEmail" type="email" name="email" placeholder="Input your email..."/>
                            </div>
                            <div className="inputField">
                                <label for="inputPassword">Password</label>
                                <input id="inputPassword" type="password" name="password" placeholder="Input your password..."/>
                            </div>
                            <button className="login_btn" type="submit">Log in</button>
                        </form>
                    </div>
                </div>
           </div>
}

export default Login