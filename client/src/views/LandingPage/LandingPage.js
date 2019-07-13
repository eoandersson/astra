import React, { Component } from "react";
import { Button, Icon, Grid, Segment, Placeholder } from "semantic-ui-react";
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

  renderReview = () => {
    return (
      <Grid.Row>
        <Grid.Column>
          <Segment raised>
            <Placeholder>
              <Placeholder.Header image>
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Header>
              <Placeholder.Paragraph>
                <Placeholder.Line length="medium" />
                <Placeholder.Line length="short" />
              </Placeholder.Paragraph>
            </Placeholder>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    );
  };

  renderReviews = () => {
    return (
      <div className="landing-reviews">
        <h2>User Reviews</h2>
        <Grid columns={1}>
          {this.renderReview()}
          {this.renderReview()}
          {this.renderReview()}
        </Grid>
      </div>
    );
  };

  renderAboutContent = () => {
    return (
      <React.Fragment>
        <h2>Our Commitment to Lorem Ipsum</h2>
        <Grid columns={1}>
          <Grid.Row stretched>
            <Grid.Column>
              <Segment raised>
                <Placeholder>
                  <Placeholder.Header image>
                    <Placeholder.Line />
                    <Placeholder.Line />
                  </Placeholder.Header>
                  <Placeholder.Paragraph>
                    <Placeholder.Line length="long" />
                    <Placeholder.Line length="long" />
                    <Placeholder.Line length="long" />
                    <Placeholder.Line length="medium" />
                  </Placeholder.Paragraph>
                </Placeholder>
              </Segment>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row stretched>
            <Grid.Column>
              <Segment raised>
                <Placeholder>
                  <Placeholder.Header image>
                    <Placeholder.Line />
                    <Placeholder.Line />
                  </Placeholder.Header>
                  <Placeholder.Paragraph>
                    <Placeholder.Line length="long" />
                    <Placeholder.Line length="long" />
                    <Placeholder.Line length="long" />
                    <Placeholder.Line length="medium" />
                  </Placeholder.Paragraph>
                </Placeholder>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </React.Fragment>
    );
  };

  renderFooterLink = ({ href, icon }) => {
    return (
      <a href={href} rel="noopener noreferrer" target="_blank">
        <Icon name={icon} size="large" inverted />
      </a>
    );
  };

  renderPageFooter() {
    return (
      <div className="page-footer">
        <div>
          <Icon name="copyright outline" inverted /> Astra Is Not Actually a
          Company, LLC
        </div>
        <div>
          <Link to="/" className="footer-link">
            About Us
          </Link>
          <Link to="/" className="footer-link">
            Privacy
          </Link>
          <Link to="/" className="footer-link">
            Terms
          </Link>
        </div>
        <div class="footer-social-media">
          {this.renderFooterLink({
            href: "https://www.facebook.com",
            icon: "facebook f"
          })}
          {this.renderFooterLink({
            href: "https://www.twitter.com",
            icon: "twitter"
          })}
          {this.renderFooterLink({
            href: "https://www.youtube.com",
            icon: "youtube"
          })}
          {this.renderFooterLink({
            href: "https://www.linkedin.com",
            icon: "linkedin"
          })}
          {this.renderFooterLink({
            href: "https://www.instagram.com",
            icon: "instagram"
          })}
        </div>
      </div>
    );
  }

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
        <Icon
          className="landing-down-indicator bounce"
          name="angle double down"
          size="big"
        />
      </div>
    );
  }

  renderFooter() {
    return (
      <div className="landing-footer">
        <div className="landing-footer-content">
          <Grid columns={3}>
            <Grid.Column width={10} className="footer-column" stretched>
              {this.renderAboutContent()}
            </Grid.Column>
            <Grid.Column width={6} className="footer-column" stretched>
              {this.renderReviews()}
            </Grid.Column>
          </Grid>
        </div>
        {this.renderPageFooter()}
      </div>
    );
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
