import { gql } from 'apollo-boost';

export const GET_POKEMONS = gql`
  query GetPokemons($count: Int!) {
    pokemons(first: $count) {
      id
      image
      name
    }
  }
`;
