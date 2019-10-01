import React, { Component } from "react";
import { Modal, Button, Form, Input, TextArea, Icon } from "semantic-ui-react";
import { store } from "../../store";
import { hideCreateTask } from "../../actions/index.js";
import createTask from "../../data/create/CreateTask";

class CreateTask extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      projectId: "",
      name: "",
      description: "",
      state: 0,
      project: {},
      category: ""
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
        project: store.getState().taskModalVisibility.project,
        category: store.getState().taskModalVisibility.category
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  addTask(event) {
    event.preventDefault();
    const {
      project,
      projectId,
      name,
      description,
      state,
      category
    } = this.state;
    const task = {
      name,
      description,
      state
    };
    createTask({ project, projectId, task, category });
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
        closeIcon
        className="site-modal"
        size="small"
        open={this.state.show}
        onClose={this.handleClose}
      >
        <Modal.Header>Create project</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field
              control={Input}
              label="Task Name"
              placeholder="Task Name"
              onChange={this.handleTaskNameChange}
            />
            <Form.Field
              control={TextArea}
              label="Description"
              placeholder="Task Description"
              onChange={this.handleDescriptionChange}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={this.handleClose}>
            <Icon name="remove" /> Close
          </Button>
          <Button positive type="submit" onClick={this.addTask}>
            <Icon name="checkmark" /> Submit
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default CreateTask;
