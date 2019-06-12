import React, { Component } from "react";
import { Grid } from "semantic-ui-react";

class TaskHeader extends Component {
  render() {
    return (
      <Grid columns={16} className="task-header" divided>
        <Grid.Row verticalAlign="middle">
          <Grid.Column width={3} textAlign="center">
            Task Name
          </Grid.Column>
          <Grid.Column width={8}>Description</Grid.Column>
          <Grid.Column width={3} textAlign="center">
            Status
          </Grid.Column>
          <Grid.Column width={2} textAlign="center">
            Options
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default TaskHeader;
