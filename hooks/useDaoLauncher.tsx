import { useWeb3Provider } from 'contexts/web3-provider';
import * as contractUtils from 'utils/contract';
import erc20TokenArtifact from 'artifacts/GovernanceToken.sol/DaoToken.json';
import erc721TokenArtifact from 'artifacts/GovernanceNFT.sol/DaoNFT.json';
import timelockArtifact from 'artifacts/GovernanceTimelock.sol/DaoTimelock.json';
import governorArtifact from 'artifacts/Governor.sol/DaoGovernor.json';
import { useState } from 'react';
import { TransactionReceipt } from '@ethersproject/abstract-provider';

interface DaoParams {
  name: string;
}

interface TokenParams {
  name: string;
  symbol: string;
  type: 'erc20' | 'erc721';
}

interface TimelockParams {
  minDelay: number;
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

const useDaoLauncher = () => {
  const { provider, isConnected, connect, isLoading } = useWeb3Provider();
  const [status, setStatus] = useState<Record<string, boolean>>({
    isLoading: false,
    tokenDeployed: false,
    timelockDeployed: false,
    governorDeployed: false,
  });
  const [transactions, setTransactions] = useState<Record<string, TransactionReceipt>>();

  async function deployDao(params: DaoLauncherParams) {
    if (!isConnected || isLoading) {
      connect();
      return;
    }

    setStatus({ ...status, isLoading: true });
    const signer = provider.getSigner();

    const tokenArtifact = params.token.type === 'erc20' ? erc20TokenArtifact : erc721TokenArtifact;
    const tokenTx = await contractUtils.deployContract(
      tokenArtifact.abi,
      tokenArtifact.bytecode,
      [params.token.name, params.token.symbol],
      signer,
    );
    setStatus({ ...status, tokenDeployed: true });

    const timelockTx = await contractUtils.deployContract(
      timelockArtifact.abi,
      timelockArtifact.bytecode,
      [params.timelock.minDelay],
      signer,
    );

    setStatus({ ...status, timelockDeployed: true });
    const governorTx = await contractUtils.deployContract(
      governorArtifact.abi,
      governorArtifact.bytecode,
      [
        params.dao.name,
        params.governor.votingDelay,
        params.governor.votingPeriod,
        params.governor.proposalThreshold,
        tokenTx.contractAddress,
        params.governor.quorumFraction,
        timelockTx.contractAddress,
      ],
      signer,
    );
    setStatus({ ...status, governorDeployed: true, isLoading: false });
    setTransactions({ tokenTx, timelockTx, governorTx });
  }

  return {
    deployDao,
    transactions,
    isLoading: status.isLoading,
    status,
  };
};

export default useDaoLauncher;
