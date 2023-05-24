import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import Header from './components/Header/Header';
import Transaction from './components/Transaction/Transaction';
import TransactionCardList from './components/TransactionCardList/TransactionCardList';
import About from './components/About/About';
import Graph from './components/Graph/Graph';

import { SearchValueProvider } from './contexts/SearchValueContext';

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
        <SearchValueProvider>
          <Header isLoading={this.state.isLoading} />
          <Redirect from="/" exact to="/btc/transaction-stream" />
          <Route
            exact
            path="/transaction/:transactionHash"
            component={Transaction}
          />
          <Route exact path="/btc/transaction-stream">
            <TransactionCardList
              className="transaction-card-list-container"
              toggleLoading={this.toggleLoading}
            />
          </Route>
          <Route exact path="/eth/transaction-stream">
            Coming soon...
          </Route>
          <Route exact path="/btc/chart" component={Graph} />
          <Route exact path="/eth/chart">
            Coming soon...
          </Route>
          <Route exact path="/about" component={About} />
        </SearchValueProvider>
      </div>
    );
  }
}

export default App;
