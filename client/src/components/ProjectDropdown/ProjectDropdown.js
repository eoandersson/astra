import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";

import DeleteProjectOption from "./DeleteProjectOption";
import EditProjectOption from "./EditProjectOption";
import FinishProjectOption from "./FinishProjectOption";
import LeaveProjectOption from "./LeaveProjectOption";

export default class ProjectDropdown extends Component {
  render() {
    const { direction, icon } = this.props;
    return (
      <Dropdown
        direction={direction || "left"}
        icon={
          icon === "horizontal" ? "ellipsis horizontal" : "ellipsis vertical"
        }
        className="project-dropdown"
        pointing
      >
        <Dropdown.Menu>
          <Dropdown.Header icon="cog" content="Project Options" />
          <Dropdown.Divider />
          <EditProjectOption
            project={this.props.project}
            projectId={this.props.projectId}
            category={this.props.category}
          />
          <FinishProjectOption />
          <Dropdown.Divider />
          <LeaveProjectOption />
          <DeleteProjectOption
            project={this.props.project}
            projectId={this.props.projectId}
            category={this.props.category}
          />
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
