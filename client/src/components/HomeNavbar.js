import React, { Component } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

class HomeNavbar extends Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">Sling</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link exact="true" to="/home">
              Projects
            </Nav.Link>
            <Nav.Link href="#pricing">Profile</Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown
              title="Dropdown"
              id="collasible-nav-dropdown"
              alignRight
            >
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default HomeNavbar;
