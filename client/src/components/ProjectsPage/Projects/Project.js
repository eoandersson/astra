import React, { Component } from "react";
import "./Project.css";
import { Accordion, Icon } from "semantic-ui-react";

import store from "../../../store";
import { showCreateTask } from "../../../actions/index.js";

import User from "./User";

import Task from "./Tasks/Task";
import TaskHeader from "./Tasks/TaskHeader";
import TaskFooter from "./Tasks/TaskFooter";
import ProjectDropdown from "./Dropdown/ProjectDropdown";

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editModalShow: false,
      createTaskModalShow: false,
      active: false
    };
    this.createTask = this.createTask.bind(this);
  }

  createTask(event) {
    const payload = {
      projectId: this.props.projectId,
      project: this.props.project
    };
    store.dispatch(showCreateTask(payload));
  }

  handleClick = event => {
    if (event.target.classList.contains("btn")) return;
    const newState = this.state.active ? false : true;
    this.setState({ active: newState });
  };

  render() {
    return (
      <Accordion className="project" styled>
        <Accordion.Title active={this.state.active} onClick={this.handleClick}>
          <div className="project-header">
            <div className="project-name">
              <Icon name="dropdown" />
              {this.props.project.projectName}
            </div>
            <div className="project-buttons">
              <ProjectDropdown
                projectId={this.props.projectId}
                project={this.props.project}
              />
            </div>
          </div>
        </Accordion.Title>
        <Accordion.Content active={this.state.active}>
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
        </Accordion.Content>
      </Accordion>
    );
  }
}

export default Project;
