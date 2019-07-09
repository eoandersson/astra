import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";
import deleteTask from "../../data/delete/DeleteTask";

class DeleteTaskButton extends Component {
  constructor(props) {
    super(props);

    this.deleteTask = this.deleteTask.bind(this);
  }

  deleteTask(event) {
    event.preventDefault();
    const { project, projectId, category, task } = this.props;
    deleteTask({ project, projectId, category, task });
  }

  render() {
    return (
      <Dropdown.Item
        text="Delete Task"
        icon="trash"
        onClick={this.deleteTask}
      />
    );
  }
}

export default DeleteTaskButton;
