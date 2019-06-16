import React, { Component } from "react";
import "./ProjectsSidebar.css";
import store from "../../../store";
import {
  goToProject,
  showCategory,
  hideCategory,
  showCreateProject
} from "../../../actions";
import {
  Sidebar,
  Menu,
  Divider,
  Icon,
  Search,
  Accordion
} from "semantic-ui-react";

import ProjectDropdown from "../Projects/Dropdown/ProjectDropdown";

export default class ProjectsSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: store.getState().handleProject.projectSidebarVisibility,
      userCategories: store.getState().handleProject.userCategories,
      currentCategory: store.getState().handleProject.currentCategory,
      currentCategories: store.getState().handleProject.currentCategories,
      currentIndex: store.getState().handleProject.currentProjectIndex,
      value: ""
    };
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        visible: store.getState().handleProject.projectSidebarVisibility,
        currentCategory: store.getState().handleProject.currentCategory,
        userCategories: store.getState().handleProject.userCategories,
        currentCategories: store.getState().handleProject.currentCategories,
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

  renderStandardProjects = () => {
    const { projects } = this.props;
    const {
      currentCategory,
      currentCategories,
      currentIndex,
      userCategories
    } = this.state;

    if (!projects) return;
    const size = Object.keys(projects).length;
    if (size === 0) {
      return <Menu.Item>You don't have any projects yet.</Menu.Item>;
    } else {
      // Filter Projects Here
      return userCategories.map(category =>
        category !== "My Projects" && category !== "Shared Projects" ? null : (
          <Accordion key={category} inverted className="project-category">
            <Accordion.Title
              active={currentCategories.indexOf(category) !== -1}
              onClick={() => this.showHideCategory(category)}
              className={this.getTitleClassName(category)}
            >
              <Icon
                name={
                  currentCategories.indexOf(category) !== -1
                    ? "caret down"
                    : "caret right"
                }
              />
              {category}
            </Accordion.Title>
            <Accordion.Content
              active={currentCategories.indexOf(category) !== -1}
              className="project-category-content"
            >
              {projects[category].length === 0 ? (
                <Menu.Item>Empty.</Menu.Item>
              ) : (
                projects[category].map((project, i) => (
                  <Menu.Item
                    as="a"
                    key={project.projectName}
                    active={
                      currentCategory === category &&
                      currentIndex ===
                        this.getIndex(category, project.projectId)
                    }
                    onClick={() =>
                      this.goToProject(category, project.projectId)
                    }
                  >
                    <Menu.Header>
                      <span>{project.projectName}</span>
                      <ProjectDropdown
                        projectId={this.getId(project.projectId)}
                        project={project}
                        category={category}
                      />
                    </Menu.Header>
                  </Menu.Item>
                ))
              )}
            </Accordion.Content>
          </Accordion>
        )
      );
    }
  };

  renderProjects = () => {
    const { projects } = this.props;
    const {
      currentCategory,
      currentCategories,
      currentIndex,
      userCategories
    } = this.state;

    if (!projects) return;
    const size = Object.keys(projects).length;
    if (size === 0) {
      return <Menu.Item>You don't have any projects yet.</Menu.Item>;
    } else {
      // Filter Projects Here
      return userCategories.map(category =>
        category === "My Projects" || category === "Shared Projects" ? null : (
          <Accordion key={category} inverted className="project-category">
            <Accordion.Title
              active={currentCategories.indexOf(category) !== -1}
              onClick={() => this.showHideCategory(category)}
              className={this.getTitleClassName(category)}
            >
              <Icon
                name={
                  currentCategories.indexOf(category) !== -1
                    ? "caret down"
                    : "caret right"
                }
              />
              {category}
            </Accordion.Title>
            <Accordion.Content
              active={currentCategories.indexOf(category) !== -1}
              className="project-category-content"
            >
              {projects[category].length === 0 ? (
                <Menu.Item>Empty.</Menu.Item>
              ) : (
                projects[category].map((project, i) => (
                  <Menu.Item
                    as="a"
                    key={project.projectName}
                    active={
                      currentCategory === category &&
                      currentIndex ===
                        this.getIndex(category, project.projectId)
                    }
                    onClick={() =>
                      this.goToProject(category, project.projectId)
                    }
                  >
                    <Menu.Header>
                      <span>{project.projectName}</span>
                      <ProjectDropdown
                        projectId={this.getId(project.projectId)}
                        project={project}
                        category={category}
                      />
                    </Menu.Header>
                  </Menu.Item>
                ))
              )}
            </Accordion.Content>
          </Accordion>
        )
      );
    }
  };

  getTitleClassName = category => {
    const { currentCategories } = this.state;
    if (currentCategories.indexOf(category) === -1) {
      return "project-category-title inactive";
    } else {
      return "project-category-title";
    }
  };

  createProject = () => {
    store.dispatch(showCreateProject());
  };

  getIndex = (category, projectId) => {
    const { projects } = this.props;
    for (var i = 0; i < projects[category].length; i++) {
      if (
        this.getId(projects[category][i].projectId) === this.getId(projectId)
      ) {
        return i;
      }
    }
    return 0;
  };

  goToProject = (category, projectId) => {
    const index = this.getIndex(category, projectId);
    const payload = {
      category: category,
      index: index
    };
    store.dispatch(goToProject(payload));
  };

  showHideCategory = category => {
    const { currentCategories } = this.state;
    if (currentCategories.indexOf(category) === -1) {
      store.dispatch(showCategory(category));
    } else {
      store.dispatch(hideCategory(category));
    }
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
        inverted
      >
        <Divider />
        <Search
          placeholder="Filter Projects"
          value={value}
          open={false}
          onSearchChange={this.handleSearchChange}
        />
        <Divider />
        <div className="sidebar-button-wrapper">
          <span>Projects</span>
          <Icon name="add" onClick={this.createProject} />
        </div>
        <Divider style={{ marginBottom: 0 }} />
        {this.renderStandardProjects()}
        <Divider style={{ margin: 0 }} />
        {this.renderProjects()}
      </Sidebar>
    );
  }
}
