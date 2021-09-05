import React from 'react';
import '../css/login.css';
import logo from '../images/logo.png';
import { Link } from "react-router-dom";

function Register(){
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
                                <label for="inputFullName">Full name</label>
                                <input id="inputFullName" type="text" name="full_name" placeholder="Input your username..."/>
                            </div>
                            <div className="inputField">
                                <label for="inputEmail">Email</label>
                                <input id="inputEmail" type="email" name="email" placeholder="Input your email..."/>
                            </div>
                            <div className="inputField">
                                <label for="inputPassword">Password</label>
                                <input id="inputPassword" type="password" name="password" placeholder="Input your password..."/>
                            </div>
                            <div className="inputField">
                                <label for="inputPassword">Password confirmation</label>
                                <input id="inputPassword" type="password" name="password_confirmation" placeholder="confirm your password..."/>
                            </div>
                            <button className="login_btn" type="submit">Register</button>
                            <div className="inputField">
                                <Link to="/auth/login" className="login_link">Already have account?</Link>
                                <Link to="/auth/password-reset" className="login_link">Fogot password ?</Link>
                            </div>
                        </form>
                    </div>
                </div>
           </div>
}

export default Register