import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './NavItem.css';

class NavItem extends Component<{ name: string }, {}> {
  render() {
    const streamUrl = `/${this.props.name}/transaction-stream`;
    const chartUrl = `/${this.props.name}/chart`;

    return (
      <div className="nav-item">
        <div>{this.props.name}</div>
        <ul>
          <li>
            <NavLink exact to={streamUrl}>
              Transaction Stream
            </NavLink>
          </li>
          <li>
            <NavLink exact to={chartUrl}>
              Hash Rate
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}

export default NavItem;
