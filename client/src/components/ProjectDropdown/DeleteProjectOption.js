import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";
import deleteProject from "../../data/delete/DeleteProject";

class DeleteProjectOption extends Component {
  constructor(props) {
    super(props);

    this.delete = this.delete.bind(this);
  }

  delete(event) {
    event.preventDefault();
    const { project, projectId, category } = this.props;
    deleteProject({ project, projectId, category });
  }

  render() {
    return (
      <Dropdown.Item icon="trash" text="Delete Project" onClick={this.delete} />
    );
  }
}

export default DeleteProjectOption;
