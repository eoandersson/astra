import React, { Component } from "react";
import { BrowserRouter as Link } from "react-router-dom";

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
