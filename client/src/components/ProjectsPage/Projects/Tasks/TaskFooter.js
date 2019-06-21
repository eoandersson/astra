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
      project: this.props.project,
      category: this.props.category
    };
    store.dispatch(showCreateTask(payload));
  }

  render() {
    return (
      <Grid.Row verticalAlign="middle">
        <Grid.Column width={16} textAlign="center" className="task-footer">
          <h4 className="add-task-button" onClick={this.createTask}>
            Add a New Task
          </h4>
        </Grid.Column>
      </Grid.Row>
    );
  }
}

export default TaskFooter;
