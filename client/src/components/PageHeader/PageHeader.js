import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import store from "../../store";
import {
  hideProjectSidebar,
  showProjectSidebar,
  userSignOut
} from "../../actions";
import "./PageHeader.css";
import { Icon } from "semantic-ui-react";

class PageHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: store.getState().handleProject.projectSidebarVisibility
    };
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        visible: store.getState().handleProject.projectSidebarVisibility
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  toggleSidebar = () => {
    const { visible } = this.state;
    if (visible) {
      store.dispatch(hideProjectSidebar());
    } else {
      store.dispatch(showProjectSidebar());
    }
  };

  logoutFunction = e => {
    e.preventDefault();
    localStorage.removeItem("JWT");
    store.dispatch(userSignOut());
    this.props.history.push("/");
  };

  render() {
    const { visible } = this.state;
    const { children } = this.props;
    return (
      <div className="page-header">
        <div className="header-info">
          <Icon
            size="big"
            onClick={this.toggleSidebar}
            className="sidebar-toggle"
            name={visible ? "caret square left outline" : "sidebar"}
          />
          {children}
        </div>
        <Icon
          className="logout-button"
          name="logout"
          size="large"
          onClick={this.logoutFunction}
        />
      </div>
    );
  }
}

export default withRouter(PageHeader);
