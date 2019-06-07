import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";

import DeleteProjectOption from "./DeleteProjectOption";
import EditProjectOption from "./EditProjectOption";
import FinishProjectOption from "./FinishProjectOption";
import LeaveProjectOption from "./LeaveProjectOption";

export default class ProjectDropdown extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Dropdown
        text="Options"
        direction="left"
        icon="cog"
        className="project-dropdown"
      >
        <Dropdown.Menu>
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
