import '../css/posts.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './LoaderComponent';
import '../css/loader.css';
import Like from './LikeComponent';
import CommentLink from './CommentLink';
import { Link } from 'react-router-dom';

function PostCard(props) {
  const [user, setUser] = useState(null)
  const userUrl = `http://127.0.0.1:8000/api/users/${props.Post.author}`;
  
  useEffect(() => {async function f(){
    await 
    axios.get(userUrl)
      .then(response => {
        setUser(response.data)
      })
  } f()}, [userUrl])
  let content = null;
  if(user){
      content =  <div className="Postscontainer">
            
              <article className="post">
                  <div className="postsheader">
                    <figure className="text-center">
                      <Link className="login_link" to={`/user/profile/${user.id}`}>
                        <img className="img-responsive" src={user.profile_photo} alt="Avatar"/>
                        <figcaption className="post-author">{user.login}</figcaption>
                      </Link>
                    </figure>
                    <div className="panel panel-default arrow left">
                      <div className="panel-body">
                        <Link className="post-link" to={`/posts/${props.Post.id}`}>
                        <header className="text-left">
                          <div className="title">{props.Post.title}</div>
                          <time className="post-date"><i>Created at: {new Date(props.Post.created_at).toUTCString()}</i></time>
                        </header>
                        <div className="post-content"><p>{props.Post.content}</p></div>
                        <div className="sub-imgs-home">
                            {props.Post.images ? (props.Post.images.split(' ').map((image) =>
                                image !== "" ? (
                                    <img key={image} className="post-img-home" src={image} alt="Avatar"/>
                                ) : (null)
                            )) : (null)}
                        </div>
                        <div className="post-categories">
                              {props.Post.categories.split(',').map((category) =>
                                <div key={category} className="category">{category}</div>
                              )}
                        </div>
                        </Link>
                        <div className='likes-comments'>
                          <Like Target="posts" TargetId={props.Post.id}/>
                          <div><CommentLink PostId={props.Post.id}/></div>
                        </div>
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