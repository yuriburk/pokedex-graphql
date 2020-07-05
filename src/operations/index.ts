import { ApolloClient, InMemoryCache, ReactiveVar } from '@apollo/client';

import resolvers from './mutations';
import { IPokemon } from 'interfaces';

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        pokemonsCached: {
          read() {
            return pokemonsStore();
          },
        },
        pokemonCached: {
          read(_, props) {
            return pokemonsStore().find(
              (pokemon) => pokemon.id === props.args?.id,
            );
          },
        },
      },
    },
  },
});

export const pokemonsStore: ReactiveVar<IPokemon[]> = cache.makeVar<IPokemon[]>(
  [],
);

const client = new ApolloClient({
  cache,
  uri: 'https://graphql-pokemon.now.sh/',
  resolvers,
});

export default client;
