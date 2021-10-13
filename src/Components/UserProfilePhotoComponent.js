import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function UserProfilePhoto(props){
  const AuthorUrl = `http://127.0.0.1:8000/api/users/${props.Author}`;
  const [Author, setAuthor] = useState(null)
  useEffect(() => {async function f(){
    await 
    axios.get(AuthorUrl)
        .then(response => {
          setAuthor(response.data)
        })
  } f()}, [AuthorUrl])
  let profile_photo = null;
  let login = null;
  let role = null;
  if(Author){
    profile_photo = Author.profile_photo;
    login = Author.login
    role = Author.role
  }
  if(props.Target === "profile"){
    return  <div className="profile-role">
                <span>Role: {role}</span>
                <div className="profile-btn" >
                  <img src={profile_photo} alt="Avatar"/>{login}
                </div>
            </div>
  }
  return  <div className="comment-author">
            <Link className="login_link" to={`/user/profile/${props.Author}`}>
              <img className="comment-author-photo" src={profile_photo} alt="Avatar"/>
              <figcaption className="post-author">{login}</figcaption>
            </Link>
          </div>;
}

export default UserProfilePhoto