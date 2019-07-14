import React, { Component } from "react";
import "./Project.css";
import {
  Icon,
  Grid,
  Menu,
  Form,
  Divider,
  TextArea,
  Button,
  Message,
  Dropdown
} from "semantic-ui-react";

import store from "../../store";
import { showCreateTask } from "../../actions/index.js";

import updateProject from "../../data/update/UpdateProject";
import deleteProject from "../../data/delete/DeleteProject";

import User from "./User";

import Task from "../Task/Task";
import TaskFooter from "../Task/TaskFooter";
import PageHeader from "../PageHeader";
import ProjectDropdown from "../ProjectDropdown/ProjectDropdown";

class Project extends Component {
  constructor(props) {
    super(props);
    const { projectName, projectDescription, users } = this.props.project;

    this.state = {
      editModalShow: false,
      createTaskModalShow: false,
      active: true,
      activeItem: "tasks",
      settingsName: {
        name: projectName,
        success: false,
        failure: false,
        failureMessage: "",
        loading: false,
      },
      settingsDescription: {
        description: projectDescription,
        success: false,
        failure: false,
        failureMessage: "",
        loading: false
      },
      settingsUsers: users
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
              {project.users.map(user => (
                <User user={user} key={user} />
              ))}
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

  handleProjectNameChange = event => {
    this.setState({ settingsName: { name: event.target.value }});
  };

  changeProjectName = async () => {
    const { project, category } = this.props;
    const { settingsName } = this.state;

    this.setState({
      settingsName: { loading: true }
    });

    const responseStatus = await updateProject({
      project,
      projectId: project.projectId,
      projectName: settingsName.name,
      projectDescription: project.projectDescription,
      tasks: project.tasks,
      users: project.users,
      category
    });

    this.setState({
      settingsName: { loading: false }
    });

    if (responseStatus === 200) {
      this.setState({
        settingsName: { success: true }
      });
    } else {
      this.setState({
        settingsName: { failure: true, failureMessage: "Failed to change project name." },
      });
    }
  };

  handleProjectDescriptionChange = event => {
    this.setState({ settingsDescription: { description: event.target.value }});
  };

  changeProjectDescription = async () => {
    const { project, category } = this.props;
    const { settingsDescription } = this.state;

    this.setState({
      settingsDescription: { loading: true }
    });

    const responseStatus = await updateProject({
      project,
      projectId: project.projectId,
      projectName: project.projectName,
      projectDescription: settingsDescription.description,
      tasks: project.tasks,
      users: project.users,
      category
    });

    this.setState({
      settingsDescription: { loading: false }
    });

    if (responseStatus === 200) {
      this.setState({
        settingsDescription: { success: true }
      });
    } else {
      this.setState({
        settingsDescription: { 
          failure: true,
          failureMessage: "Failed to change project description."
        }
      });
    }
  };

  handleDismiss = messageName => {
    if (messageName === "nameSuccess") {
      this.setState({
        settingsName: { success: false }
      });
    } else if (messageName === "nameFailure") {
      this.setState({
        settingsName: { failure: false }
      });
    } else if (messageName === "descriptionSuccess") {
      this.setState({
        settingsDescription: { success: false }
      });
    } else if (messageName === "descriptionFailure") {
      this.setState({
        settingsDescription: { failure: false }
      });
    }
  };

  deleteProject = (event) => {
    event.preventDefault();
    const { project, projectId, category } = this.props;
    deleteProject({ project, projectId, category });
  }

  renderSettings = () => {
    // const { project, projectId, category } = this.props;
    const {
      settingsName,
      settingsDescription,
      settingsUsers
    } = this.state;

    return (
      <div className="project-wrapper">
        <div className="project-tasks-box">
          <div className="settings-wrapper">
            <h3>Project Information</h3>
            <Divider inverted />
            <h4>Project Name</h4>
            <Form
              inverted
              error={settingsName.failure}
              success={settingsName.success}
            >
              <Form.Group>
                <Form.Input
                  placeholder="Project Name"
                  onChange={this.handleProjectNameChange}
                  name="project-name"
                  value={settingsName.name}
                />
                <Form.Button
                  content="Rename"
                  onClick={this.changeProjectName}
                  loading={settingsName.loading}
                  positive
                />
              </Form.Group>
              <Message
                success
                header="Action Success"
                content="Project successfully renamed."
                onDismiss={() => this.handleDismiss("nameSuccess")}
                style={{ width: "50%" }}
              />
              <Message
                error
                header="Action Failed"
                content={settingsName.failureMessage}
                onDismiss={() => this.handleDismiss("nameFailure")}
                style={{ width: "50%" }}
              />
            </Form>
            <Divider inverted />
            <h4>Project Description</h4>
            <Form
              inverted
              error={settingsDescription.failure}
              success={settingsDescription.success}
            >
              <Form.Field
                control={TextArea}
                onChange={this.handleProjectDescriptionChange}
                placeholder="Project Description"
                value={settingsDescription.description}
                style={{ width: "50%" }}
              />
              <Message
                success
                header="Action Success"
                content="Project description successfully changed."
                onDismiss={() => this.handleDismiss("descriptionSuccess")}
                style={{ width: "50%" }}
              />
              <Message
                error
                header="Action Failed"
                content={settingsDescription.failureMessage}
                onDismiss={() => this.handleDismiss("descriptionFailure")}
                style={{ width: "50%" }}
              />
              <Form.Button
                content="Save Changes"
                positive
                onClick={this.changeProjectDescription}
                loading={settingsDescription.loading}
              />
            </Form>
            <Divider inverted />
            <h4>Project Members</h4>
            <Form inverted>
              {settingsUsers.map(user => (
                <div className="information-user" key={user}>
                  <Form.Group
                    style={{
                      width: "100%",
                      marginLeft: "auto",
                      marginRight: "auto",
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        color: "#fff",
                        marginBottom: "10px"
                      }}
                    >
                      <Icon style={{ marginRight: "10px" }} name="user" />
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ fontWeight: "bold" }}>{user}</span>
                        <div>
                          Maintainer
                          <Dropdown direction="left">
                            <Dropdown.Menu>
                              <Dropdown.Item text="Maintainer" />
                              <Dropdown.Item text="Member" />
                              <Dropdown.Item text="Observer" />
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </div>
                    </div>
                    <Form.Button
                      content="Remove"
                      style={{ marginLeft: "10px", color: "#fff" }}
                      icon="delete"
                      color="red"
                      inverted
                    />
                  </Form.Group>
                </div>
              ))}
            </Form>
            <h3>Danger Zone</h3>
            <Divider />
            <Button
              color="red"
              style={{ color: "#fff" }}
              inverted
              content="Leave Project"
              icon="user"
            />
            <Button
              color="red"
              style={{ color: "#fff" }}
              inverted
              content="Delete Project"
              icon="trash"
              onClick={this.deleteProject}
            />
          </div>
        </div>
      </div>
    );
  };

  renderContent = () => {
    const { activeItem } = this.state;
    if (activeItem === "tasks") return this.renderTasks();
    else if (activeItem === "information") return this.renderInformation();
    else if (activeItem === "settings") return this.renderSettings();
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
