import logo from './logo.svg';
import './App.css';
import Header from './Components/HeaderComponent'
import Footer from './Components/FooterComponent'
import Post from './Components/PostComponent'
function App() {
  return (
    <div className="app">
    <Header/>
    <Post/>
    <Footer/>
    </div>
  );
}

export default App;
