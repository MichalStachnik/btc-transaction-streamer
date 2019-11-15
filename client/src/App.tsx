import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import Header from './components/Header/Header';
import Transaction from './components/Transaction/Transaction';
import BlockList from './components/BlockList/BlockList';
import About from './components/About/About';
import Graph from './components/Graph/Graph';

import './App.css';

class App extends Component<{}, { isLoading: boolean }> {
  constructor(props: any) {
    super(props);

    this.state = {
      isLoading: false
    };
  }

  toggleLoading = () => {
    this.setState({ isLoading: !this.state.isLoading });
  };

  render() {
    return (
      <div className="App">
        <Header isLoading={this.state.isLoading} />
        <Route exact path="/transaction/:transactionHash">
          <Transaction />
        </Route>
        <Redirect from="/" exact to="/btc/transaction-stream" />
        <Route exact path="/btc/transaction-stream">
          <BlockList
            className="block-list-container"
            toggleLoading={this.toggleLoading}
          />
        </Route>
        <Route exact path="/eth/transaction-stream">
          Coming soon...
        </Route>
        <Route exact path="/btc/chart">
          <Graph />
        </Route>
        <Route exact path="/eth/chart">
          Coming soon...
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
      </div>
    );
  }
}

export default App;
