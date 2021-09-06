import React from 'react';
import Posts from '../Views/Posts'
import Header from '../Components/HeaderComponent';
import Footer from '../Components/FooterComponent';

function Home(){
    return <div>
        <Header/>
            <Posts/>
        <Footer/>
        </div>
}

export default Home
