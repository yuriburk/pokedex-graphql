import { gql } from '@apollo/client';

import { IPokemon } from 'interfaces';
import { pokemonsStore } from 'operations';

export const GET_POKEMON_CACHED = gql`
  query GetPokemon($id: String!) {
    pokemonCached(id: $id) @client
  }
`;

export const findCachedPokemonsByName = (pokemonName: string): IPokemon[] => {
  return pokemonsStore().filter((cachedPokemon) =>
    cachedPokemon.name
      .toLocaleLowerCase()
      .includes(pokemonName.toLocaleLowerCase()),
  );
};

export const findCachedPokemonById = (id: string): IPokemon | undefined => {
  return pokemonsStore().find((pokemon) => pokemon.id === id);
};
