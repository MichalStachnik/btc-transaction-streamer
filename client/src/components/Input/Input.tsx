import React from 'react';

import './Input.css';

interface Props {
  input: {
    prev_out: {
      addr: string;
      n: number;
      script: string;
      spent: boolean;
      tx_index: number;
      type: number;
      value: number;
    };
    script: string;
    sequence: number;
  };
}

const Input: React.FC<Props> = props => {
  return (
    <li className="input">
      <p className="address">{props.input.prev_out.addr}</p>
      <p className="value">{props.input.prev_out.value}</p>
    </li>
  );
};

export default Input;
