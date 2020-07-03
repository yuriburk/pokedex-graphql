import { gql } from '@apollo/client';

export const GET_POKEMONS = gql`
  query GetPokemons($count: Int!) {
    pokemons(first: $count) {
      id
      image
      name
      number
      attacks {
        special {
          type
        }
      }
    }
  }
`;

export const GET_POKEMONS_CACHED = gql`
  query GetpokemonsCached {
    pokemonsCached @client
  }
`;
