import React, { Component } from "react";
import { Modal, Form, Input, TextArea, Button, Icon } from "semantic-ui-react";
import store from "../../store";
import { hideCreateNewsItem, handleAddNewsItem } from "../../actions/index.js";

class CreateNewsItem extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      title: "",
      body: "",
      author: ""
    };

    this.addNewsItem = this.addNewsItem.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.clearFields = this.clearFields.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        show: store.getState().createNewsItem.visibility,
        title: store.getState().createNewsItem.title,
        body: store.getState().createNewsItem.body,
        author: store.getState().userAuthentication.username
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  addNewsItem(event) {
    event.preventDefault();
    fetch("/news-service/news", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("JWT")
      },
      body: JSON.stringify({
        title: this.state.title,
        body: this.state.body,
        author: this.state.author
      })
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong ...");
        }
      })
      .then(data => {
        store.dispatch(handleAddNewsItem({ newsItem: data }));
        this.handleClose();
      });
  }

  clearFields() {
    this.setState({
      title: "",
      body: "",
      author: ""
    });
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  handleBodyChange(event) {
    this.setState({ body: event.target.value });
  }

  handleClose() {
    store.dispatch(hideCreateNewsItem());
  }

  render() {
    return (
      <Modal
        closeIcon
        className="site-modal"
        open={this.state.show}
        onClose={this.handleClose}
      >
        <Modal.Header>Post a New Article</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field
              label="Title"
              control={Input}
              placeholder="Enter Title"
              onChange={this.handleTitleChange}
            />
            <Form.Field
              label="Body"
              control={TextArea}
              placeholder="Enter Article Text"
              onChange={this.handleBodyChange}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={this.handleClose}>
            <Icon name="remove" /> Cancel
          </Button>
          <Button positive type="submit" onClick={this.addNewsItem}>
            <Icon name="checkmark" /> Submit
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default CreateNewsItem;
