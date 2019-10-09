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
  Icon
} from "semantic-ui-react";
import Subtask from "../Subtask/Subtask";

import updateTask from "../../data/update/UpdateTask";
import createSubtask from "../../data/create/CreateSubtask";

class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {
      taskName: this.props.task.name,
      taskDescription: this.props.task.description,
      showEditTask: false,
      showCreateSubtask: false,
      showSubtasks: false,
      subtaskName: "",
      subtaskDescription: ""
    };
  }

  parseObjectId = mongoId => {
    var result =
      this.pad0(mongoId.timestamp.toString(16), 8) +
      this.pad0(mongoId.machineIdentifier.toString(16), 6) +
      this.pad0(mongoId.processIdentifier.toString(16), 4) +
      this.pad0(mongoId.counter.toString(16), 6);

    return result;
  };

  pad0 = (str, len) => {
    var zeros = "00000000000000000000000000";
    if (str.length < len) {
      return zeros.substr(0, len - str.length) + str;
    }

    return str;
  };

  toggleEditTask = () => {
    this.setState({
      showEditTask: !this.state.showEditTask
    });
  };

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
      taskId: task.taskId,
      subtask,
      category
    });
  };

  editTask = () => {
    const { project, projectId, task, category } = this.props;
    const { taskName, taskDescription } = this.state;

    const output = {
      project,
      projectId,
      task: {
        taskId: task.taskId,
        name: taskName,
        description: taskDescription,
        status: task.status,
        subtasks: task.subtasks
      },
      status: task.status,
      category
    };
    updateTask(output);
    this.setState({
      showEditTask: false
    });
  };

  handleTaskNameChange = event => {
    this.setState({ taskName: event.target.value });
  };

  handleTaskDescriptionChange = event => {
    this.setState({ taskDescription: event.target.value });
  };

  handleSubtaskNameChange = event => {
    this.setState({ subtaskName: event.target.value });
  };

  handleSubtaskDescriptionChange = event => {
    this.setState({ subtaskDescription: event.target.value });
  };

  toggleCreateSubtask = () => {
    const { task } = this.props;
    const { showCreateSubtask } = this.state;

    let newShowSubtasks = true;
    if ((!task.subtasks || task.subtasks.length === 0) && showCreateSubtask) {
      newShowSubtasks = false;
    }

    this.setState({
      showCreateSubtask: !showCreateSubtask,
      showSubtasks: newShowSubtasks
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

  toggleShowSubtasks = () => {
    this.setState({
      showSubtasks: !this.state.showSubtasks
    });
  };

  renderNameIcon = () => {
    const { task } = this.props;
    const { showSubtasks } = this.state;

    if (task.subtasks && task.subtasks.length > 0 && showSubtasks) {
      return (
        <Icon
          name="caret down"
          className="expand-task-icon"
          onClick={this.toggleShowSubtasks}
        />
      );
    }
    if (task.subtasks && task.subtasks.length > 0 && !showSubtasks) {
      return (
        <Icon
          name="caret right"
          className="expand-task-icon"
          onClick={this.toggleShowSubtasks}
        />
      );
    }
    return null;
  };

  renderTaskName = () => {
    const { task } = this.props;
    const { showEditTask, taskName } = this.state;

    if (showEditTask) {
      return (
        <Form inverted onSubmit={this.editTask}>
          <Form.Input
            placeholder="Name"
            value={taskName}
            onChange={this.handleTaskNameChange}
          />
        </Form>
      );
    }
    return (
      <React.Fragment>
        {this.renderNameIcon()}
        <h3 style={{ width: "fitContent", margin: 0 }}>{task.name}</h3>
        {task.subtasks && task.subtasks.length > 0 ? (
          <Icon name="caret right offset-icon" style={{ opacity: 0 }} />
        ) : null}
      </React.Fragment>
    );
  };

  renderTaskDescription = () => {
    const { task } = this.props;
    const { showEditTask, taskDescription } = this.state;

    if (showEditTask) {
      return (
        <Form inverted onSubmit={this.editTask}>
          <Form.Input
            placeholder="Task Description"
            value={taskDescription}
            onChange={this.handleTaskDescriptionChange}
          />
        </Form>
      );
    }
    return <Linkify className="test">{task.description}</Linkify>;
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
              autoFocus
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
    const { showSubtasks } = this.state;

    if (task.subtasks && task.subtasks.length > 0 && showSubtasks) {
      return task.subtasks.map(subtask => {
        return (
          <Subtask
            subtask={subtask}
            taskId={task.taskId}
            projectId={projectId}
            project={project}
            category={category}
            key={this.parseObjectId(subtask.subtaskId)}
          />
        );
      });
    }
    return null;
  };

  getRowClassName = () => {
    const { task } = this.props;
    const { showSubtasks, showCreateSubtask } = this.state;

    if (
      task.subtasks &&
      task.subtasks.length > 0 &&
      (showCreateSubtask || showSubtasks)
    ) {
      return "task-row shadow";
    }
    return "task-row";
  };

  render() {
    const { project, projectId, task, category } = this.props;

    return (
      <React.Fragment>
        <Grid.Row className={this.getRowClassName()} verticalAlign="middle">
          <Grid.Column
            width={2}
            textAlign="center"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
            {this.renderTaskName()}
          </Grid.Column>
          <Grid.Column className="task-description" width={7}>
            {this.renderTaskDescription()}
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
          <Grid.Column width={1} textAlign="center" style={{ padding: 0 }}>
            <Dropdown direction="left" icon="ellipsis horizontal">
              <Dropdown.Menu>
                <Dropdown.Header icon="cog" content="Task Options" />
                <Dropdown.Divider />
                <Dropdown.Item
                  text="Add a Subtask"
                  icon="add"
                  onClick={this.toggleCreateSubtask}
                />
                <Dropdown.Item
                  text="Edit Task"
                  icon="edit"
                  onClick={this.toggleEditTask}
                />
                <Dropdown.Divider />
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

/*
  

*/

export default Task;
