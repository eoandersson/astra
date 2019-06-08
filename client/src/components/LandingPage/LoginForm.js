import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Form, Button } from "semantic-ui-react";
import { userSignIn } from "../../actions/index.js";
import store from "../../store.js";

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = { username: "", password: "", isLoading: false };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.login = this.login.bind(this);
    this.userAuthenticated = this.userAuthenticated.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  login(event) {
    event.preventDefault();
    this.setState({ isLoading: true });
    fetch("/login-service/users/login", {
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
      if (response.status === 200) {
        var jwt = response.headers.get("Authorization");
        var jwtArr = jwt.split(" ");
        jwt = jwtArr[1];
        localStorage.setItem("JWT", jwt);
        console.log("Log in: " + this.state.username);
        store.dispatch(userSignIn(this.state.username));
        setTimeout(() => {
          this.setState({ isLoading: false });
          this.props.history.push("/home");
        }, 2000);
      } else {
        this.setState({ isLoading: false });
        console.log(response.status);
      }
    });
  }

  userAuthenticated = (username, dispatch) =>
    new Promise((resolve, reject) => {
      resolve();
    });

  render() {
    return (
      <div className="login-form">
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

          <Form.Field>
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
          </Form.Field>
          <Button
            positive
            type="submit"
            onClick={this.login}
            loading={this.state.isLoading}
          >
            Sign In
          </Button>
        </Form>
      </div>
    );
  }
}

export default withRouter(LoginForm);
