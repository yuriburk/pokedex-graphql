import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';

import client from 'apollo';
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
