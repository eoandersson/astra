import React, { Component } from "react";
import "./Sidebar.css";
import { store } from "../../store";
import { showCreateProject } from "../../actions";
import { Sidebar, Menu, Divider } from "semantic-ui-react";
import { withRouter } from "react-router-dom";

import CreateCategoryOption from "./CreateCategoryOption";
import Category from "./SidebarCategory";
import CreateProjectOption from "./CreateProjectOption";
import SearchField from "./SearchField";

class ProjectsSidebar extends Component {
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
      return userCategories.map(category =>
        category !== "My Projects" && category !== "Shared Projects" ? null : (
          <Category
            key={category}
            category={category}
            currentCategories={currentCategories}
            currentCategory={currentCategory}
            currentIndex={currentIndex}
            projects={projects}
          />
        )
      );
    }
  };

  renderProjects = () => {
    const { projects } = this.props;
    const { currentCategory, currentCategories, currentIndex } = this.state;

    if (!projects) return;
    const size = Object.keys(projects).length;
    if (size > 0) {
      // Filter Projects Here
      const sortedCategories = [];
      Object.keys(projects)
        .sort()
        .forEach(function(key) {
          sortedCategories.push(key);
        });

      return sortedCategories.map(category =>
        category === "My Projects" || category === "Shared Projects" ? null : (
          <Category
            key={category}
            category={category}
            currentCategories={currentCategories}
            currentCategory={currentCategory}
            currentIndex={currentIndex}
            projects={projects}
          />
        )
      );
    }
  };

  renderHomeProjects = () => {
    const { location } = this.props;

    if (!location.pathname.startsWith("/home")) {
      return null;
    }
    return (
      <React.Fragment>
        <SearchField />
        <Divider style={{ marginBottom: "0.5rem" }} />
        <h4 style={{ marginTop: 0, marginBottom: "0.2rem" }}>OPTIONS</h4>
        <div className="project-sidebar-footer">
          <CreateProjectOption />
          <CreateCategoryOption />
        </div>
        <Divider style={{ marginBottom: "0.5rem" }} />
        <h4 style={{ marginTop: 0, marginBottom: "0.2rem" }}>PROJECTS</h4>
        {this.renderStandardProjects()}
        {this.renderProjects()}
        <Divider />
      </React.Fragment>
    );
  };

  createProject = () => {
    store.dispatch(showCreateProject());
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
        {this.renderHomeProjects()}
      </Sidebar>
    );
  }
}

export default withRouter(ProjectsSidebar);
