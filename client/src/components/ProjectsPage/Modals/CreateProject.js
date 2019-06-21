import React, { Component } from "react";
import {
  Modal,
  Button,
  Icon,
  Form,
  Input,
  Divider,
  TextArea
} from "semantic-ui-react";
import store from "../../../store";
import { hideCreateProject, handleAddProject } from "../../../actions/index.js";

class CreateProject extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      projectName: "",
      projectDescription: "",
      usersMap: [],
      category: "My Projects",
      userCategories: store.getState().handleProject.userCategories
    };

    this.addProject = this.addProject.bind(this);
    this.handleProjectNameChange = this.handleProjectNameChange.bind(this);
    this.handleProjectDescriptionChange = this.handleProjectDescriptionChange.bind(
      this
    );
    this.clearFields = this.clearFields.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        show: store.getState().createProject.visibility,
        projectName: store.getState().createProject.projectName,
        projectDescription: store.getState().createProject.projectDescription,
        usersMap: store.getState().createProject.usersMap,
        userCategories: store.getState().handleProject.userCategories
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  addProject(event) {
    event.preventDefault();
    var users = [];
    users.push(store.getState().userAuthentication.username);
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
        project: {
          projectName: this.state.projectName,
          projectDescription: this.state.projectDescription,
          users: users,
          tasks: []
        },
        projectCategory: this.state.category
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
        store.dispatch(handleAddProject({ data }));
        this.handleClose();
      });
  }

  clearFields() {
    this.setState({
      projectName: "",
      projectDescription: "",
      usersMap: [{ name: "" }]
    });
  }

  handleProjectNameChange(event) {
    this.setState({ projectName: event.target.value });
  }

  handleProjectDescriptionChange(event) {
    this.setState({ projectDescription: event.target.value });
  }

  handleUserNameChange = idx => evt => {
    const newUsers = this.state.usersMap.map((user, sidx) => {
      if (idx !== sidx) return user;
      return { ...user, name: evt.target.value };
    });

    this.setState({ usersMap: newUsers });
  };

  handleAddUser = event => {
    event.preventDefault();
    this.setState({
      usersMap: this.state.usersMap.concat([{ name: "" }])
    });
  };

  handleRemoveUser = idx => () => {
    this.setState({
      usersMap: this.state.usersMap.filter((s, sidx) => idx !== sidx)
    });
  };

  handleCategoryChange = (event, result) => {
    const { value } = result;
    this.setState({
      category: value
    });
  };

  handleClose() {
    store.dispatch(hideCreateProject());
  }

  getOptions() {
    const { userCategories } = this.state;
    const sortedCategories = ["My Projects", "Shared Projects"];
    userCategories.sort().forEach(function(category) {
      if (category !== "My Projects" && category !== "Shared Projects")
        sortedCategories.push(category);
    });

    const options = sortedCategories.map(category => ({
      key: category,
      text: category,
      value: category
    }));
    return options;
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
            <Form.Group>
              <Form.Field
                control={Input}
                label="Project Name"
                placeholder="Enter Project Name"
                onChange={this.handleProjectNameChange}
                width={10}
              />
              <Form.Select
                fluid
                label="Category"
                options={this.getOptions()}
                placeholder="My Projects"
                defaultValue="My Projects"
                width={6}
                onChange={this.handleCategoryChange}
              />
            </Form.Group>
            <Divider />
            <Form.Field
              control={TextArea}
              label="Project Description"
              placeholder="Enter Project Description"
              onChange={this.handleProjectDescriptionChange}
            />
            <Divider />
            <p>
              <i>Note: You will automatically be added to the project.</i>
            </p>
            {this.state.usersMap.map((user, idx) => (
              <div className="modal-user" key={user.name}>
                <Form.Group className="modal-row">
                  <Form.Input
                    placeholder={"User #" + (idx + 2)}
                    value={user.name}
                    onChange={this.handleUserNameChange(idx)}
                    width={6}
                  />
                  <Button
                    negative
                    icon="delete"
                    onClick={this.handleRemoveUser(idx)}
                    size="small"
                  />
                </Form.Group>
              </div>
            ))}
            <Button color="blue" onClick={this.handleAddUser}>
              <Icon name="add" />
              Add Another User
            </Button>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={this.handleClose}>
            <Icon name="remove" /> Close
          </Button>
          <Button positive type="submit" onClick={this.addProject}>
            <Icon name="checkmark" /> Submit
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default CreateProject;
