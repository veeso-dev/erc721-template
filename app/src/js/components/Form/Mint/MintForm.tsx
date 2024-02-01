import * as React from 'react';
import { useConnectedMetaMask } from 'metamask-react';

import Container from '../../reusable/Container';
import Heading from '../../reusable/Heading';
import Input from '../../reusable/Input';
import Button from '../../reusable/Button';
import Web3Client from '../../../web3/Web3Client';
import Alerts from '../../reusable/Alerts';
import { ChainId } from '../../MetamaskConnect';

const MintForm = () => {
  const { account, ethereum, chainId } = useConnectedMetaMask();
  const [recipientAddress, setRecipientAddress] = React.useState('');
  const [tokenURI, setTokenURI] = React.useState('');
  const [pendingTx, setPendingTx] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const onRecipientAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRecipientAddress(event.target.value);
  };

  const onTokenURIChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTokenURI(event.target.value);
  };

  const onMint = () => {
    setPendingTx(true);
    const client = new Web3Client(account, ethereum, chainId as ChainId);
    client
      .safeMint(recipientAddress, tokenURI)
      .then(() => {
        setPendingTx(false);
        setError(undefined);
      })
      .catch((e) => {
        setError(e.message);
        setPendingTx(false);
      });
  };

  React.useEffect(() => {
    if (account && recipientAddress.length === 0) {
      setRecipientAddress(account);
    }
  }, [account]);

  const btnDisabled =
    tokenURI.length == 0 || recipientAddress.length !== 42 || pendingTx;

  return (
    <Container.FlexCols className="items-center">
      <Heading.H2>Mint NFT</Heading.H2>
      <Input.Input
        id="mint-form-recipient-address"
        label="Recipient address"
        onChange={onRecipientAddressChange}
        value={recipientAddress}
      />
      <Input.Input
        id="mint-form-token-uri"
        label="Token URI"
        onChange={onTokenURIChange}
        value={tokenURI}
      />
      <Button.Primary disabled={btnDisabled} onClick={onMint} className="!mt-4">
        Mint
      </Button.Primary>
      {error && (
        <Alerts.Danger>
          <p>{error}</p>
        </Alerts.Danger>
      )}
    </Container.FlexCols>
  );
};

export default MintForm;
