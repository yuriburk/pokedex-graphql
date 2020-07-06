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

const App: React.FC = () => {
  const [client, setClient] = useState<
    ApolloClient<NormalizedCacheObject> | undefined
  >(undefined);

  useEffect(() => {
    getClient().then((client) => setClient(client));
  }, []);

  if (!client) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <StyledProvider theme={theme}>
        <GlobalStyle />

        <ApolloProvider client={client}>
          <Routes />
        </ApolloProvider>
      </StyledProvider>
    </BrowserRouter>
  );
};

export default App;
