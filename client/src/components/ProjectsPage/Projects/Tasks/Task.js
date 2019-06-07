import React, { Component } from "react";
import DeleteTaskButton from "./DeleteTaskButton";
import TaskStatusButton from "./TaskStatusButton";
import { Grid } from "semantic-ui-react";

class Task extends Component {
  render() {
    return (
      <Grid columns={16} className="task-grid" divided>
        <Grid.Row verticalAlign="middle">
          <Grid.Column width={3} textAlign="center">
            {this.props.task.name}
          </Grid.Column>
          <Grid.Column width={9}>{this.props.task.description}</Grid.Column>
          <Grid.Column width={3} textAlign="center">
            <TaskStatusButton
              projectId={this.props.projectId}
              task={this.props.task}
              project={this.props.project}
            />
          </Grid.Column>
          <Grid.Column width={1} textAlign="center">
            <DeleteTaskButton
              projectId={this.props.projectId}
              task={this.props.task}
              project={this.props.project}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Task;
