import React from 'react'
import HomePage from "./HomePage"
import Book from "./Book"
import * as BooksAPI from "./BooksAPI"

class SearchBooks extends React.Component {
  state = {
    searchResults : [],
    value: ''
  }

  handleChange = event => {
    const value = event.target.value;
    this.setState({ value: value });

    if (value.length > 0) {
      BooksAPI.search(value).then(books => {
        if (books.error) {
          this.setState({ searchResults: [] });
        } else {
          this.setState({ searchResults: books });
        }
      }).catch(this.setState({ searchResults: [] }));
    }else {
      this.setState({ searchResults: [] });
    }
  };

  resetSearch = () => {
    this.setState({ searchResults: [] });
  }

  render() {
    const { books, onChangeShelf } = this.props;
    // add shelves that I've selected before, and add 'none' if I havn't selected them
    this.state.searchResults.forEach(function(searchedBook){
      books.forEach(function(book){
        if (book.id === searchedBook.id) {
          searchedBook.shelf = book.shelf;
        }
      });
      if(!searchedBook.shelf){
        searchedBook.shelf = 'none';
      }
    })

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <HomePage resetSearch={this.resetSearch} />
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author" value={this.state.value} onChange={this.handleChange} />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {this.state.searchResults.map(book => (
              <Book key={book.id} book={book} onChangeShelf={onChangeShelf} />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
