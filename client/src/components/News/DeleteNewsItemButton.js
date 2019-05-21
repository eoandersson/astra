import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import store from "./../../store";
import { handleDeleteNewsItem } from "../../actions/index.js";

class DeleteNewsItemButton extends Component {
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
        "Content-Type": "application/json"
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
      <Button variant="danger" type="submit" onClick={this.delete}>
        Delete
      </Button>
    );
  }
}

export default DeleteNewsItemButton;
