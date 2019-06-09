import React, { Component } from "react";
import { Label, Icon } from "semantic-ui-react";

class User extends Component {
  render() {
    return (
      <Label as="a" color="blue" image>
        <Icon name="user" />
        {this.props.user}
      </Label>
    );
  }
}

export default User;
