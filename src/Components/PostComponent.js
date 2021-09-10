import '../css/posts.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './LoaderComponent';
import '../css/loader.css';
import Comments from './CommentComponent';
import Like from './LikeComponent';
import CommentLink from './CommentLink';

function PostCard(props) {
  const [user, setUser] = useState(null)
  const [showComments, setshowComments] = useState(false)
  const userUrl = `http://127.0.0.1:8000/api/users/${props.Post.author}`;
  
  useEffect(() => {
    axios.get(userUrl)
        .then(response => {
          setUser(response.data)
        })
  }, [userUrl])
  let comments = null;
  if(showComments){
    comments = <Comments PostId={props.Post.id} user={user}/>
  }
  let content = null;
  if(user){
      content = <div className="Postscontainer">
              <article className="post">
                  <div className="postsheader">
                    <figure className="text-center">
                      <img className="img-responsive" src={user.profile_photo}/>
                      <figcaption className="post-author">{user.login}</figcaption>
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
                          <Like Target="posts" TargetId={props.Post.id}/>
                          <div onClick={() => setshowComments(!showComments)}><CommentLink PostId={props.Post.id}/></div>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                  {comments}
              </article>
          </div>
    }else{
        content = <div className='loader'><Loader/></div>
    }
    return <div>{content}</div>
}

export default PostCard