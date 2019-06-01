import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import DeleteNewsItemButton from "./DeleteNewsItemButton";
import { showEditNewsItem } from "../../actions/index.js";
import store from "../../store";

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
      newsItem: this.props.newsItem,
      author: store.getState().userAuthentication.username
    };
    console.log("NewsItem");
    console.log(store.getState());
    console.log(newsItem);
    store.dispatch(showEditNewsItem(newsItem));
  }

  render() {
    return (
      <div className="news-item">
        <div className="news-header">
          <div className="news-title">
            <h3>{this.props.newsItem.title}</h3>
          </div>
          <div className="news-buttons">
            <Button variant="primary" onClick={this.editNewsItem}>
              Edit
            </Button>
            <DeleteNewsItemButton
              newsItem={this.props.newsItem}
              newsId={this.props.newsId}
            />
          </div>
        </div>
        <div className="news-item-body">
          <p>{this.props.newsItem.body}</p>
        </div>
      </div>
    );
  }
}

export default NewsItem;
