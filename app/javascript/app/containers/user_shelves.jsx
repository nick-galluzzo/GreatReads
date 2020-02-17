import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchBooks, fetchShelves } from '../actions/index';
import Jumbotron from 'react-bootstrap/Jumbotron'
import { Link } from 'react-router-dom';

import Book from '../components/book';
import BookshelfOptions from '../components/bookshelf_options';

class UserShelves extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedShelf: this.props.shelves,
    }
  }

  updateShelfName(selectedShelfName) {
    if (!selectedShelfName) {
      selectedShelfName = this.state.selectedShelf.name
    }
    if (selectedShelfName === 'read') {
      return 'Reading'
    } else if (selectedShelfName  === 'current') {
        return 'Currently Reading'
    } else if (selectedShelfName === 'want') {
        return 'Want to Read'
    } else {
      return
    }
  }

  componentDidMount() {
    if (this.props.user !== null || !this.props.shelves) {
     this.props.fetchShelves(this.props.user)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.shelves !== this.props.shelves) {
      this.setState({selectedShelf: this.props.shelves[0].read.books})
    }
    if (prevState.selectedShelf !== this.state.selectedShelf) {
      this.updateShelfName();
    }
  }

  handleClick(currentShelf) {
    this.setState({selectedShelf: currentShelf.books })
  }


  defineShelves() {
      return (
        this.props.shelves.map((shelf) => {
          let currentShelf = Object.values(shelf)[0]
          let selectedItem = this.state.selectedShelf.name === currentShelf.name ? 'nav-item selected' : 'nav-item'
          return (
            <div className='bookshelf-navigation'>
              <p
                className={selectedItem}
                onClick={() => {this.handleClick(currentShelf)}}>{this.updateShelfName(currentShelf.name)}
                <span>({currentShelf.books.length})</span>
                </p>
            </div>
          )
        })
      )
  }

  combineShelves() {
    // This works but it's not scalable - need to restructure jbuilder format in API
    // If formatted correctly, we can pass params with the shelf name to create a DRY
    // method that allows us to comine all shelves.

      let readShelf = Object.values(this.props.shelves[0])[0].books
      let currentShelf = Object.values(this.props.shelves[1])[0].books
      let combinedShelf = readShelf.concat(currentShelf)

      this.setState({selectedShelf: combinedShelf})
  }

  render() {
    return (
      <div className='main-content-container'>
        <div className="main-content">
        <div className='shelf-content'>
          <section className="bookshelf-navigation-container">
            <h3 id='bookshelf-title'>Bookshelves</h3>
            {this.defineShelves()}
            <div className="bookshelf-navigation">
            <p onClick={() => {this.combineShelves()}}>Read + Reading</p>
            </div>
          </section>
          <section className="bookshelf-items-container">
            <BookshelfOptions selectedShelf={this.state.selectedShelf} shelfName={this.updateShelfName(this.state.selectedShelf.name)}/>
          </section>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  books: state.books,
  user: state.user,
  shelves: state.userBookshelves,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchBooks, fetchShelves }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(UserShelves);
