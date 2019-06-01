import React, { Component } from "react";
import LoginForm from "./LoginForm";
import RegisterLink from "./RegisterLink";

class Landing extends Component {
  render() {
    return (
      <div className="Landing">
        <div className="LoginTitle" />
        <div className="LoginContent">
          <div className="LoginForm">
            <h3>Login</h3>
            <LoginForm />
            <RegisterLink />
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
