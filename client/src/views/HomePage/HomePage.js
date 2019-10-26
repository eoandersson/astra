import React, { Component } from "react";
import "./ProjectsPage.css";
import { Switch, Route, withRouter } from "react-router-dom";
import { store } from "../../store";
import getUserProjects from "../../data/read/GetUserProjects";
import getProjectFromId from "../../data/read/GetProjectFromId";
import { goToProject } from "../../actions/index.js";
import { Loader } from "semantic-ui-react";

import Project from "../../components/Project/Project";

import CreateProject from "../../components/Modals/CreateProject";
import EditProject from "../../components/Modals/EditProject";
import CreateTask from "../../components/Modals/CreateTask";
import CreateCategory from "../../components/Modals/CreateCategory";

import Sidebar from "../../components/Sidebar/Sidebar";
import NavigationSidebar from "../../components/NavigationSidebar/NavigationSidebar";

import getId from "../../utils/ParseObjectId";
import Dashboard from "../../components/Dashboard/Dashboard";

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

  renderProjects() {
    const { location } = this.props;

    const urlParts = location.pathname.split("/");
    const urlCategory = urlParts.length >= 4 ? urlParts[2] : null;
    const urlProjectId = urlParts.length >= 4 ? urlParts[3] : null;

    const parsedCategory = urlCategory ? urlCategory.replace("-", " ") : null;

    this.setState({ isLoading: true });

    getUserProjects(urlCategory, urlProjectId);
    if (urlCategory && urlProjectId) {
      getProjectFromId(urlProjectId, parsedCategory);
    }
  }

  goToProject = (category, projectId) => {
    const { history } = this.props;

    const payload = {
      category,
      projectId
    };

    store.dispatch(goToProject(payload));
    const parsedCategory = category.replace(" ", "-");
    history.push("/home/" + parsedCategory + "/" + getId(projectId));
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
      Object.keys(projects).indexOf(currentCategory) !== -1 &&
      projects[currentCategory].length > currentIndex &&
      currentIndex >= 0
    ) {
      return (
        <Project
          visible={visible}
          project={projects[currentCategory][currentIndex]}
          key={getId(projects[currentCategory][currentIndex].projectId)}
          projectId={getId(projects[currentCategory][currentIndex].projectId)}
          category={currentCategory}
        />
      );
    }

    return null;
  };

  render() {
    const { username, visible, projects } = this.state;

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
            <Switch>
              <Route exact path="/home">
                <Dashboard username={username} projects={projects} />
              </Route>
              <Route exact path="/home/:category/:id">
                {this.renderProject()}
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(HomePage);
