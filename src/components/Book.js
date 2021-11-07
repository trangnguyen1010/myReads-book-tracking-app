import React from "react";
import BookControl from "./BookControl";

class Book extends React.Component {
  render() {
    const { book, onUpdateShelf } = this.props;

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${book.imageLinks &&
                  book.imageLinks.thumbnail})`,
              }}
            />
            <BookControl book={book} onUpdateShelf={onUpdateShelf} />
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">
            {book.authors && book.authors.join(", ")}
          </div>
        </div>
      </li>
    );
  }
}

export default Book;
