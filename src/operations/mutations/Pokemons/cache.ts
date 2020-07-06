import { pokemonsStore } from 'operations';
import { IPokemon } from 'interfaces';

export const updateCachedPokemon = (pokemon: IPokemon): void => {
  pokemonsStore(
    pokemonsStore().map((item) => {
      if (item.id === pokemon.id) {
        return pokemon;
      }

      return item;
    }),
  );
};

export const createPokemonsCache = (pokemons: IPokemon[]): void => {
  console.log('create cache');
  pokemonsStore(pokemons);
};

const PokemonMutations = { updateCachedPokemon, createPokemonsCache };

export default PokemonMutations;
