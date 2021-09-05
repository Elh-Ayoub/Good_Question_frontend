import React, { useEffect, useState } from 'react';
import Header from '../Components/HeaderComponent'
import Footer from '../Components/FooterComponent'
import PostCard from '../Components/PostComponent'
import axios from 'axios';

function Posts(){
    const [posts, setPosts] = useState(null)
    const url = 'http://127.0.0.1:8000/api/posts';

    useEffect(() => {
        axios.get(url)
            .then(response => {
                setPosts(response.data)
            })
    }, [url])
    let content = null;
    if(posts){
        content = posts.map((post, ind) => 
            <div><PostCard Post={post}/></div>
        )
    }else{
        content = <p>Something went wrong!!</p>
    }
    return <div>
            <div>{content}</div>
        </div>
}

export default Posts