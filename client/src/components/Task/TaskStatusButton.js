import React, { Component } from "react";
import { Icon, Dropdown } from "semantic-ui-react";
import store from "../../store";
import { editTask } from "../../actions/index.js";

class TaskStatusButton extends Component {
  constructor(props) {
    super(props);

    this.changeTaskStatus = this.changeTaskStatus.bind(this);
    this.setFinished = this.setFinished.bind(this);
    this.setInProgress = this.setInProgress.bind(this);
    this.setUnfinished = this.setUnfinished.bind(this);
  }

  setFinished() {
    this.changeTaskStatus(2);
  }

  setInProgress() {
    this.changeTaskStatus(1);
  }

  setUnfinished() {
    this.changeTaskStatus(0);
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
          status: status
        }
      })
    }).then(response => {
      console.log(response.status);
      if (response.status === 200) {
        var payload = {
          project: this.props.project,
          name: this.props.task.name,
          status: status,
          category: this.props.category
        };
        store.dispatch(editTask(payload));
      } else {
        console.log("Error");
      }
    });
  }

  getTaskStatusColor = () => {
    const { task } = this.props;
    if (task.status === 2) return "task-status green";
    else if (task.status === 1) return "task-status yellow";
    else return "task-status";
  };

  getTaskStatusText = () => {
    const { task } = this.props;
    if (task.status === 2) return "Finished";
    else if (task.status === 1) return "In Progress";
    else return "Not Started";
  };

  getStatusIcon = () => {
    const { task } = this.props;
    if (task.status === 2 || task.status === 1) return "circle";
    else return "circle outline";
  };

  render() {
    return (
      <div className={this.getTaskStatusColor()}>
        <Icon name={this.getStatusIcon()} />
        {this.getTaskStatusText()}
        <Dropdown>
          <Dropdown.Menu>
            <Dropdown.Item text="Finished" onClick={this.setFinished} />
            <Dropdown.Item text="In Progress" onClick={this.setInProgress} />
            <Dropdown.Item text="Not Started" onClick={this.setUnfinished} />
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

export default TaskStatusButton;
