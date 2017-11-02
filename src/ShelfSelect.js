import React from 'react'

function ShelfSelect(props) {

  return (
    <div className="book-shelf-changer">
        <select onChange={(event) => props.handleSelect(props.book, event.target.value)}
          value={props.book.shelf || "none"}>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
    </div>
  )
}

export default ShelfSelect
