import React, { Component } from 'react';

import TransactionCard from '../TransactionCard/TransactionCard';

import './TransactionCardList.css';

class TransactionCardList extends Component<
  { toggleLoading: any } & { className: string },
  { transactionStream: any[] }
> {
  constructor(props: any) {
    super(props);

    this.state = {
      transactionStream: []
    };
  }

  WS = new WebSocket('wss://ws.blockchain.info/inv');

  componentDidMount = () => {
    this.WS.onopen = () => {
      const op = { op: 'unconfirmed_sub' };
      this.WS.send(JSON.stringify(op));
      this.props.toggleLoading();
    };

    // Getting new transaction data and updating state
    this.WS.onmessage = event => {
      // Create new array and one event
      this.setState(
        (prevState, prevProps) => {
          return {
            transactionStream: [...prevState.transactionStream, event.data]
          };
        },
        () => {
          // Close connection after 100 entries
          if (this.state.transactionStream.length === 100) {
            console.log('closing web socket :(');
            this.WS.close();
          }
        }
      );
    };
  };

  componentWillUnmount = () => {
    this.WS.close();
  };

  render() {
    if (this.state.transactionStream.length === 0) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      )
    }
    return (
      <div className="transaction-card-list">
        {this.state.transactionStream.map((block, index) => (
          <TransactionCard block={block} key={index} />
        ))}
      </div>
    );
  }
}

export default TransactionCardList;
