import React, { Component } from "react";
import "./LoginPage.css";

import LoginForm from "./LoginForm";
import LandingHeader from "../../components/LandingHeader/LandingHeader";

export default class LoginPage extends Component {
  render() {
    return (
      <div className="login-initial-content">
        <LandingHeader />
        <div className="login-wrapper">
          <div className="login-content-wrapper">
            <LoginForm />
          </div>
        </div>
      </div>
    );
  }
}
