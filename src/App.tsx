import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import {
  ApolloProvider,
  ApolloClient,
  NormalizedCacheObject,
} from '@apollo/client';
import { ThemeProvider as StyledProvider } from 'styled-components';

import getClient from 'operations';
import GlobalStyle from 'styles/global';
import Routes from 'routes';
import { theme } from 'styles/theme';
import { HomeSkeleton } from 'components/Skeleton/Home';

const App: React.FC = () => {
  const [client, setClient] = useState<
    ApolloClient<NormalizedCacheObject> | undefined
  >(undefined);

  useEffect(() => {
    getClient().then((client) => setClient(client));
  }, []);

  return (
    <BrowserRouter>
      <StyledProvider theme={theme}>
        <GlobalStyle />

        {client ? (
          <ApolloProvider client={client}>
            <Routes />
          </ApolloProvider>
        ) : (
          <HomeSkeleton />
        )}
      </StyledProvider>
    </BrowserRouter>
  );
};

export default App;
