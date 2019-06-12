import React, { Component } from "react";
import { Button, Dropdown } from "semantic-ui-react";
import store from "../../../../store";
import { editTask } from "../../../../actions/index.js";

class TaskStatusButton extends Component {
  constructor(props) {
    super(props);

    this.changeTaskStatus = this.changeTaskStatus.bind(this);
    this.setFinished = this.setFinished.bind(this);
    this.setUnfinished = this.setUnfinished.bind(this);
  }

  setFinished() {
    this.changeTaskStatus(true);
  }

  setUnfinished() {
    this.changeTaskStatus(false);
  }

  changeTaskStatus(status) {
    fetch("/project-service/projects/task", {
      method: "PUT",
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
          state: status
        }
      })
    }).then(response => {
      console.log(response.status);
      if (response.status === 200) {
        var payload = {
          project: this.props.project,
          name: this.props.task.name,
          state: status
        };
        store.dispatch(editTask(payload));
      } else {
        console.log("Error");
      }
    });
  }

  render() {
    return (
      <Button.Group color={this.props.task.state ? "green" : null}>
        <Button>{this.props.task.state ? "Finishied" : "Not Started"}</Button>
        <Dropdown className="button icon" floating trigger={<React.Fragment />}>
          <Dropdown.Menu>
            <Dropdown.Item text="Not Started" onClick={this.setUnfinished} />
            <Dropdown.Item text="In Progress" />
            <Dropdown.Item text="Finished" onClick={this.setFinished} />
          </Dropdown.Menu>
        </Dropdown>
      </Button.Group>
    );
  }
}

export default TaskStatusButton;
