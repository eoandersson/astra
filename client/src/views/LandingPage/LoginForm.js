import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import store from "../../store";
import { Form, Button } from "semantic-ui-react";
import login from "../../data/Login";

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      isLoading: store.getState().loading.loginLoading
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        isLoading: store.getState().loading.loginLoading
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleLogin(event) {
    event.preventDefault();
    const { username, password } = this.state;
    const { history } = this.props;
    login(username, password, history);
  }

  render() {
    const { username, password, isLoading } = this.state;
    return (
      <div className="login-form">
        <Form>
          <Form.Field>
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={this.handleUsernameChange}
            />
          </Form.Field>

          <Form.Field>
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={this.handlePasswordChange}
            />
          </Form.Field>
          <Button
            positive
            type="submit"
            onClick={this.handleLogin}
            loading={isLoading}
            disabled={isLoading}
          >
            Sign In
          </Button>
        </Form>
      </div>
    );
  }
}

export default withRouter(LoginForm);
