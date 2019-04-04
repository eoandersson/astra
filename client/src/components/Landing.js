import React, { Component } from "react";
import LogIn from "./LogIn";
import ThirdPart from "./ThirdPart";
import Register from "./Register";

class Landing extends Component {
  render() {
    return (
      <div className="Landing">
        <LogIn />
        <ThirdPart />
        <Register />
      </div>
    );
  }
}

export default Landing;
