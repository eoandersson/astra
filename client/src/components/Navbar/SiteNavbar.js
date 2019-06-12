import React, { Component } from "react";
import "./SiteNavbar.css";
import { Icon, Menu, Sidebar, Segment, Divider } from "semantic-ui-react";
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
        className="site-sidebar"
      >
        <Segment className="sidebar-header">
          <Icon name="user" className="sidebar-header-icon" />
          {store.getState().userAuthentication.username}
        </Segment>
        <Divider inverted horizontal>
          Navigation
        </Divider>
        <Menu.Item
          className="sidebar-item"
          as={Link}
          to="/home"
          active={this.props.location.pathname === "/home"}
        >
          Current Projects
        </Menu.Item>
        <Menu.Item className="sidebar-item" as={Link} to="/home">
          Completed Projects
        </Menu.Item>
        <Menu.Item
          className="sidebar-item"
          as={Link}
          to="/news"
          active={this.props.location.pathname === "/news"}
        >
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
