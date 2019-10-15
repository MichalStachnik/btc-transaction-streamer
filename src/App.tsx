import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Header from './components/Header/Header';
import BlockList from './components/BlockList/BlockList';
import About from './components/About/About';

import './App.css';

class App extends Component<{}, { isLoading: boolean }> {
  constructor(props: any) {
    super(props);

    this.state = {
      isLoading: false
    }
  }

  toggleLoading = () => {
    this.setState({ isLoading: !this.state.isLoading });
  }
  
  render() {
    return (
      <div className='App'>
        <Header
          isLoading={this.state.isLoading}
        />
        <Route exact path='/'>
          <BlockList 
            className='block-list-container'
            toggleLoading={this.toggleLoading}
          />
        </Route>
        <Route exact path='/about'>
          <About/>
        </Route>
      </div>
    );
  }
}

export default App;
