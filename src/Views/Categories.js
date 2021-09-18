import React from 'react';
import Header from '../Components/HeaderComponent';
import Footer from '../Components/FooterComponent';
import CategoryCard from '../Components/CategoryComponent';

function Categories(){
    return <div>
            <Header/>
            <h2 className="page-title">Categories</h2>
            <CategoryCard/>
            <Footer/>
        </div>
}

export default Categories