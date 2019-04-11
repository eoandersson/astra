import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }

  login(event) {
    event.preventDefault();
    fetch("/api/login")
      .then(response => response.json())
      .then(response => {
        console.log(response.loginText);
        if (response.loginText == "You are logged in!") {
          this.props.history.push("/loggedIn");
        }
      });
  }

  render() {
    return (
      <div className="LogIn">
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="secondary" type="submit" onClick={this.login}>
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default withRouter(LogIn);
