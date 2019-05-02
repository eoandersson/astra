import React, { Component } from "react";

class TaskHeader extends Component {
  render() {
    return (
      <div className="TaskHeader">
        <p className="NameColumn">Task Name</p>
        <p className="DescriptionColumn">Description</p>
        <p className="StatusColumn">Status</p>
        <p className="DeleteColumn" />
      </div>
    );
  }
}

export default TaskHeader;
