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
        var outputArr = [];
        for (var i = 0; i < projects.length; i++) {
          outputArr[i] = projects[i];
        }
        this.setState({ isLoading: false });
        store.dispatch(handleAddProjectList(outputArr));
      })
      .catch(error => {
        console.log("error: " + error);
        this.props.history.push("/");
      });
  }

  render() {
    const { visible, currentIndex, projects } = this.state;
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
            {this.state.isLoading && projects.length === 0 ? (
              <div>
                <Loader className="page-loader" active={this.state.isLoading}>
                  Loading
                </Loader>
              </div>
            ) : projects.length > 0 ? (
              <Project
                visible={visible}
                project={projects[currentIndex]}
                key={this.getId(projects[currentIndex].projectId)}
                projectId={this.getId(projects[currentIndex].projectId)}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(HomePage);
