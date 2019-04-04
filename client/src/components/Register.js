import React, { Component } from "react";
import RegisterPage from "./RegisterPage";
import Button from "react-bootstrap/Button";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Register extends Component {
  render() {
    return (
      <div className="Register">
        <Link to="/register">Register</Link>
      </div>
    );
  }
}

export default Register;
