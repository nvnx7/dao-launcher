import { ethers, Signer } from 'ethers';
import erc20TokenArtifact from 'artifacts/DaoToken.json';
import erc721TokenArtifact from 'artifacts/DaoNFT.json';
import timelockArtifact from 'artifacts/DaoTimelock.json';
import governorArtifact from 'artifacts/DaoGovernor.json';

export const deployContract = async (
  abi: Array<any>,
  bytecode: string,
  initParams: Array<any>,
  signer: Signer,
) => {
  const factory = new ethers.ContractFactory(abi, bytecode, signer);
  const contract = await factory.deploy(...initParams);
  const tx = await contract.deployTransaction.wait();
  return tx;
};

export const deployToken = async (params: any, signer: Signer) => {
  let tokenTx: any;
  if (params?.haveAddress) {
    tokenTx = { contractAddress: params.address };
  } else {
    const tokenArtifact = params.type === 'erc20' ? erc20TokenArtifact : erc721TokenArtifact;
    const tokenParams =
      params.type === 'erc20'
        ? [params.name, params.symbol, params.initialSupply]
        : [params.name, params.symbol];

    tokenTx = await deployContract(tokenArtifact.abi, tokenArtifact.bytecode, tokenParams, signer);
  }

  return tokenTx;
};

export const deployTimelock = async (params: any, signer: Signer) => {
  let timelockTx: any;
  if (params?.haveAddress) {
    timelockTx = { contractAddress: params.address };
  } else {
    timelockTx = await deployContract(
      timelockArtifact.abi,
      timelockArtifact.bytecode,
      [params.minDelay, [], []],
      signer,
    );
  }

  return timelockTx;
};

export const deployGovernor = async (params: any, signer: Signer) => {
  return deployContract(
    governorArtifact.abi,
    governorArtifact.bytecode,
    [
      params.daoName,
      params.votingDelay,
      params.votingPeriod,
      params.proposalThreshold,
      params.tokenAddress,
      params.quorumFraction,
      params.timelockAddress,
    ],
    signer,
  );
};
