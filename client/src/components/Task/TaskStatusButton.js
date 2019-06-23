import React, { Component } from "react";
import { Icon, Dropdown } from "semantic-ui-react";
import updateTask from "../../data/update/UpdateTask";

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
    const { project, projectId, task, category } = this.props;
    const output = {
      project,
      projectId,
      task,
      status,
      category
    };
    updateTask(output);
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
