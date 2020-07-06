import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { ThemeProvider } from 'styled-components';

import { GET_POKEMONS } from 'operations/queries/Pokemons/server';
import PokemonDetail from 'pages/PokemonDetail';
import { theme } from 'styles/theme';
import { IPokemon } from 'interfaces';

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
  useParams: jest.fn(() => ({ id: 'test-id' })),
  Link: ({ children }: { children: React.ReactNode }) => children,
}));

const pokemon: IPokemon = {
  id: 'id-1',
  name: 'Pikachu',
  image: 'image',
  number: '001',
  weaknesses: ['Rock'],
  classification: 'Mouse Pokémon',
  maxCP: 100,
  maxHP: 400,
  resistant: ['Water'],
  attacks: {
    special: [
      {
        name: 'Thunder',
        damage: 90,
        type: 'Electric',
      },
    ],
  },
  weight: {
    minimum: '0.1kg',
    maximum: '4kg',
  },
  height: {
    minimum: '0.1m',
    maximum: '0.5m',
  },
  evolutions: [
    {
      id: 'id-2',
    },
  ],
};

const mocks = [
  {
    request: {
      query: GET_POKEMONS,
      variables: {
        count: 151,
      },
    },
    result: {
      data: {
        pokemons: [pokemon],
      },
    },
  },
];

const PokemonListWrapper = () => (
  <MockedProvider mocks={mocks} addTypename={false}>
    <ThemeProvider theme={theme}>
      <PokemonDetail />
    </ThemeProvider>
  </MockedProvider>
);

describe('PokemonDetail Component', () => {
  afterEach(cleanup);

  it('should be able to take a snapshot', () => {
    const { asFragment } = render(<PokemonListWrapper />);

    expect(asFragment()).toMatchSnapshot();
  });
});
