import React, { Component } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  Icon,
  Divider,
  TextArea
} from "semantic-ui-react";
import { store } from "../../store";
import { hideEditProject } from "../../actions/index.js";
import updateProject from "../../data/update/UpdateProject";

class EditProject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      projectId: this.props.projectId,
      projectName: this.props.projectName,
      projectDescription: this.props.projectDescription,
      project: {},
      usersMap: [],
      users: [],
      tasks: this.props.tasks,
      category: ""
    };

    this.editProject = this.editProject.bind(this);
    this.handleProjectNameChange = this.handleProjectNameChange.bind(this);
    this.handleProjectDescriptionChange = this.handleProjectDescriptionChange.bind(
      this
    );
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        show: store.getState().editModalVisibility.visibility,
        projectId: store.getState().editModalVisibility.projectId,
        projectName: store.getState().editModalVisibility.projectName,
        projectDescription: store.getState().editModalVisibility
          .projectDescription,
        project: store.getState().editModalVisibility.project,
        usersMap: store.getState().editModalVisibility.usersMap,
        tasks: store.getState().editModalVisibility.tasks,
        category: store.getState().editModalVisibility.category
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  editProject(event) {
    event.preventDefault();
    const {
      project,
      projectId,
      projectName,
      projectDescription,
      tasks,
      category,
      usersMap
    } = this.state;
    
    var users = [];
    for(const user of usersMap) {
      users.push(user.name);
    }
  
    updateProject({
      project,
      projectId,
      projectName,
      projectDescription,
      tasks,
      users,
      category
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
        closeIcon
        className="site-modal"
        size="small"
        open={this.state.show}
        onClose={this.handleClose}
      >
        <Modal.Header>Edit project ({this.state.projectId})</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field
              label="Project Name"
              control={Input}
              placeholder="Enter Project Name"
              onChange={this.handleProjectNameChange}
              value={this.state.projectName}
            />
            <Divider />
            <Form.Field
              label="Project Description"
              control={TextArea}
              placeholder="Enter Project Description"
              onChange={this.handleProjectDescriptionChange}
              value={this.state.projectDescription}
            />
            <Divider />
            {this.state.usersMap.map((user, idx) => (
              <div className="edit-user">
                <Form.Group className="modal-row">
                  <Form.Input
                    placeholder={"User #" + (idx + 1)}
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
          <Button positive type="submit" onClick={this.editProject}>
            <Icon name="checkmark" /> Save
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default EditProject;
