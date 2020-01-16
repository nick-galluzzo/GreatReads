import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchBooks, fetchShelves } from '../actions/index';

import Book from '../components/book';

class BookList extends React.Component {
  componentDidMount() {
    this.props.fetchBooks();

    if (this.props.user !== null) {
    this.props.fetchShelves(this.props.user);
    }
  }

  renderBook() {
    if this.props.books {
    const { books } = this.props;
    return books.map((book) => <Book book={book} key={book.id} />);
  }
  }

  render() {
      return (
        <div className="main-content-container">
          <div className="main-content">
           <div className='home-book-list'>
           <h1> GreatReads </h1>
            { this.renderBook() }
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


export default connect(mapStateToProps, mapDispatchToProps)(BookList);
