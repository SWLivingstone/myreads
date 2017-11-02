import React, { Component } from 'react'
import Shelf from './Shelf.js'
import { Link, Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookInfo from './BookInfo.js'
class BookSearch extends Component {

  state = {
    query: '',
    result: [],
    myBooks: []
  }

  handleQuery = event => {
    this.setState({query: event.target.value})
    if (this.state.query)
      this.updateStateWithResults()
  }

  componentDidMount() {
    BooksAPI.getAll().then((myBooks) => {
      this.setState({myBooks})
    })
  }

  /**
  * @description Client side manipulation of myBooks
  * @param {object} book - The book that is changing shelves
  * @param {string} shelf - The shelf to be changed to
  */
  updateMyBooks(book, shelf) {
    if (!book.shelf || book.shelf === "none"){
      book.shelf = shelf
      this.setState(() => ({
        myBooks: this.state.myBooks.concat([book])
      }))
    }
    else if (shelf === "none") {
      this.setState(() => ({
        myBooks: this.state.myBooks.filter((b) => {
          return b.id !== book.id
        })
      }))
    }
    else {
      book.shelf = shelf
      this.setState(() => ({
        myBooks: this.state.myBooks.map((b) => {
          if (b.id !== book.id)
            return b
          else
            return book
        })
      }))
    }
  }

  changeShelf(book, shelf) {
    BooksAPI.update(book, shelf)
    .then(() => this.updateMyBooks(book, shelf))
    .then(() => this.updateStateWithResults())
  }

  /**
  * @description Updates search results
  * Compares search results with myBooks to determine which
  * which books from the search results are already in the collection.
  */
  updateStateWithResults() {
    const myBooks = this.state.myBooks.map((book) => book.id)
    
    BooksAPI.search(this.state.query, 20).then( books => {
      if (books && books.length > 0){
        this.setState(() => ({
          result: books.map( book => {
            if (myBooks.includes(book.id))
              return this.state.myBooks.find( b => b.id === book.id)
            else
              return book
          })
        }))
      }
    })
  }


  render() {
    return (
      <div>
        <Route exact path='/search' render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search" >Close</Link>
              <div className="search-books-input-wrapper">
                <input onChange={event => this.handleQuery(event)} type="text" placeholder="Search by title or author"/>
              </div>
            </div>
              <div className="search-books-results">
                {/* Display books from search results that are NOT already in
                  user's libray */}
                <Shelf
                  books={this.state.result.filter( book => {
                    if (book)
                      return !book.shelf
                    else
                      return null
                  })}
                  key="Search Results"
                  changeShelf={(book, shelf) => this.changeShelf(book, shelf)}
                  shelfName="Not In My Collection"
                  infoRoute="/search/info-"
                />
                {/* Display books from search results that ARE currently in
                  the user's libray */}
                <Shelf
                  books={this.state.result.filter( book => book && book.shelf && book.shelf !== "none")}
                  changeShelf={(book, shelf) => this.changeShelf(book, shelf)}
                  shelfName="My Books"
                  infoRoute="/search/info-"
                />
              </div>
            </div>
          )}/>
          {/* Dynamically generate info pages for each book in the search results */}
          {this.state.result.map((book) => (
            <Route key={`search-info-${book.id}`} path={`/search/info-${book.id}`} render={({history}) => (
              <BookInfo
                book={book}
                history={history}
                handleSelect={(book, shelf) => this.changeShelf(book, shelf)}
              />
            )}/>
          ))}
      </div>
    )
  }
}

export default BookSearch
