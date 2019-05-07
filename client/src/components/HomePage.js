import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Project from "./Projects/Project";
import CreateProject from "./Projects/CreateProject";
import EditProject from "./Projects/EditProject";
import HomeNavbar from "./HomeNavbar";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { projects: [], modalShow: false };
    this.renderProjects = this.renderProjects.bind(this);
    this.getId = this.getId.bind(this);
    this.pad0 = this.pad0.bind(this);
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

  componentDidMount() {
    this.renderProjects();
  }

  renderProjects() {
    fetch("/api/projects", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("JWT")
      }
    })
      //.then(response => console.log("Bearer " + localStorage.getItem("JWT")))
      //.then(response => console.log(response))
      .then(response => response.json())
      .then(responseJson => {
        const projects = responseJson;
        var outputArr = [];
        for (var i = 0; i < projects.length; i++) {
          outputArr[i] = projects[i];
        }
        this.setState({ projects: outputArr });
      });
  }

  render() {
    let modalClose = () => this.setState({ modalShow: false });
    return (
      <div className="HomePage">
        <HomeNavbar />
        <div className="HomeContent">
          <div className="HomeButtonWrapper">
            <ButtonToolbar>
              <Button
                variant="success"
                onClick={() => this.setState({ modalShow: true })}
                size="lg"
              >
                Create a New Project
              </Button>
            </ButtonToolbar>
          </div>

          <CreateProject
            show={this.state.modalShow}
            onHide={modalClose}
            renderProjects={this.renderProjects}
          />

          <EditProject renderProjects={this.renderProjects} />

          {this.state.projects.map(
            project => (
              console.log(this.getId(project.projectId)),
              (
                <Project
                  project={project}
                  key={this.getId(project.projectId)}
                  projectId={this.getId(project.projectId)}
                  renderProjects={this.renderProjects}
                />
              )
            )
          )}
        </div>
      </div>
    );
  }
}

export default HomePage;
