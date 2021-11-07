import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import SearchPage from "./components/SearchPage";
import HomePage from "./components/HomePage";

class BooksApp extends React.Component {
  state = {
    books: [],
  };

  shelves = [
    { key: "currentlyReading", name: "Currently Reading" },
    { key: "wantToRead", name: "Want to Read" },
    { key: "read", name: "Read" },
  ];

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
  }

  UpdateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((books) => {
      if (book.shelf === "none" && shelf !== "none") {
        this.setState((curState) => ({ books: curState.books.concat(book) }));
      }

      const updateBooks = this.state.books.map((oldBook) => {
        if (oldBook.id === book.id) {
          return (oldBook.shelf = shelf);
        }
        return oldBook;
      });

      this.setState({
        books: updateBooks,
      });

      if (shelf === "none") {
        this.setState((curState) => {
          const newBooks = curState.books.filter(
            (deleteBook) => deleteBook.id !== book.id
          );
          return { books: newBooks };
        });
      }
    });
  };

  render() {
    const { books } = this.state;
    return (
      <div className="app">
        <Route
          path="/search"
          render={() => (
            <SearchPage books={books} onUpdateShelf={this.UpdateShelf} />
          )}
        />
        <Route
          exact
          path="/"
          render={() => (
            <HomePage
              books={books}
              shelves={this.shelves}
              onUpdateShelf={this.UpdateShelf}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
