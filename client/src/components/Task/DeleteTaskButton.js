import React, { Component } from "react";
import { Popup, Button } from "semantic-ui-react";
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
      <Popup
        content="Delete Task"
        trigger={<Button negative icon="delete" onClick={this.deleteTask} />}
        position="top center"
      />
    );
  }
}

export default DeleteTaskButton;
