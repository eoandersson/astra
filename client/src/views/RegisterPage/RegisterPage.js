import React, { Component } from "react";
import { store } from "../../store";
import { Button, Form, Icon, Message } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import "./RegisterPage.css";
import createUser from "../../data/create/CreateUser";
import LandingHeader from "../../components/LandingHeader/LandingHeader";

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      isLoading: store.getState().loading.registerLoading,
      errorHeader: "",
      errorContent: "",
      showUserExistsError: false
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
    document.title = "Astra | Register";
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

  showUserExistsMessage = () => {
    this.setState({
      showUserExistsError: true,
      errorHeader: "Signup Error",
      errorContent: "User already exists"
    });
  };

  handleDismiss = () => {
    this.setState({
      showUserExistsError: false
    });
  };

  async register(event) {
    event.preventDefault();
    const { username, password } = this.state;
    const { history } = this.props;
    const responseStatus = await createUser({ username, password });
    if (responseStatus === 200) history.push("/");
    else if (responseStatus === 409) {
      this.showUserExistsMessage();
    }
  }

  render() {
    const { isLoading, showUserExistsError } = this.state;
    return (
      <div className="register-initial-content">
        <LandingHeader />
        <div className="register-wrapper">
          <div className="register-content-wrapper">
            <div className="register-form">
              <h3>Sign up for Astra</h3>
              <Form inverted error={showUserExistsError}>
                <Form.Field>
                  <label>
                    <Icon name="user" />
                    Username
                  </label>
                  <input
                    type="text"
                    placeholder="Enter username"
                    value={this.state.username}
                    onChange={this.handleUsernameChange}
                  />
                </Form.Field>
                <Form.Field controlId="formGridPassword">
                  <label>
                    <Icon name="key" />
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                  />
                </Form.Field>
                <Message
                  error
                  header="Signup Failed"
                  content="User already exists."
                  onDismiss={this.handleDismiss}
                />
                <Button
                  positive
                  loading={isLoading}
                  disabled={isLoading}
                  type="submit"
                  onClick={this.register}
                  style={{ width: "100%" }}
                >
                  Submit
                </Button>
              </Form>
              <div className="register-link" style={{ marginTop: "10px" }}>
                <Link to="/login">Already a user? Sign in here!</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(RegisterPage);
