import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../Components/HeaderComponent';
import Footer from '../Components/FooterComponent';
import Loader from '../Components/LoaderComponent';
import PostCard from '../Components/PostComponent';
import { useParams } from 'react-router';
import ArrowUp from '../images/arrow-up.png'
import ArrowDown from '../images/arrow-down.png'
import Pagination from '../Components/Pagination';

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
    function restyle(activeBtnId, noneActive1, noneActive2, order){
        document.getElementById(activeBtnId).style.background = "#3e4b63";
        document.getElementById(activeBtnId).style.color = "white";
        document.getElementById(activeBtnId).style.border = "3px solid #819ccc";
        document.getElementById(activeBtnId).style.border = "3px solid #819ccc";
        if(order == 'desc')document.getElementById(activeBtnId).childNodes[1].src = ArrowUp
        if(order == 'asc')document.getElementById(activeBtnId).childNodes[1].src = ArrowDown
        document.getElementById(activeBtnId).childNodes[1].style.width = "20px";
        document.getElementById(activeBtnId).childNodes[1].style.height = "20px";
        //
        document.getElementById(noneActive1).style.background = "rgba(255, 255, 255, 0.3)";
        document.getElementById(noneActive1).style.color = "black";
        document.getElementById(noneActive1).style.border = "2px solid #3e4b63";
        document.getElementById(noneActive1).childNodes[1].style.width = "0";
        document.getElementById(noneActive1).childNodes[1].style.height = "0";
        //
        document.getElementById(noneActive2).style.background = "rgba(255, 255, 255, 0.3)";
        document.getElementById(noneActive2).style.color = "black";
        document.getElementById(noneActive2).style.border = "2px solid #3e4b63";
        document.getElementById(noneActive2).childNodes[1].style.width = "0";
        document.getElementById(noneActive2).childNodes[1].style.height = "0";
    }
    function fsort(field){
        if(field == "likes"){
            if(sortByLikes == "desc"){
                setSortByLikes("asc")
                posts.sort(function(a, b) {
                    var keyA = a.rating, keyB = b.rating;
                    if (keyA < keyB) return -1;
                    if (keyA > keyB) return 1;
                    return 0;
                });
            }
            else if(sortByLikes == "asc"){
                setSortByLikes("desc")
                posts.sort(function(a, b) {
                    var keyA = a.rating, keyB = b.rating;
                    if (keyA < keyB) return 1;
                    if (keyA > keyB) return -1;
                    return 0;
                });
            }
            restyle('bylikes', 'bydate', 'bytitle', sortByLikes)
        }else if(field == "date"){
            if(sortByDate == "desc"){
                setSortByDate("asc")
                posts.sort(function(a, b) {
                    var keyA = a.created_at, keyB = b.created_at;
                    if (keyA < keyB) return -1;
                    if (keyA > keyB) return 1;
                    return 0;
                });
            }
            else if(sortByDate == "asc"){
                setSortByDate("desc")
                posts.sort(function(a, b) {
                    var keyA = a.created_at, keyB = b.created_at;
                    if (keyA < keyB) return 1;
                    if (keyA > keyB) return -1;
                    return 0;
                });
            }         
            restyle('bydate', 'bylikes', 'bytitle', sortByDate)

        }else if(field == "title"){
            if(sortByTitle == "desc"){
                setSortByTitle("asc")
                posts.sort(function(a, b) {
                    var keyA = a.title, keyB = b.title;
                    if (keyA < keyB) return -1;
                    if (keyA > keyB) return 1;
                    return 0;
                });
            }
            else if(sortByTitle == "asc"){
                setSortByTitle("desc")
                posts.sort(function(a, b) {
                    var keyA = a.title, keyB = b.title;
                    if (keyA < keyB) return 1;
                    if (keyA > keyB) return -1;
                    return 0;
                });
            } 
            restyle('bytitle', 'bylikes', 'bydate', sortByTitle)
        } 
    }
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
                    <button id="bylikes" onClick={() => fsort("likes", this)}><span>sort by likes</span><img id="like-icon" className='sort-btn-icon' src="" /></button>
                    <button id="bydate" onClick={() => fsort("date")}><span>sort by date</span><img id="date-icon" className='sort-btn-icon' src=""/></button>
                    <button id="bytitle" onClick={() => fsort("title")}><span>sort by title</span><img id="title-icon" className='sort-btn-icon' src=""/></button>
                </div>
                <div>{content}</div>
                {pagination}
            <Footer/>
        </div>
}

export default MyPosts
