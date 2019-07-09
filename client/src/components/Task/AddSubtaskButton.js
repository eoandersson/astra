import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";

class AddSubtaskButton extends Component {
  render() {
    return <Dropdown.Item text="Add a Subtask" icon="add" disabled />;
  }
}

export default AddSubtaskButton;
