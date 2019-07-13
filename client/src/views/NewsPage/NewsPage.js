import React, { Component } from "react";
import "./NewsPage.css";
import { withRouter } from "react-router-dom";
import getAllNewsItems from "../../data/read/GetAllNewsItems";

import { Button, Loader, Icon } from "semantic-ui-react";

import NewsItem from "../../components/NewsItem";
import CreateNewsItem from "../../components/Modals/CreateNewsItem";
import EditNewsItem from "../../components/Modals/EditNewsItem";
import store from "../../store";
import { showCreateNewsItem } from "../../actions/index.js";
import NavigationSidebar from "../../components/NavigationSidebar/NavigationSidebar";
import PageHeader from "../../components/PageHeader";

class NewsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsItems: [],
      isLoading: store.getState().loading.newsLoading
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
        newsItems: store.getState().handleNews.newsItems,
        isLoading: store.getState().loading.newsLoading
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
    getAllNewsItems();
  }

  createNewsItem() {
    store.dispatch(showCreateNewsItem());
  }

  render() {
    return (
      <div className="news-page">
        <div className="news-content">
          <NavigationSidebar />
          <PageHeader>
            <h2>News</h2>
          </PageHeader>
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
