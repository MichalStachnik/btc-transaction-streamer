import React, { Component }  from 'react';
import { NavLink } from 'react-router-dom';

import { ReactComponent as LogoSvg } from '../../assets/logo.svg';

import './Header.css';

class Header extends Component<{ isLoading: boolean }, { marketCap: number }> {
  constructor(props: any) {
    super(props);
    
    this.state = {
      marketCap: 0
    }
  }

  componentDidMount = () => {
    fetch('https://blockchain.info/q/marketcap')
      .then(res => res.json())
      .then(data => this.setState({ marketCap: data }))
      .catch(err => console.warn(err));
  }


  render() {
    return (
      <header className='header'>
        <LogoSvg className={ this.props.isLoading ? 'is-loading' : '' }/>
        <nav>
          <NavLink className='nav-home' exact to='/'>Home</NavLink>
          <NavLink className='nav-about' exact to='/about'>About</NavLink>
        </nav>
      </header>
    );
  }
}

export default Header;