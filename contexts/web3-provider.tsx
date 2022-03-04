import { createContext, useContext, useMemo, useState } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';

interface State {
  provider?: ethers.providers.Web3Provider;
  isConnected: boolean;
}

const initialState: State = { isConnected: false, provider: undefined };

export const Web3ProviderContext = createContext<State | any>(initialState);

Web3ProviderContext.displayName = 'Web3ProviderContext';

export const Web3Provider: React.FC = (props) => {
  const [isConnected, setConnected] = useState<boolean>(false);
  const [isLoading, setLoading] = useState(false);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | undefined>(undefined);
  const [account, setAccount] = useState<object>();
  const [web3Modal, setWeb3Modal] = useState<Web3Modal | undefined>(undefined);

  async function connect() {
    setLoading(true);
    const modal = new Web3Modal({ cacheProvider: true });
    setWeb3Modal(modal);
    await modal
      .connect()
      .then((conn) => {
        const provider = new ethers.providers.Web3Provider(conn);
        provider.on('disconnect', (error) => {
          console.log('Provider disconnected', error);
          setConnected(false);
        });

        setProvider(provider);
        setConnected(true);

        return provider.getSigner().getAddress();
      })
      .then((address) => setAccount({ address }))
      .catch(console.error)
      .finally(() => setLoading(false));
  }

  function disconnect() {
    web3Modal?.clearCachedProvider();
    setConnected(false);
    setAccount({});
    setProvider(undefined);
    setWeb3Modal(undefined);
  }

  const value = useMemo<State>(
    () => ({
      isLoading,
      web3Modal,
      provider,
      connect,
      disconnect,
      isConnected,
      account,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isLoading, web3Modal, provider, isConnected, account],
  );

  return <Web3ProviderContext.Provider value={value} {...props} />;
};

export const useWeb3Provider = () => {
  const context = useContext(Web3ProviderContext);
  if (context === undefined) {
    throw new Error('useWeb3Provider must be used in Web3ProviderContext');
  }
  return context;
};
