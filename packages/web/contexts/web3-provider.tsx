import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { BigNumber, ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { useRouter } from 'next/router';
import logger from 'utils/logger';
import { Network } from '@ethersproject/networks';

interface Account {
  isConnected: boolean;
  address?: string;
  balance?: BigNumber;
}

interface State {
  provider?: ethers.providers.Web3Provider;
  account: Account;
  network?: Network;
  isLoading: boolean;
}

const initialState: State = { account: { isConnected: false }, isLoading: false };
export const Web3ProviderContext = createContext<State | any>(initialState);
Web3ProviderContext.displayName = 'Web3ProviderContext';

let web3Modal: Web3Modal;
export const Web3Provider: React.FC = (props) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
  const [account, setAccount] = useState<Account>(initialState.account);
  const [network, setNetwork] = useState<Network>();

  useEffect(() => {
    if (!provider) return;
    const signer = provider.getSigner();

    // get account and network data
    Promise.all([signer.getAddress(), signer.getBalance(), provider.getNetwork()])
      .then(([address, balance, network]) => {
        logger.log({ address, balance, network });
        setAccount({ address, balance, isConnected: true });
        setNetwork(network);
      })
      .catch(logger.error);
  }, [provider]);

  const disconnect = useCallback(() => {
    web3Modal?.clearCachedProvider();
    provider?.removeAllListeners();
    setAccount({ isConnected: false });
    setNetwork(undefined);
    setProvider(undefined);
    router.reload();
  }, [provider, router]);

  const connect = useCallback(async () => {
    setLoading(true);

    try {
      web3Modal = new Web3Modal({ cacheProvider: true });
      const instance = await web3Modal.connect();

      instance.on('connect', (info: any) => {
        logger.log('connected!', info);
      });

      instance.on('chainChanged', (chainId: number) => {
        logger.log(`chain changed to ${chainId}! updating providers`);
        setProvider(new ethers.providers.Web3Provider(instance));
      });

      instance.on('accountsChanged', () => {
        logger.log(`account changed!`);
        setProvider(new ethers.providers.Web3Provider(instance));
      });

      instance.on('disconnect', (code: number, reason: string) => {
        logger.log(code, reason);
        disconnect();
      });

      setProvider(new ethers.providers.Web3Provider(instance));
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  }, [setProvider, disconnect]);

  const value = useMemo<State>(
    () => ({
      isLoading,
      provider,
      connect,
      disconnect,
      account,
      network,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isLoading, web3Modal, provider, account, network],
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
