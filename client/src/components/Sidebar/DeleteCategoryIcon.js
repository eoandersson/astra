import React, { Component } from "react";
import deleteCategory from "../../data/delete/DeleteCategory";
import { Icon } from "semantic-ui-react";

export default class DeleteCategoryIcon extends Component {
  deleteCategory = event => {
    event.preventDefault();
    const { category } = this.props;
    deleteCategory({ category });
  };

  render() {
    return (
      <Icon name="trash alternate outline" onClick={this.deleteCategory} />
    );
  }
}
