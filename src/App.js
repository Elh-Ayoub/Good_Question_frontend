import './App.css';
import Home from "./Views/Home"
import Login from "./Views/Login"
import Register from "./Views/Register"
import ForgetPassword from "./Views/ForgetPassword"
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
            <Register/>        
          </Route>
          <Route path="/auth/password-reset">
            <ForgetPassword/>        
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
