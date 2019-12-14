import React from 'react';
import { RouteProps } from 'react-router';
import { Link } from 'react-router-dom';

import { SearchValueContext } from '../../contexts/SearchValueContext';

import './Transaction.css';

interface Props {}

interface State {
  hash: string;
  inputs: any[];
  outputs: any[];
}

class Transaction extends React.Component<Props & RouteProps, State> {
  static contextType = SearchValueContext;
  constructor(props: Props) {
    super(props);
    this.state = {
      hash: '',
      inputs: [],
      outputs: []
    };
  }

  componentDidMount = async () => {
    const { searchValue } = this.context;
    this.fetchTransactionAndSetState(searchValue);
  };

  componentDidUpdate = async () => {
    // Check if searchValue in context has changed
    // If so, fetch new transaction
    const { searchValue } = this.context;
    if (searchValue !== this.state.hash) {
      this.fetchTransactionAndSetState(searchValue);
    }
  };

  fetchTransactionAndSetState = async (searchValue: string) => {
    const data = await fetch(`/search/${searchValue}`);
    const parsedData = await data.json();

    this.setState({
      hash: parsedData.data.hash,
      inputs: parsedData.data.inputs,
      outputs: parsedData.data.outputs
    });
  };

  handleHashClick = (prevHash: any) => {
    this.context.changeSearchValue(prevHash);
  };

  render() {
    if (this.state.hash !== this.context.searchValue) {
      return <div className="loading"></div>;
    } else {
      return (
        <div className="Transaction">
          <h2 className="hash">{this.state.hash}</h2>
          <div className="inputs">
            <h3>Inputs:</h3>
            <ul>
              {this.state.inputs.map((input: any, index: number) => {
                return (
                  <li key={index}>
                    <p>address: {input.addresses[0]}</p>
                    <p>
                      previous hash:
                      <Link
                        to={`/transaction/${input.prev_hash}`}
                        onClick={() => this.handleHashClick(input.prev_hash)}
                      >
                        {input.prev_hash}
                      </Link>
                    </p>
                    <p>value: {input.output_value}</p>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="outputs">
            <h3>Outputs:</h3>
            <ul>
              {this.state.outputs.map((output: any, index: number) => {
                return (
                  <li key={index}>
                    {output.addresses[0] && (
                      <p>address: {output.addresses[0]}</p>
                    )}
                    <p>value: {output.value}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      );
    }
  }
}

export default Transaction;
