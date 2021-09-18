import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../Components/HeaderComponent';
import Footer from '../Components/FooterComponent';
import Loader from '../Components/LoaderComponent';
import PostCard from '../Components/PostComponent';
import { useParams } from 'react-router';

function PostsByCategories(props){
    const { id } = useParams()
    const url = `http://127.0.0.1:8000/api/categories/${id}/posts`;
    const [posts, setposts] = useState(null)
    useEffect(() => {
        axios.get(url)
            .then(response => {
                setposts(response.data)
            })
    }, [url])
    let content = null;
    if(posts){
        content = posts.slice(0).reverse().map((post) => 
            <div><PostCard Post={post}/></div>
        )
    }else{
        content = <div className='loader'><Loader/></div>
    }
    const queryParams = new URLSearchParams(window.location.search);
    const name = queryParams.get('name');
    return <div>
            <Header/>
                <h2 className="page-title">{name.charAt(0).toUpperCase() + name.slice(1)}'s posts</h2>
                <div>{content}</div>
            <Footer/>
        </div>
}

export default PostsByCategories