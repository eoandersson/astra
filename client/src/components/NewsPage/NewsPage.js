import React, { Component } from "react";
import "./NewsPage.css";
import { withRouter } from "react-router-dom";

import { Button, Loader } from "semantic-ui-react";

import NewsItem from "./NewsItem/NewsItem";
import CreateNewsItem from "./CreateNewsItem";
import EditNewsItem from "./EditNewsItem";
import store from "../../store";
import {
  handleAddNewsItemList,
  showCreateNewsItem
} from "../../actions/index.js";
import Sidebar from "../Sidebar";

class NewsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsItems: [],
      isLoading: false
    };

    this.renderNews = this.renderNews.bind(this);
    this.getId = this.getId.bind(this);
    this.pad0 = this.pad0.bind(this);
  }

  componentDidMount() {
    if (store.getState().userAuthentication.signedIn === false) {
      this.props.history.push("/");
    }

    this.unsubscribe = store.subscribe(() => {
      this.setState({
        newsItems: store.getState().handleNews.newsItems
      });
    });

    this.renderNews();
  }

  componentWillUnmount() {
    this.unsubscribe();
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

  renderNews() {
    this.setState({ isLoading: true });
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
        this.setState({ isLoading: false });
        store.dispatch(handleAddNewsItemList(outputArr));
      });
  }

  createNewsItem() {
    store.dispatch(showCreateNewsItem());
  }

  render() {
    return (
      <div className="news-page">
        <div className="news-content">
          <Sidebar />
          <div className="news-button-wrapper">
            <Button positive onClick={this.createNewsItem}>
              Post a New Article
            </Button>
          </div>
          <CreateNewsItem />
          <EditNewsItem />
          {this.state.isLoading ? (
            <div>
              <Loader className="page-loader" active={this.state.isLoading}>
                Loading
              </Loader>
            </div>
          ) : (
            this.state.newsItems.map(newsItem => (
              <NewsItem
                newsItem={newsItem}
                key={this.getId(newsItem.newsId)}
                newsId={this.getId(newsItem.newsId)}
              />
            ))
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(NewsPage);
