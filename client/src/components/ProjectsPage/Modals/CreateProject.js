import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import store from "../../../store";
import { hideCreateProject, handleAddProject } from "../../../actions/index.js";

class CreateProject extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      projectName: "",
      usersMap: []
    };

    this.addProject = this.addProject.bind(this);
    this.handleProjectNameChange = this.handleProjectNameChange.bind(this);
    this.clearFields = this.clearFields.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        show: store.getState().createProject.visibility,
        projectName: store.getState().createProject.projectName,
        usersMap: store.getState().createProject.usersMap
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  addProject(event) {
    event.preventDefault();
    var users = [];
    this.state.usersMap.map(user => {
      users.push(user.name);
    });
    fetch("/project-service/projects", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("JWT")
      },
      body: JSON.stringify({
        projectName: this.state.projectName,
        users: users,
        tasks: []
      })
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong ...");
        }
      })
      .then(data => {
        store.dispatch(handleAddProject({ project: data }));
        this.handleClose();
      });
  }

  clearFields() {
    this.setState({
      projectName: "",
      usersMap: [{ name: "" }]
    });
  }

  handleProjectNameChange(event) {
    this.setState({ projectName: event.target.value });
  }

  handleUserNameChange = idx => evt => {
    const newUsers = this.state.usersMap.map((user, sidx) => {
      if (idx !== sidx) return user;
      return { ...user, name: evt.target.value };
    });

    this.setState({ usersMap: newUsers });
  };

  handleSubmit = evt => {
    const { projectName, usersMap } = this.state;
    alert(`Incorporated: ${projectName} with ${usersMap.length} usersMap`);
  };

  handleAddUser = () => {
    this.setState({
      usersMap: this.state.usersMap.concat([{ name: "" }])
    });
  };

  handleRemoveUser = idx => () => {
    this.setState({
      usersMap: this.state.usersMap.filter((s, sidx) => idx !== sidx)
    });
  };

  handleClose() {
    store.dispatch(hideCreateProject());
  }

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={this.state.show}
        onHide={this.handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create project
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicProjectName">
              <Form.Label>Project name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter project name"
                onChange={this.handleProjectNameChange}
              />
            </Form.Group>
            {this.state.usersMap.map((user, idx) => (
              <div className="modal-user">
                <Form.Row className="modal-row" controlId="formBasicEmail">
                  <Col>
                    <Form.Control
                      type="text"
                      placeholder={"User #" + (idx + 1)}
                      value={user.name}
                      onChange={this.handleUserNameChange(idx)}
                    />
                  </Col>
                  <Col>
                    <Button
                      variant="danger"
                      onClick={this.handleRemoveUser(idx)}
                      className="small"
                    >
                      -
                    </Button>
                  </Col>
                </Form.Row>
              </div>
            ))}
            <Button variant="primary" onClick={this.handleAddUser}>
              Add user
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" type="submit" onClick={this.addProject}>
            Submit
          </Button>
          <Button variant="outline-primary" onClick={this.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default CreateProject;
