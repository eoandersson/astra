import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";
import { handleDeleteNewsItem } from "../../../../actions";
import store from "../../../../store";

class DeleteNewsOption extends Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
  }

  delete(event) {
    event.preventDefault();
    fetch("/news-service/news/" + this.props.newsId, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("JWT")
      },
      body: JSON.stringify({
        newsId: this.props.newsId
      })
    }).then(response => {
      console.log(response.status);
      if (response.status === 204) {
        console.log("Removed");
        store.dispatch(handleDeleteNewsItem({ newsItem: this.props.newsItem }));
      } else {
        console.log("Error");
      }
    });
  }

  render() {
    return (
      <Dropdown.Item
        icon="trash"
        text="Delete News Article"
        onClick={this.delete}
      />
    );
  }
}

export default DeleteNewsOption;
