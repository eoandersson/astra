import React, { Component } from "react";
import store from "../../store";
import { showCategory, hideCategory } from "../../actions";
import { Accordion, Menu, Icon } from "semantic-ui-react";
import DeleteCategoryIcon from "./DeleteCategoryIcon";
import SidebarProject from "./SidebarProject";
import moveProject from "../../data/update/MoveProject";

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryClass: "project-category"
    };
  }
  getIconDirection = category => {
    const { currentCategories } = this.props;
    return currentCategories.indexOf(category) !== -1
      ? "angle up"
      : "angle down";
  };

  getTitleClassName = category => {
    const { currentCategories } = this.props;
    if (currentCategories.indexOf(category) === -1) {
      return "category-dropdown inactive";
    } else {
      return "category-dropdown";
    }
  };

  showHideCategory = category => {
    const { currentCategories } = this.props;
    if (currentCategories.indexOf(category) === -1) {
      store.dispatch(showCategory(category));
    } else {
      store.dispatch(hideCategory(category));
    }
  };

  getDeleteButton = category => {
    if (category === "My Projects" || category === "Shared Projects") {
      return null;
    } else {
      return <DeleteCategoryIcon category={category} />;
    }
  };

  onDragOver = e => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    this.setState({
      categoryClass: "project-category dragover"
    });
  };

  onDragLeave = e => {
    e.preventDefault();
    this.setState({
      categoryClass: "project-category"
    });
  };

  onDrop = e => {
    this.setState({
      categoryClass: "project-category"
    });
    const { category } = this.props;
    const data = JSON.parse(e.dataTransfer.getData("data"));
    const oldCategory = data.category;
    const targetCategory = category;
    const project = data.project;
    if (oldCategory === targetCategory) return;
    moveProject({ oldCategory, targetCategory, project });
  };

  moveProject = (oldCategory, projectId) => {};

  render() {
    const { categoryClass } = this.state;
    const {
      category,
      currentCategories,
      currentCategory,
      currentIndex,
      projects
    } = this.props;
    return (
      <Accordion
        className={categoryClass}
        onDragOver={e => this.onDragOver(e)}
        onDragLeave={e => this.onDragLeave(e)}
        onDrop={e => this.onDrop(e)}
      >
        <Accordion.Title
          active={currentCategories.indexOf(category) !== -1}
          className="project-category-title"
        >
          <div
            className={this.getTitleClassName(category)}
            onClick={() => this.showHideCategory(category)}
          >
            {category}
            <Icon name={this.getIconDirection(category)} />
          </div>
          {this.getDeleteButton(category)}
        </Accordion.Title>
        <Accordion.Content
          active={currentCategories.indexOf(category) !== -1}
          className="project-category-content"
        >
          {projects[category].length === 0 ? (
            <Menu.Item className="sidebar-item-empty">
              <span className="sidebar-project-name-empty">Empty.</span>
            </Menu.Item>
          ) : (
            projects[category].map((project, i) => (
              <SidebarProject
                key={project.projectName + i}
                category={category}
                project={project}
                projects={projects}
                currentCategory={currentCategory}
                currentIndex={currentIndex}
              />
            ))
          )}
        </Accordion.Content>
      </Accordion>
    );
  }
}
