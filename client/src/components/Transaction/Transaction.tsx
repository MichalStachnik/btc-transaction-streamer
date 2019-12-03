import React from 'react';
// import { useParams } from 'react-router-dom';
import { RouteProps } from 'react-router';

import './Transaction.css';

// const Transaction: React.FC = () => {
//   let { transactionHash } = useParams();

//   console.log('about to fetch');
//   fetch(`/search/${transactionHash}`)
//     .then(res => {
//       console.log('res', res);
//     })
//     .catch(err => console.warn(err));

//   return (
//     <div className="transaction">
//       <p>transaction</p>
//       <p>{transactionHash}</p>
//     </div>
//   );
// };

interface Props {
  match: any;
}

interface State {
  hash: string;
  inputs: any[];
  outputs: any[];
}

class Transaction extends React.Component<Props & RouteProps, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hash: '',
      inputs: [],
      outputs: []
    };
  }
  componentDidMount = async () => {
    const { transactionHash } = this.props.match.params;
    const data = await fetch(`/search/${transactionHash}`);
    const parsedData = await data.json();
    console.log(parsedData);
    this.setState({ hash: parsedData.data.hash });
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
