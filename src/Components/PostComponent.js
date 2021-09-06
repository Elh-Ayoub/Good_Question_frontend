import '../css/posts.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './LoaderComponent';
import ThumbsUp from '../images/thumbs-up.png'
import userIcone from '../images/user-icon.png'
import ThumbsDown from '../images/thumbs-down.png'
import '../css/loader.css';

function PostCard(props) {
  const [user, setUser] = useState(null)
  const [likes, setLikes] = useState(null)
  const [showComments, setshowComments] = useState(false)
  const userUrl = `http://127.0.0.1:8000/api/users/${props.Post.author}`;
  const LikeUrl = `http://127.0.0.1:8000/api/posts/${props.Post.id}/like`;
  useEffect(() => {
    axios.get(userUrl)
        .then(response => {
          setUser(response.data)
        })
  }, [userUrl])
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
  let comments = null;
  if(showComments){
    comments = <div className="comment-content">
                <div className="comment-author">
                  <img className="comment-author-photo" src={userIcone}/>
                  <figcaption className="post-author">author</figcaption>
                </div> 
                <div>  
                  <span>This is a comment template for {props.Post.title}</span><br/>
                  <i>created_at</i>
                </div>
              </div>
  }
  let content = null;
  if(user){
      content = <div className="Postscontainer">
              <article className="post">
                  <div className="postsheader">
                    <figure className="text-center">
                      <img className="img-responsive" src={user.profile_photo}/>
                      <figcaption className="post-author">{props.Post.author}</figcaption>
                    </figure>
                    <div className="panel panel-default arrow left">
                      <div className="panel-body">
                        <header className="text-left">
                          <div className="title">{props.Post.title}</div>
                          <time className="post-date"><i>Created at: {new Date(props.Post.created_at).toUTCString()}</i></time>
                        </header>
                        <div className="post-content"><p>{props.Post.content}</p></div>
                        <div className="post-categories">
                              {props.Post.categories.split(',').map((category) => 
                                <div className="category">{category}</div>
                              )}
                        </div>
                        <div className="comment-post">
                          <input type="text" placeholder="Type a comment"/>
                          <button className="comment-send">send</button>
                        </div>
                        <div className='likes-comments'>
                          <div className="post-likes">
                              <button className="like-button like">
                                <img className="img-responsive-like" src={ThumbsUp}/><span>Like({countLike})</span>
                              </button>
                              <button className="like-button dislike">
                                <img className="img-responsive-like" src={ThumbsDown}/><span>Disike({countDislike})</span>
                              </button>
                          </div>
                          <div className="comments-collapse">
                              <a href="#" type="button" onClick={() => setshowComments(!showComments)}>Comments(0)</a>
                          </div>
                        </div>          
                        {comments}
                      </div>
                    </div>
                  </div>
              </article>
          </div>
    }else{
        content = <div className='loader'><Loader/></div>
    }
    return <div>{content}</div>
}

export default PostCard