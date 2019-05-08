import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Task from "./Tasks/Task";
import User from "./User";
import TaskHeader from "./Tasks/TaskHeader";
import DeleteProjectButton from "./DeleteProjectButton";
import CreateTask from "./Tasks/CreateTask";
import store from "./../../store";
import { showEditProject, showCreateTask } from "../../actions/index.js";

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
      <div className="Project">
        <div className="ProjectHeader">
          <div className="ProjectName">
            <h3>{this.props.project.projectName}</h3>
          </div>
          <div className="ProjectButtons">
            <DeleteProjectButton
              project={this.props.project}
              projectId={this.props.projectId}
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
                project={this.props.project}
                key={task.name}
              />
            ))}
            <Button variant="success" onClick={this.createTask}>
              Create Task
            </Button>
            <CreateTask />
          </div>
        </div>
      </div>
    );
  }
}

export default Project;
