import React, { Component } from "react";
import DeleteTaskButton from "./DeleteTaskButton";
import TaskStatusButton from "./TaskStatusButton";

class Task extends Component {
  render() {
    return (
      <div className="task">
        <p className="task-name-column">{this.props.task.name}</p>
        <p className="task-description-column">{this.props.task.description}</p>
        <div className="task-status-column">
          <TaskStatusButton
            projectId={this.props.projectId}
            task={this.props.task}
            project={this.props.project}
          />
        </div>
        <div className="task-delete-column">
          <DeleteTaskButton
            projectId={this.props.projectId}
            task={this.props.task}
            project={this.props.project}
          />
        </div>
      </div>
    );
  }
}

export default Task;
