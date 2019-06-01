import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import store from "./../../../store";
import { addTask, hideCreateTask } from "../../../actions/index.js";

class CreateTask extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      projectId: "",
      name: "",
      description: "",
      state: false,
      project: {}
    };

    this.addTask = this.addTask.bind(this);
    this.handleTaskNameChange = this.handleTaskNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        show: store.getState().taskModalVisibility.visibility,
        projectId: store.getState().taskModalVisibility.projectId,
        project: store.getState().taskModalVisibility.project
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  addTask(event) {
    event.preventDefault();
    fetch("/project-service/projects/task", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("JWT")
      },
      body: JSON.stringify({
        projectId: this.state.projectId,
        task: {
          name: this.state.name,
          description: this.state.description,
          state: this.state.state
        }
      })
    }).then(response => {
      if (response.status === 200) {
        var payload = {
          project: this.state.project,
          task: {
            name: this.state.name,
            description: this.state.description,
            state: this.state.state
          }
        };
        store.dispatch(addTask(payload));

        this.handleClose();
      } else {
        console.log("Error");
      }
    });
  }

  handleTaskNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleDescriptionChange(event) {
    this.setState({ description: event.target.value });
  }

  handleClose() {
    store.dispatch(hideCreateTask());
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
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                placeholder="Task name"
                onChange={this.handleTaskNameChange}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                onChange={this.handleDescriptionChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" type="submit" onClick={this.addTask}>
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

export default CreateTask;
