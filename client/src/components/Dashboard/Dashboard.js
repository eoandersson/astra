import React, { Component } from "react";
import {
  Grid,
  Icon,
  Dropdown,
  Divider,
  Placeholder,
  Segment
} from "semantic-ui-react";
import { withRouter } from "react-router-dom";

import { store } from "../../store";
import { goToProject } from "../../actions/index.js";

import DashboardIcon from "../DashboardIcon";
import PageHeader from "../PageHeader";

import getId from "../../utils/ParseObjectId";

class Dashboard extends Component {
  componentDidMount() {
    document.title = "Astra";
  }

  getProjectList = () => {
    const { projects } = this.props;
    const categories = Object.keys(projects);
    const projectOutput = [];

    for (var i = 0; i < categories.length; i++) {
      for (var j = 0; j < projects[categories[i]].length; j++) {
        var payload = {
          category: categories[i],
          project: projects[categories[i]][j]
        };
        projectOutput.push(payload);
      }
    }

    return projectOutput;
  };

  goToProject = (category, projectId) => {
    const { history } = this.props;

    const payload = {
      category,
      projectId
    };

    store.dispatch(goToProject(payload));
    const parsedCategory = category.replace(" ", "-");
    history.push("/home/" + parsedCategory + "/" + getId(projectId));
  };

  renderPlaceHolder = () => {
    return (
      <Grid.Row>
        <Segment raised>
          <Placeholder>
            <Placeholder.Header image>
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Header>
            <Placeholder.Paragraph>
              <Placeholder.Line length="long" />
              <Placeholder.Line length="long" />
              <Placeholder.Line length="long" />
              <Placeholder.Line length="medium" />
            </Placeholder.Paragraph>
          </Placeholder>
        </Segment>
      </Grid.Row>
    );
  };

  render() {
    const { username } = this.props;

    return (
      <React.Fragment>
        <PageHeader>
          <h2>Projects Dashboard</h2>
        </PageHeader>
        <Grid className="dashboard-body" stackable>
          <Grid.Column className="dashboard-greeting" width={11}>
            <h3>Welcome to Astra, {username}!</h3>
            <div className="dashboard-greeting-content">
              {this.renderPlaceHolder()}
              {this.renderPlaceHolder()}
              {this.renderPlaceHolder()}
            </div>
          </Grid.Column>
          <Grid.Column className="dashboard-projects" width={5}>
            <div className="dashboard-projects-header">
              <h3>Recent Projects</h3>
              <div>
                <Icon name="list" />
                <Dropdown direction="left">
                  <Dropdown.Menu>
                    <Dropdown.Item text="View as list" />
                    <Dropdown.Item disabled text="View as tiles" />
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <Divider style={{ marginTop: "0px" }} />
            <Grid>
              {this.getProjectList().map(payload => (
                <Grid.Row
                  className="dashboard-list-item"
                  onClick={() => {
                    this.goToProject(
                      payload.category,
                      payload.project.projectId
                    );
                  }}
                  key={getId(payload.project.projectId)}
                >
                  <Grid.Column
                    width={16}
                    style={{ display: "flex", flexDirection: "row" }}
                  >
                    <DashboardIcon />
                    <div style={{ marginLeft: "10px" }}>
                      <h4 style={{ margin: 0 }}>
                        {payload.project.projectName}
                      </h4>
                      <span style={{ color: "#94989d" }}>
                        {payload.category}
                      </span>
                    </div>
                  </Grid.Column>
                </Grid.Row>
              ))}
            </Grid>
          </Grid.Column>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withRouter(Dashboard);
