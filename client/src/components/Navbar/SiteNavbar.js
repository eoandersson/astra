import React, { Component } from "react";
import "./SiteNavbar.css";
import { Icon, Menu, Sidebar, Segment } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { userSignOut } from "../../actions";
import store from "../../store";

class SiteNavbar extends Component {
  constructor(props) {
    super(props);
    this.logoutFunction = this.logoutFunction.bind(this);
  }

  logoutFunction(e) {
    e.preventDefault();
    localStorage.removeItem("JWT");
    store.dispatch(userSignOut());
    this.props.history.push("/");
  }

  render() {
    return (
      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
        inverted
        vertical
        visible
        width="thin"
        class="site-sidebar"
      >
        <Segment className="sidebar-header">
          <Icon name="user" className="sidebar-header-icon" />
          {store.getState().userAuthentication.username}
        </Segment>
        <Menu.Item
          as={Link}
          to="/home"
          active={this.props.location.pathname === "/home"}
        >
          <Icon name="home" />
          Current Projects
        </Menu.Item>
        <Menu.Item as={Link}>
          <Icon name="folder" />
          Completed Projects
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/news"
          active={this.props.location.pathname === "/news"}
        >
          <Icon name="newspaper" />
          News
        </Menu.Item>
        <Menu.Item className="logout-button" onClick={this.logoutFunction}>
          <Icon name="logout" />
          Logout
        </Menu.Item>
      </Sidebar>
    );
  }
}

export default withRouter(SiteNavbar);
