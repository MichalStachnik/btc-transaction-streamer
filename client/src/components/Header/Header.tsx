import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import NavItem from '../NavItem/NavItem';
import SearchInput from '../SearchInput/SearchInput';

import { ReactComponent as LogoSvg } from '../../assets/logo.svg';

import './Header.css';

interface Props {
  isLoading: boolean;
}

interface State {
  marketCap: number;
}

class Header extends Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      marketCap: 0
    };
  }

  componentDidMount = () => {
    fetch('https://blockchain.info/q/marketcap')
      .then(res => res.json())
      .then(data => this.setState({ marketCap: data }))
      .catch(err => console.warn(err));
  };

  render() {
    return (
      <header className="Header">
        <NavLink exact to="/btc/transaction-stream">
          <LogoSvg className={this.props.isLoading ? 'is-loading' : ''} />
        </NavLink>
        <div className="search">
          <SearchInput />
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
