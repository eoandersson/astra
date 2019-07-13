import React, { Component } from "react";
import "./ProjectsPage.css";
import { withRouter } from "react-router-dom";
import store from "../../store";
import getUserProjects from "../../data/read/GetUserProjects";
import { goToProject } from "../../actions/index.js";
import {
  Loader,
  Dropdown,
  Icon,
  Divider,
  Grid,
  Segment,
  Placeholder
} from "semantic-ui-react";

import Project from "../../components/Project/Project";

import CreateProject from "../../components/Modals/CreateProject";
import EditProject from "../../components/Modals/EditProject";
import CreateTask from "../../components/Modals/CreateTask";
import CreateCategory from "../../components/Modals/CreateCategory";

import Sidebar from "../../components/Sidebar/Sidebar";
import PageHeader from "../../components/PageHeader/PageHeader";
import DashboardIcon from "../../components/DashboardIcon/DashboardIcon";
import NavigationSidebar from "../../components/NavigationSidebar/NavigationSidebar";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: store.getState().handleProject.projects,
      username: store.getState().userAuthentication.username,
      visible: store.getState().handleProject.projectSidebarVisibility,
      currentCategory: store.getState().handleProject.currentCategory,
      currentIndex: store.getState().handleProject.currentProjectIndex,
      isLoading: store.getState().loading.projectsLoading
    };

    this.renderProjects = this.renderProjects.bind(this);
    this.getId = this.getId.bind(this);
    this.pad0 = this.pad0.bind(this);
  }

  componentDidMount() {
    if (store.getState().userAuthentication.signedIn === false) {
      this.props.history.push("/");
    }
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        projects: store.getState().handleProject.projects,
        visible: store.getState().handleProject.projectSidebarVisibility,
        currentCategory: store.getState().handleProject.currentCategory,
        currentIndex: store.getState().handleProject.currentProjectIndex,
        username: store.getState().userAuthentication.username,
        isLoading: store.getState().loading.projectsLoading
      });
    });

    this.renderProjects();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getId(mongoId) {
    var result =
      this.pad0(mongoId.timestamp.toString(16), 8) +
      this.pad0(mongoId.machineIdentifier.toString(16), 6) +
      this.pad0(mongoId.processIdentifier.toString(16), 4) +
      this.pad0(mongoId.counter.toString(16), 6);

    return result;
  }

  pad0(str, len) {
    var zeros = "00000000000000000000000000";
    if (str.length < len) {
      return zeros.substr(0, len - str.length) + str;
    }

    return str;
  }

  renderProjects() {
    this.setState({ isLoading: true });
    getUserProjects();
  }

  getProjectList = () => {
    const { projects } = this.state;
    const categories = Object.keys(projects);
    const projectOutput = [];

    for (var i = 0; i < categories.length; i++) {
      for (var j = 0; j < projects[categories[i]].length; j++) {
        var payload = {
          category: categories[i],
          project: projects[categories[i]][j]
        };
        projectOutput.push(payload);
      }
    }

    return projectOutput;
  };

  getIndex = (category, projectId) => {
    const { projects } = this.state;
    for (var i = 0; i < projects[category].length; i++) {
      if (
        this.getId(projects[category][i].projectId) === this.getId(projectId)
      ) {
        return i;
      }
    }
    return 0;
  };

  goToProject = (category, projectId) => {
    const index = this.getIndex(category, projectId);
    const payload = {
      category: category,
      index: index
    };
    store.dispatch(goToProject(payload));
  };

  renderPlaceHolder = () => {
    return (
      <Grid.Row>
        <Segment raised>
          <Placeholder>
            <Placeholder.Header image>
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Header>
            <Placeholder.Paragraph>
              <Placeholder.Line length="long" />
              <Placeholder.Line length="long" />
              <Placeholder.Line length="long" />
              <Placeholder.Line length="medium" />
            </Placeholder.Paragraph>
          </Placeholder>
        </Segment>
      </Grid.Row>
    );
  };

  renderDashboard = () => {
    const { username } = this.state;
    return (
      <React.Fragment>
        <PageHeader>
          <h2>Projects Dashboard</h2>
        </PageHeader>
        <Grid className="dashboard-body" stackable>
          <Grid.Column className="dashboard-greeting" width={11}>
            <h3>Welcome to Astra, {username}!</h3>
            <div className="dashboard-greeting-content">
              {this.renderPlaceHolder()}
              {this.renderPlaceHolder()}
              {this.renderPlaceHolder()}
            </div>
          </Grid.Column>
          <Grid.Column className="dashboard-projects" width={5}>
            <div className="dashboard-projects-header">
              <h3>Recent Projects</h3>
              <div>
                <Icon name="list" />
                <Dropdown direction="left">
                  <Dropdown.Menu>
                    <Dropdown.Item text="View as list" />
                    <Dropdown.Item disabled text="View as tiles" />
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <Divider style={{ marginTop: "0px" }} />
            <Grid>
              {this.getProjectList().map(payload => (
                <Grid.Row
                  className="dashboard-list-item"
                  onClick={() => {
                    this.goToProject(
                      payload.category,
                      payload.project.projectId
                    );
                  }}
                  key={this.getId(payload.project.projectId)}
                >
                  <Grid.Column
                    width={16}
                    style={{ display: "flex", flexDirection: "row" }}
                  >
                    <DashboardIcon />
                    <div style={{ marginLeft: "10px" }}>
                      <h4 style={{ margin: 0 }}>
                        {payload.project.projectName}
                      </h4>
                      <span style={{ color: "#94989d" }}>
                        {payload.category}
                      </span>
                    </div>
                  </Grid.Column>
                </Grid.Row>
              ))}
            </Grid>
          </Grid.Column>
        </Grid>
      </React.Fragment>
    );
  };

  renderProject = () => {
    const {
      isLoading,
      projects,
      visible,
      currentCategory,
      currentIndex
    } = this.state;

    if (isLoading) {
      return (
        <div>
          <Loader className="page-loader" active={this.state.isLoading}>
            Loading
          </Loader>
        </div>
      );
    }

    if (
      Object.keys(projects).indexOf(currentCategory) != -1 &&
      projects[currentCategory].length > currentIndex &&
      currentIndex >= 0
    ) {
      return (
        <Project
          visible={visible}
          project={projects[currentCategory][currentIndex]}
          key={this.getId(projects[currentCategory][currentIndex].projectId)}
          projectId={this.getId(
            projects[currentCategory][currentIndex].projectId
          )}
          category={currentCategory}
        />
      );
    }

    return this.renderDashboard();
  };

  render() {
    const { visible, projects } = this.state;
    const paddedClass = "home-projects-wrapper padding";
    const regularClass = "home-projects-wrapper";
    return (
      <div className="home-page">
        <CreateProject />
        <EditProject />
        <CreateTask />
        <CreateCategory />
        <NavigationSidebar />
        <div className="home-content">
          <Sidebar projects={projects} />
          <div className={visible ? paddedClass : regularClass}>
            {this.renderProject()}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(HomePage);
