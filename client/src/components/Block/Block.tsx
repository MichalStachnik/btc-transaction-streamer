import React, { Component } from 'react';

import Input from '../Input/Input';
import Output from '../Output/Output';

import './Block.css';

class Block extends Component<
  { block: any },
  {
    inputs: any[];
    outputs: any[];
    hash: string;
    timeOutput: string;
    totalAmount: number;
  }
> {
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

    const totalAmount: number = outputs.reduce(
      (accumulator, current) => accumulator + current.value,
      0
    );

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
        console.log(`clip set with ${this.state.hash}`);
      },
      () => {
        console.warn('clip err');
      }
    );
  };

  render() {
    return (
      <div className="block">
        <div className="block-inputs-container">
          <div className="block-inputs-cover">
            {/* <InputSvg /> */}
            <i className="fa fa-level-down-alt"></i>
            <p>Inputs</p>
          </div>
          <div className="block-inputs-content">
            {this.state.inputs.map((input, index) => (
              <Input input={input} key={index} />
            ))}
          </div>
        </div>
        <div className="block-outputs-container">
          <div className="block-outputs-cover">
            {/* <OutputSvg /> */}
            <i className="fa fa-level-up-alt"></i>
            <p>Outputs</p>
          </div>
          <div className="block-outputs-content">
            {this.state.outputs.map((output, index) => (
              <Output output={output} key={index} />
            ))}
          </div>
        </div>
        <div className="block-footer">
          <div className="block-footer-left">
            <span className="block-hash">
              {this.state.hash}
              <i className="far fa-copy" onClick={this.handleCopyClick}></i>
            </span>
            <span className="block-time">{this.state.timeOutput}</span>
          </div>
          <div className="block-footer-right">
            <span>Total amount transacted: {this.state.totalAmount}</span>
            <i className="fab fa-btc"></i>
          </div>
        </div>
      </div>
    );
  }
}

export default Block;
