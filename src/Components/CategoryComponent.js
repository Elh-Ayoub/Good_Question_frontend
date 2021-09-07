import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './LoaderComponent';
import '../css/loader.css';
import '../css/categories.css'

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
                    <div className="category-content">
                        <div className="category-title">{category.title}</div><br/>
                        {category.description ? (
                            <div className="category-footer">{category.description}</div>
                        ) : (<div className="category-footer">No description</div>)
                        }
                    </div>
                )
    }else{
        content = <div className='loader'><Loader/></div>
    }
    return <div className="categories-contanier">{content}</div>;
}

export default CategoryCard