import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf.js'
import Header from './Header.js'
import AddSearchButton from './AddSearchButton.js'
import BookSearch from './BookSearch.js'
import BookInfo from './BookInfo.js'

class BooksApp extends React.Component {
  state = {
    currentBookList: [],
    books: [],
    shelves: [
      {name: "Currently Reading", camleCase: 'currentlyReading'},
      {name: "Want To Read", camleCase: 'wantToRead'},
      {name: "Read", camleCase: 'read'}
    ]
  }

  loadBookList() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books, currentBookList: books })
    }, () => null)
  }

  componentDidMount() {
    this.loadBookList()
  }

  changeShelf(book, shelf) {
    return BooksAPI.update(book, shelf)
    .then(() => this.loadBookList())
  }

  setCurrentBookList(books) {
    this.setState({ currentBookList: books })
  }

  render() {
    return (
      <div className="app">
        {/* Main Page */}
        <Route exact path="/" render={ () =>(
          <div className="list-books" onChange={this.loadBookList()}>
            <Header/>
            <div className="list-books-content">
              <div>
                {this.state.shelves.map( (shelf, index) => (
                  <Shelf
                    key={index}
                    books={this.state.books.filter(book => book.shelf === shelf.camleCase)}
                    shelfName={shelf.name}
                    changeShelf={(book, shelf) => this.changeShelf(book, shelf)}
                  />
                ))}
              </div>
            </div>
            <AddSearchButton/>
          </div>
        )}/>
        {/* Search Page */}
        <Route path="/search" render={ ({history}) => (
          <BookSearch
            currentBookList={this.state.currentBookList}
            myBooks={this.state.books}
            changeShelf={(book, shelf) => this.changeShelf(book, shelf)}
            setCurrentBookList={books => this.setCurrentBookList(books)}
          />
        )}/>
        {/* Dynamically created BookInfo pages */}
        {this.state.currentBookList.map(book => (
          <Route exact path={`/${book.id}-info`} key={book.id} render={({history}) => (
            <BookInfo
              book={book}
              history={history}
            />
          )}
          />
        ))}
      </div>
    )
  }
}

export default BooksApp
