import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class User extends Component {
  render() {
    return <div className="User">{this.props.user}</div>;
  }
}

export default User;
