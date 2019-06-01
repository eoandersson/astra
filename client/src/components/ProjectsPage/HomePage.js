import React, { Component } from "react";
import "./ProjectsPage.css";
import { withRouter } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Project from "./Project";
import CreateProject from "./CreateProject";
import EditProject from "./EditProject";
import CreateTask from "./Tasks/CreateTask";
import SiteNavbar from "../SiteNavbar";
import store from "./../../store";
import {
  showCreateProject,
  handleAddProjectList
} from "../../actions/index.js";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      username: ""
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
        username: store.getState().userAuthentication.username
      });
      console.log(store.getState());
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
      .then(response => response.json())
      .then(responseJson => {
        const projects = responseJson;
        var outputArr = [];
        for (var i = 0; i < projects.length; i++) {
          outputArr[i] = projects[i];
        }
        store.dispatch(handleAddProjectList(outputArr));
      });
  }

  createProject() {
    store.dispatch(showCreateProject());
  }

  render() {
    return (
      <div className="home-page">
        <SiteNavbar />
        <div className="home-content">
          <div className="home-button-wrapper">
            <ButtonToolbar>
              <Button variant="success" onClick={this.createProject} size="lg">
                Create a Project
              </Button>
            </ButtonToolbar>
          </div>

          <CreateProject />
          <EditProject />
          <CreateTask />

          {this.state.projects.map(project => (
            <Project
              project={project}
              key={this.getId(project.projectId)}
              projectId={this.getId(project.projectId)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(HomePage);
