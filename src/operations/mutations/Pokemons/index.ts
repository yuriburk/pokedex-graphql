import { pokemonsVar } from 'operations';
import { IPokemon } from 'interfaces';

export const updatePokemon = (pokemon: IPokemon): void => {
  console.log('update', pokemon);
  pokemonsVar(
    pokemonsVar().map((item) => {
      if (item.id === pokemon.id) {
        return pokemon;
      }

      return item;
    }),
  );
};

export const cachePokemons = (pokemons: IPokemon[]): void => {
  let newPokemons = pokemons;
  if (pokemonsVar().length > 0) {
    newPokemons = pokemons.filter(
      (item) => !pokemonsVar().find((pokemonVar) => pokemonVar.id === item.id),
    );
  }

  if (newPokemons.length > 0) {
    pokemonsVar([...pokemonsVar(), ...newPokemons]);
  }
};

const PokemonMutations = { updatePokemon, cachePokemons };

export default PokemonMutations;
