import './App.css';
import Home from "./Views/Home"
import Login from "./Views/Login"
import Register from "./Views/Register"
import ForgetPassword from "./Views/ForgetPassword"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Categories from './Views/Categories';
import PostsByCategories from './Views/PostsByCategories';
import Profile from './Views/Profile';
import PostById from './Views/PostById';
import CreatePost from './Views/CreatePost';
import UpdatePost from './Views/UpdatePost';

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
            <Route exact path="/">
              <Home/>          
            </Route>
            <Route path="/categories">
              <Categories/>          
            </Route>
            <Route path="/category/:id/posts">
              <PostsByCategories/>
            </Route>
            <Route path="/posts/:id/update">
              <UpdatePost />
            </Route>
            <Route path="/posts/:id">
              <PostById/>
            </Route>
            <Route path="/users/profile">
              <Profile/>
            </Route>
            <Route path="/post/create">
              <CreatePost/>
            </Route>
            <div className="auth">
              <Route exact path="/auth/login">       
                <Login/>       
              </Route>
              <Route path="/auth/register">
                <Register/>        
              </Route>
              <Route path="/auth/password-reset">
                <ForgetPassword/>        
              </Route>
            </div>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
