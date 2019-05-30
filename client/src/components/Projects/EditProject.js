import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import store from "./../../store";
import { hideEditProject, handleEditProject } from "../../actions/index.js";

class EditProject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      projectId: this.props.projectId,
      projectName: this.props.projectName,
      project: {},
      usersMap: [],
      users: [],
      tasks: this.props.tasks
    };

    this.updateProject = this.updateProject.bind(this);
    this.handleProjectNameChange = this.handleProjectNameChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        show: store.getState().editModalVisibility.visibility,
        projectId: store.getState().editModalVisibility.projectId,
        projectName: store.getState().editModalVisibility.projectName,
        project: store.getState().editModalVisibility.project,
        usersMap: store.getState().editModalVisibility.usersMap,
        tasks: store.getState().editModalVisibility.tasks
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  updateProject(event) {
    event.preventDefault();
    var users = [];
    this.state.usersMap.map(user => {
      users.push(user.name);
    });
    fetch("/project-service/projects", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        projectId: this.state.projectId,
        projectName: this.state.projectName,
        users: users,
        tasks: this.state.tasks
      })
    }).then(response => {
      if (response.status === 200) {
        var payload = {
          project: this.state.project,
          projectName: this.state.projectName,
          users: users
        };
        store.dispatch(handleEditProject(payload));
        this.handleClose();
      } else {
        console.log("Error");
      }
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
    store.dispatch(hideEditProject());
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
            Edit project ({this.state.projectId})
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Project name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter project name"
                onChange={this.handleProjectNameChange}
                value={this.state.projectName}
              />
            </Form.Group>
            {this.state.usersMap.map((user, idx) => (
              <div className="edit-user">
                <Form.Row className="ModalRow">
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
          <Button variant="success" type="submit" onClick={this.updateProject}>
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

export default EditProject;
