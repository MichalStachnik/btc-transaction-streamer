import React, { Component } from 'react';

import BlockList from './components/BlockList/BlockList';

import './App.css';

class App extends Component<{}, { transactionStream: any[] }> {
  constructor(props: any) {
    super(props);

    this.state = {
      transactionStream: []
    }
  }

  WS = new WebSocket('wss://ws.blockchain.info/inv')

  componentDidMount = () => {

    this.WS.onopen = () => {
      console.log('connected');
      const op = {"op":"unconfirmed_sub"};
      this.WS.send(JSON.stringify(op));
    }

    // Getting new transaction data and updating state
    this.WS.onmessage = (event) => {
      // Add one event to array
      // let tenMostRecentTx: any[] = [...this.state.transactionStream, event.data];
      // If length greater than 10 remove first
      // if (tenMostRecentTx.length > 10) tenMostRecentTx.shift();
      // this.setState({ transactionStream: tenMostRecentTx });
      this.setState((prevState, prevProps) => {
        return { transactionStream: [...prevState.transactionStream, event.data] }
      }, () => {
        // Close connection after 100 entries
        if (this.state.transactionStream.length === 100){
          console.log('closing web socket :(');
          this.WS.close();
        }
      });  
    }
  }
  
  render() {
    return (
      <div className="App">
        <BlockList
          className="block-list-container"
          transactionStream={this.state.transactionStream}
        />
      </div>
    );
  }
}

export default App;
