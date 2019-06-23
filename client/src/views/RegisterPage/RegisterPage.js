import React, { Component } from "react";
import store from "../../store";
import { Button, Form } from "semantic-ui-react";
import "./RegisterPage.css";
import createUser from "../../data/create/CreateUser";

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      isLoading: store.getState().loading.registerLoading
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.register = this.register.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        isLoading: store.getState().loading.registerLoading
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

  register(event) {
    event.preventDefault();
    const { username, password } = this.state;
    const { history } = this.props;
    createUser({ username, password, history });
  }

  render() {
    const { isLoading } = this.state;
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

              <Button
                positive
                loading={isLoading}
                disabled={isLoading}
                type="submit"
                onClick={this.register}
              >
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
