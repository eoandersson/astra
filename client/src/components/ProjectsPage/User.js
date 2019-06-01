import React, { Component } from "react";

class User extends Component {
  render() {
    return <span className="User">{this.props.user}</span>;
  }
}

export default User;
