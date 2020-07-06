import { gql } from '@apollo/client';

export const GET_POKEMONS = gql`
  query GetPokemons($count: Int!) {
    pokemons(first: $count) {
      id
      image
      name
      number
      weaknesses
      classification
      resistant
      maxCP
      maxHP
      attacks {
        special {
          name
          type
          damage
        }
      }
      weight {
        minimum
        maximum
      }
      height {
        maximum
        minimum
      }
      evolutions {
        id
      }
    }
  }
`;
