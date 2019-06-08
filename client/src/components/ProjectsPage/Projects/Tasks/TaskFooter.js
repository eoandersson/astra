import React, { Component } from "react";
import { Grid, Button } from "semantic-ui-react";
import store from "../../../../store";
import { showCreateTask } from "../../../../actions/index.js";

class TaskFooter extends Component {
  constructor(props) {
    super(props);
    this.createTask = this.createTask.bind(this);
  }

  createTask(event) {
    const payload = {
      projectId: this.props.projectId,
      project: this.props.project
    };
    store.dispatch(showCreateTask(payload));
  }

  render() {
    return (
      <Grid columns={16} className="task-footer" divided>
        <Grid.Row verticalAlign="middle">
          <Grid.Column width={16} textAlign="center">
            <Button positive onClick={this.createTask}>
              Add Task
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default TaskFooter;
