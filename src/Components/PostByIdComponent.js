import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "../css/postById.css"
import Comments from './CommentComponent'

function PostyIdCard(props){
    const [user, setUser] = useState(null)
    const userUrl = `http://127.0.0.1:8000/api/users/${props.Post.author}`;
  
    useEffect(() => {
        axios.get(userUrl)
            .then(response => {
            setUser(response.data)
            })
    }, [userUrl])
    let author = null
    if(user){
        author = <div>
                    <img className="author-img" src={user.profile_photo} />
                    <figcaption className="author-username">{user.login}</figcaption> 
                </div>
    }
    
    return  <div className="postContainer">
                <div className="author-like-categories">
                    <div className="author-field">
                        {author}
                        <span className="created_at">Created at : {new Date(props.Post.created_at).toUTCString()}</span>
                    </div>
                    <p className="post-title">{props.Post.title}</p>
                    <div className="post-cont">
                        <p>{props.Post.content}</p>
                    </div>
                    <div className="post-categories">
                        {props.Post.categories.split(',').map((category) =>
                            <div className="category">{category}</div>
                        )}
                    </div>
                </div>
                <hr/>
                <div className="post-comments">
                    <div className="comments-field">
                        {user ? (<Comments className="comment-cont" PostId={props.Post.id} user={user}/>) : (null)}
                         
                    </div>
                    <div className="input-field-comment">
                        <input type="text" className="comment-input" placeholder="Type a comment..."/>
                        <button className="send-comment">send</button>
                    </div>
                </div>
            </div>
    
}

export default PostyIdCard
