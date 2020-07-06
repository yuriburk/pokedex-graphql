import {
  ApolloClient,
  InMemoryCache,
  ReactiveVar,
  NormalizedCacheObject,
} from '@apollo/client';
import { CachePersistor } from 'apollo-cache-persist';
import { PersistentStorage, PersistedData } from 'apollo-cache-persist/types';

import resolvers from './mutations';
import { IPokemon } from 'interfaces';
import { GET_POKEMONS } from './queries/Pokemons/server';

const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        pokemonsCached: {
          read() {
            return pokemonsStore();
          },
        },
      },
    },
  },
});

export const pokemonsStore: ReactiveVar<IPokemon[]> = cache.makeVar<IPokemon[]>(
  [],
);

const getClient = async (): Promise<ApolloClient<NormalizedCacheObject>> => {
  const persistor = new CachePersistor({
    cache,
    storage: window.localStorage as PersistentStorage<
      PersistedData<NormalizedCacheObject>
    >,
  });

  await persistor.restore();

  const client = new ApolloClient({
    cache,
    uri: 'https://graphql-pokemon.now.sh/',
    resolvers,
  });

  const pokemonsCached = client.readQuery({
    query: GET_POKEMONS,
    variables: { count: 151 },
  });

  if (pokemonsCached) {
    pokemonsStore(pokemonsCached.pokemons);
  }

  return client;
};

export default getClient;
