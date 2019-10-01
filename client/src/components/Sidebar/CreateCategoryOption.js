import React, { Component } from "react";
import { store } from "../../store";
import { showCreateCategory } from "../../actions";
import { Popup, Icon } from "semantic-ui-react";

export default class CreateCategoryOption extends Component {
  showCreateCategory = () => {
    store.dispatch(showCreateCategory());
  };

  render() {
    return (
      <Popup
        content="Create a new project category"
        trigger={
          <Icon name="folder open outline" onClick={this.showCreateCategory} />
        }
        position="right center"
      />
    );
  }
}
