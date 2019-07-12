import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import LandingPage from "./LandingPage/LandingPage";
import RegisterPage from "./RegisterPage/RegisterPage";
import HomePage from "./HomePage/HomePage";
import NewsPage from "./NewsPage/NewsPage";
import LoginPage from "./LoginPage/LoginPage";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/home" component={HomePage} />
          <Route path="/news" component={NewsPage} />
        </div>
      </Router>
    );
  }
}

export default App;
