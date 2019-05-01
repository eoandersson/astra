import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class DeleteProjectButton extends Component {
  constructor(props) {
    super(props);

    this.delete = this.delete.bind(this);
  }

  delete(event) {
    event.preventDefault();
    fetch("/api/projects", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        projectId: this.props.projectId,
        username: "Karl"
      })
    }).then(response => {
      console.log(response.status);
      if (response.status == 204) {
        console.log("Removed");
        this.props.renderProjects();
      } else {
        console.log("Error");
      }
    });
  }

  render() {
    return (
      <Button variant="danger" type="submit" onClick={this.delete}>
        Delete
      </Button>
    );
  }
}

export default DeleteProjectButton;
