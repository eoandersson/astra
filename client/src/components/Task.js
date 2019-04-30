import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Task extends Component {
  render() {
    return (
      <div className="Task">
        <p>{this.props.task.name}</p>
        <p>{this.props.task.description}</p>
        <p>{this.props.task.state.toString()}</p>
      </div>
    );
  }
}

export default Task;
