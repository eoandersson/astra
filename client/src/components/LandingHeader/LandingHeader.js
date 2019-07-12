import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Image, Button } from "semantic-ui-react";
import headerLogo from "../../resources/LowresWhite.png";
import "./LandingHeader.css";

export default class LandingHeader extends Component {
  render() {
    const { atTopOfPage } = this.props;
    const renderBackground = atTopOfPage !== null && atTopOfPage === false;

    return (
      <div
        className={
          renderBackground ? "landing-header background" : "landing-header"
        }
      >
        <Image src={headerLogo} size="small" as={Link} to="/" />
        <div className="landing-header-links">
          <Link to="/login" className="landing-header-link">
            Login
          </Link>
          <Button
            circular
            inverted
            as={Link}
            to="/register"
            style={{ marginLeft: "15px" }}
          >
            Sign Up Now
          </Button>
        </div>
      </div>
    );
  }
}
