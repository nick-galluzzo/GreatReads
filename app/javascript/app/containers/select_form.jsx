import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSubscription, fetchShelves } from '../actions/index';
import ShelfButton from '../components/shelf_button';

const options = [
  { value: 'want', label: 'Want to Read' },
  { value: 'read', label: 'Read' },
  { value: 'current', label: 'Currently Reading' },
];

class SelectForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      selectedShelfId: null,
      bookInWantShelf: null,
      bookInReadShelf: null,
      bookInCurrentShelf: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  fetchShelfId(selectedOption) {
    this.props.shelves.map((shelf) => {
      if (Object.keys(shelf)[0] === selectedOption.value) {
        const assignedShelf = Object.keys(shelf)[0]
        const selectedShelfId = shelf[assignedShelf].id
        this.setState({selectedShelfId: selectedShelfId})
      }
    })
  }

  componentWillReceiveProps(nextProps) {


  //   if (this.state.selectedOption !== null) {
  //     console.log('testing..')
  //     console.log(nextProps.shelves === this.props.shelves)
  //     nextProps.shelves.map((shelf, id) => {
  //       if (Object.keys(shelf)[0] === this.state.selectedOption.value) {
  //         const assignedShelf = Object.keys(shelf)
  //         const nextShelfCount = shelf[assignedShelf].books.length
  //         const previousShelfCount = this.props.shelves[id][assignedShelf].books.length
  //         if (nextShelfCount > previousShelfCount) {
  //           this.props.fetchShelves(this.props.user)
  //           // console.log('hi')
  //         }
  //       }
  //       // console.log(Object.values(shelf)[0])
  //   })
  // }


  //   if (this.props.shelves.length !== 0) {
  //   console.log(Object.values(nextProps.shelves[this.state.selectedOption]))
  // }
  }


  handleSubmit(event) {
    event.preventDefault();
    this.props.createSubscription(this.state.selectedShelfId, this.props.book.id)
    this.props.fetchShelves(this.props.user)
  }

  handleChange (selectedOption) {
    this.setState({ selectedOption });
    this.fetchShelfId(selectedOption);
  };

  render() {
    const { selectedOption } = this.state;
    let btnClass = this.state.bookInWantShelf ? 'btn btn-success' : '';
    let disabledClass = this.state.user ? '' : 'hidden';

    return (
      <div className='add-to-shelf-container'>
      <ShelfButton book={this.props.book}/>
      <form className='add-to-shelf-form' onSubmit={this.handleSubmit}>
        <fieldset className='form-item'>
          <legend className="selectedOption">
              Add:
              <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={options}
              />
          </legend>
        </fieldset>
        <button className="btn btn-primary">Add To Shelf</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  shelves: state.userBookshelves,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createSubscription, fetchShelves }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectForm);
