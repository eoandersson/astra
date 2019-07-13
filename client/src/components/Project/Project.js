import React, { Component } from "react";
import "./Project.css";
import { Icon, Grid, Menu } from "semantic-ui-react";

import store from "../../store";
import { showCreateTask } from "../../actions/index.js";

import User from "./User";

import Task from "../Task/Task";
import TaskHeader from "../Task/TaskHeader";
import TaskFooter from "../Task/TaskFooter";
import PageHeader from "../PageHeader";
import ProjectDropdown from "../ProjectDropdown/ProjectDropdown";

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editModalShow: false,
      createTaskModalShow: false,
      active: true,
      activeItem: "tasks"
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

  renderInformation = () => {
    const { project } = this.props;
    return (
      <div className="project-wrapper">
        <Grid stackable>
          <Grid.Column width={7} className="project-header-column">
            <div className="project-header-box">
              <p>{project.projectDescription}</p>
            </div>
          </Grid.Column>
          <Grid.Column width={4} className="project-header-column">
            <div className="project-header-box">
              <p>
                {project.users.map(user => (
                  <User user={user} key={user} />
                ))}
              </p>
            </div>
          </Grid.Column>
          <Grid.Column width={5} className="project-header-column">
            <div className="project-header-box" />
          </Grid.Column>
        </Grid>
      </div>
    );
  };

  renderTasks = () => {
    const { project, projectId, category } = this.props;
    return (
      <div className="project-wrapper">
        <div className="project-tasks-box">
          <Grid
            columns={16}
            className="task-grid"
            stackable
            divided="vertically"
            style={{ paddingTop: "30px" }}
          >
            {project.tasks.map(task => (
              <Task
                task={task}
                projectId={projectId}
                project={project}
                category={category}
                key={task.name}
              />
            ))}
            <TaskFooter
              projectId={projectId}
              project={project}
              category={category}
            />
          </Grid>
        </div>
      </div>
    );
  };

  renderContent = () => {
    const { activeItem } = this.state;
    if (activeItem === "tasks") return this.renderTasks();
    else if (activeItem === "information") return this.renderInformation();
    else return null;
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { project, projectId, category } = this.props;
    const { activeItem } = this.state;

    return (
      <React.Fragment>
        <PageHeader>
          <h2>{this.props.project.projectName}</h2>
          <Icon name="star outline" size="small" />
          <Icon name="user outline" size="small" /> {project.users.length}
          <ProjectDropdown
            projectId={projectId}
            project={project}
            category={category}
            icon="vertical"
            direction="right"
          />
        </PageHeader>
        <div className="project-content">
          <Menu pointing secondary className="project-page-menu">
            <Menu.Item
              name="tasks"
              className="tasks-option"
              active={activeItem === "tasks"}
              onClick={this.handleItemClick}
            >
              <Icon name="tasks" /> Tasks
            </Menu.Item>
            <Menu.Item
              name="information"
              className="information-option"
              active={activeItem === "information"}
              onClick={this.handleItemClick}
            >
              <Icon name="info" /> Information
            </Menu.Item>
            <Menu.Item
              disabled
              name="discussion"
              className="discussion-option"
              active={activeItem === "discussion"}
              onClick={this.handleItemClick}
            >
              <Icon name="comment outline" /> Discussion
            </Menu.Item>
            <Menu.Item
              disabled
              name="settings"
              className="settings-option"
              active={activeItem === "settings"}
              onClick={this.handleItemClick}
            >
              <Icon name="cog" /> Settings
            </Menu.Item>
          </Menu>
          {this.renderContent()}
        </div>
      </React.Fragment>
    );
  }
}

export default Project;
