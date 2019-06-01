import React, { Component } from "react";
import LoginForm from "./LoginForm";
import RegisterLink from "./RegisterLink";
import "./LandingPage.css";

class Landing extends Component {
  render() {
    return (
      <div className="landing-page">
        <div className="login-title" />
        <div className="login-wrapper">
          <div className="login-content">
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
