import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import NavItem from '../NavItem/NavItem';
import SearchInput from '../SearchInput/SearchInput';

import { ReactComponent as LogoSvg } from '../../assets/logo.svg';

import './Header.css';

interface Props {
  isLoading: boolean;
}

interface State {
  marketCap: number;
  menuClass: string;
  searchValue: string;
}

class Header extends Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      marketCap: 0,
      menuClass: '',
      searchValue: ''
    };
  }

  componentDidMount = () => {
    fetch('https://blockchain.info/q/marketcap')
      .then(res => res.json())
      .then(data => this.setState({ marketCap: data }))
      .catch(err => console.warn(err));
  };

  handleSearchChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchValue: evt.target.value }, () => {
      if (this.state.searchValue.length === 64) {
        // Change route because we have a btc transaction length
        // this.props.history.push(`/transaction/${this.state.searchValue}`);
      }
    });
  };

  handleSearch = async () => {
    const data = await fetch(`/search/${this.state.searchValue}`);
    const parsedData = await data.json();
    console.log('data back', parsedData);
    console.log('data as json', JSON.parse(parsedData.data));
  };

  render() {
    return (
      <header className="header">
        <LogoSvg className={this.props.isLoading ? 'is-loading' : ''} />
        <div className="search">
          <SearchInput />
          {/* <input
            onChange={this.handleSearchChange}
            value={this.state.searchValue}
            type="text"
          /> */}
          {/* <button onClick={this.handleSearch}>search</button> */}
          {/* <Link to={`/transaction/${this.state.searchValue}`}>search</Link> */}
        </div>
        <nav>
          <NavItem name="BTC"></NavItem>
          <NavItem name="ETH"></NavItem>
          <div className="nav-item">
            <NavLink exact to="/about" className="about-link">
              About
            </NavLink>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
