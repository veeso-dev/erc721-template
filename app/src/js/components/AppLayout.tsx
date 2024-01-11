import * as React from 'react';

import Container from './reusable/Container';
import Page from './reusable/Page';
import MetamaskConnect, { ChainId } from './MetamaskConnect';
import Form from './Form/Form';

const AppLayout = () => (
  <Page.BlankPage>
    <Container.FlexRow className="justify-between items-center py-4 bg-brand px-4">
      <span className="text-xl text-white">NFT WebUI</span>
      <MetamaskConnect chainId={ChainId.Goerli} />
    </Container.FlexRow>
    <Container.PageContent className="py-8">
      <Form />
    </Container.PageContent>
  </Page.BlankPage>
);

export default AppLayout;
