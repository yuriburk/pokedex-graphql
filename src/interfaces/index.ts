export interface IPokemon {
  id: string;
  image: string;
  name: string;
  number: string;
  weaknesses?: string[];
  classification: string;
  resistant?: string[];
  maxCP: number;
  maxHP: number;
  attacks: {
    special: {
      name: string;
      type?: string;
      damage: number;
    }[];
  };
  weight: {
    minimum: string;
    maximum: string;
  };
  height: {
    minimum: string;
    maximum: string;
  };
  evolutions?: [
    {
      id: string;
    },
  ];
}

export type IPokemonTypes =
  | 'Normal'
  | 'Fire'
  | 'Fighting'
  | 'Water'
  | 'Flying'
  | 'Grass'
  | 'Poison'
  | 'Electric'
  | 'Ground'
  | 'Psychic'
  | 'Rock'
  | 'Ice'
  | 'Bug'
  | 'Dragon'
  | 'Ghost'
  | 'Dark'
  | 'Steel'
  | 'Fairy';
