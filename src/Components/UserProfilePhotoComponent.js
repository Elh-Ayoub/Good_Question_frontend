import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserProfilePhoto(props){
  const AuthorUrl = `http://127.0.0.1:8000/api/users/${props.Author}`;
  const [Author, setAuthor] = useState(null)
  useEffect(() => {
    axios.get(AuthorUrl)
        .then(response => {
          setAuthor(response.data)
        })
  }, [AuthorUrl])
  let profile_photo = null;
  let login = null;
  if(Author){
    profile_photo = Author.profile_photo;
    login = Author.login
  }
  return  <div className="comment-author">
            <img className="comment-author-photo" src={profile_photo} />
            <figcaption className="post-author">{login}</figcaption>
          </div>;
}

export default UserProfilePhoto