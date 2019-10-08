import React, { Component } from 'react';

import Block from '../Block/Block';

import './BlockList.css';

class BlockList extends Component<{transactionStream: any[] } & { className: string }, {}> {
  render() {
    return (
      <div className="block-list">
        { this.props.transactionStream.map((block, index) => <Block block={block} key={index} />) }
      </div>
    );
  }
}

export default BlockList;