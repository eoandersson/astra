import React, { Component } from "react";
import store from "../../store";
import { deleteCategory } from "../../actions";
import { Icon } from "semantic-ui-react";

export default class DeleteCategoryIcon extends Component {
  constructor(props) {
    super(props);
  }
  deleteCategory = event => {
    event.preventDefault();
    const { category } = this.props;
    fetch("/project-service/projects/category", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("JWT")
      },
      body: JSON.stringify({
        username: store.getState().userAuthentication.username,
        category: category
      })
    }).then(response => {
      if (response.status === 204) {
        store.dispatch(deleteCategory(this.props.category));
      } else {
        console.log("Error");
      }
    });
  };

  render() {
    return (
      <Icon name="trash alternate outline" onClick={this.deleteCategory} />
    );
  }
}
