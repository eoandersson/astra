import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { store } from "../../store";
import { Form, Button, Message, Icon } from "semantic-ui-react";
import login from "../../data/Login";

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      isLoading: store.getState().loading.loginLoading,
      loginError: false
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
    document.title = "Astra | Login";
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

  handleDismiss = () => {
    this.setState({
      loginError: false
    });
  };

  async handleLogin(event) {
    event.preventDefault();
    const { username, password } = this.state;
    const { history } = this.props;
    const success = await login(username, password);
    if (success) {
      console.log(store.getState());
      history.push("/home");
    } else {
      this.setState({
        loginError: true
      });
    }
  }

  render() {
    const { username, password, isLoading } = this.state;
    const { loginError } = this.state;
    return (
      <div className="login-form">
        <h3>Sign in to Astra</h3>
        <Form error={loginError} inverted>
          <Form.Field>
            <label>
              <Icon name="user" />
              Username
            </label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={this.handleUsernameChange}
            />
          </Form.Field>

          <Form.Field>
            <label>
              <Icon name="key" />
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={this.handlePasswordChange}
            />
          </Form.Field>
          <Message
            error
            header="Login Failed"
            content="Incorrect username or password."
            onDismiss={this.handleDismiss}
          />
          <Button
            positive
            type="submit"
            onClick={this.handleLogin}
            loading={isLoading}
            disabled={isLoading}
            style={{ width: "100%" }}
          >
            Sign In
          </Button>
        </Form>
        <div className="register-link" style={{ marginTop: "10px" }}>
          <Link to="/register">Not a user? Register here!</Link>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginForm);
