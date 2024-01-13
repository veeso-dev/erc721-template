import * as React from 'react';
import { useConnectedMetaMask } from 'metamask-react';

import Container from '../reusable/Container';
import Web3Client from '../../web3/Web3Client';
import { ChainId } from '../MetamaskConnect';
import Heading from '../reusable/Heading';

interface Metadata {
  name: string;
  symbol: string;
  totalSupply: number;
}

const Header = () => {
  const { account, ethereum, chainId } = useConnectedMetaMask();
  const [metadata, setMetadata] = React.useState<Metadata>();

  React.useEffect(() => {
    if (!metadata && account && ethereum && chainId) {
      getMetadata(account, ethereum, chainId as ChainId)
        .then((metadata) => {
          setMetadata(metadata);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }, [metadata, account, ethereum, chainId]);

  return (
    <Container.Container>
      <Heading.H2>Token Info</Heading.H2>
      <Heading.H3>Name: {metadata?.name}</Heading.H3>
      <Heading.H3>Symbol: {metadata?.symbol}</Heading.H3>
      <Heading.H3>Total Supply: {metadata?.totalSupply}</Heading.H3>
    </Container.Container>
  );
};

const getMetadata = async (
  account: string,
  ethereum: any,
  chainId: ChainId,
) => {
  const client = new Web3Client(account, ethereum, chainId);
  const name = await client.name();
  const symbol = await client.symbol();
  const totalSupply = await client.totalSupply();

  return {
    name,
    symbol,
    totalSupply,
  };
};

export default Header;
