import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";
import { showEditNewsItem } from "../../actions";
import { store } from "../../store";

class EditNewsOption extends Component {
  constructor(props) {
    super(props);
    this.editNewsItem = this.editNewsItem.bind(this);
  }

  editNewsItem(event) {
    const newsItem = {
      newsId: this.props.newsId,
      title: this.props.newsItem.title,
      body: this.props.newsItem.body,
      newsItem: this.props.newsItem,
      author: store.getState().userAuthentication.username
    };
    store.dispatch(showEditNewsItem(newsItem));
  }

  render() {
    return (
      <Dropdown.Item
        icon="edit"
        text="Edit News Article"
        onClick={this.editNewsItem}
      />
    );
  }
}

export default EditNewsOption;
