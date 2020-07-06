import React from 'react';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';

import PokemonsList from 'components/PokemonsList';
import { IPokemon } from 'interfaces';
import { ThemeProvider } from 'styled-components';
import { theme } from 'styles/theme';

const mockedHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockedHistoryPush,
  }),
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

const PokemonListWrapper = () => (
  <ThemeProvider theme={theme}>
    <PokemonsList pokemons={[pokemon]} />
  </ThemeProvider>
);

describe('PokemonsList Component', () => {
  afterEach(cleanup);

  it('should be able to take a snapshot', () => {
    const { asFragment } = render(<PokemonListWrapper />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should be able to render pokémon', async () => {
    const { getByText, getByAltText } = render(<PokemonListWrapper />);

    const title = getByText(pokemon.name);
    const image = getByAltText(pokemon.name);
    const number = getByText(`#${pokemon.number}`);
    const specialType = getByText(pokemon.attacks.special[0].type);

    expect(title).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(number).toBeInTheDocument();
    expect(specialType).toBeInTheDocument();
  });

  it('should be able to navigate', async () => {
    const { getByTestId } = render(<PokemonListWrapper />);

    const listItem = getByTestId('list-item');

    fireEvent.click(listItem);

    await waitFor(() =>
      expect(mockedHistoryPush).toHaveBeenCalledWith(`/edit/${pokemon.id}`),
    );
  });
});
