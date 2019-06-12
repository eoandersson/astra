import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";

export default class FinishProjectOption extends Component {
  render() {
    return <Dropdown.Item icon="folder" text="Move to Finished Projects" />;
  }
}
