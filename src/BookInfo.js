import React from 'react'
import ShelfSelect from './ShelfSelect.js'

function BookInfo(props) {

  const book = props.book
  return (
    <div>
      <div className="book-info-container">
        <div className="book-info-header">
          <div className="book-top">
            <div className="book-cover book-info-cover"
              style={{height: 193, width: 128,
                backgroundImage: book.imageLinks ? `url("${book.imageLinks.thumbnail}")` : 'url("http://via.placeholder.com/128x193?text=No%20Cover")'}}>
            </div>
            {/* Drop down options to change shelf */}
            <ShelfSelect
              handleSelect={(book, shelf) => props.handleSelect(book, shelf)}
              book={book}
            />
          </div>
          <div className="book-info-title">
            <h1>
              {book.title}
            </h1>
            <h4>by: {book.authors ? book.authors.join(', ') : ''}</h4>
          </div>
        </div>
      </div>
      <div className="book-info-body">
        <p>{book.description}</p>
      </div>
      <div className="book-info-back fa fa-arrow-circle-left"
        onClick={() => props.history.goBack()}>
      </div>
    </div>
  )
}

export default BookInfo
