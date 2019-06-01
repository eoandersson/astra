import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import store from "../../store";
import { hideEditNewsItem, handleEditNewsItems } from "../../actions/index.js";

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
    console.log(this.state.newsId);
    fetch("/news-service/news", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("JWT")
      },
      body: JSON.stringify({
        newsId: this.state.newsId,
        title: this.state.title,
        body: this.state.body,
        author: this.state.author
      })
    }).then(response => {
      if (response.status === 200) {
        var payload = {
          newsItem: this.state.newsItem,
          title: this.state.title,
          body: this.state.body
        };
        store.dispatch(handleEditNewsItems(payload));
        this.handleClose();
      } else {
        console.log(response.status);
      }
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
    store.dispatch(hideEditNewsItem());
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
            {this.state.title}
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
                value={this.state.title}
              />
            </Form.Group>
            <Form.Group controlId="formBasicBody">
              <Form.Label>Body</Form.Label>
              <Form.Control
                as="textarea"
                rows="4"
                placeholder="Enter body"
                onChange={this.handleBodyChange}
                value={this.state.body}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" type="submit" onClick={this.editNewsItem}>
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

export default EditNewsItem;
