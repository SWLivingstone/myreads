import React, { Component } from 'react'

// <button onClick={() => this.props.history.goBack()} > go back</button>

class BookInfo extends Component {

  render() {
    const book = this.props.book
    return (
      <div>
        <div className="book-info-container">
          <div className="book-info-header">
            <div>
              <div className="book-cover book-info-cover" style={{height: 193, width: 128, backgroundImage: `url("${book.imageLinks.thumbnail}")`}}></div>
            </div>
            <div className="book-info-title">
              <h1>
                {book.title}
              </h1>
              <h4>by: {book.authors}</h4>
            </div>
          </div>
        </div>
        <div className="book-info-body">
          <p>{book.description}</p>
        </div>
        <div className="book-info-back fa fa-arrow-circle-left"
          onClick={() => this.props.history.goBack()}>
        </div>
      </div>
    )
  }
}

export default BookInfo
