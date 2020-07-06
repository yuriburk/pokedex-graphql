import React from 'react';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { ThemeProvider } from 'styled-components';

import { GET_POKEMONS } from 'operations/queries/Pokemons/server';
import PokemonDetail from 'pages/PokemonDetail';
import { theme } from 'styles/theme';
import { IPokemon } from 'interfaces';
import { pokemonsStore } from 'operations';

const mockTestId = 'test-id';
const mockEvolutionTestId = 'test-id2';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
  useParams: jest.fn(() => ({ id: mockTestId })),
  Link: ({ children }: { children: React.ReactNode }) => children,
}));

const pikachu: IPokemon = {
  id: mockTestId,
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
      id: mockEvolutionTestId,
    },
  ],
};
const raichu: IPokemon = {
  id: mockEvolutionTestId,
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

const PokemonListWrapper = () => (
  <MockedProvider addTypename={false}>
    <ThemeProvider theme={theme}>
      <PokemonDetail />
    </ThemeProvider>
  </MockedProvider>
);

describe('PokemonDetail Component', () => {
  beforeAll(() => pokemonsStore(pokemons));

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('should be able to take a snapshot', () => {
    const { container } = render(<PokemonListWrapper />);

    expect(container).toMatchSnapshot();
  });

  it('should be able to update pokémon', async () => {
    const { getByDisplayValue, getByText } = render(<PokemonListWrapper />);

    const nameInput = getByDisplayValue(pikachu.name);
    const saveButton = getByText('Salvar');

    fireEvent.change(nameInput, { target: { value: 'Novo Pikachu' } });

    fireEvent.click(saveButton);

    await waitFor(() => expect(mockHistoryPush).toHaveBeenCalledWith('/'));
  });

  it('should be able to validate pokémon fields on update', async () => {
    pikachu.attacks.special[0].type = undefined;

    pokemonsStore([pikachu, raichu]);
    const { getByDisplayValue, getByTestId, getByText } = render(
      <PokemonListWrapper />,
    );

    const nameInput = getByDisplayValue(pikachu.name);
    const nameInputContainer = getByTestId('input-container-name');
    const saveButton = getByText('Salvar');

    fireEvent.change(nameInput, { target: { value: '' } });

    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockHistoryPush).not.toHaveBeenCalled();
      expect(nameInputContainer).toHaveStyle('border-color: #c53030;');
    });
  });
});
