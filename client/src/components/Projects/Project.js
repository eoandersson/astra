import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Task from "./Tasks/Task";
import User from "./User";
import TaskHeader from "./Tasks/TaskHeader";
import DeleteProjectButton from "./DeleteProjectButton";
import CreateTask from "./Tasks/CreateTask";
import store from "./../../store";
import { showEditProject } from "../../actions/index.js";

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = { editModalShow: false, createTaskModalShow: false };
    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
  }

  edit(event) {
    const project = {
      projectId: this.props.projectId,
      projectName: this.props.project.projectName,
      users: this.props.project.users,
      tasks: this.props.project.tasks
    };
    store.dispatch(showEditProject(project));
  }

  delete(event) {
    event.preventDefault();
    alert(this.props.projectId);
  }

  render() {
    let editModalClose = () => this.setState({ editModalShow: false });
    let createTaskModalClose = () =>
      this.setState({ createTaskModalShow: false });

    return (
      <div className="Project">
        <div className="ProjectHeader">
          <div className="ProjectName">
            <h3>{this.props.project.projectName}</h3>
          </div>
          <div className="ProjectButtons">
            <DeleteProjectButton
              projectId={this.props.projectId}
              renderProjects={this.props.renderProjects}
            />
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
              <Task
                task={task}
                projectId={this.props.projectId}
                key={task.name}
                renderProjects={this.props.renderProjects}
              />
            ))}
            <Button
              variant="success"
              onClick={() => this.setState({ createTaskModalShow: true })}
            >
              Create Task
            </Button>
            <CreateTask
              show={this.state.createTaskModalShow}
              projectId={this.props.projectId}
              renderProjects={this.props.renderProjects}
              onHide={createTaskModalClose}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Project;
