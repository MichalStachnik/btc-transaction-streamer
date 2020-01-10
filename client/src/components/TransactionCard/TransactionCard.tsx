import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Input from '../Input/Input';
import Output from '../Output/Output';

import { SearchValueContext } from '../../contexts/SearchValueContext';

import './TransactionCard.css';

interface Props {
  block: any;
}

interface State {
  inputs: any[];
  outputs: any[];
  hash: string;
  timeOutput: string;
  totalAmount: number;
}

class TransactionCard extends Component<Props, State> {
  static contextType = SearchValueContext;
  constructor(props: any) {
    super(props);

    this.state = {
      inputs: [],
      outputs: [],
      hash: '',
      timeOutput: '',
      totalAmount: 0
    };
  }
  componentDidMount = () => {
    let blockAsJSON = JSON.parse(this.props.block);
    let hash: string = blockAsJSON.x.hash;
    let time: Date = new Date(blockAsJSON.x.time * 1000);
    let timeAsArray: string[] = time.toString().split(' ');
    let timeOutput: string = `${timeAsArray[0]} ${timeAsArray[1]} ${timeAsArray[2]} ${timeAsArray[3]} ${timeAsArray[4]}`;
    let inputs: any[] = blockAsJSON.x.inputs;
    let outputs: any[] = blockAsJSON.x.out;

    let totalAmount: number = outputs.reduce(
      (accumulator, current) => accumulator + current.value,
      0
    );

    let totalAmountAsString = totalAmount.toString();

    let totalAmountAsArray = totalAmountAsString.split('');
    // console.log('HERE', totalAmountAsArray);
    // ONE SAT = 0.00000001
    // for length of our sats
    // keep adding onto end until no more
    let myOutput = [];

    totalAmountAsArray.forEach(num => {
      myOutput.push(num);
    });

    const totalAmountLength = totalAmountAsString.length;
    if (totalAmountLength < 8) {
      const numZerosToAdd = 8 - totalAmountLength;
      if (numZerosToAdd === 0) {
        totalAmountAsString = `0.${totalAmountAsString}`;
      }

      for (let i = 0; i < numZerosToAdd; i++) {
        totalAmountAsString = `0${totalAmountAsString}`;
        if (i + 1 === numZerosToAdd) {
          totalAmountAsString = `0.${totalAmountAsString}`;
        }
      }
    } else if (totalAmountLength > 8) {
      let rightSide = totalAmountAsString.substr(2);
      let leftSide = totalAmountAsString.substr(0, 2);
      totalAmountAsString = `${leftSide}.${rightSide}`;
    }
    totalAmount = Number.parseFloat(totalAmountAsString);

    this.setState({
      inputs,
      outputs,
      hash,
      timeOutput,
      totalAmount
    });
  };

  handleCopyClick = () => {
    navigator.clipboard.writeText(this.state.hash).then(
      () => {
        // TODO: Add copied toast
        console.info(`clip set with ${this.state.hash}`);
      },
      () => {
        console.warn('clip err');
      }
    );
  };

  handleHashClick = () => {
    this.context.changeSearchValue(this.state.hash);
  };

  render() {
    return (
      <div className="transaction-card">
        <div className="header">
          <span className="block-hash">
            <Link
              to={`/transaction/${this.state.hash}`}
              onClick={this.handleHashClick}
            >
              {this.state.hash}
            </Link>
            <i className="far fa-copy" onClick={this.handleCopyClick}></i>
          </span>
        </div>
        <div className="inputs">
          <p>Inputs</p>
          <ul>
            {this.state.inputs.map((input, index) => (
              <Input input={input} key={index} />
            ))}
          </ul>
        </div>
        <div className="center">
          <i className="fa fa-long-arrow-alt-right"></i>
        </div>
        <div className="outputs">
          <p>Outputs</p>
          <ul>
            {this.state.outputs.map((output, index) => (
              <Output output={output} key={index} />
            ))}
          </ul>
        </div>
        <div className="footer">
          <span className="block-time">{this.state.timeOutput}</span>
          <span className="total-amount">
            Total amount transacted: {this.state.totalAmount}
            <i className="fab fa-btc"></i>
          </span>
        </div>
      </div>
    );
  }
}

export default TransactionCard;
