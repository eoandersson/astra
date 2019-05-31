import React, { Component } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";

class SiteNavbar extends Component {
  constructor(props) {
    super(props);
    this.logoutFunction = this.logoutFunction.bind(this);
  }

  logoutFunction(e) {
    e.preventDefault();
    localStorage.removeItem("JWT");
    this.props.history.push("/");
  }

  render() {
    return (
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
              title="Dropdown"
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
    );
  }
}

export default withRouter(SiteNavbar);
