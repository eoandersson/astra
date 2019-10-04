import React, { Component } from "react";
import Linkify from "react-linkify";
import { Grid, Dropdown, Icon } from "semantic-ui-react";
import SubtaskStatusButton from "./SubtaskStatusButton";
import DeleteSubtaskButton from "./DeleteSubtaskButton";

class Subtask extends Component {
  render() {
    const { project, projectId, taskId, subtask, category } = this.props;

    return (
      <Grid.Row className="subtask-row" verticalAlign="middle">
        <Grid.Column width={2} textAlign="center">
          <Icon
            name="check"
            inverted
            style={{ transform: "rotate(45deg) scaleX(-1)" }}
          />
        </Grid.Column>
        <Grid.Column className="task-description" width={10}>
          <Linkify className="test">{subtask.description}</Linkify>
        </Grid.Column>
        <Grid.Column width={3} textAlign="center">
          <SubtaskStatusButton
            projectId={projectId}
            taskId={taskId}
            subtask={subtask}
            project={project}
            category={category}
          />
        </Grid.Column>
        <Grid.Column width={1} textAlign="center">
          <Dropdown direction="left" icon="ellipsis horizontal">
            <Dropdown.Menu>
              <Dropdown.Header icon="cog" content="Subtask Options" />
              <DeleteSubtaskButton
                projectId={projectId}
                taskId={taskId}
                subtask={subtask}
                project={project}
                category={category}
              />
            </Dropdown.Menu>
          </Dropdown>
        </Grid.Column>
      </Grid.Row>
    );
  }
}

/*
  <Grid.Column width={2} textAlign="left">
          <h5>{subtask.name}</h5>
        </Grid.Column>
  <TaskStatusButton
            projectId={projectId}
            taskName={taskName}
            subtask={subtask}
            project={project}
            category={category}
          />
          
  <AddSubtaskButton />
  <DeleteTaskButton
    projectId={projectId}
    taskName={taskName}
    subtask={subtask}
    project={project}
    category={category}
  />
*/

export default Subtask;
