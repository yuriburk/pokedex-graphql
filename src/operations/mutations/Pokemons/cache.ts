import { pokemonsVar } from 'operations';
import { IPokemon } from 'interfaces';

export const updateCachedPokemon = (pokemon: IPokemon): void => {
  pokemonsVar(
    pokemonsVar().map((item) => {
      if (item.id === pokemon.id) {
        return pokemon;
      }

      return item;
    }),
  );
};

export const createPokemonsCache = (pokemons: IPokemon[]): void => {
  console.log('create cache', pokemonsVar().length > 0);
  if (pokemonsVar().length > 0) {
    const newPokemons = pokemons.filter(
      (item) => !pokemonsVar().find((pokemonVar) => pokemonVar.id === item.id),
    );

    console.log('create new cache', newPokemons.length > 0);
    if (newPokemons.length > 0) pokemonsVar([...pokemonsVar(), ...newPokemons]);

    return;
  }

  pokemonsVar(pokemons);
};

const PokemonMutations = { updateCachedPokemon, createPokemonsCache };

export default PokemonMutations;
