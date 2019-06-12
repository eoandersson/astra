import React, { Component } from "react";
import { Popup, Button } from "semantic-ui-react";

class AddSubtaskButton extends Component {
  render() {
    return (
      <Popup
        content="Add a Subtask"
        trigger={<Button positive icon="add" />}
        position="top center"
      />
    );
  }
}

export default AddSubtaskButton;
