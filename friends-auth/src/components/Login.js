import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosAuth";

const Login = props => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  const handleChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log("Form entered this: ", credentials);

    axiosWithAuth()
      .post(`http://localhost:5000/api/login`, credentials)
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        props.history.push("/friends");
      })
      .catch(err => console.log("login error ", err));

    setCredentials({
      username: "",
      password: ""
    });
  };

  
  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={credentials.username}
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />
        <input
          type="password"
          value={credentials.password}
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button>Log in!</button>
      </form>
      {/* <Link to="/">Login</Link> */}
    </div>
  );
};

export default Login;