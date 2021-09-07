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
  if(Author){
    profile_photo = Author.profile_photo;
  }
  return <img className="comment-author-photo" src={profile_photo} />;
}

export default UserProfilePhoto