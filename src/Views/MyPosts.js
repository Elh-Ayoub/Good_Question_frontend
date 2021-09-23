import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../Components/HeaderComponent';
import Footer from '../Components/FooterComponent';
import Loader from '../Components/LoaderComponent';
import PostCard from '../Components/PostComponent';
import { useParams } from 'react-router';
import Pagination from '../Components/Pagination';
import { sort } from '../functions/sort';

function MyPosts(){
    const { id } = useParams()
    const url = `http://127.0.0.1:8000/api/users/${id}/posts`;
    const [posts, setposts] = useState(null)
    const [sortByLikes, setSortByLikes] = useState("asc")
    const [sortByDate, setSortByDate] = useState("asc")
    const [sortByTitle, setSortByTitle] = useState("asc")
    //pagination
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(10)

    useEffect(() => {
        axios.get(url)
            .then(response => {
                setposts(response.data.reverse())
            })
    }, [url])
    let content = null;
    let pagination = null;
    if(posts){
        const indexOfLastPost = currentPage * postsPerPage
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
        const paginate = (num) => {setCurrentPage(num); window.scrollTo(0, 0);}
        content = currentPosts.map((post) => 
            <div><PostCard Post={post}/></div>
        )
        pagination = <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate}/>
    }else{
        content = <div className='loader'><Loader/></div>
    }
    return <div>
            <Header/>
                <h2 className="page-title">My posts</h2>
                <div className="sort-btns">
                    <button id="bylikes" onClick={() => sort(posts, "likes", setSortByLikes, sortByLikes)}><span>sort by likes</span><img id="like-icon" className='sort-btn-icon' src="" /></button>
                    <button id="bydate" onClick={() => sort(posts, "date", setSortByDate, sortByDate)}><span>sort by date</span><img id="date-icon" className='sort-btn-icon' src=""/></button>
                    <button id="bytitle" onClick={() => sort(posts, "title", setSortByTitle, sortByTitle)}><span>sort by title</span><img id="title-icon" className='sort-btn-icon' src=""/></button>
                </div>
                <div>{content}</div>
                {pagination}
            <Footer/>
        </div>
}

export default MyPosts
