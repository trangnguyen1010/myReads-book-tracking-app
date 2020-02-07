import React from 'react'
import BookControl from "./BookControl"

class Book extends React.Component {
  render() {
    const { book, onChangeShelf } = this.props;

    return (
      <li>
          <div className="book">
            <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks &&
                book.imageLinks.thumbnail})` }}></div>
              <BookControl book={book} onChangeShelf={onChangeShelf} />
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors && book.authors.join(', ')}</div>
          </div>
      </li>
    )
  }
}

export default Book
