import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class User extends Component {
  render() {
    return <span className="User">{this.props.user}</span>;
  }
}

export default User;
