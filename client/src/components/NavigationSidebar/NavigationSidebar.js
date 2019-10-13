import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { store } from "../../store";
import { goToDashboard } from "../../actions";
import "./NavigationSidebar.css";

import { Sidebar, Menu, Icon, Divider } from "semantic-ui-react";
import ProfileDropdown from "./ProfileDropdown";

class NavigationSidebar extends Component {
  goToDashboard = () => {
    store.dispatch(goToDashboard());
  };

  renderHomeActive = () => {
    if (this.props.location.pathname.startsWith("/home")) {
      return <div className="navbar-active-indicator" />;
    }
    return null;
  };

  renderNewsActive = () => {
    if (this.props.location.pathname.startsWith("/news")) {
      return <div className="navbar-active-indicator" />;
    }
    return null;
  };

  render() {
    return (
      <Sidebar
        as={Menu}
        animation="push"
        vertical
        visible={true}
        className="navigation-sidebar"
        id="navigation-sidebar"
      >
        <div className="navbar-profile">
          <ProfileDropdown />
        </div>
        <Divider style={{ margin: 0 }} />
        <Menu.Item
          className="navbar-item"
          as={Link}
          to="/home"
          onClick={this.goToDashboard}
          active={this.props.location.pathname.startsWith("/home")}
        >
          {this.renderHomeActive()}
          <Icon className="navbar-icon" name="home" size="big" />
        </Menu.Item>
        <Menu.Item
          className="navbar-item"
          as={Link}
          to="/news"
          active={this.props.location.pathname.startsWith("/news")}
        >
          {this.renderNewsActive()}
          <Icon className="navbar-icon" name="newspaper" size="big" />
        </Menu.Item>
      </Sidebar>
    );
  }
}

export default withRouter(NavigationSidebar);
