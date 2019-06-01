import React, { Component } from "react";

class TaskHeader extends Component {
  render() {
    return (
      <div className="task-header">
        <p className="task-name-column">Task Name</p>
        <p className="task-description-column">Description</p>
        <p className="task-status-column">Status</p>
        <p className="task-delete-column" />
      </div>
    );
  }
}

export default TaskHeader;
