import React, { Component } from "react";
import DeleteTaskButton from "./DeleteTaskButton";
import TaskStatusButton from "./TaskStatusButton";

class Task extends Component {
  render() {
    return (
      <div className="Task">
        <p className="NameColumn">{this.props.task.name}</p>
        <p className="DescriptionColumn">{this.props.task.description}</p>
        <div className="StatusColumn">
          <TaskStatusButton
            projectId={this.props.projectId}
            task={this.props.task}
            project={this.props.project}
          />
        </div>
        <div className="DeleteColumn">
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
