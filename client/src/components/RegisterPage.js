import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = { username: "", password: "" };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.register = this.register.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  register(event) {
    event.preventDefault();
    fetch("/api/users/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    }).then(response => {
      console.log(response.status);
      if (response.status === 200) {
        this.props.history.push("/");
      } else {
        console.log("Error");
      }
    });
  }

  render() {
    return (
      <div className="Content">
        <div className="RegisterForm">
          <h3>Register</h3>
          <hr />
          <Form>
            <Form.Group controlId="formGridEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={this.state.username}
                onChange={this.handleUsernameChange}
              />
            </Form.Group>

            <Form.Group controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handlePasswordChange}
              />
            </Form.Group>

            <Form.Group id="formGridCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={this.register}>
              Submit
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default RegisterPage;
