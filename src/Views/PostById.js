import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../Components/HeaderComponent';
import Footer from '../Components/FooterComponent';
import Loader from '../Components/LoaderComponent';
import PostyIdCard from '../Components/PostByIdComponent';
import "../css/postById.css"
import { useParams } from 'react-router';

function PostById(props){
    const { id } = useParams()
    const url = `http://127.0.0.1:8000/api/posts/${id}`;
    const [post, setpost] = useState(null)
    useEffect(() => {
        axios.get(url)
            .then(response => {
                setpost(response.data)
            })
    }, [url])
    let content = null;
    if(post){
        content = <div><PostyIdCard Post={post}/></div>
    }else{
        content = <div className='loader'><Loader/></div>
    }
    return <div>
            <Header/>
                <div className="post-field">{content}</div>
            <Footer/>
        </div>
}

export default PostById