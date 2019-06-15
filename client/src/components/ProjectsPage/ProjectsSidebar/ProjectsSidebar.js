import React, { Component } from "react";
import "./ProjectsSidebar.css";
import store from "../../../store";
import { goToProject, showCreateProject } from "../../../actions";
import {
  Sidebar,
  Menu,
  Button,
  Divider,
  Icon,
  Search
} from "semantic-ui-react";

export default class ProjectsSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: store.getState().handleProject.projectSidebarVisibility,
      currentIndex: store.getState().handleProject.currentProjectIndex,
      value: ""
    };
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        visible: store.getState().handleProject.projectSidebarVisibility,
        currentIndex: store.getState().handleProject.currentProjectIndex
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getId = mongoId => {
    var result =
      this.pad0(mongoId.timestamp.toString(16), 8) +
      this.pad0(mongoId.machineIdentifier.toString(16), 6) +
      this.pad0(mongoId.processIdentifier.toString(16), 4) +
      this.pad0(mongoId.counter.toString(16), 6);

    return result;
  };

  pad0 = (str, len) => {
    var zeros = "00000000000000000000000000";
    if (str.length < len) {
      return zeros.substr(0, len - str.length) + str;
    }

    return str;
  };

  renderProjects = () => {
    const { projects } = this.props;
    const { currentIndex, value } = this.state;

    if (!projects) return;
    if (projects.length > 0) {
      if (currentIndex >= projects.length) {
        this.setState({
          currentIndex: projects.length - 1
        });
      }
      const filteredProjects = projects.filter(
        project =>
          project.projectName.toLowerCase().indexOf(value.toLowerCase()) !== -1
      );

      if (filteredProjects.length === 0) return "No Matching Projects.";

      return filteredProjects.map((project, i) => (
        <Menu.Item
          as="a"
          key={project.projectName}
          active={currentIndex === this.getIndex(project.projectId)}
          onClick={() => this.goToProject(project.projectId)}
        >
          <Menu.Header>{project.projectName}</Menu.Header>
        </Menu.Item>
      ));
    }
    return "You don't have any projects yet.";
  };

  createProject = () => {
    store.dispatch(showCreateProject());
  };

  getIndex = projectId => {
    const { projects } = this.props;
    for (var i = 0; i < projects.length; i++) {
      if (this.getId(projects[i].projectId) === this.getId(projectId)) {
        return i;
      }
    }
    return 0;
  };

  goToProject = projectId => {
    const index = this.getIndex(projectId);
    store.dispatch(goToProject(index));
  };

  handleSearchChange = (event, { value }) => {
    this.setState({ value });
  };

  render() {
    const { visible, value } = this.state;
    return (
      <Sidebar
        as={Menu}
        animation="push"
        icon="labeled"
        vertical
        visible={visible}
        width="wide"
        className="projects-sidebar"
        id="projects-sidebar"
      >
        <Divider />
        <div className="home-button-wrapper">
          <Button
            icon
            positive
            onClick={this.createProject}
            labelPosition="left"
          >
            <Icon name="add" />
            Add a Project
          </Button>
        </div>
        <Divider />
        <Search
          placeholder="Filter Projects"
          value={value}
          open={false}
          onSearchChange={this.handleSearchChange}
        />
        <Divider style={{ marginBottom: 0 }} />
        {this.renderProjects()}
      </Sidebar>
    );
  }
}
