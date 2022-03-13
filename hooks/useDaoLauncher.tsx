import { useWeb3Provider } from 'contexts/web3-provider';
import { useState } from 'react';
import { TransactionReceipt } from '@ethersproject/abstract-provider';
import { deployGovernor, deployTimelock, deployToken } from 'utils/contract';

interface DaoParams {
  name: string;
}

interface TokenParams {
  name: string;
  symbol: string;
  type: 'erc20' | 'erc721';
  initialSupply: number;
  haveAddress: boolean;
  address: string;
}

interface TimelockParams {
  minDelay: number;
  haveAddress: boolean;
  address: string;
}

interface GovernorParams {
  votingDelay: number;
  votingPeriod: number;
  proposalThreshold: number;
  quorumFraction: number;
}

export interface DaoLauncherParams {
  dao: DaoParams;
  token: TokenParams;
  timelock: TimelockParams;
  governor: GovernorParams;
}

export interface DaoTransactionReceipts {
  token: TransactionReceipt;
  timelock: TransactionReceipt;
  governor: TransactionReceipt;
}

interface DaoDeploymentState {
  isLoading: boolean;
  isTokenDeployed: boolean;
  isTimelockDeployed: boolean;
  isGovernorDeployed: boolean;
  isError: boolean;
}

const useDaoLauncher = () => {
  const { provider, account, connect, isLoading } = useWeb3Provider();
  const [status, setStatus] = useState<DaoDeploymentState>({
    isLoading: false,
    isTokenDeployed: false,
    isTimelockDeployed: false,
    isGovernorDeployed: false,
    isError: false,
  });
  const [transactions, setTransactions] = useState<DaoTransactionReceipts>();

  async function deployDao(params: DaoLauncherParams) {
    if (!account.isConnected || isLoading) {
      connect();
      return;
    }

    try {
      setStatus({ ...status, isLoading: true });
      const signer = provider.getSigner();

      const tokenTx: any = await deployToken(params.token, signer);
      setStatus((s) => ({ ...s, isTokenDeployed: true }));

      const timelockTx: any = await deployTimelock(params.timelock, signer);
      setStatus((s) => ({ ...s, isTimelockDeployed: true }));

      const governorParams = {
        ...params.governor,
        daoName: params.dao.name,
        tokenAddress: tokenTx.contractAddress,
        timelockAddress: timelockTx.contractAddress,
      };
      const governorTx = await deployGovernor(governorParams, signer);

      setStatus((s) => ({ ...s, isGovernorDeployed: true, isLoading: false, isError: false }));
      setTransactions({ token: tokenTx, timelock: timelockTx, governor: governorTx });
    } catch (err) {
      console.error(err);
      setStatus((s) => ({ ...s, isError: true, isLoading: false }));
    }
  }

  return {
    deployDao,
    transactions,
    status,
    isLoading: status.isLoading,
    isError: status.isError,
    isSuccessful: status.isTokenDeployed && status.isTimelockDeployed && status.isGovernorDeployed,
  };
};

export default useDaoLauncher;
