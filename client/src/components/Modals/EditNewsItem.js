import React, { Component } from "react";
import { Modal, Form, Input, TextArea, Button, Icon } from "semantic-ui-react";
import store from "../../store";
import { hideEditNewsItem } from "../../actions/index.js";
import updateNewsItem from "../../data/update/UpdateNewsItem";

class EditNewsItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      newsId: "",
      title: "",
      body: "",
      author: ""
    };

    this.editNewsItem = this.editNewsItem.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.clearFields = this.clearFields.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        show: store.getState().editNewsItem.visibility,
        title: store.getState().editNewsItem.title,
        body: store.getState().editNewsItem.body,
        author: store.getState().editNewsItem.author,
        newsItem: store.getState().editNewsItem.newsItem,
        newsId: store.getState().editNewsItem.newsId
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  editNewsItem(event) {
    event.preventDefault();
    const { newsItem, newsId, title, body, author } = this.state;
    updateNewsItem({ newsItem, newsId, title, body, author });
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
    store.dispatch(hideEditNewsItem());
  }

  render() {
    return (
      <Modal
        closeIcon
        className="site-modal"
        open={this.state.show}
        onClose={this.handleClose}
      >
        <Modal.Header>{this.state.title}</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field
              label="Title"
              control={Input}
              placeholder="Enter Title"
              onChange={this.handleTitleChange}
              value={this.state.title}
            />
            <Form.Field
              label="Body"
              control={TextArea}
              placeholder="Enter Article Text"
              onChange={this.handleBodyChange}
              value={this.state.body}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={this.handleClose}>
            <Icon name="remove" /> Cancel
          </Button>
          <Button positive type="submit" onClick={this.editNewsItem}>
            <Icon name="checkmark" /> Save
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default EditNewsItem;
