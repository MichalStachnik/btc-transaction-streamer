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
      console.log('connected');
      const op = { op: 'unconfirmed_sub' };
      this.WS.send(JSON.stringify(op));
      this.props.toggleLoading();
    };

    // Getting new transaction data and updating state
    this.WS.onmessage = event => {
      // let performance: any = window.performance;
      // console.log(performance.memory);
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
            this.props.toggleLoading();
          }
        }
      );
    };
  };

  componentWillUnmount = () => {
    this.WS.close();
  };

  render() {
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
