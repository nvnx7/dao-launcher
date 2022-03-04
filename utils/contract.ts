import { ethers, Signer } from 'ethers';

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
