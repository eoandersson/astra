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
      currentIndex: store.getState().handleProject.currentProjectIndex
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

  renderProjects = () => {
    const { projects } = this.props;
    const { currentIndex } = this.state;

    if (!projects) return;
    if (projects.length > 0) {
      if (currentIndex >= projects.length) {
        this.setState({
          currentIndex: projects.length - 1
        });
      }
      return projects.map((project, i) => (
        <Menu.Item
          as="a"
          key={project.projectName}
          active={currentIndex === i}
          onClick={() => this.goToProject(i)}
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

  goToProject = index => {
    store.dispatch(goToProject(index));
  };

  render() {
    const { visible } = this.state;
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
        <Search placeholder="Filter Projects" />
        <Divider style={{ marginBottom: 0 }} />
        {this.renderProjects()}
      </Sidebar>
    );
  }
}
