import React, { Component } from 'react'
import Shelf from './Shelf.js'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class BookSearch extends Component {

  state = {
    query: '',
    result: this.props.currentBookList
  }

  handleQuery = event => {
    this.setState({query: event.target.value})
    this.updateStateWithResults()
  }

  changeShelf = (book, shelf) => {
    this.props.changeShelf(book, shelf)
    .then(() => this.updateStateWithResults())
  }

  // Compares myBooks with search result.
  // Where myBooks matches Result swaps in book from myBooks
  // so that search results display current bookShelf
  updateStateWithResults() {
    const myBooks = this.props.myBooks.map((book) => book.id)

    BooksAPI.search(this.state.query, 20).then( books => {
      if (books && books.length > 0){
        this.setState(() => ({
          result: books.map( book => {
            if (myBooks.includes(book.id))
              return this.props.myBooks.find( b => b.id === book.id)
            else
              return book
          })
        }))
      }
      this.props.setCurrentBookList(this.state.result)
    })
  }


  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search" >Close</Link>
          <div className="search-books-input-wrapper">
            <input onChange={event => this.handleQuery(event)} type="text" placeholder="Search by title or author"/>
          </div>
        </div>
          <div className="search-books-results">
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
            />
            <Shelf
              books={this.state.result.filter( book => book && book.shelf && book.shelf !== "none")}
              changeShelf={(book, shelf) => this.changeShelf(book, shelf)}
              shelfName="My Books"
            />
          </div>
      </div>
    )
  }
}

export default BookSearch
