import React, { Component } from "react";
import { Link } from "react-router-dom";

class RegisterLink extends Component {
  render() {
    return (
      <div className="Register" style={{ marginTop: "10px" }}>
        <Link to="/register">Not a user? Register here!</Link>
      </div>
    );
  }
}

export default RegisterLink;
