import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import LandingPage from "./components/LandingPage";
import RegisterPage from "./components/RegisterPage";
import HomePage from "./components/ProjectsPage";
import NewsPage from "./components/NewsPage";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={LandingPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/home" component={HomePage} />
          <Route path="/news" component={NewsPage} />
        </div>
      </Router>
    );
  }
}

export default App;
