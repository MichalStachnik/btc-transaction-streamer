import React from 'react';
import { useParams } from 'react-router-dom';

import './Transaction.css';

const Transaction: React.FC = () => {
  let { transactionHash } = useParams();
  return (
    <div className="transaction">
      <p>transaction</p>
      <p>{transactionHash}</p>
    </div>
  );
};

export default Transaction;
