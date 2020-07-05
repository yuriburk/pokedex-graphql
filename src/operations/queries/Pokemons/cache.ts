import { gql } from '@apollo/client';

import { IPokemon } from 'interfaces';
import { pokemonsStore } from 'operations';

export const GET_POKEMONS_CACHED = gql`
  query GetpokemonsCached {
    pokemonsCached @client
  }
`;

export const GET_POKEMON_CACHED = gql`
  query GetPokemon($id: String!) {
    pokemonCached(id: $id) @client
  }
`;

export const findCachedPokemons = (pokemonName: string): IPokemon[] => {
  return pokemonsStore().filter((cachedPokemon) =>
    cachedPokemon.name
      .toLocaleLowerCase()
      .includes(pokemonName.toLocaleLowerCase()),
  );
};
