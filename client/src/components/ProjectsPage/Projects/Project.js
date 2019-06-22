import React, { Component } from "react";
import "./Project.css";
import { Icon, Grid } from "semantic-ui-react";

import store from "../../../store";
import { showCreateTask } from "../../../actions/index.js";

import User from "./User";

import Task from "./Tasks/Task";
import TaskHeader from "./Tasks/TaskHeader";
import TaskFooter from "./Tasks/TaskFooter";
import CustomDivider from "../../CustomDivider/CustomDivider";
import PageHeader from "../../PageHeader/PageHeader";

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editModalShow: false,
      createTaskModalShow: false,
      active: true
    };
    this.createTask = this.createTask.bind(this);
  }

  createTask(event) {
    const payload = {
      projectId: this.props.projectId,
      project: this.props.project
    };
    store.dispatch(showCreateTask(payload));
  }

  handleClick = event => {
    if (event.target.classList.contains("btn")) return;
    const newState = this.state.active ? false : true;
    this.setState({ active: newState });
  };

  render() {
    const { project, projectId, category } = this.props;

    return (
      <React.Fragment>
        <PageHeader>
          <h2>{this.props.project.projectName}</h2>
          <Icon name="star outline" size="small" />
          <Icon name="user outline" size="small" /> {project.users.length}
        </PageHeader>
        <div className="project-content">
          <div className="project-content-header">
            <Grid stackable>
              <Grid.Column width={7} className="project-header-column">
                <h3>Project Description</h3>
                <CustomDivider from="#ec6236" to="#eb555c" />
                <div className="project-header-box">
                  <p>{project.projectDescription}</p>
                </div>
              </Grid.Column>
              <Grid.Column width={4} className="project-header-column">
                <h3>Project Members</h3>
                <CustomDivider from="#9aa0e4" to="#5642d4" />
                <div className="project-header-box">
                  <p>
                    {project.users.map(user => (
                      <User user={user} key={user} />
                    ))}
                  </p>
                </div>
              </Grid.Column>
              <Grid.Column width={5} className="project-header-column">
                <h3>Project Notes</h3>
                <CustomDivider from="#a8e063" to="#56ab2f" />
                <div className="project-header-box" />
              </Grid.Column>
            </Grid>
          </div>
          <div className="project-tasks">
            <h3>Tasks</h3>
            <CustomDivider from="#98e1eb" to="#6e9de4" />
            <div className="project-tasks-box">
              <Grid
                columns={16}
                className="task-grid"
                stackable
                divided="vertically"
              >
                {project.tasks.length > 0 ? <TaskHeader /> : null}
                {project.tasks.map(task => (
                  <Task
                    task={task}
                    projectId={projectId}
                    project={project}
                    category={category}
                    key={task.name}
                  />
                ))}
                <TaskFooter
                  projectId={projectId}
                  project={project}
                  category={category}
                />
              </Grid>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Project;
