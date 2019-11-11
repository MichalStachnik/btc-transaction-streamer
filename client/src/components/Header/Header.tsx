import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import NavItem from '../NavItem/NavItem';

import { ReactComponent as LogoSvg } from '../../assets/logo.svg';

import './Header.css';

class Header extends Component<
  { isLoading: boolean },
  { marketCap: number; menuClass: string }
> {
  constructor(props: any) {
    super(props);

    this.state = {
      marketCap: 0,
      menuClass: ''
    };
  }

  componentDidMount = () => {
    fetch('https://blockchain.info/q/marketcap')
      .then(res => res.json())
      .then(data => this.setState({ marketCap: data }))
      .catch(err => console.warn(err));
  };

  onMenuEnter = () => {
    console.log('menu entered');
    this.setState({ menuClass: 'menu-open' });
  };

  onMouseLeave = () => {
    console.log('menu left');
    this.setState({ menuClass: '' });
  };

  render() {
    return (
      <header className="header">
        <LogoSvg className={this.props.isLoading ? 'is-loading' : ''} />
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
