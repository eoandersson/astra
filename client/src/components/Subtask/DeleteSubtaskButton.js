import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";
import deleteSubtask from "../../data/delete/DeleteSubtask";

class DeleteSubtaskButton extends Component {
  constructor(props) {
    super(props);

    this.deleteTask = this.deleteTask.bind(this);
  }

  deleteTask(event) {
    event.preventDefault();
    const { project, projectId, taskName, subtask, category } = this.props;
    deleteSubtask({ project, projectId, category, taskName, subtask });
  }

  render() {
    return (
      <Dropdown.Item
        text="Delete Subtask"
        icon="trash"
        onClick={this.deleteTask}
      />
    );
  }
}

export default DeleteSubtaskButton;
