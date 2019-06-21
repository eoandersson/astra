import React, { Component } from "react";
import DeleteTaskButton from "./DeleteTaskButton";
import TaskStatusButton from "./TaskStatusButton";
import { Grid, Progress } from "semantic-ui-react";
import AddSubtaskButton from "./AddSubtaskButton";

class Task extends Component {
  getTaskProgress = () => {
    const { task } = this.props;
    if (task.status === 2) return 100;
    else if (task.status === 1) return 50;
    else return 0;
  };

  render() {
    const { project, projectId, task, category } = this.props;

    return (
      <Grid.Row className="task-row" verticalAlign="middle">
        <Grid.Column width={2} textAlign="center">
          <h3>{task.name}</h3>
        </Grid.Column>
        <Grid.Column width={6}>{task.description}</Grid.Column>
        <Grid.Column width={3} textAlign="center">
          <TaskStatusButton
            projectId={projectId}
            task={task}
            project={project}
            category={category}
          />
        </Grid.Column>
        <Grid.Column width={3} textAlign="center">
          <Progress
            className="task-progress-bar"
            percent={this.getTaskProgress()}
            indicating
          />
        </Grid.Column>
        <Grid.Column width={1} textAlign="center">
          <AddSubtaskButton />
        </Grid.Column>
        <Grid.Column width={1} textAlign="center">
          <DeleteTaskButton
            projectId={projectId}
            task={task}
            project={project}
            category={category}
          />
        </Grid.Column>
      </Grid.Row>
    );
  }
}

export default Task;
