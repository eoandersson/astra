import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import DeleteTaskButton from "./DeleteTaskButton";
import TaskStatusButton from "./TaskStatusButton";

class Task extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Task">
        <p className="NameColumn">{this.props.task.name}</p>
        <p className="DescriptionColumn">{this.props.task.description}</p>
        <div className="StatusColumn">
          <TaskStatusButton
            projectId={this.props.projectId}
            task={this.props.task}
            renderProjects={this.props.renderProjects}
          />
        </div>
        <div className="DeleteColumn">
          <DeleteTaskButton
            projectId={this.props.projectId}
            task={this.props.task}
            renderProjects={this.props.renderProjects}
          />
        </div>
      </div>
    );
  }
}

export default Task;
