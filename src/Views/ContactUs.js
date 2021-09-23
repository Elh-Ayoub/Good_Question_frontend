import React, { useState } from 'react';
import Header from '../Components/HeaderComponent';
import Footer from '../Components/FooterComponent';
import { useHistory } from 'react-router';
import "../css/contact-us.css"
import axios from 'axios';

function ContactUs(){
    const [full_name, setFullName] = useState(null)
    const [subject, setSubject] = useState(null)
    const [email, setEmail] = useState(null)
    const [message, setMessage] = useState(null)
    const history = useHistory()
    const url = `http://127.0.0.1:8000/api/email/contact/admin`;
    function sendEmail(){
        if(!full_name || !subject || !email || !message){
            alert("all (*) fields are required!");
        }else{
            axios.post(url, 
                {full_name: full_name, subject: subject, email: email, message: message},
            ).then(Response => {
                console.log(Response.data)
                alert(Response.data.success)
                history.go(0)
            })
        }     
    }
    return <div>
        <Header/>
            <h2 className="page-title">Contact us</h2>
            <div className='contact-us-contaner'>
                <div className="contact-info">
                    <div className="w-70">
                    <h2>Contact info</h2>
                    <div>
                        <p className="contact-field"><span>Email: </span>ayoub1998elh@gmail.com</p>
                        <p className="contact-field"><span>Phone: </span>+380955072544</p>
                        <p className="contact-field"><span>Github: </span><a className="contact-link" href="https://github.com/Elh-Ayoub">Elh Ayoub</a></p>
                        <p className="contact-field"><span>LinkedIn: </span><a className="contact-link" href="https://www.linkedin.com/in/ayoub-el-haddadi-590b99219/">Ayoub El Haddadi</a></p>
                    </div>
                    </div>
                </div>
                <hr/>
                <div className="form-side">
                    <div className="w-70">
                    <div className="form-side-input">
                        <label>Full name<span className="red">*</span></label>
                        <input type="text" placeholder="Input your full name..." onChange={(e) => setFullName(e.target.value)}/>
                    </div>
                    <div className="form-side-input">
                        <label>Subject<span className="red">*</span></label>
                        <input type="text" placeholder="Input message subject..." onChange={(e) => setSubject(e.target.value)}/>
                    </div>
                    <div className="form-side-input">
                        <label>Email<span className="red">*</span></label>
                        <input type="email" placeholder="Input your email..." onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="form-side-input">
                        <label>Message<span className="red">*</span></label>
                        <textarea type="text" placeholder="Input your message content..." onChange={(e) => setMessage(e.target.value)}></textarea>
                    </div>
                    <div className="form-side-input">
                        <button className="send-email-btn" onClick={sendEmail}>Send</button>
                    </div>
                    </div>
                </div>
            </div>
        <Footer/>
        </div>
}

export default ContactUs
