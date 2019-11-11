import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './NavItem.css';

class NavItem extends Component<{ name: string }, { navItemClass: string }> {
  constructor(props: any) {
    super(props);

    this.state = {
      navItemClass: ''
    };
  }

  onMenuEnter = () => {
    this.setState({ navItemClass: 'open' });
  };

  onMouseLeave = () => {
    this.setState({ navItemClass: '' });
  };

  render() {
    return (
      <div
        className="nav-item"
        onMouseEnter={this.onMenuEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <div>{this.props.name}</div>
        <ul className={this.state.navItemClass}>
          <li>
            <NavLink exact to="/">
              Transaction Stream
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/btc/chart">
              Hash Rate
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}

export default NavItem;
