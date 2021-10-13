import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "../css/postById.css"
import Comments from './CommentComponent'
import Menu from './MenuComponent'
import Like from './LikeComponent'
import { Link } from 'react-router-dom';

function PostyIdCard(props){
    const [user, setUser] = useState(null)
    const [comment, setComment] = useState(null)
    const userUrl = `http://127.0.0.1:8000/api/users/${props.Post.author}`;
    const [change, setChange] = useState(true)

    useEffect(() => {async function f(){
        await 
        axios.get(userUrl)
            .then(response => {
            setUser(response.data)
            })
    } f()}, [userUrl])
    let author = null
    if(user){
        author = <div>
                    <Link className="login_link" to={`/user/profile/${user.id}`}>
                        <img className="author-img" src={user.profile_photo} alt="avatar"/>
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
                setChange(!change)
                document.getElementById('comment-input').value = ""
                setComment(null)
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
                        {props.Post.author.toString() === localStorage.getItem('user-info') ? (
                          <Menu Target="posts" id={props.Post.id} content={props.Post.content}/>
                        ) : (null)}       
                    </div>
                    <p className="post-title">{props.Post.title}</p>
                    <div className="post-cont">
                        <p>{props.Post.content}</p>
                    </div>
                    <div className="post-images">
                        {props.Post.images ? (
                            <img className="main-img" src={props.Post.images.split(' ')[0]} alt="main-img"/>
                        ) : (null)}
                        <div className="sub-imgs">
                            {props.Post.images && props.Post.images.split(' ')[1] ? (props.Post.images.split(' ').map((image) =>
                                image !== "" ? (
                                    <img key={image} className="post-img" src={image} onClick ={() => {document.querySelector(".main-img").src = image;}} alt="sec-img"/>
                                ) : (null)
                            )) : (null)}
                        </div>
                    </div>
                    <div className="post-categories">
                        {props.Post.categories.split(',').map((category) =>
                            <div key={category} className="category">{category}</div>
                        )}
                    </div>
                    <Like Target="posts" TargetId={props.Post.id}/>
                </div>
                <hr/>
                <form onSubmit={e => createComment(e.preventDefault())} className="post-comments">
                    <div className="comments-field">
                        {user ? (<Comments className="comment-cont" PostId={props.Post.id} user={user} change={change} setChange={setChange}/>) : (null)}
                         
                    </div>
                    <div className="input-field-comment">
                        <input type="text" id="comment-input" className="comment-input" onChange={(e) => {setComment(e.target.value)}} placeholder="Type a comment..."/>
                        <button className="send-comment">send</button>
                    </div>
                </form>
            </div>
    
}

export default PostyIdCard
