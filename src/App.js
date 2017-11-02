import React from 'react'
import { Route, Switch } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf.js'
import Header from './Header.js'
import AddSearchButton from './AddSearchButton.js'
import BookSearch from './BookSearch.js'
import BookInfo from './BookInfo.js'
import NoMatch from './NoMatch.js'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  shelves() {
    return (
      [
        {name: "Currently Reading", camleCase: 'currentlyReading'},
        {name: "Want To Read", camleCase: 'wantToRead'},
        {name: "Read", camleCase: 'read'}
      ]
    )
  }

  loadBookList() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books })
    }, () => null)
  }

  componentDidMount() {
    this.loadBookList()
  }

  changeShelf(book, shelf) {
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf
      this.setState(state => ({
        books: state.books.filter(b=> b.id !== book.id).concat([book])
      }))
    })
  }

  render() {
    return (
      <div className="app">
        <Switch>
          {/* Main Page */}
          <Route exact path="/" render={ () =>(
            <div className="list-books" onChange={this.loadBookList()}>
              <Header/>
              <div className="list-books-content">
                <div>
                  {this.shelves().map( (shelf, index) => (
                    <Shelf
                      key={shelf.name}
                      books={this.state.books.filter(book => book.shelf === shelf.camleCase)}
                      shelfName={shelf.name}
                      changeShelf={(book, shelf) => this.changeShelf(book, shelf)}
                      infoRoute="/info-"
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
            />
          )}/>
          {/* Dynamically created info pages for each book in the User's library */}
          {this.state.books.map(book => (
            <Route exact path={`/info-${book.id}`} key={book.id} render={({history}) => (
              <BookInfo
                book={book}
                history={history}
                handleSelect={(book, shelf) => this.changeShelf(book, shelf)}
              />
            )}
            />
          ))}
          <Route component={NoMatch}/>
        </Switch>
      </div>
    )
  }
}

export default BooksApp
