import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import store from "../../../../store";
import { editTask } from "../../../../actions/index.js";

class TaskStatusButton extends Component {
  constructor(props) {
    super(props);

    this.changeTaskStatus = this.changeTaskStatus.bind(this);
  }

  changeTaskStatus(event) {
    event.preventDefault();
    fetch("/project-service/projects/task", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        projectId: this.props.projectId,
        task: {
          name: this.props.task.name,
          description: this.props.task.description,
          state: !this.props.task.state
        }
      })
    }).then(response => {
      console.log(response.status);
      if (response.status === 200) {
        var payload = {
          project: this.props.project,
          name: this.props.task.name,
          state: !this.props.task.state
        };
        store.dispatch(editTask(payload));
      } else {
        console.log("Error");
      }
    });
  }

  render() {
    return (
      <Button
        variant={this.props.task.state ? "success" : "outline-success"}
        onClick={this.changeTaskStatus}
      >
        {this.props.task.state ? "Finishied" : "Unfinished"}
      </Button>
    );
  }
}

export default TaskStatusButton;
