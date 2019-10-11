import React from 'react';

import './About.css';

const About: React.FC = () => {
  return (
    <div className="about">
      BTC Transaction Streamer is a small app made with React and TypeScript. It leverages the blockchain.info websocket
      API to get the 100 newest unconfirmed Bitcoin transactions. 
    </div>
  );
}

export default About;

