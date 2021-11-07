import React, { Component } from "react";

class BookControl extends Component {
  state = {
    value: this.props.book.shelf,
  };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
    this.props.onUpdateShelf(this.props.book, event.target.value);
  };

  render() {
    return (
      <div className="book-shelf-changer">
        <select value={this.state.value} onChange={this.handleChange}>
          <option value="move">Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}
export default BookControl;
