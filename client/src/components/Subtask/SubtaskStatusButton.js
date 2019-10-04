import React, { Component } from "react";
import { Icon, Dropdown } from "semantic-ui-react";
import updateSubtask from "../../data/update/UpdateSubtask";

class SubtaskStatusButton extends Component {
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
    const { project, projectId, taskId, subtask, category } = this.props;
    const output = {
      project,
      projectId,
      taskId,
      subtask,
      status,
      category
    };
    updateSubtask(output);
  }

  getTaskStatusColor = () => {
    const { subtask } = this.props;
    if (subtask.status === 2) return "task-status green";
    else if (subtask.status === 1) return "task-status yellow";
    else return "task-status";
  };

  getTaskStatusText = () => {
    const { subtask } = this.props;
    if (subtask.status === 2) return "Finished";
    else if (subtask.status === 1) return "In Progress";
    else return "Not Started";
  };

  getStatusIcon = () => {
    const { subtask } = this.props;
    if (subtask.status === 2 || subtask.status === 1) return "circle";
    else return "circle outline";
  };

  render() {
    return (
      <div className={this.getTaskStatusColor()}>
        <Icon name={this.getStatusIcon()} />
        {this.getTaskStatusText()}
        <Dropdown direction="left">
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

export default SubtaskStatusButton;
