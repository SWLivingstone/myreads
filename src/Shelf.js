import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Collapse } from 'react-collapse';

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
          <Collapse isOpened={this.state.isOpen} className="bookshelf-books">
            <ol className="books-grid">
              {this.props.books.map((book, index) => (
                <li key={`${book.id}${this.props.shelfName}`}>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover-container">
                        <Link to={`${book.id}-info`}>
                          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
                          <div className="more-info fa fa-info-circle"></div>
                        </Link>
                      </div>
                      <div className="book-shelf-changer">
                        <select onChange={(event) => this.handleSelect(book, event.target.value)}
                          value={book.shelf || "none"}>
                          <option value="none" disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                  </div>
                </li>
              ))}
            </ol>
          </Collapse>
        </div>
      </div>
    )
  }
}

export default Shelf
