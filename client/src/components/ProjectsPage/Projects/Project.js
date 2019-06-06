import React, { Component } from "react";
import "./Project.css";
import Button from "react-bootstrap/Button";
import Task from "./Tasks/Task";
import User from "./User";
import TaskHeader from "./Tasks/TaskHeader";
import DeleteProjectButton from "./DeleteProjectButton";
import store from "../../../store";
import { showEditProject, showCreateTask } from "../../../actions/index.js";
import TaskFooter from "./Tasks/TaskFooter";

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = { editModalShow: false, createTaskModalShow: false };
    this.edit = this.edit.bind(this);
    this.createTask = this.createTask.bind(this);
  }

  createTask(event) {
    const payload = {
      projectId: this.props.projectId,
      project: this.props.project
    };
    store.dispatch(showCreateTask(payload));
  }

  edit(event) {
    const project = {
      projectId: this.props.projectId,
      projectName: this.props.project.projectName,
      users: this.props.project.users,
      tasks: this.props.project.tasks,
      project: this.props.project
    };
    store.dispatch(showEditProject(project));
  }

  render() {
    return (
      <div className="project">
        <div className="project-header">
          <div className="project-name">
            <h2>{this.props.project.projectName}</h2>
          </div>
          <div className="project-buttons">
            <DeleteProjectButton
              project={this.props.project}
              projectId={this.props.projectId}
            />
            <Button variant="primary" type="submit" onClick={this.edit}>
              Edit
            </Button>
          </div>
        </div>
        <div className="project-body">
          <div className="project-users">
            <h4>Project Members</h4>
            <p>
              {this.props.project.users.map(user => (
                <User user={user} key={user} />
              ))}
            </p>
          </div>
          <div className="project-tasks">
            <TaskHeader />
            {this.props.project.tasks.map(task => (
              <Task
                task={task}
                projectId={this.props.projectId}
                project={this.props.project}
                key={task.name}
              />
            ))}
            <TaskFooter
              projectId={this.props.projectId}
              project={this.props.project}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Project;
