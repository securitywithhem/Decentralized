import React, { useState } from 'react';
import { connectWallet } from '../utils/web3';

const Login = ({ onConnect }) => {
  const [connected, setConnected] = useState(false);

  const handleConnect = async () => {
    const signer = await connectWallet();
    setConnected(true);
    onConnect(signer);
  };

  return (
    <button onClick={handleConnect} disabled={connected}>
      {connected ? 'Connected' : 'Connect MetaMask'}
    </button>
  );
};

export default Login;