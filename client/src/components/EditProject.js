import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

class EditProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectId: this.props.projectId,
      projectName: this.props.projectName,
      usersMap: [],
      users: [],
      tasks: this.props.tasks
    };

    this.props.users.map(user => {
      this.state.usersMap.push({ name: user });
    });

    this.addProject = this.addProject.bind(this);
    this.handleProjectNameChange = this.handleProjectNameChange.bind(this);
  }

  addProject(event) {
    event.preventDefault();
    this.state.usersMap.map(user => {
      this.state.users.push(user.name);
    });
    console.log(this.state.users);
    fetch("/api/projects", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        projectId: this.state.projectId,
        projectName: this.state.projectName,
        users: this.state.users,
        tasks: this.state.tasks
      })
    }).then(response => {
      console.log(response.status);
      if (response.status == 200) {
        this.props.renderProjects();
        this.props.onHide();
      } else {
        console.log("Error");
      }
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

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit project
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
                value={this.state.projectName}
              />
            </Form.Group>
            {this.state.usersMap.map((shareholder, idx) => (
              <div className="shareholder">
                <Form.Row controlId="formBasicEmail">
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
            <Button variant="primary" type="submit" onClick={this.addProject}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default EditProject;
