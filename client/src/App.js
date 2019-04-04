import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Landing from "./components/Landing";
import RegisterPage from "./components/RegisterPage";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Landing} />
          <Route path="/register" component={RegisterPage} />
        </div>
      </Router>
    );
  }
}

export default App;
