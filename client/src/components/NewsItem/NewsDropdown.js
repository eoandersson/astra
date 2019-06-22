import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";
import EditNewsOption from "./EditNewsOption";
import DeleteNewsOption from "./DeleteNewsOption";

export default class NewsDropdown extends Component {
  render() {
    return (
      <Dropdown
        text="Options"
        direction="left"
        icon="cog"
        className="news-dropdown"
      >
        <Dropdown.Menu>
          <EditNewsOption
            newsId={this.props.newsId}
            newsItem={this.props.newsItem}
          />
          <Dropdown.Divider />
          <DeleteNewsOption
            newsId={this.props.newsId}
            newsItem={this.props.newsItem}
          />
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
