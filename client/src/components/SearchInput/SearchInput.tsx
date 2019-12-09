import React from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

import { SearchValueContext } from '../../contexts/SearchValueContext';

import './SearchInput.css';

interface Props {
  history: any;
}
interface State {
  value: string;
}

class SearchInput extends React.Component<Props & RouteComponentProps, State> {
  static contextType = SearchValueContext;
  constructor(props: any) {
    super(props);
    this.state = {
      value: ''
    };
  }

  handleSearchChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    this.context.changeSearchValue(evt.target.value);
    this.setState({ value: evt.target.value }, () => {
      if (this.state.value.length === 64) {
        this.props.history.push(`/transaction/${this.state.value}`);
      } else if (this.state.value.length === 0) {
        this.props.history.push('/btc/transaction-stream');
      }
    });
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

export default withRouter(SearchInput);
