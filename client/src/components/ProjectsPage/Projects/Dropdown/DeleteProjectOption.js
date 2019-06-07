import React, { Component } from "react";
import store from "../../../../store";
import { handleDeleteProject } from "../../../../actions/index.js";
import { Dropdown } from "semantic-ui-react";

class DeleteProjectOption extends Component {
  constructor(props) {
    super(props);

    this.delete = this.delete.bind(this);
  }

  delete(event) {
    event.preventDefault();
    fetch("/project-service/projects", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("JWT")
      },
      body: JSON.stringify({
        projectId: this.props.projectId,
        username: store.getState().userAuthentication.username
      })
    }).then(response => {
      if (response.status === 204) {
        store.dispatch(handleDeleteProject({ project: this.props.project }));
      } else {
        console.log("Error: " + response.status);
      }
    });
  }

  render() {
    return (
      <Dropdown.Item icon="trash" text="Delete Project" onClick={this.delete} />
    );
  }
}

export default DeleteProjectOption;
