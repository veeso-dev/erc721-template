import * as React from 'react';
import { useMetaMask } from 'metamask-react';
import Logo from './MetamaskConnect/Logo';
import Button from './reusable/Button';

export enum ChainId {
  Mainnet = '0x1',
  Ropsten = '0x3',
  Rinkeby = '0x4',
  Goerli = '0x5',
  Kovan = '0x2a',
}

interface Props {
  chainId: ChainId;
}

const MetamaskConnect = ({ chainId: configChainId }: Props) => {
  const { status, connect, account, chainId, switchChain } = useMetaMask();
  const disabled = [
    'initializing',
    'unavailable',
    'connecting',
    'connected',
  ].includes(status);

  const onClick = () => {
    if (status === 'notConnected') {
      if (chainId !== configChainId) {
        switchChain(configChainId);
      }
      return connect();
    }
    return undefined;
  };

  const addressText = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(
      address.length - 4,
    )}`;
  };

  const text = () => {
    if (status === 'initializing') return 'Initializing...';
    if (status === 'unavailable') return 'MetaMask not available';
    if (status === 'notConnected') return 'Connect to MetaMask';
    if (status === 'connecting') return 'Connecting...';
    if (status === 'connected') return addressText(account);
    return undefined;
  };

  return (
    <Button.Alternative
      className="my-0 !mb-0"
      onClick={onClick}
      disabled={disabled}
    >
      <Logo />
      {text()}
    </Button.Alternative>
  );
};

export default MetamaskConnect;
