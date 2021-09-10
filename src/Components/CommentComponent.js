import React, { useEffect, useState } from 'react';
import axios from 'axios';
import userIcone from '../images/user-icon.png'
import UserProfilePhoto from './UserProfilePhotoComponent';
import Like from './LikeComponent';
function Comments(props){
  const [comments, setComments] = useState(null)
  const CommentsUrl = `http://127.0.0.1:8000/api/posts/${props.PostId}/comments`;
  useEffect(() => {
    axios.get(CommentsUrl)
        .then(response => {
          setComments(response.data)
        })
  }, [CommentsUrl])
  let result = null
  let length = null
  if(comments){
    result =  comments.map((comment) => 
              <div className="comment">
                <div className="comment-author">
                    <UserProfilePhoto Author={comment.author}/>
                    <figcaption className="post-author">{props.user.login}</figcaption>
                </div>
                <div className="comment-content">
                  <div>
                    <i className="comment-date">{new Date(comment.created_at).toUTCString()}</i><br/>
                    <span>{comment.content}</span>
                  </div>
                  <Like Target="comments" TargetId={comment.id}/>
                </div>
                
              </div>)
  }
  return <div className='comments-container'>{result}</div>
}

export default Comments