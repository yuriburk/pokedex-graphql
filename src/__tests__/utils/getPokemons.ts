import { IPokemon } from 'interfaces';

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

const getPokemons = (pikachuId?: string, raichuId?: string): IPokemon[] => {
  if (pikachuId) pikachu.id = pikachuId;
  if (raichuId) raichu.id = raichuId;

  return [pikachu, raichu];
};

export default getPokemons;
