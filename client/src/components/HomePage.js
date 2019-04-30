import React, { Component } from "react";
import Project from "./Project";

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = { projects: [] };
  }

  componentDidMount() {
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
    return (
      <div className="HomePage">
        {this.state.projects.map(project => (
          <Project project={project} />
        ))}
      </div>
    );
  }
}

export default HomePage;
