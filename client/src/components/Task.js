import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Task extends Component {
  render() {
    return (
      <div className="Task">
        <p className="TaskLeft">{this.props.task.name}</p>
        <p className="TaskCenter">{this.props.task.description}</p>
        <p className="TaskRight">
          {this.props.task.state ? "Complete" : "Uncomplete"}
        </p>
      </div>
    );
  }
}

export default Task;
