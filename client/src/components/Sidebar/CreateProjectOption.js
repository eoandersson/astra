import React, { Component } from "react";
import store from "../../store";
import { showCreateProject } from "../../actions";
import { Popup, Icon } from "semantic-ui-react";

export default class CreateProjectOption extends Component {
  showCreateProject = () => {
    store.dispatch(showCreateProject());
  };

  render() {
    return (
      <Popup
        content="Create a new project"
        trigger={<Icon name="tasks" onClick={this.showCreateProject} />}
        position="right center"
      />
    );
  }
}
