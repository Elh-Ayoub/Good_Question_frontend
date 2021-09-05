import React from 'react';
import Header from '../Components/HeaderComponent'
import Footer from '../Components/FooterComponent'
import Posts from '../Views/Posts'

function Home(){
    return <div>
            <Header/>
            <Posts/>
            <Footer/>
        </div>
}

export default Home
