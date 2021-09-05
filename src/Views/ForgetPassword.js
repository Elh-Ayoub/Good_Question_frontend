import React from 'react';
import '../css/login.css';
import logo from '../images/logo.png';
import { Link } from "react-router-dom";

function ForgetPassword(){
    return <div>
                <div class="login_container"> 
                    <img className="logo-icon-login" src={logo} alt="Logo"/>
                    <div class="login_container__card">
                        <form>
                            <div className="inputField">
                                <label for="inputEmail">Email</label>
                                <input id="inputEmail" type="email" name="email" placeholder="Input your email..."/>
                            </div>
                            <button className="login_btn" type="submit">Send reset link</button>
                            <div className="inputField">
                                <Link to="/auth/login" className="login_link">Remember password?</Link>
                                <Link to="/auth/register" className="login_link">Not registred yet?</Link>
                            </div>
                        </form>
                    </div>
                </div>
           </div>
}

export default ForgetPassword