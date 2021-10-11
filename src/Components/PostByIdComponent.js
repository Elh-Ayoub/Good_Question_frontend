import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "../css/postById.css"
import Comments from './CommentComponent'
import { useHistory } from 'react-router'
import Menu from './MenuComponent'
import Like from './LikeComponent'
import { Link } from 'react-router-dom';

function PostyIdCard(props){
    const [user, setUser] = useState(null)
    const [comment, setComment] = useState(null)
    const userUrl = `http://127.0.0.1:8000/api/users/${props.Post.author}`;
    const [fail, setfail] = useState(null)
    const [success, setSuccess] = useState(null)

    useEffect(() => {
        axios.get(userUrl)
            .then(response => {
            setUser(response.data)
            })
    }, [userUrl])
    let author = null
    if(user){
        author = <div>
                    <Link className="login_link" to={`/user/profile/${user.id}`}>
                        <img className="author-img" src={user.profile_photo} />
                        <figcaption className="author-username">{user.login}</figcaption> 
                    </Link>
                </div>
    }
    function createComment(){
        if(localStorage.getItem('user-info')){
            const creatCommentUrl = `http://127.0.0.1:8000/api/posts/${props.Post.id}/comments`;
            axios.post(creatCommentUrl,
                { content: comment, user: localStorage.getItem('user-info') }
            ).then(response => {
                setSuccess(response.data)
                //console.log(response.data)
            })
        }else{
            alert('Login or register first!')
        }
        
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
                    <div className="post-images">
                        {props.Post.images ? (
                            <img className="main-img" src={props.Post.images.split(' ')[0]}/>
                        ) : (null)}
                        <div className="sub-imgs">
                            {props.Post.images && props.Post.images.split(' ')[1] ? (props.Post.images.split(' ').map((image) =>
                                image !== "" ? (
                                    <img className="post-img" src={image} onClick ={() => {document.querySelector(".main-img").src = image;}}/>
                                ) : (null)
                            )) : (null)}
                        </div>
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
                        {user ? (<Comments className="comment-cont" PostId={props.Post.id} user={user} change={success}/>) : (null)}
                         
                    </div>
                    <div className="input-field-comment">
                        <input type="text" id="comment-input" className="comment-input" onChange={(e) => {setComment(e.target.value)}} placeholder="Type a comment..."/>
                        <button className="send-comment" onClick={createComment}>send</button>
                    </div>
                </div>
            </div>
    
}

export default PostyIdCard
