import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ThumbsUp from '../images/thumbs-up.png'
import ThumbsDown from '../images/thumbs-down.png'

function Like(props){
    const LikeUrl = `http://127.0.0.1:8000/api/posts/${props.PostId}/like`;
    const [likes, setLikes] = useState(null)
    useEffect(() => {
        axios.get(LikeUrl)
            .then(response => {
              setLikes(response.data)
            })
      }, [LikeUrl])
      let countLike = 0;
      let countDislike = 0;
      if(likes){
        likes.map((like) =>{
          if(like.type == 'like'){
            countLike++;
          }else{
            countDislike++;
          }
        })
      }
    return <div className="post-likes">
            <button className="like-button like">
                <img className="img-responsive-like" src={ThumbsUp}/><span>Like({countLike})</span>
            </button>
            <button className="like-button dislike">
                <img className="img-responsive-like" src={ThumbsDown}/><span>Disike({countDislike})</span>
            </button>
        </div>
}

export default Like
