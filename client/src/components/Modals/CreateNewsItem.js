import React, { Component } from "react";
import { Modal, Form, Input, TextArea, Button, Icon } from "semantic-ui-react";
import store from "../../store";
import { hideCreateNewsItem } from "../../actions/index.js";
import createNewsItem from "../../data/create/CreateNewsItem";

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
    const { title, body, author } = this.state;
    createNewsItem({ title, body, author });
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
