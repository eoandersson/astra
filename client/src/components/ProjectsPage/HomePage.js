import React, { Component } from "react";
import "./ProjectsPage.css";
import { withRouter } from "react-router-dom";

import { Loader } from "semantic-ui-react";

import Project from "./Projects/Project";

import CreateProject from "./Modals/CreateProject";
import EditProject from "./Modals/EditProject";
import CreateTask from "./Modals/CreateTask";

import SiteNavbar from "../Navbar";

import store from "./../../store";
import { handleAddProjectList } from "../../actions/index.js";
import ProjectsSidebar from "./ProjectsSidebar/ProjectsSidebar";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: store.getState().handleProject.projects,
      username: store.getState().userAuthentication.username,
      visible: store.getState().handleProject.projectSidebarVisibility,
      currentCategory: store.getState().handleProject.currentCategory,
      currentIndex: store.getState().handleProject.currentProjectIndex,
      isLoading: false
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
        username: store.getState().userAuthentication.username
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
    fetch(
      "/project-service/projects/user/" +
        store.getState().userAuthentication.username,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("JWT")
        }
      }
    )
      .then(response => {
        if (!response.ok) throw new Error(response.status);
        else return response.json();
      })
      .then(responseJson => {
        const projects = responseJson;
        this.setState({ isLoading: false });
        var payload = {
          projects: projects,
          categories: Object.keys(projects)
        };
        store.dispatch(handleAddProjectList(payload));
      })
      .catch(error => {
        console.log("error: " + error);
        this.props.history.push("/");
      });
  }

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

    return null;
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
        <SiteNavbar />
        <div className="home-content">
          <ProjectsSidebar projects={projects} />
          <div className={visible ? paddedClass : regularClass}>
            {this.renderProject()}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(HomePage);
