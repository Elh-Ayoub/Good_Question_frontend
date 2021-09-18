import React, { useState } from 'react';
import Header from '../Components/HeaderComponent';
import Footer from '../Components/FooterComponent';
import { Link } from 'react-router-dom';
import "../css/createPost.css"
import { useHistory } from 'react-router';

function CreatePost(){
    const [title, setTitle] = useState(null)
    const [content, setContent] = useState(null)
    const [categories, setCategories] = useState(null)
    const [state, setState] = useState({selectedFile: "", responseArray: [],})
    const history = useHistory()
    const handleInputChange = (event) => {
        setState({
          selectedFile: event.target.files,
          responseArray:[]
        });
        document.querySelector('.selectfile').style.background = "#181b58"
        document.querySelector('.selectfile').style.color = "white"
        document.querySelector('.selectfile').innerHTML = "File(s) selected"
    }
    const formData = new FormData()
    function Create(){
        if(!title || !content || !categories){
            alert('Fields with (*) are required!')
        }else{
            if(localStorage.getItem('user-info')){
                const createPostUrl = `http://127.0.0.1:8000/api/posts/`;
                for (let i = 0; i < state.selectedFile.length; i++) {
                    formData.append("images[]", state.selectedFile[i]);
                }
                formData.append('title', title);
                formData.append('categories', categories);
                formData.append('content', content);
                formData.append('user', localStorage.getItem('user-info'));
                fetch(createPostUrl, {
                    method: 'POST',
                    body:  formData,
                })
                .then((result) => {
                    console.log('Success:', result);
                    alert('Post created successfully!')
                    history.push('/')
                })  
            }else{
                alert('Login or register first!')
            }
        }
    }
    return  <div className="CreatePost">
                <Header/>
                <h2 className="page-title">Create post</h2>
                <div className="create-post-container">
                    <div className="input-field-create-post">
                        <label>Title<span className="red">*</span>: </label>
                        <input type="text" className="inputText" onChange={(e) => {setTitle(e.target.value)}} placeholder="Type a title for your post..."/>   
                    </div>               
                    <div className="input-field-create-post">
                        <label>Post's content<span className="red">*</span>: </label>
                        <textarea className="inputText textarea" onChange={(e) => {setContent(e.target.value)}} placeholder="Type content of the post..."></textarea>   
                    </div>             
                    <div className="input-field-create-post">
                        <label>Categories<span className="red">*</span>: <span className="small">(separeted by space)</span></label>
                        <input className="inputText" type="text" onChange={(e) => {setCategories(e.target.value)}}  placeholder="Type categories of the post..."/>  
                    </div>
                    <div className="input-field-create-post">
                        <label>Attach images: </label>
                        <label for="choosefile" className="selectfile">Select images</label>
                        <input id="choosefile" type="file" onChange={handleInputChange} multiple/> 
                    </div>
                    <div className="input-field-create-btn">
                      <Link to="/"><button className="cancel-btn">Cancel</button></Link>
                      <button className="create-btn" onClick={Create}>Create</button>  
                    </div>
                </div>
                <div className="profile-footer">
                    <Footer/>
                </div>
            </div>
}

export default CreatePost
