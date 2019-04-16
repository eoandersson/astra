import React, { Component } from "react";

class LoggedInPage extends Component {
  constructor(props) {
    super(props);

    this.state = { users: [] };
    this.fetch = this.fetch.bind(this);
  }

  fetch(event) {
    event.preventDefault();
    fetch("/api/users", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("JWT")
      }
    })
      //.then(response => console.log("Bearer " + localStorage.getItem("JWT")))
      //.then(response => console.log(response))
      .then(response => response.json())
      .then(responseJson => {
        const users = responseJson;
        var outputArr = [];
        for (var i = 0; i < users.length; i++) {
          outputArr[i] = users[i];
        }
        this.setState({ users: outputArr });
      });
  }

  render() {
    return (
      <div className="LoggedInPage">
        {this.state.users.map(user => (
          <div>{user.username}</div>
        ))}
        <button onClick={this.fetch}>Hej!</button>
      </div>
    );
  }
}

export default LoggedInPage;
