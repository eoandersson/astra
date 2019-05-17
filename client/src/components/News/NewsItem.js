import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import DeleteNewsItemButton from "./DeleteNewsItemButton";
import { showEditNewsItem } from "../../actions/index.js";
import store from "./../../store";

class NewsItem extends Component {
  constructor(props) {
    super(props);
    this.editNewsItem = this.editNewsItem.bind(this);
  }

  editNewsItem(event) {
    const newsItem = {
      newsId: this.props.newsId,
      title: this.props.newsItem.title,
      body: this.props.newsItem.body,
      newsItem: this.props.newsItem
    };
    store.dispatch(showEditNewsItem(newsItem));
  }

  render() {
    return (
      <div className="NewsItem">
        <h3>{this.props.newsItem.title}</h3>
        <p>{this.props.newsItem.body}</p>
        <ButtonToolbar>
          <Button variant="primary" onClick={this.editNewsItem} size="lg">
            Edit
          </Button>
        </ButtonToolbar>
        <DeleteNewsItemButton
          newsItem={this.props.newsItem}
          newsId={this.props.newsId}
        />
      </div>
    );
  }
}

export default NewsItem;
