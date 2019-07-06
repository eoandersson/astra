import React, { Component } from "react";
import store from "../../store";
import { showCreateProject } from "../../actions";
import { Icon } from "semantic-ui-react";

export default class CreateProjectOption extends Component {
  showCreateProject = () => {
    store.dispatch(showCreateProject());
  };

  render() {
    return (
      <div className="project-sidebar-footer">
        <span>Create a New Project</span>
        <Icon name="add" onClick={this.showCreateProject} />
      </div>
    );
  }
}
