import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Like from './LikeComponent';
import Menu from './MenuComponent';
import UserProfilePhoto from './UserProfilePhotoComponent';

function CommentReply(props){
    const [showReplies, setShowReplies] = useState(false)
    const [content, setContent] = useState(null)
    const [replies, setReplies] = useState(null)
    const [change, setChange] = useState(true)
    let commentURL = `http://127.0.0.1:8000/api/comments/${props.id}/comment`
    useEffect(()=> {async function f(){
        await 
        axios.get(commentURL)
        .then(response => {
            setReplies(response.data)
        })
    } f()}, [change, commentURL])
    function createReply(){
        if(localStorage.getItem('user-info')){ 
            axios.post(commentURL,
                {content:content, user: localStorage.getItem('user-info')}
            ).then(response => {
                setChange(!change)
            })  
        }else{
            alert('Login or register first!')
        }
    }
    let PageContent = null
    if(showReplies && replies){
        replies.sort(function(a, b) {
            var keyA = a.rating, keyB = b.rating;
            if (keyA < keyB) return 1;
            if (keyA > keyB) return -1;
            return 0;
        });
        PageContent =   <div>
                            <hr/>
                            {replies.map((reply) => 
                                <div key={reply.id} className="reply-comment">
                                    <UserProfilePhoto Author={reply.author}/>
                                    <div className="comment-content">
                                        <div className="w-100">
                                            <div className="comment-date-delete">
                                                <div>
                                                    <i className="comment-date">{new Date(reply.created_at).toUTCString()}</i><br/>
                                                    <span>{reply.content}</span>
                                                </div>
                                                {reply.author.toString() === localStorage.getItem('user-info') ? (
                                                    <Menu Target='comments' id={reply.id} content ={reply.content} change={change} setChange={setChange}/>
                                                ) : (null)}
                                            </div>
                                            <div className="likes-reply">
                                                <Like Target="comments" TargetId={reply.id}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="replies-container">
                                <input type="text" placeholder="type a reply..." onChange={(e) => setContent(e.target.value)}/>
                                <button onClick={createReply} >reply</button>
                            </div>
                        </div>
    }
    return  <div>
                <button className="reply-btn" onClick={() => setShowReplies(!showReplies)}>replies({replies ? (replies.length) : ("...")})</button><br/>
                {PageContent}
            </div>
}

export default CommentReply
