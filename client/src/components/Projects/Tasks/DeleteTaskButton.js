import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import store from "./../../../store";
import { deleteTask } from "../../../actions/index.js";

class DeleteTaskButton extends Component {
  constructor(props) {
    super(props);

    this.deleteTask = this.deleteTask.bind(this);
  }

  deleteTask(event) {
    event.preventDefault();
    fetch("/api/projects/task", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        projectId: this.props.projectId,
        task: {
          name: this.props.task.name,
          description: this.props.task.description,
          state: this.props.task.state
        }
      })
    }).then(response => {
      console.log(response.status);
      if (response.status === 200) {
        var payload = {
          project: this.props.project,
          name: this.props.task.name
        };
        store.dispatch(deleteTask(payload));
      } else {
        console.log("Error");
      }
    });
  }

  render() {
    return (
      <Button variant="danger" type="submit" onClick={this.deleteTask}>
        Delete
      </Button>
    );
  }
}

export default DeleteTaskButton;