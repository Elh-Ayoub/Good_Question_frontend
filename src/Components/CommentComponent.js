import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserProfilePhoto from './UserProfilePhotoComponent';
import Like from './LikeComponent';
import Menu from './MenuComponent';
import CommentReply from './ReplyComments';

function Comments(props){
  const [comments, setComments] = useState(null)
  const CommentsUrl = `http://127.0.0.1:8000/api/posts/${props.PostId}/comments`;
  
  useEffect(() => {async function f(){
    await 
    axios.get(CommentsUrl)
        .then(response => {
          setComments(response.data)
        })
  } f()}, [props.change, CommentsUrl])
  let result = null
  
  if(comments){
    comments.sort(function(a, b) {
      var keyA = a.rating, keyB = b.rating;
      if (keyA < keyB) return 1;
      if (keyA > keyB) return -1;
      return 0;
    });
    result =  comments.map((comment) => 
              <div key={comment.id} className="comment">
                    <UserProfilePhoto Author={comment.author}/>
                <div className="comment-content">
                  <div className="w-100">
                    <div className="comment-date-delete">
                      <div>
                        <i className="comment-date">{new Date(comment.created_at).toUTCString()}</i><br/>
                        <span>{comment.content}</span>
                      </div>
                    </div>
                    <div className="likes-reply">
                      <Like Target="comments" TargetId={comment.id}/>
                    </div><CommentReply id={comment.id}/>
                  </div>
                  {comment.author.toString() === localStorage.getItem('user-info') ? (
                          <Menu Target='comments' id={comment.id} content ={comment.content} setChange={props.setChange} change={props.change}/>
                      ) : (null)}
                </div>
              </div>)
              
  }
  return <div className='comments-container'>{result}</div>
}

export default Comments