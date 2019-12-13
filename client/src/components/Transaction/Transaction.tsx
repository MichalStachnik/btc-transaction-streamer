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
    const data = await fetch(`/search/${searchValue}`);
    const parsedData = await data.json();

    this.setState({
      hash: parsedData.data.hash,
      inputs: parsedData.data.inputs,
      outputs: parsedData.data.outputs
    });
  };

  handleHashClick = () => {
    this.context.changeSearchValue(this.state.hash);
  };

  render() {
    if (!this.state.hash) {
      return <div className="loading"></div>;
    } else {
      return (
        <div>
          <p>
            <Link
              to={`/transaction/${this.state.hash}`}
              onClick={this.handleHashClick}
            >
              {this.state.hash}
            </Link>
          </p>
          <h3>Inputs:</h3>
          <ul>
            {this.state.inputs.map(input => {
              return (
                <li>
                  <p>address: {input.addresses[0]}</p>
                  <p>previos hash: {input.prev_hash}</p>
                  <p>value: {input.output_value}</p>
                </li>
              );
            })}
          </ul>
          <h3>Outputs:</h3>
          <ul>
            {this.state.outputs.map(output => {
              return (
                <li>
                  <p>address: {output.addresses[0]}</p>
                  <p>value: {output.value}</p>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
  }
}

export default Transaction;
