import * as React from 'react';
import { useConnectedMetaMask } from 'metamask-react';

import Container from '../../reusable/Container';
import Heading from '../../reusable/Heading';
import Input from '../../reusable/Input';
import Button from '../../reusable/Button';
import Web3Client from '../../../web3/Web3Client';
import Alerts from '../../reusable/Alerts';

const ChangeOwnerForm = () => {
  const { account, ethereum } = useConnectedMetaMask();
  const [newOwner, setNewOwner] = React.useState('');
  const [pendingTx, setPendingTx] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const onNewOwnerChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewOwner(event.target.value);
  };

  const onTransfer = () => {
    setPendingTx(true);
    const client = new Web3Client(account, ethereum);
    client
      .transferOwnership(newOwner)
      .then(() => {
        setPendingTx(false);
        setError(undefined);
      })
      .catch((e) => {
        setError(e.message);
        setPendingTx(false);
      });
  };

  const btnDisabled = newOwner.length == 0 || pendingTx;

  return (
    <Container.FlexCols className="items-center">
      <Heading.H2>Transfer ownership</Heading.H2>
      <Input.Input
        id="change-owner-form-new-owner"
        label="New owner address"
        onChange={onNewOwnerChanged}
        value={newOwner}
      />
      <Button.Primary
        disabled={btnDisabled}
        onClick={onTransfer}
        className="!mt-4"
      >
        Transfer ownership
      </Button.Primary>
      {error && (
        <Alerts.Danger>
          <p>{error}</p>
        </Alerts.Danger>
      )}
    </Container.FlexCols>
  );
};

export default ChangeOwnerForm;
