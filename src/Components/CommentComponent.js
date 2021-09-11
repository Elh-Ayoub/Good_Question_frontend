import React, { useEffect, useState } from 'react';
import axios from 'axios';
import userIcone from '../images/user-icon.png'
import UserProfilePhoto from './UserProfilePhotoComponent';
import Like from './LikeComponent';
import CommentMenu from './CommentMenuComponent';

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
  if(comments){
    
    result =  comments.map((comment) => 
              <div className="comment">
                    <UserProfilePhoto Author={comment.author}/>
                <div className="comment-content">
                  <div className="w-100">
                    <div className="comment-date-delete">
                      <div>
                        <i className="comment-date">{new Date(comment.created_at).toUTCString()}</i><br/>
                        <span>{comment.content}</span>
                      </div>             
                      
                    </div>
                    
                    <Like Target="comments" TargetId={comment.id}/>
                    
                  </div>
                  {comment.author == localStorage.getItem('user-info') ? (
                          <CommentMenu id={comment.id}/>
                      ) : (null)}
                </div>
              </div>)
  }
  return <div className='comments-container'>{result}</div>
}

export default Comments