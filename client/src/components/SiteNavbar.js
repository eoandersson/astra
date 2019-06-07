import React, { Component } from "react";
import { Icon, Menu, Sidebar } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { userSignOut } from "../actions";
import store from "../store";

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
      /*
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>
          <Link to="/home" className="navbar-brand">
            Sling
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Link className="nav-link" to="/home">
              Projects
            </Link>
            <Link className="nav-link" to="/news">
              News
            </Link>
          </Nav>
          <Nav>
            <NavDropdown
              title={store.getState().userAuthentication.username}
              id="collasible-nav-dropdown"
              alignRight
            >
              <NavDropdown.Item onClick={this.logoutFunction}>
                Log Out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      */
    );
  }
}

export default withRouter(SiteNavbar);
