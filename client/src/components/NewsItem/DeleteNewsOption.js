import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";
import deleteNewsItem from "../../data/delete/DeleteNewsItem";

class DeleteNewsOption extends Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
  }

  delete(event) {
    event.preventDefault();
    const { newsItem, newsId } = this.props;
    deleteNewsItem({ newsItem, newsId });
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
