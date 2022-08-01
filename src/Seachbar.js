import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowDownAZ,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';

export default class Searchbar extends React.Component {
  render() {
    return (
      <div className="search-box">
        {console.log('current search item:' + this.props.itemsArray)}
        <input
          value={this.props.searchValueProp}
          onChange={(e) => this.props.searchValuePropFn(e.target.value)}
          className="search-box"
          placeholder="Search here..."
        />
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="search-box-button"
          onClick={() => this.props.SearchClearFn()}
        />
        <div className="sort-button">
          <button>
            <FontAwesomeIcon
              icon={faArrowDownAZ}
              onClick={() => alert('Hello')}
            />
          </button>
        </div>
      </div>
    );
  }
}
