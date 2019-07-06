import React, { Component } from "react";
import store from "../../store";
import { showCreateCategory } from "../../actions";
import { Icon } from "semantic-ui-react";

export default class CreateCategoryOption extends Component {
  showCreateCategory = () => {
    store.dispatch(showCreateCategory());
  };

  render() {
    return (
      <div className="project-sidebar-footer">
        <span>Add a New Category</span>
        <Icon name="add" onClick={this.showCreateCategory} />
      </div>
    );
  }
}
