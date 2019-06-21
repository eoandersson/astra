import React, { Component } from "react";

export default class CustomDivider extends Component {
  render() {
    const { from, to } = this.props;
    const style = {
      width: "40px",
      height: "4px",
      background: "linear-gradient(to right, " + from + ", " + to + ")",
      display: "block",
      marginTop: "-5px",
      marginBottom: "10px",
      borderRadius: "2px"
    };
    return <span style={style} />;
  }
}
