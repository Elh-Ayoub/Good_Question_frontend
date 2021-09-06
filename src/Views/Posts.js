import React, { useEffect, useState } from 'react';
import PostCard from '../Components/PostComponent'
import axios from 'axios';
import Loader from '../Components/LoaderComponent';
import '../css/loader.css';

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
        content = posts.map((post) => 
            <div><PostCard Post={post}/></div>
        )
    }else{
        content = <div className='loader'><Loader/></div>
    }
    return <div>
            <div>{content}</div>
        </div>
}

export default Posts