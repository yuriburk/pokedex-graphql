import ApolloClient, { InMemoryCache } from 'apollo-boost';

import resolvers from './mutations';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'https://graphql-pokemon.now.sh/',
  resolvers,
});

export default client;
