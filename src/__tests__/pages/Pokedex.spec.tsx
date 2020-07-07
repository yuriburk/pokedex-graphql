import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { ThemeProvider } from 'styled-components';

import { theme } from 'styles/theme';
import Pokedex from 'pages/Pokedex';
import { pokemonsStore } from 'operations';
import { GET_POKEMONS } from 'operations/queries/Pokemons/server';
import getPokemons from '__tests__/utils/getPokemons';

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
  useParams: jest.fn(() => ({ id: 'test-id' })),
  Link: ({ children }: { children: React.ReactNode }) => children,
}));

const mocks = [
  {
    request: {
      query: GET_POKEMONS,
      variables: {
        count: 151,
      },
    },
    result: () => {
      console.log('buscando');
      return {
        data: {
          pokemons: getPokemons(),
        },
      };
    },
  },
];

const PokedexWrapper = () => (
  <ThemeProvider theme={theme}>
    <MockedProvider mocks={mocks} addTypename={false}>
      <Pokedex />
    </MockedProvider>
  </ThemeProvider>
);

describe('Pokedex Component', () => {
  afterEach(cleanup);

  it('should be able to render without errors', async () => {
    const { container } = render(<PokedexWrapper />);

    expect(container).toMatchSnapshot();
  });

  it('should be able to search a pokémon', async () => {
    pokemonsStore(getPokemons());

    const { getByText, getByPlaceholderText } = render(<PokedexWrapper />);

    expect(getByText('Pikachu')).toBeInTheDocument();

    const searchBox = getByPlaceholderText('Search');

    fireEvent.change(searchBox, {
      target: { value: 'pikac' },
    });

    expect(getByText('Pikachu')).toBeInTheDocument();
  });
});
