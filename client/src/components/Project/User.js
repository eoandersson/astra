import React, { Component } from "react";
import { Label, Icon } from "semantic-ui-react";

class User extends Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          color: "#fff",
          marginBottom: "10px"
        }}
      >
        <Icon style={{ marginRight: "10px" }} name="user" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontWeight: "bold" }}>{this.props.user}</span>
          <span style={{ opacity: "0.8" }}>Maintainer</span>
        </div>
      </div>
    );
  }
}

export default User;
