import React, { useEffect, useState } from 'react';
import Header from '../Components/HeaderComponent';
import Footer from '../Components/FooterComponent';
import { Link } from 'react-router-dom';
import "../css/createPost.css"
import { useHistory, useParams } from 'react-router';
import axios from 'axios';

function PostForm(){
    const [post, setPost] = useState(null)
    const [title, setTitle] = useState(null)
    const [content, setContent] = useState(null)
    const [categories, setCategories] = useState(null)
    const [state, setState] = useState({selectedFile: "", responseArray: [],})
    const history = useHistory()
    const { id } = useParams()
    const postURL = `http://127.0.0.1:8000/api/posts/${id}`;

    useEffect(() => {
        axios.get(postURL)
            .then(response => {
                setPost(response.data)
            })
    }, [postURL])
}

export default PostForm
