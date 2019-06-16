import React, { Component } from "react";
import { showEditProject } from "../../../../actions";
import store from "../../../../store";
import { Dropdown } from "semantic-ui-react";

export default class EditProjectOption extends Component {
  constructor(props) {
    super(props);
    this.edit = this.edit.bind(this);
  }

  edit(event) {
    const project = {
      projectId: this.props.projectId,
      projectName: this.props.project.projectName,
      projectDescription: this.props.project.projectDescription,
      users: this.props.project.users,
      tasks: this.props.project.tasks,
      project: this.props.project,
      category: this.props.category
    };
    store.dispatch(showEditProject(project));
  }

  render() {
    return (
      <Dropdown.Item icon="edit" text="Edit Project" onClick={this.edit} />
    );
  }
}
