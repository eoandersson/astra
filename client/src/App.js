import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Landing from "./components/Landing";
import RegisterPage from "./components/RegisterPage";
import HomePage from "./components/Projects/HomePage";
import NewsPage from "./components/News/NewsPage";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Landing} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/home" component={HomePage} />
          <Route path="/news" component={NewsPage} />
          <Route path="/home/create-project" />
          <Route path="/home/edit-project" />
        </div>
      </Router>
    );
  }
}

export default App;
