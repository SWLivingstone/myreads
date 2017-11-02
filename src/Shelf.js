import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Collapse } from 'react-collapse';
import ShelfSelect from './ShelfSelect.js'

class Shelf extends Component {

  state = {
    isOpen: true
  }

  handleSelect = (book, shelf) => {
    this.props.changeShelf(book, shelf)
  }

  toggleCollapse = () => {
    const toggle = this.state.isOpen ? false : true
    this.setState({ isOpen: toggle })
  }

  render() {
    return (
      <div>
        <div className="bookshelf">
          {this.props.shelfName &&
          <h2 onClick={() => this.toggleCollapse()} className="bookshelf-title">
            {this.props.shelfName}
            <i className={`collapse fa fa-angle-${this.state.isOpen ? "up" : "down"}`}/>
          </h2>}
          {/* Collapse and uncollapse Shelf on click */}
          <Collapse isOpened={this.state.isOpen} className="bookshelf-books">
            {this.props.books && this.props.books.length > 0 &&
              <ol className="books-grid">
                {this.props.books.map((book, index) => (
                  <li key={`${book.id}${this.props.shelfName}`}>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover-container">
                          {/* Link to dynamically created BookInfo page */}
                          <Link to={`${this.props.infoRoute}${book.id}`} onClick={() => window.scrollTo(0,0)} >
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
                            <div className="more-info fa fa-info-circle"></div>
                          </Link>
                        </div>
                          {/* Drop down options to change shelf */}
                          <ShelfSelect
                            handleSelect={(book, shelf) => this.handleSelect(book, shelf)}
                            book={book}
                          />
                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">{book.authors}</div>
                    </div>
                  </li>
                ))}
              </ol>
            }
          </Collapse>
        </div>
      </div>
    )
  }
}

export default Shelf
