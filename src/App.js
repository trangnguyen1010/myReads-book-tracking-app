import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import * as BooksAPI from "./BooksAPI"
import ListBooks from "./ListBooks"
import SearchBooks from "./SearchBooks"

class BooksApp extends React.Component {
  state = {
    books : []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  shelves = [
    {key:'currentlyReading' , name: 'Currently Reading'},
    {key:'wantToRead' , name: 'Want to Read'},
    {key:'read' , name: 'Read'},
  ]

  ChangeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(books => {
      // if the book is new then add it to the state, and it's not changed to none
      if(book.shelf === 'none' && shelf !== 'none'){
        this.setState(state => {
          const newBooks = state.books.concat(book);
          return {books: newBooks}
        })
      }

      const updatedBooks = this.state.books.map(c => {
        // if it's already in the state, then change it's shelf
        if (c.id === book.id) {
          c.shelf = shelf
        }
        return c;
      });

      this.setState({
        books: updatedBooks,
      });
      
        // if 'none' shelve is chosen, then remove that book from the state
        if(shelf === 'none'){
          this.setState(state=>{
            const newBooks = state.books.filter(deleteBook => deleteBook.id !== book.id);
            return {books: newBooks}
          })
        }
    });
  }

  render() {
    const { books } = this.state;

    return (
      <div className="app">
        <Route path='/search'
        render={() => (
          <SearchBooks books={books} onChangeShelf={this.ChangeShelf} />
        )}
        />

        <Route exact path='/'
        render={() => (
          <ListBooks books={books} shelves={this.shelves} onChangeShelf={this.ChangeShelf} />
        )}
        />
      </div>
    )
  }
}


export default BooksApp
