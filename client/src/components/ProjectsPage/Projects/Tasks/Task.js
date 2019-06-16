import React, { Component } from "react";
import DeleteTaskButton from "./DeleteTaskButton";
import TaskStatusButton from "./TaskStatusButton";
import { Grid } from "semantic-ui-react";
import AddSubtaskButton from "./AddSubtaskButton";

class Task extends Component {
  render() {
    return (
      <Grid columns={16} className="task-grid" divided>
        <Grid.Row verticalAlign="middle">
          <Grid.Column width={3} textAlign="center">
            {this.props.task.name}
          </Grid.Column>
          <Grid.Column width={8}>{this.props.task.description}</Grid.Column>
          <Grid.Column width={3} textAlign="center">
            <TaskStatusButton
              projectId={this.props.projectId}
              task={this.props.task}
              project={this.props.project}
              category={this.props.category}
            />
          </Grid.Column>
          <Grid.Column width={1} textAlign="center">
            <AddSubtaskButton />
          </Grid.Column>
          <Grid.Column width={1} textAlign="center">
            <DeleteTaskButton
              projectId={this.props.projectId}
              task={this.props.task}
              project={this.props.project}
              category={this.props.category}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Task;
