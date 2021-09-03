import './App.css';
import Home from "./Views/Home"
import Login from "./Views/Login"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home/>          
          </Route>
          <Route exact path="/auth/login">
            <Login/>       
          </Route>
          <Route path="/auth/register">
            <h1>Register page</h1>         
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
