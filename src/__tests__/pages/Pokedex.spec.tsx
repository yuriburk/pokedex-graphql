import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { ThemeProvider } from 'styled-components';

import { theme } from 'styles/theme';
import Pokedex from 'pages/Pokedex';
import { IPokemon } from 'interfaces';
import { GET_POKEMONS_CACHED } from 'operations/queries/Pokemons/cache';

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
      query: GET_POKEMONS_CACHED,
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

const PokedexWrapper = () => (
  <MockedProvider mocks={mocks} addTypename={false}>
    <ThemeProvider theme={theme}>
      <Pokedex />
    </ThemeProvider>
  </MockedProvider>
);

describe('Pokedex Component', () => {
  afterEach(cleanup);

  it('should be able to render without errors', () => {
    const { container } = render(<PokedexWrapper />);

    expect(container).toMatchSnapshot();
  });
});
