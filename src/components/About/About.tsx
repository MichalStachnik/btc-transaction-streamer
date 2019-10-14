import React from 'react';

import './About.css';

const About: React.FC = () => {
  return (
    <div className="about">
      <p>BTC Transaction Streamer is a small app made with React and TypeScript.</p> 
      <p>It leverages the blockchain.info websocket API to get the 100 newest unconfirmed Bitcoin transactions.</p>
    </div>
  );
}

export default About;

