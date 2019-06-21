import React, { Component } from "react";
import { Grid } from "semantic-ui-react";

class TaskHeader extends Component {
  render() {
    return (
      <Grid.Row className="task-header" verticalAlign="middle" only="computer">
        <Grid.Column width={2} textAlign="center" />
        <Grid.Column width={6} textAlign="center">
          Description
        </Grid.Column>
        <Grid.Column width={3} textAlign="center">
          Status
        </Grid.Column>
        <Grid.Column width={3} textAlign="center">
          Progress
        </Grid.Column>
        <Grid.Column width={2} textAlign="center">
          Options
        </Grid.Column>
      </Grid.Row>
    );
  }
}

export default TaskHeader;
