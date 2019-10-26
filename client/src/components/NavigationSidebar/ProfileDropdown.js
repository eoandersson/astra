import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { store } from "../../store";
import { userSignOut } from "../../actions";

import { Dropdown, Icon } from "semantic-ui-react";

class ProfileDropdown extends Component {
  logout = () => {
    localStorage.removeItem("JWT");
    store.dispatch(userSignOut());
    this.props.history.push("/");
  };

  render() {
    return (
      <Dropdown
        trigger={
          <Icon className="navbar-icon" name="user circle outline" size="big" />
        }
        icon={null}
      >
        <Dropdown.Menu>
          <Dropdown.Item icon="user outline" text="Profile" />
          <Dropdown.Item icon="cog" text="Settings" />
          <Dropdown.Divider />
          <Dropdown.Item
            icon="log out"
            text="Log Out"
            onClick={() => this.logout()}
          />
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default withRouter(ProfileDropdown);
