import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class AddSearchButton extends Component {
  render() {
    return(
      <div className="open-search">
        <Link
          to="/search"
          >Search Books
        </Link>
      </div>
    )
  }
}

export default AddSearchButton
