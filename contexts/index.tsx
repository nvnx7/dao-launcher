import React from 'react';
import { UIProvider } from './ui';
import { Web3Provider } from './web3-provider';

const AppContext: React.FC = ({ children }) => (
  <Web3Provider>
    <UIProvider>{children}</UIProvider>
  </Web3Provider>
);

export default AppContext;
