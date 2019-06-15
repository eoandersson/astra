import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";

import DeleteProjectOption from "./DeleteProjectOption";
import EditProjectOption from "./EditProjectOption";
import FinishProjectOption from "./FinishProjectOption";
import LeaveProjectOption from "./LeaveProjectOption";

export default class ProjectDropdown extends Component {
  render() {
    return (
      <Dropdown
        direction="left"
        icon="ellipsis horizontal"
        className="project-dropdown"
      >
        <Dropdown.Menu>
          <Dropdown.Header icon="cog" content="Project Options" />
          <Dropdown.Divider />
          <EditProjectOption
            project={this.props.project}
            projectId={this.props.projectId}
          />
          <FinishProjectOption />
          <Dropdown.Divider />
          <LeaveProjectOption />
          <DeleteProjectOption
            project={this.props.project}
            projectId={this.props.projectId}
          />
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
