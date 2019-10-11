import React from 'react';
import { NavLink } from 'react-router-dom';

import './Header.css';

const Header: React.FC = () => {
  return (
    <header className='header'>
      <h3>BTC Transaction Streamer</h3>
      <nav>
        <NavLink className='nav-home' exact to='/'>Home</NavLink>
        <NavLink className='nab-about' exact to='/about'>About</NavLink>
      </nav>
    </header>
  );
}

export default Header;