import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import LandingHeader from "../../components/LandingHeader";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      atTopOfPage: true
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.setHeaderBackground = this.setHeaderBackground.bind(this);
    this.removeHeaderBackground = this.removeHeaderBackground.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const { atTopOfPage } = this.state;

    if (window.pageYOffset === 0) {
      this.removeHeaderBackground();
    } else if (window.pageYOffset !== 0 && atTopOfPage) {
      this.setHeaderBackground();
    }
  };

  setHeaderBackground = () => {
    this.setState({
      atTopOfPage: false
    });
  };

  removeHeaderBackground = () => {
    this.setState({
      atTopOfPage: true
    });
  };

  renderInitialContent() {
    const { atTopOfPage } = this.state;

    return (
      <div className="landing-initial-content">
        <LandingHeader atTopOfPage={atTopOfPage} />
        <div className="landing-wrapper">
          <div className="landing-content-wrapper">
            <div className="landing-about">
              <h2>Welcome to Astra</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                blandit euismod lorem, id laoreet lectus faucibus eget.
                Curabitur ultricies, ex ac placerat faucibus, dolor massa
                eleifend mi, ac hendrerit neque dolor ut elit. Proin rhoncus
                sapien eget nunc lacinia fermentum.
              </p>
              <p>
                Nullam molestie ornare volutpat. Nunc felis odio, consectetur a
                tincidunt dictum, dapibus eget felis. Sed dignissim massa at
                interdum hendrerit. Nulla pharetra sollicitudin bibendum. Fusce
                nec leo venenatis, bibendum felis at, accumsan lectus.
              </p>
              <Button circular inverted as={Link} to="/register">
                Sign Up
              </Button>
              <Button circular inverted as={Link} to="/login">
                Log In
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderFooter() {
    return <div className="landing-footer" />;
  }

  render() {
    return (
      <div className="landing-page">
        {this.renderInitialContent()}
        {this.renderFooter()}
      </div>
    );
  }
}

export default Landing;
