import React from "react";
import BookShelf from "./BookShelf";
import { Link } from "react-router-dom";

class HomePage extends React.Component {
  render() {
    const { books, shelves, onUpdateShelf } = this.props;
    console.log(books);
    //filter books for a particular shelf
    function filterBooks(shelf) {
      return books.filter((book) => book.shelf === shelf.key);
    }
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelves.map((shelf) => (
              <BookShelf
                key={shelf.key}
                books={filterBooks(shelf)}
                shelf={shelf}
                onUpdateShelf={onUpdateShelf}
              />
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">
            <button>Add a book</button>
          </Link>
        </div>
      </div>
    );
  }
}
export default HomePage;
