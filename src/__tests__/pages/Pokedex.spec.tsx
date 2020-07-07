import React from 'react';
import {
  render,
  cleanup,
  fireEvent,
  waitForElement,
  act,
} from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { ThemeProvider } from 'styled-components';

import { theme } from 'styles/theme';
import Pokedex from 'pages/Pokedex';
import { pokemonsStore } from 'operations';
import { GET_POKEMONS } from 'operations/queries/Pokemons/server';
import { IPokemon } from 'interfaces';
// import getPokemons from '__tests__/utils/getPokemons';

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
const pokemons = [pikachu, raichu];

const mocks = [
  {
    request: {
      query: GET_POKEMONS,
      variables: {
        count: 151,
      },
    },
    result: () => {
      return {
        data: {
          pokemons,
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
  beforeEach(() => pokemonsStore(pokemons));

  afterEach(cleanup);

  it('should be able to render without errors', async () => {
    const { container } = render(<PokedexWrapper />);

    expect(container).toMatchSnapshot();
  });

  it('should be able to search a pokémon', async () => {
    const { queryByText, getByPlaceholderText } = render(<PokedexWrapper />);

    expect(queryByText(pikachu.name)).toBeInTheDocument();
    expect(queryByText(raichu.name)).toBeInTheDocument();

    const searchBox = getByPlaceholderText('Search');

    fireEvent.change(searchBox, {
      target: { value: 'pikac' },
    });

    expect(queryByText(pikachu.name)).toBeInTheDocument();
    expect(queryByText(raichu.name)).toBeNull();
  });
});
