import React, { Component } from 'react';

import Input from '../Input/Input';
import Output from '../Output/Output';
import { ReactComponent as InputSvg } from '../../assets/input.svg';
import { ReactComponent as OutputSvg } from '../../assets/output.svg';
import { ReactComponent as BtcSvg } from '../../assets/btc.svg';

import './Block.css';

class Block extends Component<{ block: any }, {}> {
  render() {
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

    return (
      <div className="block">
        <div className="block-inputs-container">
          <div className="block-inputs-cover">
            <InputSvg />
            <p>Inputs</p>
          </div>
          <div className="block-inputs-content">
            {inputs.map((input, index) => (
              <Input input={input} key={index} />
            ))}
          </div>
        </div>
        <div className="block-outputs-container">
          <div className="block-outputs-cover">
            <OutputSvg />
            <p>Outputs</p>
          </div>
          <div className="block-outputs-content">
            {outputs.map((output, index) => (
              <Output output={output} key={index} />
            ))}
          </div>
        </div>
        <div className="block-footer">
          <div className="block-footer-left">
            <span className="block-hash">{hash}</span>
            <span className="block-time">{timeOutput}</span>
          </div>
          <div className="block-footer-right">
            <span>Total amount transacted {totalAmount}</span>
            <BtcSvg />
          </div>
        </div>
      </div>
    );
  }
}

export default Block;
