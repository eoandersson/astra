import React, { Component } from "react";
import Linkify from "react-linkify";
import DeleteTaskButton from "./DeleteTaskButton";
import TaskStatusButton from "./TaskStatusButton";
import {
  Grid,
  Progress,
  Dropdown,
  Button,
  Form,
  TextArea
} from "semantic-ui-react";
import AddSubtaskButton from "./AddSubtaskButton";
import Subtask from "../Subtask/Subtask";

import createSubtask from "../../data/create/CreateSubtask";

class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showCreateSubtask: false,
      subtaskName: "",
      subtaskDescription: ""
    };
  }

  addSubtask = () => {
    const { project, projectId, task, category } = this.props;
    const { subtaskName, subtaskDescription } = this.state;

    const subtask = {
      name: subtaskName,
      description: subtaskDescription
    };

    this.setState({
      showCreateSubtask: false,
      subtaskName: "",
      subtaskDescription: ""
    });

    createSubtask({
      project,
      projectId,
      taskName: task.name,
      subtask,
      category
    });
  };

  handleSubtaskNameChange = event => {
    this.setState({ subtaskName: event.target.value });
  };

  handleSubtaskDescriptionChange = event => {
    this.setState({ subtaskDescription: event.target.value });
  };

  toggleCreateSubtask = () => {
    this.setState({
      showCreateSubtask: !this.state.showCreateSubtask
    });
  };

  getTaskProgress = () => {
    const { task } = this.props;
    const subtasks = task.subtasks;

    if (subtasks && subtasks.length > 0) {
      let progress = 0;
      for (var i = 0; i < subtasks.length; i++) {
        if (subtasks[i].status === 2) progress += 100;
        else if (subtasks[i].status === 1) progress += 50;
      }
      return progress / subtasks.length;
    } else {
      if (task.status === 2) return 100;
      else if (task.status === 1) return 50;
      else return 0;
    }
  };

  renderTaskStatusButton = () => {
    const { project, projectId, task, category } = this.props;
    const subtasks = task.subtasks;

    if (subtasks != null && subtasks.length > 0) {
      return null;
    }

    return (
      <TaskStatusButton
        projectId={projectId}
        task={task}
        project={project}
        category={category}
      />
    );
  };

  renderCreateSubtask = () => {
    const { showCreateSubtask } = this.state;

    if (showCreateSubtask == false) {
      return null;
    }

    return (
      <Grid.Row className="subtask-row" verticalAlign="top">
        <Grid.Column width={2} textAlign="center">
          <Form inverted onSubmit={this.addSubtask}>
            <Form.Input
              placeholder="Name"
              onChange={this.handleSubtaskNameChange}
            />
          </Form>
        </Grid.Column>
        <Grid.Column className="task-description" width={10}>
          <Form inverted onSubmit={this.addSubtask}>
            <Form.Input
              placeholder="Task Description"
              onChange={this.handleSubtaskDescriptionChange}
            />
          </Form>
        </Grid.Column>
        <Grid.Column width={4} textAlign="center">
          <Button
            positive
            icon="check"
            content="Save"
            style={{ marginBottom: "5px" }}
            onClick={this.addSubtask}
          />
          <Button
            negative
            icon="cancel"
            content="Cancel"
            onClick={this.toggleCreateSubtask}
          />
        </Grid.Column>
      </Grid.Row>
    );
  };

  renderSubtasks = () => {
    const { project, projectId, task, category } = this.props;

    if (task.subtasks && task.subtasks.length > 0) {
      return task.subtasks.map(subtask => {
        return (
          <Subtask
            subtask={subtask}
            taskName={task.name}
            projectId={projectId}
            project={project}
            category={category}
            key={subtask.name}
          />
        );
      });
    }
  };

  render() {
    const { project, projectId, task, category } = this.props;
    const { showCreateSubtask } = this.state;

    return (
      <React.Fragment>
        <Grid.Row
          className={
            !showCreateSubtask && (!task.subtasks || task.subtasks.length == 0)
              ? "task-row"
              : "task-row shadow"
          }
          verticalAlign="middle"
        >
          <Grid.Column width={2} textAlign="center">
            <h3>{task.name}</h3>
          </Grid.Column>
          <Grid.Column className="task-description" width={7}>
            <Linkify className="test">{task.description}</Linkify>
          </Grid.Column>
          <Grid.Column width={3} textAlign="center">
            {this.renderTaskStatusButton()}
          </Grid.Column>
          <Grid.Column width={3} textAlign="center">
            <Progress
              className="task-progress-bar"
              percent={this.getTaskProgress()}
              indicating
            />
          </Grid.Column>
          <Grid.Column width={1} textAlign="center">
            <Dropdown direction="left" icon="ellipsis horizontal">
              <Dropdown.Menu>
                <Dropdown.Header icon="cog" content="Task Options" />
                <Dropdown.Item
                  text="Add a Subtask"
                  icon="add"
                  onClick={this.toggleCreateSubtask}
                />
                ;
                <DeleteTaskButton
                  projectId={projectId}
                  task={task}
                  project={project}
                  category={category}
                />
              </Dropdown.Menu>
            </Dropdown>
          </Grid.Column>
        </Grid.Row>
        {this.renderSubtasks()}
        {this.renderCreateSubtask()}
      </React.Fragment>
    );
  }
}

export default Task;
