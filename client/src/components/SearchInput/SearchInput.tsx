import React from 'react';
import { Link } from 'react-router-dom';

import './SearchInput.css';

interface Props {}
interface State {
  value: string;
}

class SearchInput extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: ''
    };
  }

  handleSearchChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: evt.target.value });
  };

  handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  };

  render() {
    return (
      <form className="search-form" onSubmit={this.handleSubmit}>
        <input
          onChange={this.handleSearchChange}
          value={this.state.value}
          name="searchValue"
          type="text"
          placeholder="search transaction"
          className="search-input"
        />
        <button
          className="search-button"
          style={{
            cursor: this.state.value.length < 64 ? 'not-allowed' : 'pointer'
          }}
          type="submit"
          disabled={this.state.value.length !== 64}
        >
          <Link
            style={{
              pointerEvents: this.state.value.length === 64 ? 'unset' : 'none'
            }}
            to={`/transaction/${this.state.value}`}
          >
            <i className="fa fa-search"></i>
            <span>{64 - this.state.value.length}</span>
          </Link>
        </button>
      </form>
    );
  }
}

export default SearchInput;
