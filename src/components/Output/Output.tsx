import React from 'react';

import './Output.css';

interface Props {
  output: {
    addr: string,
    n: number,
    script: string,
    spent: boolean,
    tx_index: number,
    type: number,
    value: number
  }
}

const Output: React.FC <Props> = (props) => {
  return (
    <div className="output">
      <p className="address">{ props.output.addr }</p>
      <p className="value">{ props.output.value }</p>
    </div>
  );
}

export default Output;