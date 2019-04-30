import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Task from "./Task";
import User from "./User";
import TaskHeader from "./TaskHeader";

class Project extends Component {
  constructor(props) {
    super(props);

    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
  }

  edit(event) {
    event.preventDefault();
  }

  delete(event) {
    event.preventDefault();
    alert(this.props.projectId);
  }

  render() {
    return (
      <div className="Project">
        <div className="ProjectHeader">
          <div className="ProjectName">
            <h3>Project Name</h3>
          </div>
          <div className="ProjectButtons">
            <Button variant="danger" type="submit" onClick={this.delete}>
              Delete
            </Button>
            <Button variant="primary" type="submit" onClick={this.edit}>
              Edit
            </Button>
          </div>
        </div>
        <div className="ProjectBody">
          <div className="ProjectUsers">
            <h5>Project Members</h5>
            <p>
              {this.props.project.users.map(user => (
                <User user={user} key={user} />
              ))}
            </p>
          </div>
          <div className="ProjectTasks">
            <TaskHeader />
            {this.props.project.tasks.map(task => (
              <Task task={task} key={task.name} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Project;
