import React from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import * as BooksAPI from "../BooksAPI";

class SearchPage extends React.Component {
  state = {
    searchResults: [],
    value: "",
  };

  handleChange = (event) => {
    const value = event.target.value;
    this.setState({ value: value });

    if (value.length > 0) {
      BooksAPI.search(value)
        .then((books) => {
          if (books.error) {
            this.setState({ searchResults: [] });
          } else {
            this.setState({ searchResults: books });
          }
        })
        .catch(this.setState({ searchResults: [] }));
    } else {
      this.setState({ searchResults: [] });
    }
  };

  resetSearch = () => {
    this.setState({ searchResults: [] });
  };

  render() {
    const { books, onUpdateShelf } = this.props;
    // add shelves that I've selected before, and add 'none' if I havn't selected them
    this.state.searchResults.forEach(function(searchedBook) {
      books.forEach(function(book) {
        if (book.id === searchedBook.id) {
          searchedBook.shelf = book.shelf;
        }
      });
      if (!searchedBook.shelf) {
        searchedBook.shelf = "none";
      }
    });

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search" onClick={this.resetSearch}>
              Close
            </button>{" "}
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchResults.map((book) => (
              <Book key={book.id} book={book} onUpdateShelf={onUpdateShelf} />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;
