import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "../css/postById.css"
import Comments from './CommentComponent'
import { useHistory } from 'react-router'
import Menu from './MenuComponent'
import Like from './LikeComponent'

function PostyIdCard(props){
    const [user, setUser] = useState(null)
    const [comment, setComment] = useState(null)
    const userUrl = `http://127.0.0.1:8000/api/users/${props.Post.author}`;
    const [fail, setfail] = useState(null)
    const [success, setSuccess] = useState(null)
    const history = useHistory()

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
    function createComment(){
        const creatCommentUrl = `http://127.0.0.1:8000/api/posts/${props.Post.id}/comments`;
        axios.post(creatCommentUrl,
            { content: comment, user: localStorage.getItem('user-info') }
        ).then(response => {
            setSuccess(response.data)
            console.log(response.data)
            history.go(0)
        })
    }
    return  <div className="postContainer">
                <div className="author-like-categories">
                    <div className="author-menu">
                        <div className="author-field">
                            {author}
                            <span className="created_at">Created at : {new Date(props.Post.created_at).toUTCString()}</span>
                            
                        </div>
                        {props.Post.author == localStorage.getItem('user-info') ? (
                          <Menu Target="posts" id={props.Post.id} content={props.Post.content}/>
                        ) : (null)}       
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
                    <Like Target="posts" TargetId={props.Post.id}/>
                </div>
                <hr/>
                <div className="post-comments">
                    <div className="comments-field">
                        {user ? (<Comments className="comment-cont" PostId={props.Post.id} user={user}/>) : (null)}
                         
                    </div>
                    <div className="input-field-comment">
                        <input type="text" className="comment-input" onChange={(e) => {setComment(e.target.value)}} placeholder="Type a comment..."/>
                        <button className="send-comment" onClick={createComment}>send</button>
                    </div>
                </div>
            </div>
    
}

export default PostyIdCard
