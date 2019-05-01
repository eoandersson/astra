import React, { Component } from "react";
import LogIn from "./LogIn";
import ThirdPart from "./ThirdPart";
import Register from "./Register";

class Landing extends Component {
  render() {
    return (
      <div className="Landing">
        <div className="LoginTitle" />
        <div className="LoginContent">
          <div className="LoginForm">
            <h3>Login</h3>
            <LogIn />
            <ThirdPart />
            <Register />
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
