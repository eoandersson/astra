import React, { Component } from "react";
import NewsDropdown from "./Dropdown/NewsDropdown";

class NewsItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="news-item">
        <div className="news-header">
          <div className="news-title">
            <h3>{this.props.newsItem.title}</h3>
          </div>
          <div className="news-buttons">
            <NewsDropdown
              newsId={this.props.newsId}
              newsItem={this.props.newsItem}
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
