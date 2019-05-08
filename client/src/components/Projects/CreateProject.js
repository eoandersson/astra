import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import store from "./../../store";
import { hideCreateProject } from "../../actions/index.js";

class CreateProject extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      projectName: "",
      usersMap: [],
      users: []
    };

    console.log(this.state.show);
    store.subscribe(() => {
      this.setState({
        show: store.getState().createProject.visibility,
        projectName: store.getState().createProject.projectName,
        usersMap: store.getState().createProject.usersMap,
        users: store.getState().createProject.users
      });
    });

    this.addProject = this.addProject.bind(this);
    this.handleProjectNameChange = this.handleProjectNameChange.bind(this);
    this.clearFields = this.clearFields.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  addProject(event) {
    event.preventDefault();
    this.state.usersMap.map(user => {
      this.state.users.push(user.name);
    });
    console.log(this.state.users);
    fetch("/api/projects", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        projectName: this.state.projectName,
        users: this.state.users,
        tasks: []
      })
    }).then(response => {
      console.log(response.status);
      if (response.status == 200) {
        this.props.renderProjects();
        this.handleClose();
      } else {
        console.log("Error");
      }
    });
  }

  clearFields() {
    this.setState({
      projectName: "",
      usersMap: [{ name: "" }],
      users: []
    });
  }

  handleProjectNameChange(event) {
    this.setState({ projectName: event.target.value });
  }

  handleShareholderNameChange = idx => evt => {
    const newShareholders = this.state.usersMap.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, name: evt.target.value };
    });

    this.setState({ usersMap: newShareholders });
  };

  handleSubmit = evt => {
    const { projectName, usersMap } = this.state;
    alert(`Incorporated: ${projectName} with ${usersMap.length} usersMap`);
  };

  handleAddShareholder = () => {
    this.setState({
      usersMap: this.state.usersMap.concat([{ name: "" }])
    });
  };

  handleRemoveShareholder = idx => () => {
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
            {this.state.usersMap.map((shareholder, idx) => (
              <div className="shareholder">
                <Form.Row className="ModalRow" controlId="formBasicEmail">
                  <Col>
                    <Form.Control
                      type="text"
                      placeholder={"User #" + (idx + 1)}
                      value={shareholder.name}
                      onChange={this.handleShareholderNameChange(idx)}
                    />
                  </Col>
                  <Col>
                    <Button
                      variant="danger"
                      onClick={this.handleRemoveShareholder(idx)}
                      className="small"
                    >
                      -
                    </Button>
                  </Col>
                </Form.Row>
              </div>
            ))}
            <Button variant="primary" onClick={this.handleAddShareholder}>
              Add user
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" type="submit" onClick={this.addProject}>
            Submit
          </Button>
          <Button variant="outline-primary" onClick={this.props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default CreateProject;
