import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import store from "./../../store";
import { hideCreateNewsItem, handleAddNewsItem } from "../../actions/index.js";

class CreateNewsItem extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      title: "",
      body: "",
      author: "Karl"
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
        author: store.getState().createNewsItem.author
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
        "Content-Type": "application/json"
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
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={this.state.show}
        onHide={this.handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Post a new article
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                onChange={this.handleTitleChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicBody">
              <Form.Label>Body</Form.Label>
              <Form.Control
                as="textarea"
                rows="4"
                placeholder="Enter body"
                onChange={this.handleBodyChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" type="submit" onClick={this.addNewsItem}>
            Submit
          </Button>
          <Button variant="outline-primary" onClick={this.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default CreateNewsItem;
