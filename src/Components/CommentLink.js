import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CommentLink(props){

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
    result =    <div className="comments-collapse">
                    <div type="button">Comments({comments.length})</div>
                </div>
  }
  return result
}

export default CommentLink