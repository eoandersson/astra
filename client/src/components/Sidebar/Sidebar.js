import React, { Component } from "react";
import "./Sidebar.css";
import store from "../../store";
import { showCreateProject, userSignOut, goToDashboard } from "../../actions";
import { Sidebar, Menu, Divider, Icon, Segment } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";

import CreateCategoryOption from "./CreateCategoryOption";
import Category from "./SidebarCategory";

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
    if (this.props.location.pathname !== "/home") {
      return null;
    }
    return (
      <React.Fragment>
        <div className="sidebar-button-wrapper">
          <span>Projects</span>
          <Icon name="add" onClick={this.createProject} />
        </div>
        <span className="custom-divider" />
        {this.renderStandardProjects()}
        {this.renderProjects()}
        <Divider />
        <CreateCategoryOption />
      </React.Fragment>
    );
  };

  renderNavigationOptions = () => {
    return (
      <React.Fragment>
        <Menu.Item
          className="sidebar-nav-item"
          as={Link}
          to="/home"
          onClick={this.goToDashboard}
          active={this.props.location.pathname === "/home"}
        >
          <Icon
            className="sidebar-nav-icon"
            name="home"
            inverted
            size="small"
          />
          <span>Home</span>
        </Menu.Item>
        <Menu.Item
          className="sidebar-nav-item"
          as={Link}
          to="/news"
          active={this.props.location.pathname === "/news"}
        >
          <Icon
            className="sidebar-nav-icon"
            name="newspaper outline"
            inverted
            size="small"
          />
          <span>News</span>
        </Menu.Item>
      </React.Fragment>
    );
  };

  createProject = () => {
    store.dispatch(showCreateProject());
  };

  goToDashboard = () => {
    store.dispatch(goToDashboard());
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
        <Segment className="sidebar-header">
          <Link to="/home">
            <h2 style={{ color: "#ffffff" }}>Sling</h2>
          </Link>
        </Segment>
        <span />
        {this.renderNavigationOptions()}
        {this.renderHomeProjects()}
      </Sidebar>
    );
  }
}

export default withRouter(ProjectsSidebar);
