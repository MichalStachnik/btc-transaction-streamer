import React, { Component, createContext } from 'react';

const initialContext = {
  searchValue: '',
  changeSearchValue: (val: string) => {}
};

export const SearchValueContext = createContext(initialContext);

export class SearchValueProvider extends Component<
  {},
  { searchValue: string }
> {
  constructor(props: any) {
    super(props);
    this.state = { searchValue: '' };
  }
  changeSearchValue = (val: string) => {
    this.setState({ searchValue: val });
  };
  render() {
    return (
      <SearchValueContext.Provider
        value={{
          searchValue: this.state.searchValue,
          changeSearchValue: this.changeSearchValue
        }}
      >
        {this.props.children}
      </SearchValueContext.Provider>
    );
  }
}
