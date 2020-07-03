export interface IPokemon {
  id: string;
  image: string;
  name: string;
  number: string;
  attacks: {
    special: {
      type: string;
    }[];
  };
}
