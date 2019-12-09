import React from 'react';
import { RouteProps } from 'react-router';

import { SearchValueContext } from '../../contexts/SearchValueContext';

import './Transaction.css';

interface Props {
  match: any;
}

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
  render() {
    return (
      <div>
        <p>hash {this.state.hash}</p>
      </div>
    );
  }
}

export default Transaction;
