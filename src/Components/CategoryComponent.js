import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './LoaderComponent';
import '../css/loader.css';
import '../css/categories.css'
import { Link } from 'react-router-dom';

function CategoryCard(props) {
    const [showCategories, setshowCategories] = useState(null)
    const categoriesUrl = `http://127.0.0.1:8000/api/categories/`;
    useEffect(() => {
        axios.get(categoriesUrl)
            .then(response => {
                setshowCategories(response.data)
            })
    }, [categoriesUrl])
    let content = null;
    if(showCategories){
        content = showCategories.map((category) =>
                <Link className="category-content" to={`/category/${category.id}/posts`}>
                    <div>
                        <div className="category-title">{category.title}</div><br/>
                        {category.description ? (
                            <div className="category-footer">{category.description}</div>
                        ) : (<div className="category-footer">No description</div>)
                        }
                    </div>
                </Link> 
                )
    }else{
        content = <div className='loader'><Loader/></div>
    }
    return <div className="categories-contanier">{content}</div>;
}

export default CategoryCard