import React, { useEffect, useState } from 'react';
import Header from '../Components/HeaderComponent';
import Footer from '../Components/FooterComponent';
import { Link } from 'react-router-dom';
import "../css/createPost.css"
import { useHistory, useParams } from 'react-router';
import axios from 'axios';

function UpdatePost(){
    const [post, setPost] = useState(null)
    const [title, setTitle] = useState(null)
    const [content, setContent] = useState(null)
    const [categories, setCategories] = useState(null)
    const [state, setState] = useState({selectedFile: "", responseArray: []})
    const history = useHistory()
    const { id } = useParams()
    const postURL = `http://127.0.0.1:8000/api/posts/${id}`;

    useEffect(() => {
        axios.get(postURL)
            .then(response => {
                setPost(response.data)
                setTitle(response.data.title)
                setContent(response.data.content)
                setCategories(response.data.categories.replaceAll(',', '')) 
            })
    
    }, [postURL])

    const handleInputChange = (event) => {
        setState({
          selectedFile: event.target.files,
          responseArray:[]
        });
        document.querySelector('.selectfile').style.background = "#181b58"
        document.querySelector('.selectfile').style.color = "white"
        document.querySelector('.selectfile').innerHTML = "File(s) selected"
    }
    
    function update(){
        if(!title || !content || !categories){
            alert('Fields with (*) are required!')
        }else{
            if(localStorage.getItem('user-info')){
                if(state.selectedFile.length > 0){
                    const formData = new FormData()
                    for (let i = 0; i < state.selectedFile.length; i++) {
                        formData.append("images[]", state.selectedFile[i]);
                    }
                    formData.append('user', localStorage.getItem('user-info'));
                    formData.append('_method', 'PATCH');
                    axios.post(postURL, formData,{
                        cache: false,
                        dataType: 'json',
                        processData: false,
                        contentType: false,
                        success: function(response) {
                            console.log(response);
                        }
                    });
                }
                ////////////////////////////////////////////////////////////////////////////////////////////////////
                axios.patch(postURL,
                    { title: title, categories: categories, content: content, user: localStorage.getItem('user-info')}
                )
                .then((result) => {
                    console.log('Success:', result);
                    history.go(0)
                })
            }else{
                alert('Login or register first!')
            }
        }
    }
    let Pagecontent= null
    if(post){
         Pagecontent =   <div className="CreatePost">
                        <Header/>
                        <h2 className="page-title">Update post</h2>
                        <div className="create-post-container">
                            <div className="input-field-create-post">
                                <label>Title<span className="red">*</span>: </label>
                                <input type="text" className="inputText" onChange={(e) => {setTitle(e.target.value)}} placeholder="Type a title for your post..." value={title}/>
                            </div>               
                            <div className="input-field-create-post">
                                <label>Post's content<span className="red">*</span>: </label>
                                <textarea className="inputText textarea" onChange={(e) => {setContent(e.target.value)}} placeholder="Type content of the post...">{post.content}</textarea>   
                            </div>             
                            <div className="input-field-create-post">
                                <label>Categories<span className="red">*</span>: <span className="small">(separeted by space)</span></label>
                                <input className="inputText" type="text" onChange={(e) => {setCategories(e.target.value)}}  placeholder="Type categories of the post..." value={categories}/>  
                            </div>
                            <div className="sub-imgs">
                                {post.images ? (post.images.split(' ').map((image) =>
                                    image !== "" ? (
                                        <img className="post-img" src={image} alt="post-img"/>
                                    ) : (null)
                                )) : (null)}
                            </div>
                            <div className="input-field-create-post">
                                <label>Attach images: </label>
                                <label for="choosefile" className="selectfile">Select images</label>
                                <input id="choosefile" type="file" onChange={handleInputChange} multiple/> 
                            </div>
                            <div className="input-field-create-btn">
                            <Link to="/"><button className="cancel-btn">Cancel</button></Link>
                            <button className="save-btn" onClick={update}>Save</button>  
                            </div>
                        </div>
                        <Footer/>
                    </div>
    }
    
    return Pagecontent
}

export default UpdatePost
