import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { store } from "../../store";
import { goToProject } from "../../actions";
import { Menu } from "semantic-ui-react";
import ProjectDropdown from "../ProjectDropdown";
import getId from "../../utils/ParseObjectId";

class SidebarProject extends Component {
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
    const { history } = this.props;

    const payload = {
      category,
      projectId
    };

    store.dispatch(goToProject(payload));
    const parsedCategory = category.replace(" ", "-");
    history.push("/home/" + parsedCategory + "/" + getId(projectId));
  };

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

  onDragStart = (e, category, project) => {
    const dataObject = JSON.stringify({ category, project });
    e.dataTransfer.setData("data", dataObject);
    e.dataTransfer.effectAllowed = "copyMove";
  };

  render() {
    const { category, project, currentCategory, currentIndex } = this.props;
    return (
      <Menu.Item
        as="a"
        key={project.projectName}
        active={
          currentCategory === category &&
          currentIndex === this.getIndex(category, project.projectId)
        }
        onClick={() => this.goToProject(category, project.projectId)}
        draggable
        onDragStart={e => this.onDragStart(e, category, project)}
      >
        <Menu.Header>
          <span className="sidebar-project-name">{project.projectName}</span>
          <ProjectDropdown
            projectId={this.getId(project.projectId)}
            project={project}
            category={category}
            icon="horizontal"
            direction="left"
          />
        </Menu.Header>
      </Menu.Item>
    );
  }
}

export default withRouter(SidebarProject);
