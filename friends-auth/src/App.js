import React from 'react';
import { Route, Link, } from "react-router-dom";
import './App.css';

import Login from "./components/Login";
import Friends from "./components/Friends";
import { PrivateRoute } from "./components/PrivateRoute";

function App() {
  return (
    <div className="App">
     
     <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/friends">Friends list</Link>
          </li>
        </ul>
     
      
      <Route path="/login" component={Login} />
      <PrivateRoute path="/friends" component={Friends} />
      
    </div>
  );
}

export default App;
