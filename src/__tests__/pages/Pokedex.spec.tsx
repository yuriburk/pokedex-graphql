import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
// import { act, create, ReactTestRenderer } from 'react-test-renderer';
import { MockedProvider } from '@apollo/client/testing';
import { ThemeProvider } from 'styled-components';

import { theme } from 'styles/theme';
import Pokedex from 'pages/Pokedex';
import { IPokemon } from 'interfaces';
import { GET_POKEMONS_CACHED } from 'operations/queries/Pokemons/cache';
import { pokemonsStore } from 'operations';
import { GET_POKEMONS } from 'operations/queries/Pokemons/server';

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
  useParams: jest.fn(() => ({ id: 'test-id' })),
  Link: ({ children }: { children: React.ReactNode }) => children,
}));

const pikachu: IPokemon = {
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
        name: 'Thundershock',
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
const raichu: IPokemon = {
  id: 'id-2',
  name: 'Raichu',
  image: 'image',
  number: '002',
  weaknesses: ['Fire'],
  classification: 'Mouse Pokémon',
  maxCP: 100,
  maxHP: 400,
  resistant: ['Water'],
  attacks: {
    special: [
      {
        name: 'Tackle',
        damage: 40,
        type: 'Normal',
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
};
const pokemons: IPokemon[] = [pikachu, raichu];

const mocks = [
  {
    request: {
      query: GET_POKEMONS_CACHED,
      variables: {
        count: 151,
      },
    },
    result: () => ({
      data: {
        pokemonsCached: pokemons,
      },
    }),
  },
  {
    request: {
      query: GET_POKEMONS,
      variables: {
        count: 151,
      },
    },
    result: () => ({
      data: {
        pokemons: pokemons,
      },
    }),
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

  it('should be able to render without errors', async () => {
    const { container } = render(<PokedexWrapper />);

    expect(container).toMatchSnapshot();
  });

  // it('should be able to search a pokémon', () => {
  //   pokemonsStore(pokemons);
  //   let wrapper: ReactTestRenderer;
  //   act(() => {
  //     render(<PokedexWrapper />);
  //   });

  //   // expect(getByText(pikachu.name)).toBeInTheDocument();
  //   // expect(getByText(raichu.name)).toBeInTheDocument();

  //   const searchBox = getByPlaceholderText('Search');

  //   fireEvent.change(searchBox, {
  //     target: { value: 'pikac' },
  //   });

  //   // expect(getByText(pikachu.name)).toBeInTheDocument();
  // });
});
