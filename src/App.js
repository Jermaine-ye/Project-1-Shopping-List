import React from 'react';
import './App.css';

import Searchbar from '/mnt/c/Users/JIAMIN/Desktop/rocketbootcamp/Projects/shopping_proj/src/Seachbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft,
  faCircle,
  faCheckCircle,
  faPlus,
  faCircleMinus,
} from '@fortawesome/free-solid-svg-icons';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      itemsArray: [],
      inputValue: '',
      searchValue: '',
      isSorted: '',
    };
  }

  setSearchValue = (input) => {
    console.log('search input' + this.state.searchValue);
    this.setState({ searchValue: input });
  };

  handleSearchClear = () => {
    console.log('clear search' + this.state.searchValue);
    this.setState({ searchValue: '' });
  };

  setInputValue = (input) => {
    this.setState({ inputValue: input });
  };

  handleAddButtonClick = () => {
    const newItem = {
      itemName: this.state.inputValue,
      quantity: 1,
      isCompleted: false,
    };

    if (this.state.inputValue === '') {
      return;
    } else {
      console.log('Add button ' + this.state.inputValue);
      this.setState({
        itemsArray: [...this.state.itemsArray, newItem],
        inputValue: '',
        itemName: '',
        id: this.state.itemName,
        quantity: 1,
        isCompleted: false,
      });
    }
  };

  handleDeleteButtonClick = (index) => {
    this.state.itemsArray.splice(index, 1);
    this.setState({ itemsArray: [...this.state.itemsArray] });
  };

  handleIncrement = (index) => {
    const newitemsArray = [...this.state.itemsArray];
    newitemsArray[index].quantity++;
    console.log(
      'increment count quantity ' +
        this.state.itemsArray[index].itemName +
        ' ' +
        this.state.itemsArray[index].quantity
    );
    this.setState({ itemsArray: newitemsArray });
  };

  handleDecrement = (index) => {
    const newitemsArray = [...this.state.itemsArray];
    newitemsArray[index].quantity--;
    console.log(
      'decrement count quantity ' +
        this.state.itemsArray[index].itemName +
        ' ' +
        this.state.itemsArray[index].quantity
    );
    this.setState({ itemsArray: newitemsArray });
  };

  toggleComplete = (index) => {
    const newitemsArray = [...this.state.itemsArray];
    newitemsArray[index].isCompleted = !newitemsArray[index].isCompleted;
    console.log('is toggle complete');
    this.setState({ itemsArray: newitemsArray });
  };

  render() {
    let filtered = this.state.itemsArray.filter(
      (element) =>
        element.itemName
          .toLowerCase()
          .indexOf(this.state.searchValue.toLowerCase()) !== -1
    );

    return (
      <div className="app-background">
        <h1>List It!</h1>
        <div className="main-list-container ">
          <Searchbar
            searchValueProp={this.state.searchValue}
            searchValuePropFn={this.setSearchValue}
            SearchClearFn={this.handleSearchClear}
          />
          <hr />

          <div className="add-item-box">
            <input
              value={this.state.inputValue}
              onChange={(e) => this.setInputValue(e.target.value)}
              className="add-item-input"
              placeholder="Add item..."
            />
            <FontAwesomeIcon
              className="add-item-input-button"
              icon={faPlus}
              onClick={() => this.handleAddButtonClick()}
            />
          </div>
          <div className="main-list-body">
            <div className="item-list">
              {filtered && filtered.length > 0
                ? filtered.map((item, index) => (
                    <div className="item-container" key={index}>
                      <div
                        className="item-name"
                        onClick={() => {
                          this.toggleComplete(index);
                        }}
                      >
                        {item.isCompleted ? (
                          <>
                            <FontAwesomeIcon icon={faCheckCircle} />
                            <span className="completed"> {item.itemName}</span>
                          </>
                        ) : (
                          <>
                            <FontAwesomeIcon icon={faCircle} />
                            <span>{item.itemName}</span>
                          </>
                        )}
                      </div>
                      {console.log(
                        'items array' + this.state.itemsArray[index]
                      )}
                      <div className="quantity">
                        <div className="delete-button">
                          <button>
                            <FontAwesomeIcon
                              icon={faCircleMinus}
                              onClick={() =>
                                this.handleDeleteButtonClick(index)
                              }
                            />
                          </button>
                        </div>

                        {console.log(
                          'button quantity' +
                            this.state.itemsArray[index].quantity
                        )}
                        <button>
                          <FontAwesomeIcon
                            icon={faChevronLeft}
                            onClick={() => {
                              if (this.state.itemsArray[index].quantity === 0) {
                                return;
                              } else {
                                this.handleDecrement(index);
                              }
                            }}
                          />
                        </button>
                        <span> {item.quantity} </span>
                        <button>
                          <FontAwesomeIcon
                            icon={faChevronRight}
                            onClick={() => {
                              this.handleIncrement(index);
                            }}
                          />
                        </button>
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
