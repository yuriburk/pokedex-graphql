import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import client from 'operations';
import GlobalStyle from 'styles/global';
import Routes from 'routes';

const App: React.FC = () => (
  <BrowserRouter>
    <GlobalStyle />
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  </BrowserRouter>
);

export default App;
