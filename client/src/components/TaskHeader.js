import React, { Component } from "react";

class TaskHeader extends Component {
  render() {
    return (
      <div className="TaskHeader">
        <p className="TaskLeft">Task Name</p>
        <p className="TaskCenter">Description</p>
        <p className="TaskRight">Status</p>
      </div>
    );
  }
}

export default TaskHeader;
