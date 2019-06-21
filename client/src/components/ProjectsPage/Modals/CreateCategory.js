import React, { Component } from "react";
import store from "../../../store";
import { hideCreateCategory, addCategory } from "../../../actions";

import { Modal, Form, Icon, Button, Input } from "semantic-ui-react";

export default class CreateCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      category: ""
    };
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        show: store.getState().createCategoryReducer.visibility
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  addCategory = () => {
    const { category } = this.state;
    fetch("/project-service/projects/category", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("JWT")
      },
      body: JSON.stringify({
        username: store.getState().userAuthentication.username,
        category: category
      })
    }).then(response => {
      if (response.status === 200) {
        store.dispatch(addCategory(category));
        store.dispatch(hideCreateCategory());
      } else {
        console.log("Error");
      }
    });
  };

  handleCategoryChange = event => {
    this.setState({ category: event.target.value });
  };

  handleClose = () => {
    store.dispatch(hideCreateCategory());
  };

  render() {
    const { show } = this.state;
    return (
      <Modal
        closeIcon
        className="site-modal"
        open={show}
        size="small"
        onClose={this.handleClose}
      >
        <Modal.Header>Add a Project Category</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field
              control={Input}
              label="Category Name"
              placeholder="Enter Category Name"
              onChange={this.handleCategoryChange}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={this.handleClose}>
            <Icon name="remove" /> Close
          </Button>
          <Button positive type="submit" onClick={this.addCategory}>
            <Icon name="checkmark" /> Submit
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
