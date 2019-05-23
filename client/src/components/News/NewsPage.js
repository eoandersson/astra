import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import NewsItem from "./NewsItem";
import CreateNewsItem from "./CreateNewsItem";
import EditNewsItem from "./EditNewsItem";
import store from "./../../store";
import {
  handleAddNewsItemList,
  showCreateNewsItem
} from "../../actions/index.js";

class NewsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsItems: []
    };

    this.renderProjects();

    store.subscribe(() => {
      this.setState({
        newsItems: store.getState().handleNews.newsItems
      });
    });

    this.renderProjects = this.renderProjects.bind(this);
    this.getId = this.getId.bind(this);
    this.pad0 = this.pad0.bind(this);
  }

  getId(mongoId) {
    var result =
      this.pad0(mongoId.timestamp.toString(16), 8) +
      this.pad0(mongoId.machineIdentifier.toString(16), 6) +
      this.pad0(mongoId.processIdentifier.toString(16), 4) +
      this.pad0(mongoId.counter.toString(16), 6);

    return result;
  }

  pad0(str, len) {
    var zeros = "00000000000000000000000000";
    if (str.length < len) {
      return zeros.substr(0, len - str.length) + str;
    }

    return str;
  }

  renderProjects() {
    fetch("/news-service/news", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("JWT")
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        const newsItems = responseJson;
        var outputArr = [];
        for (var i = 0; i < newsItems.length; i++) {
          outputArr[i] = newsItems[i];
        }
        store.dispatch(handleAddNewsItemList(outputArr));
      });
  }

  createNewsItem() {
    store.dispatch(showCreateNewsItem());
  }

  render() {
    return (
      <div className="NewsPage">
        <div className="NewsContent">
          <div className="NewsButtonWrapper">
            <ButtonToolbar>
              <Button variant="success" onClick={this.createNewsItem} size="lg">
                Post a New Article
              </Button>
            </ButtonToolbar>
          </div>
          <CreateNewsItem />
          <EditNewsItem />
          {this.state.newsItems.map(newsItem => (
            <NewsItem
              newsItem={newsItem}
              key={this.getId(newsItem.newsId)}
              newsId={this.getId(newsItem.newsId)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default NewsPage;
