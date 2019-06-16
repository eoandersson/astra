import React, { Component } from "react";
import "./Project.css";
import { Icon, Grid, Header } from "semantic-ui-react";

import store from "../../../store";
import {
  showCreateTask,
  showProjectSidebar,
  hideProjectSidebar
} from "../../../actions/index.js";

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
      active: true
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

  toggleSidebar = () => {
    const { visible } = this.props;
    if (visible) {
      store.dispatch(hideProjectSidebar());
    } else {
      store.dispatch(showProjectSidebar());
    }
  };

  render() {
    const { visible, project } = this.props;

    return (
      <React.Fragment>
        <Header attached="top" className="project-header">
          <Grid columns={16}>
            <Grid.Row stretched>
              <Grid.Column width={1} className="header-column">
                <Icon
                  size="big"
                  onClick={this.toggleSidebar}
                  className="sidebar-toggle"
                  name={visible ? "caret square left outline" : "sidebar"}
                />
              </Grid.Column>
              <Grid.Column width={10} className="header-column title-column">
                <Grid.Row>
                  <h2>{this.props.project.projectName}</h2>
                </Grid.Row>
                <Grid divided columns={10} className="icon-row">
                  <Grid.Column
                    width={1}
                    className="header-icon-column"
                    textAlign="center"
                  >
                    <Icon name="star outline" size="small" />
                  </Grid.Column>
                  <Grid.Column
                    width={1}
                    className="header-icon-column"
                    textAlign="center"
                  >
                    <Icon name="user outline" size="small" />{" "}
                    {project.users.length}
                  </Grid.Column>
                </Grid>
              </Grid.Column>
              <Grid.Column width={5} floated="right" className="header-column">
                <ProjectDropdown
                  projectId={this.props.projectId}
                  project={this.props.project}
                  category={this.props.category}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Header>
        <div className="project-content">
          <div className="project-content-header">
            <div className="project-description">
              <h4>Project Description</h4>
              <p>{this.props.project.projectDescription}</p>
            </div>
            <div className="project-users">
              <h4>Project Members</h4>
              <p>
                {this.props.project.users.map(user => (
                  <User user={user} key={user} />
                ))}
              </p>
            </div>
          </div>
          <div className="project-tasks">
            <TaskHeader />
            {this.props.project.tasks.map(task => (
              <Task
                task={task}
                projectId={this.props.projectId}
                project={this.props.project}
                category={this.props.category}
                key={task.name}
              />
            ))}
            <TaskFooter
              projectId={this.props.projectId}
              project={this.props.project}
              category={this.props.category}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Project;
