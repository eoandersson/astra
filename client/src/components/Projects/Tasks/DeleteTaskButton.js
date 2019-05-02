import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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
      if (response.status == 200) {
        this.props.renderProjects();
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
