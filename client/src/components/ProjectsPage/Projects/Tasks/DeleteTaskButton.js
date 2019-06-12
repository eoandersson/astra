import React, { Component } from "react";
import { Popup, Button } from "semantic-ui-react";
import store from "../../../../store";
import { deleteTask } from "../../../../actions/";

class DeleteTaskButton extends Component {
  constructor(props) {
    super(props);

    this.deleteTask = this.deleteTask.bind(this);
  }

  deleteTask(event) {
    event.preventDefault();
    fetch("/project-service/projects/task", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("JWT")
      },
      body: JSON.stringify({
        projectId: this.props.projectId,
        task: {
          name: this.props.task.name,
          description: this.props.task.description,
          status: this.props.task.status
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
      <Popup
        content="Delete Task"
        trigger={<Button negative icon="delete" onClick={this.deleteTask} />}
        position="top center"
      />
    );
  }
}

export default DeleteTaskButton;
