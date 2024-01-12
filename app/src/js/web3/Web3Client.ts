import Web3 from 'web3';

import { ABI, CONTRACT_ADDRESS } from './contracts/MyNft';
import { ChainId } from '../components/MetamaskConnect';

export default class Web3Client {
  private address: string;
  private web3: Web3;
  private chainId: ChainId;

  constructor(address: string, ethereum: any, chainId: ChainId) {
    this.address = address;
    this.web3 = new Web3(ethereum);
    this.chainId = chainId;
  }

  async transferOwnership(newAddress: string) {
    const contract = this.getContract();
    return contract.methods
      .transferOwnership(newAddress)
      .send({ from: this.address });
  }

  async safeMint(address: string, uri: string) {
    const contract = this.getContract();
    return contract.methods.safeMint(address, uri).send({ from: this.address });
  }

  private getContract() {
    return new this.web3.eth.Contract(ABI, CONTRACT_ADDRESS[this.chainId]);
  }
}
