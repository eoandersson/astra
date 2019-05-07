import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Landing from "./components/Landing";
import RegisterPage from "./components/RegisterPage";
import HomePage from "./components/HomePage";

import store from "./store";

const unsubscribe = store.subscribe(() => console.log(store.getState()));

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Landing} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/home" component={HomePage} />
          <Route path="/home/create-project" />
          <Route path="/home/edit-project" />
        </div>
      </Router>
    );
  }
}

export default App;
