import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ThumbsUp from '../images/thumbs-up.png'
import ThumbsUpFilled from '../images/thumbs-up-filled.png'
import ThumbsDown from '../images/thumbs-down.png'
import ThumbsDownFilled from '../images/thumbs-down-filled.png'
import { useHistory } from 'react-router';

function Like(props){
    const LikeUrl = `http://127.0.0.1:8000/api/${props.Target}/${props.TargetId}/like`;
    const [likes, setLikes] = useState(null)
    const [success, setSuccess] = useState(null)
    const history = useHistory()
    useEffect(() => {
        axios.get(LikeUrl)
            .then(response => {
              setLikes(response.data)
            })
      }, [LikeUrl])
      let countLike = 0;
      let countDislike = 0;
      let LikeIcone = ThumbsUp
      let DislikeIcone = ThumbsDown
      if(likes){
        likes.map((like) =>{
          if(like.type == 'like'){
            if(like.author == localStorage.getItem('user-info')){
              LikeIcone = ThumbsUpFilled
            }
            countLike++;
          }else{
            if(like.author == localStorage.getItem('user-info')){
              DislikeIcone = ThumbsDownFilled
            }
            countDislike++;
          }
        })
      }
    function createLike(type){
      if(localStorage.getItem('user-info')){
        axios.post(LikeUrl,
        { type: type, user: localStorage.getItem('user-info') }
        ).then(response => {
          setSuccess(response.data)
          console.log(response.data)
          history.go(0)
        })
      }else{
        alert('Login or register first!')
      }
      
    }
    return <div className="post-likes">
            <button className="like-button like" onClick={() => createLike('like')}>
                <img className="img-responsive-like" src={LikeIcone}/><span>Like({countLike})</span>
            </button>
            <button className="like-button dislike" onClick={() => createLike('dislike')}>
                <img className="img-responsive-like" src={DislikeIcone}/><span>Disike({countDislike})</span>
            </button>
        </div>
}

export default Like
