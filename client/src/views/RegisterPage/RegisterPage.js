import React, { Component } from "react";
import { Button, Form } from "semantic-ui-react";
import "./RegisterPage.css";

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
    fetch("/login-service/users/register", {
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
      <div className="register-page">
        <div className="register-content">
          <div className="register-form">
            <h3>Register</h3>
            <hr />
            <Form>
              <Form.Field>
                <label>Username</label>
                <input
                  type="text"
                  placeholder="Enter username"
                  value={this.state.username}
                  onChange={this.handleUsernameChange}
                />
              </Form.Field>

              <Form.Field controlId="formGridPassword">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                />
              </Form.Field>

              <Button positive type="submit" onClick={this.register}>
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterPage;
