import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider as StyledProvider } from 'styled-components';

import client from 'operations';
import GlobalStyle from 'styles/global';
import Routes from 'routes';
import { theme } from 'styles/theme';

const App: React.FC = () => (
  <BrowserRouter>
    <GlobalStyle />

    <ApolloProvider client={client}>
      <StyledProvider theme={theme}>
        <Routes />
      </StyledProvider>
    </ApolloProvider>
  </BrowserRouter>
);

export default App;
